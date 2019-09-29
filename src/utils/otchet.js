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
        lifetime: 56,
        social: 54,
        objects: 34,
        period: 12,
        cat: 'Водоснабжение',
        long: '20 км',
        nodes: 324,
        width: '46666',
        cost: '1234543 руб'
      },
      {
        start: [51.54532088274009, 46.0283374786377],
        end: [51.53838125126607, 46.02438926696777],
        budget: 10,
        lifetime: 21,
        social: 23,
        objects: 64,
        period: 56,
        cat: 'Водоснабжение',
        long: '10 км',
        nodes: '324',
        width: '46666',
        cost: '1234543 руб'
      },
      {
        start: [51.53838125126607, 46.02438926696777],
        end: [51.53453730768712, 46.03211402893067],
        budget: 67,
        lifetime: 43,
        social: 89,
        objects: 12,
        period: 78,
        cat: 'Водоснабжение',
        long: '10 км',
        nodes: '324',
        width: '46666',
        cost: '1234543 руб'
      },
      {
        start: [51.53453730768712, 46.03211402893067],
        end: [51.52775622697431, 46.02773666381836],
        budget: 89,
        lifetime: 34,
        social: 78,
        objects: 29,
        period: 46,
        cat: 'Водоснабжение',
        long: '10 км',
        nodes: '324',
        width: '46666',
        cost: '1234543 руб'
      },
      {
        start: [51.52775622697431, 46.02773666381836],
        end: [51.52925135518991, 46.0191535949707],
        budget: 60,
        lifetime: 46,
        social: 45,
        objects: 67,
        period: 24,
        cat: 'Водоснабжение',
        long: '70 км',
        nodes: '324',
        width: '46666',
        cost: '1234543 руб'
      },
      {
        start: [51.52925135518991, 46.0191535949707],
        end: [51.52380458033574, 46.015548706054695],
        budget: 48,
        lifetime: 12,
        social: 67,
        objects: 23,
        period: 79,
        cat: 'Водоснабжение',
        long: '70 км',
        nodes: '324',
        width: '46666',
        cost: '1234543 руб'
      },
      {
        start: [51.52380458033574, 46.015548706054695],
        end: [51.518410563197584, 46.01511955261231],
        budget: 67,
        lifetime: 56,
        social: 84,
        objects: 84,
        period: 10,
        cat: 'Водоснабжение',
        long: '50 км',
        nodes: '324',
        width: '46666',
        cost: '1234543 руб'
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