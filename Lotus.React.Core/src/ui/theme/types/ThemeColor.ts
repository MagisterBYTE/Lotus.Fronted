import { Color, IOption, StringHelper } from 'lotus-core';

/**
 * Тип цвета (не зависят от темы)
 */
export type TThemeColor = 'blue' | 'blueGrey' | 'indigo' | 'green' | 'teal' | 'yellow' | 'amber' | 'red' | 'brown';

/**
 * Массив типов цветов
 */
export const TThemeColors: readonly TThemeColor[] = ['blue', 'blueGrey', 'indigo', 'green', 'teal', 'yellow', 'amber', 'brown'];

/**
 * Набор типов цветов в виде опций
 */
export const ThemeColorOptions:IOption[] = TThemeColors.map((x) => 
{
  return {
    text: StringHelper.capitalizeFirstLetter(x),
    value: x
  }
})

/**
 * Функция для проверки, является ли цвет типом цвета
 * @param color Проверяемый цвет
 * @returns Статус проверки
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function checkOfThemeColor(color: any): color is TThemeColor 
{
  return TThemeColors.includes(color);
}

/**
 * Функция для проверки, является ли цвет типом цвета или просто цветом
 * @param color Проверяемый цвет
 * @returns Статус проверки
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function checkOfThemeColorOrColor(color: any): boolean 
{
  return TThemeColors.includes(color) || color instanceof Color;
}