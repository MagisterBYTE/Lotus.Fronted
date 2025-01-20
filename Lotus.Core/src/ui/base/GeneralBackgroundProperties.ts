import { TThemeColorVariant } from 'ui/theme/types';
import { TCssBackgroundImage, TShadowElevation } from 'ui/types';

/**
 * Общие свойства для фона элемента UI
 */
export interface IGeneralBackgroundProperties
{
  /**
   * Основной цвет
   */
  backColor?: TThemeColorVariant;

  /**
   * Фоновое изображение
   */
  backImage?: TCssBackgroundImage;

  /**
   * Размер тени
   */
  shadowElevation?: TShadowElevation;
}