import { TColorVariantName } from 'lotus-core';

/**
 * Вариант цвета
 */
export type TThemeColorVariant = TColorVariantName

/**
 * Массив вариантов цветов
 */
export const TThemeColorVariants: readonly TThemeColorVariant[] = ['white', 'palest', 'pale', 'lighter', 'light', 'main', 'dark', 'darker', 'darkest', 'black'];

/**
 * // Функция для проверки, является ли цвет вариантом
 * @param color Проверяемый цвет
 * @returns 
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function checkOfThemeColorVariant(color: any): color is TThemeColorVariant 
{
  return TThemeColorVariants.includes(color);
}