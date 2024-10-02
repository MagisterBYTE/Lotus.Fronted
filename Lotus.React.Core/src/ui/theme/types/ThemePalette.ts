import { ColorVariant } from 'lotus-core';
import { TThemeColor } from './ThemeColor';
import { TThemeMode } from './ThemeMode';
import { IThemePaletteAction, IThemePaletteBackground, IThemePaletteColor, IThemePaletteCommon, IThemePaletteText } from './ThemePaletteTypes';

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
   * Вариант серых цветов для палитры
   */
  grey: ColorVariant;

  /**
   * Цвета текста для палитры
   */
  text: IThemePaletteText;

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
  colors: Record<TThemeColor, IThemePaletteColor>; 
}