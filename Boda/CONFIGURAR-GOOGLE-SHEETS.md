# Que los registros lleguen a Google Sheets

Si al confirmar asistencia no se guarda nada en la hoja, haz esto:

## 1. Código del script

1. Abre tu hoja **BODA**: https://docs.google.com/spreadsheets/d/1BOR5lSyPNPMUS0XdeO-z1H6Wzp_5Gw5fFzbyC48qBW4/edit  
2. Menú **Extensiones** → **Apps Script**.  
3. **Borra** todo el código que haya y **pega** el contenido del archivo **GoogleSheets-Script.js** (en esta misma carpeta).  
4. Guarda (Ctrl+S o el disco).

## 2. Desplegar de nuevo

1. Arriba: **Implementar** → **Gestionar implementaciones**.  
2. Si ya hay una implementación tipo "Aplicación web", pulsa los **tres puntos** → **Editar**.  
3. En "Versión" elige **Nueva versión** (así se usa el código nuevo).  
4. **Implementar**.  
5. Copia la **URL** (debe terminar en **/exec**).  
6. En **index.html** busca `var GOOGLE_SCRIPT_URL` y pega esa URL entre las comillas.

## 3. Permisos

- **Quién tiene acceso:** debe ser **Cualquier persona** (o "Anyone" en inglés).  
- La primera vez que alguien envíe el formulario, Google puede pedirte que **autorices** la app (solo una vez).

## 4. Probar

- Abre en el navegador la URL de tu Apps Script (la que termina en `/exec`).  
- Deberías ver: `OK - Script activo`.  
- Luego prueba a enviar una confirmación desde la invitación y revisa la hoja BODA.

Si la invitación la abres con **doble clic** (archivo local), el envío al script a veces falla. Prueba sirviendo la página (por ejemplo con GitHub Pages o un servidor local).
