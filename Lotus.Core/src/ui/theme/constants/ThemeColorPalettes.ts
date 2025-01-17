import { Color, Colors, ColorVariants, ColorVariantsHelper, TColorVariantName } from 'modules/color';
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
      return (ColorVariantsHelper.getIndexByName(colorVariant) <= 5) ? Colors.black : Colors.white;
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
      return (ColorVariantsHelper.getIndexByName(colorVariant) <= 5) ? Colors.black : Colors.white;
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
      return (ColorVariantsHelper.getIndexByName(colorVariant) <= 3) ? Colors.black : Colors.white;
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
      return (ColorVariantsHelper.getIndexByName(colorVariant) <= 6) ? Colors.black : Colors.white;
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
      return (ColorVariantsHelper.getIndexByName(colorVariant) <= 4) ? Colors.black : Colors.white;
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
      return (ColorVariantsHelper.getIndexByName(colorVariant) <= 4) ? Colors.black : Colors.white;
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
      return (ColorVariantsHelper.getIndexByName(colorVariant) <= 3) ? Colors.black : Colors.white;
    }
  }
  // #endregion

  public static readonly Palettes: Record<TThemeMode, IThemePalette> = 
    {
      'light':
      {
        mode: 'light',
        text:
        {
          primary: new Color('rgba(0, 0, 0, 0.87)'),
          secondary: new Color('rgba(0, 0, 0, 0.6)'),
          disabledOpacity: 0.38
        },
        background:
        {
          default: new Color('#fff'),
          secondary: new Color('#fff'),
          disabledOpacity: 0.12
        },
        border:
        {
          primary: new Color('rgba(0, 0, 0, 0.25)'),
          secondary: new Color('rgba(0, 0, 0, 0.4)'),
          disabledOpacity: 0.26
        },
        action:
        {
          activatedOpacity: 0.12,
          hoverOpacity: 0.1,
          selectedOpacity: 0.08,
          disabledOpacity: 0.38,
          focusOpacity: 0.12
        },
        colors: 
        {
          'primary':
          {
            variants: ColorVariants.createFromColorRelativeLightness('#1976d2', '#42a5f5', '#1565c0'),
            onText: () => Colors.white
          },
          'secondary':
          {
            variants: ColorVariants.createFromColorRelativeLightness('#9c27b0', '#ba68c8', '#7b1fa2'),
            onText: () => Colors.white
          },
          'error':
          {
            variants: ColorVariants.createFromColorRelativeLightness('#d32f2f', '#ef5350', '#c62828'),
            onText: () => Colors.white
          },
          'warning':
          {
            variants: ColorVariants.createFromColorRelativeLightness('#ed6c02', '#ff9800', '#e65100'),
            onText: () => Colors.white
          },
          'info':
          {
            variants: ColorVariants.createFromColorRelativeLightness('#0288d1', '#03a9f4', '#01579b'),
            onText: () => Colors.white
          },
          'success':
          {
            variants: ColorVariants.createFromColorRelativeLightness('#2e7d32', '#4caf50', '#1b5e20'),
            onText: () => Colors.white
          },
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
        text:
        {
          primary: new Color('rgba(255, 255, 255, 0.9)'),
          secondary: new Color('rgba(255, 255, 255, 0.7)'),
          disabledOpacity: 0.5
        },
        background:
        {
          default: new Color('#121212'),
          secondary: new Color('#121212'),
          disabledOpacity: 0.12
        },
        border:
        {
          primary: new Color('rgba(255, 255, 255, 0.25)'),
          secondary: new Color('rgba(255, 255, 255, 0.4)'),
          disabledOpacity: 0.26
        },
        action:
        {
          activatedOpacity: 0.12,
          hoverOpacity: 0.1,
          selectedOpacity: 0.16,
          disabledOpacity: 0.3,
          focusOpacity: 0.12
        },
        colors: 
        {
          'primary':
          {
            variants: ColorVariants.createFromColorRelativeLightness('#90caf9', '#e3f2fd', '#42a5f5'),
            onText: () => new Color('rgba(0, 0, 0, 0.87)')
          },
          'secondary':
          {
            variants: ColorVariants.createFromColorRelativeLightness('#ce93d8', '#f3e5f5', '#ab47bc'),
            onText: () => new Color('rgba(0, 0, 0, 0.87)')
          },
          'error':
          {
            variants: ColorVariants.createFromColorRelativeLightness('#f44336', '#e57373', '#d32f2f'),
            onText: () => Colors.white
          },
          'warning':
          {
            variants: ColorVariants.createFromColorRelativeLightness('#ffa726', '#ffb74d', '#f57c00'),
            onText: () => new Color('rgba(0, 0, 0, 0.87)')
          },
          'info':
          {
            variants: ColorVariants.createFromColorRelativeLightness('#29b6f6', '#4fc3f7', '#4fc3f7'),
            onText: () => new Color('rgba(0, 0, 0, 0.87)')
          },
          'success':
          {
            variants: ColorVariants.createFromColorRelativeLightness('#66bb6a', '#81c784', '#388e3c'),
            onText: () => new Color('rgba(0, 0, 0, 0.87)')
          },
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