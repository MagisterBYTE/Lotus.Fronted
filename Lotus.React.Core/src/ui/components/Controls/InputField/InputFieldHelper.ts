import { ThemeHelper } from 'app/theme';
import { TColorAccent, TColorType, TControlState } from 'ui/types';

export class InputFieldHelper
{
  public static getBorderColorProps(color: TColorType, state: TControlState)
  {
    switch (state)
    {
      case 'normal':
        return `border-color: ${ThemeHelper.getBorderPropsAsCSS(color).borderColor}`
      case 'hover':
        return `border-color:  ${ThemeHelper.getBorderPropsAsCSS(color).borderColor}`
      case 'pressed':
        return `border-color: ${ThemeHelper.getBorderPropsAsCSS(color).borderColor}`
      case 'selected':
      case 'focus':
        return `border-color: ${ThemeHelper.getBorderPropsAsCSS(color).borderColor} ${ThemeHelper.getBorderShadowPropsAsText(color)}`
      case 'disabled':
        return `border-color:  ${ThemeHelper.getBorderPropsAsCSS(color).borderColor}`
    }

    return ''
  }

  public static getBackgroundProps(color: TColorType, isBackground?: boolean)
  {
    if (isBackground && isBackground === true)
    {
      const colorAccent:TColorAccent|undefined = (color == 'main' || color == 'secondary') ? undefined : 'palest'; 
      return `background-color: ${ThemeHelper.getBackgroundColorAsCSS(color, colorAccent).backgroundColor}`
    }

    return ''
  }
}
