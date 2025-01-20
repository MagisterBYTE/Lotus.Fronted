import { ThemeColorVariantHelper } from './ThemeColorVariantHelper';

describe('ThemeColorVariantHelper', function () 
{
  it('checkOf', function (done) 
  {
    expect(ThemeColorVariantHelper.checkOf('primaryDarkest')).toBe(true);
    expect(ThemeColorVariantHelper.checkOf('blueGreyDarkest')).toBe(true);
    expect(ThemeColorVariantHelper.checkOf('blueGreyDarkest222')).toBe(false);
    done();
  });

  it('deconstructionThemeColorVariant', function (done) 
  {
    expect(ThemeColorVariantHelper.deconstruction('primaryDarkest')).toStrictEqual({themeColor: 'primary', colorVariant:'darkest'});
    expect(ThemeColorVariantHelper.deconstruction('blueGreyDarkest')).toStrictEqual({themeColor: 'blueGrey', colorVariant:'darkest'});
    expect(ThemeColorVariantHelper.deconstruction('blueGreyDarkest222')).toBeUndefined();
    done();
  });
});
