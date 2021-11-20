import { multiDimensionalInsert, MultiDimensionalArray } from './genericUtils';

test('insert in multi dim array', () => {
  const multiDimArray: MultiDimensionalArray<number> = [
    1,
    [1, 2],
    [
      [3, 4],
      [5, 6]
    ]
  ];

  multiDimensionalInsert(7, multiDimArray, [2, 1, 1]);

  expect(multiDimArray).toStrictEqual([
    1,
    [1, 2],
    [
      [3, 4],
      [5, 7, 6]
    ]
  ]);
});
