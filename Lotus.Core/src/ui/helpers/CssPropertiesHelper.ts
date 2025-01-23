import { hasBorderProperties } from 'ui/base';
import { ThemeConstant, ThemePaletteHelper, TThemeColorVariant } from 'ui/theme';
import
{
  TControlSize, TCssBorderRadius,
  TCssBorderStyle, TCssBorderWidth, TCssProperties, TCssTextAlign, TShadowElevation, TTextEffect
} from 'ui/types';

export class CssPropertiesHelper
{
  // #region Font
  /**
   * Получить свойства CSS по настройкам шрифта в виде TCssProperties
   * @param size Размере элемента UI
   * @param isBold Жирный шрифт
   * @param isFontAccent  Использовать шрифт для акцента внимания
   * @returns Свойства CSS по настройкам шрифта в виде TCssProperties
   */
  public static getFontProps(size?: TControlSize, isBold?: boolean, isFontAccent?: boolean): TCssProperties
  {
    const fontProps: TCssProperties = {};

    if (isFontAccent)
    {
      fontProps.fontFamily = ThemeConstant.FontDefault;
    }
    else
    {
      fontProps.fontFamily = ThemeConstant.FontAccent;
    }

    if (size)
    {
      switch (size)
      {
        case 'smaller': fontProps.fontSize = 'x-small'; break;
        case 'small': fontProps.fontSize = 'small'; break;
        case 'medium': fontProps.fontSize = 'medium'; break;
        case 'large': fontProps.fontSize = 'large'; break;
      }
    }

    if (isBold)
    {
      fontProps.fontWeight = 'bold';
    }

    return fontProps;
  }
  // #endregion

  // #region TextEffect
  /**
   * Получить свойства CSS по эффектам текста в виде TCssProperties
   * @param size Размере элемента UI
   * @param effect Эффекты текста
   * @param textAlign Выравнивание текста по горизонтали внутри блока
   * @returns Свойства CSS по эффектам текста в виде TCssProperties
   */
  public static getTextEffectProps(size?: TControlSize, effect?: TTextEffect, textAlign?: TCssTextAlign): TCssProperties
  {
    const textProps: TCssProperties = {}

    const getSizeShadow = (): number =>
    {
      if (size)
      {
        switch (size)
        {
          case 'smaller': return 0.05
          case 'small': return 0.07
          case 'medium': return 0.085
          case 'large': return 0.1
        }
      }

      return 0.07
    }

    const getSizeStroke = (): number =>
    {
      if (size)
      {
        switch (size)
        {
          case 'smaller': return 0.4
          case 'small': return 0.5
          case 'medium': return 0.7
          case 'large': return 1
        }
      }

      return 0.5;
    }

    if (effect)
    {
      switch (effect)
      {
        case 'shadow':
          {
            const sizeShadow = getSizeShadow();
            textProps.textShadow = `${sizeShadow}rem ${sizeShadow}rem 0 rgba(0, 0, 0, 0.15)`;
          } break;
        case 'stroke':
          {
            const sizeStroke = getSizeStroke();
            textProps.WebkitTextStroke = `${sizeStroke}px black`;
          } break;
      }
    }

    if (textAlign)
    {
      textProps.textAlign = textAlign;
    }

    return textProps;
  }
  // #endregion

  // #region Border
  /**
   * Получить свойства CSS по радиусу границе в виде TCssProperties
   * @param size Размер элемента UI для получения оптимального радиуса
   * @param borderRadius Радиус скругления или статус того что его надо вычислить
   * @returns Свойства CSS по радиусу границе в виде TCssProperties
   */
  public static getBorderRadiusProps(size?: TControlSize, borderRadius?: TCssBorderRadius): TCssProperties
  {
    const getBorderRadius = (): string =>
    {
      let rem = 0.4;
      switch (size)
      {
        case 'smaller':
          {
            rem = 0.2;
          } break;
        case 'small':
          {
            rem = 0.25;
          } break;
        case 'medium':
          {
            rem = 0.375;
          } break;
        case 'large':
          {
            rem = 0.5;
          } break;
      }

      return `${rem}rem`;
    }

    if (borderRadius)
    {
      if (typeof borderRadius === 'boolean')
      {
        return { borderRadius: getBorderRadius() }
      }
      else
      {
        return { borderRadius: borderRadius }
      }
    }

    return {};
  }

