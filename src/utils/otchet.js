export default [
  {
    id: 'budget',
    text: 'Бюджет (тыс.рублей)'
  },

  {
    id: 'lifetime',
    text: 'Срок службы (мес)'
  },

  {
    id: 'social',
    text: 'Социальная значимость (тыс.чел)'
  },

  {
    id: 'objects',
    text: 'Объекты'
  },

  {
    id: 'period',
    text: 'Срок строительства (мес)'
  },
]

export const layers = [
  {
    id: 'water',
    isActive: true,
    text: 'Водяные сети',
    color: 'blue',
    lines: [
      {
        start: [51.55610190273931, 46.01820945739747
        ],
        end: [51.54532088274009, 46.0283374786377],
        budget: 20,
        lifetime: 560,
        social: 5467,
        objects: 34,
        period: 12
      },
      {
        start: [51.54532088274009, 46.0283374786377],
        end: [51.53838125126607, 46.02438926696777],
        budget: 100,
        lifetime: 215,
        social: 2367,
        objects: 64,
        period: 56
      },
      {
        start: [51.53838125126607, 46.02438926696777],
        end: [51.53453730768712, 46.03211402893067],
        budget: 678,
        lifetime: 435,
        social: 8904,
        objects: 12,
        period: 78
      },
      {
        start: [51.53453730768712, 46.03211402893067],
        end: [51.52775622697431, 46.02773666381836],
        budget: 897,
        lifetime: 34,
        social: 7899,
        objects: 29,
        period: 46
      },
      {
        start: [51.52775622697431, 46.02773666381836],
        end: [51.52925135518991, 46.0191535949707],
        budget: 60,
        lifetime: 46,
        social: 4563,
        objects: 67,
        period: 24
      },
      {
        start: [51.52925135518991, 46.0191535949707],
        end: [51.52380458033574, 46.015548706054695],
        budget: 486,
        lifetime: 12,
        social: 6754,
        objects: 23,
        period: 79
      },
      {
        start: [51.52380458033574, 46.015548706054695],
        end: [51.518410563197584, 46.01511955261231],
        budget: 673,
        lifetime: 564,
        social: 8453,
        objects: 84,
        period: 100
      },
    ]
  },

  {
    id: 'gaz',
    isActive: false,
    text: 'Газовые сети',
    color: 'green',
    lines: []
  },

  {
    id: 'electricity',
    isActive: false,
    text: 'Электрические сети',
    color: 'yellow',
    lines: []
  },

  {
    id: 'warm',
    isActive: false,
    text: 'Тепловые сети',
    color: 'red',
    lines: []
  }
];