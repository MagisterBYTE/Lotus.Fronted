import { IGeneralBackgroundProperties } from 'ui/components';
import { TColorAndVariant } from 'ui/types';

/**
 * Интерактивное взаимодействие фона элемента
 */
export interface IInteractivityBackground extends IGeneralBackgroundProperties
{
  /**
   * Цвет фона при наведении
   */
  hoverBackColor?: TColorAndVariant;

  /**
   * Цвет фона при нажатии
   */
  pressedBackColor?: TColorAndVariant;
}