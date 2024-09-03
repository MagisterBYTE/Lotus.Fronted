import { TColorType, TControlPadding, TControlSize, TControlState } from 'ui/types';
import { ThemeHelper } from 'app/theme';
import { TChipVariant } from './ChipVariant';

export class ChipHelper
{
  public static getBorderColorProps(color: TColorType, variant: TChipVariant, state: TControlState): string
  {
    switch (state)
    {
      case 'normal':
        {
          switch (variant)
          {
            case TChipVariant.Filled: return `border-color: var(--lotus-color-${color}Dark);`;
            case TChipVariant.Outline: return `border-color: var(--lotus-color-${color});`;
          }
        } break;
      case 'hover':
        switch (variant)
        {
          case TChipVariant.Filled: return `border-color: var(--lotus-color-${color}Dark);`;
          case TChipVariant.Outline: return `border-color: var(--lotus-color-${color}Dark);`;
        } break;
      case 'pressed':
        switch (variant)
        {
          case TChipVariant.Filled: return `border-color: var(--lotus-color-${color}Darker);`;
          case TChipVariant.Outline: return `border-color: var(--lotus-color-${color}Darker);`;
        } break;
      case 'selected':
      case 'focus':
      case 'disabled':
        switch (variant)
        {
          case TChipVariant.Filled: return `border-color: var(--lotus-color-${color}Dark);`;
          case TChipVariant.Outline: return `border-color: var(--lotus-color-${color});`;
        } break;
    }


    return ''
  }

  public static getBackgroundColorProps(color: TColorType, variant: TChipVariant, state: TControlState): string
  {
    switch (state)
    {
      case 'normal':
        {
          switch (variant)
          {
            case TChipVariant.Filled: return `background-color: var(--lotus-color-${color}Palest);`;
            case TChipVariant.Outline: return `background-color: var(--lotus-color-${'light'});`;
          }
        } break;
      case 'hover':
        switch (variant)
        {
          case TChipVariant.Filled: return `background-color: var(--lotus-color-${color}Dark);`;
          case TChipVariant.Outline: return `background-color: var(--lotus-color-${color}Palest);`;
        } break;
      case 'pressed':
        switch (variant)
        {
          case TChipVariant.Filled: return `background-color: var(--lotus-color-${color}Darker);`;
          case TChipVariant.Outline: return `background-color: var(--lotus-color-${color}Palest);`;
        } break;
      case 'selected':
      case 'focus':
      case 'disabled':
        switch (variant)
        {
          case TChipVariant.Filled: return `background-color: var(--lotus-color-${color});`;
          case TChipVariant.Outline: return `background-color: var(--lotus-color-${'light'});`;
        } break;
    }

    return ''
  }

  public static getColorProps(color: TColorType, variant: TChipVariant, state: TControlState): string
  {
    switch (state)
    {
      case 'normal':
        {
          switch (variant)
          {
            case TChipVariant.Filled: return `color: var(--lotus-color-${color});`;
            case TChipVariant.Outline: return `color: var(--lotus-color-${color});`;
          }
        } break;
      case 'hover':
        switch (variant)
        {
          case TChipVariant.Filled: return `color: var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)});`;
          case TChipVariant.Outline: return `color: var(--lotus-color-${color}Dark);`;
        } break;
      case 'pressed':
        switch (variant)
        {
          case TChipVariant.Filled: return `color: var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)});`;
          case TChipVariant.Outline: return `color: var(--lotus-color-${color}Darker);`;
        } break;
      case 'selected':
      case 'focus':
      case 'disabled':
        switch (variant)
        {
          case TChipVariant.Filled: return `color: var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)});`;
          case TChipVariant.Outline: return `color: var(--lotus-color-${color});`;
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
            case 'minimum': return 'padding: 0.08rem; font-size: x-small;'
            case 'normal': return 'padding: 0.1rem; font-size: x-small;'
            case 'enlarged': return 'padding: 0.15rem; font-size: x-small;'
          }
        } break;
      case 'small':
        {
          switch (paddingControl)
          {
            case 'minimum': return 'padding: 0.1rem; font-size: small;'
            case 'normal': return 'padding: 0.15rem; font-size: small;'
            case 'enlarged': return 'padding: 0.2rem; font-size: small;'
          }
        } break;
      case 'medium':
        {
          switch (paddingControl)
          {
            case 'minimum': return 'padding: 0.15rem; font-size: medium;'
            case 'normal': return 'padding: 0.2rem; font-size: medium;'
            case 'enlarged': return 'padding: 0.25rem; font-size: medium;'
          }
        } break;
      case 'large':
        {
          switch (paddingControl)
          {
            case 'minimum': return 'padding: 0.2rem; font-size: large;'
            case 'normal': return 'padding: 0.3rem; font-size: large;'
            case 'enlarged': return 'padding: 0.4rem; font-size: large;'
          }
        } break;
    }

    return ''
  }
}
