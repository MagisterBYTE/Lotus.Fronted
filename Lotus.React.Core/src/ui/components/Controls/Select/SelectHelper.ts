import { CSSProperties } from 'react';
import { TColorType, TControlSize } from 'ui/types';

export class SelectHelper
{
  private static getGapFromSize(size: TControlSize): number
  {
    switch (size) 
    {
      case 'smaller': return 0.3;
      case 'small': return 0.35;
      case 'medium': return 0.5;
      case 'large': return 0.65;
    }

    return 0.5;
  }

  public static getMainContainerHeightFromSize(size: TControlSize): number
  {
    switch (size) 
    {
      case 'smaller': return 22;
      case 'small': return 28;
      case 'medium': return 36;
      case 'large': return 44;
    }

    return 36;
  }

  public static getBorderColorProps(color: TColorType, isDisabled: boolean, isFocused: boolean): CSSProperties
  {
    if (isDisabled)
    {
      return { borderColor: 'var(--lotus-color-border)' };
    }
    else
    {
      if (isFocused)
      {
        return { borderColor: `var(--lotus-color-${color})` };
      }
      else
      {
        return { borderColor: 'var(--lotus-color-border)' };
      }
    }
  }

  public static getBoxShadowProps(color: TColorType, isDisabled: boolean, isFocused: boolean): CSSProperties
  {
    if (isDisabled)
    {
      return {};
    }
    else
    {
      if (isFocused)
      {
        return { boxShadow: `0px 0px 0px 3px var(--lotus-shadow-${color})` }
      }
      else
      {
        return {};
      }
    }
  }

  public static getFlexContainer(size: TControlSize): CSSProperties
  {
    return {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: `${SelectHelper.getGapFromSize(size)}rem`
    }
  }

  public static getMarginOffsetInput(size: TControlSize): number
  {
    switch (size) 
    {
      case 'smaller': return 14;
      case 'small': return 18;
      case 'medium': return 22;
      case 'large': return 24;
    }

    return 32;
  }

  public static getMarginOffsetSingleValue(size: TControlSize): number
  {
    switch (size) 
    {
      case 'smaller': return -4;
      case 'small': return -4;
      case 'medium': return -4;
      case 'large': return -6;
    }

    return -4;
  }

  public static getPaddingLeftOption(size: TControlSize): number
  {
    switch (size) 
    {
      case 'smaller': return 6;
      case 'small': return 8;
      case 'medium': return 10;
      case 'large': return 12;
    }

    return 12;
  }
}
