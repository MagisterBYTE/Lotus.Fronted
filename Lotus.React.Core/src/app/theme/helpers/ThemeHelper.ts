import { TColorAccent, TColorType, TControlPadding, TControlSize, TCssFontSize } from 'ui/types';
import { CSSProperties } from 'react';
import { StringHelper } from 'lotus-core';
import { CssPropertiesHelper } from 'ui/helpers';
import { ThemeConstants } from '../constants';
import { TThemeMode } from '../types';

type TControlPaddingOffset = 'normal' | 'half';

export class ThemeHelper
{
  // #region Load/Save
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

  // #region Foreground
  /**
   * Получение свойства CSS по цвету текста в виде CSSProperties
   * @param color Цвет
   * @param colorAccent Акцент цвета
   * @returns Свойства CSS по цвету текста в виде CSSProperties
   */
  public static getForegroundColorAsCSS(color?: TColorType, colorAccent?: TColorAccent): CSSProperties
  {
    if (color)
    {
      switch (color)
      {
        case 'main': return { color: 'var(--lotus-body-color);' };
        case 'secondary': return { color: 'var(--lotus-secondary-color);' };
        default:
        {
          if (colorAccent)
          {
            return { color: `var(--lotus-color-${color}${StringHelper.capitalizeFirstLetter(colorAccent)});` };
          }
          else
          {
            return { color: `var(--lotus-color-${color});` };
          }
        }
      }
    }

    return {};
  }

  /**
   * Получение свойства CSS по цвету текста в виде текста
   * @param color Цвет
   * @param colorAccent Акцент цвета
   * @returns Свойства CSS по цвету текста в виде текста
   */
  public static getForegroundColorAsText(color?: TColorType, colorAccent?: TColorAccent): string
  {
    const colorProps: string = CssPropertiesHelper.toStr(ThemeHelper.getForegroundColorAsCSS(color, colorAccent));
    return colorProps;
  }

  /**
   * Получение свойства CSS по цвету текста оптимального для данного фонового цвета в виде CSSProperties
   * @param color Цвет фона
   * @param colorAccent Акцент цвета фона
   * @returns Свойства CSS по цвету текста в виде CSSProperties
   */
  public static getForegroundColorForBackAsCSS(color?: TColorType, colorAccent?: TColorAccent): CSSProperties
  {
    switch (color)
    {
      case 'main':
      {
        return { color: 'var(--lotus-body-color)' }
      }
      case 'secondary':
      {
        return { color: 'var(--lotus-secondary-color)' }
      }
      case 'primary':
      {
        switch (colorAccent)
        {
          case 'palest': return { color: 'rgb(0, 0, 20)' }
          case 'lighter': return { color: 'rgb(10, 10, 10)' }
          case 'light': return { color: 'rgb(255, 255, 255)' }
          case 'dark': return { color: 'rgb(240, 240, 240)' }
          case 'darker': return { color: 'rgb(240, 240, 240)' }
          case 'alpha02': return { color: 'rgb(10, 10, 10)' }
          case 'alpha04': return { color: 'rgb(10, 10, 10)' }
          case 'alpha08': return { color: 'rgb(10, 10, 10)' }
          default: return { color: 'white' }
        };
      }
      case 'success':
      {
        switch (colorAccent)
        {
          case 'palest': return { color: 'rgb(0, 20, 0)' }
          case 'lighter': return { color: 'rgb(10, 10, 10)' }
          case 'light': return { color: 'rgb(255, 255, 255)' }
          case 'dark': return { color: 'rgb(240, 240, 240)' }
          case 'darker': return { color: 'rgb(240, 240, 240)' }
          case 'alpha02': return { color: 'rgb(10, 10, 10)' }
          case 'alpha04': return { color: 'rgb(10, 10, 10)' }
          case 'alpha08': return { color: 'rgb(10, 10, 10)' }
          default: return { color: 'white' }
        };
      }
      case 'danger':
      {
        switch (colorAccent)
        {
          case 'palest': return { color: 'rgb(20, 0, 0)' }
          case 'lighter': return { color: 'rgb(10, 10, 10)' }
          case 'light': return { color: 'rgb(255, 255, 255)' }
          case 'dark': return { color: 'rgb(240, 240, 240)' }
          case 'darker': return { color: 'rgb(240, 240, 240)' }
          case 'alpha02': return { color: 'rgb(10, 10, 10)' }
          case 'alpha04': return { color: 'rgb(10, 10, 10)' }
          case 'alpha08': return { color: 'rgb(10, 10, 10)' }
          default: return { color: 'white' }
        };
      }
      case 'warning':
      {
        switch (colorAccent)
        {
          case 'palest': return { color: 'rgb(20, 0, 0)' }
          case 'lighter': return { color: 'rgb(10, 10, 10)' }
          case 'light': return { color: 'rgb(10, 10, 10)' }
          case 'dark': return { color: 'rgb(240, 240, 240)' }
          case 'darker': return { color: 'rgb(240, 240, 240)' }
          case 'alpha02': return { color: 'rgb(10, 10, 10)' }
          case 'alpha04': return { color: 'rgb(10, 10, 10)' }
          case 'alpha08': return { color: 'rgb(10, 10, 10)' }
          default: return { color: 'rgb(10, 10, 10)' }
        };
      }
      case 'info':
      {
        switch (colorAccent)
        {
          case 'palest': return { color: 'rgb(20, 0, 0)' }
          case 'lighter': return { color: 'rgb(10, 10, 10)' }
          case 'light': return { color: 'rgb(10, 10, 10)' }
          case 'dark': return { color: 'rgb(240, 240, 240)' }
          case 'darker': return { color: 'rgb(240, 240, 240)' }
          case 'alpha02': return { color: 'rgb(10, 10, 10)' }
          case 'alpha04': return { color: 'rgb(10, 10, 10)' }
          case 'alpha08': return { color: 'rgb(10, 10, 10)' }
          default: return { color: 'rgb(10, 10, 10)' }
        };
      }
    }

    return {};
  }

