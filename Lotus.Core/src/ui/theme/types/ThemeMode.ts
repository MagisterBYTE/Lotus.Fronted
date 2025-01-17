import { StringHelper } from 'helpers';
import { IOption } from 'modules/option';

/**
 * Режим темы
 */
export type TThemeMode = 'light' | 'dark';

/**
 * Массив режимов тем
 */
export const TThemeModes: readonly TThemeMode[] = ['light', 'dark'];

/**
 * Набор режимов тем в виде опций
 */
export const ThemeModeOptions:IOption[] = TThemeModes.map((x) => 
{
  return {
    text: StringHelper.capitalizeFirstLetter(x),
    value: x
  }
})