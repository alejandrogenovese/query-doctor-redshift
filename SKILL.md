---
name: query-doctor-design
description: Use this skill to generate well-branded interfaces and assets for Query Doctor — a Redshift SQL analyzer / optimizer accelerator (part of ArqData Value Accelerators). Either for production or throwaway prototypes / mocks / pitches. Contains essential design guidelines, colors, type, fonts, assets, and a UI kit recreating the main product surface for prototyping.
user-invocable: true
---

# Query Doctor — Design Skill

Query Doctor is an SQL analyzer for Amazon Redshift. The visual language is **clinical and technical**: SQL is shown as evidence (dark code surfaces), the diagnostic is shown as a calm, structured report (light prose surfaces), and severity is communicated with a **triage palette** (rojo / ámbar / verde). The product speaks **Spanish rioplatense, professional**, no emoji, no hype.

## Where to start

1. **Read `README.md`** — it covers the product context, Content Fundamentals (voice, tone, microcopy), Visual Foundations (color, type, spacing, motion, states), and Iconography. It is the source of truth for every design decision below.
2. **Browse `preview/*.html`** — atomic specimens for every token and component (type, colors, spacing, components, brand). Open them or screenshot them when you need to see a token in context.
3. **Open `ui_kits/web-app/`** — the full product surface as a working React click-thru. Use it as a starting point for any larger artifact.

## Tokens — `colors_and_type.css`

Single file at the project root. Import it at the top of any HTML you build:

```html
<link rel="stylesheet" href="colors_and_type.css" />
```

It defines:

- **Color** — `--paper-*` / `--ink-*` neutrals (warm-tinted), `--galicia-*` brand orange (Banco Galicia), `--granate-*` deep-red secondary, `--signal-*` accent cyan, `--critical-* / --warn-* / --ok-*` triage, `--sql-*` syntax tokens.
- **Semantic vars** — `--bg`, `--fg`, `--fg-muted`, `--brand`, `--border`, `--border-focus`, etc. **Always use these in components, not the raw scales.** Dark mode swaps under `[data-theme="dark"]`.
- **Type** — `--font-sans` (IBM Plex Sans), `--font-mono` (IBM Plex Mono), `--font-serif` (IBM Plex Serif, rarely). Modular scale on `1.2`, base **15px**.
- **Spacing** — 8pt grid (`--space-1` … `--space-9` = 4 … 96px).
- **Radius / shadow / motion** — see file.

## Iconography

**Lucide**, loaded from CDN (`https://unpkg.com/lucide@0.453.0/...`), 1.5 stroke. Always `currentColor`. Sizes: `16px` inline, `20px` in buttons, `24px` in headers. **No emoji**, **no unicode arrows**. Curated set in `README.md → Iconography`.

## Logo

`assets/logo.svg` (lockup) and `assets/logo-mark.svg` (glyph only). The glyph is Lucide's `stethoscope`. Don't substitute another icon for the brand.

## When the user invokes this skill without further context

Ask what they want to build (slide, landing, prototype, internal doc, etc.), then ask **at least** these:

- Surface — full app, pitch deck, single mock, marketing page, doc?
- Audience — internal devs / data team / management / sales?
- Do they want to explore variants, or one polished pass?
- Light / dark / both?

Then build. Output **HTML artifacts** by default. If they want production code, lift the tokens out of `colors_and_type.css` and the patterns out of `ui_kits/web-app/`.

## Hard rules

- **No emoji in product.** Allowed only in internal docs (this skill's README has ✅/❌ — that is *not* product).
- **No gradients, blobs, mesh backgrounds, hero illustrations, stock photography.** The product surface is flat with sober borders + minimal shadow.
- **No rounded-corner-plus-colored-left-border cards** unless they communicate real severity (see callouts).
- **Severity is always paired with a Lucide icon and a text label** (`Crítico` / `Atención` / `OK`). Never color alone.
- **Spanish rioplatense, technical, sober.** "Pegá tu query", not "Pega tu consulta". "Diagnosticar", not "Analyze". Never `🚀` or `✨`.
- **`SELECT *` always tagged as a finding**, never used in optimized examples.
- **`LIMIT 100` is the safe-exec default.**
- **Read-only.** Never produce examples that show `DROP / DELETE / UPDATE / INSERT / ALTER / TRUNCATE / CREATE / GRANT / REVOKE / COPY / UNLOAD`. If a user asks for one, refuse and explain the guardrail.

## Asset inventory at a glance

```
README.md
SKILL.md             ← this file
colors_and_type.css
assets/
  logo.svg
  logo-mark.svg
preview/
  type-*.html         (5 cards)
  colors-*.html       (6 cards)
  spacing-*.html      (4 cards)
  comp-*.html         (9 cards)
  brand-*.html        (4 cards)
ui_kits/
  web-app/
    README.md
    index.html        ← full prototype
    App.jsx
    Header.jsx
    Editor.jsx
    ModeBar.jsx
    Callout.jsx
    Report.jsx
    sample.js
    app.css
```

## Reference repos

The product brief lives at **[alejandrogenovese/query-doctor-redshift](https://github.com/alejandrogenovese/query-doctor-redshift)**. Read it for the full functional context (modes, guardrails, contract JSON, MVP backlog) before designing anything significant.
