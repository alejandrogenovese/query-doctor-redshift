/* global React, QDIcon */
const QDIcon = window.QDIcon;

const MODES = [
  { id: 'analyze', label: 'Analyze',   icon: 'text-search',  desc: 'Solo analiza el texto de la query. No toca Redshift.' },
  { id: 'explain', label: 'Explain',   icon: 'terminal',     desc: 'Ejecuta EXPLAIN <query> e interpreta el plan.' },
  { id: 'safe',    label: 'Safe exec', icon: 'play',         desc: 'Ejecuta solo si es SELECT y agrega LIMIT 100.' },
  { id: 'compare', label: 'Compare',   icon: 'git-compare',  desc: 'Genera SQL de validación original vs. optimizada.' },
];

function ModeBar({ mode, onModeChange, running, onRun }) {
  const current = MODES.find(m => m.id === mode);
  return (
    <div className="qd-modebar">
      <div className="qd-modebar-row">
        <div className="qd-seg">
          {MODES.map(m => (
            <button
              key={m.id}
              className={'qd-seg-btn' + (m.id === mode ? ' active' : '')}
              onClick={() => onModeChange(m.id)}
            >
              <QDIcon name={m.icon} size={13} /> {m.label}
            </button>
          ))}
        </div>
        <button
          className="qd-btn qd-btn-primary"
          onClick={onRun}
          disabled={running}
        >
          {running ? (
            <>
              <span className="qd-spinner" /> Diagnosticando…
            </>
          ) : (
            <>
              <QDIcon name="stethoscope" size={15} /> Diagnosticar
            </>
          )}
        </button>
      </div>
      <div className="qd-modebar-desc">
        <b>{current.label}.</b> {current.desc}
      </div>
    </div>
  );
}

window.ModeBar = ModeBar;
