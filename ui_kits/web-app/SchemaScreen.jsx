/* global React, QDIcon */
const QDIcon = window.QDIcon;

const SCHEMAS = [
  { name: 'crm', tables: 18, expanded: true, children: [
    { name: 'crm.clientes', rows: '240K', sortKey: 'party_id', distKey: 'party_id', size: '2.1 GB', pii: true },
    { name: 'crm.tarjetas', rows: '180K', sortKey: 'party_id', distKey: 'party_id', size: '0.9 GB', pii: false },
    { name: 'crm.cuentas',  rows: '290K', sortKey: 'party_id', distKey: 'party_id', size: '1.4 GB', pii: false },
  ]},
  { name: 'finanzas', tables: 42, expanded: false },
  { name: 'analytics', tables: 27, expanded: false },
  { name: 'ventas', tables: 31, expanded: false },
];

const COLUMNS = [
  { name: 'party_id',        type: 'bigint',     nullable: false, sort: true,  pii: false, distkey: true },
  { name: 'nombre',          type: 'varchar(120)', nullable: false, sort: false, pii: false },
  { name: 'apellido',        type: 'varchar(120)', nullable: false, sort: false, pii: false },
  { name: 'documento',       type: 'varchar(20)',  nullable: false, sort: false, pii: true },
  { name: 'tipo_documento',  type: 'varchar(10)',  nullable: false, sort: false, pii: false },
  { name: 'mail',            type: 'varchar(200)', nullable: true,  sort: false, pii: true },
  { name: 'telefono',        type: 'varchar(30)',  nullable: true,  sort: false, pii: true },
  { name: 'fecha_nacimiento',type: 'date',         nullable: true,  sort: false, pii: true },
  { name: 'fecha_alta',      type: 'timestamp',    nullable: false, sort: false, pii: false },
  { name: 'segmento',        type: 'varchar(40)',  nullable: true,  sort: false, pii: false },
  { name: 'score_crediticio',type: 'integer',      nullable: true,  sort: false, pii: true },
];

function SchemaScreen() {
  const [selected, setSelected] = React.useState('crm.clientes');

  return (
    <div className="qd-screen qd-screen-flex">
      <div className="qd-schema-head">
        <div>
          <div className="qd-eyebrow"><QDIcon name="database" size={11} /> Schema</div>
          <h1 className="qd-screen-title">Explorador de metadata</h1>
          <div className="qd-screen-sub">Lectura de <code>information_schema.columns</code> y <code>svv_table_info</code>. Sin acceso a datos.</div>
        </div>
        <div className="qd-screen-actions">
          <div className="qd-search">
            <QDIcon name="search" size={14} />
            <input placeholder="Buscar tabla o columna…" />
          </div>
        </div>
      </div>

      <div className="qd-schema-split">
        <aside className="qd-schema-tree">
          <div className="qd-schema-tree-head">prod-redshift · analytics</div>
          {SCHEMAS.map(s => (
            <div key={s.name} className="qd-schema-group">
              <button className="qd-schema-group-head">
                <QDIcon name={s.expanded ? 'chevron-down' : 'chevron-right'} size={13} color="var(--ink-500)" />
                <QDIcon name="folder" size={13} color="var(--galicia-500)" />
                <span>{s.name}</span>
                <span className="qd-schema-count">{s.tables}</span>
              </button>
              {s.expanded && s.children && (
                <div className="qd-schema-children">
                  {s.children.map(c => (
                    <button
                      key={c.name}
                      className={'qd-schema-leaf' + (c.name === selected ? ' active' : '')}
                      onClick={() => setSelected(c.name)}
                    >
                      <QDIcon name="table-2" size={12} />
                      <span>{c.name.split('.')[1]}</span>
                      {c.pii && <span className="qd-pii-tick"><QDIcon name="shield-alert" size={10} /></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </aside>

        <section className="qd-schema-detail">
          <div className="qd-schema-detail-head">
            <div>
              <div className="qd-schema-detail-title"><QDIcon name="table-2" size={18} /> crm.clientes</div>
              <div className="qd-schema-detail-stats">
                <span>240K filas</span><span>·</span>
                <span>2.1 GB</span><span>·</span>
                <span>distkey <code>party_id</code></span><span>·</span>
                <span>sortkey <code>party_id</code></span><span>·</span>
                <span>encoded <code>az64</code></span>
              </div>
            </div>
            <div className="qd-schema-actions">
              <button className="qd-icon-btn"><QDIcon name="copy" size={13} /> Copiar DDL</button>
              <button className="qd-icon-btn"><QDIcon name="stethoscope" size={13} /> Analizar consulta</button>
            </div>
          </div>

          <div className="qd-schema-pii-banner">
            <QDIcon name="shield-alert" size={15} color="var(--warn-700)" />
            <div>
              <b>4 columnas marcadas como PII potencial.</b> Cualquier query que las seleccione mostrará advertencia de masking.
            </div>
          </div>

          <table className="qd-table qd-table-cols">
            <thead>
              <tr>
                <th>Columna</th><th>Tipo</th><th>Nullable</th><th>Keys</th><th>Notas</th>
              </tr>
            </thead>
            <tbody>
              {COLUMNS.map(c => (
                <tr key={c.name} className={c.pii ? 'qd-row-pii' : ''}>
                  <td><span className="qd-mono">{c.name}</span></td>
                  <td><span className="qd-mono-sm">{c.type}</span></td>
                  <td><span className="qd-mono-sm">{c.nullable ? 'YES' : 'NO'}</span></td>
                  <td>
                    {c.sort && <span className="qd-tag-soft">sort</span>}
                    {c.distkey && <span className="qd-tag-soft">dist</span>}
                  </td>
                  <td>{c.pii && <span className="qd-pill-sev qd-pill-sev-warn"><QDIcon name="shield-alert" size={11} /> PII</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

window.SchemaScreen = SchemaScreen;
