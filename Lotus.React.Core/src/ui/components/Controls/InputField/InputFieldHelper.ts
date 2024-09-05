import { ThemeHelper } from 'app/theme';
import { TColorType, TControlState } from 'ui/types';

export class InputFieldHelper
{
  public static getBorderColorProps(color: TColorType, state: TControlState)
  {
    switch (state)
    {
      case 'normal':
        return `border-color: ${ThemeHelper.getBorderColorVar(color)}`
      case 'hover':
        return `border-color:  ${ThemeHelper.getBorderColorVar(color)}`
      case 'pressed':
        return `border-color: ${ThemeHelper.getBorderColorVar(color)}`
      case 'selected':
      case 'focus':
        return `border-color: ${ThemeHelper.getBorderColorVar(color)} box-shadow: 0px 0px 0px 3px ${ThemeHelper.getBorderColorVar(color, 'alpha04')}`
      case 'disabled':
        return `border-color: var(--lotus-color-${'border'});`
    }

    return ''
  }

  public static getBackgroundProps(color: TColorType, isBackground?: boolean)
  {
    if (isBackground && isBackground === true)
    {
      return `background-color: ${ThemeHelper.getBackgroundColorVar(color, 'palest')}`
    }

    return ''
  }
}
