import { TControlPadding, TControlSize, TShadowElevation, TTextEffect } from 'ui/types';
import { CSSProperties } from 'react';
import { Colors, NumberHelper } from 'lotus-core';
import { TCssBorderStyle, TCssTextAlign } from 'ui/types/CssTypes';
import { ThemeConstants } from '../constants';
import { IThemePalette, ThemeData, TThemeColor, TThemeColorVariant, TThemeMode } from '../types';

type TControlPaddingOffset = 'normal' | 'half';

export class ThemeHelper
{
  // #region Load/Save
  /**
   * 
   * @returns 
   */
  public static getThemeByDocument(): TThemeMode
  {
    return (document.documentElement.getAttribute(ThemeConstants.DataAttribute) as TThemeMode) ?? 'light';
  }

  /**
   * Загрузка темы из локального хранилища 
   * @returns Тема или тема по умолчанию по умолчанию
   */
  public static loadFromStorage(): TThemeMode
  {
    const value = localStorage.getItem(ThemeConstants.SaveKey);
    if (value)
    {
      return value as TThemeMode;
    }
    else
    {
      return 'light';
    }
  }

  /**
   * Сохранение темы в локальное хранилище
   * @param theme Тема
   */
  public static saveToStorage(theme: TThemeMode)
  {
    localStorage.setItem(ThemeConstants.SaveKey, theme);
  }
  // #endregion

