<div align="center">

# 🐧 Linux Mint — Überlebenshandbuch

**Dein Wegweiser von Windows in die freie Welt.**
Für alle, die technisch affin sind, aber noch nie mit Unix zu tun hatten.

<code>🪟 Windows-Gewohnheiten</code> &nbsp;→&nbsp; <code>📖 21 Kapitel + Anhang</code> &nbsp;→&nbsp; <code>🐧 sicher unterwegs in Linux Mint</code>

![Lizenz](https://img.shields.io/badge/Lizenz-MIT-22c55e?style=flat-square)
![Sprache](https://img.shields.io/badge/Sprache-Deutsch-0ea5e9?style=flat-square)
![Linux Mint](https://img.shields.io/badge/Linux%20Mint-22%20·%20Cinnamon-8b5cf6?style=flat-square&logo=linuxmint&logoColor=white)
![Node.js](https://img.shields.io/badge/Konverter-Node.js%20·%20keine%20Abhängigkeiten-3776ab?style=flat-square&logo=nodedotjs&logoColor=white)
![PRs willkommen](https://img.shields.io/badge/PRs-willkommen-f59e0b?style=flat-square)

</div>

---

## 🎯 Was ist das?

Ein kompaktes, praxisnahes Handbuch für den Umstieg von Windows auf Linux Mint.
Es erklärt nicht jedes Detail, sondern das, was du in den ersten Wochen wirklich
brauchst: wie Linux denkt, wie du dich im Terminal zurechtfindest, wie du
Software installierst — und was du tust, wenn etwas nicht funktioniert.

Jedes Thema wird mit dem vertrauten Windows-Gegenstück erklärt. Dazu gibt es eine
Taschenkarte mit den wichtigsten Befehlen zum Ausdrucken.

> [!TIP]
> **Einfach lesen?** Öffne [`linux-mint-handbuch.html`](linux-mint-handbuch.html)
> im Browser: gestylt, mit anklickbarem Inhaltsverzeichnis und druckfreundlich.
> Auf GitHub liest sich [`linux-mint-handbuch.md`](linux-mint-handbuch.md) direkt.

---

## 📚 Inhalt

|    | Bereich | Kapitel |
|:--:|---------|---------|
| 🧠 | **Grundlagen** | 1 Der mentale Umstieg · 2 So funktioniert Linux · 3 Das Dateisystem · 4 Das Terminal (Tastenkürzel, Pipes, Alltagsbefehle) |
| 📦 | **Software & System** | 5 Programme installieren (apt, Flatpak, .deb) · 6 Software-Einkaufsliste · 7 Benutzer, Rechte & sudo · 8 Dienste mit systemctl |
| 🔄 | **Umstieg** | 9 Windows → Mint-Umrechnungstabelle · 10 Die ersten 10 Dinge nach der Installation · 11 Häufige Stolperfallen |
| 🛠️ | **Werkzeuge** | 12 grep & find · 13 Archive (.zip, .tar.gz) · 14 Dein erstes Skript (Aliase, Cron) |
| 🆘 | **Hilfe** | 15 Wo du Hilfe findest · 16 Erste Hilfe, wenn was kaputt geht |
| 🌱 | **Weiterkommen** | 17 Lernplan für die erste Woche · 18 Design & Style (Themes, Applets, Desklets, Conky) · 19 Terminal-Spaß · 20 Dein wöchentliches Ritual |
| 🗂️ | **Zum Nachschlagen** | 21 Taschenkarte · Anhang: Ausblick („Wenn du bereit bist“) und Glossar |

---

## 📁 Dateien

|    | Datei | Was ist das? |
|:--:|-------|--------------|
| 📝 | [`linux-mint-handbuch.md`](linux-mint-handbuch.md) | Das Handbuch — die Quelle, hier wird bearbeitet |
| 🌐 | [`linux-mint-handbuch.html`](linux-mint-handbuch.html) | Gestyltes HTML zum Lesen & Drucken (generiert, nicht von Hand ändern) |
| ⚙️ | [`md2html.mjs`](md2html.mjs) | Kleiner Node-Konverter: Markdown → HTML, ohne Abhängigkeiten |

---

## ⚙️ Das HTML neu generieren

```text
  linux-mint-handbuch.md  ──►  node md2html.mjs  ──►  linux-mint-handbuch.html
        (Quelle)                  │                      (zum Lesen & Drucken)
                                  └──►  Anker-Check: lösen alle Links im
                                        Inhaltsverzeichnis auf?
```

Voraussetzung ist nur [Node.js](https://nodejs.org). Nach jeder Änderung am Markdown:

```bash
node md2html.mjs linux-mint-handbuch.md linux-mint-handbuch.html
```

Die Ausgabe endet mit `Anker-Check OK (…)`. Steht dort `FEHLENDE ANKER: …`,
passt ein Link im Inhaltsverzeichnis nicht zu seiner Überschrift.

> [!IMPORTANT]
> Der Konverter versteht nur ein **Markdown-Subset**: Überschriften (`#` bis `###`),
> Codeblöcke, Tabellen, **einfache** Listen (keine Verschachtelung), Trennlinien
> sowie **Fett**, `Inline-Code` und Links. *Kursiv* wird nicht umgewandelt.
> Alles bis zur ersten `---`-Linie wird als Titelseite gerendert.

---

## 🤝 Mitwirken

Issues und Pull Requests sind willkommen — ob Tippfehler, veraltete Befehle oder
ein fehlendes Thema. Änderungen bitte im Markdown machen und danach das HTML neu
generieren (siehe oben), damit beide Dateien im PR zusammenpassen.

---

## 📄 Lizenz

[MIT](LICENSE) — frei verwendbar: kopieren, anpassen, weitergeben.

---

<div align="center">
<sub>Gemacht für alle, die Windows den Rücken kehren — willkommen in der freien Welt. 🐧</sub>
</div>
