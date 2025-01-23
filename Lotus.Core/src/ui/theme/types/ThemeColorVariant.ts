import { TColorVariantName } from 'modules/color';
import { TThemeColor } from './ThemeColor';

/**
 * Вариант цвета темы
 */
export type TThemeColorVariant = `${TThemeColor}${Exclude<Capitalize<TColorVariantName>, 'Main'>}` | TThemeColor

export type TThemeColorVariantUndef = TThemeColorVariant | undefined;