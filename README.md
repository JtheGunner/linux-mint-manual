# 🐧 Linux Mint — Überlebenshandbuch

Ein kleines Handbuch für den Umstieg von Windows nach Linux Mint.
Für alle, die technisch affin sind, aber noch nie mit Unix zu tun hatten:
Terminal-Basics, Dateisystem, apt & Flatpak, sudo, Stolperfallen —
und eine Taschenkarte zum Ausdrucken.

## Dateien

| Datei | Was ist das? |
|---|---|
| [`linux-mint-handbuch.md`](linux-mint-handbuch.md) | Das Handbuch (Markdown, die Quelle) |
| [`linux-mint-handbuch.html`](linux-mint-handbuch.html) | Gestyltes HTML zum Lesen & Drucken (generiert) |
| [`md2html.mjs`](md2html.mjs) | Kleiner Node-Konverter: Markdown → HTML, ohne Abhängigkeiten |

## Das HTML neu generieren

Nach Änderungen am Markdown:

```bash
node md2html.mjs linux-mint-handbuch.md linux-mint-handbuch.html
```

Der Konverter erwartet ein Markdown-Subset (Headings, Codeblöcke, Tabellen,
Listen, Bold/Inline-Code/Links) und prüft beim Generieren automatisch, ob alle
Inhaltsverzeichnis-Anker auflösen.

## Inhalt in 15 Kapiteln

Mentaler Umstieg · Dateisystem · Terminal (inkl. Pipes & Tastenkürzel) ·
Programme installieren · sudo & Rechte · Windows→Mint-Tabelle ·
Die ersten 10 Dinge nach der Installation · Häufige Stolperfallen ·
grep & find · Dein erstes Skript (Aliase, Cron) · Wo du Hilfe findest ·
Design & Style (Themes, Applets, Desklets, Conky) · Lernplan für die erste Woche · Taschenkarte

---

Frei verwendbar: Kopieren, anpassen, weitergeben. 🐧
