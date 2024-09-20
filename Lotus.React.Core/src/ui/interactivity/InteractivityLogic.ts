/* eslint-disable @typescript-eslint/no-unused-vars */
import { TColorVariantName } from 'lotus-core';
import { CSSProperties } from 'react';
import { IThemePalette, ThemeData, TThemeColor } from 'ui/theme';
import { TControlSize } from 'ui/types';
import { TInteractivityEffect } from './InteractivityEffect';
import { TInteractivityModel } from './InteractivityModel';
import { InteractivityParams } from './InteractivityParams';
import { TInteractivityState } from './InteractivityState';

/**
 * Логика применения визуальных эффектов к элементу UI в зависимости от модель применения и состояния интерактивности элемента
 */
export class InteractivityLogic
{
  /**
   * Получить визуальный эффекты для элемента UI
   * @param size Размер элемента
   * @param effect Флаги визуальных эффектов
   * @param model Модель применения визуальных эффектов к элементу UI
   * @param state Состояние интерактивности элемента UI
   * @param color Цвет
   * @param isSelected Статус выбора элемента UI
   * @param isDisabled Статус недоступности элемента UI
   * @param isFocused Статус нахождения элемента UI в фокусе
   * @returns Свойства CSSProperties
   */
  public static getEffectProps(size: TControlSize, model: TInteractivityModel, state: TInteractivityState, 
    color: TThemeColor, isSelected?: boolean, isDisabled?: boolean, isFocused?: boolean): CSSProperties
  {
    const palette: IThemePalette = ThemeData[color];
    const effectProps: CSSProperties = {};
    switch (model)
    {
      case 'filled':
        {
          switch (state)
          {
            case 'normal':
            {
              return InteractivityLogic.getProperties(size, palette, 'main',

                // background
                new InteractivityParams(TInteractivityEffect.Color),

                // text
                new InteractivityParams(TInteractivityEffect.Color, true),

                // border
                new InteractivityParams(TInteractivityEffect.Color, 'darker')
              )
            }
            case 'hover':
            {
              return InteractivityLogic.getProperties(size, palette, 'light',

                // background
                new InteractivityParams(TInteractivityEffect.Color),

                // text
                new InteractivityParams(TInteractivityEffect.Color, true),

                // border
                new InteractivityParams(TInteractivityEffect.Color, 'darkest')
              )
            }
            case 'pressed':
            {
              return InteractivityLogic.getProperties(size, palette, 'dark',

                // background
                new InteractivityParams(TInteractivityEffect.Color),

                // text
                new InteractivityParams(TInteractivityEffect.Color, true),

                // border
                new InteractivityParams(TInteractivityEffect.Color, 'darkest')
              )
            }
          }
        } break;
      case 'outline':
        {
          switch (state)
          {
            case 'normal':
            {
              return InteractivityLogic.getProperties(size, palette, 'main',

                // background
                new InteractivityParams(undefined, false, true),

                // text
                new InteractivityParams(TInteractivityEffect.Color, 'main'),

                // border
                new InteractivityParams(TInteractivityEffect.Color, 'main')
              )
            }
            case 'hover':
            {
              return InteractivityLogic.getProperties(size, palette, 'palest',

                // background
                new InteractivityParams(undefined, false, true),

                // text
                new InteractivityParams(TInteractivityEffect.Color, 'darker'),

                // border
                new InteractivityParams(TInteractivityEffect.Color, 'main')
              )
            }
            case 'pressed':
            {
              return InteractivityLogic.getProperties(size, palette, 'main',

                // background
                new InteractivityParams(TInteractivityEffect.Color),

                // text
                new InteractivityParams(TInteractivityEffect.Color, 'palest'),

                // border
                new InteractivityParams(TInteractivityEffect.Color, 'darker')
              )
            }
          }
        } break;
      case 'text':
        {
          switch (state)
          {
            case 'normal':
            {
              return InteractivityLogic.getProperties(size, palette, 'main',

                // background
                new InteractivityParams(undefined, false, true),

                // text
                new InteractivityParams(TInteractivityEffect.Color, 'main'),

                // border
                new InteractivityParams(undefined, false, true)
              )
            }
            case 'hover':
            {
              return InteractivityLogic.getProperties(size, palette, 'palest',

                // background
                new InteractivityParams(TInteractivityEffect.Color),

                // text
                new InteractivityParams(TInteractivityEffect.Color, 'darker'),

                // border
                new InteractivityParams(undefined, false, true)
              )
            }
            case 'pressed':
            {
              return InteractivityLogic.getProperties(size, palette, 'main',

                // background
                new InteractivityParams(TInteractivityEffect.Color),

                // text
                new InteractivityParams(TInteractivityEffect.Color, 'palest'),

                // border
                new InteractivityParams(undefined, false, true)
              )
            }
          }
        } break;
      case 'icon':
        {
          switch (state)
          {
            case 'normal':
            {
              return InteractivityLogic.getProperties(size, palette, 'main',

                // background
                new InteractivityParams(undefined, false, true),

                // text
                new InteractivityParams(TInteractivityEffect.Color, 'main'),

                // border
                new InteractivityParams(undefined, false, true)
              )
            }
            case 'hover':
            {
              return InteractivityLogic.getProperties(size, palette, 'palest',

                // background
                new InteractivityParams(TInteractivityEffect.Color),

                // text
                new InteractivityParams(undefined, false, true),

                // border
                new InteractivityParams(TInteractivityEffect.Color, 'main')
              )
            }
            case 'pressed':
            {
              return InteractivityLogic.getProperties(size, palette, 'main',

                // background
                new InteractivityParams(TInteractivityEffect.Color),

                // text
                new InteractivityParams(undefined, false, true),

                // border
                new InteractivityParams(TInteractivityEffect.Color, 'darker')
              )
            }
          }
        } break;
      case 'menu':
      case 'input':
        {
          switch (state)
          {
            case 'normal':
            {
              return InteractivityLogic.getProperties(size, palette, 'main',

                // background
                new InteractivityParams(undefined),

                // text
                new InteractivityParams(undefined),

                // border
                new InteractivityParams(TInteractivityEffect.Color)
              )
            }
            case 'hover':
            {
              return InteractivityLogic.getProperties(size, palette, 'main',

                // background
                new InteractivityParams(undefined),

                // text
                new InteractivityParams(undefined),

                // border
                new InteractivityParams(TInteractivityEffect.Color)
              )
            }
            case 'pressed':
            {
              return InteractivityLogic.getProperties(size, palette, 'main',

                // background
                new InteractivityParams(undefined),

                // text
                new InteractivityParams(undefined),

                // border
                new InteractivityParams(TInteractivityEffect.Color)
              )
            }
          }
        } break;
    }

    return effectProps;
  }

