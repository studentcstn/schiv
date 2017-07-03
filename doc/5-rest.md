# REST-Schnittstelle {#sec:rest}

## Überblick

+------------------------------------------+--------------------------------------------------------------+
| Beschreibung                             | [A|D] Method:Url (Body)                                      |
+==========================================+==============================================================+
| Login                                    | put:login (email, password)                                  |
+------------------------------------------+--------------------------------------------------------------+
| Logout                                   | put:logout (email, password)                                 |
+------------------------------------------+--------------------------------------------------------------+
| Reset Passwort                           | put:reset (email)                                            |
+------------------------------------------+--------------------------------------------------------------+
| Registrieren                             | post:register (email, password)                            \ |
|                                          | put:register (token)                                         |
+------------------------------------------+--------------------------------------------------------------+
| Suche: Dozenten                          | get:docents                                                  |
+------------------------------------------+--------------------------------------------------------------+
| Informationen bzw. Termine von Dozenten  | get:docents/{docent_id}                                      |
+------------------------------------------+--------------------------------------------------------------+
| Terminanfragen abrufen                   | **A** get:appointment_requests                               |
+------------------------------------------+--------------------------------------------------------------+
| Vergangene Terminanfragen                | **A** get:appointment_requests/past                          |
+------------------------------------------+--------------------------------------------------------------+
| Termin Einschreibung                     | **A** post:appointment_requests (...)                        |
+------------------------------------------+--------------------------------------------------------------+
| Terminanfrage annehmen bzw. ablehen      | **D** put:appointment_requests (id, state, duration_in_min)\ |
+------------------------------------------+--------------------------------------------------------------+
| Terminanfrage zurücknehmen               | **A** delete:appointment_requests/{id}                       |
+------------------------------------------+--------------------------------------------------------------+
| Termine Dozenten                         | **D** get:appointments                                     \ |
|                                          | **D** get:appointments/past                                \ |
|                                          | **D** post:appointments (...)                              \ |
|                                          | **D** delete:appointments/{appointment_id}                   |
+------------------------------------------+--------------------------------------------------------------+
| Feiertage                                | **A** get:holidays/{from}/{to}                             \ |
|                                          | **D** post:holidays (from, to, name)                       \ |
|                                          | **D** put:holidays (id, from, to, name)                    \ |
|                                          | **D** delete:holidays/{id}                                   |
+------------------------------------------+--------------------------------------------------------------+
| Einstellungen                            | **A** get:settings                                         \ |
|                                          | **A** put:settings (email, password)                         |
+------------------------------------------+--------------------------------------------------------------+
| Ausgeschlossene Konten                   | **D** get:account_bans                                     \ |
|                                          | **D** post:account_bans (account_ban_id)                   \ |
|                                          | **D** delete:account_bans/{id}                               |
+------------------------------------------+--------------------------------------------------------------+

: Zeigt den Aufbau der REST-Schnittstelle

Anmerkungen:

-  `(...)` bedeutet das alle Felder, wie im Model definiert, verwendet werden
   können.
- **A**: Zugriff nur wenn man als Student oder Dozent angemeldet ist.
- **D**: Zugriff nur wenn man als Dozent angemeldet ist.

## Details {#sec:rest-details}

### Allgemein

Die Nachrichten sind im JSON-Format. Bei Erfolg kommt der HTTP-Status
**200** zurück, im Fehlerfall kann **401**, **404**, **409**, **422**, **429**,
**500** oder **503** zurückgegeben werden:

- **200**: Es kommen die angeforderten Daten zurück oder eine leere Nachricht
  falls die kein Rückgabewert nötig bzw. vorhanden ist.

- **401**: Falls der Login fehlschlägt, der Benutzer nicht angemeldet ist oder
  der Benutzer ein Dozent sein muss um auf die Route zugreifen zu können. Als
  Antwort kommt eine Fehlermeldung mit dem Grund zurück. Beispiel:

    ```json
    {"message":"login unsuccessful"}
    {"message":"account isn't of type 'Docent'"}
    {"message":"login required"}
    ```

- **404**: Die angefragten Objekte sind nicht in der Datenbank vorhanden. Als
  Antwort kommt eine leere Nachricht zurück. Beispiel:

    ```json
    []
    ```

- **409**: Wird zurückgegeben wenn ein Konto bereits registriert ist.

- **422**: Die Anfrage enthält nicht alle nötigen Felder, oder ein Feld ist
  falsch formatiert. Die Antwort enthält als Attribute die Feldnamen bei denen
  ein Fehler festgestellt wurde. Als Wert der Attribute wird ein Array mit
  Fehlermeldungen zurückgegeben. Beispiel:

    Anfrage an `post:register`:

    ```json
    {"email": "alice","password": "bob"}
    ```

    Antwort von `post:register`:

    ```json
    {"email":["validation.required"],"password":["validation.min.string"]}
    ```