  /**
   * Получение свойства CSS по цвету текста оптимального для данного фонового цвета в виде текста
   * @param color Цвет фона
   * @param colorAccent Акцент цвета фона
   * @returns Свойства CSS по цвету текста в виде текста
   */
  public static getForegroundColorForBackAsText(color?: TColorType, colorAccent?: TColorAccent): string
  {
    const colorProps: string = CssPropertiesHelper.toStr(ThemeHelper.getForegroundColorForBackAsCSS(color, colorAccent));
    return colorProps;
  }
  // #endregion

  // #region Background
  /**
   * Получение свойства CSS по цвету фона в виде CSSProperties
   * @param color Цвет
   * @param colorAccent Акцент цвета
   * @returns Свойства CSS по цвету фона в виде CSSProperties
   */
  public static getBackgroundColorAsCSS(color?: TColorType, colorAccent?: TColorAccent): CSSProperties
  {
    if (color)
    {
      switch (color)
      {
        case 'main': return { backgroundColor: 'var(--lotus-body-bg);' };
        case 'secondary': return { backgroundColor: 'var(--lotus-secondary-bg);' };
        default:
        {
          if (colorAccent)
          {
            return { backgroundColor: `var(--lotus-color-${color}${StringHelper.capitalizeFirstLetter(colorAccent)});` };
          }
          else
          {
            return { backgroundColor: `var(--lotus-color-${color});` };
          }
        }
      }
    }

    return {};
  }

  /**
   * Получение свойства CSS  по цвету фона в виде текста
   * @param color Цвет
   * @param colorAccent Акцент цвета
   * @returns Свойства CSS  по цвету фона в виде текста
   */
  public static getBackgroundColorAsText(color?: TColorType, colorAccent?: TColorAccent): string
  {
    const colorProps: string = CssPropertiesHelper.toStr(ThemeHelper.getBackgroundColorAsCSS(color, colorAccent));
    return colorProps;
  }
  // #endregion

