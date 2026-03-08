/**
 * CONFIRMACIONES BODA → Google Sheets
 *
 * Tu hoja: https://docs.google.com/spreadsheets/d/1BOR5lSyPNPMUS0XdeO-z1H6Wzp_5Gw5fFzbyC48qBW4/edit
 *
 * Pasos:
 * 1. Abre el enlace de arriba (tu hoja "BODA").
 * 2. En la fila 1 escribe: Fecha | Nombre completo | Número de personas
 * 3. Menú Extensiones > Apps Script. Borra el código que salga y pega este archivo completo. Guarda (Ctrl+S).
 * 4. Menú Implementar > Nueva implementación > tipo "Aplicación web".
 *    - Descripción: "Recibir confirmaciones boda"
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquier persona
 * 5. Pulsa Implementar. Copia la URL que te dan (algo como https://script.google.com/macros/s/.../exec).
 * 6. En index.html busca var GOOGLE_SCRIPT_URL = ''; y pega esa URL entre las comillas.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var params = e.parameter;
    var nombre = params.nombre || '';
    var personas = params.personas || '';
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
