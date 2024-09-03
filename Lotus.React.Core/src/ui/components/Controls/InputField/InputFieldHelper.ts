import { TColorType, TControlState } from 'ui/types';

export class InputFieldHelper
{
  public static getBorderColorProps(color: TColorType, state: TControlState)
  {
    switch (state)
    {
      case 'normal':
        return `border-color: var(--lotus-color-${'border'});`
      case 'hover':
        return `border-color: var(--lotus-color-${color});`
      case 'pressed':
        return `border-color: var(--lotus-color-${color});`
      case 'selected':
      case 'focus':
        return `border-color: var(--lotus-color-${color}); box-shadow: 0px 0px 0px 3px var(--lotus-shadow-${color});`
      case 'disabled':
        return `border-color: var(--lotus-color-${'border'});`
    }

    return ''
  }

  public static getBackgroundProps(color: TColorType, isBackground?: boolean)
  {
    if (isBackground && isBackground === true)
    {
      return `background-color: var(--lotus-color-${color}Palest);`
    }

    return ''
  }
}
