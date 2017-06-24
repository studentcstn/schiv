# Funktionale Anforderungen

Eine Liste von Funktionalen Anforderungen:

#. Konten sind nur registrierbar mit E-Mail-Adressen (`@hof-university.de`) der
   Hochschule Hof 
#. Zur Registrierung wird nur die E-Mail-Adresse benötigt
#. Konten werden nach der Registrierung als "Studenten" behandelt
#. Konten können nur "Dozent" werden, wenn bereits ein deaktiviertes Konto
   diesen Typs angelegt ist
#. Jedem Konto sind ein oder mehrere Fakultäten zugeordnet
#. Aktivierung eines Kontos erfolgt über eine E-Mail die nach der Registrierung
   mit einem Aktivierungs-Link geschickt wird.
#. Dozenten werden über die Schnittstelle der iOS-Stundenplan-App abgefragt.
   Hierbei muss aus den Namen des Dozenten die E-Mail-Adresse
   abgeleitet werden, da die diese nicht direkt abfragbar ist.
#. Die Anwendung soll mindestens auf normalen Desktop-PCs mit 
   den weitverbreitetsten Browsern laufen.

# Style-Guide

## Farbschema

## Typographie

## Layout

## Navigation

# Datenbankmodel

![Datenbankmodel von schiv (Erstellt mit
mysql-workbench)](../images/database.pdf){#fig:database width=70%}

# REST-Schnittstelle

+------------------------------------------+--------------------------------------------------------------+
| Beschreibung                             | [A|D] Method:Url (Body) -> (Result)                          |
+==========================================+==============================================================+
| Login                                    | put:login (email, password)                                  |
+------------------------------------------+--------------------------------------------------------------+
| Logout                                   | put:logout (email, password)                                 |
+------------------------------------------+--------------------------------------------------------------+
| Reset Passwort                           | put:reset (email, password)                                  |
+------------------------------------------+--------------------------------------------------------------+
| Registrieren                             | post:register (email, password) -> (token)                 \ |
|                                          | put:register (token)                                         |
+------------------------------------------+--------------------------------------------------------------+
| Suche                                    | get:docents                                                  |
+------------------------------------------+--------------------------------------------------------------+
| Informationen bzw. Termine von Dozenten  | get:docents/{docent_id}                                      |
+------------------------------------------+--------------------------------------------------------------+
| Terminanfragen abrufen                   | **D** get:appointment_requests                               |
+------------------------------------------+--------------------------------------------------------------+
| Termin Einschreibung                     | **A** post:appointment_requests (...)                        |
+------------------------------------------+--------------------------------------------------------------+
| Termine annehmen bzw. ablehen            | **D** put:appointment_requests (id, state)                 \ |
|                                          | **A** delete:appointment_requests/{id}                       |
+------------------------------------------+--------------------------------------------------------------+
| Termine Dozenten                         | **D** get:appointments                                     \ |
|                                          | **D** get:appointments/{count}                             \ |
|                                          | **D** get:appointments/{from}/{to}                         \ |
|                                          | **D** post:appointments (...)                              \ |
|                                          | **D** delete:appointments/{appointment_id}                   |
+------------------------------------------+--------------------------------------------------------------+
| Einstellungen                            | **A** get:settings                                         \ |
|                                          | **A** put:settings (email, password)                         |
+------------------------------------------+--------------------------------------------------------------+
| Ausgeschlossene Konten                   | **D** get:account_bans                                     \ |
|                                          | **D** post:account_bans (account_ban_id)                   \ |
|                                          | **D** delete:account_bans/{id}                               |
+------------------------------------------+--------------------------------------------------------------+

: Tabelle zeigt den Aufbau der REST-Schnittstelle 

(Urls die mit **D** gekennzeichnet sind, sind nur als Dozent zugreifbar, Urls mit **A** sind nur als eingeloggter Nutzer 
zugreifbar)

# Implementierung

Sollicitudin dui. Sed in tellus id urna viverra commodo. Vestibulum enim felis,
interdum non, sollicitudin in, posuere a, sem. Cras nibh. Sed facilisis ultrices
dolor. Vestibulum pretium mauris sed turpis. Phasellus a pede id odio interdum
elementum. Nam urna felis, sodales ut, luctus vel, condimentum vitae, est.
Vestibulum ut augue. Nunc laoreet sapien quis neque semper dictum. Phasellus
rhoncus est id turpis. Vestibulum in elit at odio pellentesque volutpat. Nam nec
tortor. Suspendisse porttitor consequat nulla. Morbi suscipit tincidunt nisi.
Sed laoreet, mauris et tincidunt facilisis, est nisi pellentesque ligula, sit
amet convallis neque dolor at sapien. Aenean viverra justo ac sem.

Pellentesque.

# Testfälle

Fermentum a, aliquet quis, sodales at, dolor. Duis eget velit eget risus
fringilla hendrerit. Nulla facilisi. Mauris turpis pede, aliquet ac, mattis sed,
consequat in, massa. Cum sociis natoque penatibus et magnis dis parturient
montes, nascetur ridiculus mus. Etiam egestas posuere metus. Aliquam erat
volutpat. Donec non tortor. Vivamus posuere nisi mollis dolor. Quisque porttitor
nisi ac elit. Nullam tincidunt ligula vitae nulla.

Vivamus sit amet risus et ipsum viverra malesuada. Duis luctus. Curabitur
adipiscing metus et felis. Vestibulum tortor. Pellentesque purus. Donec
pharetra, massa quis malesuada auctor, tortor ipsum lobortis ipsum, eget
facilisis ante nisi eget lectus. Sed a est. Aliquam.
