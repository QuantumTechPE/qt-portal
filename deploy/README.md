# deploy/: cómo corre qt-portal en cada ambiente

Aquí va **solo lo técnico**. La configuración de cada ambiente vive en el repo **qt-config**.

| Dónde | Qué define | Llega al pod como |
|---|---|---|
| `deploy/values.yaml` | Común: puerto, probes, ruta pública y `requiredConfig` | Deployment, Service, Ingress |
| `deploy/values-dev.yaml` · `values-cert.yaml` · `values-prod.yaml` | **Plan de recursos**, réplicas, **HPA**, PDB | Deployment, HPA, PDB |
| **qt-config** `<ambiente>/qt-portal-<ambiente>.yaml` → `files: config.json` | Configuración de runtime de la SPA (ambiente, URL de la API, flags) | ConfigMap servido en `/runtime/config.json` |

Cada ambiente lee qt-config desde su rama: dev ← `pre-develop`, cert ← `develop`, prod ← `master`. Una SPA no tiene secretos: todo lo que llega al navegador es público.

La app lee `/runtime/config.json` al iniciar (`RuntimeConfigService`), así **la misma imagen** sirve para dev, cert y prod.

En cada PR el CI valida los 3 ambientes con su configuración de qt-config. Al desplegar (DEV, congelamiento y pase), el pipeline verifica `requiredConfig` y escribe en `qt-gitops/apps/qt-portal/<ambiente>/` el snapshot técnico (`values.yaml`) y la configuración vigente (`config.yaml`). Un cambio solo de configuración es un PR en qt-config: no necesita una versión nueva.
