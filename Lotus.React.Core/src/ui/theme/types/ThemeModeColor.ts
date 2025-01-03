import { IOption, StringHelper } from 'lotus-core';

/**
 * Тип цвета (зависит от темы)
 */

export type TThemeModeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

/**
 * Массив типов цветов
 */
export const TThemeModeColors: readonly TThemeModeColor[] = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];

/**
 * Набор типов тем в виде опций
 */
export const ThemeModeColorOptions:IOption[] = TThemeModeColors.map((x) => 
{
  return {
    text: StringHelper.capitalizeFirstLetter(x),
    value: x
  }
})

/**
 * Функция для проверки, является ли цвет типом цвета (зависит от темы)
 * @param color Проверяемый цвет
 * @returns Статус проверки
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function checkOfThemeModeColor(color: any): color is TThemeModeColor 
{
  return TThemeModeColors.includes(color);
}