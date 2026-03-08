# Arreglar "doGet no encontrada" y que guarden los registros

Sigue estos pasos **en orden**:

---

## Paso 1: Abrir Apps Script desde tu hoja BODA

1. Abre: https://docs.google.com/spreadsheets/d/1BOR5lSyPNPMUS0XdeO-z1H6Wzp_5Gw5fFzbyC48qBW4/edit  
2. En el menú superior: **Extensiones** → **Apps Script**.  
3. Se abre una pestaña con el editor de código.

---

## Paso 2: Borrar todo y pegar este código

1. En el editor, **selecciona todo** el código (Ctrl+A o Cmd+A).  
2. **Bórralo**.  
3. **Copia** el código que está abajo (desde `var ID_HOJA_BODA` hasta el último `}`).  
4. **Pégalo** en el editor.  
5. Pulsa **Guardar** (icono del disco o Ctrl+S).

**Código a pegar:**

```javascript
var ID_HOJA_BODA = '1BOR5lSyPNPMUS0XdeO-z1H6Wzp_5Gw5fFzbyC48qBW4';

function doGet(e) {
  return ContentService.createTextOutput('OK - Script activo').setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    var spreadsheet = SpreadsheetApp.openById(ID_HOJA_BODA);
    var sheet = spreadsheet.getSheets()[0];
    var params = e.parameter;
    var nombre = (params.nombre || '').toString().trim();
    var personas = (params.personas || '').toString().trim();
    sheet.appendRow([new Date(), nombre, personas]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, message: 'Gracias por confirmar' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## Paso 3: Crear una NUEVA VERSIÓN de la implementación

1. Arriba a la derecha: **Implementar** → **Gestionar implementaciones**.  
2. Verás tu implementación (Aplicación web). Pulsa los **tres puntos** ⋮ a la derecha.  
3. Elige **Editar**.  
4. Donde dice **Versión**, abre el desplegable y elige **Nueva versión**.  
5. (Opcional) En "Descripción" puedes poner: `Incluye doGet y escribe en hoja BODA`.  
6. Pulsa **Implementar**.  
7. **No hace falta cambiar la URL**: la que ya tienes en la invitación sigue siendo válida.

---

## Paso 4: Probar

1. Abre en el navegador esta URL (la de tu script):  
   https://script.google.com/macros/s/AKfycbysKTQW-FYD8jCY79lW4Oy_RbughWb0kzL9xI44MZozpS0OY6X0fBPddwhQi7s_R32o-Q/exec  

2. Deberías ver el texto: **OK - Script activo**.  
3. Si ves eso, ya está bien. Prueba luego a enviar una confirmación desde la invitación y revisa la hoja BODA.

---

Si sigue saliendo "doGet no encontrada", es que la URL que se está usando sigue apuntando a una versión antigua. En **Gestionar implementaciones** comprueba que la implementación activa sea la que acabas de editar y que hayas pulsado **Implementar** después de elegir "Nueva versión".
