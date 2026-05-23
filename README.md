# Query Doctor — Design System

> Acelerador de valor de Arquitectura Data: analiza, explica y optimiza consultas SQL sobre Amazon Redshift. **No reemplaza el IDP** ni los flujos formales de Plataforma, Gobierno, Seguridad o CI/CD. Es un *advisor técnico*.

---

## 1. Producto

**Query Doctor Redshift** es una aplicación web donde un usuario pega una consulta SQL, elige un modo de análisis, y recibe un reporte estructurado que cubre:

- **Diagnóstico** funcional ("qué hace la query, en castellano").
- **Hallazgos** de performance (`SELECT *`, joins amplios, filtros tardíos, falta de predicados temporales, scans completos).
- **Plan de ejecución** (`EXPLAIN`) interpretado a lenguaje natural.
- **Query optimizada** sugerida, con justificación.
- **Validación** de equivalencia (`EXCEPT`, `COUNT(*)`) entre original y propuesta.
- **Reporte markdown** descargable para adjuntar a PR / ticket / ADR.

### Modos de análisis

| Modo | Descripción | Toca Redshift |
|---|---|---|
| **Analyze** | Solo analiza el texto de la query. | No |
| **Explain** | Ejecuta `EXPLAIN <query>` y interpreta el plan. | Sí (read-only) |
| **Safe execution** | Ejecuta SELECT con `LIMIT` forzado. | Sí (read-only) |
| **Compare** | Genera SQL de validación original vs. optimizada. | Opcional |

### Guardrails (no negociables)

- Solo `SELECT`, `WITH`, `EXPLAIN`. Bloqueo de `DROP / DELETE / UPDATE / INSERT / ALTER / TRUNCATE / CREATE / GRANT / REVOKE / COPY / UNLOAD`.
- `LIMIT` automático para muestreo exploratorio.
- Detección de columnas potencialmente sensibles (`dni`, `cuit`, `mail`, `documento`, `party_id`, etc.) con advertencia de masking.
- Nunca cambia semántica silenciosamente. Toda optimización viene acompañada de validación sugerida.

### Posicionamiento (lo que NO es)

Query Doctor **no** crea data products, **no** gestiona contratos, **no** otorga permisos, **no** despliega. Es un *asistente de revisión arquitectónica y performance*, no un reemplazo del developer ni del DBA.

---

## 2. Audiencia

- Data Engineers
- Arquitectos de Datos
- Analistas avanzados que escriben SQL contra Redshift
- Referentes técnicos de dominio

Idioma de la interfaz: **español rioplatense, profesional**.

---

## 3. Fuentes

