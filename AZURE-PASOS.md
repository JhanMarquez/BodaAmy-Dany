# Qué hacer en Azure – Paso a paso

Sigue estos pasos para que el formulario de confirmación guarde los datos en tu base SQL.

---

## 1. Crear la Function App (si aún no la tienes)

1. Entra a **https://portal.azure.com** e inicia sesión.
2. Busca **“Function App”** y pulsa **Crear**.
3. Rellena:
   - **Suscripción**: la que uses.
   - **Grupo de recursos**: uno existente o crea uno (ej. `rg-boda`).
   - **Nombre de la Function App**: por ejemplo `boda-amy-dany` (será parte de la URL).
   - **Runtime**: **Node.js**.
   - **Versión**: 18 o 20.
   - **Región**: la que prefieras (ej. East US).
   - **Plan**: **Consumption (Serverless)**.
4. Pulsa **Revisar y crear** y luego **Crear**.

---

## 2. Configurar la conexión a SQL (Application settings)

1. En el portal, abre tu **Function App** (la que creaste).
2. En el menú izquierdo entra a **Configuración** → **Configuración de la aplicación** (o **Application settings**).
3. Pulsa **+ Nueva configuración de la aplicación** y añade **una por una** estas cuatro:

   | Nombre          | Valor                    |
   |-----------------|--------------------------|
   | `SQL_SERVER`    | `danielm.database.windows.net` |
   | `SQL_DATABASE`  | `db_punto_venta`         |
   | `SQL_USER`      | `d4anielM`               |
   | `SQL_PASSWORD`  | `Hipp991109#`            |

4. Guarda los cambios (**Guardar** arriba).

---

## 3. Activar CORS para tu invitación

1. Sigue dentro de tu **Function App**.
2. En el menú izquierdo entra a **API** → **CORS** (o **Características de la plataforma** → **CORS**).
3. En **Orígenes permitidos** añade:
   - `*` (permite cualquier sitio; sirve para probar), **o**
   - La URL exacta de tu invitación, por ejemplo:  
     `https://jhanmarquez.github.io`
4. Guarda.

---

## 4. Permitir que Azure se conecte a tu SQL (firewall)

1. En el portal, busca **SQL Server** o la base **db_punto_venta** y abre el **servidor** (ej. `danielm.database.windows.net`).
2. Entra a **Seguridad** → **Redes** (o **Firewall / redes**).
3. Activa **“Permitir que los servicios y recursos de Azure accedan a este servidor”** (Allow Azure services).
4. Guarda.

---

## 5. Subir el código de la API (desplegar)

Tienes que publicar la carpeta **`api`** de tu proyecto en esa Function App.

### Opción A – Con VS Code

1. Instala la extensión **“Azure Functions”** en VS Code.
2. Inicia sesión en Azure (icono de la nube en la barra lateral).
3. En el explorador, clic derecho en la carpeta **`api`** → **Deploy to Function App**.
4. Elige tu suscripción y la Function App que creaste (ej. `boda-amy-dany`).
5. Espera a que termine el despliegue.

### Opción B – Con Azure CLI (terminal)

1. Instala **Azure Functions Core Tools** y **Azure CLI** si no los tienes.
2. En la terminal, entra a la carpeta del proyecto y luego a `api`:
   ```bash
   cd /Users/bluepeople/Documents/Boda/api
   npm install
   func azure functionapp publish NOMBRE_DE_TU_FUNCTION_APP
   ```
   (Sustituye `NOMBRE_DE_TU_FUNCTION_APP` por el nombre real, ej. `boda-amy-dany`.)

---

## 6. La URL de tu función

Cuando el despliegue termine, la URL de la función será:

```text
https://NOMBRE_DE_TU_FUNCTION_APP.azurewebsites.net/RegistroConfirmacion
```

Ejemplo: si tu app se llama `boda-amy-dany`:

```text
https://boda-amy-dany.azurewebsites.net/RegistroConfirmacion
```

---

## 7. Poner esa URL en la invitación

1. Abre **`index.html`** (el de la invitación).
2. Busca la línea donde dice `CONFIRMACION_API_URL`.
3. Sustituye la URL de ejemplo por la tuya, por ejemplo:

```javascript
var CONFIRMACION_API_URL = 'https://boda-amy-dany.azurewebsites.net/RegistroConfirmacion';
```

4. Guarda y vuelve a subir la invitación donde la publiques (ej. GitHub Pages).

---

## Resumen rápido

| Paso | Dónde | Qué hacer |
|------|--------|-----------|
| 1 | Azure Portal | Crear Function App (Node.js). |
| 2 | Function App → Configuración | Añadir `SQL_SERVER`, `SQL_DATABASE`, `SQL_USER`, `SQL_PASSWORD`. |
| 3 | Function App → CORS | Añadir `*` o la URL de tu invitación. |
| 4 | SQL Server → Redes | Activar “Permitir servicios de Azure”. |
| 5 | VS Code o CLI | Desplegar la carpeta `api` a la Function App. |
| 6 | index.html | Poner la URL de la función en `CONFIRMACION_API_URL`. |

Si en algún paso te pide elegir suscripción o recurso, usa la misma donde tienes la base `db_punto_venta`.
