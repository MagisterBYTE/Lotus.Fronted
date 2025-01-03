import { Colors, ColorVariantHelper, TColorVariantName } from 'lotus-core';
import { IThemePalette, TThemeMode } from '../types';
import { ThemeColorVariants } from './ThemeColorVariants';

/**
 * Наборы палитр тем
 */
export class ThemeColorPalettes
{
  // #region Static methods
  private static getMuiBlueColor(colorVariant: TColorVariantName, isHarmonious?:boolean)
  {
    if(isHarmonious)
    {
      return ThemeColorVariants.MuiBlue.getByName(colorVariant).createHarmoniousColor()
    }
    else
    {
      return (ColorVariantHelper.getIndexByName(colorVariant) <= 5) ? Colors.black : Colors.white;
    }
  }

  private static getMuiBlueGreyColor(colorVariant: TColorVariantName, isHarmonious?:boolean)
  {
    if(isHarmonious)
    {
      return ThemeColorVariants.MuiBlueGrey.getByName(colorVariant).createHarmoniousColor()
    }
    else
    {
      return (ColorVariantHelper.getIndexByName(colorVariant) <= 5) ? Colors.black : Colors.white;
    }
  }

  private static getMuiIndigoColor(colorVariant: TColorVariantName, isHarmonious?:boolean)
  {
    if(isHarmonious)
    {
      return ThemeColorVariants.MuiIndigo.getByName(colorVariant).createHarmoniousColor()
    }
    else
    {
      return (ColorVariantHelper.getIndexByName(colorVariant) <= 3) ? Colors.black : Colors.white;
    }
  }

  private static getMuiGreenColor(colorVariant: TColorVariantName, isHarmonious?:boolean)
  {
    if(isHarmonious)
    {
      return ThemeColorVariants.MuiGreen.getByName(colorVariant).createHarmoniousColor()
    }
    else
    {
      return (ColorVariantHelper.getIndexByName(colorVariant) <= 6) ? Colors.black : Colors.white;
    }
  }

  private static getMuiTealColor(colorVariant: TColorVariantName, isHarmonious?:boolean)
  {
    if(isHarmonious)
    {
      return ThemeColorVariants.MuiTeal.getByName(colorVariant).createHarmoniousColor()
    }
    else
    {
      return (ColorVariantHelper.getIndexByName(colorVariant) <= 4) ? Colors.black : Colors.white;
    }
  }

  private static getMuiYellowColor(colorVariant: TColorVariantName, isHarmonious?:boolean)
  {
    if(isHarmonious)
    {
      return ThemeColorVariants.MuiYellow.getByName(colorVariant).createHarmoniousColor()
    }
    else
    {
      return Colors.black;
    }
  }

  private static getMuiAmberColor(colorVariant: TColorVariantName, isHarmonious?:boolean)
  {
    if(isHarmonious)
    {
      return ThemeColorVariants.MuiAmber.getByName(colorVariant).createHarmoniousColor()
    }
    else
    {
      return Colors.black;
    }
  }

  private static getMuiRedColor(colorVariant: TColorVariantName, isHarmonious?:boolean)
  {
    if(isHarmonious)
    {
      return ThemeColorVariants.MuiRed.getByName(colorVariant).createHarmoniousColor()
    }
    else
    {
      return (ColorVariantHelper.getIndexByName(colorVariant) <= 4) ? Colors.black : Colors.white;
    }
  }

  private static getMuiBrownColor(colorVariant: TColorVariantName, isHarmonious?:boolean)
  {
    if(isHarmonious)
    {
      return ThemeColorVariants.MuiBrown.getByName(colorVariant).createHarmoniousColor()
    }
    else
    {
      return (ColorVariantHelper.getIndexByName(colorVariant) <= 3) ? Colors.black : Colors.white;
    }
  }
  // #endregion

