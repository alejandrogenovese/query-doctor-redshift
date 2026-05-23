/* global React, QDIcon */

function WorkspaceHeader({ onExport }) {
  return (
    <header className="qd-header">
      <div className="qd-context">
        <div className="qd-pill"><QDIcon name="database" size={13} color="var(--galicia-500)" /> prod-redshift</div>
        <div className="qd-pill"><QDIcon name="folder" size={13} /> analytics · crm</div>
        <div className="qd-pill qd-pill-ok">
          <span className="qd-dot" /> MCP conectado
        </div>
        <div className="qd-pill qd-pill-ok">
          <QDIcon name="shield-check" size={13} color="var(--ok-700)" /> Guardrails activos
        </div>
      </div>

      <div className="qd-header-actions">
        <button className="qd-btn qd-btn-ghost"><QDIcon name="bell" size={14} /></button>
        <button className="qd-btn qd-btn-ghost" onClick={onExport}>
          <QDIcon name="download" size={14} /> Exportar
        </button>
      </div>
    </header>
  );
}

window.WorkspaceHeader = WorkspaceHeader;
