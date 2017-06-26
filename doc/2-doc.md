# Funktionale Anforderungen {#sec:guideline}

Eine Liste von Funktionalen Anforderungen die während der Gespräche mit dem
Auftraggeber beschlossen wurden:

#. Konten sind nur registrierbar mit E-Mail-Adressen (`@hof-university.de`) der
   Hochschule Hof.
#. Zur Registrierung wird nur die E-Mail-Adresse und ein Passwort benötigt.
#. Konten werden nach der Registrierung als "Studenten" behandelt.
#. Eine Liste der aktiven Dozenten wird über die Schnittstelle der
   iOS-Stundenplan-App[^IOSAPP] abgefragt. Hierbei muss aus den Namen des Dozenten die
   E-Mail-Adresse abgeleitet werden, da die diese nicht direkt abfragbar ist.
   Für jeden Dozenten wird ein deaktiviertes Konto angelegt.
#. Konten können nur "Dozent" werden, wenn bereits ein deaktiviertes Konto
   diesen Typs angelegt ist.
#. Jedem Konto sind ein oder mehrere Fakultäten zugeordnet.
#. Aktivierung eines Kontos erfolgt über eine E-Mail die nach der Registrierung
   mit einem Aktivierungslink geschickt wird.
#. Die Anwendung soll mindestens auf normalen Desktop-PCs mit
   den weitverbreitetsten Browsern laufen.
#. Es werden generell keine Datensätze gelöscht, sondern nur weich gelöscht
   ("unsichtbar gemacht").
#. Am Ende eines Semesters werden Studenten aus dem System gelöscht und müssen
   sich dann wieder erneut registrieren
#. Aktivierungslink wird über einen GET abgesetzt, d.h. der Aktivierungslink
   muss im Frontend implementiert sein. 

[^IOSAPP]:
<https://github.com/HochschuleHofStundenplanapp/iOS-App/wiki/Schnittstellen-zum-Server> 

# Style-Guide

## Farbschema

(TODO)

Es wird sich am Farbschema der Hochschule Hof orientiert. 

## Typographie

(TODO)

Als Schriftart wird `Roboto`[^ROBOTO] verwendet, da diese klar lesbar ist.

[^ROBOTO]: <https://fonts.google.com/specimen/Roboto?selection.family=Roboto>

## Layout

(TODO)

Beim Layout muss zwischen Student und Dozent unterschieden werden.
Das Layout der Seite soll möglichst einfach und übersichtlich sein.

## Navigation

(TODO)

Es wird nur eine Navigationleiste am oberen Rand geben, die immer sichtbar ist.
Alle Funktionen sind darüber mit wenigen Klicks erreichbar.

# Datenbankmodel

