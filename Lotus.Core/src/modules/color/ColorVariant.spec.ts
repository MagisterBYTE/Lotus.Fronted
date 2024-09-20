
import { ColorVariantHelper } from './ColorVariantHelper';
import { TColorVariantIndexBlack, TColorVariantIndexDark, 
  TColorVariantIndexDarker, TColorVariantIndexDarkest, 
  TColorVariantIndexLight, TColorVariantIndexLighter, 
  TColorVariantIndexMain, TColorVariantIndexPale, 
  TColorVariantIndexPalest, TColorVariantIndexWhite } from './ColorVariantTypes';

describe('ColorVarianHelper', function () 
{
  it('getNameByIndex', function (done) 
  {
    expect(ColorVariantHelper.getNameByIndex(1)).toBe('white');
    expect(ColorVariantHelper.getNameByIndex(2)).toBe('palest');
    expect(ColorVariantHelper.getNameByIndex(3)).toBe('pale');
    expect(ColorVariantHelper.getNameByIndex(4)).toBe('lighter');
    expect(ColorVariantHelper.getNameByIndex(5)).toBe('light');
    expect(ColorVariantHelper.getNameByIndex(6)).toBe('main');
    expect(ColorVariantHelper.getNameByIndex(7)).toBe('dark');
    expect(ColorVariantHelper.getNameByIndex(8)).toBe('darker');
    expect(ColorVariantHelper.getNameByIndex(9)).toBe('darkest');
    expect(ColorVariantHelper.getNameByIndex(10)).toBe('black');
    done();
  });
  it('getIndexByName', function (done) 
  {
    expect(ColorVariantHelper.getIndexByName('white')).toBe(TColorVariantIndexWhite);
    expect(ColorVariantHelper.getIndexByName('palest')).toBe(TColorVariantIndexPalest);
    expect(ColorVariantHelper.getIndexByName('pale')).toBe(TColorVariantIndexPale);
    expect(ColorVariantHelper.getIndexByName('lighter')).toBe(TColorVariantIndexLighter);
    expect(ColorVariantHelper.getIndexByName('light')).toBe(TColorVariantIndexLight);
    expect(ColorVariantHelper.getIndexByName('main')).toBe(TColorVariantIndexMain);
    expect(ColorVariantHelper.getIndexByName('dark')).toBe(TColorVariantIndexDark);
    expect(ColorVariantHelper.getIndexByName('darker')).toBe(TColorVariantIndexDarker);
    expect(ColorVariantHelper.getIndexByName('darkest')).toBe(TColorVariantIndexDarkest);
    expect(ColorVariantHelper.getIndexByName('black')).toBe(TColorVariantIndexBlack);
    done();
  });

  it('getIndexByName', function (done) 
  {
    expect(ColorVariantHelper.getNextIndex(TColorVariantIndexWhite, 2)).toBe(TColorVariantIndexPale);
    expect(ColorVariantHelper.getNextIndex(TColorVariantIndexMain, 2)).toBe(TColorVariantIndexDarker);
    expect(ColorVariantHelper.getNextIndex(TColorVariantIndexDarker, 2)).toBe(TColorVariantIndexBlack);
    expect(ColorVariantHelper.getNextIndex(TColorVariantIndexDarkest, 2)).toBe(TColorVariantIndexWhite);
    expect(ColorVariantHelper.getNextIndex(TColorVariantIndexBlack, 2)).toBe(TColorVariantIndexPalest);

    expect(ColorVariantHelper.getNextIndex(TColorVariantIndexWhite, -2)).toBe(TColorVariantIndexDarkest);
    expect(ColorVariantHelper.getNextIndex(TColorVariantIndexPalest, -2)).toBe(TColorVariantIndexBlack);
    expect(ColorVariantHelper.getNextIndex(TColorVariantIndexMain, -2)).toBe(TColorVariantIndexLighter);
    expect(ColorVariantHelper.getNextIndex(TColorVariantIndexDarker, -2)).toBe(TColorVariantIndexMain);
    expect(ColorVariantHelper.getNextIndex(TColorVariantIndexDarkest, -2)).toBe(TColorVariantIndexDark);
    expect(ColorVariantHelper.getNextIndex(TColorVariantIndexBlack, -2)).toBe(TColorVariantIndexDarker);
    done();
  });
});
