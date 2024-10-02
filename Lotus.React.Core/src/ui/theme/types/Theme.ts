/* eslint-disable max-lines */
import { Color, Colors, ColorVariantHelper, NumberHelper } from 'lotus-core';
import { TColorAndVariant, TColorPresentation, TControlPadding, TControlSize, TCssBorderRadius, TCssBorderStyle, 
  TCssBorderWidth, TCssTextAlign, TShadowElevation, TTextEffect } from 'ui/types';
import { CSSProperties } from 'react';
import { hasBorderProperties } from 'ui/components';
import { ThemeColorPalettes } from '../constants/ThemeColorPalettes';
import { TThemeColor, TThemeColors } from './ThemeColor';
import { IThemePalette } from './ThemePalette';
import { IThemePaletteColor } from './ThemePaletteTypes';
import { checkOfThemeColorVariant } from './ThemeColorVariant';
import { TThemeData } from './ThemeData';

type TControlPaddingOffset = 'normal' | 'half';

/**
 * Тема приложения
 */
export class Theme
{
  // #region Const 
  /**
   * Ключ под которым сохраняется тема сайта
   */
  public static readonly SaveKey: string = 'lotus-theme';

  /**
   * Названия атрибута в документа под которым сохраняется тема сайта
   */
  public static readonly DataAttributeThemeMode: string = 'data-theme';

  /**
   * Названия атрибута в документа под которым сохраняется цвет темы сайта
   */
  public static readonly DataAttributeThemeColor: string = 'data-color';

  /**
   * Шрифт по умолчанию
   */
  public static readonly FontDefault: string = 'Verdana, Geneva, Tahoma, sans-serif';

  /**
   * Шрифт для акцента
   */
  public static readonly FontAccent: string = 'Arial, Helvetica, sans-serif';

  /**
   * Скорость переходов анимации/состояния, в миллисекундах
   */
  public static readonly TransitionSpeed: number = 400;

  /**
   * Скорость переходов анимации/состояния, в миллисекундах
   */
  public static readonly TransitionSpeedFast: number = 250;

  /**
   * Прозрачность для элементов UI которые недоступны
   */
  public static readonly OpacityForDisabled: number = 0.65;

  /**
   * Прозрачность для границы элементов UI которые при наведении
   */
  public static readonly OpacityForBorderShadowHover: number = 0.3;

  /**
   * Прозрачность для границы элементов UI которые при активном состоянии
   */
  public static readonly OpacityForBorderShadowActive: number = 0.6;

  /**
   * Стандартный набор теней 
   */
  public static readonly Shadows:Record<number, string> = 
    { 
      0: 'none',
      1: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
      2: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
      3: '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
      4: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
      5: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
      6: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
      7: '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
      8: '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
      9: '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
      10: '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
      11: '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
      12: '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
      13: '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
      14: '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
      15: '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
      16: '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
      17: '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
      18: '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
      19: '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
      20: '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
      21: '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
      22: '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
      23: '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
      24: '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)'
    }
  // #endregion

  // #region Static properties 
  /**
   * Текущая палитра цвета
   */
  public static currentPalette:IThemePalette = ThemeColorPalettes.Palettes['light'];

  /**
   * Текущая основной цвет
   */
  public static currentColor:TThemeColor = 'blue';
  // #endregion
  
  // #region Common methods
  /**
   * Получить палитру цвета по указанному типу цвета 
   * @param color Тип цвета
   * @returns Палитра цвета
   */
  public static getPaletteColor(color?: TThemeColor):IThemePaletteColor
  {
    if(color)
    {
      return Theme.currentPalette.colors[color];
    }
    else
    {
      return Theme.currentPalette.colors[Theme.currentColor];
    }
  }

