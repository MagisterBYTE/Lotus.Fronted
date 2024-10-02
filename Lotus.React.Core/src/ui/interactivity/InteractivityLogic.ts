/* eslint-disable @typescript-eslint/no-unused-vars */
import { CSSProperties } from 'react';
import { Theme } from 'ui/theme';
import { Color } from 'lotus-core';
import { hasBorderProps } from 'ui/components';
import { TInteractivityModel } from './InteractivityModel';
import { TInteractivityState } from './InteractivityState';
import { IInteractivityElement } from './InteractivityElement';

/**
 * Логика применения визуальных эффектов к элементу UI в зависимости от модель применения и состояния интерактивности элемента
 */
export class InteractivityLogic
{
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
    isSelected?: boolean, isDisabled?: boolean, isFocused?: boolean): CSSProperties
  {
    const {
      backColor, hoverBackColor, pressedBackColor,
      textColor, hoverTextColor, pressedTextColor, textColorHarmonious,
      borderRadius, borderStyle, borderWidth,
      borderColor, hoverBorderColor, pressedBorderColor
    } = elem

    const effectProps: CSSProperties = {};

    switch (model)
    {
      case 'filled':
        {
          switch (state)
          {
            case 'normal':
              {
                effectProps.backgroundColor = Theme.getColor(backColor).toCSSRgbValue();

                effectProps.color = Theme.getColor(textColor ?? backColor, undefined, 
                  (textColor ? false : true),
                  (textColor ? false : textColorHarmonious)).toCSSRgbValue();
                
                // Граница произвольна
                if(hasBorderProps(elem))
                {
                  effectProps.borderWidth = borderWidth ?? '1px';
                  effectProps.borderStyle = borderStyle ?? 'solid';
                  effectProps.borderColor = Theme.getColor(borderColor ?? backColor, undefined, undefined, undefined,
                    ((borderColor) ? undefined : 2)).toCSSRgbValue();
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
                effectProps.backgroundColor = Theme.getColor(backColor, hoverBackColor ?? 'palest').toCSSRgbValue();

                effectProps.color = Theme.getColor(hoverTextColor ?? (textColor ?? (hoverBackColor ?? backColor)),
                  ((hoverTextColor ?? textColor) ? undefined : ((!hoverBackColor && backColor instanceof Color) ? 'palest' : undefined)),
                  ((hoverTextColor ?? textColor) ? false : true), 
                  ((hoverTextColor ?? textColor) ? false : textColorHarmonious)).toCSSRgbValue();

                // Граница произвольна
                if(hasBorderProps(elem))
                {
                  effectProps.borderWidth = borderWidth ?? '1px';
                  effectProps.borderStyle = borderStyle ?? 'solid';
                  effectProps.borderColor = Theme.getColor(hoverBorderColor ?? (borderColor ?? (hoverBackColor ?? backColor)), 
                    undefined,
                    undefined, undefined, ((hoverBorderColor ?? borderColor) ? undefined : 2)).toCSSRgbValue();
                }
                else
                {
                  // Убираем по умолчанию
                  effectProps.border = 'none';
                }
              } break;
            case 'pressed':
              {
                effectProps.backgroundColor = Theme.getColor(backColor, pressedBackColor ?? 'dark').toCSSRgbValue();

                effectProps.color = Theme.getColor(pressedTextColor ?? (textColor ?? (pressedBackColor ?? backColor)),
                  ((hoverTextColor ?? textColor) ? undefined : ((!hoverBackColor && backColor instanceof Color) ? 'dark' : undefined)), 
                  ((pressedTextColor ?? textColor) ? false : true), 
                  ((pressedTextColor ?? textColor) ? false : textColorHarmonious)).toCSSRgbValue();

                // Граница произвольна
                if(hasBorderProps(elem))
                {
                  effectProps.borderWidth = borderWidth ?? '1px';
                  effectProps.borderStyle = borderStyle ?? 'solid';
                  effectProps.borderColor = Theme.getColor(pressedBorderColor ?? (borderColor ?? (pressedBackColor ?? backColor)), 
                    undefined,
                    undefined, undefined, ((pressedBorderColor ?? borderColor) ? undefined : 2)).toCSSRgbValue();
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
                effectProps.backgroundColor = 'transparent';

                effectProps.color = Theme.getColor(textColor ?? backColor).toCSSRgbValue();

                // Граница обязательна
                effectProps.borderWidth = borderWidth ?? '1px';
                effectProps.borderStyle = borderStyle ?? 'solid';
                effectProps.borderColor = Theme.getColor(borderColor ?? backColor).toCSSRgbValue();
              } break;
            case 'hover':
              {
                effectProps.backgroundColor = Theme.getColor(backColor, hoverBackColor ?? 'palest').toCSSRgbValue();

                effectProps.color = Theme.getColor(hoverTextColor ?? textColor ?? backColor,
                  ((hoverTextColor ?? textColor) ? undefined : (hoverBackColor ?? 'palest')),
                  ((hoverTextColor ?? textColor) ? false : true), ((hoverTextColor ?? textColor) ? false : textColorHarmonious)).toCSSRgbValue();

                // Граница обязательна
                effectProps.borderWidth = borderWidth ?? '1px';
                effectProps.borderStyle = borderStyle ?? 'solid';
                effectProps.borderColor = Theme.getColor(hoverBorderColor ?? borderColor ?? backColor,
                  ((hoverBorderColor ?? borderColor) ? undefined : (hoverBackColor ?? 'palest')),
                  undefined, undefined, ((hoverBorderColor ?? borderColor) ? undefined : 2)).toCSSRgbValue();
              } break;
            case 'pressed':
              {
                effectProps.backgroundColor = Theme.getColor(backColor, pressedBackColor ?? 'dark').toCSSRgbValue();

                effectProps.color = Theme.getColor(pressedTextColor ?? textColor ?? backColor,
                  ((pressedTextColor ?? textColor) ? undefined : (pressedBackColor ?? 'dark')),
                  ((pressedTextColor ?? textColor) ? false : true), ((pressedTextColor ?? textColor) ? false : textColorHarmonious)).toCSSRgbValue();

                // Граница обязательна
                effectProps.borderWidth = borderWidth ?? '1px';
                effectProps.borderStyle = borderStyle ?? 'solid';
                effectProps.borderColor = Theme.getColor(pressedBorderColor ?? borderColor ?? backColor,
                  ((pressedBorderColor ?? borderColor) ? undefined : (pressedBackColor ?? 'dark')),
                  undefined, undefined, ((pressedBorderColor ?? borderColor) ? undefined : 2)).toCSSRgbValue();
              } break;
          }
        } break;
      case 'text':
        {
          switch (state)
          {
            case 'normal':
              {
                effectProps.backgroundColor = 'transparent';

                effectProps.color = Theme.getColor(textColor ?? backColor).toCSSRgbValue();

                // Граница нет
                effectProps.border = 'none';
                effectProps.borderColor = 'transparent';
              } break;
            case 'hover':
              {
                effectProps.backgroundColor = Theme.getColor(backColor, hoverBackColor ?? 'palest').toCSSRgbValue();

                effectProps.color = Theme.getColor(hoverTextColor ?? textColor ?? backColor,
                  ((hoverTextColor ?? textColor) ? undefined : (hoverBackColor ?? 'palest')),
                  ((hoverTextColor ?? textColor) ? false : true), ((hoverTextColor ?? textColor) ? false : textColorHarmonious)).toCSSRgbValue();

                // Граница нет
                effectProps.border = 'none';
                effectProps.borderColor = 'transparent';
              } break;
            case 'pressed':
              {
                effectProps.backgroundColor = Theme.getColor(backColor, pressedBackColor ?? 'dark').toCSSRgbValue();

                effectProps.color = Theme.getColor(pressedTextColor ?? textColor ?? backColor,
                  ((pressedTextColor ?? textColor) ? undefined : (pressedBackColor ?? 'dark')),
                  ((pressedTextColor ?? textColor) ? false : true), ((pressedTextColor ?? textColor) ? false : textColorHarmonious)).toCSSRgbValue();

                // Граница нет
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
                effectProps.backgroundColor = 'transparent';

                effectProps.color = Theme.getColor(textColor ?? backColor, undefined, false).toCSSRgbValue();

                // Граница нет
                effectProps.border = 'none';
                effectProps.borderColor = 'transparent';
              } break;
            case 'hover':
              {
                effectProps.backgroundColor = Theme.getColor(backColor, hoverBackColor ?? 'palest').toCSSRgbValue();

                effectProps.color = Theme.getColor(hoverTextColor ?? textColor ?? backColor,
                  ((hoverTextColor ?? textColor) ? undefined : (hoverBackColor ?? 'palest')),
                  ((hoverTextColor ?? textColor) ? false : true), ((hoverTextColor ?? textColor) ? false : textColorHarmonious)).toCSSRgbValue();

                // Граница обязательна
                effectProps.borderWidth = borderWidth ?? '1px';
                effectProps.borderStyle = borderStyle ?? 'solid';
                effectProps.borderColor = Theme.getColor(hoverBorderColor ?? borderColor ?? backColor,
                  ((hoverBorderColor ?? borderColor) ? undefined : (hoverBackColor ?? 'palest')),
                  undefined, undefined, ((hoverBorderColor ?? borderColor) ? undefined : 2)).toCSSRgbValue();
              } break;
            case 'pressed':
              {
                effectProps.backgroundColor = Theme.getColor(backColor, pressedBackColor ?? 'dark').toCSSRgbValue();

                effectProps.color = Theme.getColor(pressedTextColor ?? textColor ?? backColor,
                  ((pressedTextColor ?? textColor) ? undefined : (pressedBackColor ?? 'dark')),
                  ((pressedTextColor ?? textColor) ? false : true), ((pressedTextColor ?? textColor) ? false : textColorHarmonious)).toCSSRgbValue();

                // Граница обязательна
                effectProps.borderWidth = borderWidth ?? '1px';
                effectProps.borderStyle = borderStyle ?? 'solid';
                effectProps.borderColor = Theme.getColor(pressedBorderColor ?? borderColor ?? backColor,
                  ((pressedBorderColor ?? borderColor) ? undefined : (pressedBackColor ?? 'dark')),
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

                effectProps.color = textColor ? Theme.getColor(textColor ?? backColor).toCSSRgbValue() : Theme.currentPalette.text.primary;

                // Граница обязательна
                effectProps.borderWidth = borderWidth ?? '1px';
                effectProps.borderStyle = borderStyle ?? 'solid';
                effectProps.borderColor = Theme.getColor(borderColor ?? backColor).toCSSRgbValue();
              } break;
            case 'hover':
              {
                effectProps.backgroundColor = 'initial';

                effectProps.color = textColor ? Theme.getColor(textColor ?? backColor).toCSSRgbValue() : Theme.currentPalette.text.primary;

                // Граница обязательна
                effectProps.borderWidth = borderWidth ?? '1px';
                effectProps.borderStyle = borderStyle ?? 'solid';
                effectProps.borderColor = Theme.getColor(hoverBorderColor ?? borderColor ?? backColor,
                  ((hoverBorderColor ?? borderColor) ? undefined : (hoverBackColor ?? 'palest')),
                  undefined, undefined, ((hoverBorderColor ?? borderColor) ? undefined : 2)).toCSSRgbValue();
              } break;
            case 'pressed':
              {
                effectProps.backgroundColor = 'initial';

                effectProps.color = textColor ? Theme.getColor(textColor ?? backColor).toCSSRgbValue() : Theme.currentPalette.text.primary;

                // Граница обязательна
                effectProps.borderWidth = borderWidth ?? '1px';
                effectProps.borderStyle = borderStyle ?? 'solid';
                effectProps.borderColor = Theme.getColor(pressedBorderColor ?? borderColor ?? backColor,
                  ((pressedBorderColor ?? borderColor) ? undefined : (pressedBackColor ?? 'dark')),
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
                effectProps.backgroundColor = 'initial';
              } break;
            case 'hover':
              {
                effectProps.backgroundColor = Theme.getColor(backColor, hoverBackColor).toCSSRgbValue();
              } break;
            case 'pressed':
              {
                effectProps.backgroundColor = Theme.getColor(backColor, pressedBackColor).toCSSRgbValue();
              } break;
          }
        } break;
    }

    return effectProps;
  }
}