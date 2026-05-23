/* global React, QDIcon */
const QDIcon = window.QDIcon;

const NAV = [
  { id: 'workspace', label: 'Workspace',     icon: 'stethoscope' },
  { id: 'history',   label: 'Historial',     icon: 'history' },
  { id: 'library',   label: 'Biblioteca',    icon: 'bookmark' },
  { id: 'schema',    label: 'Schema',        icon: 'database' },
  { id: 'settings',  label: 'Ajustes',       icon: 'settings-2' },
];

function Sidebar({ current, onNavigate, user }) {
  return (
    <aside className="qd-sidebar">
      <div className="qd-sidebar-brand">
        <QDIcon name="stethoscope" size={22} color="var(--galicia-500)" />
        <div>
          <div className="qd-sidebar-brand-name">Query Doctor</div>
          <div className="qd-sidebar-brand-sub">Redshift</div>
        </div>
      </div>

      <nav className="qd-sidebar-nav">
        {NAV.map(n => (
          <button
            key={n.id}
            className={'qd-sidebar-item' + (current === n.id ? ' active' : '')}
            onClick={() => onNavigate(n.id)}
          >
            <QDIcon name={n.icon} size={16} />
            <span>{n.label}</span>
            {n.id === 'history' && <span className="qd-badge">7</span>}
          </button>
        ))}
      </nav>

      <div className="qd-sidebar-foot">
        <div className="qd-sidebar-user">
          <div className="qd-avatar">{user.initials}</div>
          <div className="qd-sidebar-user-meta">
            <div className="qd-sidebar-user-name">{user.name}</div>
            <div className="qd-sidebar-user-role">{user.role}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;
window.QD_NAV = NAV;
