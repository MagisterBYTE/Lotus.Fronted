import type * as CSS from 'csstype';
import { Color, TColorVariantName } from 'modules/color';
import { Theme, TThemeColor, TThemePaletteActionType } from '../types';

export class ThemePaletteHelper
{
  /**
   * Получить степень прозрачности 
   * @param actionType Тип действия
   */
  public static getOpacity(actionType?: TThemePaletteActionType):number|undefined
  {
    let opacity:number|undefined = undefined;
    if (actionType)
    {
      switch (actionType)
      {
        case 'active': opacity = Theme.currentPalette.action.activatedOpacity; break;
        case 'hover': opacity = Theme.currentPalette.action.hoverOpacity; break;
        case 'selected': opacity = Theme.currentPalette.action.selectedOpacity; break;
        case 'disabled': opacity = Theme.currentPalette.action.disabledOpacity; break;
        case 'focus': opacity = Theme.currentPalette.action.focusOpacity; break;
      }
    }

    return opacity;
  }

  /**
   * Получить цвет текущей темы
   * @param color Тип цвета
   * @param colorVariant Вариант цвета
   * @param actionType Тип действия
   * @returns Цвет
   */
  public static getColor(color: TThemeColor, colorVariant?:TColorVariantName, actionType?: TThemePaletteActionType): Color
  {
    const palette = Theme.currentPalette.colors[color];
    return palette.variants.getByName(colorVariant, ThemePaletteHelper.getOpacity(actionType));
  }

  /**
   * Получить цвет текста для указанного цвета текущей темы 
   * @param color Тип цвета
   * @param colorVariant Вариант цвета
   * @param isHarmonious Гармоничный или контрастный цвет текста для данного фона
   * @returns Цвет
   */
  public static getColorForText(color: TThemeColor, colorVariant?:TColorVariantName, isHarmonious?:boolean): Color
  {
    const palette = Theme.currentPalette.colors[color];
    return palette.onText(colorVariant ?? 'main', isHarmonious)
  }

  public static getColorBackAndTextForFilled(backColor: TThemeColor, backColorVariant?:TColorVariantName, actionType?: TThemePaletteActionType,
    textColor?: TThemeColor, textColorVariant?:TColorVariantName, isHarmonious?:boolean):CSS.Properties
  {
    const paletteBack = Theme.currentPalette.colors[backColor];

    const css:CSS.Properties = {};

    css.backgroundColor = paletteBack.variants.getByName(backColorVariant, ThemePaletteHelper.getOpacity(actionType)).toCSSRgbValue();

    // Если указан цвет
    if(textColor)
    {
      // Они равны 
      if(textColor == backColor && backColorVariant == textColorVariant)
      {
        // Возвращаем цвет текста
        css.color = paletteBack.onText(backColorVariant ?? 'main', isHarmonious).toCSSRgbValue();
      }
      else
      {
        const paletteText = Theme.currentPalette.colors[textColor];
        css.color = paletteText.variants.getByName(textColorVariant, ThemePaletteHelper.getOpacity(actionType)).toCSSRgbValue();
      }
    }
    else
    {
      // Возвращаем цвет текста
      css.color = paletteBack.onText(backColorVariant ?? 'main', isHarmonious).toCSSRgbValue();
    }

    return css;
  }

  /**
   * Получить цвет текста текущей темы
   * @param color Тип цвета
   * @param allColor Если True то будет браться не только основной или дополнительный цвет
   * @param colorVariant Вариант цвета, используется если только указан allColor
   * @param actionType Тип действия
   * @returns Цвет
   */
  public static getTextColor(color: TThemeColor, allColor:boolean, colorVariant?:TColorVariantName, actionType?: TThemePaletteActionType): Color
  {  
    let opacity:number|undefined = undefined;
    if (actionType)
    {
      switch (actionType)
      {
        case 'active': opacity = Theme.currentPalette.action.activatedOpacity; break;
        case 'hover': opacity = Theme.currentPalette.action.hoverOpacity; break;
        case 'selected': opacity = Theme.currentPalette.action.selectedOpacity; break;
        case 'disabled': opacity = Theme.currentPalette.text.disabledOpacity; break;
        case 'focus': opacity = Theme.currentPalette.action.focusOpacity; break;
      }
    }
    
    if(allColor)
    {
      if(color !== 'primary' && color !== 'secondary')
      {
        const palette = Theme.currentPalette.colors[color];
        return palette.variants.getByName(colorVariant, opacity);
      }
    }
    if (color == 'primary')
    {
      return Theme.currentPalette.text.primary.toModifyAlphaOrThis(opacity);
    }
    else
    {
      return Theme.currentPalette.text.secondary.toModifyAlphaOrThis(opacity);
    }
  }

  /**
   * Получить цвет фона текущей темы
   * @param color Тип цвета
   * @param allColor Если True то будет браться не только основной или дополнительный цвет
   * @param colorVariant Вариант цвета, используется если только указан allColor
   * @param actionType Тип действия
   * @returns Цвет
   */
  public static getBackgroundColor(color: TThemeColor, allColor:boolean, colorVariant?:TColorVariantName, actionType?: TThemePaletteActionType): Color
  {
    let opacity:number|undefined = undefined;
    if (actionType)
    {
      switch (actionType)
      {
        case 'active': opacity = Theme.currentPalette.action.activatedOpacity; break;
        case 'hover': opacity = Theme.currentPalette.action.hoverOpacity; break;
        case 'selected': opacity = Theme.currentPalette.action.selectedOpacity; break;
        case 'disabled': opacity = Theme.currentPalette.background.disabledOpacity; break;
        case 'focus': opacity = Theme.currentPalette.action.focusOpacity; break;
      }
    }
    
    if(allColor)
    {
      if(color !== 'primary' && color !== 'secondary')
      {
        const palette = Theme.currentPalette.colors[color];
        return palette.variants.getByName(colorVariant, opacity);
      }
    }
    if (color == 'primary')
    {
      return Theme.currentPalette.background.default.toModifyAlphaOrThis(opacity);
    }
    else
    {
      return Theme.currentPalette.background.secondary.toModifyAlphaOrThis(opacity);
    }
  }

  /**
   * Получить цвет границы текущей темы
   * @param color Тип цвета
   * @param allColor Если True то будет браться не только основной или дополнительный цвет
   * @param colorVariant Вариант цвета, используется если только указан allColor
   * @param actionType Тип действия
   * @returns Цвет
   */
  public static getBorderColor(color: TThemeColor, allColor:boolean, colorVariant?:TColorVariantName, actionType?: TThemePaletteActionType): Color
  {
    let opacity:number|undefined = undefined;
    if (actionType)
    {
      switch (actionType)
      {
        case 'active': opacity = Theme.currentPalette.action.activatedOpacity; break;
        case 'hover': opacity = Theme.currentPalette.action.hoverOpacity; break;
        case 'selected': opacity = Theme.currentPalette.action.selectedOpacity; break;
        case 'disabled': opacity = Theme.currentPalette.border.disabledOpacity; break;
        case 'focus': opacity = Theme.currentPalette.action.focusOpacity; break;
      }
    }
    
    if(allColor)
    {
      if(color !== 'primary' && color !== 'secondary')
      {
        const palette = Theme.currentPalette.colors[color];
        return palette.variants.getByName(colorVariant, opacity);
      }
    }
    if (color == 'primary')
    {
      return Theme.currentPalette.border.primary.toModifyAlphaOrThis(opacity);
    }
    else
    {
      return Theme.currentPalette.border.secondary.toModifyAlphaOrThis(opacity);
    }
  }
}