  /**
   * Получить свойства CSS по индивидуальному радиусу границе в виде TCssProperties
   * @param size Размер элемента UI для получения оптимального радиуса
   * @param borderRadius Радиус скругления или статус того что его надо вычислить
   * @param isTopLeft Скругление верхнего левого угла
   * @param isTopRight Скругление верхнего правого угла
   * @param isBottomLeft Скругление нижнего левого угла
   * @param isBottomRight Скругление нижнего правого угла
   * @returns 
   */
  public static getBorderRadiusIndividualProps(size?: TControlSize, borderRadius?: TCssBorderRadius,
    isTopLeft?: boolean, isTopRight?: boolean, isBottomLeft?: boolean, isBottomRight?: boolean): TCssProperties
  {
    const getBorderRadius = (): string =>
    {
      let rem = 0.4;
      switch (size)
      {
        case 'smaller':
          {
            rem = 0.2;
          } break;
        case 'small':
          {
            rem = 0.25;
          } break;
        case 'medium':
          {
            rem = 0.375;
          } break;
        case 'large':
          {
            rem = 0.5;
          } break;
      }

      return `${rem}rem`;
    }

    const borderProps: TCssProperties = 
    {
      borderRadius: 'undefined'
    };

    if (borderRadius)
    {
      if (typeof borderRadius === 'boolean')
      {
        if (isTopLeft) borderProps.borderTopLeftRadius = getBorderRadius();
        if (isTopRight) borderProps.borderTopRightRadius = getBorderRadius();
        if (isBottomLeft) borderProps.borderBottomLeftRadius = getBorderRadius();
        if (isBottomRight) borderProps.borderBottomRightRadius = getBorderRadius();
      }
      else
      {
        if (isTopLeft) borderProps.borderTopLeftRadius = borderRadius;
        if (isTopRight) borderProps.borderTopRightRadius = borderRadius;
        if (isBottomLeft) borderProps.borderBottomLeftRadius = borderRadius;
        if (isBottomRight) borderProps.borderBottomRightRadius = borderRadius;
      }
    }

    return borderProps;
  }

  /**
   * Получить свойства CSS по границе в виде TCssProperties
   * @param size Размер элемента UI для получения оптимального радиуса
   * @param borderStyle Стиль границ
   * @param borderWidth Ширина границ
   * @param borderColor Цвет границ
   * @returns Свойства CSS по границе в виде TCssProperties
   */
  public static getBorderStyleProps(size?: TControlSize, borderStyle?: TCssBorderStyle, borderWidth?: TCssBorderWidth,
    borderColor?: TThemeColorVariant): TCssProperties
  {
    if (hasBorderProperties(borderStyle, borderWidth, borderColor) == false)
    {
      return { border: 'none' }
    }

    const getBorderWidth = (): string =>
    {
      let pixel = 1;
      switch (size)
      {
        case 'smaller':
          {
            pixel = 1;
          } break;
        case 'small':
          {
            pixel = 1;
          } break;
        case 'medium':
          {
            if (borderStyle === 'solid' || borderStyle === undefined) pixel = 1;
            else pixel = 3;
          } break;
        case 'large':
          {
            if (borderStyle === 'solid' || borderStyle === undefined) pixel = 2;
            else pixel = 3;
          } break;
      }

      return `${pixel}px`;
    }

    const borderProps: TCssProperties =
    {
      borderWidth: borderWidth ?? getBorderWidth(),
      borderStyle: borderStyle ?? 'solid'
    };

    return borderProps;
  }

