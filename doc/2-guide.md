# Funktionale Anforderungen {#sec:guide}

Eine Liste von Funktionalen Anforderungen die während der Gespräche mit dem
Auftraggeber beschlossen wurden + weiterer Funktionalitäten:

#. Konten sind nur registrierbar mit E-Mail-Adressen (`@hof-university.de`) der
   Hochschule Hof.
#. Zur Registrierung wird nur die E-Mail-Adresse und ein Passwort benötigt.
#. Konten werden nach der Registrierung als "Studenten" behandelt.
#. Beim Vergessen eines Passworts soll der Nutzer in der Lage, sein durch seine Email,
   das Konto wiederherzustellen.
#. Eine Liste der aktiven Dozenten wird über die Schnittstelle der
   iOS-Stundenplan-App[^IOSAPP] abgefragt. Hierbei muss aus den Namen des Dozenten die
   E-Mail-Adresse abgeleitet werden, da die diese nicht direkt abfragbar ist.
   Für jeden Dozenten wird ein deaktiviertes Konto angelegt.
#. Konten können nur "Dozent" werden, wenn bereits ein deaktiviertes Konto
   diesen Typs angelegt ist.
#. Jedes Konto ist beliebig vielen Fakultäten zugeordnet.
#. Aktivierung eines Kontos erfolgt über eine E-Mail, die, nach der Registrierung,
   mit einem Aktivierungslink geschickt wird.
#. Die Anwendung soll mindestens auf normalen Desktop-PCs mit
   den weitverbreitetsten Browsern laufen.
#. Es werden generell keine Datensätze gelöscht, sondern nur weich gelöscht
   ("unsichtbar gemacht").
#. Am Ende eines Semesters werden Studenten aus dem System gelöscht und müssen
   sich dann wieder erneut registrieren
#. Aktivierungslink wird über einen GET abgesetzt, d.h. der Aktivierungslink
   muss im Frontend implementiert sein.
#. Ein Dozent soll in der Lage sein Einzeltermine, sowie wöchentlich wiederkehrende
   Termine anzulegen.
#. Ein Student soll in der Lage sein Anfragen, zu einen beliebigen Termin zu
   stellen.
#. Ein Dozent soll in der Lage sein Anfragen von Studenten anzunehmen und
   abzulehnen.
#. Einem Dozent soll die Möglchkeit gegeben werden Anfragen von bestimmten
   Studenten zu blockieren bzw. diese Blockierung wieder aufzuheben.
#. Ein Student darf nicht in der Lage sein willkürlich Spam Anfragen zu stellen.
#. Ein Dozent soll in der Lage sein terminfreie Tage für sich zu definieren die
   auch von wiederkehrenden Terminen berücksichtigt werden.
#. Ein Nutzer(Student oder Dozent) soll in der Lage sein seine Email zu ändern,
   jedoch nicht in eine die bereits von einem anderen Nutzer belegt ist.

[^IOSAPP]: <https://github.com/HochschuleHofStundenplanapp/iOS-App/wiki/Schnittstellen-zum-Server>
