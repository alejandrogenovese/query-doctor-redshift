/* global React, QDIcon */
const QDIcon = window.QDIcon;

const SEV = {
  critical: { icon: 'octagon-alert', label: 'Crítico',  color: 'var(--critical-500)', textColor: 'var(--critical-700)' },
  warn:     { icon: 'alert-triangle', label: 'Atención', color: 'var(--warn-500)',     textColor: 'var(--warn-700)' },
  ok:       { icon: 'circle-check',   label: 'OK',       color: 'var(--ok-500)',       textColor: 'var(--ok-700)' },
};

function Callout({ severity = 'warn', title, children }) {
  const s = SEV[severity];
  return (
    <div className="qd-callout" style={{ '--c': s.color }}>
      <div className="qd-callout-bar" />
      <div className="qd-callout-ic" style={{ color: s.color }}>
        <QDIcon name={s.icon} size={18} />
      </div>
      <div className="qd-callout-body">
        <div className="qd-callout-header">
          <span className={`qd-pill-sev qd-pill-sev-${severity}`}>
            <QDIcon name={s.icon} size={11} /> {s.label}
          </span>
          <span className="qd-callout-title">{title}</span>
        </div>
        <div className="qd-callout-text">{children}</div>
      </div>
    </div>
  );
}

window.Callout = Callout;
window.SEV = SEV;
