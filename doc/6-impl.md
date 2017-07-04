# Implementierung

## Allgemein

Die REST-Schnittstelle kann manuell über `test.html` ausprobiert bzw. getestet
werden (Kurze Beschreibung ist unter [@sec:test.html] zu finden).
Implementierungsdetails für die REST-Schnittstelle werden bereits in
[@sec:rest-details] beschrieben.

## Verschicken von E-Mails

Die E-Mails werden nur in die Logdatei `storage/logs/laravel.log` geschrieben
und nicht verschickt. Falls E-Mails verschickt werden sollen, kann dies in der
Konfiguration `config/email.php` geändert werden. Die Vorlagen für die E-Mail
Nachrichten befinden sich unter: `resources/views/emails`. Diese haben nur den
nötigsten Inhalt, welcher für den Rahmen des Projekts ausreicht.

Es werden E-Mails beim Registrieren, Passwort zurücksetzen und beim Löschen
von Terminen, bei dem sich jemand angemeldet hat, verschickt.

## Login

Bereits in [@sec:rest-login] ausführlich beschrieben.
