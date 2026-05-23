/* global React, QDIcon */
const QDIcon = window.QDIcon;

const SQL_KEYWORDS = /\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AND|OR|NOT|IS|NULL|AS|GROUP|BY|ORDER|HAVING|LIMIT|WITH|UNION|ALL|EXCEPT|INTERSECT|DISTINCT|CASE|WHEN|THEN|ELSE|END|IN|EXISTS|BETWEEN|LIKE|ILIKE|EXPLAIN|DATE)\b/g;
const SQL_FUNCTIONS = /\b(COUNT|SUM|AVG|MIN|MAX|COALESCE|CAST|DATEDIFF|DATEADD|GETDATE|LOWER|UPPER|TRIM|SUBSTRING|EXTRACT)\b/g;

function highlight(code) {
  // Order matters: comments → strings → numbers → keywords → functions
  let out = code.replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
  out = out.replace(/--[^\n]*/g, m => `<span class="t-c">${m}</span>`);
  out = out.replace(/'[^']*'/g, m => `<span class="t-s">${m}</span>`);
  out = out.replace(/\b\d+(\.\d+)?\b/g, m => `<span class="t-n">${m}</span>`);
  out = out.replace(SQL_KEYWORDS, m => `<span class="t-k">${m}</span>`);
  out = out.replace(SQL_FUNCTIONS, m => `<span class="t-fn">${m}</span>`);
  return out;
}

function Editor({ value, onChange }) {
  const lines = value.split('\n');
  const taRef = React.useRef(null);
  const preRef = React.useRef(null);

  const sync = () => {
    if (preRef.current && taRef.current) {
      preRef.current.scrollTop = taRef.current.scrollTop;
      preRef.current.scrollLeft = taRef.current.scrollLeft;
    }
  };

  return (
    <div className="qd-editor">
      <div className="qd-editor-bar">
        <span className="qd-editor-file">
          <QDIcon name="file-code-2" size={13} /> query.sql
        </span>
        <span className="qd-editor-meta">
          <span><QDIcon name="shield-check" size={12} /> read-only</span>
          <span>{lines.length} líneas</span>
        </span>
      </div>
      <div className="qd-editor-body">
        <div className="qd-gutter">
          {lines.map((_, i) => <span key={i}>{i + 1}</span>)}
        </div>
        <div className="qd-editor-stack">
          <pre
            ref={preRef}
            className="qd-editor-pre"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: highlight(value) + '\n' }}
          />
          <textarea
            ref={taRef}
            className="qd-editor-ta"
            value={value}
            spellCheck={false}
            onChange={(e) => onChange(e.target.value)}
            onScroll={sync}
          />
        </div>
      </div>
    </div>
  );
}

window.Editor = Editor;
