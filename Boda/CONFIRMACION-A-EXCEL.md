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
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var params = e.parameter || {};
  var nombre = params.nombre || '';
  var cantidad = params.cantidad || '';
  if (nombre) {
    sheet.appendRow([new Date(), nombre, cantidad]);
  }
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Guarda el proyecto (Ctrl+S o el icono de guardar). Arriba donde dice "Sin título", pon por ejemplo "Confirmaciones Boda".

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
