import { StringHelper } from 'helpers';
import { IOption } from 'modules/option';

/**
 * Темы
 */
export type TThemeMode = 'light' | 'dark';

/**
 * Массив типов тем
 */
export const TThemeModes: readonly TThemeMode[] = ['light', 'dark'];

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