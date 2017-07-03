# Style-Guide

## Farbschema

Das Farbschema orientiert sich an den drei Farben der Hochschule mit eigener Interpretation.

+--------------------------------------------------------------------------------------------+
| Grundlegende Farben                                                                        |
+---------+---------------+------------------------------------------------------------------+
| #ff7043 | orange        | Buttons und Eingabe Felder                                       |
+---------+---------------+------------------------------------------------------------------+
| #03a9f4 | blau          | Login Fenster und Termine, so wie Terminanfragen bei Studenten.  |
+---------+---------------+------------------------------------------------------------------+
| #ffb74d | orange-gelb   | Terminanfragen beim Dozenten.                                    |
+---------+---------------+------------------------------------------------------------------+
| #ffeb3b | gelb          | Liste der Dozenten                                               |
+---------+---------------+------------------------------------------------------------------+
| #989898 | dunkel grau   | Abgelehnte Terminanfragen                                        |
+---------+---------------+------------------------------------------------------------------+

+--------------------------------------------------------------------------------------------+
| Weiter Farben                                                                              |
+---------+---------------+------------------------------------------------------------------+
| gray    | grau          | box-shadow                                                       |
+---------+---------------+------------------------------------------------------------------+
| #a94442 | rot           | Fehlerhafte Validierung in Eingabe Feldern                       |
|         |               | background-color: rgba(168, 68, 66, 0.05)                        |
+---------+---------------+------------------------------------------------------------------+
| #3c763d | grün          | Erfolgreiche Validierung in Eingabe Feldern                      |
|         |               | background-color: rgba(60, 118, 61, 0.05)                        |
+---------+---------------+------------------------------------------------------------------+
| white   | weiß          | Hintergrundfarbe eines Event Fensters                            |
+---------+---------------+------------------------------------------------------------------+
|         | transparentes | Hintergrund eines Event Fensters                                 |
|         | schwarz       | background-color: rgba(0, 0, 0, 0.33)                            |
+---------+---------------+------------------------------------------------------------------+

## Elemente

Als Grundlage wird Bootstrap in Version 3 verwendet.
Alle Elemente haben keine Text Effekte und abgerundete ecken mit 2px Größe.

### Eingabe Elemente

Der Aufbau eines Eingabefeldes ist sehr simpel gehalten. 
Am unteren Rand ist eine 2px hohe durchgehende Linie in orange. 

![Eingabefeld mit addon in Standard und mit fehlerhafter und erfolgreicher Validierung](../images/input.pdf){#fig:database width=70%}

Ein addon eines Eingabefeld hat ebenfalls unten ein orangen Rahmen.

Für die Anzeige einer fehlerhaften oder erfolgreichen Validierung werden die Farben rot und grün verwendet.

### Buttons

Knopfe sind einfarbig, flach in orange. Für activ und hover wird ein nach inset box-shadow Effekt verwendet. 

### Termine und Anfragen

![Oben: Terminanfrage in Sicht eines Studenten. Unten Termin mit und ohne Anfrage in sicht eines Dozenten](../images/appointment.pdf){#fig:database width=70%}

Anfragen von Studenten auf Termine, werden in den Terminen angezeigt.
An der rechten Seite sind jeweils Knöpfe zum Annehmen, ablehnen oder löschen des Termins oder der Anfrage.
Der Dozent kann einen Studenten Sperren. Dafür ist der Knopf mit dem Daumen nach unten.

## Typographie

(TODO)

Als Schriftart wird `Roboto`[^ROBOTO] verwendet, da diese klar lesbar ist.

[^ROBOTO]: <https://fonts.google.com/specimen/Roboto?selection.family=Roboto>

## Layout

Beim Layout muss zwischen Student und Dozent unterschieden werden.

### Student

Als Student sieht man auf der Startseite neben den Terminanfragen auf der linken Seite, eine Liste von Dozenten auf der anderen Seite.

In den Einstellungen sind nur die Möglichkeiten der Änderung der Email Adresse und des Passwords.
So wie die Angabe der Fakultät.

### Dozent

Das Layout einer Dozenten Seite ähnelt der einer Studenten Seite. 
Auf der rechten Seite fehlt jedoch die Liste der Dozenten und die Ansicht der Termine ist auf ganzer breite zu sehen.

Auch die Einstellungen sind grundlegend gleich mit den Studenten. 
Hinzu kommt noch die Möglichkeit eine Sperrung eines Studenten wieder aufzuheben.
Und das ein und austragen eines individuellen Feiertags.


## Navigation

Die Navigationsleiste am oberen Rand ist immer sichtbar.
Alle Funktionen sind darüber mit wenigen Klicks erreichbar.
