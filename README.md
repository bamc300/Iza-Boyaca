# Iza Boyaca

.

## Introduction

Este proyecto está destinado a cumplir dos objetivos principales: el primero es un sitio web genérico, receptivo y con un estilo completo para usar como punto de partida para su propio desarrollo de Apostrophe. El segundo es una demostración de una compilación de Apostrophe lista para producción con todas las funciones: una serie de widgets (simples y complejos), redes de contenido relacionado (piezas), taxonomía de contenido personalizado, importación de piezas, mapas, configuración avanzada de Apostrophe, etc. mientras organizamos el código de la forma en que nosotros, los mantenedores de ApostropheCMS, lo hacemos en producción.

## Iniciando

Necesita [configurar su entorno] (https://apostrophecms.org/docs/tutorials/getting-started/setting-up-your-environment.html) con las necesidades para desarrollar con Apostrophe.

Correrlo:

```
git clone https://github.com/bamc300/Iza-Boyaca.git
cd apostrophe-open-museum
npm install
node app apostrophe-users:add admin admin
[eIngresar contraseña del administrador]
node app
```

Ahora debería poder acceder al sitio en: [http: // localhost: 3000] (http: // localhost: 3000) e iniciar sesión para comenzar a editar visitando [/ login] (http: // localhost: 3000 /acceso).

Consulte los [tutoriales de Apostrophe] (https://apostrophecms.org/docs/tutorials/getting-started/index.html) para obtener más información.

## Solicitud de comentarios

Actualmente estamos buscando comentarios sobre lo que haría que esta sea una demostración más útil y un repositorio más amigable para aquellos que recién comienzan con Apostrophe.

Algunas cosas que estamos tratando de lograr:
- Mantenibilidad y legibilidad
- organización
- Nomenclatura clara
- Alcanzando un punto ideal entre amigable para principiantes e instructivo para intermedios.

Algunas cosas que intentamos evitar:
- Herramientas de desarrollo excesivas que no son específicas de Apostrophe
- Estilo de codificación inconsistente
- Prácticas que no seguiríamos en los proyectos de nuestros propios clientes

## Descripción general del alcance

Este sitio de demostración está diseñado para ilustrar las necesidades básicas del sitio web de un museo de arte. Además del concepto de páginas, incluye los siguientes tipos de contenido:

- Tienda
- Productos
- Tipo de producto ("Postre", "Artesania", etc.)
- Ubicaciones
- Miembros del personal del municipio
- Articulos (Blog)
- Eventos

Las relaciones entre los tipos de contenido se ven así:

```

                               +---------------+
                               |               |
                               |               |
         +--------------------->    Tienda     |
         |                     |               |
         |                     |               |
         |                     +--+---------+--+
         |                        |         |
         |                        |         |
         v                        v         v
   
+----------------+   +---------------+   +--------------+    +--------------+
|                |   |               |   |              |    |              |
|                |   |               |   |              |    |              |
|Tipo de producto|   |   Ubicaciones |   |   Producto   |    |     Blog     |
|                |   |               |   |              |    |              |
|                |   |               |   |              |    |              |
+----------------+   +---------------+   +--------------+    +--------------+

                                 ^
                                 |
                     +-----------+---+   +----------------+
                     |               |   |                |
                     |               |   |                |
                     |    Eventos    |   |   Miembros     |
                     |               |   |                |
                     |               |   |                |
                     +---------------+   +----------------+

```

Estas relaciones se representan con Apostrophe [uniones] (https://apostrophecms.org/docs/tutorials/getting-started/schema-guide.html#code-join-by-array-code) entre tipos de piezas.

Junto con los tipos de piezas preconfigurados, este proyecto también incluye una variedad de widgets que puede usar para ilustrar su contenido en las páginas. Estos van desde varias formas de mostrar imágenes, hasta características y marquesinas, extractos de piezas existentes y widgets de diseño que le permiten anidar widgets dentro de otros widgets.

## Detalles técnicos

### Activos de front-end
Todo el CSS de origen está escrito en LESS, que es el preprocesador de CSS incluido con Apostrophe. Todo el CSS de origen reside en `/ lib / modules / apostrophe-assets / public / css` y está organizado de acuerdo con el [método ITCSS] (https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture /). Tenga en cuenta que también puede usar Webpack y SASS en su propio proyecto, siempre que genere un archivo CSS como salida y lo envíe a Apostrophe como un activo.

#### Excepciones
Los módulos `apostrophe-widgets` que requieren que JS front-end se ejecute cada vez que el módulo se 'prepara' (se carga por primera vez, cambia) tienen un 'reproductor' que Apostrophe espera encontrar en el módulo` / public / js / always.js` archivo por defecto. El widget de presentación de diapositivas es un buen ejemplo de esto `/ lib / modules / slideshow-widgets`. Para obtener más información sobre este patrón, consulte [agregar un reproductor de widgets de JavaScript en el lado del navegador] (https://apostrophecms.org/docs/tutorials/getting-started/custom-widgets.html#adding-a-java-script-widget- jugador en el lado del navegador)

### API de MapQuest + tipo de pieza de ubicaciones
Este sitio tiene widgets de mapas incorporados y funcionalidad de codificación geográfica para su tipo de pieza de "ubicaciones". Ejecuta ambas operaciones a través de la API gratuita de MapQuest. [Puede registrar una clave y un secreto aquí] (https://developer.mapquest.com/plan_purchase/steps/business_edition/business_edition_free/register).

> No es necesario que ingrese una "URL de devolución de llamada" al registrarse y generar su clave API. Deja ese campo en blanco.

#### Configuración de MapQuest
Este sitio espera que la clave y el secreto de MapQuest formen parte del objeto `options` para el tipo de pieza` locations`. Este repositorio no viene con una clave y un secreto, por lo que verá advertencias de la consola del cliente y del servidor cuando haga cosas que las requieran.

Puede agregar su clave y secreto de esta manera:

En `/ app.js`

''

const apos = require ('apóstrofo') ({
  shortName: 'apostrophe-open-museum',
  módulos: {
    // ... otras configuraciones de módulo
    'ubicaciones': {
      'mapQuest': {
        clave: 'xxxxxxxx',
        secreto: 'yyyyyyy'
      }
    }
  };
''

También puede colocar una configuración como esta en el propio archivo index.js del módulo, es decir, `lib / modules / ubicaciones / index.js`

** No debe poner las credenciales de API en repositorios públicos. ** [Esta guía ilustra la creación de configuraciones de módulo específicas del entorno] (https://apostrophecms.org/docs/tutorials/getting-started/settings.html#changing-the- value-for-a-specific-server-only) sin agregarlos a su repositorio.

### Uso de tipos de piezas como taxonomía

En la mayoría de los casos de uso de "piezas de apóstrofe", el desarrollador desea poder aprovechar la visualización en pantalla de ese contenido. Por ejemplo, cuando tiene un blog, espera que haya páginas que representen publicaciones de blog y widgets que muestren extractos de esas publicaciones. También esperaría una "página de blog" que muestre todas las publicaciones, con la capacidad de usar paginatio o desplazamiento infinito para llegar al contenido más antiguo.

Pero las piezas tienen otras aplicaciones. También puede utilizar "metapiezas" para crear una taxonomía de las piezas visualizadas. En esta demostración, el tipo de pieza `categorías-tipos de objetos` es una" meta pieza "que no se representa en la pantalla, sino que se une a las` obras de arte` para ayudar a categorizarlas.

El beneficio de hacer este tipo de categorización como una pieza en lugar de una etiqueta es que el conjunto de categorías no se contamina por el panorama global de etiquetas, y solo aquellos con permiso para editar las categorías pueden cambiar la lista de posibilidades. También obtiene la interfaz de administrador familiar para administrar sus meta piezas.

[Al igual que con las etiquetas, obtienes un filtrado integrado de tus combinaciones con alguna configuración adicional] (https://apostrophecms.org/docs/tutorials/intermediate/cursors.html#filtering-joins-browsing-profiles-by-market) .

Un ejemplo completo de esto se ilustra en el esquema de `artwork` / lib / modules / artwork / index.js`