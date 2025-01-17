import { TThemeColor } from './ThemeColor';
import { TThemeMode } from './ThemeMode';
import { IThemePaletteAction, IThemePaletteBackground, IThemePaletteBorder, IThemePaletteColor, IThemePaletteText } from './ThemePaletteTypes';
/**
 * Палитра цвета
 * Палитра цвета определяет унифицированы цвета адаптированные для соответствующей темы
 */
export interface IThemePalette {
    /**
     * Тема
     */
    mode: TThemeMode;
    /**
     * Цвета текста
     */
    text: IThemePaletteText;
    /**
     * Цвета фона
     */
    background: IThemePaletteBackground;
    /**
     * Цвет границ и разделителя
     */
    border: IThemePaletteBorder;
    /**
     * Модификаторы прозрачности для цветов
     */
    action: IThemePaletteAction;
    /**
     * Массив цветов
     */
    colors: Record<TThemeColor, IThemePaletteColor>;
}
