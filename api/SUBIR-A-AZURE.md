# Subir la función a Azure (una sola vez)

Tu formulario ya está listo: cuando alguien pone nombre y cantidad, se envían a una función en Azure que los guarda en tu SQL (danielm.database.windows.net, db_punto_venta, tabla registro_personas).

Solo falta **subir** esa función a Azure. Dos caminos:

---

## Opción A – La más rápida (si puedes instalar Azure CLI)

1. **Instalar Azure CLI** (una vez):  
   https://aka.ms/InstallAzureCLIMacOS  
   Descargas el .pkg, lo instalas, cierras y abres la Terminal.

2. **En la Terminal:**
   ```bash
   az login
   ```
   (Entras con tu cuenta de Azure.)

3. **Subir la función:**
   ```bash
   cd /Users/bluepeople/Documents/Boda/api
   source ~/.zshrc
   func azure functionapp publish boda-amy-dany
   ```

4. Al terminar te dará una URL. Esa URL (más `/RegistroConfirmacion`) la pones en **index.html** en la variable `CONFIRMACION_API_URL`.

Las variables de SQL (servidor, base de datos, usuario, contraseña) ya las tienes en la Function App **boda-amy-dany** en Azure (Configuración → Variables de entorno). No hace falta tocar nada más.

---

## Opción B – Sin instalar Azure CLI (Function App con plan “Consumo”)

Si tu Function App **boda-amy-dany** está en plan **“Consumo flexible”**, el zip deploy no funciona (404).

1. En Azure Portal crea **otra** Function App:
   - Nombre: por ejemplo `boda-api`
   - Plan: **Consumo** (el normal, **no** “Consumo flexible”).
   - Runtime: Node.js.

2. En esa nueva app → Configuración → Variables de entorno, pon:
   - `SQL_SERVER` = `danielm.database.windows.net`
   - `SQL_DATABASE` = `db_punto_venta`
   - `SQL_USER` = `d4anielM`
   - `SQL_PASSWORD` = `Hipp991109#`

3. En la misma app → CORS → Orígenes permitidos → añade `*` y guarda.

4. Descarga el **perfil de publicación** de esa nueva app y guarda el archivo en la carpeta **api** (puede llamarse `boda-api.PublishSettings` o similar).

5. En la Terminal:
   ```bash
   cd /Users/bluepeople/Documents/Boda/api
   source ~/.zshrc
   node deploy-with-profile.js
   ```
   (El script usa el .PublishSettings que haya en la carpeta api.)

6. La URL que muestre al final (con `/RegistroConfirmacion`) la pones en **index.html** en `CONFIRMACION_API_URL`.

---

En ambos casos, después de eso **no tienes que volver a subir nada**. Los envíos del formulario se guardarán solos en tu tabla `registro_personas`.
