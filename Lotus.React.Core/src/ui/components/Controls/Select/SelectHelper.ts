import { ThemeHelper } from 'ui/theme';
import { ISelectOption } from 'lotus-core';
import { CSSProperties } from 'react';
import { TColorType, TControlPadding, TControlSize } from 'ui/types';

export class SelectHelper
{
  public static getGapFromSize(size: TControlSize, controlPadding: TControlPadding): number
  {
    switch (size) 
    {
      case 'smaller':
        {
          switch(controlPadding)
          {
            case 'minimum': return 0.12;
            case 'normal': return 0.15;
            case 'enlarged': return 0.2;
          }
        }break;
      case 'small':
        {
          switch(controlPadding)
          {
            case 'minimum': return 0.15;
            case 'normal': return 0.2;
            case 'enlarged': return 0.25;
          }
        }break;
      case 'medium':
        {
          switch(controlPadding)
          {
            case 'minimum': return 0.25;
            case 'normal': return 0.3;
            case 'enlarged': return 0.375;
          }
        }break;
      case 'large':
        {
          switch(controlPadding)
          {
            case 'minimum': return 0.2;
            case 'normal': return 0.35;
            case 'enlarged': return 0.45;
          }
        }break;
    }

    return 0.3;
  }

  public static getBorderColorProps(color: TColorType, isDisabled: boolean, isFocused: boolean): CSSProperties
  {
    if (isDisabled)
    {
      return { borderColor: `${ThemeHelper.getBorderProps(color).borderColor}`, ...ThemeHelper.getOpacityForDisabledProps() };
    }
    else
    {
      if (isFocused)
      {
        return { borderColor: `${ThemeHelper.getBorderProps(color).borderColor}` };
      }
      else
      {
        return { borderColor: `${ThemeHelper.getBorderProps(color).borderColor}` };
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
        return ThemeHelper.getBorderShadowProps(color);
      }
      else
      {
        return {};
      }
    }
  }

  public static getFlexContainer(size: TControlSize, controlPadding: TControlPadding): CSSProperties
  {
    return {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      columnGap: `${SelectHelper.getGapFromSize(size, controlPadding)}rem`
    }
  }

  public static getMarginOffsetInput(size: TControlSize, data: ISelectOption|undefined): number
  {
    if(!data) 
    {
      switch (size) 
      {
        case 'smaller': return -4;
        case 'small': return -4;
        case 'medium': return -6;
        case 'large': return -8;
      }
    }

    if(typeof data.icon == 'string')
    {
      switch (size) 
      {
        case 'smaller': return 10;
        case 'small': return 10;
        case 'medium': return 12;
        case 'large': return 18;
      }
    }
    else
    {
      switch (size) 
      {
        case 'smaller': return 14;
        case 'small': return 16;
        case 'medium': return 18;
        case 'large': return 24;
      }
    }

    return 2;
  }

  public static getMarginOffsetSingleValue(size: TControlSize, data: ISelectOption): number
  {
    if(typeof data.icon == 'string')
    {
      switch (size) 
      {
        case 'smaller': return -2;
        case 'small': return -2;
        case 'medium': return -4;
        case 'large': return -2;
      }
    }
    else
    {
      switch (size) 
      {
        case 'smaller': return -2;
        case 'small': return -2;
        case 'medium': return -4;
        case 'large': return -2;
      }
    }

    return -4;
  }
}
