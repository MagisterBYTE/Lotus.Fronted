import { IOption, StringHelper } from 'lotus-core';

/**
 * Темы
 */
export type TThemeMode = 'light' | 'dark' | 'coffee';

/**
 * Массив типов тем
 */
export const TThemeModes: readonly TThemeMode[] = ['light', 'dark', 'coffee'];

/**
 * Набор типов тем в виде опций
 */
export const ThemeModeOptions:IOption[] = TThemeModes.map((x) => 
{
  return {
    text: StringHelper.capitalizeFirstLetter(x),
    value: x
  }
})