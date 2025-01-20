import { TColorVariantName } from 'modules/color';
import { TThemeColor } from './ThemeColor';

/**
 * Вариант цвета темы
 */
export type TThemeColorVariant = `${TThemeColor}${Capitalize<TColorVariantName>}`

export type TThemeColorVariantUndef = TThemeColorVariant | undefined;