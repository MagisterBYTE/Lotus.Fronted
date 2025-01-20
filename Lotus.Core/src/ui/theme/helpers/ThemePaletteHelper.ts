import { Color, Colors } from 'modules/color';
import { IThemePaletteColor, Theme, TThemeColorVariant, TThemePaletteActionType, TThemePaletteComponentStructuralPart } from '../types';
import { ThemeColorVariantHelper } from './ThemeColorVariantHelper';

export class ThemePaletteHelper
{
  /**
   * Получить степень прозрачности 
   * @param actionType Тип действия
   */
  public static getOpacity(actionType?: TThemePaletteActionType): number | undefined
  {
    let opacity: number | undefined = undefined;
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
   * Получить палитру цвета
   * @param color Вариант цвета темы
   */
  public static getPaletteColor(color: TThemeColorVariant): IThemePaletteColor | undefined
  {
    const colorData = ThemeColorVariantHelper.deconstruction(color);
    if (!colorData) return;

    const palette = Theme.currentPalette.colors[colorData.themeColor];
    
    // eslint-disable-next-line consistent-return
    return palette;
  }

  /**
   * Получить цвет текущей темы
   * @param color Вариант цвета темы
   * @param actionType Тип действия
   * @returns Цвет
   */
  public static getElementColor(color: TThemeColorVariant, actionType?: TThemePaletteActionType): Color
  {
    const colorData = ThemeColorVariantHelper.deconstruction(color);
    if (!colorData) return Colors.red;

    const palette = Theme.currentPalette.colors[colorData.themeColor];
    return palette.variants.getByName(colorData.colorVariant, ThemePaletteHelper.getOpacity(actionType));
  }

  /**
   * Получить цвет текста текущей темы
   * @param color Вариант цвета темы
   * @param allColor Если True то будет браться не только основной или дополнительный цвет
   * @param actionType Тип действия
   * @returns Цвет
   */
  public static getTextColor(color: TThemeColorVariant, allColor: boolean, actionType?: TThemePaletteActionType): Color
  {
    const colorData = ThemeColorVariantHelper.deconstruction(color);
    if (!colorData) return Colors.red;

    let opacity: number | undefined = undefined;
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

    if (allColor)
    {
      if (colorData.themeColor !== 'primary' && colorData.themeColor !== 'secondary')
      {
        const palette = Theme.currentPalette.colors[colorData.themeColor];
        return palette.variants.getByName(colorData.colorVariant, opacity);
      }
    }
    if (colorData.themeColor == 'primary')
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
   * @param color Вариант цвета темы
   * @param allColor Если True то будет браться не только основной или дополнительный цвет
   * @param actionType Тип действия
   * @returns Цвет
   */
  public static getBackgroundColor(color: TThemeColorVariant, allColor: boolean, actionType?: TThemePaletteActionType): Color
  {
    const colorData = ThemeColorVariantHelper.deconstruction(color);
    if (!colorData) return Colors.red;

    let opacity: number | undefined = undefined;
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

    if (allColor)
    {
      if (colorData.themeColor !== 'primary' && colorData.themeColor !== 'secondary')
      {
        const palette = Theme.currentPalette.colors[colorData.themeColor];
        return palette.variants.getByName(colorData.colorVariant, opacity);
      }
    }
    if (colorData.themeColor == 'primary')
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
   * @param color Вариант цвета темы
   * @param allColor Если True то будет браться не только основной или дополнительный цвет
   * @param actionType Тип действия
   * @returns Цвет
   */
  public static getBorderColor(color: TThemeColorVariant, allColor: boolean, actionType?: TThemePaletteActionType): Color
  {
    const colorData = ThemeColorVariantHelper.deconstruction(color);
    if (!colorData) return Colors.red;

    let opacity: number | undefined = undefined;
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

    if (allColor)
    {
      if (colorData.themeColor !== 'primary' && colorData.themeColor !== 'secondary')
      {
        const palette = Theme.currentPalette.colors[colorData.themeColor];
        return palette.variants.getByName(colorData.colorVariant, opacity);
      }
    }
    if (colorData.themeColor == 'primary')
    {
      return Theme.currentPalette.border.primary.toModifyAlphaOrThis(opacity);
    }
    else
    {
      return Theme.currentPalette.border.secondary.toModifyAlphaOrThis(opacity);
    }
  }

  /**
   * Получить цвет текущей темы для указанной структурной части элемента
   * @param part Структурная часть UI
   * @param color Вариант цвета темы
   * @param actionType Тип действия
   * @returns Цвет
   */
  public static getColorByStructuralPart(part: TThemePaletteComponentStructuralPart, color: TThemeColorVariant, actionType?: TThemePaletteActionType): Color
  {
    switch (part)
    {
      case 'element': return ThemePaletteHelper.getElementColor(color, actionType);
      case 'background': return ThemePaletteHelper.getBackgroundColor(color, true, actionType);
      case 'text': return ThemePaletteHelper.getTextColor(color, true, actionType);
      case 'border': return ThemePaletteHelper.getBorderColor(color, true, actionType);
    }

    return Colors.red;
  }
}