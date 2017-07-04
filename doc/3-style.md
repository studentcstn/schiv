# Style-Guide

## Farbschema

Das Farbschema orientiert sich an den drei Farben der Hochschule mit eigener Interpretation.

+----------+---------------+------------------------------------------------------------------+
| HEX      | Name          | Beschreibung                                                     |
+==========+===============+==================================================================+
| `ff7043` | orange        | Buttons und Eingabe Felder                                       |
+----------+---------------+------------------------------------------------------------------+
| `03a9f4` | blau          | Login Fenster und Termine, so wie Terminanfragen bei Studenten.  |
+----------+---------------+------------------------------------------------------------------+
| `ffb74d` | orange-gelb   | Terminanfragen beim Dozenten.                                    |
+----------+---------------+------------------------------------------------------------------+
| `ffeb3b` | gelb          | Liste der Dozenten                                               |
+----------+---------------+------------------------------------------------------------------+
| `989898` | hell grau     | Abgelehnte Terminanfragen                                        |
+----------+---------------+------------------------------------------------------------------+

: Grundlegende Farben

+----------+---------------+------------------------------------------------------------------+
| HEX      | Name          | Beschreibung                                                     |
+==========+===============+==================================================================+
| `808080` | grau          | box-shadow                                                       |
+----------+---------------+------------------------------------------------------------------+
| `a94442` | rot           | Fehlerhafte Validierung in Eingabe Feldern                       |
|          |               | background-color: rgba(168, 68, 66, 0.05)                        |
+----------+---------------+------------------------------------------------------------------+
| `3c763d` | grün          | Erfolgreiche Validierung in Eingabe Feldern                      |
|          |               | background-color: rgba(60, 118, 61, 0.05)                        |
+----------+---------------+------------------------------------------------------------------+
| `ffffff` | weiß          | Hintergrundfarbe eines Event Fensters                            |
+----------+---------------+------------------------------------------------------------------+
| `000000` | transparentes | Hintergrund eines Event Fensters                                 |
|          | schwarz       | background-color: rgba(0, 0, 0, 0.33)                            |
+----------+---------------+------------------------------------------------------------------+

: Weitere Farben

![Oben: Grundlegende Farben. Unten: Weitere
Farben](../images/colors.pdf){#fig:style-colors width=70%}

## Elemente

Als Grundlage wird Bootstrap in Version 3 verwendet. Alle Elemente haben keine
Text Effekte und abgerundete Ecken mit 2px Größe.

### Eingabe Elemente

Der Aufbau eines Eingabefeldes ist sehr simpel gehalten. Am unteren Rand ist
eine 2px hohe durchgehende Linie in orange. 

![Eingabefeld mit Zusatz: Normal, mit fehlerhafter und erfolgreicher
Validierung](../images/input.pdf){#fig:style-input width=70%}

Ein Zusatz eines Eingabefeld hat ebenfalls unten ein orangen Rahmen.

Für die Anzeige einer fehlerhaften oder erfolgreichen Validierung werden die
Farben rot und grün verwendet.

### Buttons

Knöpfe sind einfarbig, flach in orange. Für `active` und `hover` wird ein
Schatteneffekt verwendet. 

### Termine und Anfragen

![Oben: Terminanfrage in Sicht eines Studenten. Unten Termin mit und ohne
Anfrage in sicht eines
Dozenten](../images/appointment.pdf){#fig:style-appointment width=70%}

Anfragen von Studenten auf Termine, werden in den Terminen angezeigt. An der
rechten Seite sind jeweils Knöpfe zum annehmen, ablehnen oder löschen des
Termins oder der Anfrage. Der Dozent kann einen Studenten Sperren. Dafür ist der
Knopf mit dem Daumen nach unten.

## Typographie

Als Schriftart wird `Roboto`[^ROBOTO] verwendet, da diese klar lesbar ist.

[^ROBOTO]: <https://fonts.google.com/specimen/Roboto?selection.family=Roboto>

## Layout

Beim Layout muss zwischen Student und Dozent unterschieden werden.

### Student

Als Student sieht man auf der Startseite neben den Terminanfragen auf der linken
Seite, eine Liste von Dozenten auf der anderen Seite.

![Beispielhafte Ansicht der Seite aus Sicht des
Studenten.](../images/student.pdf){#fig:style-student width=70%}

In den Einstellungen sind nur die Möglichkeiten der Änderung der Email Adresse
und des Passworts. So wie die Angabe der Fakultät.

### Dozent

Das Layout einer Dozentenseite ähnelt der einer Studenten Seite. 
Auf der rechten Seite fehlt jedoch die Liste der Dozenten und die Ansicht der
Termine ist auf der ganzen Breite zu sehen.

Auch die Einstellungen sind grundlegend gleich mit den Studenten. 
Hinzu kommt noch die Möglichkeit eine Sperrung eines Studenten wieder
aufzuheben. Und das Ein- und Austragen eines individuellen Feiertags.

## Navigation

Die Navigationsleiste am oberen Rand ist immer sichtbar. Alle Funktionen sind
darüber mit wenigen Klicks erreichbar.
