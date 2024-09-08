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
