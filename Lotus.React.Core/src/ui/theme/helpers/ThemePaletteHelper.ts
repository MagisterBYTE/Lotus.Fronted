import { Color, Colors } from 'lotus-core';
import { Theme, TThemeModeColor } from '../types';
import { IThemePaletteModeColor, TThemePaletteActionType, TThemePaletteModeColorType } from '../types/ThemePaletteTypes';

export class ThemePaletteHelper
{
  public static getPaletteModeColor(color: TThemeModeColor): IThemePaletteModeColor
  {
    switch (color)
    {
      case 'primary': return Theme.currentPalette.primary;
      case 'secondary': return Theme.currentPalette.secondary;
      case 'error': return Theme.currentPalette.error;
      case 'warning': return Theme.currentPalette.warning;
      case 'info': return Theme.currentPalette.info;
      case 'success': return Theme.currentPalette.success;
    }

    return Theme.currentPalette.primary;
  }

  public static getColor(color: TThemeModeColor, colorType: TThemePaletteModeColorType, actionType?: TThemePaletteActionType): Color
  {
    const palette = ThemePaletteHelper.getPaletteModeColor(color);

    if (actionType)
    {
      let opacity = 0.2;
      switch (actionType)
      {
        case 'active': opacity = Theme.currentPalette.action.activatedOpacity; break;
        case 'hover': opacity = Theme.currentPalette.action.hoverOpacity; break;
        case 'selected': opacity = Theme.currentPalette.action.selectedOpacity; break;
        case 'disabled': opacity = Theme.currentPalette.action.disabledOpacity; break;
        case 'focus': opacity = Theme.currentPalette.action.focusOpacity; break;
      }

      switch (colorType)
      {
        case 'main': return new Color(palette.main).toModifyAlpha(opacity);
        case 'light': return new Color(palette.light).toModifyAlpha(opacity);
        case 'dark': return new Color(palette.dark).toModifyAlpha(opacity);
        case 'contrastText': return new Color(palette.contrastText).toModifyAlpha(opacity);
      }
    }
    else
    {
      switch (colorType)
      {
        case 'main': return new Color(palette.main);
        case 'light': return new Color(palette.light);
        case 'dark': return new Color(palette.dark);
        case 'contrastText': return new Color(palette.contrastText);
      }
    }

    return Colors.red;
  }

  public static getTextColor(color: TThemeModeColor, actionType?: TThemePaletteActionType): Color
  {
    if (actionType)
    {
      switch (actionType)
      {
        case 'active':
        case 'hover':
        case 'selected':
        case 'disabled': return new Color(Theme.currentPalette.text.disabled);
        case 'focus':
      }
    }

    if (color == 'primary')
    {
      return new Color(Theme.currentPalette.text.primary);
    }

    return new Color(Theme.currentPalette.text.secondary);
  }

  public static getDividerColor(): Color
  {
    return new Color(Theme.currentPalette.divider);
  }
}