  // #region Font
  /**
   * Получить свойства CSS по настройкам шрифта в виде CSSProperties
   * @param size Размере элемента UI
   * @param isBold Жирный шрифт
   * @returns Свойства CSS по настройкам шрифта в виде CSSProperties
   */
  public static getFontProps(size?: TControlSize, isBold?: boolean): CSSProperties
  {
    const fontProps: CSSProperties = { fontFamily: 'Verdana, Helvetica, Arial, sans-serif' }

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
   * @param textAlign Выравнивание текса по горизонтали внутри блока
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

  // #region Border
  /**
   * Получить свойства CSS по границе в виде CSSProperties
   * @param size Размер элементе UI для получения оптимального радиуса
   * @param borderRounded Статус скругления границы
   * @param borderStyle Стиль границ
   * @returns Свойства CSS по границе в виде CSSProperties
   */
  public static getBorderProps(size?: TControlSize, borderRounded?: boolean, borderStyle?: TCssBorderStyle): CSSProperties
  {
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
      borderWidth: getBorderWidth(),
      borderStyle: borderStyle ?? 'solid'
    };

    if (borderRounded)
    {
      borderProps.borderRadius = getBorderRadius();
    }

    return borderProps;
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
      transition: `background-color ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    box-shadow ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    border-color ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    color ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1);`
    }
  }
  // #endregion

  // #region Foreground
  /**
   * Получение свойства CSS по цвету текста в виде CSSProperties
   * @param color Цвет
   * @param colorVariant Вариант цвета
   * @param isText Использовать цвет текста
   * @returns Свойства CSS по цвету текста в виде CSSProperties
   */
  public static getForegroundColorProps(color?: TThemeColor, colorVariant?: TThemeColorVariant, isText?: boolean): CSSProperties
  {
    if (color)
    {
      const palette: IThemePalette = ThemeData[color];
      if (colorVariant)
      {
        if (isText)
        {
          return { color: palette.onText(colorVariant).toCSSRgbValue() }
        }
        else
        {
          return { color: palette.variants.getByName(colorVariant).toCSSRgbValue() }
        }
      }
      else
      {
        return { color: palette.variants.main.toCSSRgbValue() }
      }
    }

    return {};
  }
  // #endregion

  // #region Background
  /**
   * Получение свойства CSS по цвету фона в виде CSSProperties
   * @param color Цвет
   * @param colorVariant Вариант цвета
   * @returns Свойства CSS по цвету фона в виде CSSProperties
   */
  public static getBackgroundColorProps(color?: TThemeColor, colorVariant?: TThemeColorVariant): CSSProperties
  {
    if (color)
    {
      const palette: IThemePalette = ThemeData[color];
      if (colorVariant)
      {
        return { backgroundColor: palette.variants.getByName(colorVariant).toCSSRgbValue() }
      }
      else
      {
        return { backgroundColor: palette.variants.main.toCSSRgbValue() }
      }
    }

    return {};
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
  public static getBorderShadowProps(elevation: TShadowElevation, color?: TThemeColor, colorVariant?: TThemeColorVariant, shadowAlpha?: number): CSSProperties
  {
    let colorText = 'rgba(0, 0, 0, 0.15);';
    if (color)
    {
      const palette: IThemePalette = ThemeData[color];

      if (colorVariant)
      {
        colorText = palette.variants.getByName(colorVariant).toCSSRgbValue(shadowAlpha);
      }
      else
      {
        colorText = palette.variants.main.toCSSRgbValue(shadowAlpha);
      }
    }

    switch (elevation)
    {
      case 1: return { boxShadow: `0px 0px ${elevation}px ${elevation}px ${colorText}` };
      case 2: return { boxShadow: `0px 0px ${elevation}px ${elevation}px ${colorText}` };
      case 3: return { boxShadow: `0px 0px ${elevation}px ${elevation}px ${colorText}` };
      case 4: return { boxShadow: `0px 0px ${elevation}px ${elevation}px ${colorText}` };
      case 5: return { boxShadow: `0px 0px ${elevation}px ${elevation}px ${colorText}` };
      case 6: return { boxShadow: `0px 0px ${elevation}px ${elevation}px ${colorText}` };
      case 7: return { boxShadow: `0px 0px ${elevation}px ${elevation}px ${colorText}` };
      case 8: return { boxShadow: `0px 0px ${elevation}px ${elevation}px ${colorText}` };
    }

    return {};
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
  public static getBoxShadowProps(elevation: TShadowElevation, color?: TThemeColor, colorVariant?: TThemeColorVariant): CSSProperties
  {
    let colorShadow = Colors.black;
    if (color)
    {
      const palette: IThemePalette = ThemeData[color];

      if (colorVariant)
      {
        colorShadow = palette.variants.getByName(colorVariant);
      }
      else
      {
        colorShadow = palette.variants.main;
      }
    }

    switch (elevation)
    {
      case 1:
      {
        return {
          boxShadow: `0px 2px 1px -1px ${colorShadow.toCSSRgbValue(0.2, true)}, 0px 1px 1px 0px ${colorShadow.toCSSRgbValue(0.14, true)},
           0px 1px 3px 0px ${colorShadow.toCSSRgbValue(0.12)}`
        }
      }
      case 2:
      {
        return {
          boxShadow: `0px 3px 1px -2px ${colorShadow.toCSSRgbValue(0.2, true)}, 0px 2px 2px 0px ${colorShadow.toCSSRgbValue(0.14, true)}, 
          0px 1px 5px 0px ${colorShadow.toCSSRgbValue(0.12)}`
        }
      }
      case 3:
      {
        return {
          boxShadow: `0px 3px 3px -2px ${colorShadow.toCSSRgbValue(0.2, true)}, 0px 3px 4px 0px ${colorShadow.toCSSRgbValue(0.14, true)}, 
          0px 1px 8px 0px ${colorShadow.toCSSRgbValue(0.12)}`
        }
      }
      case 4:
      {
        return {
          boxShadow: `0px 2px 4px -1px ${colorShadow.toCSSRgbValue(0.2, true)}, 0px 4px 5px 0px ${colorShadow.toCSSRgbValue(0.14, true)}, 
          0px 1px 10px 0px ${colorShadow.toCSSRgbValue(0.12)}`
        }
      }
      case 5:
      {
        return {
          boxShadow: `0px 3px 5px -1px ${colorShadow.toCSSRgbValue(0.2, true)}, 0px 6px 10px 0px ${colorShadow.toCSSRgbValue(0.14, true)}, 
          0px 1px 18px 0px ${colorShadow.toCSSRgbValue(0.12)}`
        }
      }
      case 6:
      {
        return {
          boxShadow: `0px 5px 5px -3px ${colorShadow.toCSSRgbValue(0.2, true)}, 0px 8px 10px 1px ${colorShadow.toCSSRgbValue(0.14, true)}, 
          0px 3px 14px 2px ${colorShadow.toCSSRgbValue(0.12)}`
        }
      }
      case 7:
      {
        return {
          boxShadow: `px 7px 8px -4px ${colorShadow.toCSSRgbValue(0.2, true)}, 0px 12px 17px 2px ${colorShadow.toCSSRgbValue(0.14, true)},
          0px 5px 22px 4px ${colorShadow.toCSSRgbValue(0.12)}`
        }
      }
      case 8:
      {
        return {
          boxShadow: `0px 8px 10px -5px ${colorShadow.toCSSRgbValue(0.2, true)}, 0px 16px 24px 2px ${colorShadow.toCSSRgbValue(0.14, true)}, 
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
    const opacityProps: CSSProperties = { opacity: `${ThemeConstants.OpacityForDisabled};` }

    if (pointerEventsNone)
    {
      opacityProps.pointerEvents = 'none';
    }

    return opacityProps;
  }
  // #endregion

  // #region ControlSize
  /**
   * Конвертация размера элемента UI в высоту в rem
   * @param size Размере элемента UI
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

    result += NumberHelper.parseFloat(css.paddingTop as string);
    result += NumberHelper.parseFloat(css.paddingBottom as string);

    return result;
  }

  /**
   * Конвертация размера элемента UI в высоту в пикселях
   * @param size Размере элемента UI
   * @returns Соответствующий размер высоты в пикселях
   */
  public static convertControlSizeToHeightPixel(size?: TControlSize, paddingControl?: TControlPadding, topBottom?: TControlPaddingOffset): number
  {
    const result: number = ThemeHelper.convertControlSizeToHeightRem(size, paddingControl, topBottom);
    return result * 16;
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