Este sistema fue derivado del brief del producto **[alejandrogenovese/query-doctor-redshift](https://github.com/alejandrogenovese/query-doctor-redshift)** (`query-doctor-redshift.md` + docx en el root del repo). El repo contiene únicamente documentación funcional; **no hay código ni assets visuales previos**. Toda la dirección visual de este design system es una propuesta original construida a partir del brief.

Si querés profundizar antes de iterar sobre estos diseños, leé el repo fuente — define alcance MVP, guardrails, contrato JSON propuesto, y métricas de éxito.

---

## 4. Content Fundamentals

### Voz y tono

| Eje | Decisión |
|---|---|
| **Idioma** | Español rioplatense (Argentina). "Vos" técnico, no "tú". |
| **Persona** | Médico clínico de queries: diagnostica, recomienda, advierte. No reta, no aplaude. |
| **Tecnicismo** | Alto. La audiencia es técnica — no traducimos `JOIN`, `EXPLAIN`, `predicate pushdown`, `sort key`. |
| **Tono** | Sobrio, preciso, accionable. Cero hype. Cero emoji. |
| **Persona gramatical** | Tercera persona para describir la query ("La query realiza un JOIN..."), segunda para sugerencias ("Considerá filtrar antes del JOIN"). |
| **Casing** | Sentence case en UI ("Pegá tu query", no "Pegá Tu Query"). MAYÚSCULAS solo para palabras reservadas SQL en código. |
| **Severidad** | Tres niveles consistentes: **Crítico** (rojo) / **Atención** (ámbar) / **OK** (verde). Sin "warning", "error", "success" en castellano de UI. |

### Cómo se escribe — ejemplos

✅ Sí:
> La query realiza un JOIN entre `clientes` y `movimientos` **sin filtrar previamente movimientos por fecha**. Esto puede aumentar el volumen intermedio procesado.

> **Recomendación.** Filtrar `movimientos` en un CTE antes del JOIN para reducir cardinalidad.

> **Atención.** La columna `documento` podría exponer datos personales. Recomendamos agregación o masking según perfil del consumidor.

❌ No:
> 🚀 ¡Tu query tiene problemas! Pero no te preocupes, ¡vamos a optimizarla juntos! ✨

> Your query is functionally valid but...

### Estructura del reporte (markdown estándar)

Toda salida sigue este orden de secciones:

1. **Resumen ejecutivo** — un párrafo, diagnóstico de la query.
2. **Qué hace la query** — explicación funcional.
3. **Tablas y columnas detectadas**
4. **Hallazgos** — lista numerada con severidad.
5. **Recomendaciones**
6. **Query optimizada sugerida** (bloque `sql`)
7. **Validación sugerida** (bloque `sql`)
8. **Riesgos y consideraciones**

### Microcopy

- Botón primario: **"Diagnosticar"** (no "Analizar", no "Run").
- Estado vacío del editor: **"Pegá tu query SQL acá."**
- Estado durante análisis: **"Diagnosticando…"**
- Bloqueo de guardrail: **"Esta sentencia no es de solo lectura. Query Doctor solo procesa SELECT / WITH / EXPLAIN."**
- Sin resultados / consulta vacía: **"Esperando una query."**

---

## 5. Visual Foundations

### Metáfora central

Query Doctor toma prestada la iconografía del **diagnóstico clínico**, pero sin caricatura. La interfaz es la de un **lector de placas radiográficas para SQL**: superficies oscuras donde aparece el código, paneles claros donde aparece el diagnóstico, semántica de severidad heredada del triage médico (verde / ámbar / rojo).

No usamos estetoscopios, cruces, ni cualquier ilustración médica literal. Lo "clínico" se transmite con: tipografía técnica, jerarquía sobria, separación clara entre *evidencia* (código) y *lectura* (diagnóstico), y semáforo de severidad.

### Color

- **Neutros**: escala warm-tinted (leve cast naranja, h≅30–60), de `ink-950` a `paper-50` — armoniza con el brand y evita que las superficies oscuras se vean frías.
- **Primario** `galicia`: naranja vivo (`oklch(0.71 0.21 50)` ≈ `#FF6A00`). Heredado de **Banco Galicia**. CTA, links, foco, accent en eyebrow y bordes de énfasis.
- **Secundario** `granate`: vino profundo (`oklch(0.48 0.18 22)` ≈ `#9B2424`). El color del escudo institucional. Uso restringido a marca formal / encabezados ejecutivos. **No es color de acción.**
- **Acento "diagnóstico"** `signal`: cian saturado (`oklch(0.78 0.13 215)`). Complemento frío al naranja. Highlights de SQL, indicadores de actividad, info pills.
- **Severidad**:
  - `critical` — rojo terracota desaturado, sin chillido (hue 25).
  - `warn` — amarillo (hue 95) — desplazado respecto al naranja Galicia para no confundirse con la marca.
  - `ok` — verde salvia.
  - `info` — el mismo `signal`.
- **Sintaxis SQL** — paleta de 8 tonos sobre `ink-900`, ajustada para AAA.

Dos modos: **Clinic Light** (default — papel) y **Console Dark** (terminal). El sistema completo se define con CSS vars, ver `colors_and_type.css`.

### Tipografía

| Familia | Uso | Por qué |
|---|---|---|
| **IBM Plex Sans** | UI, body, headings | Técnica, neutra, optimizada para producto de datos. Hecha por IBM, libre, sólida para texto extenso en español. |
| **IBM Plex Mono** | Código SQL, métricas, IDs, paths | Misma familia → coherencia óptica. Lectura cómoda en bloques largos de SQL. |
| **IBM Plex Serif** | (Opcional) Citas largas en reportes / ADRs | Mismo metal, contraste para lectura larga. |

Escala tipográfica modular en `1.2` (minor third). Cuerpo base **15px** (mayor que default web — la audiencia lee SQL detenidamente, no escanea).

### Layout

- **Grid base**: 8px. Spacing escala `0 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96`.
- **Densidad**: alta. Esto es un producto de trabajo, no una landing. Padding interno de paneles 16–24px, no 48.
- **Estructura canónica de la app**: split vertical 50/50 — **izquierda** editor SQL + selector de modo + cluster/db/schema, **derecha** reporte de diagnóstico. En vistas estrechas se stackea.
- **Anchos máximos**: el editor y el reporte no se acotan en ancho (es código y reportes técnicos, no marketing). Sí se acota la línea de prosa dentro del reporte (~78ch).

### Backgrounds e imagery

- **Fondos planos**, sin gradientes corporativos, sin "blobs", sin meshes. La superficie por default es `paper-50` (clínico) o `ink-900` (terminal).
- **No usamos** hero images, ilustraciones humanizadas, ni fotografía. El producto es texto técnico — la "imagen" es el SQL bien tipografiado.
- Un único motivo gráfico: una **grilla técnica** sutil (1px, opacidad 6%) que puede aparecer detrás del panel de modo, evocando papel cuadriculado / placa radiográfica. Opcional, no obligatorio.

### Border, radius, shadow

- **Radio**: `4px` (controles), `8px` (paneles), `12px` (modales). Nada más redondeado — la app es técnica, no friendly-startup.
- **Bordes**: `1px solid ink-200` para divisiones; `1px solid galicia-500` para foco/active. Usamos borde más que sombra.
- **Shadows**: minimal y a propósito. Solo dos niveles:
  - `shadow-soft` — `0 1px 2px oklch(0 0 0 / 0.04), 0 1px 1px oklch(0 0 0 / 0.06)` — cards, dropdowns.
  - `shadow-pop` — `0 8px 24px -8px oklch(0 0 0 / 0.18)` — popovers, command palette, toasts.
- **Cards**: borde 1px + radius 8 + shadow-soft. No usamos cards solo-con-shadow ni solo-con-color-de-fondo.

### Animation

- **Filosofía**: subordinada. La animación nunca es decorativa.
- **Duración**: `120ms` (microinteracciones — hover, focus), `220ms` (transiciones de panel), `400ms` (entrada de toasts/modales).
- **Easing**: `cubic-bezier(0.2, 0, 0, 1)` (estándar "swift out") para casi todo. `cubic-bezier(0.4, 0, 0.2, 1)` para entradas.
- **No usamos** bounces, parallax, scroll-triggered animations, ni gradientes animados.
- Spinners: una sola variación, monocromática, 1.5px stroke.

### Estados interactivos

| Estado | Tratamiento |
|---|---|
| **Hover** botón primario | Background un 6% más oscuro (`color-mix(in oklch, var(--galicia-500), black 6%)`). |
| **Hover** botón secundario / link | Background `ink-100`. |
| **Press** | Translate Y `1px` + background un 10% más oscuro. No usamos scale. |
| **Focus** | Outline `2px` `galicia-500` con `2px` de offset. AAA. Visible siempre en keyboard nav. |
| **Disabled** | `opacity: 0.4` + cursor `not-allowed`. No cambiamos color. |
| **Loading** | Reemplazo del texto del botón por spinner + label de progreso ("Diagnosticando…"). |

### Transparencia y blur

Casi nunca. Solo el backdrop de modales (`oklch(0 0 0 / 0.4)`, sin blur). Los paneles son **opacos**.

### Severidad — sistema visual

Cada hallazgo tiene tres elementos consistentes:

1. **Píldora de severidad** a la izquierda (texto: `Crítico` / `Atención` / `OK`).
2. **Banda de color** vertical de 3px en el borde izquierdo del callout.
3. **Iconografía** del set (ver Iconography) — un único glifo por severidad.

No usamos cards-con-borde-izquierdo-coloreado como decoración. Solo si hay severidad real que comunicar.

---

## 6. Iconography

Query Doctor usa **[Lucide](https://lucide.dev)** (CDN) como sistema de iconos único. Razones:

- Stroke `1.5px` consistente con la sensación técnica.
- Cobertura amplia (database, alert-triangle, terminal, file-text, copy, etc.).
- Licencia ISC.
- Tamaño promedio razonable para inlining.

### Reglas de uso

- **Tamaño**: `16px` inline en texto, `20px` en botones, `24px` en headers de panel. Nunca más grande — no son ilustración.
- **Color**: hereda `currentColor`. Nunca se colorean por estética; sí por severidad (rojo, ámbar, verde).
- **Stroke**: `1.5` por default. No mezclar con `2` en la misma vista.
- **Espaciado**: `8px` entre icono y label.

### Iconos clave del producto

| Icono | Uso |
|---|---|
| `stethoscope` | Logo / marca / botón "Diagnosticar". |
| `database` | Selector de cluster / schema. |
| `terminal` | Modo "Explain" / output del plan. |
| `shield-check` | Guardrails activos. |
| `alert-triangle` | Hallazgo de severidad Atención. |
| `octagon-alert` | Hallazgo Crítico. |
| `circle-check` | Hallazgo OK / validación pasa. |
| `file-text` | Reporte markdown. |
| `download` | Exportar reporte. |
| `copy` | Copiar query / fragmento. |
| `wand-sparkles` | (Único elemento "mágico") query optimizada sugerida. |

### Emoji

**No.** Cero emoji en producto. Único contexto permitido: documentos internos de equipo (este README puede tener checks ✅/❌ porque es un doc, no producto).

### Unicode chars como icono

**No.** Sin flechas unicode, sin bullets exóticos. Todo viene de Lucide.

### Logo

El logo es un **lockup**: glifo `stethoscope` de Lucide a `28px`, label `Query Doctor` en IBM Plex Sans 600, color `ink-900`. Ver `assets/logo.svg`. El glifo solo (sin label) funciona como favicon / app icon a partir de `24px`.

---

## 7. Index — ¿qué hay en este sistema?

```
README.md                  ← este archivo
SKILL.md                   ← contract para invocación como Agent Skill
colors_and_type.css        ← CSS vars: colores, tipografía, escala, semánticos
assets/
  logo.svg                 ← lockup principal
  logo-mark.svg            ← solo el glifo
preview/
  *.html                   ← cards individuales del Design System (renderizadas en la pestaña)
ui_kits/
  web-app/
    README.md
    index.html             ← prototipo interactivo de la app principal
    *.jsx                  ← componentes React (editor, mode-selector, report, callouts…)
```

### Cards del Design System

Mirá la pestaña **Design System** del proyecto para ver el sistema visual desplegado: tokens de color, escala tipográfica, componentes (botón, callout, mode selector, severidad), y screenshots del UI kit.

### UI Kits

- **`ui_kits/web-app/`** — el producto principal con todas sus superficies:
  - **Workspace** (default) — split editor SQL + panel de reporte
  - **Login** (`?screen=login`) — SSO + token MCP local
  - **Historial** (`?screen=history`) — análisis recientes, filtros, severidad
  - **Biblioteca** (`?screen=library`) — plantillas de queries reusables
  - **Schema** (`?screen=schema`) — explorador de metadata con tagging PII
  - **Ajustes** (`?screen=settings`) — preferencias, guardrails (no editables), tema

---

## 8. Caveats / cosas a iterar

- **No hay assets visuales previos** en el repo fuente. Todo lo visual acá es una propuesta primera. Esperá feedback de marca, paleta y tono.
- **IBM Plex Sans/Mono se cargan desde Google Fonts CDN**. Si querés self-hosting, hay que bajar los WOFF2.
- **Iconos vía Lucide CDN** — si necesitás offline, hay que importar el paquete.
- El logo es un placeholder construido con tipografía + glifo Lucide. Si el producto tiene wordmark formal, reemplazar.
