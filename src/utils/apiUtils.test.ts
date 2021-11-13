import {
  ApiRootStructure,
  getApiFieldData,
  parseApiResponseRootStructure
} from './apiUtils';

const emptyRoot: ApiRootStructure = {
  isArray: false,
  children: []
};

test('it should parse empty and raw data response', () => {
  expect(parseApiResponseRootStructure(undefined)).toStrictEqual(emptyRoot);
  expect(parseApiResponseRootStructure(null)).toStrictEqual(emptyRoot);
  expect(parseApiResponseRootStructure(0)).toStrictEqual(emptyRoot);
  expect(parseApiResponseRootStructure(5)).toStrictEqual(emptyRoot);
  expect(parseApiResponseRootStructure(true)).toStrictEqual(emptyRoot);
  expect(parseApiResponseRootStructure(false)).toStrictEqual(emptyRoot);
  expect(parseApiResponseRootStructure('')).toStrictEqual(emptyRoot);
  expect(parseApiResponseRootStructure('a raw string')).toStrictEqual(
    emptyRoot
  );
  expect(parseApiResponseRootStructure({})).toStrictEqual(emptyRoot);
});

const emptyArrayRoot: ApiRootStructure = {
  isArray: true,
  children: []
};

test('it should parse empty and raw array response', () => {
  expect(parseApiResponseRootStructure([])).toStrictEqual(emptyArrayRoot);
  expect(parseApiResponseRootStructure([[]])).toStrictEqual(emptyArrayRoot);
  expect(parseApiResponseRootStructure([[[]]])).toStrictEqual(emptyArrayRoot);
  expect(parseApiResponseRootStructure(['A', 'B'])).toStrictEqual(
    emptyArrayRoot
  );
  expect(parseApiResponseRootStructure([{}])).toStrictEqual(emptyArrayRoot);
  expect(parseApiResponseRootStructure([{}, {}])).toStrictEqual(emptyArrayRoot);
});

test('it should parse simple object response', () => {
  const apiRoot = parseApiResponseRootStructure({
    key1: 'value1',
    key2: 'value2'
  });
  expect(apiRoot.isArray).toStrictEqual(false);
  expect(apiRoot.children.length).toStrictEqual(2);
  expect(apiRoot.children[0]).toMatchObject({
    key: 'key1',
    children: [],
    isArray: false,
    parents: []
  });
  expect(apiRoot.children[1]).toMatchObject({
    key: 'key2',
    children: [],
    isArray: false,
    parents: []
  });
});

test('it should parse simple array response', () => {
  const apiRoot = parseApiResponseRootStructure([
    {
      key1: 'value1',
      key2: 'value2'
    },
    {
      key1: 'value1',
      key2: 'value2'
    }
  ]);
  expect(apiRoot.isArray).toStrictEqual(true);
  expect(apiRoot.children.length).toStrictEqual(2);
  expect(apiRoot.children[0]).toMatchObject({
    key: 'key1',
    children: [],
    isArray: false,
    parents: []
  });
  expect(apiRoot.children[1]).toMatchObject({
    key: 'key2',
    children: [],
    isArray: false,
    parents: []
  });
});

test('it should parse nested object response', () => {
  const resData = {
    key1: { nestedKey1: 'value1' }
  };
  const apiRoot = parseApiResponseRootStructure(resData);
  expect(apiRoot.isArray).toStrictEqual(false);
  expect(apiRoot.children.length).toStrictEqual(1);
  expect(apiRoot.children[0]).toMatchObject({
    key: 'key1',
    isArray: false,
    parents: []
  });
  expect(apiRoot.children[0].children[0]).toMatchObject({
    key: 'nestedKey1',
    isArray: false,
    children: []
  });
  expect(apiRoot.children[0].children[0].path[0]).toMatchObject({
    key: 'key1',
    isArray: false,
    parents: []
  });
  expect(
    getApiFieldData(resData, apiRoot.children[0].children[0], 0)
  ).toStrictEqual('value1');
});