  /**
   * Получить свойства CSS по индивидуальной границе в виде TCssProperties
   * @param size Размер элемента UI для получения оптимального радиуса
   * @param borderStyle Стиль границ
   * @param borderWidth Ширина границ
   * @param borderColor Цвет границ
   * @returns Свойства CSS по индивидуальной границе в виде TCssProperties
   */
  public static getBorderStyleIndividualProps(size?: TControlSize, borderStyle?: TCssBorderStyle, borderWidth?: TCssBorderWidth,
    borderColor?: TThemeColorVariant, isLeft?: boolean, isTop?: boolean, isRight?: boolean, isBottom?: boolean): TCssProperties
  {
    if (hasBorderProperties(borderStyle, borderWidth, borderColor) == false)
    {
      return { border: 'none' }
    }

    const getBorderWidth = (): string =>
    {
      let pixel = 1;
      switch (size)
      {
        case 'smaller':
          {
            pixel = 1;
          } break;
        case 'small':
          {
            pixel = 1;
          } break;
        case 'medium':
          {
            if (borderStyle === 'solid' || borderStyle === undefined) pixel = 1;
            else pixel = 3;
          } break;
        case 'large':
          {
            if (borderStyle === 'solid' || borderStyle === undefined) pixel = 2;
            else pixel = 3;
          } break;
      }

      return `${pixel}px`;
    }

    const borderProps: TCssProperties = {};

    if (isLeft)
    {
      borderProps.borderLeftWidth = borderWidth ?? getBorderWidth();
      borderProps.borderLeftStyle = borderStyle ?? 'solid';
    }

    if (isTop)
    {
      borderProps.borderTopWidth = borderWidth ?? getBorderWidth();
      borderProps.borderTopStyle = borderStyle ?? 'solid';
    }

    if (isRight)
    {
      borderProps.borderRightWidth = borderWidth ?? getBorderWidth();
      borderProps.borderRightStyle = borderStyle ?? 'solid';
    }

    if (isBottom)
    {
      borderProps.borderBottomWidth = borderWidth ?? getBorderWidth();
      borderProps.borderBottomStyle = borderStyle ?? 'solid';
    }

    return borderProps;
  }
  // #endregion

  // #endregion
  // #region BorderShadow
  /**
   * Получить свойства CSS по тени для границы в виде TCssProperties
   * @param elevation Относительный размер тени
   * @param color Цвет
   * @param shadowAlpha Альфа компонент цвета для тени
   * @returns Свойства CSS по тени для границы в виде TCssProperties
   */
  public static getBorderShadowProps(elevation: TShadowElevation, color?: TThemeColorVariant, shadowAlpha?: number): TCssProperties
  {
    const colorShadow = ThemePaletteHelper.getElementColor(color ?? 'primaryBlack');

    return { boxShadow: `0px 0px ${elevation}px ${elevation}px ${colorShadow.toCSSRgbValue(shadowAlpha)}` }
  }
  // #endregion

  // #region TransitionColors
  /**
   * Получить свойства CSS по переходу цвета и тени в виде TCssProperties
   * @returns Свойства CSS по переходу цвета и тени в виде TCssProperties
   */
  public static getTransitionColorsProps(): TCssProperties
  {
    return {
      transition: `background-color ${ThemeConstant.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    box-shadow ${ThemeConstant.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    border-color ${ThemeConstant.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    color ${ThemeConstant.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1);`
    }
  }
  // #endregion

