import { IOption } from 'lotus-core';
import { TControlSize } from 'ui/types';

export class SelectOptionHelper
{
  public static getMarginOffsetInput(size: TControlSize, isMulti:boolean, hasIcons:boolean, selectedOptions: IOption[]): number
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

    if(selectedOptions.length == 0) 
    {
      switch (size) 
      {
        case 'smaller': return -2;
        case 'small': return -4;
        case 'medium': return -6;
        case 'large': return -6;
      }
    }

    if(hasIcons)
    {
      if(typeof selectedOptions[0].icon == 'string')
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
