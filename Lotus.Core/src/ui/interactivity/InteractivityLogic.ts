/* eslint-disable @typescript-eslint/no-unused-vars */
import { CSSProperties } from 'react';
import { ThemePaletteHelper } from 'ui/theme/helpers/ThemePaletteHelper';
import { hasBorderProps } from 'ui/base';
import { TColorVariantName } from 'modules/color';
import { TThemeColor } from 'ui/theme';
import { TInteractivityModel } from './InteractivityModel';
import { TInteractivityState } from './InteractivityState';
import { IInteractivityElement } from './InteractivityElement';

/**
 * Контекст элемента UI для применения визуального эффекта
 */
export interface IEffectContextProps
{
  /**
   * Элемент находиться в статусе выбора
   */
  isSelected?: boolean;

  /**
   *  Элемент не доступен
   */
  isDisabled?: boolean; 

  /**
   *  Элемент находиться в фокусе
   */
  isFocused?: boolean;

  /**
   * Нужно ли применять Ripple Effect
   */
  hasRippleEffect?: boolean;
}

/**
 * Логика применения визуальных эффектов к элементу UI в зависимости от модель применения и состояния интерактивности элемента
 */
export class InteractivityLogic
{
  /**
   * Получить приоритетный цвет в расчетах
   * @param hoverColor Цвет наведения
   * @param mainColor Основной цвет
   */
  private static getPriorityColor(hoverColor?: TColorAndVariant, mainColor?: TColorPresentation): TColorPresentation | undefined
  {
    if (hoverColor && mainColor)
    {
      if (checkOfThemeColor(mainColor))
      {
        return mainColor;
      }
    }

    return hoverColor ?? mainColor;
  }

