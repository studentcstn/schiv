# Funktionale Anforderungen {#sec:guide}

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
   ("unsichtbar gemacht"). Bis auf Token, Feiertage und Sperrungen.
#. Am Ende eines Semesters werden Studenten aus dem System gelöscht und müssen
   sich dann wieder erneut registrieren
#. Aktivierungslink wird über einen GET abgesetzt, d.h. der Aktivierungslink
   muss im Frontend implementiert sein.

[^IOSAPP]:
<https://github.com/HochschuleHofStundenplanapp/iOS-App/wiki/Schnittstellen-zum-Server>