![Datenbankmodel von schiv (Erstellt mit
mysql-workbench)](../images/database.pdf){#fig:database width=70%}

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
**200** zurück, im Fehlerfall kann **401**, **404**, **422** oder **500**
zurückgegeben werden:

- **200**: Es kommen die angeforderten Daten zurück oder eine leere Nachricht
  falls die kein Rückgabewert nötig ist.

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

- **500**: Ein allgemeiner Fehler (Syntaxfehler oder nicht behandelter Fehler).
  Als Antwort wird eine Fehlermeldung im Attribut `message` zurückgegeben.
  *Hinweis:* Ist die Anwendung im Debugmodus (`app.debug == true`), dann wird
  die Meldung aus der auslösenden Exception zurückgegeben. Es kann im Log unter
  `storage/logs/laravel.log` die genaue Fehlermeldung nachgeschaut werden.
  Beispiel:

    ```json
    {"message": "fatal error"}
    ```

### Register, Login, Logout und Reset Password

Der Login funktioniert über eine Session, die serverseitig gespeichert wird.
Auf Clientseite muss in einem Cookie die geschickte Session-Id mitgeführt werden.
Da die Anwendung sowieso in einem Browser läuft, kümmert sich der Browser um die
Cookie Verwaltung. Auf dem Server kümmert sich Laravel um die Session, die für
jede Verbindung eindeutig ist und sein muss. Der Webserver muss später mit über
das HTTPS-Protkoll angesprochen werden, sonst könnte ein Angreifer die Session
"hijacken". Wenn man mit die Implementierung von Laravel für die Session
verwendet, wird bei jeder Anfrage die Session-ID geändert, aus
Sicherheitsgründen. Als Konsequenz müssen die Anfragen per Javascript an die
Schnittstelle synchron erfolgen.

**Register**: Beim Registrieren wird ein `post:register` geschickt mit E-Mail
und Passwort des Benutzers. Wenn dies erfolgreich ist, dann wird eine E-Mail an
den Benutzer mit einem Aktivierungslink geschickt (Momentan: wird einfach zum
Testen der Token mit in der Antwort zurückgeben). Beispiel:

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

Laut Vorgabe (siehe [@sec:guideline]) muss der Aktivierungslink im Frontend
implementiert sein. Da der Link über ein `GET` abgesetzt wird, aber das Backend
ein `PUT` benötigt. Das Frontend muss dann ein `put:register` mit dem Token in
der Nachricht absetzen, um das Konto wieder zu aktivieren.

### Suche: Dozenten

Liefert alle Dozenten zurück, um im Frontend eine Suche implementieren zu
können.

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

Bei `get:appointment_requests`: Liefert bei einem Studenten die eigenen Anfragen zurück.
Bei einem Dozenten die Anfragen zu den eigenen Terminen.

Bei `get:appointment_requests/past`: Liefert bei einem Studenten alle Anfragen des Studenten
zurück, die sich auf vergangene Termine beziehen. Bei einem Dozenten alle Anfragen zu den eigenen
abgelaufenen Terminen.

Bei `post:appointment_requests`: Legt eine neue Terminanfrage in der Datenbank an.
Zu übergebene Parameter im **JSON-Objekt**: **{appointment_id}** (Id des Termins an den angefragt wird),
**{description}** (Beschreibung was besprochen werden soll), **{subject}** (Betreff der Anfrage).

Bei `put:appointment_requests`: Damit wird der Status der Anfrage geändert sowie die Dauer der Besprechung.
Zu übergebende Parameter im **JSON-Objekt**: **{id}** (Id der zu bearbeitenden Anfrage), **{state}** (Neuer Status der Anfrage: `Accepted`, `Declined`), **{duration_in_min}** (Voraussichtliche Dauer der Besprechung)

Bei `delete:appointment_requests/{id}`: Damit wird die in `id` angegebene Anfrage gelöscht.

**Termine**:

Bei `get:appointments`: Liefert alle Termine des Aufrufers zurück.

Bei `get:appointments/past`: Liefert alle inaktiven Termine des Aufrufers zurück.

Bei `post:appointments`: Legt einen neuen Termin in der Datenbank an. Bei wiederholenden Terminen werden
alle anfallenden wiederholungen bis zum Ende des Semesters mit angelegt. Zu übergebende Parameter im **JSON-Objekt**:
**{weekday}** (Identifiziert einen wiederholenden Termin. Gültige eingaben sind: `MON` `TUE` `WED` `THU` `FRI` `SAT` `SUN` `NULL`),
**{date}** (Identifiziert einen Einzeltermin. Falls {weekday} auf Wert `NULL` Angabe wie folgt: `YYYY-MM-DD` sonst: `NULL`), **{time_from}** (Beginn des Termins: `HH:MM:SS`), **{time_to}** (Ende des Termins: `HH:MM:SS`).

Bei `delete:appointments/{id}`: Setzt den Status des mit `id` angegeben Termins auf `Inactive`.

Versucht ein gesperrter Student eine Anfrage zu stellen, wird ein **401**
zurückgegeben.

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
standardmäßig bis zum Ende des Semesters 15.03 oder 30.09). 

# Implementierung

## Allgemein

Die REST-Schnittstelle kann manuell über `test.html` ausprobiert bzw. getestet
werden. Implementierungsdetails für die REST-Schnittstelle werden bereits in
[@sec:rest-details] beschrieben.

(TODO)

# Testfälle

## Backend

Es sind für jeden Controller Testfälle im Verzeichnis `tests/Feature` angelegt.

## Fontend

(TODO)

# Benutzerhandbuch

## Installation für Entwicklung und zum Ausprobieren (unter Ubuntu 17.04)

```{#lst:install .bash .numberLines}
$ sudo apt update
$ sudo apt install git composer unzip php php-mbstring php-xml 
$ sudo apt install php-sqlite3 sqlitebrowser
$ cd $HOME
$ git clone https://github.com/studentcstn/schiv
$ cd schiv
$ composer install
$ cp .env.sqlite .env
$ touch /tmp/db 
$ php artisan migrate:refresh --seed
$ php artisan serve
$ php artisan retrieve:docents
$ firefox http://localhost:8000
```

## Dozenten aktualisieren

Am Ende des Semester können die Dozenten-Konten aktualisiert werden. Dazu dient
der Befehl `php artisan retrieve:docents`. Es werden alle vorhanden
Dozenten-Kontos deaktiviert und das Passwort zurückgesetzt. Nur Dozenten die
noch Zugriff auf ihr E-Mail-Konto haben können sich erneut registrieren und
anmelden. Die Zugangsdaten für die Schnittstelle der iOS-Stundenplan-App müssen
in der `.env`-Datei eingetragen werden (Schlüssel: `IOSAPP_USERNAME` und
`IOSAPP_PASSWORD`).

Zur Vereinfachung kann man das Task-Scheduling aktivieren, wie in dieser
Anleitung beschrieben <https://laravel.com/docs/5.4/scheduling>. Der Task würde
am 15. März bzw. 31. September jedes Jahr ausgeführt.

Zum Testen kann noch die Option `--from-cache` verwendet werden. Hier werden die
Daten nur einmal vom Server geholt und dann in einer lokalen Datei
`/tmp/docents` zwischengespeichert.
