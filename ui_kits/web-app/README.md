# UI Kit — Query Doctor Web App

This kit recreates the main product surface: a split-pane workspace where the user pastes SQL on the left and receives a Markdown diagnostic on the right. It is a click-thru fake — no real Redshift, no real LLM — but it covers the full visual + interaction language.

## Files

- `index.html` — full prototype with sample query → diagnostic flow.
- `App.jsx` — top-level layout (header, split-pane).
- `Header.jsx` — brand, cluster/db/schema context pills, MCP status, export.
- `Editor.jsx` — dark SQL editor with line gutter and syntax highlighting (regex-based, just for show).
- `ModeBar.jsx` — Analyze / Explain / Safe exec / Compare segmented control + primary CTA.
- `Report.jsx` — diagnostic report panel: summary, findings, optimized query, validation SQL, risks.
- `Callout.jsx` — severity callouts (Crítico / Atención / OK).
- `sample.js` — the example query + canned diagnostic data so the demo always shows something.

## Why this layout

Every interview signal in the brief points the same direction: the user pastes a query, picks a mode, hits **Diagnosticar**, reads a report. There is no nav, no settings, no list-of-past-queries. Keep it one screen.

## Out of scope

- No real SQL parsing — `Editor.jsx` is a textarea + a regex highlight overlay used only when the textarea is blurred (so editing stays simple).
- No real markdown rendering — `Report.jsx` builds the structure with JSX directly.
- No real MCP — the "MCP conectado" badge is decorative.
