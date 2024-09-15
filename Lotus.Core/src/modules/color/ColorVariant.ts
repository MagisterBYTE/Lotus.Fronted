import { Color } from './Color';
import { ColorVarianHelper } from './ColorVarianHelper';
import { TColorVariantIndex, TColorVariantName } from './ColorVariantTypes';

/**
 * Интерфейс вариативности цветов
 * Вариативность цветов - совокупность цветов расположенных от самого светлого до самого темного от основного цвета.
 */
export interface IColorVariant
{
  readonly white: Color; // 1

  readonly palest: Color; // 2

  readonly lighter: Color; // 3

  readonly light: Color; // 4

  readonly main: Color; // 5

  readonly dark: Color; // 6

  readonly darker: Color; // 7

  readonly darkest: Color; // 8

  readonly black: Color; // 9
}

/**
 * Вариативность цветов
 */
export class ColorVariant implements IColorVariant
{
  public readonly white: Color; // 1

  public readonly palest: Color; // 2

  public readonly lighter: Color; // 3

  public readonly light: Color; // 4

  public readonly main: Color; // 5

  public readonly dark: Color; // 6

  public readonly darker: Color; // 7

  public readonly darkest: Color; // 8

  public readonly black: Color; // 9

  constructor(white: Color, palest: Color, lighter: Color, light: Color, main: Color, dark: Color, darker: Color, darkest: Color, black: Color)
  {
    this.white = white;
    this.palest = palest;
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
    const name = ColorVarianHelper.getNameByIndex(index);
    return this.getByName(name, modifyAlpha);
  }
}