  // #region Border
  /**
   * Получить свойства CSS по границе в виде CSSProperties
   * @param color Цвет
   * @param colorAccent Акцент цвета
   * @param hasRadius Включить радиус
   * @param size Размер элементе UI для получения оптимального радиуса
   * @returns Свойства CSS по границе в виде CSSProperties
   */
  public static getBorderPropsAsCSS(color?: TColorType, colorAccent?: TColorAccent, hasRadius?: boolean, size?: TControlSize): CSSProperties
  {
    const borderProps: CSSProperties =
    {
      borderWidth: 'var(--lotus-border-width);',
      borderStyle: 'var(--lotus-border-style);'
    };

    if (hasRadius)
    {
      if(size)
      {
        borderProps.borderRadius = `var(--lotus-border-radius-${size});`
      }
      else
      {
        borderProps.borderRadius = 'var(--lotus-border-radius);'
      }
    }

    if (color)
    {
      switch (color)
      {
        case 'main': borderProps.borderColor = 'var(--lotus-border-color);'; break;
        case 'secondary': borderProps.borderColor = 'var(--lotus-border-color);'; break;
        default:
        {
          if (colorAccent)
          {
            borderProps.borderColor = `var(--lotus-color-${color}${StringHelper.capitalizeFirstLetter(colorAccent)});`; break;
          }
          else
          {
            borderProps.borderColor = `var(--lotus-color-${color});`; break;
          }
        }
      }
    }

    return borderProps;
  }

  /**
   * Получить свойства CSS по границе в виде текста
   * @param color Цвет
   * @param colorAccent Акцент цвета
   * @param hasRadius Включить радиус
   * @param size Размер элементе UI для получения оптимального радиуса
   * @returns Свойства CSS по границе в виде текста
   */
  public static getBorderPropsAsText(color?: TColorType, colorAccent?: TColorAccent, hasRadius?: boolean, size?: TControlSize): string
  {
    const borderProps: string = CssPropertiesHelper.toStr(ThemeHelper.getBorderPropsAsCSS(color, colorAccent, hasRadius, size));
    return borderProps;
  }
  // #endregion

  // #region TransitionColors
  /**
   * Получить свойства CSS по переходу цвета и тени в виде CSSProperties
   * @returns Свойства CSS по переходу цвета и тени в виде CSSProperties
   */
  public static getTransitionColorsPropsAsCSS(): CSSProperties
  {
    return {
      transition: `background-color ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    box-shadow ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    border-color ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    color ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1);`
    }
  }

  /**
   * Получить свойства CSS по переходу цвета и тени в виде текста
   * @returns Свойства CSS по переходу цвета и тени в виде текста
   */
  public static getTransitionColorsPropsAsText(): string
  {
    const transitionProps: string = CssPropertiesHelper.toStr(ThemeHelper.getTransitionColorsPropsAsCSS());
    return transitionProps;
  }
  // #endregion

