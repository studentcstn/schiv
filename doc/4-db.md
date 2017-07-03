# Datenbankmodel

## Überblick

![Datenbankmodel von schiv (Erstellt mit
mysql-workbench)](../images/database.pdf){#fig:database width=80%}

## Tabelle account_bans

Ein Dozent (`account_id`) kann Benutzer (`account_ban_id`) bis zu einem
bestimmten Datum (`ban_until`) aussperren. Der betroffene Benutzer kann während
dieser Zeit keine Anfragen stehlen.

## Tabelle holidays

(TODO Rename holidays to events)

Enthält Zeiträume (`from` bis `to`) bzw. Zeitpunkte (`from` == `to`) von
wichtigen Ereignissen (`name`). Diese Ereignisse können auch Ferien sein
(`holiday`). Beispiele:

- Ostern 2017-04-13 bis 2017-04-08 (Feiertag)
- Vorlesungsbeginn 2017-10-02 

## Tabelle appointments

Enthält Termine (`date`, `time_from` und `time_to`) mit einer Beschreibung
(`description`) von Dozenten (`account_id`). Die Termine können aktiv
(`active`), d.h. es kann sich auf ihnen eingetragen werden, oder sie sind nicht
aktiv bzw. gelöscht. Terminserien werden über die `parent_id` abgebildet.

## Tabelle appointment_requests

Enthält Anfragen von Studenten (`account_id`) an Termine (`appointment_id`) von
Dozenten. Die Anfrage kann sich einem von drei Zuständen (`state`) befinden:
`Accepted`, `Idle` oder `Declined`. Für die Anfrage kann ein Betreff (`subject`)
und eine detailliertere Beschreibung (`description`) angegebene werden.
Zusätzlich wird noch der Startzeitpunkt (`at`) innerhalb des Termin und die
Dauer (`duration_in_min`) gespeichert.

## Tabelle accounts

Enthält einen Benutzer der über seine E-Mail-Adresse (`email`) identifiziert
wird und vom Typ (`type`) entweder Dozent oder Student ist. Benutzer die nicht
aktiv (`active`) sind, können sich nicht anmelden und müssen sich erst neu
registrieren. Ein Passwort (`password`) dient zur Authentifizierung des
Benutzers. Um zu erkennen welche Benutzer noch mit dem System arbeiten, wird der
Zeitpunkt der letzten Anmeldung (`last_login_at`) gespeichert.

## Tabelle account_tokens

Zum Aktivieren von Konten nach der Registrierung eines neuen Benutzers
(`account_id`). Der Token (`token`) wird per E-Mail verschickt, verpackt in
einem Aktivierungslink, und ist nur ein bestimmte Zeit gültig (`invalid_at`).
Vom Programm wird sichergestellt das jeder Benutzer nur einen Satz in der
Token-Tabelle hat.

## Tabelle account_faculties und faculties

Enthalten die Zuordnungen von den Fakultäten zu den Benutzerkonten. 