  public static readonly Palettes: Record<TThemeMode, IThemePalette> = 
    {
      'light':
      {
        mode: 'light',
        common: 
        {
          black: '#000',
          white: '#fff'
        },
        primary:
        {
          main: '#1976d2',
          light: '#42a5f5',
          dark: '#1565c0',
          contrastText: '#fff'
        },
        secondary:
        {
          main: '#9c27b0',
          light: '#ba68c8',
          dark: '#7b1fa2',
          contrastText: '#fff'
        },
        error:
        {
          main: '#d32f2f',
          light: '#ef5350',
          dark: '#c62828',
          contrastText: '#fff'
        },
        warning:
        {
          main: '#ed6c02',
          light: '#ff9800',
          dark: '#e65100',
          contrastText: '#fff'
        },
        info:
        {
          main: '#0288d1',
          light: '#03a9f4',
          dark: '#01579b',
          contrastText: '#fff'
        },
        success:
        {
          main: '#2e7d32',
          light: '#4caf50',
          dark: '#1b5e20',
          contrastText: '#fff'
        },
        grey: ThemeColorVariants.MuiGray,
        text:
        {
          primary: 'rgba(0, 0, 0, 0.87)',
          secondary: 'rgba(0, 0, 0, 0.6)',
          disabled: 'rgba(0, 0, 0, 0.38)',
          icon: '#fff'
        },
        divider: 'rgba(0, 0, 0, 0.25)',
        background:
        {
          default: '#fff',
          paper: '#fff'
        },
        action:
        {
          ripple: 'rgba(255, 255, 255, 0.5)',
          active: 'rgba(0, 0, 0, 0.54)',
          activatedOpacity: 0.12,
          hover: 'rgba(0, 0, 0, 0.1)',
          hoverOpacity: 0.1,
          selected: 'rgba(0, 0, 0, 0.08)',
          selectedOpacity: 0.08,
          disabled: 'rgba(0, 0, 0, 0.26)',
          disabledBackground: 'rgba(0, 0, 0, 0.12)',
          disabledOpacity: 0.38,
          focus: 'rgba(0, 0, 0, 0.12)',
          focusOpacity: 0.12
        },
        colors: 
        {
          'blue':
          {
            variants: ThemeColorVariants.MuiBlue,
            onText: ThemeColorPalettes.getMuiBlueColor
          },
          'blueGrey':
          {
            variants: ThemeColorVariants.MuiBlueGrey,
            onText: ThemeColorPalettes.getMuiBlueGreyColor
          },
          'indigo':
          {
            variants: ThemeColorVariants.MuiIndigo,
            onText: ThemeColorPalettes.getMuiIndigoColor
          },
          'green':
          {
            variants: ThemeColorVariants.MuiGreen,
            onText: ThemeColorPalettes.getMuiGreenColor
          },
          'teal':
          {
            variants: ThemeColorVariants.MuiTeal,
            onText: ThemeColorPalettes.getMuiTealColor
          },
          'yellow':
          {
            variants: ThemeColorVariants.MuiYellow,
            onText: ThemeColorPalettes.getMuiYellowColor
          },
          'amber':
          {
            variants: ThemeColorVariants.MuiAmber,
            onText: ThemeColorPalettes.getMuiAmberColor
          },
          'red':
          {
            variants: ThemeColorVariants.MuiRed,
            onText: ThemeColorPalettes.getMuiRedColor
          },
          'brown':
          {
            variants: ThemeColorVariants.MuiBrown,
            onText: ThemeColorPalettes.getMuiBrownColor
          }
        }
      },
      'dark':
      {
        mode: 'dark',
        common: 
        {
          black: '#000',
          white: '#fff'
        },
        grey: ThemeColorVariants.MuiGray,
        primary:
        {
          main: '#90caf9',
          light: '#e3f2fd',
          dark: '#42a5f5',
          contrastText: 'rgba(0, 0, 0, 0.87)'
        },
        secondary:
        {
          main: '#ce93d8',
          light: '#f3e5f5',
          dark: '#ab47bc',
          contrastText: 'rgba(0, 0, 0, 0.87)'
        },
        error:
        {
          main: '#f44336',
          light: '#e57373',
          dark: '#d32f2f',
          contrastText: '#fff'
        },
        warning:
        {
          main: '#ffa726',
          light: '#ffb74d',
          dark: '#f57c00',
          contrastText: 'rgba(0, 0, 0, 0.87)'
        },
        info:
        {
          main: '#29b6f6',
          light: '#4fc3f7',
          dark: '#4fc3f7',
          contrastText: 'rgba(0, 0, 0, 0.87)'
        },
        success:
        {
          main: '#66bb6a',
          light: '#81c784',
          dark: '#388e3c',
          contrastText: 'rgba(0, 0, 0, 0.87)'
        },
        text:
        {
          primary: 'rgba(255, 255, 255, 0.9)',
          secondary: 'rgba(255, 255, 255, 0.7)',
          disabled: 'rgba(255, 255, 255, 0.5)',
          icon: 'rgba(255, 255, 255, 0.5)'
        },
        divider: 'rgba(255, 255, 255, 0.25)',
        background:
        {
          default: '#121212',
          paper: '#121212'
        },
        action:
        {
          ripple: 'rgba(255, 255, 255, 0.5)',
          active: 'rgba(255, 255, 255, 0.12)',
          activatedOpacity: 0.12,
          hover: 'rgba(255, 255, 225, 0.1)',
          hoverOpacity: 0.1,
          selected: 'rgba(255, 255, 255, 0.16)',
          selectedOpacity: 0.16,
          disabled: 'rgba(255, 255, 255, 0.3)',
          disabledBackground: 'rgba(255, 255, 255, 0.12)',
          disabledOpacity: 0.3,
          focus: 'rgba(255, 255, 255, 0.12)',
          focusOpacity: 0.12
        },
        colors: 
        {
          'blue':
          {
            variants: ThemeColorVariants.MuiBlue,
            onText: ThemeColorPalettes.getMuiBlueColor
          },
          'blueGrey':
          {
            variants: ThemeColorVariants.MuiBlueGrey,
            onText: ThemeColorPalettes.getMuiBlueGreyColor
          },
          'indigo':
          {
            variants: ThemeColorVariants.MuiIndigo,
            onText: ThemeColorPalettes.getMuiIndigoColor
          },
          'green':
          {
            variants: ThemeColorVariants.MuiGreen,
            onText: ThemeColorPalettes.getMuiGreenColor
          },
          'teal':
          {
            variants: ThemeColorVariants.MuiTeal,
            onText: ThemeColorPalettes.getMuiTealColor
          },
          'yellow':
          {
            variants: ThemeColorVariants.MuiYellow,
            onText: ThemeColorPalettes.getMuiYellowColor
          },
          'amber':
          {
            variants: ThemeColorVariants.MuiAmber,
            onText: ThemeColorPalettes.getMuiAmberColor
          },
          'red':
          {
            variants: ThemeColorVariants.MuiRed,
            onText: ThemeColorPalettes.getMuiRedColor
          },
          'brown':
          {
            variants: ThemeColorVariants.MuiBrown,
            onText: ThemeColorPalettes.getMuiBrownColor
          }
        }
      }
    }
}