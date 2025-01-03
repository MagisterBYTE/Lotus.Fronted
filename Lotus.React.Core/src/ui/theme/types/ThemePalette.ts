import { ColorVariant } from 'lotus-core';
import { TThemeColor } from './ThemeColor';
import { TThemeMode } from './ThemeMode';
import { IThemePaletteAction, IThemePaletteAdditionalColor, IThemePaletteBackground, IThemePaletteCommon, 
  IThemePaletteModeColor, IThemePaletteText } from './ThemePaletteTypes';

/**
 * Палитра цвета
 * Палитра цвета определяет варианты цветов и их применение к элементам интерфейса
 */
export interface IThemePalette
{
  /**
   * Тема
   */
  mode:TThemeMode;

  /**
   * Базовые цвета для палитры
   */
  common: IThemePaletteCommon;

  /**
   * Основной цвет для палитры
   */
  primary: IThemePaletteModeColor;

  /**
   * Вторичный цвет для палитры
   */
  secondary: IThemePaletteModeColor;

  /**
   * Цвет ошибок для палитры
   */
  error: IThemePaletteModeColor;

  /**
   * Цвет предупреждений для палитры
   */
  warning: IThemePaletteModeColor;

  /**
   * Цвет информирования для палитры
   */
  info: IThemePaletteModeColor;

  /**
   * Цвет успешности для палитры
   */
  success: IThemePaletteModeColor;

  /**
   * Вариант серых цветов для палитры
   */
  grey: ColorVariant;

  /**
   * Цвета текста для палитры
   */
  text: IThemePaletteText;

  /**
   * Цвет границы и разделителя для палитры
   */
  divider: string;

  /**
   * Цвета фона для палитры
   */
  background: IThemePaletteBackground;

  /**
   * Цвета действий для палитры
   */
  action: IThemePaletteAction;

  /**
   * Массив дополнительных цвет для палитры
   */
  colors: Record<TThemeColor, IThemePaletteAdditionalColor>; 
}