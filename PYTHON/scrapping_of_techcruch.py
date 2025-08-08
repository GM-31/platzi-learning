import requests
from bs4 import BeautifulSoup
import pandas as pd

def obtener_noticias_techcrunch():
    """
    Extrae las noticias de la página principal de TechCrunch y las devuelve en un DataFrame de Pandas.
    Campos: título, enlace, categoría, autor, fecha, imagen
    """

    # 1️⃣ URL de TechCrunch
    url = "https://techcrunch.com/"

    # 2️⃣ Realizar solicitud HTTP a la página
    respuesta = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
    if respuesta.status_code != 200:
        print(f"Error al acceder a TechCrunch: {respuesta.status_code}")
        return None

    # 3️⃣ Crear objeto BeautifulSoup para analizar el HTML
    soup = BeautifulSoup(respuesta.text, "html.parser")

    # 4️⃣ Lista para almacenar las noticias
    noticias = []

    # 5️⃣ Buscar todos los elementos <li> con la clase de las noticias
    elementos_noticia = soup.find_all("li", class_="wp-block-post")

    for item in elementos_noticia:
        # Extraer título
        titulo_elem = item.find("h3", class_="loop-card__title")
        titulo = titulo_elem.get_text(strip=True) if titulo_elem else None

        # Extraer enlace
        enlace_elem = titulo_elem.find("a") if titulo_elem else None
        enlace = enlace_elem["href"] if enlace_elem else None

        # Extraer categoría
        categoria_elem = item.find("a", class_="loop-card__cat")
        categoria = categoria_elem.get_text(strip=True) if categoria_elem else None

        # Extraer autor
        autor_elem = item.find("a", class_="loop-card__author")
        autor = autor_elem.get_text(strip=True) if autor_elem else None

        # Extraer fecha/hora
        fecha_elem = item.find("time")
        fecha = fecha_elem.get_text(strip=True) if fecha_elem else None
        fecha_iso = fecha_elem["datetime"] if fecha_elem and fecha_elem.has_attr("datetime") else None

        # Extraer imagen
        img_elem = item.find("img")
        imagen = img_elem["src"] if img_elem else None

        # Guardar datos en la lista
        noticias.append({
            "titulo": titulo,
            "enlace": enlace,
            "categoria": categoria,
            "autor": autor,
            "fecha_texto": fecha,
            "fecha_iso": fecha_iso,
            "imagen": imagen
        })

    # 6️⃣ Convertir lista a DataFrame
    df = pd.DataFrame(noticias)

    return df


if __name__ == "__main__":
    df_noticias = obtener_noticias_techcrunch()

    if df_noticias is not None:
        print(df_noticias.head())  # Mostrar las primeras noticias
        # Guardar en CSV si se desea
        df_noticias.to_csv("noticias_techcrunch.csv", index=False, encoding="utf-8")
