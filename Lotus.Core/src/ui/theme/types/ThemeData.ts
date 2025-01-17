import { TThemeColor } from './ThemeColor';
import { TThemeMode } from './ThemeMode';

/**
 * Данные темы
 */
export type TThemeData = 
{
  /**
   * Тема
   */
  mode: TThemeMode;
  
  /**
   * Основной цвет по умолчанию
   */
  color:TThemeColor;
}