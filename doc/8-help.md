# Benutzerhandbuch

## Installation für Entwicklung unter Ubuntu 17.04 {#sec:install}

Es wird von einer neuen Installation ausgegangen.

```{#lst:install .bash .numberLines}
$ sudo apt update
$ sudo apt install git composer unzip php php-mbstring php-xml
$ sudo apt install php-sqlite3 sqlitebrowser
$ cd $HOME
$ git clone https://github.com/studentcstn/schiv
$ cd schiv
$ composer install
$ composer dumpautoload
$ cp .env.sqlite .env
$ touch /tmp/db
$ php artisan migrate:refresh --seed
$ php artisan retrieve:docents
$ php artisan retrieve:holidays
$ php artisan serve
$ xdg-open http://localhost:8000
```

## Dokumentation erstellen

Es wird davon ausgegangen das der vorherige Schritt in [@sec:install] ausgeführt
wurde und das Arbeitsverzeichnis unverändert ist.

```{.bash .numberLines}
$ sudo apt install make latexmk
$ sudo apt install texlive-latex-recommended texlive-fonts-recommended
$ sudo apt install texlive-latex-extra texlive-fonts-extra
$ sudo apt install texlive-luatex texlive-lang-german
```

Ubuntu hat kein Paket `pandoc-crossref`, deshalb muss dieses erst mit
`cabal` heruntergeladen und kompiliert werden. Bitte auch den nächsten Absatz
beachten!

```{.bash .numberLines}
$ sudo apt install cabal-install
$ cabal update
$ cabal install pandoc pandoc-crossref
$ export PATH=~/.cabal/bin/pandoc:$PATH
```

Der vorherige Schritt kann weggelassen werden und das Standardpaket installiert
werden, allerdings funktionieren dann keine Referenzen (d.h. die Dokuemtentation
lässt sich komplett erstellen, aber Verweise auf andere Kapitel oder Unterkapitel
funktionieren nicht). Als Folge daraus muss noch die Zeile `--filter
pandoc-crossref` aus dem `doc/Makefile` entfernt werden.

```{.bash .numberLines}
$ apt install pandoc
```

Nach dem `pandoc` installiert ist, kann die Dokumentation wie folgt
erstellt werden:

```{.bash .numberLines}
$ cd doc
$ make
$ xdg-open pdf/paper.pdf
```

## Befehle

### Allgemein

Die folgenden Befehle können manuell aufgerufen werden, aber auch automatisch.
Um sie automatisch auszuführen kann das Task-Scheduling aktiviert werden mit
dieser Anleitung: <https://laravel.com/docs/5.4/scheduling>. Dann werden die
Befehle am Anfang jedes Semesters aufgerufen (siehe `app/Console/Kernel.php`).

### Dozenten aktualisieren

Am Ende des Semester können die Dozenten-Konten aktualisiert werden. Dazu dient
der Befehl `php artisan retrieve:docents`. Alle Dozenten die über die
Schnittstelle nicht mehr vorhanden sind, werden deaktiviert. Deaktivierte
Dozenten die noch Zugriff auf ihr E-Mail-Konto haben können sich erneut
registrieren und anmelden. Die Zugangsdaten für die Schnittstelle der
iOS-Stundenplan-App müssen in der `.env`-Datei eingetragen werden (Schlüssel:
`IOSAPP_USERNAME` und `IOSAPP_PASSWORD`).

Zum Testen kann die Option `--from-cache` verwendet werden. Hier werden die
Daten nur einmal vom Server geholt und dann in einer lokalen Datei
`/tmp/docents` zwischengespeichert.

### Feiertage aktualisieren

Die Feiertage können über den Befehl `php artisan retrieve:holidays`
aktualisiert werden. Die Daten werden von der Hochschule Homepage unter 
<http://www.hof-university.de/studierende/studienbuero/termine.html> geholt.

### Wartung

Zur Wartung kann der Befehl `php artisan maintance` benutzt werden. Es ist
sinnvoll den Befehl am Ende des Semester auszuführen. Der Befehl
führt folgendes aus:

- Alle Kontosperrungen werden gelöscht
- Alle Studentenkonten werden auf inaktiv gesetzt
- Alle Konten bei denen ein Login das letzte Mal vor 10 Jahren stattgefunden
  hat, werden gelöscht
- Alle Termine und Terminanfragen die älter als 10 Jahren sind werden gelöscht

## Manuelles Testen der REST-Schnittstelle {#sec:test.html}

Über <http://localhost/test.html> kann die REST-Schnittstelle manuell getestet
werden. 

![Seite test.html im Browser](../images/test.html.png){#fig:test.html width=90%}

Über die Auswahl `Login` kann man sich als ein vorhandener Benutzer anmelden,
solange das Passwort `clearTextPasswort` ist. Im darunter liegenden Feld kann
man seine Anfragen formulieren. Eine Anfrage halt folgende Syntax:

    (delete|post|put|get):<url> <json>;

Es können mehrere Anfragen in diesem Feld stehen, diese müssen aber mit
Semikolon (`;`) getrennt werden. Um eine bestimmte Anfrage auszuführen klickt
man mit der Maus oder positioniert das Caret auf irgendein Zeichen vor dem
Semikolon. Eine Anfrage kann entweder mit klicken auf `Send...` oder mit der
Tastenkombination `CTRL + Enter` ausgeführt werden.

Im rechten Bereich sieht man das Ergebnis der Anfrage.

## Front-End

Als Startseite kommt immer der Login wie in [@fig:login] zusehen. Hier kann man
sich, wenn man bereits Registriert ist einloggen.

![Login mit E-Mail und Passwort](../images/login.png){#fig:login width=60%}

Falls man noch nicht Registriert ist, kann man auf "Registrieren" (siehe [@fig:login])
klicken. Dann kommt man auf die Maske wie in [@fig:register] zu sehen. 

![Registrieren mit E-Mail und Passwort](../images/register.png){#fig:register
width=60%}

Falls man sein Passwort vergessen hat, kann man auf "Passwort vergessen?" (siehe
[@fig:login]) klicken. Die Ansicht ändert sich wie in [@fig:password-reset] zu
sehen. Man trägt seine E-Mail-Adresse ein und klickt auf "Reset" und bekommt
eine E-Mail Nachricht mit neuem Passwort und einem Aktivierungslink.

![Passwort zurücksetzen](../images/password-reset.png){#fig:password-reset
width=60%}

Nach dem Einloggen sieht man als Student [@fig:student-home] und als Dozent
[@fig:docent-home]. Die Einstellungen sind für Studenten und Dozenten
grundlegend die Selben siehe [@fig:common-settings]. Bei Dozenten siehe
zusätzlich [@fig:docent-settings].

![Navigationsleiste](../images/nav.png){#fig:nav width=80%}

![Übersicht des Studenten](../images/student-home.png){#fig:student-home
width=80%}

![Übersicht des Dozenten](../images/docent-home.png){#fig:docent-home width=80%}

In den Einstellungen ([@fig:common-settings]) kann die E-Mail-Adresse, das
Passwort und die Zugehörigkeit zu Fakultäten geändert werden. Dozenten
([@fig:docent-settings]) können zusätzlich noch gesperrte Studenten entsperren
und eigene Feiertage verwalten.

![Einstellungen allgemein](../images/common-settings){#fig:common-settings
width=100%}

![Zusätzliche Einstellungen
Dozent](../images/docent-settings){#fig:docent-settings width=100%}
