import { TColorType, TControlState } from 'ui/types';
import { ThemeHelper } from 'app/theme';
import { TButtonVariant } from './ButtonVariant';

export class ButtonHelper
{
  public static getBorderColorProps(color: TColorType, variant: TButtonVariant, state: TControlState): string
  {
    switch (state)
    {
      case 'normal':
        {
          switch (variant)
          {
            case 'filled': return `border-color: ${ThemeHelper.getBorderPropsAsCSS(color, 'dark').borderColor}`;
            case 'outline': return `border-color: ${ThemeHelper.getBorderPropsAsCSS(color).borderColor}`;
            case 'text': return 'border: none !important;';
            case 'icon': return 'border-color: transparent;';
          }
        } break;
      case 'hover':
        switch (variant)
        {
          case 'filled': return `border-color: ${ThemeHelper.getBorderPropsAsCSS(color, 'dark').borderColor}`;
          case 'outline': return `border-color: ${ThemeHelper.getBorderPropsAsCSS(color, 'dark').borderColor}`;
          case 'text': return 'border: none !important;';
          case 'icon': return `border-color: ${ThemeHelper.getBorderPropsAsCSS(color, 'dark').borderColor}`;
        } break;
      case 'pressed':
        switch (variant)
        {
          case 'filled': return `border-color: ${ThemeHelper.getBorderPropsAsCSS(color, 'darker').borderColor}`;
          case 'outline': return `border-color: ${ThemeHelper.getBorderPropsAsCSS(color, 'darker').borderColor}`;
          case 'text': return 'border: none !important;';
          case 'icon': return `border-color: ${ThemeHelper.getBorderPropsAsCSS(color, 'darker').borderColor}`;
        } break;
      case 'selected':
      case 'focus':
      case 'disabled':
        switch (variant)
        {
          case 'filled': return `border-color: ${ThemeHelper.getBorderPropsAsCSS(color, 'dark').borderColor}`;
          case 'outline': return `border-color: ${ThemeHelper.getBorderPropsAsCSS(color).borderColor}`;
          case 'text': return 'border: none !important;';
          case 'icon': return 'border-color: transparent;';
        } break;
    }

    return ''
  }

  public static getBackgroundColorProps(color: TColorType, variant: TButtonVariant, state: TControlState): string
  {
    switch (state)
    {
      case 'normal':
        {
          switch (variant)
          {
            case 'filled': return `background-color: ${ThemeHelper.getBackgroundColorAsCSS(color).backgroundColor}`;
            case 'outline': return 'background-color: transparent;';
            case 'text': return 'background-color: transparent;';
            case 'icon': return 'background-color: transparent;';
          }
        } break;
      case 'hover':
        switch (variant)
        {
          case 'filled': return `background-color: ${ThemeHelper.getBackgroundColorAsCSS(color, 'dark').backgroundColor}`;
          case 'outline': return `background-color: ${ThemeHelper.getBackgroundColorAsCSS(color, 'palest').backgroundColor}`;
          case 'text': return `background-color: ${ThemeHelper.getBackgroundColorAsCSS(color, 'palest').backgroundColor}`;
          case 'icon': return `background-color: ${ThemeHelper.getBackgroundColorAsCSS(color, 'palest').backgroundColor}`;
        } break;
      case 'pressed':
        switch (variant)
        {
          case 'filled': return `background-color: ${ThemeHelper.getBackgroundColorAsCSS(color, 'darker').backgroundColor}`;
          case 'outline': return `background-color: ${ThemeHelper.getBackgroundColorAsCSS(color, 'palest').backgroundColor}`;
          case 'text': return `background-color: ${ThemeHelper.getBackgroundColorAsCSS(color, 'palest').backgroundColor}`;
          case 'icon': return `background-color: ${ThemeHelper.getBackgroundColorAsCSS(color, 'palest').backgroundColor}`;
        } break;
      case 'selected':
      case 'focus':
      case 'disabled':
        switch (variant)
        {
          case 'filled': return `background-color: ${ThemeHelper.getBackgroundColorAsCSS(color).backgroundColor}`;
          case 'outline': return 'background-color: transparent;';
          case 'text': return 'background-color: transparent;';
          case 'icon': return 'background-color: transparent;';
        } break;
    }

    return ''
  }

  public static getColorProps(color: TColorType, variant: TButtonVariant, state: TControlState): string
  {
    switch (state)
    {
      case 'normal':
        {
          switch (variant)
          {
            case 'filled': return ThemeHelper.getForegroundColorForBackAsText(color);
            case 'outline': return `color: ${ThemeHelper.getForegroundColorAsCSS(color).color}`;
            case 'text': return `color: ${ThemeHelper.getForegroundColorAsCSS(color).color}`;
            case 'icon': return 'color: none !important;';
          }
        } break;
      case 'hover':
        switch (variant)
        {
          case 'filled': return ThemeHelper.getForegroundColorForBackAsText(color);
          case 'outline': return `color: ${ThemeHelper.getForegroundColorAsCSS(color, 'dark').color}`;
          case 'text': return `color: ${ThemeHelper.getForegroundColorAsCSS(color, 'dark').color}`;
          case 'icon': return 'color: none !important;';
        } break;
      case 'pressed':
        switch (variant)
        {
          case 'filled': return ThemeHelper.getForegroundColorForBackAsText(color);
          case 'outline': return `color: ${ThemeHelper.getForegroundColorAsCSS(color, 'darker').color}`;
          case 'text': return `color: ${ThemeHelper.getForegroundColorAsCSS(color, 'darker').color}`;
          case 'icon': return 'color: none !important;';
        } break;
      case 'selected':
      case 'focus':
      case 'disabled':
        switch (variant)
        {
          case 'filled': return ThemeHelper.getForegroundColorForBackAsText(color);
          case 'outline': return `color: ${ThemeHelper.getForegroundColorAsCSS(color).color}`;
          case 'text': return `color: ${ThemeHelper.getForegroundColorAsCSS(color).color}`;
          case 'icon': return 'color: none !important;';
        } break;
    }

    return ''
  }
}
