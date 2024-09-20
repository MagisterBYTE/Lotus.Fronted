import { TColorVariantName } from 'lotus-core';

/**
 * Вариант цвета
 */
export type TThemeColorVariant = Exclude<TColorVariantName, 'main'>

/**
 * Массив вариантов цветов
 */
export const TThemeColorVariants:TThemeColorVariant[] = ['white', 'palest', 'pale', 'lighter', 'light', 'dark', 'darker', 'darkest', 'black'] as const;