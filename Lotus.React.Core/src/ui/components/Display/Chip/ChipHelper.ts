import { TColorType, TControlState } from 'ui/types';
import { ThemeHelper } from 'ui/theme';
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
            case 'filled': return ThemeHelper.getBorderProps(color, 'dark').borderColor;
            case 'outline': return ThemeHelper.getBorderProps(color).borderColor;
          }
        } break;
      case 'hover':
        switch (variant)
        {
          case 'filled': return ThemeHelper.getBorderProps(color, 'dark').borderColor;
          case 'outline': return ThemeHelper.getBorderProps(color, 'dark').borderColor;
        } break;
      case 'pressed':
        switch (variant)
        {
          case 'filled': return ThemeHelper.getBorderProps(color, 'darker').borderColor;
          case 'outline': return ThemeHelper.getBorderProps(color, 'darker').borderColor;
        } break;
      case 'selected':
      case 'focus':
      case 'disabled':
        switch (variant)
        {
          case 'filled': return ThemeHelper.getBorderProps(color, 'dark').borderColor;
          case 'outline': return ThemeHelper.getBorderProps(color).borderColor;
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
            case 'filled': return ThemeHelper.getBackgroundColorProps(color, 'palest').backgroundColor;
            case 'outline': return 'transparent';
          }
        } break;
      case 'hover':
        switch (variant)
        {
          case 'filled': return ThemeHelper.getBackgroundColorProps(color, 'dark').backgroundColor;
          case 'outline': return ThemeHelper.getBackgroundColorProps(color, 'palest').backgroundColor;
        } break;
      case 'pressed':
        switch (variant)
        {
          case 'filled': return ThemeHelper.getBackgroundColorProps(color, 'darker').backgroundColor;
          case 'outline': return ThemeHelper.getBackgroundColorProps(color, 'palest').backgroundColor;
        } break;
      case 'selected':
      case 'focus':
      case 'disabled':
        switch (variant)
        {
          case 'filled': return ThemeHelper.getBackgroundColorProps(color).backgroundColor;
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
            case 'outline': return ThemeHelper.getForegroundColorProps(color).color;
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
          case 'outline': return ThemeHelper.getForegroundColorProps(color).color;
        } break;
    }

    return ''
  }
}
