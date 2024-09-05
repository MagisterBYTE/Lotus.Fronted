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
            case 'filled': return `border-color: ${ThemeHelper.getBorderColorVar(color, 'dark')}`;
            case 'outline': return `border-color: ${ThemeHelper.getBorderColorVar(color)}`;
            case 'text': return 'border: none !important;';
            case 'icon': return 'border-color: transparent;';
          }
        } break;
      case 'hover':
        switch (variant)
        {
          case 'filled': return `border-color: ${ThemeHelper.getBorderColorVar(color, 'dark')}`;
          case 'outline': return `border-color: ${ThemeHelper.getBorderColorVar(color, 'dark')}`;
          case 'text': return 'border: none !important;';
          case 'icon': return `border-color: ${ThemeHelper.getBorderColorVar(color, 'dark')}`;
        } break;
      case 'pressed':
        switch (variant)
        {
          case 'filled': return `border-color: ${ThemeHelper.getBorderColorVar(color, 'darker')}`;
          case 'outline': return `border-color: ${ThemeHelper.getBorderColorVar(color, 'darker')}`;
          case 'text': return 'border: none !important;';
          case 'icon': return `border-color: ${ThemeHelper.getBorderColorVar(color, 'darker')}`;
        } break;
      case 'selected':
      case 'focus':
      case 'disabled':
        switch (variant)
        {
          case 'filled': return `border-color: ${ThemeHelper.getBorderColorVar(color, 'dark')}`;
          case 'outline': return `border-color: ${ThemeHelper.getBorderColorVar(color)}`;
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
            case 'filled': return `background-color: ${ThemeHelper.getBackgroundColorVar(color)}`;
            case 'outline': return `background-color: var(--lotus-body-${'bg'});`;
            case 'text': return `background-color: var(--lotus-body-${'bg'});`;
            case 'icon': return 'background-color: transparent;';
          }
        } break;
      case 'hover':
        switch (variant)
        {
          case 'filled': return `background-color: ${ThemeHelper.getBackgroundColorVar(color, 'dark')}`;
          case 'outline': return `background-color: ${ThemeHelper.getBackgroundColorVar(color, 'palest')}`;
          case 'text': return `background-color: ${ThemeHelper.getBackgroundColorVar(color, 'palest')}`;
          case 'icon': return `background-color: ${ThemeHelper.getBackgroundColorVar(color, 'palest')}`;
        } break;
      case 'pressed':
        switch (variant)
        {
          case 'filled': return `background-color: ${ThemeHelper.getBackgroundColorVar(color, 'darker')}`;
          case 'outline': return `background-color: ${ThemeHelper.getBackgroundColorVar(color, 'palest')}`;
          case 'text': return `background-color: ${ThemeHelper.getBackgroundColorVar(color, 'palest')}`;
          case 'icon': return `background-color: ${ThemeHelper.getBackgroundColorVar(color, 'palest')}`;
        } break;
      case 'selected':
      case 'focus':
      case 'disabled':
        switch (variant)
        {
          case 'filled': return `background-color: ${ThemeHelper.getBackgroundColorVar(color)}`;
          case 'outline': return `background-color: var(--lotus-body-${'color'});`;
          case 'text': return `background-color: var(--lotus-body-${'bg'});`;
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
            case 'outline': return `color: ${ThemeHelper.getColorVar(color)}`;
            case 'text': return `color: ${ThemeHelper.getColorVar(color)}`;
            case 'icon': return 'color: none !important;';
          }
        } break;
      case 'hover':
        switch (variant)
        {
          case 'filled': return ThemeHelper.getForegroundColorForBackAsText(color);
          case 'outline': return `color: ${ThemeHelper.getColorVar(color, 'dark')}`;
          case 'text': return `color: ${ThemeHelper.getColorVar(color, 'dark')}`;
          case 'icon': return 'color: none !important;';
        } break;
      case 'pressed':
        switch (variant)
        {
          case 'filled': return ThemeHelper.getForegroundColorForBackAsText(color);
          case 'outline': return `color: ${ThemeHelper.getColorVar(color, 'darker')}`;
          case 'text': return `color: ${ThemeHelper.getColorVar(color, 'darker')}`;
          case 'icon': return 'color: none !important;';
        } break;
      case 'selected':
      case 'focus':
      case 'disabled':
        switch (variant)
        {
          case 'filled': return ThemeHelper.getForegroundColorForBackAsText(color);
          case 'outline': return `color: ${ThemeHelper.getColorVar(color)}`;
          case 'text': return `color: ${ThemeHelper.getColorVar(color)}`;
          case 'icon': return 'color: none !important;';
        } break;
    }

    return ''
  }
}
