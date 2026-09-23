# Working on linux-mint-manual

## Language

Deviation from the global English-everywhere rule: this is a German-language
handbook for German readers.

- **German:** `README.md`, `linux-mint-handbuch.md` and the generated
  `linux-mint-handbuch.html` — all reader-facing content.
- **English:** code and comments in `md2html.mjs`, commit messages, branch
  names, PR titles and descriptions.

## Workflow

Edit the Markdown, then regenerate the HTML in the same change:

```bash
node md2html.mjs linux-mint-handbuch.md linux-mint-handbuch.html
```
