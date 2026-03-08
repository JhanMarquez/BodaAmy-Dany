# Llevar las confirmaciones a una hoja (tipo Excel) – gratis

El formulario de la invitación envía **nombre** y **cantidad de personas** a una URL.  
Si usas **Google Sheets** (gratis), en 5 minutos lo tienes guardando en una hoja.

---

## 1. Crear la hoja

1. Entra en **https://sheets.google.com** y crea una hoja nueva (o usa una existente).
2. En la **primera fila** pon los títulos:  
   **A1:** `Fecha`  
   **B1:** `Nombre`  
   **C1:** `Cantidad`
3. Guarda la hoja (nombre por ejemplo: "Confirmaciones Boda").

---

## 2. Añadir el script

1. En la hoja: menú **Extensiones** → **Apps Script**.
2. Borra lo que haya y pega este código:

```javascript
function doPost(e) {
  e = e || {};
  var params = e.parameter || {};
  if (!params.nombre && e.postData && e.postData.contents) {
    var body = e.postData.contents;
    body.split('&').forEach(function(pair) {
      var kv = pair.split('=');
      if (kv.length === 2) params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1].replace(/\+/g, ' '));
    });
  }
  var nombre = (params.nombre || '').trim();
  var cantidad = params.cantidad || '';

  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = libro.getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Fecha', 'Nombre', 'Cantidad']);
  }
  if (nombre) {
    sheet.appendRow([new Date(), nombre, cantidad]);
    SpreadsheetApp.flush();
  }
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Guarda el proyecto (Ctrl+S). Arriba donde dice "Sin título", pon por ejemplo "Confirmaciones Boda".
4. **Si ya tenías el script desplegado:** ve a **Implementar** → **Gestionar implementaciones** → el lápiz (Editar) de tu implementación → **Versión: Nueva versión** → **Implementar**. Así se usa el código nuevo.

---

## 3. Desplegar como aplicación web

1. Arriba en Apps Script: **Implementar** → **Nueva implementación**.
2. Donde dice "Seleccionar tipo": elige **Aplicación web**.
3. **Descripción:** por ejemplo "Confirmaciones".
4. **Ejecutar como:** Yo (tu cuenta).
5. **Quién tiene acceso:** **Cualquier persona** (para que la invitación pueda enviar desde GitHub).
6. Clic en **Implementar**.
7. Autoriza cuando te lo pida (tu cuenta de Google).
8. Copia la **URL de la aplicación web** (algo como  
   `https://script.google.com/macros/s/AKfycbz.../exec`).  
   Esa es la URL que usarás en el siguiente paso.

---

## 4. Poner la URL en la invitación

1. Abre **Boda/index.html** en el editor.
2. Busca la variable **GOOGLE_SCRIPT_URL** (o donde se configure la URL del formulario).
3. Pega ahí la URL que copiaste, entre comillas.  
   Ejemplo:  
   `var GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz.../exec';`
4. Guarda el archivo y vuelve a subir **Boda** a GitHub si ya lo tienes publicado.

---

Cuando alguien rellene el formulario y pulse Enviar, en la hoja se añadirá una fila con la fecha, el nombre y la cantidad. Puedes exportar la hoja a Excel cuando quieras (Archivo → Descargar → Microsoft Excel).

---

## Si no se guarda al enviar desde la web (pero sí en local)

1. En Apps Script: **Ejecuciones** (o "Executions", en el menú izquierdo). Ahí ves si el script se ejecutó cuando enviaste desde la invitación. Si aparece un error, copia el mensaje.
2. Comprueba que la implementación sea **"Cualquier persona"** (Anyone), no "Cualquier persona con cuenta de Google".
3. Prueba en ventana de incógnito para evitar caché.
