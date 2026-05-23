/* global React, QDIcon */
const QDIcon = window.QDIcon;

const HISTORY = [
  { id: 1, when: 'hace 8 min', title: 'top 10 clientes por monto 2026', mode: 'Analyze', critical: 2, warn: 2, ok: 1, schema: 'crm', tables: ['crm.clientes', 'finanzas.movimientos'], optimized: true },
  { id: 2, when: 'hace 34 min', title: 'cohort retención mensual', mode: 'Explain', critical: 1, warn: 3, ok: 2, schema: 'analytics', tables: ['analytics.sesiones', 'analytics.usuarios'], optimized: true },
  { id: 3, when: 'hace 2 h', title: 'detección de duplicados party_id', mode: 'Compare', critical: 0, warn: 1, ok: 4, schema: 'crm', tables: ['crm.clientes'], optimized: false },
  { id: 4, when: 'hace 5 h', title: 'movimientos por sucursal Q1', mode: 'Safe exec', critical: 3, warn: 1, ok: 0, schema: 'finanzas', tables: ['finanzas.movimientos', 'finanzas.sucursales'], optimized: true },
  { id: 5, when: 'ayer · 17:42', title: 'top productos vendidos último trimestre', mode: 'Explain', critical: 1, warn: 2, ok: 3, schema: 'ventas', tables: ['ventas.lineas', 'ventas.productos'], optimized: true },
  { id: 6, when: 'ayer · 11:08', title: 'snapshot saldos cuenta corriente', mode: 'Analyze', critical: 0, warn: 0, ok: 5, schema: 'finanzas', tables: ['finanzas.saldos'], optimized: false },
  { id: 7, when: '2026-05-21', title: 'cohort de altas tarjeta crédito 2024', mode: 'Compare', critical: 2, warn: 1, ok: 2, schema: 'crm', tables: ['crm.clientes', 'crm.tarjetas'], optimized: true },
];

function HistoryScreen({ onOpen }) {
  const [filter, setFilter] = React.useState('all');
  const filtered = HISTORY.filter(h => filter === 'all' || (filter === 'critical' && h.critical > 0) || (filter === 'optimized' && h.optimized));

  return (
    <div className="qd-screen">
      <div className="qd-screen-head">
        <div>
          <div className="qd-eyebrow"><QDIcon name="history" size={11} /> Historial</div>
          <h1 className="qd-screen-title">Análisis recientes</h1>
          <div className="qd-screen-sub">Últimos 30 días · {HISTORY.length} análisis · retención local (no se persiste SQL en servidor).</div>
        </div>
        <div className="qd-screen-actions">
          <button className="qd-btn qd-btn-secondary"><QDIcon name="download" size={14} /> Exportar log</button>
          <button className="qd-btn qd-btn-ghost qd-btn-danger"><QDIcon name="trash-2" size={14} /> Limpiar</button>
        </div>
      </div>

      <div className="qd-filter-row">
        <div className="qd-seg qd-seg-sm">
          <button className={'qd-seg-btn' + (filter === 'all' ? ' active' : '')} onClick={() => setFilter('all')}>Todo</button>
          <button className={'qd-seg-btn' + (filter === 'critical' ? ' active' : '')} onClick={() => setFilter('critical')}>Con críticos</button>
          <button className={'qd-seg-btn' + (filter === 'optimized' ? ' active' : '')} onClick={() => setFilter('optimized')}>Con optimización</button>
        </div>
        <div className="qd-search">
          <QDIcon name="search" size={14} />
          <input placeholder="Buscar por tabla, schema o texto…" />
        </div>
      </div>

      <table className="qd-table">
        <thead>
          <tr>
            <th style={{ width: '38%' }}>Query</th>
            <th>Modo</th>
            <th>Schema · tablas</th>
            <th>Hallazgos</th>
            <th>Cuando</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(h => (
            <tr key={h.id} onClick={() => onOpen && onOpen(h)} style={{ cursor: 'pointer' }}>
              <td>
                <div className="qd-table-q-title">{h.title}</div>
                <div className="qd-table-q-id">qd-{String(h.id).padStart(4, '0')}</div>
              </td>
              <td><span className="qd-tag-mode">{h.mode}</span></td>
              <td>
                <div className="qd-table-tables">
                  <span className="qd-col">{h.schema}</span>
                  <span className="qd-table-tables-list">{h.tables.join(' · ')}</span>
                </div>
              </td>
              <td>
                <div className="qd-table-sev">
                  {h.critical > 0 && <span className="qd-pill-sev qd-pill-sev-critical">{h.critical}</span>}
                  {h.warn > 0 && <span className="qd-pill-sev qd-pill-sev-warn">{h.warn}</span>}
                  {h.ok > 0 && <span className="qd-pill-sev qd-pill-sev-ok">{h.ok}</span>}
                  {h.optimized && <span className="qd-tag-mode qd-tag-mode-opt"><QDIcon name="wand-sparkles" size={11} /> opt</span>}
                </div>
              </td>
              <td><span className="qd-mono-sm">{h.when}</span></td>
              <td><QDIcon name="chevron-right" size={15} color="var(--ink-400)" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

window.HistoryScreen = HistoryScreen;
window.QD_HISTORY = HISTORY;