  /**
   * Получить цвет по совокупности указанных параметров
   * @param color Цвет/Тип цвета/Вариант цвета
   * @param colorVariant Цвет/Вариант цвета
   * @param isText Использовать цвет текста
   * @param isHarmonious Гармоничный цвет текста 
   * @param modifyAlpha — Модификация значения альфы от 0 до 1
   * @param delta — Смещение цвета 
   * @returns Цвет
   */
  public static getColor(color?: TColorPresentation, colorVariant?: TColorAndVariant, isText?: boolean, isHarmonious?: boolean, delta?: number):Color
  {
    // Если передан прямой цвет то он имеет самый высокий приоритет
    if(colorVariant instanceof Color) return colorVariant;

    if(color)
    {
      if(color instanceof Color)
      {
        if(checkOfThemeColorVariant(colorVariant))
        {
          if(isText)
          {
            return ColorVariantHelper.calcColor(color, colorVariant).createHarmoniousColor();
          }
          else
          {
            return ColorVariantHelper.calcColor(color, colorVariant);
          }
        }
        else
        {
          if(isText)
          {
            return color.createHarmoniousColor();
          }
          else
          {
            return color;
          }
        }
      }
      if(checkOfThemeColorVariant(color))
      {
        if(checkOfThemeColorVariant(colorVariant))
        {
          const currentPalette = Theme.currentPalette.colors[Theme.currentColor];
          if(isText)
          {
            return currentPalette.onText(colorVariant, isHarmonious);
          }
          else
          {
            return currentPalette.variants.getNextByName(colorVariant, delta);
          }
        }
        else
        {
          if(isText)
          {
            return Theme.currentPalette.colors[Theme.currentColor].onText(color, isHarmonious);
          }
          else
          {
            return Theme.currentPalette.colors[Theme.currentColor].variants.getNextByName(color, delta);
          }
        }
      }
      if(typeof color == 'string' && TThemeColors.includes(color) == false)
      {
        if(checkOfThemeColorVariant(colorVariant))
        {
          // Ошибка в комбинации
          return Colors.red;
        }
        else
        {
          return new Color(color);
        }
      }
    }

    const palette = Theme.getPaletteColor(color);

    if(!palette) 
    {
      // Ошибка в комбинации
      return Colors.red;
    } 

    if (colorVariant)
    {
      if(isText)
      {
        return palette.onText(colorVariant, isHarmonious);
      }
      else
      {
        return palette.variants.getNextByName(colorVariant, delta);
      }
    }
    else
    {
      if(isText)
      {
        return palette.onText('main', isHarmonious);
      }
      else
      {
        return palette.variants.getNextByName('main', delta);
      }
    }
  }

  /**
   * Получить цвет эффекта Ripple для указанного цвета
   * @param color Цвет
   * @returns Цвет эффекта Ripple в виде строки rgba
   */
  public static getRippleColor(color?: TColorPresentation): string
  {
    if(color)
    {
      if(color instanceof Color)
      {
        if(color.getAlpha() == 0)
        { 
          return color.toCSSRgbValue(0.4);
        }
        else
        {
          return color.toCSSRgbValue();
        }
      }
      if(checkOfThemeColorVariant(color))
      {
        const result = Theme.currentPalette.colors[Theme.currentColor].variants.getByName(color);
        if(result.getAlpha() == 0)
        { 
          return result.toCSSRgbValue(0.4);
        }
        else
        {
          return result.toCSSRgbValue();
        }
      }
    }
      
    const palette = Theme.getPaletteColor(color);
    if(palette)
    {
      return palette.variants.white.toCSSRgbValue(0.4);
    }
    else
    {
      // Ошибка в комбинации
      return Colors.red.toCSSRgbValue();
    }
  }
  // #endregion

  // #region Load/Save
  /**
   * Загрузка темы из локального хранилища 
   * @returns Данные текущей темы данные по умолчанию
   */
  public static loadFromStorage(): TThemeData
  {
    const value = localStorage.getItem(Theme.SaveKey);
    if (value)
    {
      return JSON.parse(value);
    }
    else
    {
      return { mode:'light', color: 'blue' };
    }
  }

  /**
   * Сохранение темы в локальное хранилище
   * @param theme Тема
   */
  public static saveToStorage(theme: TThemeData)
  {
    localStorage.setItem(Theme.SaveKey, JSON.stringify(theme));
  }
  // #endregion

