/* global React, Sidebar, WorkspaceHeader, Editor, ModeBar, Report, EmptyReport, LoadingReport,
   LoginScreen, HistoryScreen, LibraryScreen, SchemaScreen, SettingsScreen */
const Sidebar = window.Sidebar;
const WorkspaceHeader = window.WorkspaceHeader;
const Editor = window.Editor;
const ModeBar = window.ModeBar;
const Report = window.Report;
const EmptyReport = window.EmptyReport;
const LoadingReport = window.LoadingReport;
const LoginScreen = window.LoginScreen;
const HistoryScreen = window.HistoryScreen;
const LibraryScreen = window.LibraryScreen;
const SchemaScreen = window.SchemaScreen;
const SettingsScreen = window.SettingsScreen;

const { useState, useEffect } = React;

function App({ startScreen = 'workspace', skipLogin = true }) {
  const [loggedIn, setLoggedIn] = useState(skipLogin);
  const [screen, setScreen] = useState(startScreen);
  const [sql, setSql] = useState(window.QD_SAMPLE_QUERY);
  const [mode, setMode] = useState('analyze');
  const [running, setRunning] = useState(false);
  const [hasReport, setHasReport] = useState(false);

  const run = () => {
    setRunning(true);
    setHasReport(false);
    setTimeout(() => {
      setRunning(false);
      setHasReport(true);
    }, 1100);
  };

  // Auto-run when workspace becomes visible the first time so the demo is alive
  useEffect(() => {
    if (loggedIn && screen === 'workspace' && !hasReport && !running) {
      const t = setTimeout(() => run(), 250);
      return () => clearTimeout(t);
    }
  }, [loggedIn, screen]);

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  const user = { name: 'Florencia Rivera', role: 'Data Engineer · ArqData', initials: 'FR' };

  return (
    <div className="qd-shell">
      <Sidebar current={screen} onNavigate={setScreen} user={user} />
      <main className="qd-main">
        {screen === 'workspace' && (
          <>
            <WorkspaceHeader onExport={() => alert('Exportar reporte (demo)')} />
            <div className="qd-workspace">
              <section className="qd-pane qd-pane-left">
                <ModeBar mode={mode} onModeChange={setMode} running={running} onRun={run} />
                <Editor value={sql} onChange={setSql} />
                <div className="qd-statusbar">
                  <span><span className="qd-dot" /> MCP listo</span>
                  <span>· {sql.split('\n').length} líneas</span>
                  <span>· {sql.length} caracteres</span>
                  <span className="qd-statusbar-right">Plex Mono · 13px</span>
                </div>
              </section>
              <section className="qd-pane qd-pane-right">
                {running ? <LoadingReport /> :
                 hasReport ? (
                   <Report
                     findings={window.QD_FINDINGS}
                     optimized={window.QD_OPTIMIZED_QUERY}
                     validation={window.QD_VALIDATION_SQL}
                     planLines={window.QD_PLAN_LINES}
                   />
                 ) : <EmptyReport />}
              </section>
            </div>
          </>
        )}
        {screen === 'history'  && <HistoryScreen  onOpen={() => setScreen('workspace')} />}
        {screen === 'library'  && <LibraryScreen  onUse={() => setScreen('workspace')} />}
        {screen === 'schema'   && <SchemaScreen />}
        {screen === 'settings' && <SettingsScreen />}
      </main>
    </div>
  );
}

window.App = App;
