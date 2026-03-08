# API Confirmación de asistencia (Azure Function + Azure SQL)

Esta API recibe nombre y cantidad de personas desde la invitación y los guarda en la tabla `registro_personas` de Azure SQL.

## Despliegue en Azure

1. **Crear Function App** (Azure Portal o CLI):
   - Runtime: Node.js 18 o 20
   - Plan: Consumption
   - Región: la que prefieras

2. **Configurar variables de entorno** en la Function App → Configuration → Application settings:
   - `SQL_SERVER` = `danielm.database.windows.net`
   - `SQL_DATABASE` = `db_punto_venta`
   - `SQL_USER` = tu usuario
   - `SQL_PASSWORD` = tu contraseña

3. **Permitir CORS**: En la Function App → CORS → añadir `*` o el dominio de tu invitación (ej. `https://jhanmarquez.github.io`).

4. **Desplegar el código**:
   - Desde VS Code con la extensión "Azure Functions", o
   - Con Azure CLI: `func azure functionapp publish <NombreDeTuFunctionApp>`

5. **Firewall de Azure SQL**: En el servidor SQL (Azure Portal) → Firewall / Redes → permitir "Allow Azure services" o añadir las IPs outbound de la Function App si hace falta.

## URL de la función

Después del despliegue la URL será algo como:
`https://<NombreDeTuFunctionApp>.azurewebsites.net/RegistroConfirmacion`

Esa URL hay que ponerla en `index.html` en la variable `CONFIRMACION_API_URL` (en el script de la invitación).

## Probar en local

1. Copia `local.settings.example.json` a `local.settings.json` y rellena los valores de SQL (no subas `local.settings.json` a git).
2. `npm install` y `func start`.
3. La función escuchará en `http://localhost:7071/api/RegistroConfirmacion`.
