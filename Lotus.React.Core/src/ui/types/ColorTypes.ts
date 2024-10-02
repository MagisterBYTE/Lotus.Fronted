import { Color } from 'lotus-core';
import { TThemeColor, TThemeColorVariant } from 'ui/theme';

/**
 * Представление цвета
 */
export type TColorPresentation = Color|TThemeColor|TThemeColorVariant;

/**
 * Вариант цвета
 */
export type TColorAndVariant = Color|TThemeColorVariant;