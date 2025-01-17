import { StringHelper } from 'helpers';
import { Color } from 'modules/color';
import { IOption } from 'modules/option';

/**
 * Тип цвета 
 */
export type TThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' |
 'blue' | 'blueGrey' | 'indigo' | 'green' | 'teal' | 'yellow' | 'amber' | 'red' | 'brown';

/**
 * Массив типов цветов
 */
export const TThemeColors: readonly TThemeColor[] = ['primary', 'secondary', 'error', 'warning', 'info', 'success', 
  'blue', 'blueGrey', 'indigo', 'green', 'teal', 'yellow', 'amber', 'brown'];

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