import { IOption, StringHelper } from 'lotus-core';

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