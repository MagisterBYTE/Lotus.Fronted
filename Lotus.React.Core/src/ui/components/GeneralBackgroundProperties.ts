import { TColorPresentation, TCssBackgroundImage } from 'ui/types';

/**
 * Общие свойства для фона элемента UI
 */
export interface IGeneralBackgroundProperties
{
  /**
   * Основной цвет
   */
  backColor?: TColorPresentation;

  /**
   * Фоновое изображение
   */
  backImage?: TCssBackgroundImage;
}