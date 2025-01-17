/* eslint-disable max-lines */
import { Color, Colors, ColorVariantsHelper, NumberHelper } from 'lotus-core';
import { CSSProperties } from 'react';
import { TColorPresentation, TColorAndVariant, TControlSize, TTextEffect, 
  TCssTextAlign, TCssBorderRadius, TCssBorderStyle, TCssBorderWidth, TShadowElevation, TControlPadding, 
  TCssJustifyContent,
  TCssAlignItems,
  TIconPlacement} from 'ui/types';
import { hasBorderProperties } from 'ui/components';
import { TThemeColor, IThemePaletteAdditionalColor, Theme, checkOfThemeColorVariant, TThemeColors, TThemeData, TThemePaletteModeColorType } from '../types';
import { checkOfThemeModeColor } from '../types/ThemeModeColor';
import { ThemeConstant } from '../constants';
import { ThemePaletteHelper } from './ThemePaletteHelper';

type TControlPaddingOffset = 'normal' | 'half';

interface IForegroundColorByBackSettings
{
  isFilled?: boolean
}

/**
 * Вспомогательный класс для работы с темой
 */
export class ThemeHelper
{

  // #region Common methods
  /**
   * Получить палитру цвета по указанному типу цвета 
   * @param color Тип цвета
   * @returns Палитра цвета
   */
  public static getPaletteColor(color?: TThemeColor): IThemePaletteAdditionalColor
  {
    if (color)
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
  public static getColor(color?: TColorPresentation, colorVariant?: TColorAndVariant, isText?: boolean, isHarmonious?: boolean, delta?: number): Color
  {
    // Если передан цвет темы
    if (checkOfThemeModeColor(color)) return new Color(Colors.red);

    // Если передан прямой цвет то он имеет самый высокий приоритет
    if (colorVariant instanceof Color) return colorVariant;

    // Основной цвет есть
    if (color)
    {
      // Прямой цвет
      if (color instanceof Color)
      {
        // Если передан вариант то мы должны модифицировать основной цвет
        if (checkOfThemeColorVariant(colorVariant))
        {
          if (isText)
          {
            return ColorVariantsHelper.calcColor(color, colorVariant).createContrastOrHarmoniousColor(isHarmonious)
          }
          else
          {
            return ColorVariantsHelper.calcColor(color, colorVariant);
          }
        }
        else
        {
          if (isText)
          {
            return color.createContrastOrHarmoniousColor(isHarmonious);
          }
          else
          {
            return color;
          }
        }
      }

      // Если это вариант цвета
      if (checkOfThemeColorVariant(color))
      {
        // Но передан конкретный вариант - то он имеет преимущество
        if (checkOfThemeColorVariant(colorVariant))
        {
          const currentPalette = Theme.currentPalette.colors[Theme.currentColor];
          if (isText)
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
          if (isText)
          {
            return Theme.currentPalette.colors[Theme.currentColor].onText(color, isHarmonious);
          }
          else
          {
            return Theme.currentPalette.colors[Theme.currentColor].variants.getNextByName(color, delta);
          }
        }
      }

      // 


      if (typeof color == 'string' && TThemeColors.includes(color as TThemeColor) == false)
      {
        if (checkOfThemeColorVariant(colorVariant))
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

    const palette = ThemeHelper.getPaletteColor(color);

    if (!palette) 
    {
      // Ошибка в комбинации
      return Colors.red;
    }

    if (colorVariant)
    {
      if (isText)
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
      if (isText)
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
   * @param useMainColor Использовать основной цвет темы
   * @returns Цвет эффекта Ripple в виде строки rgba
   */
  public static getRippleColor(color?: TColorPresentation, useMainColor?: boolean): string
  {
    if (color)
    {
      if (checkOfThemeModeColor(color))
      {
        if(useMainColor)
        {
          return ThemePaletteHelper.getColor(color, 'dark', 'active').toCSSRgbValue();
        }
        else
        {
          return Theme.currentPalette.action.ripple;
        }
      }

      if (color instanceof Color)
      {
        if (color.getAlpha() == 0)
        {
          return color.toCSSRgbValue(0.4);
        }
        else
        {
          return color.toCSSRgbValue();
        }
      }
      if (checkOfThemeColorVariant(color))
      {
        const result = Theme.currentPalette.colors[Theme.currentColor].variants.getByName(color);
        if (result.getAlpha() == 0)
        {
          return result.toCSSRgbValue(0.4);
        }
        else
        {
          return result.toCSSRgbValue();
        }
      }
    }

    const palette = ThemeHelper.getPaletteColor(color);
    if (palette)
    {
      return palette.variants.white.toCSSRgbValue(0.4);
    }
    else
    {
      // Ошибка в комбинации
      return Colors.red.toCSSRgbValue();
    }
  }

  public static convertToPaletteModeColorType(colorVariant?: TColorAndVariant):TThemePaletteModeColorType
  {
    if(colorVariant)
    {
      if(checkOfThemeColorVariant(colorVariant))
      {
        if(colorVariant == 'black' || colorVariant == 'darkest' || colorVariant == 'darker' || colorVariant == 'dark') return 'dark';
        if(colorVariant == 'main') return 'main';
        return 'light'
      }
    }

    return 'main';
  }
  // #endregion

  // #region Load/Save
  /**
   * Загрузка темы из локального хранилища 
   * @returns Данные текущей темы данные по умолчанию
   */
  public static loadFromStorage(): TThemeData
  {
    const value = localStorage.getItem(ThemeConstant.SaveKey);
    if (value)
    {
      return JSON.parse(value);
    }
    else
    {
      return { mode: 'light', color: 'blue' };
    }
  }

  /**
   * Сохранение темы в локальное хранилище
   * @param theme Тема
   */
  public static saveToStorage(theme: TThemeData)
  {
    localStorage.setItem(ThemeConstant.SaveKey, JSON.stringify(theme));
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
    const fontProps: CSSProperties = {};

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
      color: ThemeHelper.getColor(color, colorVariant, true, isHarmonious).toCSSRgbValue(),
      backgroundColor: ThemeHelper.getColor(color, colorVariant, false, false).toCSSRgbValue()
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
    if(checkOfThemeModeColor(color))
    {
      if(color == 'primary' || color == 'secondary')
        return {
          color: ThemePaletteHelper.getTextColor(color).toCSSRgbValue(modifyAlpha)
        };
      else
      {
        return {
          color: ThemePaletteHelper.getPaletteModeColor(color).main
        };
      }
    }
    else
    {
      return {
        color: ThemeHelper.getColor(color, colorVariant, isText, isHarmonious, undefined).toCSSRgbValue(modifyAlpha)
      };
    }
  }

  /**
   * Получение цвет текста по указанному фону или напрямую
   * @param backColor фоновый цвет
   * @param backColorVariant Вариант фонового цвета
   * @param textColor Цвет текста
   * @param textColorVariant Вариант цвет текста
   * @param isHarmonious Гармоничный цвет текста 
   * @returns Цвет
   */
  public static getForegroundColorByBack(backColor?: TColorPresentation, backColorVariant?: TColorAndVariant, textColor?: TColorPresentation,
    textColorVariant?: TColorAndVariant, isHarmonious?: boolean, settings?: IForegroundColorByBackSettings): Color
  {
    if(checkOfThemeModeColor(textColor))
    {
      // Если есть заливка
      if(settings && settings.isFilled)
      {
        // Если установлен такой же цвет, то берем контраст от backColor
        if(checkOfThemeModeColor(backColor) && backColor == textColor)
        {
          return new Color(ThemePaletteHelper.getColor(backColor, 'contrastText'));
        }
        else
        {
          return new Color(ThemePaletteHelper.getColor(textColor, ThemeHelper.convertToPaletteModeColorType(textColorVariant)));
        }
      }
      else
      {
        if(textColor == 'primary' || textColor == 'secondary') return ThemePaletteHelper.getTextColor(textColor);
        else return new Color(ThemePaletteHelper.getPaletteModeColor(textColor).main);
      }
    }
    else
    {
      if(checkOfThemeModeColor(backColor))
      {
        // Если есть заливка
        if(settings && settings.isFilled)
        {
          return new Color(ThemePaletteHelper.getColor(backColor, 'contrastText'));
        }
        else
        {
          return new Color(Theme.currentPalette.text.primary);
        }
      }
      else
      {
        return ThemeHelper.getColor(textColor ?? backColor,
          (textColor ? textColorVariant : backColorVariant),
          (textColor ? undefined : true),
          (textColor ? undefined : isHarmonious));
      }
    }
  }

  /**
   * Получение свойства CSS по цвету текста по указанному фону или напрямую в виде CSSProperties
   * @param backColor фоновый цвет
   * @param backColorVariant Вариант фонового цвета
   * @param textColor Цвет текста
   * @param textColorVariant Вариант цвет текста
   * @param isHarmonious Гармоничный цвет текста 
   * @param modifyAlpha — Модификация значения альфы от 0 до 1
   * @returns Свойства CSS по цвету текста в виде CSSProperties
   */
  public static getForegroundColorByBackProps(backColor?: TColorPresentation, backColorVariant?: TColorAndVariant, textColor?: TColorPresentation,
    textColorVariant?: TColorAndVariant, isHarmonious?: boolean, modifyAlpha?: number): CSSProperties
  {
    if(checkOfThemeModeColor(textColor))
    {
      if(textColor == 'primary' || textColor == 'secondary')
        return {
          color: ThemePaletteHelper.getTextColor(textColor).toCSSRgbValue(modifyAlpha)
        };
      else
      {
        return {
          color: ThemePaletteHelper.getPaletteModeColor(textColor).main
        };
      }
    }
    else
    {
      if(checkOfThemeModeColor(backColor))
      {
        return {
          color: Theme.currentPalette.text.primary
        };
      }
      else
      {
        return {
          color: ThemeHelper.getColor(textColor ?? backColor,
            (textColor ? textColorVariant : backColorVariant),
            (textColor ? undefined : true),
            (textColor ? undefined : isHarmonious)).toCSSRgbValue(modifyAlpha)
        };
      }
    }
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
    if(checkOfThemeModeColor(color))
    {
      return {
        backgroundColor: Theme.currentPalette.background.default
      };
    }
    else
    {
      return {
        backgroundColor: ThemeHelper.getColor(color, colorVariant, undefined, undefined, undefined).toCSSRgbValue(modifyAlpha)
      };
    }
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
   * Получить свойства CSS по индивидуальному радиусу границе в виде CSSProperties
   * @param size Размер элемента UI для получения оптимального радиуса
   * @param borderRadius Радиус скругления или статус того что его надо вычислить
   * @param isTopLeft Скругление верхнего левого угла
   * @param isTopRight Скругление верхнего правого угла
   * @param isBottomLeft Скругление нижнего левого угла
   * @param isBottomRight Скругление нижнего правого угла
   * @returns 
   */
  public static getBorderRadiusIndividualProps(size?: TControlSize, borderRadius?: TCssBorderRadius,
    isTopLeft?: boolean, isTopRight?: boolean, isBottomLeft?: boolean, isBottomRight?: boolean): CSSProperties
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

    const borderProps: CSSProperties = 
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
    borderColor?: TColorPresentation, isLeft?: boolean, isTop?: boolean, isRight?: boolean, isBottom?: boolean): CSSProperties
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

    const borderProps: CSSProperties = {};

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
    if(checkOfThemeModeColor(color))
    {
      return {
        borderColor: Theme.currentPalette.divider
      };
    }
    else
    {
      return {
        borderColor: ThemeHelper.getColor(color, colorVariant, undefined, undefined, delta).toCSSRgbValue(modifyAlpha)
      };
    }
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
    const colorShadow = checkOfThemeModeColor(color) ? ThemePaletteHelper.getColor(color, 'main')
      : ThemeHelper.getColor(color, colorVariant, undefined, undefined, undefined);

    return { boxShadow: `0px 0px ${elevation}px ${elevation}px ${colorShadow.toCSSRgbValue(shadowAlpha)}` }
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
      transition: `background-color ${ThemeConstant.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    box-shadow ${ThemeConstant.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    border-color ${ThemeConstant.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    color ${ThemeConstant.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1);`
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
    const colorShadow = checkOfThemeModeColor(color) ? Colors.black
      : ThemeHelper.getColor(color, colorVariant, undefined, undefined, undefined);

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
    const opacityProps: CSSProperties = { opacity: `${ThemeConstant.OpacityForDisabled};` }

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
    const result: number = ThemeHelper.convertControlSizeToHeightRem(size, paddingControl, topBottom);
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

    if (css.paddingTop) result += NumberHelper.parseFloat(css.paddingTop as string);
    if (css.paddingBottom) result += NumberHelper.parseFloat(css.paddingBottom as string);

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
    const result: number = ThemeHelper.convertControlSizeToHeightRem(size, paddingControl, topBottom);
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
   * Конвертация размера элемента UI в соответствующий размер иконки в пикселях
   * @param size Размере элемента UI
   * @returns Соответствующий размер иконки в пикселях
   */
  public static convertControlSizeToIconSizeInPixel(size?: TControlSize): number
  {
    if (size)
    {
      switch (size)
      {
        case 'smaller': return 10 * 1.5;
        case 'small': return 13 * 1.5;
        case 'medium': return 16 * 1.5;
        case 'large': return 19 * 1.5;
      }
    }

    return 16 * 1.5;
  }
  // #endregion

  // #region FlexRowContainer
  /**
   * Получить оптимальный размер пространства между элементами по горизонтали для Flex контейнера
   * @param size Размер элемента
   * @param paddingControl Внутренний отступ
   * @returns Размер пространства в rem
   */
  public static getColumnGapFromSizeInRem(size: TControlSize, paddingControl: TControlPadding): number
  {
    switch (size) 
    {
      case 'smaller':
        {
          switch (paddingControl)
          {
            case 'minimum': return 0.12;
            case 'normal': return 0.15;
            case 'enlarged': return 0.2;
          }
        } break;
      case 'small':
        {
          switch (paddingControl)
          {
            case 'minimum': return 0.15;
            case 'normal': return 0.2;
            case 'enlarged': return 0.25;
          }
        } break;
      case 'medium':
        {
          switch (paddingControl)
          {
            case 'minimum': return 0.25;
            case 'normal': return 0.3;
            case 'enlarged': return 0.375;
          }
        } break;
      case 'large':
        {
          switch (paddingControl)
          {
            case 'minimum': return 0.2;
            case 'normal': return 0.35;
            case 'enlarged': return 0.45;
          }
        } break;
    }

    return 0.3;
  }

  /**
   * Получить оптимальные настройки Flex контейнера по горизонтали в виде CSSProperties
   * @param size Размер элемента
   * @param paddingControl Внутренний отступ
   * @param isReverse Обратный порядок элементов
   * @param horizontalAlign Распределение элементов по ширине
   * @param verticalAlign Выравнивание элементов по вертикали
   * @returns Настройки Flex контейнера в виде CSSProperties
   */
  public static getFlexRowContainer(size: TControlSize, paddingControl: TControlPadding, isReverse:boolean = false, 
    horizontalAlign: TCssJustifyContent = 'flex-start', verticalAlign: TCssAlignItems = 'center'): CSSProperties
  {
    return {
      display: 'flex',
      flexDirection:  isReverse ? 'row-reverse' : 'row',
      justifyContent: horizontalAlign,
      alignItems: verticalAlign,
      columnGap: `${ThemeHelper.getColumnGapFromSizeInRem(size, paddingControl)}rem`
    }
  }
  // #endregion

  // #region FlexColumnContainer
  /**
   * Получить оптимальный размер пространства между элементами по вертикали для Flex контейнера
   * @param size Размер элемента
   * @param paddingControl Внутренний отступ
   * @returns Размер пространства в rem
   */
  public static getRowGapFromSizeInRem(size: TControlSize, paddingControl: TControlPadding): number
  {
    switch (size) 
    {
      case 'smaller':
        {
          switch (paddingControl)
          {
            case 'minimum': return 0.24;
            case 'normal': return 0.3;
            case 'enlarged': return 0.4;
          }
        } break;
      case 'small':
        {
          switch (paddingControl)
          {
            case 'minimum': return 0.3;
            case 'normal': return 0.4;
            case 'enlarged': return 0.5;
          }
        } break;
      case 'medium':
        {
          switch (paddingControl)
          {
            case 'minimum': return 0.5;
            case 'normal': return 0.6;
            case 'enlarged': return 0.75;
          }
        } break;
      case 'large':
        {
          switch (paddingControl)
          {
            case 'minimum': return 0.4;
            case 'normal': return 0.7;
            case 'enlarged': return 0.9;
          }
        } break;
    }

    return 0.6;
  }

  /**
   * Получить оптимальные настройки Flex контейнера по вертикали в виде CSSProperties
   * @param size Размер элемента
   * @param paddingControl Внутренний отступ
   * @param isReverse Обратный порядок элементов
   * @param verticalAlign Распределение элементов по высоте
   * @param horizontalAlign Выравнивание элементов по горизонтали
   * @returns Настройки Flex контейнера в виде CSSProperties
   */
  public static getFlexColumnContainer(size: TControlSize, paddingControl: TControlPadding, isReverse:boolean = false, 
    verticalAlign: TCssJustifyContent = 'flex-start', horizontalAlign: TCssAlignItems = 'center'): CSSProperties
  {
    return {
      display: 'flex',
      flexDirection:  isReverse ? 'column-reverse' : 'column',
      justifyContent: verticalAlign,
      alignItems: horizontalAlign,
      rowGap: `${ThemeHelper.getRowGapFromSizeInRem(size, paddingControl)}rem`
    }
  }
  // #endregion


  // #region FlexContainerByIcon

  /**
   * Получить оптимальные настройки Flex контейнера для иконки в виде CSSProperties
   * @param size Размер элемента
   * @param paddingControl Внутренний отступ
   * @param iconPlacement Вариант размещения иконки
   * @returns Настройки Flex контейнера в виде CSSProperties
   */
  public static getFlexContainerByIcon(size: TControlSize, paddingControl: TControlPadding, iconPlacement: TIconPlacement): CSSProperties
  {
    switch (iconPlacement)
    {
      case 'left': return ThemeHelper.getFlexRowContainer(size, paddingControl);
      case 'right': return ThemeHelper.getFlexRowContainer(size, paddingControl, true);
      case 'top': return ThemeHelper.getFlexColumnContainer(size, paddingControl);
      case 'bottom': return ThemeHelper.getFlexColumnContainer(size, paddingControl, true);
    }

    return {};
  }
  // #endregion
}