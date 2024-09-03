
import { CssPropertiesHelper } from './CssPropertiesHelper';

describe('.toStr', function () 
{
  it('toStr', function (done) 
  {
    expect(CssPropertiesHelper.toStr({})).toBe('');
    done();
  });
});