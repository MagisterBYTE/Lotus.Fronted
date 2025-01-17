import { Color } from './Color';
import { ColorNames } from './ColorNames';
import { ColorVariantsHelper } from './ColorVariantsHelper';
import { TColorVariantIndex, TColorVariantName } from './ColorVariantsTypes';

/**
 * Интерфейс вариативности цветов
 * Вариативность цветов - совокупность цветов расположенных от самого светлого до самого темного от основного цвета.
 */
export interface IColorVariants
{
  readonly white: Color; // 1

  readonly palest: Color; // 2

  readonly pale: Color; // 3

  readonly lighter: Color; // 4

  readonly light: Color; // 5

  readonly main: Color; // 6

  readonly dark: Color; // 7

  readonly darker: Color; // 8

  readonly darkest: Color; // 9

  readonly black: Color; // 10
}

/**
 * Вариативность цветов
 */
export class ColorVariants implements IColorVariants
{
  // #region  Static methods
  public static createFromColorLightness(red: number, green: number, blue: number):ColorVariants
  {
    const main = new Color(red, green, blue);
    const white = main.increaseLightness(0.95)
    const palest = main.increaseLightness(0.87);
    const pale = main.increaseLightness(0.82);
    const lighter = main.increaseLightness(0.77);
    const light = main.increaseLightness(0.67);
    const dark = main.decreaseLightness(0.15);
    const darker = main.decreaseLightness(0.40);
    const darkest = main.decreaseLightness(0.60);
    const black = main.decreaseLightness(0.80);

    return new ColorVariants(white, palest, pale, lighter, light, main, dark, darker, darkest, black);
  }

  public static createFromColorCombine(red: number, green: number, blue: number):ColorVariants
  {
    const main = new Color(red, green, blue);
    const white =  main.combine(ColorNames['white'], 0.95);
    const palest =  main.combine(ColorNames['white'], 0.87);
    const pale =  main.combine(ColorNames['white'], 0.82);
    const lighter =  main.combine(ColorNames['white'], 0.77);
    const light =  main.combine(ColorNames['white'], 0.67);
    const dark =  main.combine(ColorNames['black'], 0.15);
    const darker =  main.combine(ColorNames['black'], 0.40);
    const darkest =  main.combine(ColorNames['black'], 0.60);
    const black =  main.combine(ColorNames['black'], 0.80);
  
    return new ColorVariants(white, palest, pale, lighter, light, main, dark, darker, darkest, black);
  }
  // #endregion

  public readonly white: Color; // 1

  public readonly palest: Color; // 2

  public readonly pale: Color; // 3

  public readonly lighter: Color; // 4

  public readonly light: Color; // 5

  public readonly main: Color; // 6

  public readonly dark: Color; // 7

  public readonly darker: Color; // 8

  public readonly darkest: Color; // 9

  public readonly black: Color; // 10

  constructor(white: Color, palest: Color, pale:Color, lighter: Color, light: Color, main: Color, dark: Color, darker: Color, darkest: Color, black: Color)
  {
    this.white = white;
    this.palest = palest;
    this.pale = pale;
    this.lighter = lighter;
    this.light = light;
    this.main = main;
    this.dark = dark;
    this.darker = darker;
    this.darkest = darkest;
    this.black = black;
    this.getByName = this.getByName.bind(this);
    this.getByIndex = this.getByIndex.bind(this);
  }

  /**
   * Получить цвет по его имени
   * @param name Именованный тип в палитре цветов 
   * @param modifyAlpha Модификация значения альфы от 0 до 1
   */
  public getByName(name?: TColorVariantName, modifyAlpha?: number):Color
  {
    if(name)
    {
      const color = this[name] as Color;
      if(modifyAlpha)
      {
        return color.toModifyAlpha(modifyAlpha);
      }
      else
      {
        return color;
      }
    }
    else
    {
      if(modifyAlpha)
      {
        return this.main.toModifyAlpha(modifyAlpha);
      }
      else
      {
        return this.main;
      }
    }
  }

  /**
   * Получить цвет по его индексу
   * @param index  Числовой индекс в палитре цветов
   * @param modifyAlpha Модификация значения альфы от 0 до 1
   */
  public getByIndex(index?: TColorVariantIndex, modifyAlpha?: number):Color
  {
    const name = ColorVariantsHelper.getNameByIndex(index);
    return this.getByName(name, modifyAlpha);
  }

  /**
   * Получить следующий цвет по его имени
   * @param name Именованный тип в палитре цветов
   * @param delta Смещение
   * @param modifyAlpha Модификация значения альфы от 0 до 1
   */
  public getNextByName(name?: TColorVariantName, delta?: number, modifyAlpha?: number):Color
  {
    const nextName = ColorVariantsHelper.getNameByIndex(ColorVariantsHelper.getNextIndex(ColorVariantsHelper.getIndexByName(name), delta));
    const color = this[nextName] as Color;
    if(modifyAlpha)
    {
      return color.toModifyAlpha(modifyAlpha);
    }
    else
    {
      return color;
    }
  }
}