const areas = require('../helpers/lib/areas.js');
const _ = require('lodash');

module.exports = {
  name: 'artist',
  label: 'Artist',
  pluralLabel: 'Artists',
  contextual: true,
  sort: {
    title: 1
  },
  addFields: [
    {
      name: 'description',
      label: 'Descripcion',
      help: 'This is displayed at the bottom of an Artwork show page that this artist is associated with',
      type: 'string',
      textarea: true
    },
    {
      name: 'thumbnail',
      label: 'Foto',
      type: 'singleton',
      widgetType: 'apostrophe-images',
      options: {
        limit: 1,
        aspectRatio: [ 1, 1 ]
      }
    },
    {
      name: 'nationality',
      label: 'Precio',
      type: 'float'
    },
    {
      name: 'body',
      label: 'Body',
      contextual: true,
      type: 'area',
      options: {
        widgets: _.clone(areas.narrowWidgets)
      }
    },
    {
      name: 'extra',
      label: 'Extra',
      contextual: true,
      type: 'area',
      options: {
        widgets: _.clone(areas.baseWidgets)
      }
    },
    {
      // Access to all the works of this artist — but for performance,
      // only fetch them if we are fetching just one artist
      name: '_artworks',
      label: 'Artworks',
      type: 'joinByOneReverse',
      withType: 'artwork',
      idField: 'artistId',
      ifOnlyOne: true
    }
  ],
  arrangeFields: [
    {
      name: 'main',
      label: 'Main content',
      fields: [
        'description',
        'thumbnail',
        'lifetime',
        'nationality',
        'movement'
      ]
    }
  ]
};