  /**
   * Получить визуальный эффекты для фона элемента UI
   * @param model Модель применения визуальных эффектов к элементу UI
   * @param state Состояние интерактивности элемента UI
   * @param elem Интерактивный элемент
   * @param isSelected Статус выбора элемента UI
   * @param isDisabled Статус недоступности элемента UI
   * @param isFocused Статус нахождения элемента UI в фокусе
   * @returns Свойства CSSProperties
   */
  public static getEffectProps(model: TInteractivityModel, state: TInteractivityState, elem: IInteractivityElement, 
    context?: IEffectContextProps): CSSProperties
  {
    const {
      backColor, hoverBackColor, pressedBackColor,
      textColor, hoverTextColor, pressedTextColor, textColorHarmonious,
      borderRadius, borderStyle, borderWidth,
      borderColor, hoverBorderColor, pressedBorderColor
    } = elem

    const isSelected: boolean = Boolean(context?.isSelected);
    const isDisabled: boolean = Boolean(context?.isDisabled);
    const isFocused: boolean = Boolean(context?.isFocused);
    const hasRippleEffect: boolean = Boolean(context?.hasRippleEffect);

    const effectProps: CSSProperties = {};

    switch (model)
    {
      case 'filled':
        {
          switch (state)
          {
            case 'normal':
              {
                const colorsBackAndText = ThemePaletteHelper.getColorBackAndTextForFilled(backColor ?? 'primary', 
                  isSelected ? 'light' : 'main', 
                  undefined, textColor, undefined, textColorHarmonious);

                effectProps.backgroundColor = colorsBackAndText.backgroundColor
                effectProps.color = colorsBackAndText.color;
                
                // Граница произвольна
                if (hasBorderProps(elem))
                {
                  effectProps.borderWidth = borderWidth ?? '1px';
                  effectProps.borderStyle = borderStyle ?? 'solid';
                  effectProps.borderColor = ThemePaletteHelper.getColor(borderColor ?? backColor ?? 'primary', 'dark').toCSSRgbValue()
                }
                else
                {
                  // Убираем по умолчанию
                  effectProps.border = 'none';
                }
              }
              break;
            case 'hover':
              {
                const colorsBackAndText = ThemePaletteHelper.getColorBackAndTextForFilled(backColor ?? 'primary', 
                  hoverBackColor ?? (isSelected ? 'dark' : 'palest'), 
                  undefined, textColor, hoverTextColor, textColorHarmonious);

                effectProps.backgroundColor = colorsBackAndText.backgroundColor
                effectProps.color = colorsBackAndText.color

                // Граница произвольна
                if (hasBorderProps(elem))
                {
                  effectProps.borderWidth = borderWidth ?? '1px';
                  effectProps.borderStyle = borderStyle ?? 'solid';
                  effectProps.borderColor = ThemePaletteHelper.getColor(borderColor ?? backColor ?? 'primary', hoverBorderColor ?? 'darker').toCSSRgbValue()
                }
                else
                {
                  // Убираем по умолчанию
                  effectProps.border = 'none';
                }
              } break;
            case 'pressed':
              {
                const colorsBackAndText = ThemePaletteHelper.getColorBackAndTextForFilled(backColor ?? 'primary', 
                  pressedBackColor ?? (isSelected ? 'darker' : 'dark'), 
                  undefined, textColor, pressedTextColor, textColorHarmonious);

                if(!hasRippleEffect)
                {
                  effectProps.backgroundColor = colorsBackAndText.color;
                }

                effectProps.color = colorsBackAndText.color;

                // Граница произвольна
                if (hasBorderProps(elem))
                {
                  effectProps.borderWidth = borderWidth ?? '1px';
                  effectProps.borderStyle = borderStyle ?? 'solid';
                  effectProps.borderColor = ThemePaletteHelper.getColor(borderColor ?? backColor ?? 'primary', pressedBorderColor ?? 'light').toCSSRgbValue()
                }
                else
                {
                  // Убираем по умолчанию
                  effectProps.border = 'none';
                }
              } break;
          }
        } break;
      case 'outline':
        {
          switch (state)
          {
            case 'normal':
              {
                if (isSelected)
                {
                  const colorsBackAndText = ThemePaletteHelper.getColorBackAndTextForFilled(backColor ?? 'primary', 
                    'light', undefined, textColor, undefined, textColorHarmonious);

                  effectProps.backgroundColor = colorsBackAndText.backgroundColor
                  effectProps.color = colorsBackAndText.color
                }
                else
                {
                  effectProps.backgroundColor = 'transparent';
                  effectProps.color = ThemePaletteHelper.getColor(textColor ?? backColor ?? 'primary', hoverTextColor)
                }

                // Граница обязательна
                effectProps.borderWidth = borderWidth ?? '1px';
                effectProps.borderStyle = borderStyle ?? 'solid';
                effectProps.borderColor = ThemePaletteHelper.getColor(borderColor ?? backColor ?? 'primary', 'main').toCSSRgbValue()
              } break;
            case 'hover':
              {
                const colorsBackAndText = ThemePaletteHelper.getColorBackAndTextForFilled(backColor ?? 'primary', 
                  hoverBackColor ?? (isSelected ? 'lighter' : 'palest'), 
                  undefined, textColor, hoverTextColor, textColorHarmonious);

                effectProps.backgroundColor = colorsBackAndText.backgroundColor
                effectProps.color = colorsBackAndText.color

                // Граница обязательна
                effectProps.borderWidth = borderWidth ?? '1px';
                effectProps.borderStyle = borderStyle ?? 'solid';
                ThemePaletteHelper.getColor(borderColor ?? backColor ?? 'primary', hoverBorderColor ?? 'lighter').toCSSRgbValue()
              } break;
            case 'pressed':
              {
                const colorsBackAndText = ThemePaletteHelper.getColorBackAndTextForFilled(backColor ?? 'primary', 
                  pressedBackColor ?? (isSelected ? 'darker' : 'dark'), 
                  undefined, textColor, pressedTextColor, textColorHarmonious);
                if(!hasRippleEffect)
                {
                  effectProps.backgroundColor = colorsBackAndText.color;
                }
    
                effectProps.color = colorsBackAndText.color;

                // Граница обязательна
                effectProps.borderWidth = borderWidth ?? '1px';
                effectProps.borderStyle = borderStyle ?? 'solid';
                effectProps.borderColor = ThemePaletteHelper.getColor(borderColor ?? backColor ?? 'primary', pressedBorderColor ?? 'light').toCSSRgbValue()
              } break;
          }
        } break;
      case 'text':
        {
          switch (state)
          {
            case 'normal':
              {
                if(isSelected)
                {
                  effectProps.backgroundColor = ThemePaletteHelper.getColor(backColor ?? 'primary', pressedBackColor ?? 'lighter').toCSSRgbValue();
                }
                else
                {
                  effectProps.backgroundColor = 'transparent';
                }

                effectProps.color = ThemePaletteHelper.getColor(textColor ?? backColor ?? 'primary', 'main').toCSSRgbValue()

                // Границы нет
                effectProps.border = 'none';
                effectProps.borderColor = 'transparent';
              } break;
            case 'hover':
              {
                effectProps.backgroundColor = ThemePaletteHelper.getColor(backColor ?? 'primary', 
                  hoverBackColor ?? (isSelected ? 'palest' : 'light')).toCSSRgbValue();

                effectProps.color = ThemePaletteHelper.getColor(textColor ?? backColor ?? 'primary', hoverTextColor ?? 'main').toCSSRgbValue()

                // Границы нет
                effectProps.border = 'none';
                effectProps.borderColor = 'transparent';
              } break;
            case 'pressed':
              {
                if(!hasRippleEffect)
                {
                  effectProps.backgroundColor = ThemePaletteHelper.getColor(backColor ?? 'primary', 
                    pressedBackColor ?? (isSelected ? 'dark' : 'darker')).toCSSRgbValue();
                }

                effectProps.color = ThemePaletteHelper.getColor(textColor ?? backColor ?? 'primary', pressedTextColor ?? 'dark').toCSSRgbValue()

                // Границы нет
                effectProps.border = 'none';
                effectProps.borderColor = 'transparent';
              } break;
          }
        } break;
      case 'icon':
        {
          switch (state)
          {
            case 'normal':
              {
                if(isSelected)
                {
                  effectProps.backgroundColor = checkOfThemeModeColor(backColor)
                    ? ThemePaletteHelper.getColor(backColor, 'light', 'hover').toCSSRgbValue()
                    : ThemeHelper.getColor(backColor, hoverBackColor ?? 'palest').toCSSRgbValue();

                  effectProps.color = (hoverTextColor == undefined && textColor == undefined && checkOfThemeModeColor(backColor))
                    ? ThemePaletteHelper.getColor(backColor, 'main').toCSSRgbValue()
                    : ThemeHelper.getColor(this.getPriorityColor(hoverTextColor, textColor) ?? backColor,
                      ((hoverTextColor ?? textColor) ? (hoverTextColor ?? 'palest') : (hoverBackColor ?? 'palest')),
                      ((hoverTextColor ?? textColor) ? false : true), ((hoverTextColor ?? textColor) ? false : textColorHarmonious)).toCSSRgbValue();

                  // Граница обязательна
                  effectProps.borderWidth = borderWidth ?? '1px';
                  effectProps.borderStyle = borderStyle ?? 'solid';
                  effectProps.borderColor = (hoverBorderColor == undefined && borderColor == undefined && checkOfThemeModeColor(backColor))
                    ? ThemePaletteHelper.getColor(backColor, 'main').toCSSRgbValue()
                    : ThemeHelper.getColor(this.getPriorityColor(hoverBorderColor, borderColor) ?? backColor,
                      ((hoverBorderColor ?? borderColor) ? (hoverBorderColor ?? 'palest') : (hoverBackColor ?? 'palest')),
                      undefined, undefined, ((hoverBorderColor ?? borderColor) ? undefined : 2)).toCSSRgbValue();
                }
                else
                {
                  effectProps.backgroundColor = 'transparent';

                  effectProps.color = (textColor == undefined && checkOfThemeModeColor(backColor))
                    ? ThemePaletteHelper.getColor(backColor, 'main').toCSSRgbValue()
                    : ThemeHelper.getColor(textColor ?? backColor, undefined, false).toCSSRgbValue();

                  // Границы нет
                  effectProps.borderColor = 'transparent';
                  effectProps.borderWidth = borderWidth ?? '1px';
                }
              } break;
            case 'hover':
              {
                if(isSelected)
                {
                  effectProps.backgroundColor = checkOfThemeModeColor(backColor)
                    ? ThemePaletteHelper.getColor(backColor, 'main', 'disabled').toCSSRgbValue()
                    : ThemeHelper.getColor(backColor, hoverBackColor ?? 'palest').toCSSRgbValue();
                }
                else
                {
                  effectProps.backgroundColor = checkOfThemeModeColor(backColor)
                    ? ThemePaletteHelper.getColor(backColor, 'light', 'hover').toCSSRgbValue()
                    : ThemeHelper.getColor(backColor, hoverBackColor ?? 'palest').toCSSRgbValue();
                }

                effectProps.color = (hoverTextColor == undefined && textColor == undefined && checkOfThemeModeColor(backColor))
                  ? ThemePaletteHelper.getColor(backColor, 'main').toCSSRgbValue()
                  : ThemeHelper.getColor(this.getPriorityColor(hoverTextColor, textColor) ?? backColor,
                    ((hoverTextColor ?? textColor) ? (hoverTextColor ?? 'palest') : (hoverBackColor ?? 'palest')),
                    ((hoverTextColor ?? textColor) ? false : true), ((hoverTextColor ?? textColor) ? false : textColorHarmonious)).toCSSRgbValue();

                // Граница обязательна
                effectProps.borderWidth = borderWidth ?? '1px';
                effectProps.borderStyle = borderStyle ?? 'solid';
                effectProps.borderColor = (hoverBorderColor == undefined && borderColor == undefined && checkOfThemeModeColor(backColor))
                  ? ThemePaletteHelper.getColor(backColor, 'main').toCSSRgbValue()
                  : ThemeHelper.getColor(this.getPriorityColor(hoverBorderColor, borderColor) ?? backColor,
                    ((hoverBorderColor ?? borderColor) ? (hoverBorderColor ?? 'palest') : (hoverBackColor ?? 'palest')),
                    undefined, undefined, ((hoverBorderColor ?? borderColor) ? undefined : 2)).toCSSRgbValue();
              } break;
            case 'pressed':
              {
                if(!(context && context.hasRippleEffect))
                {
                  effectProps.backgroundColor = checkOfThemeModeColor(backColor)
                    ? ThemePaletteHelper.getColor(backColor, 'dark', 'active').toCSSRgbValue()
                    : ThemeHelper.getColor(backColor, pressedBackColor ?? 'dark').toCSSRgbValue();
                }

                effectProps.color = (pressedTextColor == undefined && textColor == undefined && checkOfThemeModeColor(backColor))
                  ? ThemePaletteHelper.getColor(backColor, 'main').toCSSRgbValue()
                  : ThemeHelper.getColor(this.getPriorityColor(pressedTextColor, textColor) ?? backColor,
                    ((pressedTextColor ?? textColor) ? (pressedTextColor ?? 'dark') : (pressedBackColor ?? 'dark')),
                    ((pressedTextColor ?? textColor) ? false : true), ((pressedTextColor ?? textColor) ? false : textColorHarmonious)).toCSSRgbValue();

                // Граница обязательна
                effectProps.borderWidth = borderWidth ?? '1px';
                effectProps.borderStyle = borderStyle ?? 'solid';
                effectProps.borderColor = (pressedBorderColor == undefined && borderColor == undefined && checkOfThemeModeColor(backColor))
                  ? ThemePaletteHelper.getColor(backColor, 'main').toCSSRgbValue()
                  : ThemeHelper.getColor(this.getPriorityColor(pressedBorderColor, borderColor) ?? backColor,
                    ((pressedBorderColor ?? borderColor) ? (pressedBorderColor ?? 'dark') : (pressedBackColor ?? 'dark')),
                    undefined, undefined, ((pressedBorderColor ?? borderColor) ? undefined : 2)).toCSSRgbValue();
              } break;
          }
        } break;
      case 'menu':
      case 'input':
        {
          switch (state)
          {
            case 'normal':
              {
                effectProps.backgroundColor = 'initial';

                effectProps.color = (checkOfThemeModeColor(textColor))
                  ? ThemePaletteHelper.getTextColor(textColor, isDisabled ? 'disabled' : undefined).toCSSRgbValue()
                  : ThemeHelper.getForegroundColorByBackProps(backColor, undefined, textColor, undefined, textColorHarmonious).color

                // Граница обязательна
                effectProps.borderWidth = borderWidth ?? '1px';
                effectProps.borderStyle = borderStyle ?? 'solid';
                effectProps.borderColor = (borderColor == undefined && checkOfThemeModeColor(backColor))
                  ? ThemePaletteHelper.getDividerColor().toCSSRgbValue()
                  : ThemeHelper.getColor(borderColor ?? backColor, undefined, undefined, undefined, undefined).toCSSRgbValue();
              } break;
            case 'hover':
              {
                effectProps.backgroundColor = 'initial';

                effectProps.color = (hoverTextColor == undefined && checkOfThemeModeColor(textColor))
                  ? ThemePaletteHelper.getTextColor(textColor, isDisabled ? 'disabled' : undefined).toCSSRgbValue()
                  : ThemeHelper.getForegroundColorByBackProps(backColor, undefined, textColor, undefined, textColorHarmonious).color

                // Граница обязательна
                effectProps.borderWidth = borderWidth ?? '1px';
                effectProps.borderStyle = borderStyle ?? 'solid';
                effectProps.borderColor = (hoverBorderColor == undefined && borderColor == undefined && checkOfThemeModeColor(backColor))
                  ? ThemePaletteHelper.getColor(backColor, 'dark').toCSSRgbValue()
                  : ThemeHelper.getColor(this.getPriorityColor(hoverBorderColor, borderColor) ?? backColor,
                    ((hoverBorderColor ?? borderColor) ? (hoverBorderColor ?? 'palest') : (hoverBackColor ?? 'palest')),
                    undefined, undefined, ((hoverBorderColor ?? borderColor) ? undefined : 2)).toCSSRgbValue();
              } break;
            case 'pressed':
              {
                effectProps.backgroundColor = 'initial';

                effectProps.color = (pressedTextColor == undefined && checkOfThemeModeColor(textColor))
                  ? ThemePaletteHelper.getTextColor(textColor, isDisabled ? 'disabled' : undefined).toCSSRgbValue()
                  : ThemeHelper.getForegroundColorByBackProps(backColor, undefined, textColor, undefined, textColorHarmonious).color

                // Граница обязательна
                effectProps.borderWidth = borderWidth ?? '1px';
                effectProps.borderStyle = borderStyle ?? 'solid';
                effectProps.borderColor = (pressedBorderColor == undefined && borderColor == undefined && checkOfThemeModeColor(backColor))
                  ? ThemePaletteHelper.getColor(backColor, 'dark').toCSSRgbValue()
                  : ThemeHelper.getColor(this.getPriorityColor(pressedBorderColor, borderColor) ?? backColor,
                    ((pressedBorderColor ?? borderColor) ? (pressedBorderColor ?? 'dark') : (pressedBackColor ?? 'dark')),
                    undefined, undefined, ((pressedBorderColor ?? borderColor) ? undefined : 2)).toCSSRgbValue();
              } break;
          }
        } break;
      case 'list':
        {
          switch (state)
          {
            case 'normal':
              {
                if (isSelected)
                {
                  effectProps.backgroundColor = (checkOfThemeModeColor(backColor))
                    ? ThemePaletteHelper.getColor(backColor, 'main').toCSSRgbValue()
                    : ThemeHelper.getColor(backColor ?? 'main').toCSSRgbValue();

                  effectProps.color = (textColor == undefined && checkOfThemeModeColor(backColor))
                    ? ThemePaletteHelper.getColor(backColor, 'contrastText').toCSSRgbValue()
                    : 'initial'
                }
                else
                {
                  effectProps.backgroundColor = 'initial';

                  effectProps.color = (textColor == undefined && checkOfThemeModeColor(backColor))
                    ? ThemePaletteHelper.getTextColor(backColor, isDisabled ? 'disabled' : undefined).toCSSRgbValue()
                    : 'initial'
                }
              } break;
            case 'hover':
              {
                if (isSelected)
                {
                  effectProps.backgroundColor = (checkOfThemeModeColor(backColor))
                    ? ThemePaletteHelper.getColor(backColor, 'light').toCSSRgbValue()
                    : ThemeHelper.getColor(backColor, hoverBackColor ?? 'lighter').toCSSRgbValue();
                }
                else
                {
                  effectProps.backgroundColor = (checkOfThemeModeColor(backColor))
                    ? ThemePaletteHelper.getColor(backColor, 'light').toCSSRgbValue()
                    : ThemeHelper.getColor(backColor, hoverBackColor ?? 'light').toCSSRgbValue();
                }

                effectProps.color = (textColor == undefined && checkOfThemeModeColor(backColor))
                  ? ThemePaletteHelper.getColor(backColor, 'contrastText').toCSSRgbValue()
                  : 'initial'
              } break;
            case 'pressed':
              {
                if (isSelected)
                {
                  effectProps.backgroundColor = (checkOfThemeModeColor(backColor))
                    ? ThemePaletteHelper.getColor(backColor, 'dark', 'selected').toCSSRgbValue()
                    : ThemeHelper.getColor(backColor, pressedBackColor ?? 'darker').toCSSRgbValue();
                }
                else
                {
                  effectProps.backgroundColor = (checkOfThemeModeColor(backColor))
                    ? ThemePaletteHelper.getColor(backColor, 'dark').toCSSRgbValue()
                    : ThemeHelper.getColor(backColor, pressedBackColor ?? 'dark').toCSSRgbValue();
                }

                effectProps.color = (textColor == undefined && checkOfThemeModeColor(backColor))
                  ? ThemePaletteHelper.getColor(backColor, 'contrastText').toCSSRgbValue()
                  : 'initial'
              } break;
          }
        } break;
    }

    return effectProps;
  }
}