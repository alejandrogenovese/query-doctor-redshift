/* global React, QDIcon, Callout */
const QDIcon = window.QDIcon;
const Callout = window.Callout;

function CodeBlock({ children, label }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  // Re-use the editor's highlighter
  const html = window.Editor ? null : null;
  // Use the highlight function exposed via Editor — fall back to plain text otherwise
  const highlighted = (window.__qd_highlight || ((s) => s))(children);
  return (
    <div className="qd-codeblock">
      <div className="qd-codeblock-bar">
        <span>{label}</span>
        <button className="qd-icon-btn" onClick={copy}>
          <QDIcon name={copied ? 'check' : 'copy'} size={13} /> {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <pre dangerouslySetInnerHTML={{ __html: highlighted }} />
    </div>
  );
}

function EmptyReport() {
  return (
    <div className="qd-empty">
      <div className="qd-empty-ic"><QDIcon name="stethoscope" size={32} color="var(--ink-300)" /></div>
      <div className="qd-empty-title">Esperando una query.</div>
      <div className="qd-empty-body">Pegá tu SQL a la izquierda, elegí un modo y tocá <b>Diagnosticar</b>.</div>
      <div className="qd-empty-hints">
        <div className="qd-empty-hint"><QDIcon name="shield-check" size={14} color="var(--ok-700)" /> Solo SELECT / WITH / EXPLAIN</div>
        <div className="qd-empty-hint"><QDIcon name="hash" size={14} color="var(--ink-500)" /> LIMIT automático para muestreo</div>
        <div className="qd-empty-hint"><QDIcon name="shield-alert" size={14} color="var(--warn-700)" /> Advertencia sobre columnas sensibles</div>
      </div>
    </div>
  );
}

function LoadingReport() {
  return (
    <div className="qd-empty">
      <div className="qd-empty-ic"><span className="qd-spinner qd-spinner-lg" /></div>
      <div className="qd-empty-title">Diagnosticando…</div>
      <div className="qd-empty-body">Validando guardrails · ejecutando EXPLAIN · interpretando plan · generando reporte.</div>
    </div>
  );
}

function PlanBlock({ lines }) {
  return (
    <div className="qd-plan">
      <div className="qd-plan-bar"><QDIcon name="terminal" size={12} /> EXPLAIN</div>
      <pre className="qd-plan-pre">
{lines.map((l, i) => (
  <div key={i} className={'qd-plan-line ' + (l.flag ? `qd-plan-line-${l.flag}` : '')}>
    <span className="qd-plan-op">{l.op}</span>
    <span className="qd-plan-cost">{l.cost}</span>
  </div>
))}
      </pre>
    </div>
  );
}

function Report({ findings, optimized, validation, planLines }) {
  const counts = findings.reduce((acc, f) => ({ ...acc, [f.severity]: (acc[f.severity] || 0) + 1 }), {});
  return (
    <div className="qd-report">
      <div className="qd-report-eyebrow">
        <QDIcon name="stethoscope" size={11} /> Query Doctor · Reporte
      </div>
      <h1 className="qd-report-h1">Resumen ejecutivo</h1>
      <div className="qd-report-meta">
        <span><QDIcon name="clock" size={12} /> hace 2 segundos</span>
        <span><QDIcon name="database" size={12} /> prod-redshift</span>
        <span className="qd-pill-sev qd-pill-sev-critical">{counts.critical || 0} crítico{(counts.critical || 0) === 1 ? '' : 's'}</span>
        <span className="qd-pill-sev qd-pill-sev-warn">{counts.warn || 0} atención</span>
        <span className="qd-pill-sev qd-pill-sev-ok">{counts.ok || 0} ok</span>
      </div>
      <p className="qd-report-lead">
        La query es funcionalmente válida, pero <b>scanea</b> <code>finanzas.movimientos</code> sin predicado temporal y usa <code>SELECT *</code> sobre dos tablas anchas. Esto puede impactar performance y costo de I/O.
      </p>

      <h2 className="qd-report-h2"><QDIcon name="search" size={18} /> Qué hace la query</h2>
      <p className="qd-report-prose">
        Une <code>crm.clientes</code> con <code>finanzas.movimientos</code> por <code>party_id</code>, conserva los movimientos con monto positivo y devuelve las primeras 10 filas ordenadas por monto descendente. <b>Granularidad de salida</b>: una fila por movimiento, no por cliente — la lógica probablemente busca agregar por cliente.
      </p>

      <h2 className="qd-report-h2"><QDIcon name="table" size={18} /> Tablas y columnas</h2>
      <div className="qd-tables">
        <div className="qd-table-card">
          <div className="qd-table-name"><QDIcon name="table-2" size={14} /> crm.clientes</div>
          <div className="qd-table-meta">240K filas · dist by party_id · sort by party_id</div>
          <div className="qd-cols">
            <span className="qd-col">party_id</span>
            <span className="qd-col">nombre</span>
            <span className="qd-col qd-col-pii">documento <QDIcon name="shield-alert" size={10} /></span>
            <span className="qd-col qd-col-pii">mail <QDIcon name="shield-alert" size={10} /></span>
            <span className="qd-col qd-col-pii">telefono <QDIcon name="shield-alert" size={10} /></span>
          </div>
        </div>
        <div className="qd-table-card">
          <div className="qd-table-name"><QDIcon name="table-2" size={14} /> finanzas.movimientos</div>
          <div className="qd-table-meta">1.2B filas · dist by party_id · sort by party_id, fecha_movimiento</div>
          <div className="qd-cols">
            <span className="qd-col">party_id</span>
            <span className="qd-col">fecha_movimiento</span>
            <span className="qd-col">monto</span>
            <span className="qd-col">tipo</span>
            <span className="qd-col">moneda</span>
          </div>
        </div>
      </div>

      <h2 className="qd-report-h2"><QDIcon name="terminal" size={18} /> Plan de ejecución</h2>
      <PlanBlock lines={planLines} />

      <h2 className="qd-report-h2"><QDIcon name="list-checks" size={18} /> Hallazgos</h2>
      <div className="qd-findings">
        {findings.map((f, i) => (
          <Callout key={i} severity={f.severity} title={f.title}>
            <span dangerouslySetInnerHTML={{ __html: f.body.replace(/`([^`]+)`/g, '<code>$1</code>') }} />
          </Callout>
        ))}
      </div>

      <h2 className="qd-report-h2"><QDIcon name="wand-sparkles" size={18} /> Query optimizada sugerida</h2>
      <p className="qd-report-prose">
        Filtramos <code>movimientos</code> en un CTE antes del JOIN para reducir cardinalidad, reemplazamos <code>SELECT *</code> por columnas explícitas y agregamos por cliente (la lógica que parecía intentar la query original).
      </p>
      <CodeBlock label="optimizada.sql">{optimized}</CodeBlock>

      <h2 className="qd-report-h2"><QDIcon name="git-compare" size={18} /> Validación sugerida</h2>
      <p className="qd-report-prose">
        Antes de reemplazar la query original, corré esta comparación para confirmar que el resultado no cambia (excepto por la agregación intencional).
      </p>
      <CodeBlock label="validacion.sql">{validation}</CodeBlock>

      <h2 className="qd-report-h2"><QDIcon name="shield-alert" size={18} /> Riesgos y consideraciones</h2>
      <ul className="qd-risks">
        <li>La query optimizada <b>cambia la granularidad</b> (suma por cliente vs. fila por movimiento). Confirmá que es lo deseado antes de reemplazar.</li>
        <li>Las columnas <code>documento</code>, <code>mail</code> y <code>telefono</code> son potencialmente PII. Si el consumidor no requiere identificación, removerlas del SELECT.</li>
        <li>Esta recomendación <b>no</b> se aplica automáticamente. Query Doctor es un advisor; los cambios deben pasar por el flujo formal de revisión.</li>
      </ul>
    </div>
  );
}

window.Report = Report;
window.EmptyReport = EmptyReport;
window.LoadingReport = LoadingReport;
