import { base64UriToObj, objToUriBase64 } from './base64Utils';

test('obj to base64', () => {
  const obj = {
    prop1: 'value1',
    prop2: 'value2',
    prop3: [1, 2, 3]
  };
  const base64 = objToUriBase64(obj);

  expect(base64).toStrictEqual(
    'eyJwcm9wMSI6InZhbHVlMSIsInByb3AyIjoidmFsdWUyIiwicHJvcDMiOlsxLDIsM119'
  );
});

test('base64 to obj', () => {
  const base64 =
    'eyJwcm9wMSI6InZhbHVlMSIsInByb3AyIjoidmFsdWUyIiwicHJvcDMiOlsxLDIsM119';

  const obj = base64UriToObj(base64);

  expect(obj).toStrictEqual({
    prop1: 'value1',
    prop2: 'value2',
    prop3: [1, 2, 3]
  });
});
