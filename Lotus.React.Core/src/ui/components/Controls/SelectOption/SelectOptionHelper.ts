import { IOption } from 'lotus-core';
import { CSSProperties } from 'react';
import { TControlPadding, TControlSize } from 'ui/types';

export class SelectOptionHelper
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

  public static getFlexContainer(size: TControlSize, controlPadding: TControlPadding): CSSProperties
  {
    return {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      columnGap: `${SelectOptionHelper.getGapFromSize(size, controlPadding)}rem`
    }
  }

  public static getMarginOffsetInput(size: TControlSize, isMulti?:boolean, hasIcon?:boolean, data?: IOption[]|IOption): number
  {
    if(isMulti)
    {
      switch (size) 
      {
        case 'smaller': return -2;
        case 'small': return -4;
        case 'medium': return -6;
        case 'large': return -6;
      }
    }

    if(!data) 
    {
      switch (size) 
      {
        case 'smaller': return -2;
        case 'small': return -4;
        case 'medium': return -6;
        case 'large': return -6;
      }
    }

    if(hasIcon)
    {
      // @ts-expect-error typeof data.icon
      if(typeof data.icon == 'string')
      {
        switch (size) 
        {
          case 'smaller': return 10;
          case 'small': return 12;
          case 'medium': return 14;
          case 'large': return 18;
        }
      }
      else
      {
        switch (size) 
        {
          case 'smaller': return 11;
          case 'small': return 14;
          case 'medium': return 16;
          case 'large': return 22;
        }
      }
    }
    else
    {
      switch (size) 
      {
        case 'smaller': return -1;
        case 'small': return -3;
        case 'medium': return -5;
        case 'large': return -6;
      }
    }

    return 2;
  }

  public static getMarginOffsetSingleValue(size: TControlSize, data: IOption): number
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
