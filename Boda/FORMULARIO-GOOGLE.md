# Confirmaciones con Formulario de Google (sí guarda en la hoja)

Así las respuestas **se guardan solas** en tu hoja, sin Apps Script.

---

## 1. Crear el formulario desde tu hoja BODA

1. Abre tu hoja: https://docs.google.com/spreadsheets/d/1BOR5lSyPNPMUS0XdeO-z1H6Wzp_5Gw5fFzbyC48qBW4/edit  
2. Menú **Insertar** → **Formulario** → **Formulario en blanco** (o **Nuevo formulario**).  
3. Google crea un formulario y lo **enlaza a esta hoja**: cada respuesta se añade como fila.

---

## 2. Añadir las preguntas

1. Pregunta 1: **Nombre completo** → tipo **Respuesta breve**.  
2. Pregunta 2: **Número de personas que asistirán** → tipo **Número** o **Lista desplegable** (1, 2, 3…).  
3. Guarda (no hace falta más).

---

## 3. Copiar la URL del formulario

1. En el formulario, arriba a la derecha: **Enviar**.  
2. Elige el icono de **enlace** (cadena).  
3. Activa **Acortar URL** si quieres.  
4. **Copiar** la URL (será algo como `https://docs.google.com/forms/d/e/1FAIpQL.../viewform`).

---

## 4. Poner la URL en la invitación

1. Abre **index.html** en el proyecto.  
2. Busca: `var GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeYourFormId/viewform';`  
3. **Sustituye** esa URL por la que copiaste (entre las comillas).  
4. Guarda el archivo.

---

Listo. Cuando alguien pulse **Confirmar aquí** en la invitación y luego **Abrir formulario de confirmación**, se abrirá tu formulario. Al enviarlo, la respuesta aparecerá **en la misma hoja BODA** (en una nueva fila).
