/**
 * CONFIRMACIONES BODA → Google Sheets
 * Usa solo doGet: el formulario envía por GET (más fiable desde cualquier página).
 *
 * Hoja: https://docs.google.com/spreadsheets/d/1BOR5lSyPNPMUS0XdeO-z1H6Wzp_5Gw5fFzbyC48qBW4/edit
 */

var ID_HOJA_BODA = '1BOR5lSyPNPMUS0XdeO-z1H6Wzp_5Gw5fFzbyC48qBW4';

function doGet(e) {
  var params = e.parameter || {};
  var nombre = (params.nombre || '').toString().trim();
  var personas = (params.personas || '').toString().trim();

  if (nombre && personas !== '') {
    try {
      var spreadsheet = SpreadsheetApp.openById(ID_HOJA_BODA);
      var sheet = spreadsheet.getSheets()[0];
      sheet.appendRow([new Date(), nombre, personas]);
      return ContentService.createTextOutput('Gracias por confirmar').setMimeType(ContentService.MimeType.TEXT);
    } catch (err) {
      return ContentService.createTextOutput('Error: ' + err.toString()).setMimeType(ContentService.MimeType.TEXT);
    }
  }

  return ContentService.createTextOutput('OK - Script activo').setMimeType(ContentService.MimeType.TEXT);
}
