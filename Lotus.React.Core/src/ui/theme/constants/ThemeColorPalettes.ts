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
        grey: ThemeColorVariants.MuiGray,
        text:
        {
          primary: 'rgba(0, 0, 0, 0.87)',
          secondary: 'rgba(0, 0, 0, 0.6)',
          disabled: 'rgba(0, 0, 0, 0.38)',
          icon: '#fff'
        },
        background:
        {
          default: '#fff',
          paper: '#fff'
        },
        action:
        {
          active: 'rgba(0, 0, 0, 0.54)',
          activatedOpacity: 0.12,
          hover: 'rgba(0, 0, 0, 0.04)',
          hoverOpacity: 0.04,
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
        mode: 'light',
        common: 
        {
          black: '#000',
          white: '#fff'
        },
        grey: ThemeColorVariants.MuiGray,
        text:
        {
          primary: 'rgba(0, 0, 0, 0.87)',
          secondary: 'rgba(0, 0, 0, 0.6)',
          disabled: 'rgba(0, 0, 0, 0.38)',
          icon: '#fff'
        },
        background:
        {
          default: '#fff',
          paper: '#fff'
        },
        action:
        {
          active: 'rgba(0, 0, 0, 0.54)',
          activatedOpacity: 0.12,
          hover: 'rgba(0, 0, 0, 0.04)',
          hoverOpacity: 0.04,
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
      'coffee':
      {
        mode: 'light',
        common: 
        {
          black: '#000',
          white: '#fff'
        },
        grey: ThemeColorVariants.MuiGray,
        text:
        {
          primary: 'rgba(0, 0, 0, 0.87)',
          secondary: 'rgba(0, 0, 0, 0.6)',
          disabled: 'rgba(0, 0, 0, 0.38)',
          icon: '#fff'
        },
        background:
        {
          default: '#fff',
          paper: '#fff'
        },
        action:
        {
          active: 'rgba(0, 0, 0, 0.54)',
          activatedOpacity: 0.12,
          hover: 'rgba(0, 0, 0, 0.04)',
          hoverOpacity: 0.04,
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
      }
    }
}