import { ThemeColorPalettes } from '../constants/ThemeColorPalettes';
import { TThemeColor } from './ThemeColor';
import { IThemePalette } from './ThemePalette';

/**
 * Тема приложения
 */
export class Theme
{
  // #region Static properties
  private static _currentPalette: IThemePalette;
  private static _currentColor: TThemeColor;

  /**
   * Получить текущую палитру цвета
   */
  public static get currentPalette(): IThemePalette
  {
    if (Theme._currentPalette) return Theme._currentPalette;
    return ThemeColorPalettes.Palettes['light'];
  }

  /**
   * Установить текущую палитру цвета
   */
  public static set currentPalette(palette: IThemePalette)
  {
    Theme._currentPalette = palette;
  }

  /**
   * Получить основной цвет
   */
  public static get currentColor(): TThemeColor
  {
    if (Theme._currentColor) return Theme._currentColor;
    return 'blue';
  }

  /**
   * Установить основной цвет
   */
  public static set currentColor(themeColor: TThemeColor)
  {
    Theme._currentColor = themeColor;
  }
  // #endregion
}