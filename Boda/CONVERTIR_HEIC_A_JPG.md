# Cómo convertir IMG3, IMG4 e IMG5 de HEIC a JPG (calidad completa)

En Mac, **sips** a veces solo extrae la miniatura del HEIC, por eso los JPG salían muy pequeños. Para obtener JPG de calidad completa puedes hacer lo siguiente.

---

## Opción 1: Con Vista Previa (Preview) – sin instalar nada

1. En el Finder, ve a la carpeta **Boda** (donde está `index.html`).
2. Haz doble clic en **IMG3.HEIC** para abrirlo en Vista Previa.
3. Menú **Archivo → Exportar…** (o **File → Export…**).
4. En **Formato** elige **JPEG**.
5. Arrastra el control de **Calidad** al máximo.
6. Guarda como **IMG3.JPG** en la **misma carpeta** y confirma reemplazar si pregunta.
7. Repite los pasos 2–6 para **IMG4.HEIC** → **IMG4.JPG** y **IMG5.HEIC** → **IMG5.JPG**.

Así los JPG tendrán la misma calidad que los HEIC y la invitación cargará las fotos bien.

---

## Opción 2: Con ImageMagick (línea de comandos)

Si tienes Homebrew (`brew`):

```bash
brew install imagemagick
cd /Users/bluepeople/Documents/Boda
magick IMG3.HEIC IMG3.JPG
magick IMG4.HEIC IMG4.JPG
magick IMG5.HEIC IMG5.JPG
```

O las tres de una vez:

```bash
for i in 3 4 5; do magick IMG${i}.HEIC IMG${i}.JPG; done
```

---

## Opción 3: Con Python (pillow-heif)

Si tienes Python y quieres usar el script del proyecto:

```bash
pip3 install pillow pillow-heif
cd /Users/bluepeople/Documents/Boda
python3 convertir_heic_a_jpg.py
```

(Usa el script `convertir_heic_a_jpg.py` que está en esta carpeta.)
