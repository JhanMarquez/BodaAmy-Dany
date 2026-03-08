#!/usr/bin/env python3
"""
Convierte IMG3.HEIC, IMG4.HEIC e IMG5.HEIC a JPG con buena calidad.
Necesitas: pip3 install pillow pillow-heif
"""
try:
    from pillow_heif import register_heif_opener
    from PIL import Image
except ImportError:
    print("Falta instalar: pip3 install pillow pillow-heif")
    exit(1)

import os

register_heif_opener()
carpeta = os.path.dirname(os.path.abspath(__file__))

for n in (3, 4, 5):
    heic = os.path.join(carpeta, f"IMG{n}.HEIC")
    jpg = os.path.join(carpeta, f"IMG{n}.JPG")
    if not os.path.exists(heic):
        print(f"No encontrado: IMG{n}.HEIC")
        continue
    img = Image.open(heic)
    img.convert("RGB").save(jpg, "JPEG", quality=95)
    print(f"Convertido: IMG{n}.HEIC -> IMG{n}.JPG")

print("Listo.")
