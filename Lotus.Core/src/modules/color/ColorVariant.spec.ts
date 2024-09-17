
import { ColorVarianHelper } from './ColorVarianHelper';
import { TColorVariantIndexBlack, TColorVariantIndexDark, 
  TColorVariantIndexDarker, TColorVariantIndexDarkest, 
  TColorVariantIndexLight, TColorVariantIndexLighter, 
  TColorVariantIndexMain, TColorVariantIndexPale, 
  TColorVariantIndexPalest, TColorVariantIndexWhite } from './ColorVariantTypes';

describe('ColorVarianHelper', function () 
{
  it('getNameByIndex', function (done) 
  {
    expect(ColorVarianHelper.getNameByIndex(1)).toBe('white');
    expect(ColorVarianHelper.getNameByIndex(2)).toBe('palest');
    expect(ColorVarianHelper.getNameByIndex(3)).toBe('pale');
    expect(ColorVarianHelper.getNameByIndex(4)).toBe('lighter');
    expect(ColorVarianHelper.getNameByIndex(5)).toBe('light');
    expect(ColorVarianHelper.getNameByIndex(6)).toBe('main');
    expect(ColorVarianHelper.getNameByIndex(7)).toBe('dark');
    expect(ColorVarianHelper.getNameByIndex(8)).toBe('darker');
    expect(ColorVarianHelper.getNameByIndex(9)).toBe('darkest');
    expect(ColorVarianHelper.getNameByIndex(10)).toBe('black');
    done();
  });
  it('getIndexByName', function (done) 
  {
    expect(ColorVarianHelper.getIndexByName('white')).toBe(TColorVariantIndexWhite);
    expect(ColorVarianHelper.getIndexByName('palest')).toBe(TColorVariantIndexPalest);
    expect(ColorVarianHelper.getIndexByName('pale')).toBe(TColorVariantIndexPale);
    expect(ColorVarianHelper.getIndexByName('lighter')).toBe(TColorVariantIndexLighter);
    expect(ColorVarianHelper.getIndexByName('light')).toBe(TColorVariantIndexLight);
    expect(ColorVarianHelper.getIndexByName('main')).toBe(TColorVariantIndexMain);
    expect(ColorVarianHelper.getIndexByName('dark')).toBe(TColorVariantIndexDark);
    expect(ColorVarianHelper.getIndexByName('darker')).toBe(TColorVariantIndexDarker);
    expect(ColorVarianHelper.getIndexByName('darkest')).toBe(TColorVariantIndexDarkest);
    expect(ColorVarianHelper.getIndexByName('black')).toBe(TColorVariantIndexBlack);
    done();
  });

  it('getIndexByName', function (done) 
  {
    expect(ColorVarianHelper.getNextIndex(TColorVariantIndexWhite, 2)).toBe(TColorVariantIndexPale);
    expect(ColorVarianHelper.getNextIndex(TColorVariantIndexMain, 2)).toBe(TColorVariantIndexDarker);
    expect(ColorVarianHelper.getNextIndex(TColorVariantIndexDarker, 2)).toBe(TColorVariantIndexBlack);
    expect(ColorVarianHelper.getNextIndex(TColorVariantIndexDarkest, 2)).toBe(TColorVariantIndexWhite);
    expect(ColorVarianHelper.getNextIndex(TColorVariantIndexBlack, 2)).toBe(TColorVariantIndexPalest);

    expect(ColorVarianHelper.getNextIndex(TColorVariantIndexWhite, -2)).toBe(TColorVariantIndexDarkest);
    expect(ColorVarianHelper.getNextIndex(TColorVariantIndexPalest, -2)).toBe(TColorVariantIndexBlack);
    expect(ColorVarianHelper.getNextIndex(TColorVariantIndexMain, -2)).toBe(TColorVariantIndexLighter);
    expect(ColorVarianHelper.getNextIndex(TColorVariantIndexDarker, -2)).toBe(TColorVariantIndexMain);
    expect(ColorVarianHelper.getNextIndex(TColorVariantIndexDarkest, -2)).toBe(TColorVariantIndexDark);
    expect(ColorVarianHelper.getNextIndex(TColorVariantIndexBlack, -2)).toBe(TColorVariantIndexDarker);
    done();
  });
});
