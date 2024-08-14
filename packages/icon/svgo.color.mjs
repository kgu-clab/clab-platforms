export default {
  plugins: [
    'preset-default',
    'removeDimensions',
    'sortAttrs',
    'cleanupListOfValues',
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [
          {
            width: '1em',
            height: '1em',
            'aria-hidden': 'true',
            'data-slot': 'icon',
          },
        ],
      },
    },
  ],
};
