import { ObjectHelper } from './ObjectHelper';

describe('test ObjectHelper.getIf', () => 
{
  it('getIf', () => 
  {
    expect(ObjectHelper.getIf(null, 'True', 'False')).toEqual('False');
    expect(ObjectHelper.getIf(undefined, 'True', 'False')).toEqual('False');
    expect(ObjectHelper.getIf(false, 'True', 'False')).toEqual('False');
    expect(ObjectHelper.getIf('', 'True', 'False')).toEqual('False');
    expect(ObjectHelper.getIf(0, 'True', 'False')).toEqual('False');
  });

  it('getIfFun', () => 
  {
    expect(ObjectHelper.getIfFun('', () =>{return 'А'}, () =>{return 'Б'})).toEqual('Б');
  });
});

test('works with a shallow object', () => 
{
  expect(ObjectHelper.getValueByPropertyPath({ param: 1 }, 'param')).toBe(1);
});

test('works with a shallow array', () => 
{
  expect(ObjectHelper.getValueByPropertyPath([1, 2, 3], '[2]')).toBe(3);
});

test('works with a shallow array when shouldThrow is true', () => 
{
  expect(ObjectHelper.getValueByPropertyPath([1, 2, 3], '[2]', true)).toBe(3);
});

test('works with a nested object', () => 
{
  const source = { param: [{}, { test: 'A' }] };
  expect(ObjectHelper.getValueByPropertyPath(source, 'param[1].test')).toBe('A');
});

test('returns undefined when source is null', () => 
{
  expect(ObjectHelper.getValueByPropertyPath(null, 'param[1].test')).toBeUndefined();
});

test('returns undefined when path is wrong', () => 
{
  expect(ObjectHelper.getValueByPropertyPath({ param: [] }, 'param[1].test')).toBeUndefined();
});

test('throws an exception when path is wrong and shouldThrow is true', () => 
{
  expect(() => ObjectHelper.getValueByPropertyPath({ param: [] }, 'param[1].test', true)).toThrow();
});

test('works transparently with Sets and Maps', () => 
{
  const source = new Map([
    ['param', new Set()],
    ['innerSet', new Set([new Map(), new Map([['innerKey', 'value']])])]
  ]);
  expect(ObjectHelper.getValueByPropertyPath(source, 'innerSet[1].innerKey')).toBe('value');
});
