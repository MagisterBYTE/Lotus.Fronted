import { TColorVariantIndex, TColorVariantName, TColorVariantNames, TColorVariantIndexMain, TColorVariantIndexBlack, TColorVariantIndexWhite } from './ColorVariantTypes';

export class ColorVariantHelper
{
  /**
   * Получить цвет по его индексу
   * @param index Числовой индекс в палитре цветов
   * @returns Именованный тип в палитре цветов 
   */
  public static getNameByIndex(index?: TColorVariantIndex): TColorVariantName
  {
    return TColorVariantNames[(index ?? TColorVariantIndexMain) - 1]
  }

  /**
   * Получить индексу по имени цвета 
   * @param name Именованный тип в палитре цветов 
   * @returns Числовой индекс в палитре цветов
   */
  public static getIndexByName(name?: TColorVariantName): TColorVariantIndex
  {
    if (name)
    {
      const index = TColorVariantNames.findIndex((x => x === name));
      return (index + 1) as TColorVariantIndex;
    }
    return TColorVariantIndexMain;
  }

  /**
   * Получить индекс смещенный на определенную величину
   * @param index Числовой индекс в палитре цветов
   * @param delta Смещение
   * @returns Числовой индекс в палитре цветов
   */
  public static getNextIndex(index?: TColorVariantIndex, delta?: number): TColorVariantIndex
  {
    const next = (index ?? TColorVariantIndexMain) + (delta ?? 0);
    if (next > TColorVariantIndexBlack)
    {
      return (next % TColorVariantIndexBlack) as TColorVariantIndex;
    }
    else
    {
      if (next < TColorVariantIndexWhite)
      {
        return (next + TColorVariantIndexBlack) as TColorVariantIndex;
      }
      else
      {
        return next as TColorVariantIndex;
      }
    }
  }
}