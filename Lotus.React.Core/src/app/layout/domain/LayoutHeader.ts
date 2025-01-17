import { TCssHeight } from 'ui/types/CssTypes';

/**
 * Параметры шапки сайта
 */
export interface ILayoutHeader
{
  /**
   * Виден основной заголовок/шапка сайта по настройкам пользователя
   */
  isVisibleUser: boolean;

  /**
   * Виден основной заголовок/шапка сайта по логике макета
   */
  isVisible: boolean;

  /**
   * Высота заголовка/шапка сайта
   */
  height: TCssHeight;
}
