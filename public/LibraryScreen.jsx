/* global React, QDIcon */
const QDIcon = window.QDIcon;

const LIBRARY = [
  { id: 'top-n', title: 'Top N por agregación', desc: 'Patrón: top N entidades por SUM o COUNT con join opcional contra catálogo.', tags: ['analytics', 'agregación'], uses: 42 },
  { id: 'cohort', title: 'Cohort mensual de retención', desc: 'CTE con primera aparición + outer join contra meses subsiguientes.', tags: ['retención', 'cohort'], uses: 28 },
  { id: 'dup-key', title: 'Duplicados por clave de negocio', desc: 'GROUP BY + HAVING COUNT(*) > 1 sobre la clave funcional. Útil pre-publicación de un producto de datos.', tags: ['calidad', 'dedupe'], uses: 65 },
  { id: 'window-rank', title: 'Ranking con ventana', desc: 'ROW_NUMBER() OVER (PARTITION BY … ORDER BY …) — última fila por grupo.', tags: ['window', 'sql avanzado'], uses: 19 },
  { id: 'pii-scan', title: 'Escaneo de columnas PII', desc: 'Lista columnas potencialmente sensibles en un schema según naming. Solo metadata.', tags: ['gobierno', 'pii'], uses: 11 },
  { id: 'slow-recent', title: 'Queries lentas últimas 24h', desc: 'Sobre stl_query — top 20 por duración. Requiere permisos sobre vistas de sistema.', tags: ['performance', 'sistema'], uses: 7 },
];

function LibraryScreen({ onUse }) {
  return (
    <div className="qd-screen">
      <div className="qd-screen-head">
        <div>
          <div className="qd-eyebrow"><QDIcon name="bookmark" size={11} /> Biblioteca</div>
          <h1 className="qd-screen-title">Plantillas de queries</h1>
          <div className="qd-screen-sub">Patrones comunes revisados por Arquitectura Data. Pegá la plantilla, completá las tablas y diagnosticá.</div>
        </div>
        <div className="qd-screen-actions">
          <button className="qd-btn qd-btn-secondary"><QDIcon name="upload" size={14} /> Importar</button>
          <button className="qd-btn qd-btn-primary"><QDIcon name="plus" size={14} /> Nueva plantilla</button>
        </div>
      </div>

      <div className="qd-lib-grid">
        {LIBRARY.map(t => (
          <article key={t.id} className="qd-lib-card">
            <div className="qd-lib-card-head">
              <QDIcon name="file-code-2" size={16} color="var(--galicia-500)" />
              <div className="qd-lib-card-title">{t.title}</div>
            </div>
            <div className="qd-lib-card-desc">{t.desc}</div>
            <div className="qd-lib-card-tags">
              {t.tags.map(tag => <span key={tag} className="qd-tag-soft">{tag}</span>)}
            </div>
            <div className="qd-lib-card-foot">
              <span className="qd-mono-sm"><QDIcon name="users" size={11} /> {t.uses} usos</span>
              <button className="qd-icon-btn" onClick={() => onUse && onUse(t)}>
                <QDIcon name="arrow-right" size={13} /> Usar
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

window.LibraryScreen = LibraryScreen;
