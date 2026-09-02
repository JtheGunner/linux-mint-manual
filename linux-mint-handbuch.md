# 🐧 Linux Mint — Überlebenshandbuch

**Dein Wegweiser von Windows in die freie Welt.**
Für alle, die technisch affin sind, aber noch nie mit Unix zu tun hatten.

---

## Inhaltsverzeichnis

1. [Der mentale Umstieg](#1-der-mentale-umstieg)
2. [So funktioniert Linux (in 60 Sekunden)](#2-so-funktioniert-linux-in-60-sekunden)
3. [Das Dateisystem verstehen](#3-das-dateisystem-verstehen)
4. [Das Terminal — dein neues Werkzeug](#4-das-terminal--dein-neues-werkzeug)
5. [Programme installieren & entfernen](#5-programme-installieren--entfernen)
6. [Benutzer, Rechte & sudo](#6-benutzer-rechte--sudo)
7. [Windows → Mint: Umrechnungstabelle](#7-windows--mint-umrechnungstabelle)
8. [Die ersten 10 Dinge nach der Installation](#8-die-ersten-10-dinge-nach-der-installation)
9. [Häufige Stolperfallen](#9-häufige-stolperfallen)
10. [Text suchen: grep & find](#10-text-suchen-grep--find)
11. [Dein erstes Skript](#11-dein-erstes-skript)
12. [Wo du Hilfe findest](#12-wo-du-hilfe-findest)
13. [Lernplan für die erste Woche](#13-lernplan-für-die-erste-woche)
14. [Design & Style — Mach Mint zu deinem](#14-design--style--mach-mint-zu-deinem)
15. [Taschenkarte: Die wichtigsten Befehle](#15-taschenkarte-die-wichtigsten-befehle)

---

## 1. Der mentale Umstieg

Windows und Linux denken grundlegend anders:

| | Windows | Linux Mint |
|---|---|---|
| Philosophie | GUI zuerst, Terminal ist das Werkzeug für Nerds | Terminal und GUI sind gleichberechtigt |
| Programme | Installieren sich, wo sie wollen (Programme, AppData, …) | Standardorte (`/usr/bin`, `/opt`) — alles ist nachvollziehbar |
| Einstellungen | Registry (binär, versteckt, fragil) | Klartext-Dateien (`/etc`, `~/.config`) — lesbar und editierbar! |
| Laufwerke | C:, D:, E: … | Ein einziger Baum, der bei `/` beginnt |
| Admin-Rechte | Du bist immer „Administrator“ (UAC) | Normaler User + `sudo` für Admin-Aufgaben |
| Updates | Windows Update (ein Button, viel Kontrolle abgeben) | Paketmanager (`apt`) + Update-Applet — du entscheidest, was aktualisiert wird |

**Die wichtigste Erkenntnis:** Unter Linux ist das Terminal kein „Power-User-Zusatz“ — es *ist* der normale Arbeitsweg. Wenn du dich daran gewöhnt hast, bist du schneller als mit jeder GUI. Und: Alles ist skriptbar. Was du einmal manuell machst, kannst du für immer automatisieren.

**Die gute Nachricht:** Linux Mint ist die am stärksten an Windows orientierte Distribution. Der Desktop (Cinnamon) sieht und fühlt sich wie ein klassisches Windows-Desktop an: Startmenü, Taskleiste, Systemtray. Du bist ab Tag 1 produktiv — den Rest lernst du in deinem Tempo.

---

## 2. So funktioniert Linux (in 60 Sekunden)

Da du technisch affin bist, hier die Architektur in einem Rutsch:

- **Kernel** — das Herzstück. Verwaltet CPU, RAM, Festplatten, Geräte. Bei Mint: der Linux-Kernel (Version prüfbar mit `uname -a`).
- **systemd** — startet beim Booten alle Dienste und überwacht sie (wie der Windows-Dienst-Manager, aber mächtiger).
- **Shell (Bash)** — dein Übersetzer. Du tippst Text, die Shell zerlegt ihn in Befehle und ruft Programme auf. Alles, was du im Terminal tust, läuft über sie.
- **Userland** — alle Programme (Browser, Office, …) laufen als normale Prozesse *über* dem Kernel.

**Das „Everything is a file“-Prinzip:** Unter Linux ist (fast) alles eine Datei — auch Geräte (`/dev/sda` = deine Festplatte, `/dev/null` = die Leere) und sogar laufende Prozesse (jeder Prozess hat einen Ordner unter `/proc/`). Das klingt seltsam, ist aber der Schlüssel zum Verständnis: Wenn du Dateien lesen und schreiben kannst, kannst du das System steuern.

---

## 3. Das Dateisystem verstehen

Es gibt keine Laufwerke. Alles hängt an einem einzigen Baum, der bei `/` (Root) beginnt:

```
/                     ← die Wurzel (das „C:\“ — aber hier ist ALLES drin)
├── home/             ← Benutzerordner (dein „C:\Users“)
│   └── deinname/     ← DEIN Home: Dokumente, Downloads, Bilder …
├── etc/              ← Systemeinstellungen (die „Registry“ — aber lesbarer Text!)
├── usr/
│   ├── bin/          ← die meisten Programme leben hier (nicht anfassen)
│   └── share/        ← Programm-Daten, Dokumentation
├── var/
│   ├── log/          ← Protokolle (wenn was kaputt ist: hier nachschauen)
│   └── tmp/          ← temporäre Dateien
├── tmp/              ← temporäre Dateien (beim Neustart geleert)
└── dev/              ← Geräte (Festplatten, Tastatur, … als „Dateien“)
```

**Regeln, die du kennen musst:**

- **Versteckte Dateien beginnen mit einem Punkt**: `.bashrc`, `.config` — sichtbar machst du sie mit `ls -a`. Deine persönlichen Einstellungen liegen in `~/.config/` (das `~` ist dein Home-Verzeichnis).
- **Groß-/Kleinschreibung zählt**: `Datei.txt` und `datei.txt` sind zwei verschiedene Dateien. Das ist der häufigste Fehlerquelle für Windows-User — in Pfade, Dateinamen und Befehlen.
- **Pfade**: Absolut beginnt mit `/` (`/home/deinname/dokumente`), relativ bezieht sich auf den aktuellen Ort (`./dokumente`). `~` = dein Home.
- **Kein „Dieser PC“**: Es gibt keine Übersicht aller Laufwerke — aber `ls /` zeigt dir die oberste Ebene.
- **Externe Laufwerke & USB-Sticks**: Werden automatisch eingebunden (meist unter `/media/deinname/`) und erscheinen im Dateimanager bzw. auf dem Desktop — kein Laufwerksbuchstabe nötig. Vor dem Ausstecken per Rechtsklick → „Auswerfen“ trennen (wie unter Windows).

---

## 4. Das Terminal — dein neues Werkzeug

Öffnen mit **Strg+Alt+T** oder über das Startmenü. Was du siehst, ist die Shell (Bash): Sie nimmt Textbefehle entgegen, führt sie aus und zeigt dir das Ergebnis.

### 4.1 Orientieren

```bash
pwd              # Wo bin ich? (print working directory)
ls               # Was ist hier?
ls -la           # Alles, inkl. versteckter Dateien + Details
cd /home/deinname   # ins Home-Verzeichnis
cd ..            # eine Ebene hoch
cd -             # zurück zum vorherigen Ort (super praktisch)
```

### 4.2 Mit Dateien arbeiten

```bash
mkdir projekt            # Ordner anlegen
cp datei.txt backup/     # kopieren (copy)
mv alt neu               # verschieben ODER umbenennen (move)
rm datei.txt             # löschen — IM TERMINAL GIBT ES KEINEN MÜLL!
rm -r ordner/            # Ordner inkl. Inhalt löschen (vorsichtig!)
cat datei.txt            # Dateiinhalt im Terminal anzeigen
less datei.txt           # lange Datei blättern (q = zurück)
```

### 4.3 Die Tastenkürzel, die alles verändern

| Kürzel | Wirkung | Windows-Äquivalent |
|---|---|---|
| **Tab** | Vervollständigt Dateinamen/Befehle — 2 Buchstaben tippen, Tab drücken | *(existiert nicht)* |
| **Strg+R** | Befehlshistorie durchsuchen — paar Buchstaben tippen, Strg+R halten | *(existiert nicht)* |
| **↑ / ↓** | vorheriger/nächster Befehl | wie in der CMD |
| **Strg+C** | laufendes Programm abbrechen | das rote X / Esc |
| **Strg+Z** | in den Hintergrund legen, `fg` bringt es zurück | *(existiert nicht)* |
| **Strg+L** | Bildschirm leeren | cls / clear |
| **Strg+Shift+C/V** | Kopieren/Einfügen IM TERMINAL (nicht Strg+C/V!) | — |
| **Strg+D** | Terminal schließen / Eingabe beenden | *(existiert nicht)* |
| **Strg+A / Strg+E** | Zeilenanfang/-ende springen | Home/Ende (fast) |
| **Strg+W** | Wort vor dem Cursor löschen | *(existiert nicht)* |

### 4.4 Pipes & Redirects — die Superkraft

```bash
ls -la | grep ".sh"        # filtern: nur .sh-Dateien zeigen (Pipe = Ausgabe an nächsten Befehl)
df -h > disk.txt           # Ausgabe in eine Datei speichern (Achtung: überschreibt die Datei!)
echo "notiz" >> disk.txt   # anhängen (>>) — mit > würde die Datei sonst geleert
apt list --installed 2>/dev/null | wc -l   # wie viele Programme sind installiert? (Zeilen zählen; 2>/dev/null = Fehlermeldungen unterdrücken)
sudo apt update && sudo apt upgrade   # zweiter Befehl läuft nur, wenn der erste klappt (&&)
ls; pwd                    # beide nacheinander, egal ob der erste klappt (;)
```

### 4.5 Alltagsbefehle, die sich lohnen

```bash
whoami           # Wer bin ich? (dein Benutzername)
hostname         # Wie heißt der Rechner?
uname -a         # Welches System/Kernel läuft?
date             # Datum und Uhrzeit
df -h            # Festplattenspeicher (human-readable)
free -h          # RAM-Auslastung
htop             # Task-Manager mit GUI (installieren: sudo apt install htop)
ping google.com  # Funktioniert das Internet? (Strg+C zum Stoppen)
curl -s https://example.com   # eine Webseite im Terminal abrufen
ip a             # deine Netzwerk-Adressen (das „ipconfig“ von Windows)
lsblk            # Platten & Partitionen im Überblick (wie „Laufwerkverwaltung“)
du -sh /home/deinname/*   # Größe der Ordner im Home (wer frisst den Speicher?)
```

---

## 5. Programme installieren & entfernen

Mint bietet drei Wege — fang mit der GUI an, wandere ins Terminal:

**1. Software-Manager (GUI)** — im Menü unter „Software“. Wie der Microsoft Store, nur für Linux. Zum Start völlig ausreichend.

**2. apt (der System-Paketmanager)** — der Standardweg:

```bash
sudo apt update                 # 1. IMMER zuerst! Paketlisten aktualisieren
sudo apt install htop           # Programm installieren
sudo apt remove htop            # deinstallieren (sauber — anders als Ordner löschen)
sudo apt autoremove             # überflüssige Abhängigkeiten aufräumen (nach dem Entfernen)
apt search firefox              # nach Programmen suchen
apt show htop                   # Details zu einem Paket anzeigen
sudo apt upgrade                # alle installierten Programme aktualisieren
```

**3. Flatpak (App-Store für neuere Apps)** — eigenes Ökosystem, wie der Microsoft Store:

```bash
flatpak search gimp                          # suchen
flatpak install flathub org.gimp.GIMP        # von Flathub installieren
flatpak list                                 # installierte Flatpaks anzeigen
flatpak uninstall org.gimp.GIMP              # wieder entfernen
```

**.deb-Dateien** = das Linux-Pendant zu .exe-Installern. Doppelklick im Dateimanager, oder: `sudo dpkg -i datei.deb`. Meldet dabei eine fehlende Abhängigkeit, räumt `sudo apt --fix-broken install` auf.

**Faustregel:** System-Programme (htop, git, …) → `apt`. GUI-Apps, bei denen du die neueste Version willst (Discord, Spotify, VS Code, …) → Flatpak. Mint nutzt bewusst kein Snap — das ist in Ordnung, du brauchst es nicht.

---

## 6. Benutzer, Rechte & sudo

**Du bist nicht der Admin.** Anders als unter Windows loggst du dich als normaler Benutzer ein. Für Admin-Aufgaben (Programme installieren, Systemeinstellungen ändern) setzt du `sudo` vor den Befehl:

```bash
sudo apt install htop    # „super user do“ = als Administrator ausführen
```

- Beim Passwort-Eingeben **erscheint nichts auf dem Bildschirm** — nicht mal Sternchen. Das ist normal, einfach tippen und Enter drücken.
- `sudo` gilt für ~15 Minuten, danach wird das Passwort erneut verlangt.
- **„Permission denied“** ist der häufigste Fehler → meistens heißt es: `sudo` davorsetzen.
- **Nicht als root arbeiten** (dafür gäbe es `sudo -i`, aber das ist für den Alltag zu gefährlich).
- **chmod**: Dateien ausführbar machen: `chmod +x mein-skript.sh`

---

## 7. Windows → Mint: Umrechnungstabelle

| In Windows | In Linux Mint |
|---|---|
| C:\Users\name | /home/name (`~`) |
| Program Files | /usr/bin (nicht anfassen) |
| Registry | Textdateien in `/etc` und `~/.config` |
| Eingabeaufforderung (cmd) | Terminal (Strg+Alt+T, Bash) |
| PowerShell | Bash / Zsh |
| Explorer | Nemo (Dateimanager) |
| Notepad | Text-Editor (gedit) |
| Task-Manager | System-Monitor oder `htop` |
| Systemsteuer | „System“ (Mint-Kontrollzentrum) |
| Papierkorb | Mülleimer (Rechtsklick → leeren) |
| Windows + R | kein direktes Äquivalent — das Terminal ist immer da |
| Rechtsklick → „Terminal hier öffnen“ | **existiert!** Rechtsklick auf Ordner in Nemo |
| Microsoft Store | Software-Manager / Flathub |
| Windows Update | Glocken-Symbol im Panel (Update-Applet) + `sudo apt upgrade` |
| ipconfig | `ip a` (oder kurz: `hostname -I`) |
| Task Planner | Cron (`crontab -e`) — siehe Kapitel 11 |

---

## 8. Die ersten 10 Dinge nach der Installation

1. **System aktualisieren**: `sudo apt update && sudo apt upgrade` (macht auch die Glocke im Panel)
2. **Timeshift einrichten** — Mints System-Snapshots, wie Windows-Wiederherstellungspunkte: *System → Timeshift* → tägliche/wöchentliche Snapshots planen. Wenn später etwas kaputt ist, rollst du das ganze System in 5 Minuten zurück. **Das zuerst machen!**
3. **/home sichern** — Timeshift schützt das System, aber deine Daten (Dokumente, Bilder) sicherst du separat (externe Festplatte, Cloud).
4. **htop installieren**: `sudo apt install htop` — ein schöner Task-Manager fürs Terminal
5. **Platz prüfen**: `df -h` — verschaffe dir ein Bild, wie deine Platten aufgeteilt sind
6. **Benötigte Tools installieren** (Browser, Office — LibreOffice ist schon dabei)
7. **Treiber checken**: *System → Treiber-Manager* (WLAN, Grafik — funktioniert meist out of the box)
8. **Git-User anlegen** (falls du codest): `git config --global user.name "..."` + E-Mail
9. **Täglich 5 Befehle lernen** — siehe Lernplan in Kapitel 13
10. **Genießen.** Die ersten Tage sind Gewöhnung an neue Muskelgedächtnis-Routinen, nicht Lernen von allem.

---

## 9. Häufige Stolperfallen

1. **Groß-/Kleinschreibung** — `ls DATEI.TXT` findet nichts, weil die Datei `datei.txt` heißt. Linux unterscheidet in Pfaden, Dateinamen und Befehlen.
2. **Kein Papierkorb im Terminal** — `rm` löscht endgültig. Im Dateimanager (Nemo) gibt es den Mülleimer. Regel: Im Terminal vor dem `rm` nachdenken. Wer es sicherer mag: `sudo apt install trash-cli` — dann räumt `trash datei.txt` in den Mülleimer statt endgültig zu löschen.
3. **Passwort wird nicht angezeigt** — wenn sudo nach dem Passwort fragt, bleibt der Bildschirm leer. Das ist normal (Sicherheitsfeature), kein Bug.
4. **„Permission denied“** — du brauchst `sudo` vor dem Befehl. Aber: nicht bei allem sudo, nur wo nötig.
5. **Kein C:\-Laufwerk** — es gibt keine Laufwerke, alles liegt unter `/`. Wenn ein Programm „C:\“ sagt, ist es wahrscheinlich ein Windows-Programm, das Linux nicht ganz versteht.
6. **Deinstallieren per Ordner löschen** — funktioniert nicht (und ist gefährlich). `sudo apt remove` oder Software-Manager nutzen.
7. **Virenscanner** — unter Linux meist unnötig. Das Viren-Ökosystem ist anders; 99 % der Malware zielt auf Windows. (Falls doch: ClamAV existiert, wird aber selten gebraucht.)
8. **Spiele** — gute Nachricht: Steam läuft hervorragend unter Linux (Proton spielt die meisten Windows-Spiele). Kompatibilität checken auf [protondb.com](https://www.protondb.com)
9. **Terminal „macht nichts“** — wenn ein Befehl keine Ausgabe produziert, hat er meistens funktioniert (z. B. `mkdir`). Mit `ls` prüfen.
10. **Nicht dagegen ankämpfen** — wenn etwas nicht geht: „linux mint“ + Problem googeln. 90 % aller Probleme hat schon jemand gelöst.
11. **GUI einfriert** — `Strg+Alt+F2` öffnet eine Text-Konsole (dort einloggen, Problem lösen oder sauber neu starten). Zurück zur grafischen Oberfläche: `Strg+Alt+F7`.

---

## 10. Text suchen: grep & find

Die zwei wichtigsten Suchbefehle — einmal gelernt, täglich im Einsatz:

```bash
# grep = Text IN Dateien/Zeilen suchen
grep "fehler" datei.txt               # alle Zeilen mit „fehler“ anzeigen
ls -la | grep ".sh"                   # Liste filtern (mit Pipe kombinieren)
grep -r "text" /home/deinname/proj/   # rekursiv in ALLEN Dateien eines Ordners suchen
grep -i "fehler" datei.txt            # Groß-/Kleinschreibung ignorieren

# find = Dateien NACH NAMEN suchen
find /home/deinname -name "*.pdf"     # alle PDFs im Home-Verzeichnis
find /home/deinname -iname "*.PDF"    # wie -name, aber ohne Groß-/Kleinschreibung
find /home/deinname -name "bericht*"  # Dateien, die mit „bericht“ beginnen

# head/tail = Datei-Anfang/-Ende ansehen, ohne sie zu öffnen
head datei.txt                        # die ersten 10 Zeilen
tail -n 20 /var/log/syslog            # die letzten 20 Zeilen eines Protokolls
```

---

## 11. Dein erstes Skript

Der Killer-Feature von Linux: Alles, was du im Terminal machst, lässt sich automatisieren. Dein erstes Skript dauert 2 Minuten:

```bash
nano hello.sh          # Editor öffnen (oder deinen Favoriten)
```

Rein tippen:

```bash
#!/bin/bash
echo "Hallo! Mein erstes Skript läuft."
date                   # zeigt auch das aktuelle Datum
```

Speichern (in nano: **Strg+O**, Enter, **Strg+X**), dann:

```bash
chmod +x hello.sh      # ausführbar machen
./hello.sh             # ausführen!
```

**Aliases** — deine eigenen Abkürzungen. In `~/.bashrc` (mit nano öffnen) anhängen:

```bash
alias ll='ls -la'                          # ll = alles mit Details auflisten
alias ..='cd ..'                          # .. = eine Ebene hoch
alias proj='cd /home/deinname/projekte'   # direkt ins Projekt-Verzeichnis springen
```

Dann `source ~/.bashrc` (oder neues Terminal öffnen) — fertig, für immer.

**Cron** = der Task-Planner (wie Windows Task Scheduler):

```bash
crontab -e             # deinen Zeitplan öffnen (leer, wenn noch keiner da ist)
# Beispiel: täglich um 3 Uhr morgens sichern:
0 3 * * * rsync -a /home/deinname/dokumente /backup/
```

*(Falls statt nano plötzlich `vi` öffnet — schwarzer Bildschirm, seltsame Tasten: `:q!` tippen und Enter drücken, um zu entkommen. Damit immer nano kommt: `export EDITOR=nano` in `~/.bashrc` anhängen.)*

---

## 12. Wo du Hilfe findest

- **`man befehl`** — das Handbuch zu JEDEM Befehl (z. B. `man grep`). q = zurück. Sieht am Anfang abschreckend aus, ist aber die komplette Doku.
- **`man -k text`** — du weißt den Befehlsnamen nicht? Sucht in allen Handbuch-Titeln (z. B. `man -k pdf`).
- **`befehl --help`** — kurze Hilfe (z. B. `grep --help`)
- **`tldr`** — wenn man-Seiten zu trocken sind: `sudo apt install tldr`, dann z. B. `tldr grep` — kurze Praxisbeispiele statt Voll-Doku.
- **Wenn was kaputt ist und du nicht weißt, wo du suchen sollst:** `journalctl -n 50 --no-pager` zeigt die letzten 50 System-Protokolle.
- **Google** — immer mit „linux mint“ + Version suchen (z. B. „linux mint 22“). Lösungen älterer Versionen passen oft, aber die Version zählt!
- **Mint-Forum** (forum.mint.com) — sehr freundlich, schnelle Antworten
- **Ask Ubuntu** (askubuntu.com) — die große Q&A-Plattform für Linux
- **Reddit**: r/linux, r/MintOS — gut für „ist das normal?“-Fragen
- **Wenn du Hilfe suchst, immer nennen**: Mint-Version (`lsb_release -a`), die exakte Fehlermeldung (kopieren!) und was du schon probiert hast.

---

## 13. Lernplan für die erste Woche

Nicht alles auf einmal lernen. Das funktioniert:

| Tag | Fokus |
|---|---|
| 1 | Einfach nutzen. GUI gewöhnen, Timeshift-Snapshot anlegen (Kapitel 8) |
| 2 | Terminal-Basics: pwd, ls, cd + **Tab-Vervollständigung** (bis es zum Reflex wird) |
| 3 | Dateien: cp, mv, rm + sudo (und das Passwort-ohne-Anzeige-Ding) |
| 4 | apt: update, install, remove — drei Programme installieren, die du wirklich brauchst |
| 5 | grep + Pipes: Text finden, Listen filtern |
| 6 | htop, df, free — das System „fühlen“ lernen |
| 7 | Erstes Skript + zwei Aliase (Kapitel 11) |

**Ab Woche 2:** find, mehr Skripte, Cron-Jobs, vielleicht deine erste eigene Automatisierung — und Design-Experimente (Kapitel 14): ein neues Theme, ein Desklet auf dem Desktop, vielleicht Conky. Das Terminal wird zum Reflex — und dann fragst du dich, wie du je ohne ausgekommen bist.

---

## 14. Design & Style — Mach Mint zu deinem

Linux lässt sich komplett anpassen — von der Fenstergestaltung bis hin zu Widgets auf dem Desktop. Und das Schöne: Fast alles geht per GUI, ohne eine Zeile Konfiguration zu schreiben.

**Das zentrale Steuerzentrum:** *System → Einstellungen* (oder `cinnamon-settings` im Terminal). Dort findest du Themes, Applets, Desklets, Schriften und Hintergründe an einem Ort.

### 14.1 Themes, Icons & Co.

*System → Einstellungen → Erscheinungsbild*:

- **Fenstergestaltung** — Fenster, Menüs und Dialoge (Mint-Y, Adwaita, …). Viele Themes haben eine **dunkle Variante** — per Schalter umschaltbar.
- **Icons & Cursor** — eigene Icon-Sets und Cursor-Themes auswählen oder installieren.
- **Schriften** — Systemschrift, Dokumentenschrift und Monospace-Schrift wählen.
- **Hintergrund** — Wallpaper pro Monitor setzen. Oder einfacher: Rechtsklick auf den Desktop → „Ändern der Desktop-Hintergrund“.

**Mehr Themes:** Die App **Mint Themes** (im Menü) durchsucht [themes.mint.com](https://themes.mint.com) — dort gibt es dutzende Community-Designs, per Klick installierbar.

### 14.2 Panel & Applets

Das Panel (deine Taskleiste) ist frei konfigurierbar:

- **Rechtsklick ins Panel → „Applets“** — Applets hinzufügen, entfernen, umsortieren (Uhr, System-Monitor, …).
- **Rechtsklick → „Panel bearbeiten“** — Position (oben/unten/links/rechts), Höhe, Verhalten.
- **Noch mehr Applets:** *Cinnamon-Einstellungen → Applets → „Installieren“* — öffnet den Spice-Store ([cinnamon-spices.linuxmint.com](https://cinnamon-spices.linuxmint.com)) mit hunderten Community-Applets.

### 14.3 Desklets — Widgets auf dem Desktop

Du willst System-Infos wie htop permanent auf dem Desktop abbilden — aber hübscher? Das ist ein Klassiker unter Linux-Nutzern. Die native Lösung:

- **Rechtsklick auf den Desktop → „Zum Desktop hinzufügen“** — dort gibt es u. a. einen **System-Monitor-Desklet**: CPU, RAM, Festplatte und Netzwerk als kleine Graphen direkt auf dem Desktop.
- Per Rechtsklick auf den Desklet verschiebbar und konfigurierbar (was angezeigt wird, Farben).
- Weitere Desklets (Uhr, Kalender, Notizen …) über *Cinnamon-Einstellungen → Desklets → „Installieren“*.

### 14.4 Conky — die hübschere Variante

Wenn dir der Desklet nicht „modern“ genug ist: **Conky** ist ein extrem anpassbares Desktop-Widget (Konfiguration in Lua). Damit entstehen die schicken, minimalistischen System-Dashboards, die man auf Linux-Desktops sieht. (Mints Cinnamon läuft standardmäßig unter X11 — genau das, was Conky braucht.)

```bash
sudo apt install conky            # installieren
conky                            # einmal testweise starten (Strg+C beendet)
```

- **Fertige Designs:** [conky.cc](https://conky.cc/) ist die offizielle Doku (inkl. Tutorial); für fertige Konfigurationen z. B. [zagortenay333/conky_themes](https://github.com/zagortenay333/conky_themes) auf GitHub.
- **Übernehmen:** Konfigurationsdatei als `~/.config/conky/conky.conf` speichern, dann einfach `conky` ausführen.
- **Automatisch starten:** *System → Einstellungen → Autostart* → hinzufügen, Befehl: `conky`.
- **Anpassen:** Farben, Schriften und angezeigte Werte stehen oben in der Konfigurationsdatei — zum Starten genügt es, eine Vorlage zu nehmen und nur Farben/Schriften zu ändern.

### 14.5 Schriften & Terminal-Farben

**Eigene Schriften installieren:**

```bash
mkdir -p ~/.local/share/fonts     # Ordner anlegen (falls nicht vorhanden)
# .ttf/.otf-Dateien dorthin kopieren (z. B. per Drag & Drop in Nemo)
fc-cache -f ~/.local/share/fonts  # für das System registrieren
```

Danach stehen sie in *Erscheinungsbild → Schriften* und in allen Programmen zur Verfügung.

**Terminal-Farben:** *Terminal → Einstellungen* — beim Profil unter „Farben“ gibt es fertige Paletten (oder eigene). Ein modernes Farbschema macht htop & Co. sofort deutlich angenehmer.

---

## 15. Taschenkarte: Die wichtigsten Befehle

*Zum Ausdrucken und an die Wand hängen:*

```
ORIENTIEREN          DATEIEN              SYSTEM
pwd                  mkdir ordner         whoami
ls -la               cp a b/              df -h        (Platte)
cd /pfad             mv a b               free -h      (RAM)
cd ..                rm datei             htop         (Prozesse)
cd -                 rm -r ordner/        uname -a     (Kernel)
                     cat datei            ip a         (Netzwerk)
                     du -sh ordner/       lsblk        (Laufwerke)

PROGRAMME            SUCHEN               TASTEN
sudo apt update      grep "text" datei    Tab        Vervollständigen
sudo apt install x   grep -r "t" ordner/  Strg+R     Historie suchen
sudo apt remove x    find . -name "*.pdf" Strg+C     abbrechen
apt search x         man befehl           Strg+L     leeren
flatpak install …    befehl --help        Strg+Shift+C/V  kopieren/einfügen

REGELN:
• Groß-/Kleinschreibung zählt (Datei ≠ datei)
• rm im Terminal = endgültig gelöscht
• „Permission denied“ → sudo davor
• Passwort im Terminal wird nicht angezeigt — normal!
• Im Zweifel: ls tippen und umsehen. Man kaputt macht man fast nichts —
  außer mit „sudo rm -rf“ ohne Nachdenken.
```

---

**Wichtigste Pfade auf einen Blick:**

```
~/.bashrc        ← deine Terminal-Einstellungen (Aliases, Farben)
~/.config/       ← App-Einstellungen (versteckte Ordner mit Punkt)
/etc/            ← systemweite Einstellungen
/var/log/        ← Protokolle (wenn was kaputt ist: hier nachschauen)
/tmp/            ← temporäre Dateien (beim Neustart geleert)
```

**Letzter Tipp:** Wenn du unsicher bist, tippe `ls` und sieh dich um. Unter Linux kann man fast alles erkunden, ohne etwas kaputt zu machen — solange man nicht mit `sudo rm -rf` um sich wirft. (Und selbst das: nie mit trailing `/` und ohne Nachdenken.)

Viel Erfolg — und willkommen in der freien Welt! 🐧
