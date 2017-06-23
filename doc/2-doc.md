# Funktionalen Anforderungen

# Style-Guide

## Farbschema

## Typographie

## Layout

## Navigation

# Datenbankmodel

![Datenbankmodel von schiv (Erstellt mit
mysql-workbench)](../images/database.pdf){#fig:database width=70%}

# REST-Schnittstelle

+---------------------------+--------------------------------------------------------------+
| Beschreibung              | Method:Url (Body)                                            |
+===========================+==============================================================+
| Login                     | put:login (email, password)                                  |
+---------------------------+--------------------------------------------------------------+
| Logout                    | put:logout (email, password)                                 |
+---------------------------+--------------------------------------------------------------+
| Reset                     | put:reset (email, password)                                  |
+---------------------------+--------------------------------------------------------------+
| Register                  | post:register (email, password)                            \ |
|                           | put:register (token)                                         |
+---------------------------+--------------------------------------------------------------+
| Suche                     | get:docent                                                   |
+---------------------------+--------------------------------------------------------------+
| Informationen bzw.        |                                                              |
| Termine von Dozenten      | get:docent/{docent_id}                                       |
+---------------------------+--------------------------------------------------------------+
| Terminanfragen abrufen    | **D** get:appointment_request                                |
+---------------------------+--------------------------------------------------------------+
| Termin Einschreibung      | **A** post:appointment_request (...)                         |
+---------------------------+--------------------------------------------------------------+
| Termine annehmen bzw.     | **D** put:appointment_request (id, state)                  \ |
| ablehen                   | **A** delete:appointment_request/{id}                        |
+---------------------------+--------------------------------------------------------------+
| Termine Dozenten          | **D** get:appointment                                      \ |
|                           | **D** get:appointment/{count}                              \ |
|                           | **D** get:appointment/{from}/{to}                          \ |
|                           | **D** post:appointment (day, time_from, time_to, desc)     \ |
|                           | **D** delete:appointment/{id}                                |
+---------------------------+--------------------------------------------------------------+
| Einstellungen             | **A** get:settings                                         \ |
|                           | **A** put:settings (email, password)                         |
+---------------------------+--------------------------------------------------------------+
| Ausgeschlossene Benutzer  | **D** get:account_ban                                      \ |
|                           | **D** post:account_ban (account_ban_id)                    \ |
|                           | **D** delete:account_ban/{id}                                |
+---------------------------+--------------------------------------------------------------+

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
