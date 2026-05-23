/* global React, QDIcon */
const QDIcon = window.QDIcon;

function LoginScreen({ onLogin }) {
  return (
    <div className="qd-login">
      <div className="qd-login-card">
        <div className="qd-login-brand">
          <QDIcon name="stethoscope" size={36} color="var(--galicia-500)" />
          <div className="qd-login-title">Query Doctor</div>
          <div className="qd-login-sub">Redshift · ArqData Value Accelerators</div>
        </div>

        <div className="qd-login-pitch">
          Acelerador de Arquitectura Data. Diagnostica, explica y optimiza queries sobre Redshift. <b>Read-only</b>, con guardrails.
        </div>

        <button className="qd-btn qd-btn-primary qd-login-cta" onClick={onLogin}>
          <QDIcon name="key-round" size={15} /> Ingresar con SSO corporativo
        </button>

        <div className="qd-login-divider"><span>o</span></div>

        <button className="qd-btn qd-btn-secondary qd-login-alt">
          <QDIcon name="terminal" size={14} /> Usar token MCP local
        </button>

        <div className="qd-login-foot">
          <div className="qd-login-trust">
            <span><QDIcon name="shield-check" size={12} color="var(--ok-700)" /> Solo SELECT / WITH / EXPLAIN</span>
            <span><QDIcon name="lock" size={12} color="var(--ok-700)" /> No persiste datos sensibles</span>
            <span><QDIcon name="file-text" size={12} color="var(--ok-700)" /> Logs auditables</span>
          </div>
          <div className="qd-login-version">v0.4.2 · build a7bf6f7</div>
        </div>
      </div>

      <div className="qd-login-side">
        <div className="qd-login-quote">
          <div className="qd-login-quote-mark">"</div>
          <div className="qd-login-quote-body">
            Query Doctor no reemplaza al developer ni al DBA. Es un asistente de revisión arquitectónica y performance que acelera el análisis y estandariza buenas prácticas en Redshift.
          </div>
          <div className="qd-login-quote-author">— Arquitectura Data</div>
        </div>
        <div className="qd-login-stats">
          <div className="qd-login-stat"><div className="qd-login-stat-n">1,284</div><div className="qd-login-stat-l">queries analizadas</div></div>
          <div className="qd-login-stat"><div className="qd-login-stat-n">312</div><div className="qd-login-stat-l">hallazgos críticos</div></div>
          <div className="qd-login-stat"><div className="qd-login-stat-n">87%</div><div className="qd-login-stat-l">recomendaciones aceptadas</div></div>
        </div>
      </div>
    </div>
  );
}

window.LoginScreen = LoginScreen;
