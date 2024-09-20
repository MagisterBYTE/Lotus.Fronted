import { Color, EnumHelper, TColorVariantName } from 'lotus-core';
import { IThemePalette } from 'ui/theme';
import { TInteractivityEffect } from './InteractivityEffect';

type TCalcColor = boolean | TColorVariantName | Color | 'text' | 'border';

/**
 * Параметры применения визуальных эффектов к структурной части элемента UI
 */
export interface IInteractivityParams
{
  /**
   * Набор визуальных эффектов которые применяются к структурной части элемента UI
   */
  effect?: TInteractivityEffect;

  /**
   * Брать цвет согласно данным или вычислять
   */
  calcColor?: TCalcColor;

  /**
   * Следует ли очищать цвет если он не применяется
   */
  clearColor?: boolean;

  /**
   * Итоговая модификация альфа значения
   */
  modifyAlpha?: number;
}

export class InteractivityParams implements IInteractivityParams
{
  // #region Static fields
  /**
   * Отсутствие эффекта
   */
  public static readonly Empty = new InteractivityParams();

  /**
   * Применить эффект цвета
   */
  public static readonly Color = new InteractivityParams(TInteractivityEffect.Color);
  // #endregion

  // #region Fields
  /**
   * Набор визуальных эффектов которые применяются к структурной части элемента UI
   */
  public effect?: TInteractivityEffect

  /**
   * Брать цвет согласно данным или вычислять
   */
  public calcColor?: TCalcColor;

  /**
   * Следует ли очищать цвет если он не применяется
   */
  public clearColor?: boolean;

  /**
   * Итоговая модификация альфа значения
   */
  public modifyAlpha?: number;
  // #endregion

  constructor(effect?: TInteractivityEffect, calcColor?: TCalcColor, clearColor?: boolean, modifyAlpha?: number)
  {
    this.effect = effect;
    this.clearColor = clearColor;
    this.calcColor = calcColor;
    this.modifyAlpha = modifyAlpha;
  }

  public getColorCSSRgbValue(palette: IThemePalette, colorVariant: TColorVariantName): string
  {
    const color = palette.variants.getByName(colorVariant);
    if (EnumHelper.isFlagSet(this.effect, TInteractivityEffect.Color))
    {
      if (this.calcColor)
      {
        if (typeof this.calcColor === 'boolean')
        {
          return color.createMatchingColor().text.toCSSRgbValue(this.modifyAlpha);
        }
        if (typeof this.calcColor === 'string')
        {
          if (this.calcColor === 'text')
          {
            return palette.onText(colorVariant).toCSSRgbValue(this.modifyAlpha);
          }
          if (this.calcColor === 'border')
          {
            return palette.onBorder(colorVariant).toCSSRgbValue(this.modifyAlpha);
          }
          return palette.variants.getByName(this.calcColor as TColorVariantName).toCSSRgbValue(this.modifyAlpha);
        }
        if (this.calcColor instanceof Color)
        {
          return (this.calcColor as Color).toCSSRgbValue(this.modifyAlpha);
        }
      }
      else
      {
        return color.toCSSRgbValue(this.modifyAlpha);
      }
    }
    else
    {
      if (this.clearColor)
      {
        return 'transparent'
      }
    }

    return 'inherit';
  }
}