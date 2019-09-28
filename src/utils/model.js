export default [
  {
    id: 'water',
    isActive: true,
    text: 'Водяные сети',
    color: 'blue',
    lines: {
      linewater1: [
        {
          id: 'water1',
          lineId: 'linewater1',
          layerId: 'water',
          lat: 51.54355876453761,
          lng: 46.01014137268067,
          info: {
            status: 'warning',
            name: 'Название элемента',
            date: Date.now(),
            stat: 'Наземный',
            type: 'Наземный',
            category: 'Категория',
            bandwidth: 43434,
            forecast: 'Прогноз',
            fotos: [],
            risk: 3434,
            history: [
              {
                date: Date.now(),
                text: 'Ввод в эксплуатацию',
                performer: 'Теплосети'
              }
            ]
          }
        },
        {
          id: 'water2',
          lineId: 'linewater1',
          layerId: 'water',
          lat: 51.529357812115485,
          lng: 46.03966712951661,
          info: {
            status: 'success',
            name: 'Название элемента',
            date: Date.now(),
            stat: 'Наземный',
            type: 'Наземный',
            category: 'Категория',
            bandWidth: 43434,
            forecast: 'Прогноз',
            fotos: [],
            risk: 3434,
            history: [
              {
                date: Date.now(),
                text: 'Ввод в эксплуатацию',
                performer: 'Теплосети'
              }
            ]
          }
        },
        {
          id: 'water3',
          lineId: 'linewater1',
          layerId: 'water',
          lat: 51.53373482374044,
          lng: 46.05949401855469,
          info: {
            status: 'danger',
            name: 'Название элемента',
            date: Date.now(),
            stat: 'Наземный',
            type: 'Наземный',
            category: 'Категория',
            bandwidth: 43434,
            forecast: 'Прогноз',
            fotos: [],
            risk: 3434,
            history: [
              {
                date: Date.now(),
                text: 'Ввод в эксплуатацию',
                performer: 'Теплосети'
              }
            ]
          }
        },
      ],
    }
  },

  {
    id: 'gaz',
    isActive: false,
    text: 'Газовые сети',
    color: 'green',
    lines: {},
  },

  {
    id: 'electricity',
    isActive: false,
    text: 'Электрические сети',
    color: 'yellow',
    lines: {},
  },

  {
    id: 'warm',
    isActive: false,
    text: 'Тепловые сети',
    color: 'red',
    lines: {},
  }
];