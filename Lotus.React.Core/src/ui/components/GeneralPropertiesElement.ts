import { TThemeColor } from 'ui/theme';
import { TControlPadding, TControlSize } from 'ui/types';
import { TCssBorderStyle } from 'ui/types/CssTypes';

/**
 * Общие свойства для элемента UI
 */
export interface IGeneralPropertiesElement
{
  /**
   * Статус скругления границы
   */
  borderRounded?: boolean;

  /**
   * Тип стиля границы
   */
  borderStyle?: TCssBorderStyle;

  /**
   * Размер элемента
   */
  size?: TControlSize;
  
  /**
   * Основной цвет
   */
  color?: TThemeColor;

  /**
   * Внутренний отступ
   */
  paddingControl?: TControlPadding;

  /**
   * Дополнительный класс для отображения
   */
  extraClass?: string;
}