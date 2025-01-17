
import { ColorVariantsHelper } from './ColorVariantsHelper';
import { TColorVariantIndexBlack, TColorVariantIndexDark, 
  TColorVariantIndexDarker, TColorVariantIndexDarkest, 
  TColorVariantIndexLight, TColorVariantIndexLighter, 
  TColorVariantIndexMain, TColorVariantIndexPale, 
  TColorVariantIndexPalest, TColorVariantIndexWhite } from './ColorVariantsTypes';

describe('ColorVarianHelper', function () 
{
  it('getNameByIndex', function (done) 
  {
    expect(ColorVariantsHelper.getNameByIndex(1)).toBe('white');
    expect(ColorVariantsHelper.getNameByIndex(2)).toBe('palest');
    expect(ColorVariantsHelper.getNameByIndex(3)).toBe('pale');
    expect(ColorVariantsHelper.getNameByIndex(4)).toBe('lighter');
    expect(ColorVariantsHelper.getNameByIndex(5)).toBe('light');
    expect(ColorVariantsHelper.getNameByIndex(6)).toBe('main');
    expect(ColorVariantsHelper.getNameByIndex(7)).toBe('dark');
    expect(ColorVariantsHelper.getNameByIndex(8)).toBe('darker');
    expect(ColorVariantsHelper.getNameByIndex(9)).toBe('darkest');
    expect(ColorVariantsHelper.getNameByIndex(10)).toBe('black');
    done();
  });
  it('getIndexByName', function (done) 
  {
    expect(ColorVariantsHelper.getIndexByName('white')).toBe(TColorVariantIndexWhite);
    expect(ColorVariantsHelper.getIndexByName('palest')).toBe(TColorVariantIndexPalest);
    expect(ColorVariantsHelper.getIndexByName('pale')).toBe(TColorVariantIndexPale);
    expect(ColorVariantsHelper.getIndexByName('lighter')).toBe(TColorVariantIndexLighter);
    expect(ColorVariantsHelper.getIndexByName('light')).toBe(TColorVariantIndexLight);
    expect(ColorVariantsHelper.getIndexByName('main')).toBe(TColorVariantIndexMain);
    expect(ColorVariantsHelper.getIndexByName('dark')).toBe(TColorVariantIndexDark);
    expect(ColorVariantsHelper.getIndexByName('darker')).toBe(TColorVariantIndexDarker);
    expect(ColorVariantsHelper.getIndexByName('darkest')).toBe(TColorVariantIndexDarkest);
    expect(ColorVariantsHelper.getIndexByName('black')).toBe(TColorVariantIndexBlack);
    done();
  });

  it('getIndexByName', function (done) 
  {
    expect(ColorVariantsHelper.getNextIndex(TColorVariantIndexWhite, 2)).toBe(TColorVariantIndexPale);
    expect(ColorVariantsHelper.getNextIndex(TColorVariantIndexMain, 2)).toBe(TColorVariantIndexDarker);
    expect(ColorVariantsHelper.getNextIndex(TColorVariantIndexDarker, 2)).toBe(TColorVariantIndexBlack);
    expect(ColorVariantsHelper.getNextIndex(TColorVariantIndexDarkest, 2)).toBe(TColorVariantIndexWhite);
    expect(ColorVariantsHelper.getNextIndex(TColorVariantIndexBlack, 2)).toBe(TColorVariantIndexPalest);

    expect(ColorVariantsHelper.getNextIndex(TColorVariantIndexWhite, -2)).toBe(TColorVariantIndexDarkest);
    expect(ColorVariantsHelper.getNextIndex(TColorVariantIndexPalest, -2)).toBe(TColorVariantIndexBlack);
    expect(ColorVariantsHelper.getNextIndex(TColorVariantIndexMain, -2)).toBe(TColorVariantIndexLighter);
    expect(ColorVariantsHelper.getNextIndex(TColorVariantIndexDarker, -2)).toBe(TColorVariantIndexMain);
    expect(ColorVariantsHelper.getNextIndex(TColorVariantIndexDarkest, -2)).toBe(TColorVariantIndexDark);
    expect(ColorVariantsHelper.getNextIndex(TColorVariantIndexBlack, -2)).toBe(TColorVariantIndexDarker);
    done();
  });
});
