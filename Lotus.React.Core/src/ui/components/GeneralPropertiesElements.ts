import { TColorType, TControlPadding, TControlSize } from 'ui/types';

/**
 * Общие свойства для элементов UI
 */
export interface IGeneralPropertiesElements
{
  /**
   * Статус скругления
   */
  hasRadius?: boolean;

  /**
   * Размер элемента
   */
  size?: TControlSize;
  
  /**
   * Цвет фона/границы элемента
   */
  color?: TColorType;

  /**
   * Внутренний отступ
   */
  paddingControl?: TControlPadding;
}