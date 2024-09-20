import { CSSProperties } from 'react';
import { ThemeHelper, TThemeColor } from 'ui/theme';

export class InputFieldHelper
{
  public static getBackgroundProps(color: TThemeColor, isBackground?: boolean):CSSProperties
  {
    if (isBackground)
    {
      return ThemeHelper.getBackgroundColorProps(color, 'white');
    }

    return {}
  }
}