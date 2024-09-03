import { TColorType, TControlPadding, TControlSize, TControlState } from 'ui/types';
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
            case 'filled': return `border-color: var(--lotus-color-${color}Dark);`;
            case 'outline': return `border-color: var(--lotus-color-${color});`;
            case 'text': return 'border: none !important;';
          }
        } break;
      case 'hover':
        switch (variant)
        {
          case 'filled': return `border-color: var(--lotus-color-${color}Dark);`;
          case 'outline': return `border-color: var(--lotus-color-${color}Dark);`;
          case 'text': return 'border: none !important;';
        } break;
      case 'pressed':
        switch (variant)
        {
          case 'filled': return `border-color: var(--lotus-color-${color}Darker);`;
          case 'outline': return `border-color: var(--lotus-color-${color}Darker);`;
          case 'text': return 'border: none !important;';
        } break;
      case 'selected':
      case 'focus':
      case 'disabled':
        switch (variant)
        {
          case 'filled': return `border-color: var(--lotus-color-${color}Dark);`;
          case 'outline': return `border-color: var(--lotus-color-${color});`;
          case 'text': return 'border: none !important;';
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
            case 'filled': return `background-color: var(--lotus-color-${color});`;
            case 'outline': return `background-color: var(--lotus-color-${'light'});`;
            case 'text': return `background-color: var(--lotus-color-${'light'});`;
          }
        } break;
      case 'hover':
        switch (variant)
        {
          case 'filled': return `background-color: var(--lotus-color-${color}Dark);`;
          case 'outline': return `background-color: var(--lotus-color-${color}Palest);`;
          case 'text': return `background-color: var(--lotus-color-${color}Palest);`;
        } break;
      case 'pressed':
        switch (variant)
        {
          case 'filled': return `background-color: var(--lotus-color-${color}Darker);`;
          case 'outline': return `background-color: var(--lotus-color-${color}Palest);`;
          case 'text': return `background-color: var(--lotus-color-${color}Palest);`;
        } break;
      case 'selected':
      case 'focus':
      case 'disabled':
        switch (variant)
        {
          case 'filled': return `background-color: var(--lotus-color-${color});`;
          case 'outline': return `background-color: var(--lotus-color-${'light'});`;
          case 'text': return `background-color: var(--lotus-color-${'light'});`;
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
            case 'filled': return `color: var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)});`;
            case 'outline': return `color: var(--lotus-color-${color});`;
            case 'text': return `color: var(--lotus-color-${color});`;
          }
        } break;
      case 'hover':
        switch (variant)
        {
          case 'filled': return `color: var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)});`;
          case 'outline': return `color: var(--lotus-color-${color}Dark);`;
          case 'text': return `color: var(--lotus-color-${color}Dark);`;;
        } break;
      case 'pressed':
        switch (variant)
        {
          case 'filled': return `color: var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)});`;
          case 'outline': return `color: var(--lotus-color-${color}Darker);`;
          case 'text': return `color: var(--lotus-color-${color}Darker);`;;
        } break;
      case 'selected':
      case 'focus':
      case 'disabled':
        switch (variant)
        {
          case 'filled': return `color: var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)});`;
          case 'outline': return `color: var(--lotus-color-${color});`;
          case 'text': return `color: var(--lotus-color-${color});`;;
        } break;
    }

    return ''
  }

  public static getPaddingSidesProps(size: TControlSize, paddingControl: TControlPadding): string
  {
    switch (size)
    {
      case 'smaller':
        {
          switch (paddingControl)
          {
            case 'minimum': return 'padding-left: 0.1rem; padding-right: 0.1rem;'
            case 'normal': return 'padding-left: 0.2rem; padding-right: 0.2rem;'
            case 'enlarged': return 'padding-left: 0.35rem; padding-right: 0.35rem;'
          }
        } break;
      case 'small':
        {
          switch (paddingControl)
          {
            case 'minimum': return 'padding-left: 0.15rem; padding-right: 0.15rem;'
            case 'normal': return 'padding-left: 0.25rem; padding-right: 0.25rem;'
            case 'enlarged': return 'padding-left: 0.35rem; padding-right: 0.35rem;'
          }
        } break;
      case 'medium':
        {
          switch (paddingControl)
          {
            case 'minimum': return 'padding-left: 0.2rem; padding-right: 0.2rem;'
            case 'normal': return 'padding-left: 0.5rem; padding-right: 0.5rem;'
            case 'enlarged': return 'padding-left: 0.75rem; padding-right: 0.75rem;'
          }
        } break;
      case 'large':
        {
          switch (paddingControl)
          {
            case 'minimum': return 'padding-left: 0.25rem; padding-right: 0.25rem;'
            case 'normal': return 'padding-left: 0.55rem; padding-right: 0.55rem;'
            case 'enlarged': return 'padding-left: 0.8rem; padding-right: 0.8rem;'
          }
        } break;
    }

    return ''
  }
}
