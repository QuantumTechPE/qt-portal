## Historia / requerimiento

<!-- La historia se enlaza sola por la rama qt/<n> (código QT-<n>). No la cierres aquí:
     se cierra al RATIFICAR el pase en producción. -->

## ¿Qué cambia?

<!-- Resumen corto y orientado a negocio. -->

## ¿Cómo se probó?

- [ ] Tests unitarios / de integración agregados o actualizados
- [ ] Probado localmente (`./mvnw quarkus:dev` / `npm start`)

## Checklist (Definition of Done)

- [ ] El título sigue Conventional Commits (`feat: ...`, `fix(api): ...`), porque define la próxima versión
- [ ] Sin secretos en el código (se leen desde Vault)
- [ ] Documentación actualizada si aplica
- [ ] Sin nuevas vulnerabilidades HIGH/CRITICAL (Trivy, Semgrep y Gitleaks en CICD DEV)

---
<sub>El merge es automático cuando **un admin** aprueba y el **CI Gate** está en verde.</sub>
