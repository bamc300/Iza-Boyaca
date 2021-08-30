// This configures the apostrophe-pages module to add a "home" page type to the
// pages menu

module.exports = {
  filters: {
    // Grab our ancestor pages, with two levels of subpages
    ancestors: {
      children: {
        depth: 2
      }
    },
    // We usually want children of the current page, too
    children: true
  },
  park: [
    {
      title: 'Buscar',
      slug: '/search',
      type: 'apostrophe-search',
      label: 'Buscar',
      published: true
    }
  ],
  types: [
    {
      name: 'home',
      label: 'Pagina Secundaria'
    },
    {
      name: 'default',
      label: 'Pagina principal'
    },
    {
      name: 'styleguide',
      label: 'Guia de estilos'
    },
    {
      label: 'Pagina de ventas',
      name: 'artwork-pages'
    },
    {
      label: 'Pagina de productos',
      name: 'artist-pages'
    },
    {
      label: 'Pagina de vendedores',
      name: 'people-pages'
    },
    {
      label: 'Pagina de ubicacion',
      name: 'location-pages'
    },
    {
      label: 'Pagina de blog',
      name: 'article-pages'
    },
    {
      label: 'Pagina de eventos',
      name: 'event-pages'
    }

    // Add more page types here, but make sure you create a corresponding
    // template in lib/modules/apostrophe-pages/views/pages! An exception:
    // "pieces pages" like `event-pages` are rendered via the `views/index.html`
    // and `views/show.html` templates of those modules.
  ]
};
