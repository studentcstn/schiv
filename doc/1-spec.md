#Vehicula nec, diam.

Integer elementum, felis non faucibus euismod, erat massa
dictum eros, eu ornare ligula tortor et mauris. Cras molestie magna in nibh.
Aenean et tellus. Fusce adipiscing commodo erat. In eu justo. Nulla dictum, erat
sed blandit venenatis, arcu dolor molestie dolor, vitae congue orci risus a
nulla. Pellentesque sit amet arcu. In mattis laoreet enim. Pellentesque id augue
et arcu blandit tincidunt. Pellentesque elit ante, rhoncus quis, dapibus sit
amet, tincidunt eu, nibh. In imperdiet. Nunc lectus neque, commodo eget,
porttitor quis, fringilla quis, purus.

Duis sagittis dignissim eros. In sit amet lectus. Fusce lacinia mauris vitae
nisl interdum.

Porta, malesuada elementum, nisi. Integer vitae enim quis risus aliquet gravida.
Curabitur vel lorem vel erat dapibus lobortis. Donec dignissim tellus at arcu.
Quisque molestie pulvinar sem.

Nulla magna neque, ullamcorper tempus, luctus eget, malesuada ut, velit. Morbi
felis. Praesent in purus at ipsum cursus posuere. Morbi bibendum facilisis eros.
Phasellus aliquam sapien in erat. Praesent venenatis diam dignissim dui.
Praesent risus erat, iaculis ac, dapibus sed, imperdiet ac, erat. Nullam sed
ipsum. Phasellus non dolor. Donec ut elit.

Sed risus.

Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Vestibulum sem lacus,
commodo vitae, aliquam ut, posuere eget, dui. Praesent massa dui, mattis et.

## REST-Schnittstelle

+---------------------------+--------------------------------------------------------------+
| Beschreibung              | Url (Body)                                                   |
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
| Termin Einschreibung      | **A** post:appointment_request (app_id, time, ...)           |
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
| Ausgeschlossene Benutzer  | **D** get:banned_user                                      \ |
|                           | **D** post:baned_user (account_banned_id)                  \ |
|                           | **D** delete:banned_user/{id}                                |
+---------------------------+--------------------------------------------------------------+