- **429**: Wird beim erstellen von Anfragen gesendet, wenn bereits eine Anfrage
  an einen Dozenten gestellt wurde. Oder wenn mehr als 60 Anfragen pro Minute
  von einer Session gestellt wurden.

- **500**: Ein allgemeiner Fehler (Syntaxfehler oder nicht behandelter Fehler).
  Als Antwort wird eine Fehlermeldung im Attribut `message` zurückgegeben.
  *Hinweis:* Ist die Anwendung im Debugmodus (`app.debug == true`), dann wird
  die Meldung aus der auslösenden Exception zurückgegeben. Es kann im Log unter
  `storage/logs/laravel.log` die genaue Fehlermeldung nachgeschaut werden.
  Beispiel:

    ```json
    {"message": "fatal error"}
    ```

- **503**: Kommt nur beim erstellen von Terminen vor. Zeigt an dass das
  'Vorlesungsende' nicht in der Ereignistabelle gefunden wurde.

### Register, Login, Logout und Reset Password {#sec:rest-login}

Der Login funktioniert über eine Session, die serverseitig gespeichert wird. Auf
Clientseite muss in einem Cookie die geschickte Session-Id mitgeführt werden. Da
die Anwendung sowieso in einem Browser läuft, kümmert sich der Browser um die
Cookie Verwaltung. Auf dem Server kümmert sich Laravel um die Session, die für
jede Verbindung eindeutig ist und sein muss. Der Webserver muss später über das
HTTPS-Protkoll angesprochen werden, sonst könnte ein Angreifer die Session
"hijacken". Wenn man die Implementierung von Laravel für die Session verwendet,
wird bei jeder Anfrage die Session-ID geändert, aus Sicherheitsgründen. Als
Konsequenz müssen die Anfragen per Javascript an die Schnittstelle synchron
erfolgen. Ansonsten könnte es passieren das eine alte Session-ID aus dem Cookie
gelesen wird, bevor die neue Session-ID abgespeichert wird.

**Register**: Beim Registrieren wird ein `post:register` geschickt mit E-Mail
und Passwort des Benutzers. Wenn dies erfolgreich ist, dann wird eine E-Mail an
den Benutzer mit einem Aktivierungslink geschickt (Momentan: wird einfach zum
Testen der Token mit in der Antwort zurückgeben). Ein Aktivierungslink ist zwei
Stunden lang gültig. Beispiel:

```json
{"email":"alice@wonder.land","password":"rabbithole"}
```

Momentane Antwort:

```json
{"token":"twon-ha"}
```

**Login**: Wenn der Login nicht erfolgreich ist wird ein **401** zurückgeben,
sonst ein **200** mit leerer Nachricht. Beispiel: siehe **Register**.

**Logout**: Löscht die Session auf dem Server und meldet den Benutzer ab. Falls
ein nicht angemeldeter Benutzer versucht sich abzumelden wird ein **401**
zurückgeliefert.

**Reset Password:** Benötigt nur die E-Mail-Adresse und schickt eine E-Mail an
den Benutzer mit einem neu generierten Passwort und einem Aktivierungslink.
(Momentan: wird einfach zum Testen der Token und das neue Passwort mit in der
Antwort `{"token":"<token>","password":"<password>"}` zurückgeben). Nach einem
Klick auf den Aktivierungslink ist das Konto des Benutzer wieder aktiviert.
Anmelden kann sich der Benutzer dann mit dem generierten Passwort. Das Passwort
ist fest und dem Benutzer ist es freigestellt es wieder zu ändern. Beispiel:

```json
{"email":"alice@wonder.land"}
```

Momentane Antwort:

```json
{"token":"twon-ha","password":"rabbithole2"}
```

Laut Vorgabe (siehe [@sec:guide]) muss der Aktivierungslink im Frontend
implementiert sein. Da der Link über ein `GET` abgesetzt wird, aber das Backend
ein `PUT` benötigt. Das Frontend muss dann ein `put:register` mit dem Token in
der Nachricht absetzen, um das Konto wieder zu aktivieren.

### Suche: Dozenten

Liefert alle aktiven Dozenten zurück, um im Frontend eine Suche implementieren
zu können.

Bei `get:docents`: Liefert alle Dozenten zurück (`id`, `email`). Zusätzlich noch
die Fakultät des Dozenten. Beispiel:

```json
[
  {
    "id": 3,
    "email": "helmut.kohl@hof-university.de",
    "faculties": [{"id": 2, "name": "Ingenieur"}]
  },
  { "id": 4, "email": "apfel.mus@hof-university.de", "faculties": [] }
]
```

Bei `get:docents/{id}`: Wird zu allen obigen Informationen noch die Termine des
Dozenten zurückgegeben. Beispiel:

```json
{
  "id": 3,
  "email": "helmut.kohl@hof-university.de",
  "appointments": [
    {
      "id": 3,
      "account_id": "3",
      "description": "Klausureinsicht",
      "active": "1",
      "weekday": null,
      "date": "2017-05-17",
      "time_from": "11:00:00",
      "time_to": "12:00:00",
    }
  ],
  "faculties": [
    { "id": 2, "name": "Ingenieur" }
  ]
}
```

### Termine

**Terminanfragen**:

Bei `get:appointment_requests`: Liefert bei einem Studenten die eigenen Anfragen
zurück. Bei einem Dozenten die Anfragen zu den eigenen Terminen.

Bei `get:appointment_requests/past`: Liefert bei einem Studenten alle Anfragen
des Studenten zurück, die sich auf vergangene Termine beziehen. Bei einem
Dozenten alle Anfragen zu den eigenen abgelaufenen Terminen.

Bei `post:appointment_requests`: Legt eine neue Terminanfrage in der Datenbank
an. Zu übergebene Parameter im *JSON-Objekt*: `appointment_id` (Id des Termins
an den angefragt wird), `description` (Beschreibung was besprochen werden soll),
`subject` (Betreff der Anfrage).

Bei `put:appointment_requests`: Damit wird der Status der Anfrage geändert sowie
die Dauer der Besprechung. Zu übergebende Parameter im *JSON-Objekt*: `id` (Id
der zu bearbeitenden Anfrage), `state` (Neuer Status der Anfrage: `Accepted`,
`Declined`), `duration_in_min` (Voraussichtliche Dauer der Besprechung)

Bei `delete:appointment_requests/{id}`: Damit wird die in `id` angegebene
Anfrage gelöscht.

**Termine**:

Bei `get:appointments`: Liefert alle Termine des Aufrufers zurück.

Bei `get:appointments/past`: Liefert alle inaktiven Termine des Aufrufers
zurück.

Bei `post:appointments`: Legt einen neuen Termin in der Datenbank an. Bei
wiederholenden Terminen werden alle anfallenden Wiederholungen bis zum Ende des
Semesters mit angelegt. Zu übergebende Parameter im *JSON-Objekt*: `weekday`
(Identifiziert einen wiederholenden Termin. Gültige eingaben sind: `MON` `TUE`
`WED` `THU` `FRI` `SAT` `SUN` `NULL`), `date` (Identifiziert einen Einzeltermin.
Falls `weekday` nicht den Wert `NULL` hat wird `date` nicht beachtet. Angabe wie
folgt: `YYYY-MM-DD`), `time_from` (Beginn des Termins: `HH:MM:SS`), `time_to`
(Ende des Termins:`HH:MM:SS`), `description` (Beschreibung des Termins).

Bei `delete:appointments/{id}`: Setzt den Status des mit `id` angegeben Termins
auf `Inactive`.

Versucht ein gesperrter Student eine Anfrage zu stellen, wird **200**
zurückgegeben, aber nur so getan als ob die Anfrage durchgegangen ist.

### Feiertage

Allgemeine Feiertage (sprich: Feiertage die nicht mit einem Konto verknüpft
sind) können nicht direkt bearbeitet werden, sondern nur abgefragt werden.

Sollte versucht werden einen allgemeinen Feiertag zu bearbeiten kommt ein
**404** als Fehler zurück.

Das Format von `{from}` und `{to}` ist im Format `YYYY-MM-DD`.

Bei `post:holidays`: Liefert die Id des eingefügten Satzes zurück. Falls bereits
ein Feiertag mit `from`, `to` und `name` eingetragen wurde, wird die Id dieses
Satzes zurückgegeben.

### Einstellungen

Liefert die Einstellungen des angemeldeten Benutzers zurück.

Bei `get:settings`: Liefert die Einstellungen des Kontos zurück, also eine
Untermenge der Attribute von der `accounts`-Tabelle. Zusätzlich enthält die
Antwort noch die Fakultäten des Kontos und alle möglichen Fakultäten. Beispiel:

```json
{
  "email": "max.musterman@hof-university.de",
  "account_faculties": [
    { "id": 3, "name": "Wirtschaft" }
  ],
  "faculties": [
    { "id": 1, "name": "Informatik" },
    { "id": 2, "name": "Ingenieur" },
    { "id": 3, "name": "Wirtschaft" }
  ]
}
```

Bei `put:settings`: Kann E-Mail, Passwort und Fakultäten übergeben werden. Die
Fakultäten werden als Array von Ids übergeben: `[1, 2, 3]`.

### Konten Sperren

Liefert Kontosperrungen des angemeldeten Dozenten zurück. Alle gesperrten
Benutzer können keine Anfragen mehr stellen. Bis sie aus der Tabelle gelöscht
werden oder die Zeit für die Sperrung abgelaufen ist (Die Sperrung ist
standardmäßig bis zum Beginn des nächsten Semester).

Wenn eine Sperrung eingetragen wird, wird der Datensatz mit aktuelle Id
zurückgeben.
