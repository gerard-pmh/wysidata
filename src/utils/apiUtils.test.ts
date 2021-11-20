import { extractValuesFromRoot } from './apiUtils';

test('extract values', () => {
  expect(
    extractValuesFromRoot({
      a: [1, 2],
      b: 3
    })
  ).toStrictEqual({
    a: [1, 2],
    b: 3
  });

  expect(
    extractValuesFromRoot({
      a: [
        {
          b: [1, 2],
          c: 6
        },
        {
          b: [3, 4, 5],
          c: 7
        }
      ]
    })
  ).toStrictEqual({
    'a.b': [
      [1, 2],
      [3, 4, 5]
    ],
    'a.c': [6, 7]
  });

  expect(
    extractValuesFromRoot({
      a: [
        {
          b: [
            {
              c: [1, 2]
            },
            {
              c: [3, 4]
            }
          ]
        },
        {
          b: [
            {
              c: [5, 6]
            },
            {
              c: [7, 8]
            }
          ]
        }
      ]
    })
  ).toStrictEqual({
    'a.b.c': [
      [
        [1, 2],
        [3, 4]
      ],
      [
        [5, 6],
        [7, 8]
      ]
    ]
  });
});
