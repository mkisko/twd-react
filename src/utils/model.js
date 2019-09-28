export default [
  {
    id: 'water',
    isActive: true,
    text: 'Водяные сети',
    color: 'green',
    lines: {
      linewater1: [
        {
          id: 'water1',
          lat: 51.54355876453761,
          lng: 46.01014137268067,
          info: {}
        },
        {
          id: 'water2',
          lat: 51.529357812115485,
          lng: 46.03966712951661,
          info: {}
        },
        {
          id: 'water3',
          lat: 51.53373482374044,
          lng: 46.05949401855469,
          info: {}
        },
      ],
    }
  },

  {
    id: 'gaz',
    isActive: false,
    text: 'Газовые сети',
    color: 'red',
    lines: {
      linegaz1: [
        {
          id: 'gaz1',
          lat: 51.51547289974896,
          lng: 46.01048469543458,
          info: {}
        },
        {
          id: 'gaz2',
          lat: 51.55220535165942,
          lng: 46.0254192352295,
          info: {}
        }
      ],
    }
  }
];