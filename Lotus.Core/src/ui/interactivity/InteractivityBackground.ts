import { TColorVariantName } from 'modules';
import { IGeneralBackgroundProperties } from 'ui/base';

/**
 * Интерактивное взаимодействие фона элемента
 */
export interface IInteractivityBackground extends IGeneralBackgroundProperties
{
  /**
   * Цвет фона при наведении
   */
  hoverBackColor?: TColorVariantName;

  /**
   * Цвет фона при нажатии
   */
  pressedBackColor?: TColorVariantName;
}