  /**
   * Получить цвет эффекта Ripple для указанного цвета
   * @param color Цвет
   * @returns Цвет эффекта Ripple в виде строки rgba
   */
  public static getRippleColor(color: TThemeColor): string
  {
    const palette: IThemePalette = ThemeData[color];
    return palette.variants.white.toCSSRgbValue(0.4, true);
  }

  /**
   * Получить свойства в соответствии с заданными параметрами интерактивности
   * @param size Размер элемента UI
   * @param colorVariant Вариант цвета
   * @param background Параметры применения фонового цвета/общего к элементу
   * @param text Параметры применения цвета текста
   * @param border Параметры применения цвета к границе
   * @returns Свойства CSSProperties
   */
  public static getProperties(size:TControlSize, palette: IThemePalette, colorVariant: TColorVariantName, background?: InteractivityParams,
    text?: InteractivityParams, border?: InteractivityParams): CSSProperties
  {
    const effectProps: CSSProperties = {};
    if (background) 
    {
      effectProps.backgroundColor = background.getColorCSSRgbValue(palette, colorVariant);
    }
    if (text) 
    {
      effectProps.color = text.getColorCSSRgbValue(palette, colorVariant);
    }
    if (border) 
    {
      effectProps.borderColor = border.getColorCSSRgbValue(palette, colorVariant);
    }

    return effectProps;
  }
}