  // #region BoxShadow
  /**
   * Получить свойства CSS по тени в виде TCssProperties
   * @param elevation Относительный размер тени
   * @param color Цвет
   * @param colorVariant Вариант цвета
   * @returns Свойства CSS по тени в виде TCssProperties
   */
  public static getBoxShadowProps(elevation: TShadowElevation, color?: TThemeColorVariant): TCssProperties
  {
    const colorShadow = ThemePaletteHelper.getElementColor(color ?? 'primaryBlack');

    const rgba02 = colorShadow.toCSSRgbValue(0.2);
    const rgba014 = colorShadow.toCSSRgbValue(0.14);
    const rgba012 = colorShadow.toCSSRgbValue(0.12);

    let boxShadowValue = '';

    switch (elevation)
    {
      case 1: boxShadowValue = `0px 2px 1px -1px ${rgba02},0px 1px 1px 0px ${rgba014},0px 1px 3px 0px ${rgba012}`; break;
      case 2: boxShadowValue = `0px 3px 1px -2px ${rgba02},0px 2px 2px 0px ${rgba014},0px 1px 5px 0px ${rgba012}`; break;
      case 3: boxShadowValue = `0px 3px 3px -2px ${rgba02},0px 3px 4px 0px ${rgba014},0px 1px 8px 0px ${rgba012}`; break;
      case 4: boxShadowValue = `0px 2px 4px -1px ${rgba02},0px 4px 5px 0px ${rgba014},0px 1px 10px 0px ${rgba012}`; break;
      case 5: boxShadowValue = `0px 3px 5px -1px ${rgba02},0px 5px 8px 0px ${rgba014},0px 1px 14px 0px ${rgba012}`; break;
      case 6: boxShadowValue = `0px 3px 5px -1px ${rgba02},0px 6px 10px 0px ${rgba014},0px 1px 18px 0px ${rgba012}`; break;
      case 7: boxShadowValue = `0px 4px 5px -2px ${rgba02},0px 7px 10px 1px ${rgba014},0px 2px 16px 1px ${rgba012}`; break;
      case 8: boxShadowValue = `0px 5px 5px -3px ${rgba02},0px 8px 10px 1px ${rgba014},0px 3px 14px 2px ${rgba012}`; break;
      case 9: boxShadowValue = `0px 5px 6px -3px ${rgba02},0px 9px 12px 1px ${rgba014},0px 3px 16px 2px ${rgba012}`; break;
      case 10: boxShadowValue = `0px 6px 6px -3px ${rgba02},0px 10px 14px 1px ${rgba014},0px 4px 18px 3px ${rgba012}`; break;
      case 11: boxShadowValue = `0px 6px 7px -4px ${rgba02},0px 11px 15px 1px ${rgba014},0px 4px 20px 3px ${rgba012}`; break;
      case 12: boxShadowValue = `0px 7px 8px -4px ${rgba02},0px 12px 17px 2px ${rgba014},0px 5px 22px 4px ${rgba012}`; break;
      case 13: boxShadowValue = `0px 7px 8px -4px ${rgba02},0px 13px 19px 2px ${rgba014},0px 5px 24px 4px ${rgba012}`; break;
      case 14: boxShadowValue = `0px 7px 9px -4px ${rgba02},0px 14px 21px 2px ${rgba014},0px 5px 26px 4px ${rgba012}`; break;
      case 15: boxShadowValue = `0px 8px 9px -5px ${rgba02},0px 15px 22px 2px ${rgba014},0px 6px 28px 5px ${rgba012}`; break;
      case 16: boxShadowValue = `0px 8px 10px -5px ${rgba02},0px 16px 24px 2px ${rgba014},0px 6px 30px 5px ${rgba012}`; break;
      case 17: boxShadowValue = `0px 8px 11px -5px ${rgba02},0px 17px 26px 2px ${rgba014},0px 6px 32px 5px ${rgba012}`; break;
      case 18: boxShadowValue = `0px 9px 11px -5px ${rgba02},0px 18px 28px 2px ${rgba014},0px 7px 34px 6px ${rgba012}`; break;
      case 19: boxShadowValue = `0px 9px 12px -6px ${rgba02},0px 19px 29px 2px ${rgba014},0px 7px 36px 6px ${rgba012}`; break;
      case 20: boxShadowValue = `0px 10px 13px -6px ${rgba02},0px 20px 31px 3px ${rgba014},0px 8px 38px 7px ${rgba012}`; break;
      case 21: boxShadowValue = `0px 10px 13px -6px ${rgba02},0px 21px 33px 3px ${rgba014},0px 8px 40px 7px ${rgba012}`; break;
      case 22: boxShadowValue = `0px 10px 14px -6px ${rgba02},0px 22px 35px 3px ${rgba014},0px 8px 42px 7px ${rgba012}`; break;
      case 23: boxShadowValue = `0px 11px 14px -7px ${rgba02},0px 23px 36px 3px ${rgba014},0px 9px 44px 8px ${rgba012}`; break;
      case 24: boxShadowValue = `0px 11px 15px -7px ${rgba02},0px 24px 38px 3px ${rgba014},0px 9px 46px 8px ${rgba012}`; break;
    }

    return { boxShadow: boxShadowValue };
  }
  // #endregion

  // #region TransformScale
  /**
   * Получить свойства CSS по трансформации масштабирования в виде TCssProperties
   * @param scale Масштаб
   * @returns Свойства CSS трансформации масштабирования в виде TCssProperties
   */
  public static getTransformScaleProps(scale?: number): TCssProperties
  {
    if (scale)
    {
      return { transform: `scale(${scale});` };
    }

    return {};
  }
  // #endregion
}