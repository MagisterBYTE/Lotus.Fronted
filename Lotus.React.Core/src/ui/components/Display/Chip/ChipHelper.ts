import { TColorType, TControlState } from 'ui/types';
import { ThemeHelper } from 'app/theme';
import { CSSProperties } from 'react';
import { TChipVariant } from './ChipVariant';

export class ChipHelper
{
  public static getBorderColorProps(color: TColorType, variant: TChipVariant, state: TControlState): CSSProperties['borderColor']
  {
    switch (state)
    {
      case 'normal':
        {
          switch (variant)
          {
            case 'filled': return ThemeHelper.getBorderPropsAsCSS(color, 'dark').borderColor;
            case 'outline': return ThemeHelper.getBorderPropsAsCSS(color).borderColor;
          }
        } break;
      case 'hover':
        switch (variant)
        {
          case 'filled': return ThemeHelper.getBorderPropsAsCSS(color, 'dark').borderColor;
          case 'outline': return ThemeHelper.getBorderPropsAsCSS(color, 'dark').borderColor;
        } break;
      case 'pressed':
        switch (variant)
        {
          case 'filled': return ThemeHelper.getBorderPropsAsCSS(color, 'darker').borderColor;
          case 'outline': return ThemeHelper.getBorderPropsAsCSS(color, 'darker').borderColor;
        } break;
      case 'selected':
      case 'focus':
      case 'disabled':
        switch (variant)
        {
          case 'filled': return ThemeHelper.getBorderPropsAsCSS(color, 'dark').borderColor;
          case 'outline': return ThemeHelper.getBorderPropsAsCSS(color).borderColor;
        } break;
    }


    return ''
  }

  public static getBackgroundColorProps(color: TColorType, variant: TChipVariant, state: TControlState): CSSProperties['backgroundColor']
  {
    switch (state)
    {
      case 'normal':
        {
          switch (variant)
          {
            case 'filled': return ThemeHelper.getBackgroundColorAsCSS(color, 'palest').backgroundColor;
            case 'outline': return 'transparent';
          }
        } break;
      case 'hover':
        switch (variant)
        {
          case 'filled': return ThemeHelper.getBackgroundColorAsCSS(color, 'dark').backgroundColor;
          case 'outline': return ThemeHelper.getBackgroundColorAsCSS(color, 'palest').backgroundColor;
        } break;
      case 'pressed':
        switch (variant)
        {
          case 'filled': return ThemeHelper.getBackgroundColorAsCSS(color, 'darker').backgroundColor;
          case 'outline': return ThemeHelper.getBackgroundColorAsCSS(color, 'palest').backgroundColor;
        } break;
      case 'selected':
      case 'focus':
      case 'disabled':
        switch (variant)
        {
          case 'filled': return ThemeHelper.getBackgroundColorAsCSS(color).backgroundColor;
          case 'outline': return 'transparent';
        } break;
    }

    return ''
  }

  public static getColorProps(color: TColorType, variant: TChipVariant, state: TControlState): CSSProperties['color']
  {
    switch (state)
    {
      case 'normal':
        {
          switch (variant)
          {
            case 'filled': return ThemeHelper.getForegroundColorForBackAsCSS(color, 'palest').color;
            case 'outline': return ThemeHelper.getForegroundColorAsCSS(color).color;
          }
        } break;
      case 'hover':
        switch (variant)
        {
          case 'filled': return ThemeHelper.getForegroundColorForBackAsCSS(color, 'dark').color;
          case 'outline': return ThemeHelper.getForegroundColorForBackAsCSS(color, 'palest').color;
        } break;
      case 'pressed':
        switch (variant)
        {
          case 'filled': return ThemeHelper.getForegroundColorForBackAsCSS(color, 'darker').color;
          case 'outline': return ThemeHelper.getForegroundColorForBackAsCSS(color, 'palest').color;
        } break;
      case 'selected':
      case 'focus':
      case 'disabled':
        switch (variant)
        {
          case 'filled': return ThemeHelper.getForegroundColorForBackAsCSS(color).color;
          case 'outline': return ThemeHelper.getForegroundColorAsCSS(color).color;
        } break;
    }

    return ''
  }
}
