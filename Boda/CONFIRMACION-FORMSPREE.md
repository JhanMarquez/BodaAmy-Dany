# Confirmaciones con Formspree (gratis)

El formulario envía **nombre** y **cantidad** a **Formspree**. Tú ves todas las respuestas en tu panel de Formspree (y opcionalmente por email). Sin Google Sheets ni código en el servidor.

---

## 1. Crear el formulario en Formspree

1. Entra en **https://formspree.io** y crea una cuenta (gratis).
2. Clic en **New form**.
3. Pon un nombre, por ejemplo "Confirmaciones Boda".
4. Te dan una URL como: `https://formspree.io/f/xyzabcde`
5. El **ID** es la parte final: `xyzabcde` (lo que va después de `/f/`).

Plan gratis: **50 envíos al mes** (suele bastar para una boda).

---

## 2. Poner el ID en la invitación

1. Abre **Boda/index.html**.
2. Busca **FORMSPREE_ID** (o "Pega aquí el ID").
3. Sustituye por tu ID entre comillas. Ejemplo:
   ```javascript
   var FORMSPREE_ID = 'xyzabcde';
   ```
4. Guarda y publica de nuevo en GitHub si ya está subido.

---

## 3. Ver las respuestas

- Entra en **https://formspree.io** → tu formulario → pestaña **Submissions**.
- Ahí ves cada envío con nombre, cantidad y fecha.
- Puedes exportar o activar notificaciones por email en la configuración del formulario.

Se usa **envío por formulario POST a un iframe** (no fetch), así funciona en **local** y en **GitHub Pages** sin bloqueos.

Si en Formspree tienes activada la opción de "Allow only certain domains", añade: `https://jhanmarquez.github.io`
