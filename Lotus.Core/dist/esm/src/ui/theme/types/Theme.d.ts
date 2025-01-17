import { TThemeColor } from './ThemeColor';
import { IThemePalette } from './ThemePalette';
/**
 * Тема приложения
 */
export declare class Theme {
    private static _currentPalette;
    private static _currentColor;
    /**
     * Получить текущую палитру цвета
     */
    static get currentPalette(): IThemePalette;
    /**
     * Установить текущую палитру цвета
     */
    static set currentPalette(palette: IThemePalette);
    /**
     * Получить основной цвет
     */
    static get currentColor(): TThemeColor;
    /**
     * Установить основной цвет
     */
    static set currentColor(themeColor: TThemeColor);
}
