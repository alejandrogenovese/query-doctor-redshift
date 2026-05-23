/* global React, QDIcon */
const QDIcon = window.QDIcon;

function SettingsScreen() {
  const [theme, setTheme] = React.useState('light');
  const [autoLimit, setAutoLimit] = React.useState(true);
  const [pii, setPii] = React.useState(true);
  const [defaultMode, setDefaultMode] = React.useState('analyze');

  return (
    <div className="qd-screen">
      <div className="qd-screen-head">
        <div>
          <div className="qd-eyebrow"><QDIcon name="settings-2" size={11} /> Ajustes</div>
          <h1 className="qd-screen-title">Preferencias</h1>
          <div className="qd-screen-sub">Configuración local del workspace. No afecta a otros usuarios.</div>
        </div>
      </div>

      <div className="qd-set-section">
        <h2 className="qd-set-h2">Conexión MCP</h2>
        <div className="qd-set-row">
          <div className="qd-set-label">
            <div className="qd-set-label-name">Cluster por defecto</div>
            <div className="qd-set-label-help">Cluster que se selecciona al abrir el workspace.</div>
          </div>
          <div className="qd-select"><span><QDIcon name="database" size={13} color="var(--galicia-500)" /> prod-redshift</span><QDIcon name="chevron-down" size={13} /></div>
        </div>
        <div className="qd-set-row">
          <div className="qd-set-label">
            <div className="qd-set-label-name">Database por defecto</div>
            <div className="qd-set-label-help">Tu database principal.</div>
          </div>
          <div className="qd-select"><span>analytics</span><QDIcon name="chevron-down" size={13} /></div>
        </div>
        <div className="qd-set-row">
          <div className="qd-set-label">
            <div className="qd-set-label-name">Schema preferido</div>
            <div className="qd-set-label-help">Pre-completado en el selector de contexto.</div>
          </div>
          <div className="qd-select"><span>crm</span><QDIcon name="chevron-down" size={13} /></div>
        </div>
      </div>

      <div className="qd-set-section">
        <h2 className="qd-set-h2">Guardrails</h2>
        <div className="qd-set-row">
          <div className="qd-set-label">
            <div className="qd-set-label-name">Solo SELECT / WITH / EXPLAIN</div>
            <div className="qd-set-label-help">No se puede desactivar — política de Arquitectura Data.</div>
          </div>
          <Toggle on={true} disabled />
        </div>
        <div className="qd-set-row">
          <div className="qd-set-label">
            <div className="qd-set-label-name">LIMIT automático en Safe exec</div>
            <div className="qd-set-label-help">Agrega <code>LIMIT 100</code> si la query no especifica límite.</div>
          </div>
          <Toggle on={autoLimit} onChange={() => setAutoLimit(!autoLimit)} />
        </div>
        <div className="qd-set-row">
          <div className="qd-set-label">
            <div className="qd-set-label-name">Detectar columnas PII</div>
            <div className="qd-set-label-help">Advertencias sobre <code>documento</code>, <code>mail</code>, <code>telefono</code>, etc.</div>
          </div>
          <Toggle on={pii} onChange={() => setPii(!pii)} />
        </div>
      </div>

      <div className="qd-set-section">
        <h2 className="qd-set-h2">Apariencia</h2>
        <div className="qd-set-row">
          <div className="qd-set-label">
            <div className="qd-set-label-name">Tema</div>
            <div className="qd-set-label-help">Light = clínico · Dark = console.</div>
          </div>
          <div className="qd-seg qd-seg-sm">
            <button className={'qd-seg-btn' + (theme === 'light' ? ' active' : '')} onClick={() => setTheme('light')}><QDIcon name="sun" size={12} /> Light</button>
            <button className={'qd-seg-btn' + (theme === 'dark' ? ' active' : '')} onClick={() => setTheme('dark')}><QDIcon name="moon" size={12} /> Dark</button>
            <button className={'qd-seg-btn' + (theme === 'system' ? ' active' : '')} onClick={() => setTheme('system')}>Sistema</button>
          </div>
        </div>
        <div className="qd-set-row">
          <div className="qd-set-label">
            <div className="qd-set-label-name">Modo por defecto</div>
            <div className="qd-set-label-help">Modo seleccionado al abrir el workspace.</div>
          </div>
          <div className="qd-seg qd-seg-sm">
            {['analyze', 'explain', 'safe', 'compare'].map(m => (
              <button key={m} className={'qd-seg-btn' + (defaultMode === m ? ' active' : '')} onClick={() => setDefaultMode(m)}>{m}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="qd-set-section qd-set-section-danger">
        <h2 className="qd-set-h2">Zona delicada</h2>
        <div className="qd-set-row">
          <div className="qd-set-label">
            <div className="qd-set-label-name">Borrar historial local</div>
            <div className="qd-set-label-help">Elimina todos los análisis previos almacenados en este navegador. No se puede deshacer.</div>
          </div>
          <button className="qd-btn qd-btn-danger-outline"><QDIcon name="trash-2" size={14} /> Borrar todo</button>
        </div>
      </div>
    </div>
  );
}

function Toggle({ on, onChange, disabled }) {
  return (
    <button className={'qd-toggle' + (on ? ' on' : '') + (disabled ? ' disabled' : '')} onClick={disabled ? undefined : onChange} aria-pressed={on}>
      <span className="qd-toggle-knob" />
    </button>
  );
}

window.SettingsScreen = SettingsScreen;
