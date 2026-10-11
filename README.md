# Promuvo — landing comercial

Sitio estático en HTML, CSS y JavaScript, independiente de la aplicación Flutter y del backend. No requiere paquetes, compilación, servicios pagos ni analítica. Incluye el video comercial original, siete capturas originales de la aplicación y una portada promocional creada a partir de una copia escalada de una captura real.

## Vista local

Para probar el video y las rutas tal como se servirán en GitHub Pages, abrí PowerShell en esta carpeta y ejecutá `python -m http.server 8000`. Después visitá `http://localhost:8000`. No es necesario instalar dependencias. Al terminar, detené el servidor con `Ctrl+C`.

También podés abrir `index.html` directamente; algunos navegadores restringen la reproducción de archivos de video abiertos mediante `file://`.

## Video y capturas

- El reproductor usa `assets/videos/Promuvo_demo_dentro_de_celular.mp4`, conserva el audio, ofrece controles, no usa autoplay y tiene `preload="none"`. El video original se copió sin modificar.
- La portada `assets/videos/promuvo-demo-poster.jpg` es una composición estática 1280 × 720 para el reproductor; incorpora una copia reducida de `assets/capturas/06-diseno-comercial.jpeg` sin editar el video ni reemplazar las siete imágenes originales.
- Las siete capturas originales están en `assets/capturas/`, con prefijos consecutivos `01` a `07`. Se copiaron byte por byte, conservando precios, textos, enlaces y píxeles; su peso conjunto es inferior a 700 KB. En la página se cargan con `loading="lazy"` y pueden abrirse en tamaño completo.
- La galería sigue tres secuencias de uso: `01` catálogo y listado de productos; `02` lote, detalle de publicación, edición asistida y diseño comercial; `03` selector de compartir de Android. Los números de cada captura siguen el recorrido visible sin sugerir publicación automática.
- El directorio de recursos no contiene el video adicional de WhatsApp; solo se incorporó el archivo comercial explícitamente solicitado.
- Los recursos del sitio usan rutas relativas, compatibles con GitHub Pages y su URL bajo un subdirectorio.

## Configuración antes de publicar

1. `config.js` ya tiene configurado el WhatsApp de contacto proporcionado por el desarrollador. Confirmá que el número siga siendo el canal comercial correcto antes de publicar. Para cambiarlo, usá solo dígitos con código de país (formato internacional, sin `+`, espacios ni guiones). El correo de contacto también se muestra en la sección de contacto y abre el cliente de correo del visitante.
2. En el mismo archivo, configurá `siteUrl` con la URL HTTPS final del sitio, sin barra final. Después, en `index.html`, completá `content` en las etiquetas `og:url`, `og:image` y `twitter:image` con la URL absoluta del sitio y `assets/promuvo-social.png`. Los rastreadores de redes suelen leer el HTML sin ejecutar JavaScript; editar solo `config.js` no alcanza para sus tarjetas de vista previa. El script agrega además la URL canónica cuando la página se abre.
3. Revisá el texto comercial y confirmá qué cuenta/acceso de IA se ofrecerá a los prospectos. La web no comparte claves, accesos ni datos con el backend.

El formulario no tiene backend: valida los campos y prepara un mensaje en WhatsApp. La persona revisa y envía el mensaje desde WhatsApp. No se guardan datos en cookies, almacenamiento local, analítica ni servidor.

## Publicar gratis en GitHub Pages

La opción más sencilla es publicar esta carpeta desde un repositorio independiente:

1. Creá un repositorio **público** nuevo en GitHub para el sitio y no agregues una plantilla, para evitar sobrescribir archivos.
2. Subí el contenido de `landing-promuvo/` (`index.html`, `styles.css`, `script.js`, `config.js`, `README.md` y `assets/`) a la raíz de ese repositorio.
3. En GitHub, abrí **Settings → Pages**. En **Build and deployment**, seleccioná **Deploy from a branch**, elegí `main` y la carpeta `/(root)`, y guardá.
4. Esperá a que termine la publicación que GitHub Pages inicia. Configurá la URL HTTPS que GitHub asignó en `config.js` como `siteUrl` y subí ese cambio.
5. Comprobá el sitio publicado y los metadatos antes de compartirlo. No hace falta añadir workflows, claves ni servicios pagos.

También se puede publicar desde una carpeta `/docs` en una rama, copiando allí el contenido del sitio. No publiques desde una rama o repositorio que contenga archivos privados, credenciales, la aplicación móvil o datos de usuarios.

## Qué está disponible hoy

- Catálogo de productos editable, creación, importación y exportación.
- Plantillas locales para generar piezas promocionales y contenido que el vendedor puede revisar.
- Integración existente con backend autenticado para propuestas de descripciones y asistencia desde imágenes. Requiere acceso configurado y cotización confirmada por operación; la disponibilidad de generación real para nuevos usuarios no se promete aquí.
- En Android, compartir abre el selector del sistema. Promuvo no publica automáticamente en redes.

Las capturas y el video son material original de demostración y se muestran sin alterar su información comercial visible. El selector de compartir corresponde al Android de la captura y no promete integraciones disponibles en todos los dispositivos.

No se publican precios, pagos, pruebas gratuitas ni integraciones automáticas con cuentas sociales.

## Comprobaciones rápidas

- Abrí los anclajes del menú y los botones de acción; el formulario lleva a la sección de contacto.
- En un móvil o con la ventana estrecha, probá abrir y cerrar el menú, recorrer las secciones y usar el formulario.
- Desde `http://localhost:8000`, reproducí el video, comprobá el audio y verificá que el archivo multimedia no se solicite antes de reproducirlo.
- Recorré la galería, abrí las siete imágenes y comprobá que cada captura se muestra completa.
- Verificá que los botones y el formulario preparen mensajes en `wa.me` con el número de contacto configurado, sin enviarlos automáticamente.
- Comprobá que el enlace de correo use `mailto:` y abra el cliente de correo del visitante.
- Probá teclado, foco visible, zoom y la preferencia de movimiento reducido.