  // #region Font
  /**
   * Получить свойства CSS по настройкам шрифта в виде CSSProperties
   * @param size Размере элемента UI
   * @param isBold Жирный шрифт
   * @param isFontAccent  Использовать шрифт для акцента внимания
   * @returns Свойства CSS по настройкам шрифта в виде CSSProperties
   */
  public static getFontProps(size?: TControlSize, isBold?: boolean, isFontAccent?: boolean): CSSProperties
  {
    const fontProps: CSSProperties = { };

    if(isFontAccent)
    {
      fontProps.fontFamily = Theme.FontDefault;
    }
    else
    {
      fontProps.fontFamily = Theme.FontAccent;
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
   * Получить свойства CSS по эффектам текста в виде CSSProperties
   * @param size Размере элемента UI
   * @param effect Эффекты текста
   * @param textAlign Выравнивание текста по горизонтали внутри блока
   * @returns Свойства CSS по эффектам текста в виде CSSProperties
   */
  public static getTextEffectProps(size?: TControlSize, effect?: TTextEffect, textAlign?: TCssTextAlign): CSSProperties
  {
    const textProps: CSSProperties = {}

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

  // #region Colors
  /**
   * Получение свойства CSS по цвету текста и фона в виде CSSProperties
   * @param color Цвет
   * @param colorVariant Вариант цвета
   * @param isHarmonious Гармоничный цвет текста 
   * @returns Свойства CSS по цвету текста и фона в виде CSSProperties
   */
  public static getColorsProps(color?: TColorPresentation, colorVariant?: TColorAndVariant, isHarmonious?: boolean): CSSProperties
  {
    return {
      color: Theme.getColor(color, colorVariant, true, isHarmonious).toCSSRgbValue(),
      backgroundColor: Theme.getColor(color, colorVariant, false, false).toCSSRgbValue()
    };
  }
  // #endregion

  // #region Foreground
  /**
   * Получение свойства CSS по цвету текста в виде CSSProperties
   * @param color Цвет
   * @param colorVariant Вариант цвета
   * @param isText Использовать цвет текста
   * @param isHarmonious Гармоничный цвет текста 
   * @param modifyAlpha — Модификация значения альфы от 0 до 1
   * @returns Свойства CSS по цвету текста в виде CSSProperties
   */
  public static getForegroundColorProps(color?: TColorPresentation, colorVariant?: TColorAndVariant, isText?: boolean, isHarmonious?: boolean, 
    modifyAlpha?: number): CSSProperties
  {
    return {
      color: Theme.getColor(color, colorVariant, isText, isHarmonious).toCSSRgbValue(modifyAlpha)
    };
  }
  // #endregion

  // #region Background
  /**
   * Получение свойства CSS по цвету фона в виде CSSProperties
   * @param color Цвет
   * @param colorVariant Вариант цвета
   * @param modifyAlpha — Модификация значения альфы от 0 до 1
   * @returns Свойства CSS по цвету фона в виде CSSProperties
   */
  public static getBackgroundColorProps(color?: TColorPresentation, colorVariant?: TColorAndVariant, modifyAlpha?: number): CSSProperties
  {
    return {
      backgroundColor: Theme.getColor(color, colorVariant, false, false).toCSSRgbValue(modifyAlpha)
    };
  }
  // #endregion

  // #region Border
  /**
   * Получить свойства CSS по радиусу границе в виде CSSProperties
   * @param size Размер элемента UI для получения оптимального радиуса
   * @param borderRadius Радиус скругления или статус того что его надо вычислить
   * @returns Свойства CSS по радиусу границе в виде CSSProperties
   */
  public static getBorderRadiusProps(size?: TControlSize, borderRadius?: TCssBorderRadius): CSSProperties
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

    if(borderRadius)
    {
      if(typeof borderRadius === 'boolean')
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
   * Получить свойства CSS по радиусу индивидуальной границе в виде CSSProperties
   * @param size Размер элемента UI для получения оптимального радиуса
   * @param borderRadius Радиус скругления или статус того что его надо вычислить
   * @returns Свойства CSS по радиусу индивидуальной границе в виде CSSProperties
   */
  public static getBorderRadiusIndividualProps(size?: TControlSize, borderRadius?: TCssBorderRadius, 
    isTopLeft?:boolean, isTopRight?:boolean, isBottomLeft?:boolean, isBottomRight?:boolean): CSSProperties
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

    const borderProps: CSSProperties = {};

    if(borderRadius)
    {
      if(typeof borderRadius === 'boolean')
      {
        if(isTopLeft) borderProps.borderTopLeftRadius = getBorderRadius();
        if(isTopRight) borderProps.borderTopRightRadius = getBorderRadius();
        if(isBottomLeft) borderProps.borderBottomLeftRadius = getBorderRadius();
        if(isBottomRight) borderProps.borderBottomRightRadius = getBorderRadius();
      }
      else
      {
        if(isTopLeft) borderProps.borderTopLeftRadius = borderRadius;
        if(isTopRight) borderProps.borderTopRightRadius = borderRadius;
        if(isBottomLeft) borderProps.borderBottomLeftRadius = borderRadius;
        if(isBottomRight) borderProps.borderBottomRightRadius = borderRadius;
      }
    }

    return borderProps;
  }

  /**
   * Получить свойства CSS по границе в виде CSSProperties
   * @param size Размер элемента UI для получения оптимального радиуса
   * @param borderStyle Стиль границ
   * @param borderWidth Ширина границ
   * @param borderColor Цвет границ
   * @returns Свойства CSS по границе в виде CSSProperties
   */
  public static getBorderStyleProps(size?: TControlSize, borderStyle?: TCssBorderStyle, borderWidth?: TCssBorderWidth, 
    borderColor?: TColorPresentation): CSSProperties
  {
    if(hasBorderProperties(borderStyle, borderWidth, borderColor) == false)
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

    const borderProps: CSSProperties =
    {
      borderWidth: borderWidth ?? getBorderWidth(),
      borderStyle: borderStyle ?? 'solid'
    };

    return borderProps;
  }

  /**
   * Получить свойства CSS по индивидуальной границе в виде CSSProperties
   * @param size Размер элемента UI для получения оптимального радиуса
   * @param borderStyle Стиль границ
   * @param borderWidth Ширина границ
   * @param borderColor Цвет границ
   * @returns Свойства CSS по индивидуальной границе в виде CSSProperties
   */
  public static getBorderStyleIndividualProps(size?: TControlSize, borderStyle?: TCssBorderStyle, borderWidth?: TCssBorderWidth,
    borderColor?: TColorPresentation, isLeft?:boolean, isTop?:boolean, isRight?:boolean, isBottom?:boolean): CSSProperties
  {
    if(hasBorderProperties(borderStyle, borderWidth, borderColor) == false)
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

    const borderProps: CSSProperties = {};

    if(isLeft)
    {
      borderProps.borderLeftWidth = borderWidth ?? getBorderWidth();
      borderProps.borderLeftStyle = borderStyle ?? 'solid';
    }

    if(isTop)
    {
      borderProps.borderTopWidth = borderWidth ?? getBorderWidth();
      borderProps.borderTopStyle = borderStyle ?? 'solid';
    }

    if(isRight)
    {
      borderProps.borderRightWidth = borderWidth ?? getBorderWidth();
      borderProps.borderRightStyle = borderStyle ?? 'solid';
    }

    if(isBottom)
    {
      borderProps.borderBottomWidth = borderWidth ?? getBorderWidth();
      borderProps.borderBottomStyle = borderStyle ?? 'solid';
    }

    return borderProps;
  }
  // #endregion

  // #region BorderColor
  /**
   * Получить свойства CSS по цвету для границы в виде CSSProperties
   * @param color Цвет
   * @param colorVariant Вариант цвета
   * @param delta Смещение
   * @param modifyAlpha — Модификация значения альфы от 0 до 1
   * @returns Свойства CSS по цвету для границы в виде CSSProperties
   */
  public static getBorderColorProps(color?: TColorPresentation, colorVariant?: TColorAndVariant, delta?: number, modifyAlpha?: number): CSSProperties
  {
    return {
      borderColor: Theme.getColor(color, colorVariant, false, false, delta).toCSSRgbValue(modifyAlpha)
    };
  }
  // #endregion

  // #region BorderShadow
  /**
   * Получить свойства CSS по тени для границы в виде CSSProperties
   * @param elevation Относительный размер тени
   * @param color Цвет
   * @param colorVariant Вариант цвета
   * @param shadowAlpha Альфа компонент цвета для тени
   * @returns Свойства CSS по тени для границы в виде CSSProperties
   */
  public static getBorderShadowProps(elevation: TShadowElevation, color?: TColorPresentation, colorVariant?: TColorAndVariant, shadowAlpha?: number): CSSProperties
  {
    const colorShadow = Theme.getColor(color, colorVariant, undefined, undefined)

    switch (elevation)
    {
      case 1: return { boxShadow: `0px 0px ${elevation}px ${elevation}px ${colorShadow.toCSSRgbValue(shadowAlpha)}` };
      case 2: return { boxShadow: `0px 0px ${elevation}px ${elevation}px ${colorShadow.toCSSRgbValue(shadowAlpha)}` };
      case 3: return { boxShadow: `0px 0px ${elevation}px ${elevation}px ${colorShadow.toCSSRgbValue(shadowAlpha)}` };
      case 4: return { boxShadow: `0px 0px ${elevation}px ${elevation}px ${colorShadow.toCSSRgbValue(shadowAlpha)}` };
      case 5: return { boxShadow: `0px 0px ${elevation}px ${elevation}px ${colorShadow.toCSSRgbValue(shadowAlpha)}` };
      case 6: return { boxShadow: `0px 0px ${elevation}px ${elevation}px ${colorShadow.toCSSRgbValue(shadowAlpha)}` };
      case 7: return { boxShadow: `0px 0px ${elevation}px ${elevation}px ${colorShadow.toCSSRgbValue(shadowAlpha)}` };
      case 8: return { boxShadow: `0px 0px ${elevation}px ${elevation}px ${colorShadow.toCSSRgbValue(shadowAlpha)}` };
    }

    return {};
  }
  // #endregion

  // #region Padding
  /**
   * Получить свойства CSS по внутреннему отступу в виде CSSProperties
   * @param size Размере элемента UI
   * @param paddingControl Внутренний отступ
   * @param leftRight Тип отступа слева/справа
   * @param topBottom Тип отступа сверху/снизу
   * @returns Свойства CSS по внутреннему отступу в виде CSSProperties
   */
  public static getPaddingProps(size?: TControlSize, paddingControl?: TControlPadding, leftRight?: TControlPaddingOffset,
    topBottom?: TControlPaddingOffset): CSSProperties
  {
    const paddingProps: CSSProperties = {}

    switch (size)
    {
      case 'smaller':
        {
          switch (paddingControl)
          {
            case 'minimum':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '0.06rem';
                  paddingProps.paddingBottom = '0.08rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.06rem';
                  paddingProps.paddingBottom = '0.08rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '0.06rem';
                  paddingProps.paddingRight = '0.06rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.06rem';
                  paddingProps.paddingRight = '0.06rem';
                }
              } break;
            case 'normal':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '0.15rem';
                  paddingProps.paddingBottom = '0.15rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.1rem';
                  paddingProps.paddingBottom = '0.15rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '0.15rem';
                  paddingProps.paddingRight = '0.15rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.1rem';
                  paddingProps.paddingRight = '0.1rem';
                }
              } break;
            case 'enlarged':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '0.25rem';
                  paddingProps.paddingBottom = '0.25rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.15rem';
                  paddingProps.paddingBottom = '0.15rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '0.25rem';
                  paddingProps.paddingRight = '0.25rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.15rem';
                  paddingProps.paddingRight = '0.15rem';
                }
              } break;
          }
        } break;
      case 'small':
        {
          switch (paddingControl)
          {
            case 'minimum':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '0.12rem';
                  paddingProps.paddingBottom = '0.12rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.08rem';
                  paddingProps.paddingBottom = '0.1rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '0.12rem';
                  paddingProps.paddingRight = '0.12rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.08rem';
                  paddingProps.paddingRight = '0.08rem';
                }
              } break;
            case 'normal':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '0.25rem';
                  paddingProps.paddingBottom = '0.25rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.15rem';
                  paddingProps.paddingBottom = '0.175rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '0.25rem';
                  paddingProps.paddingRight = '0.25rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.15rem';
                  paddingProps.paddingRight = '0.15rem';
                }
              } break;
            case 'enlarged':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '0.4rem';
                  paddingProps.paddingBottom = '0.4rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.2rem';
                  paddingProps.paddingBottom = '0.25rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '0.4rem';
                  paddingProps.paddingRight = '0.4rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.2rem';
                  paddingProps.paddingRight = '0.2rem';
                }
              } break;
          }
        } break;
      case 'medium':
        {
          switch (paddingControl)
          {
            case 'minimum':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '0.25rem';
                  paddingProps.paddingBottom = '0.25rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.13rem';
                  paddingProps.paddingBottom = '0.13rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '0.25rem';
                  paddingProps.paddingRight = '0.25rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.13rem';
                  paddingProps.paddingRight = '0.13rem';
                }
              } break;
            case 'normal':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '0.375rem';
                  paddingProps.paddingBottom = '0.375rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.2rem';
                  paddingProps.paddingBottom = '0.2rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '0.375rem';
                  paddingProps.paddingRight = '0.375rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.2rem';
                  paddingProps.paddingRight = '0.2rem';
                }
              } break;
            case 'enlarged':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '0.55rem';
                  paddingProps.paddingBottom = '0.55rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.28rem';
                  paddingProps.paddingBottom = '0.28rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '0.55rem';
                  paddingProps.paddingRight = '0.55rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.28rem';
                  paddingProps.paddingRight = '0.28rem';
                }
              } break;
          }
        } break;
      case 'large':
        {
          switch (paddingControl)
          {
            case 'minimum':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '0.5rem';
                  paddingProps.paddingBottom = '0.5rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.25rem';
                  paddingProps.paddingBottom = '0.25rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '0.5rem';
                  paddingProps.paddingRight = '0.5rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.25rem';
                  paddingProps.paddingRight = '0.25rem';
                }
              } break;
            case 'normal':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '0.75rem';
                  paddingProps.paddingBottom = '0.75rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.375rem';
                  paddingProps.paddingBottom = '0.375rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '0.75rem';
                  paddingProps.paddingRight = '0.75rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.375rem';
                  paddingProps.paddingRight = '0.375rem';
                }
              } break;
            case 'enlarged':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '1.0rem';
                  paddingProps.paddingBottom = '1.0rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.5rem';
                  paddingProps.paddingBottom = '0.5rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '1.0rem';
                  paddingProps.paddingRight = '1.0rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.5rem';
                  paddingProps.paddingRight = '0.5rem';
                }
              } break;
          }
        } break;
    }

    return paddingProps;
  }
  // #endregion

  // #region TransitionColors
  /**
   * Получить свойства CSS по переходу цвета и тени в виде CSSProperties
   * @returns Свойства CSS по переходу цвета и тени в виде CSSProperties
   */
  public static getTransitionColorsProps(): CSSProperties
  {
    return {
      transition: `background-color ${Theme.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    box-shadow ${Theme.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    border-color ${Theme.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    color ${Theme.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1);`
    }
  }
  // #endregion

  // #region BoxShadow
  /**
   * Получить свойства CSS по тени в виде CSSProperties
   * @param elevation Относительный размер тени
   * @param color Цвет
   * @param colorVariant Вариант цвета
   * @returns Свойства CSS по тени в виде CSSProperties
   */
  public static getBoxShadowProps(elevation: TShadowElevation, color?: TColorPresentation, colorVariant?: TColorAndVariant): CSSProperties
  {
    const colorShadow = Theme.getColor(color, colorVariant) 

    switch (elevation)
    {
      case 1:
      {
        return {
          boxShadow: `0px 2px 1px -1px ${colorShadow.toCSSRgbValue(0.2)}, 0px 1px 1px 0px ${colorShadow.toCSSRgbValue(0.14)},
           0px 1px 3px 0px ${colorShadow.toCSSRgbValue(0.12)}`
        }
      }
      case 2:
      {
        return {
          boxShadow: `0px 3px 1px -2px ${colorShadow.toCSSRgbValue(0.2)}, 0px 2px 2px 0px ${colorShadow.toCSSRgbValue(0.14)}, 
          0px 1px 5px 0px ${colorShadow.toCSSRgbValue(0.12)}`
        }
      }
      case 3:
      {
        return {
          boxShadow: `0px 3px 3px -2px ${colorShadow.toCSSRgbValue(0.2)}, 0px 3px 4px 0px ${colorShadow.toCSSRgbValue(0.14)}, 
          0px 1px 8px 0px ${colorShadow.toCSSRgbValue(0.12)}`
        }
      }
      case 4:
      {
        return {
          boxShadow: `0px 2px 4px -1px ${colorShadow.toCSSRgbValue(0.2)}, 0px 4px 5px 0px ${colorShadow.toCSSRgbValue(0.14)}, 
          0px 1px 10px 0px ${colorShadow.toCSSRgbValue(0.12)}`
        }
      }
      case 5:
      {
        return {
          boxShadow: `0px 3px 5px -1px ${colorShadow.toCSSRgbValue(0.2)}, 0px 6px 10px 0px ${colorShadow.toCSSRgbValue(0.14)}, 
          0px 1px 18px 0px ${colorShadow.toCSSRgbValue(0.12)}`
        }
      }
      case 6:
      {
        return {
          boxShadow: `0px 5px 5px -3px ${colorShadow.toCSSRgbValue(0.2)}, 0px 8px 10px 1px ${colorShadow.toCSSRgbValue(0.14)}, 
          0px 3px 14px 2px ${colorShadow.toCSSRgbValue(0.12)}`
        }
      }
      case 7:
      {
        return {
          boxShadow: `0px 7px 8px -4px ${colorShadow.toCSSRgbValue(0.2)}, 0px 12px 17px 2px ${colorShadow.toCSSRgbValue(0.14)},
          0px 5px 22px 4px ${colorShadow.toCSSRgbValue(0.12)}`
        }
      }
      case 8:
      {
        return {
          boxShadow: `0px 8px 10px -5px ${colorShadow.toCSSRgbValue(0.2)}, 0px 16px 24px 2px ${colorShadow.toCSSRgbValue(0.14)}, 
          0px 6px 30px 5px ${colorShadow.toCSSRgbValue(0.12)}`
        }
      }
    }

    return {};
  }
  // #endregion

  // #region TransformScale
  /**
   * Получить свойства CSS по трансформации масштабирования в виде CSSProperties
   * @param scale Масштаб
   * @returns Свойства CSS трансформации масштабирования в виде CSSProperties
   */
  public static getTransformScaleProps(scale?: number): CSSProperties
  {
    if (scale)
    {
      return { transform: `scale(${scale});` };
    }

    return {};
  }
  // #endregion

  // #region Opacity
  /**
   * Получить свойства CSS по прозрачности для неактивного элемента UI в виде CSSProperties
   * @param pointerEventsNone Блокировать события
   * @returns Свойства CSS по прозрачности для неактивного элемента UI в виде CSSProperties
   */
  public static getOpacityForDisabledProps(pointerEventsNone?: boolean): CSSProperties
  {
    const opacityProps: CSSProperties = { opacity: `${Theme.OpacityForDisabled};` }

    if (pointerEventsNone)
    {
      opacityProps.pointerEvents = 'none';
    }

    return opacityProps;
  }

  /**
   * Конвертация размера элемента UI в высоту в пикселях
   * @param size Размере элемента UI
   * @param paddingControl Размер отступов элемента UI
   * @param topBottom Режим отступов по высоте элемента UI
   * @param lineHeight Коэффициент высоты строки
   * @returns Соответствующий размер высоты в пикселях
   */
  public static getSizeProps(size?: TControlSize, paddingControl?: TControlPadding, topBottom?: TControlPaddingOffset, lineHeight?: number): CSSProperties
  {
    const result: number = Theme.convertControlSizeToHeightRem(size, paddingControl, topBottom);
    if (lineHeight)
    {
      return { 
        width: `${result * 16 * lineHeight}px`, 
        height: `${result * 16 * lineHeight}px`
      }
    }
    else
    {
      return { 
        width: `${result * 16}px`, 
        height: `${result * 16}px`
      }
    }
  }
  // #endregion

  // #region ControlSize 
  /**
   * Конвертация размера элемента UI в высоту в rem
   * @param size Размере элемента UI
   * @param paddingControl Размер отступов элемента UI
   * @param topBottom Режим отступов по высоте элемента UI
   * @returns Соответствующий размер высоты в rem
   */
  public static convertControlSizeToHeightRem(size?: TControlSize, paddingControl?: TControlPadding, topBottom?: TControlPaddingOffset): number
  {
    let result: number = 0;
    if (size)
    {
      switch (size)
      {
        case 'smaller': result = 10 / 16; break;
        case 'small': result = 13 / 16; break;
        case 'medium': result = 1; break;
        case 'large': result = 19 / 16; break;
      }
    }

    const css = this.getPaddingProps(size, paddingControl, 'normal', topBottom);

    if(css.paddingTop) result += NumberHelper.parseFloat(css.paddingTop as string);
    if(css.paddingBottom) result += NumberHelper.parseFloat(css.paddingBottom as string);

    return result;
  }

  /**
   * Конвертация размера элемента UI в высоту в пикселях
   * @param size Размере элемента UI
   * @param paddingControl Размер отступов элемента UI
   * @param topBottom Режим отступов по высоте элемента UI
   * @param lineHeight Коэффициент высоты строки
   * @returns Соответствующий размер высоты в пикселях
   */
  public static convertControlSizeToHeightPixel(size?: TControlSize, paddingControl?: TControlPadding, topBottom?: TControlPaddingOffset, lineHeight?: number): number
  {
    const result: number = Theme.convertControlSizeToHeightRem(size, paddingControl, topBottom);
    if (lineHeight)
    {
      return result * 16 * lineHeight;
    }
    else
    {
      return result * 16;
    }
  }

  /**
   * Конвертация размера элемента UI в соответствующий размер иконки в rem
   * @param size Размере элемента UI
   * @returns Соответствующий размер иконки в rem
   */
  public static convertControlSizeToIconSizeInRem(size?: TControlSize): number
  {
    if (size)
    {
      switch (size)
      {
        case 'smaller': return 10 / 16 * 1.5;
        case 'small': return 13 / 16 * 1.5;
        case 'medium': return 1.5;
        case 'large': return 19 / 16 * 1.5;
      }
    }

    return 1.5;
  }

  /**
   * Конвертация размера элемента UI в соответствующий размер иконки в пикселя
   * @param size Размере элемента UI
   * @returns Соответствующий размер иконки в пикселя
   */
  public static convertControlSizeToIconSizeInPixel(size?: TControlSize): number
  {
    if (size)
    {
      switch (size)
      {
        case 'smaller': return 10 * 1.3;
        case 'small': return 13 * 1.3;
        case 'medium': return 16 * 1.3;
        case 'large': return 19 * 1.3;
      }
    }

    return 16 * 1.3;
  }
  // #endregion
}