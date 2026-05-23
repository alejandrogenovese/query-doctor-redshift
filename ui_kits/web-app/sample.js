// Sample data for the click-thru. No real Redshift, no real LLM.

window.QD_SAMPLE_QUERY = `-- top 10 clientes por monto en 2026
SELECT *
FROM   crm.clientes c
JOIN   finanzas.movimientos m
  ON   c.party_id = m.party_id
WHERE  m.monto > 0
ORDER BY m.monto DESC
LIMIT 10;`;

window.QD_OPTIMIZED_QUERY = `WITH mov_filtrados AS (
  SELECT party_id, SUM(monto) AS total
  FROM   finanzas.movimientos
  WHERE  fecha_movimiento >= DATE '2026-01-01'
  GROUP BY party_id
)
SELECT c.nombre, m.total
FROM   crm.clientes c
JOIN   mov_filtrados m ON c.party_id = m.party_id
ORDER BY m.total DESC
LIMIT 10;`;

window.QD_VALIDATION_SQL = `-- Validar equivalencia de resultados
WITH original AS (
  -- query original (top 10 por monto individual)
),
optimizada AS (
  -- query optimizada (top 10 por suma anual)
)
SELECT
  (SELECT COUNT(*) FROM original)   AS count_original,
  (SELECT COUNT(*) FROM optimizada) AS count_optimizada;`;

window.QD_FINDINGS = [
  {
    severity: 'critical',
    title: 'SELECT * sobre tabla ancha',
    body: 'La query selecciona todas las columnas de `crm.clientes` y `finanzas.movimientos`. Esto fuerza lectura completa de columnas innecesarias y aumenta el ancho de banda I/O.',
  },
  {
    severity: 'critical',
    title: 'Falta predicado temporal sobre movimientos',
    body: '`finanzas.movimientos` (1.2B filas) se filtra solo por `monto > 0`, sin acotar fecha. EXPLAIN muestra Seq Scan completo.',
  },
  {
    severity: 'warn',
    title: 'Posible exposición de datos personales',
    body: 'La query devolvería columnas `documento`, `mail` y `telefono` de `crm.clientes`. Considerá agregación o masking según perfil del consumidor.',
  },
  {
    severity: 'warn',
    title: 'JOIN antes de filtrar',
    body: 'El JOIN se ejecuta sobre el universo completo de movimientos. Filtrar primero por fecha en un CTE reduce cardinalidad intermedia.',
  },
  {
    severity: 'ok',
    title: 'JOIN sobre sort key',
    body: 'La columna `party_id` es sort key en ambas tablas — el JOIN aprovecha el ordenamiento.',
  },
];

window.QD_PLAN_LINES = [
  { op: 'XN Limit', cost: '(cost=1.2M..1.2M)' },
  { op: '  ->  XN Sort', cost: '(cost=1.2M..1.2M rows=1.2B)' },
  { op: '        ->  XN Hash Join DS_DIST_NONE', cost: '(cost=820K..1.0M)' },
  { op: '              ->  XN Seq Scan on movimientos', cost: '(cost=0..820K rows=1.2B)', flag: 'critical' },
  { op: '              ->  XN Hash (cost=2.4K..2.4K)', cost: '' },
  { op: '                    ->  XN Seq Scan on clientes', cost: '(cost=0..2.4K rows=240K)' },
];
