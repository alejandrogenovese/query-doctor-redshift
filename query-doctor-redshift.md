# Query Doctor Redshift

## 1. Objetivo

Query Doctor Redshift es un acelerador para analizar, explicar y optimizar consultas SQL sobre Amazon Redshift usando el MCP ya conectado. Su foco es performance, costo, seguridad de lectura y buenas prácticas.

> Esta iniciativa forma parte de **ArqData Value Accelerators**. No reemplaza el IDP ni los flujos formales de Plataforma, Gobierno, Seguridad, repositorios, permisos, CI/CD o despliegues.

---

## 2. Problema que resuelve

- Las queries complejas suelen llegar a revisión sin explicación funcional clara.
- Los problemas de performance se detectan tarde.
- Los usuarios no siempre entienden el impacto de SELECT *, joins amplios o falta de filtros.
- Falta una salida estandarizada para documentar hallazgos y recomendaciones.

---

## 3. Propuesta

Una aplicación donde el usuario pega SQL, selecciona modo de análisis y recibe explicación, hallazgos, EXPLAIN, recomendaciones, query sugerida y validación de equivalencia.

---

## 4. Público objetivo

- Data Engineers
- Arquitectos de datos
- Analistas avanzados
- Equipos que consumen Redshift
- Referentes técnicos de dominios

---

## 5. Valor esperado

- Reduce errores SQL antes de producción.
- Mejora performance y uso eficiente de Redshift.
- Genera aprendizaje técnico contextual.
- Produce reportes markdown reutilizables en tickets o PRs.

---

## 6. Alcance MVP

| Capacidad | Descripción |
| --- | --- |
| Análisis SQL | Explica tablas, joins, filtros, agregaciones y riesgos. |
| Guardrails | Permite solo SELECT, WITH y EXPLAIN. |
| EXPLAIN | Ejecuta o interpreta plan de ejecución si el MCP lo permite. |
| Recomendaciones | Sugiere mejoras sin cambiar semántica silenciosamente. |
| Reporte | Genera markdown descargable. |


---

## 7. Fuera de alcance

- No crear ni modificar objetos productivos.
- No administrar permisos, identidades técnicas, grupos o roles.
- No reemplazar aprobaciones de Plataforma, Gobierno o Seguridad.
- No registrar artefactos como fuente oficial de verdad.
- No ejecutar despliegues ni pipelines productivos.
- No ejecutar DDL/DML.
- No reemplazar revisión funcional del equipo responsable.

---

## 8. Frontera con IDP

| Límite | Definición |
| --- | --- |
| Advisor / acelerador | Genera recomendaciones, prototipos, análisis o documentación preliminar. |
| IDP / Plataforma | Mantiene el flujo formal de creación, permisos, repositorios, contratos oficiales, CI/CD y despliegues. |
| Formalización | Todo artefacto generado debe entrar al circuito formal si se quiere productivizar. |
| No compite | No crea data products, contratos, repos, permisos ni despliegues. |


---

## 9. Inputs / Outputs

| Entrada | Salida esperada |
| --- | --- |
| SQL + contexto de base/schema | Diagnóstico, recomendaciones, query sugerida y validaciones. |
| EXPLAIN | Interpretación funcional/técnica del plan. |


---

## 10. Requerimientos de implementación

| Frente | Necesidad |
| --- | --- |
| MCP Redshift | Endpoint y permisos read-only. |
| Backend | Validador SQL, orquestador MCP/LLM, generador de reporte. |
| Frontend | Editor SQL, selector de modo, panel markdown. |
| Seguridad | Allowlist, blocklist, timeouts, no persistencia de datos sensibles. |


---

## 11. Guardrails

- Solo SELECT/WITH/EXPLAIN.
- Bloquear DROP/DELETE/UPDATE/INSERT/ALTER/TRUNCATE/CREATE/GRANT/REVOKE/COPY/UNLOAD.
- EXPLAIN por defecto antes de ejecutar.
- Agregar o exigir LIMIT para muestras.
- Advertir columnas potencialmente sensibles.

---

## 12. API / contrato sugerido

```json
{"sql":"SELECT ...","mode":"explain","cluster":"...","database":"...","schema":"..."}
```

---

## 13. Flujo funcional

```text
Usuario pega SQL
↓
Guardrails
↓
EXPLAIN / análisis
↓
LLM genera diagnóstico
↓
Reporte Markdown
```

---

## 14. Demo sugerida

Mostrar una query con SELECT *, join amplio y sin filtro temporal; Query Doctor explica el problema, muestra riesgo, propone CTE filtrado y genera validación.

---

## 15. Métricas de éxito

- Queries analizadas.
- Hallazgos de performance detectados.
- Recomendaciones aceptadas.
- Reportes adjuntados a PR/ticket.
- Feedback de usuarios técnicos.

---

## 16. Backlog inicial

| Épica | Historias / tareas |
| --- | --- |
| Validación SQL | Implementar allowlist/blocklist y detección de LIMIT. |
| MCP | Integrar EXPLAIN y manejo de errores. |
| LLM | Prompt de análisis y formato de reporte. |
| UI | Editor SQL y visor markdown. |


---

## 17. Mensaje de presentación

Query Doctor permite demostrar valor rápido desde Arquitectura Data: mejora la calidad de las consultas, reduce riesgos de performance/costo y no invade el rol del IDP.
