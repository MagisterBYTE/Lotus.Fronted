import { Colors, ColorVariant, ColorVariantHelper } from 'lotus-core';
import { ThemeColorVariants } from '../constants/ThemeColorVariants';
import { TThemeColor } from './ThemeColor';
import { ThemePalette } from './ThemePalette';

/**
 * Данные по всем цветовым палитрам
 */
export const ThemeData: Record<TThemeColor, ThemePalette> =
  {
    silver: new ThemePalette(ThemeColorVariants.MuiBlueGrey, (variant) => { return (ColorVariantHelper.getIndexByName(variant) <= 4) ? Colors.black : Colors.white }),

    primary: new ThemePalette(ThemeColorVariants.MuiBlue, (variant) => { return (ColorVariantHelper.getIndexByName(variant) <= 5) ? Colors.black : Colors.white }),

    success: new ThemePalette(ThemeColorVariants.MuiGreen),

    danger: new ThemePalette(ThemeColorVariants.MuiRed),

    warning: new ThemePalette(ThemeColorVariants.MuiYellow),

    info: new ThemePalette(ColorVariant.createFromColorCombine(13, 202, 240)),

    academic: new ThemePalette(ThemeColorVariants.MuiBrown),

    coffee: new ThemePalette(ColorVariant.createFromColorCombine(100, 85, 78))
  } as const;