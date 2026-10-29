# Wiki GSM

Biblioteca de artículos de reparación de celulares, organizada por marca y modelo.  
Construida con [Astro Starlight](https://starlight.astro.build/) y publicada gratis en GitHub Pages.

---

## Qué necesitas instalar

Antes de empezar, instala estas tres herramientas gratuitas:

| Herramienta | Para qué sirve | Descarga |
|---|---|---|
| **Node.js LTS** | Ejecuta el proyecto localmente | [nodejs.org](https://nodejs.org) |
| **Visual Studio Code** | Editor de texto para los artículos | [code.visualstudio.com](https://code.visualstudio.com) |
| **GitHub Desktop** | Subir cambios a GitHub fácilmente | [desktop.github.com](https://desktop.github.com) |

Tras instalar Node.js, reinicia tu computadora.

---

## Cómo abrir el proyecto

1. Descarga o clona este repositorio en tu computadora.
2. Abre la carpeta del proyecto en Visual Studio Code:  
   `Archivo → Abrir carpeta → selecciona la carpeta WikiGSM`.

---

## Ver la web en tu PC (modo desarrollo)

Abre la terminal de VS Code (`Ver → Terminal`) y escribe:

```bash
npm install
npm run dev
```

La primera vez `npm install` puede tardar uno o dos minutos.  
Luego abre tu navegador en **http://localhost:4321** para ver la wiki.  
Cada vez que guardes un archivo, la página se actualiza sola.

Para detener el servidor: presiona `Ctrl + C` en la terminal.

---

## Estructura del proyecto

```
src/
  content/
    docs/
      apple/
        _dir.yaml          ← nombre que se ve en el menú ("Apple")
        iphone-11/
          _dir.yaml        ← nombre que se ve en el menú ("iPhone 11")
          cambio-bateria.md
      samsung/
        _dir.yaml          ← nombre que se ve en el menú ("Samsung")
        a52/
          _dir.yaml        ← nombre que se ve en el menú ("Galaxy A52")
          lineas-verdes-pantalla.md
          no-carga-carga-intermitente.md
plantilla-articulo.md      ← plantilla para crear artículos nuevos
astro.config.mjs           ← configuración del sitio
```

---

## Agregar una marca nueva

1. Crea la carpeta: `src/content/docs/<marca>/`  
   Ejemplo: `src/content/docs/motorola/`

2. Dentro de esa carpeta, crea el archivo `_dir.yaml`:
   ```yaml
   label: Motorola
   collapsed: true
   ```

3. Abre `astro.config.mjs` y agrega un bloque nuevo en la sección `sidebar`:
   ```js
   {
     label: 'Motorola',
     collapsed: true,
     items: [{ autogenerate: { directory: 'motorola', collapsed: true } }],
   },
   ```
   Colócalo en orden alfabético junto a los demás.

---

## Agregar un modelo nuevo

1. Crea la carpeta: `src/content/docs/<marca>/<modelo>/`  
   Ejemplo: `src/content/docs/motorola/moto-g54/`

2. Dentro de esa carpeta, crea el archivo `_dir.yaml`:
   ```yaml
   label: Moto G54
   collapsed: true
   ```

Listo. Los artículos que pongas dentro aparecerán automáticamente en el menú bajo ese modelo.

---

## Agregar un artículo nuevo

1. Copia el archivo `plantilla-articulo.md` (que está en la raíz del proyecto) a:  
   `src/content/docs/<marca>/<modelo>/<nombre-del-articulo>.md`  
   Ejemplo: `src/content/docs/motorola/moto-g54/cambio-pantalla.md`

2. Abre el archivo y completa el encabezado (frontmatter):
   ```markdown
   ---
   title: Cambio de pantalla
   description: Cómo reemplazar la pantalla del Motorola Moto G54.
   ---
   ```

3. Rellena las secciones: Síntoma, Diagnóstico, Procedimiento y Notas.

El artículo aparecerá automáticamente en el menú al guardar.

---

## Agregar imágenes a un artículo

1. Guarda las imágenes en:  
   `src/assets/imagenes/<marca>/<modelo>/`  
   Ejemplo: `src/assets/imagenes/motorola/moto-g54/pantalla-rota.jpg`

2. En el artículo, referencia la imagen así:
   ```markdown
   ![Descripción de la imagen](../../../assets/imagenes/motorola/moto-g54/pantalla-rota.jpg)
   ```
   La cantidad de `../` depende de qué tan profundo está el artículo respecto a la raíz de `docs`.  
   Desde `docs/<marca>/<modelo>/articulo.md` se necesitan tres niveles: `../../../`.

---

## Subir cambios a GitHub

Con **GitHub Desktop**:

1. Abre GitHub Desktop.
2. Verás los archivos modificados en el panel izquierdo.
3. Escribe un resumen en el campo "Summary" (ejemplo: `Agrego artículo de Motorola Moto G54`).
4. Haz clic en **"Commit to main"**.
5. Haz clic en **"Push origin"** para subir los cambios.

GitHub Actions compilará y publicará el sitio automáticamente en pocos minutos.

---

## Activar GitHub Pages (primera vez)

1. Sube el proyecto a GitHub como repositorio **`wikiGSM`**.
2. Ve a tu repositorio en GitHub → **Settings** (Configuración).
3. En el menú lateral: **Pages**.
4. En **"Source"**, selecciona **"GitHub Actions"**.
5. Haz clic en **Save**.

La próxima vez que subas cambios a la rama `main`, el sitio se compilará y publicará solo.

Tu dirección final será:  
**https://andersonfx7.github.io/wikiGSM/**

Puede tardar 1–2 minutos en estar disponible después del primer despliegue.  
Puedes revisar el estado en la pestaña **Actions** del repositorio.

---

## Cambiar a un dominio propio (opcional)

Si tienes un dominio propio (ejemplo: `wiki.tutaller.com`):

1. En el panel de tu proveedor de dominios, crea un registro CNAME:
   - Nombre: `wiki` (o el subdominio que prefieras)
   - Valor: `andersonfx7.github.io`

2. En GitHub → Settings → Pages → **Custom domain**, escribe tu dominio y guarda.

3. En `astro.config.mjs`, actualiza la línea `site`:
   ```js
   site: 'https://wiki.tutaller.com',
   base: '/',
   ```

4. Sube el cambio y espera unos minutos para que el DNS se propague.

---

## Qué cambiar con tus datos

Si creaste el proyecto con estos valores de ejemplo, cambia lo siguiente antes de publicar:

| Archivo | Línea | Valor actual | Cámbialo por |
|---|---|---|---|
| `astro.config.mjs` | `site` | `https://andersonfx7.github.io` | `https://<TU-USUARIO>.github.io` |
| `astro.config.mjs` | `base` | `/wikiGSM` | `/<NOMBRE-DEL-REPO>` |
| `astro.config.mjs` | `href` (social) | `...andersonfx7/wikiGSM` | URL de tu repositorio |

---

## Licencia

Este proyecto es de uso libre para tu taller. Puedes modificarlo como necesites.