  // #region BoxShadow
  /**
   * Получить свойства CSS по тени в виде CSSProperties
   * @param elevation Относительный размер тени от 1 до 5
   * @returns Свойства CSS по тени в виде CSSProperties
   */
  public static getBoxShadowPropsAsCSS(elevation?: number): CSSProperties
  {
    if (elevation)
    {
      switch (elevation)
      {
        case 1:
        {
          return {
            boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);'
          }
        }
        case 2:
        {
          return {
            boxShadow: '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);'
          }
        }
        case 3:
        {
          return {
            boxShadow: '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);'
          }
        }
        case 4:
        {
          return {
            boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);'
          }
        }
        case 5:
        {
          return {
            boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);'
          }
        }
      }
    }

    return {};
  }

  /**
   * Получить свойства CSS по переходу цвета и тени в виде текста
   * @param elevation Относительный размер тени от 1 до 5
   * @returns Свойства CSS по переходу цвета и тени в виде текста
   */
  public static getBoxShadowPropsAsText(elevation?: number): string
  {
    const boxShadowProps: string = CssPropertiesHelper.toStr(ThemeHelper.getBoxShadowPropsAsCSS(elevation));
    return boxShadowProps;
  }
  // #endregion

  // #region FontFamily
  /**
   * Получить свойства CSS по семейству шрифтов в виде CSSProperties
   * @returns Свойства CSS по семейству шрифтов в виде CSSProperties
   */
  public static getFontFamilyPropsAsCSS(): CSSProperties
  {
    return { fontFamily: 'var(--lotus-font-main);' }
  }

  /**
   * Получить свойства CSS по семейству шрифтов в виде текста
   * @returns Свойства CSS по семейству шрифтов в виде текста
   */
  public static getFontFamilyPropsAsText(): string
  {
    return 'font-family: var(--lotus-font-main);'
  }
  // #endregion

  // #region Font
  /**
   * Получить свойства CSS по настройкам шрифта в виде CSSProperties
   * @param size Размере элемента UI
   * @returns Свойства CSS по настройкам шрифта в виде CSSProperties
   */
  public static getFontPropsAsCSS(size?: TControlSize): CSSProperties
  {
    const fontProps: CSSProperties = { fontFamily: 'var(--lotus-font-main);' }

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

    return fontProps;
  }

  /**
   * Получить свойства CSS по настройкам шрифта в виде текста
   * @param size Размере элемента UI
   * @returns Свойства CSS по настройкам шрифта в виде текста
   */
  public static getFontPropsAsText(size?: TControlSize): string
  {
    const fontProps: string = CssPropertiesHelper.toStr(ThemeHelper.getFontPropsAsCSS(size));
    return fontProps;
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
  public static getPaddingPropsAsCSS(size?: TControlSize, paddingControl?: TControlPadding, leftRight?: TControlPaddingOffset,
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

  /**
   * Получить свойства CSS по внутреннему отступу в виде текста
   * @param size Размере элемента UI
   * @param paddingControl Внутренний отступ
   * @param leftRight Тип отступа слева/справа
   * @param topBottom Тип отступа сверху/снизу
   * @returns Свойства CSS по внутреннему отступу в виде текста
   */
  public static getPaddingPropsAsText(size?: TControlSize, paddingControl?: TControlPadding, leftRight?: TControlPaddingOffset,
    topBottom?: TControlPaddingOffset): string
  {
    const paddingProps: string = CssPropertiesHelper.toStr(ThemeHelper.getPaddingPropsAsCSS(size, paddingControl, leftRight, topBottom));
    return paddingProps;
  }
  // #endregion

  // #region Get Colors
  /**
   * 
   * @param color 
   * @param colorAccent 
   * @returns 
   */
  public static getColorVar(color?: TColorType|'tertiary', colorAccent?: TColorAccent):string
  {
    if(!color) return 'inherit;'

    let c:string = color;
    if(c == 'main') c = 'body';
    if(c == 'body' || c == 'secondary' || c == 'tertiary')
    {
      return `var(--lotus-${c}-color);`
    }
    else
    {
      if(colorAccent)
      {
        return `var(--lotus-color-${c}${StringHelper.capitalizeFirstLetter(colorAccent)});`
      }
      else
      {
        return `var(--lotus-color-${c});`
      }
    }
  }

  /**
   * 
   * @param color 
   * @param colorAccent 
   * @returns 
   */
  public static getBackgroundColorVar(color?: TColorType|'tertiary', colorAccent?: TColorAccent):string
  {
    if(!color) return 'inherit;'

    let c:string = color;
    if(c == 'main') c = 'body';
    if(c == 'body' || c == 'secondary' || c == 'tertiary')
    {
      return `var(--lotus-${c}-bg);`
    }
    else
    {
      if(colorAccent)
      {
        return `var(--lotus-color-${c}${StringHelper.capitalizeFirstLetter(colorAccent)});`
      }
      else
      {
        return `var(--lotus-color-${c});`
      }
    }
  }

  /**
   * 
   * @param color 
   * @param colorAccent 
   * @returns 
   */
  public static getBorderColorVar(color?: TColorType|'tertiary', colorAccent?: TColorAccent):string
  {
    if(!color) return 'inherit;'

    let c:string = color;
    if(c == 'main') c = 'body';
    if(c == 'body' || c == 'secondary' || c == 'tertiary')
    {
      if(colorAccent)
      {
        return `var(--lotus-border-color${StringHelper.capitalizeFirstLetter(colorAccent)});`
      }
      else
      {
        return 'var(--lotus-border-color);'
      }
    }
    else
    {
      if(colorAccent)
      {
        return `var(--lotus-color-${c}${StringHelper.capitalizeFirstLetter(colorAccent)});`
      }
      else
      {
        return `var(--lotus-color-${c});`
      }
    }
  }
  // #endregion

  /**
   * Получение оптимального размера шрифта при указанном размере элемента UI
   * @param size Размере элемента UI
   * @returns Оптимальный размера шрифта
   */
  public static getFontSizeByControlSize(size?: TControlSize): TCssFontSize
  {
    if (size)
    {
      switch (size)
      {
        case 'smaller': return 'x-small'
        case 'small': return 'small'
        case 'medium': return 'medium'
        case 'large': return 'large'
      }
    }

    return 'medium';
  }

  /**
   * Получение оптимального размера шрифта при указанном размере элемента UI как свойства CSS
   * @param size Размере элемента UI
   * @returns Оптимальный размера шрифта как свойства CSS
   */
  public static getFontSizeByControlSizeAsCSS(size?: TControlSize): CSSProperties
  {
    if (size)
    {
      switch (size)
      {
        case 'smaller': return { fontSize: 'x-small' };
        case 'small': return { fontSize: 'small' };
        case 'medium': return { fontSize: 'medium' };
        case 'large': return { fontSize: 'large' };
      }
    }

    return { fontSize: 'medium' };
  }

  /**
   * Конвертация размера элемента UI в соответствующий размер шрифта в пикселях
   * @param size Размере элемента UI
   * @returns Соответствующий размер шрифта в пикселях
   */
  public static convertControlSizeToFontSizeInPixel(size?: TControlSize): number
  {
    if (size)
    {
      switch (size)
      {
        case 'smaller': return 10;
        case 'small': return 13;
        case 'medium': return 16;
        case 'large': return 19;
      }
    }

    return 16;
  }

  /**
   * Конвертация размера элемента UI в соответствующий размер шрифта в rem
   * @param size Размере элемента UI
   * @returns Соответствующий размер шрифта в rem
   */
  public static convertControlSizeToFontSizeInRem(size?: TControlSize): number
  {
    if (size)
    {
      switch (size)
      {
        case 'smaller': return 10 / 16;
        case 'small': return 13 / 16;
        case 'medium': return 1;
        case 'large': return 19 / 16;
      }
    }

    return 1;
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
        case 'smaller': return 10 * 1.5;
        case 'small': return 13 * 1.5;
        case 'medium': return 16 * 1.5;
        case 'large': return 19 * 1.5;
      }
    }

    return 16 * 1.5;
  }





  /**
   * Получить свойства CSS по переходу ширины в виде CSSProperties
   * @returns Свойства CSS по переходу ширины и тени в виде CSSProperties
   */
  public static getTransitionWidthPropsAsCSS(): CSSProperties
  {
    return {
      transition: `width ${200}ms ease-in-out`
    }
  }

  /**
   * Получить свойства CSS по прозрачности для неактивного элемента UI в виде текста
   * @returns Свойства CSS по прозрачности для неактивного элемента UI в виде текста
   */
  public static getOpacityPropsForDisabledAsText(): string
  {
    return `opacity: ${ThemeConstants.OpacityForDisabled};`;
  }

  /**
   * Получить свойства CSS по прозрачности для неактивного элемента UI в виде текста
   * @returns Свойства CSS по прозрачности для неактивного элемента UI в виде текста
   */
  public static getOpacityPropsForDisabledAsCSS(): CSSProperties
  {
    return { opacity: `${ThemeConstants.OpacityForDisabled};` }
  }
}