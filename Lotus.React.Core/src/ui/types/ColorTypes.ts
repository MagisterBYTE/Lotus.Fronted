import { Color } from 'lotus-core';
import { TThemeColor, TThemeColorVariant, TThemeModeColor } from 'ui/theme';

/**
 * Представление цвета
 */
export type TColorPresentation = Color | TThemeColorVariant | TThemeColor | TThemeModeColor;

/**
 * Вариант цвета
 */
export type TColorAndVariant = Color | TThemeColorVariant;