import { IGeneralBorderProperties } from 'ui/components';
import { TColorAndVariant } from 'ui/types';

/**
 * Интерактивное взаимодействие границы элемента
 */
export interface IInteractivityBorder extends IGeneralBorderProperties
{
  /**
   * Цвет границы при наведении
   */
  hoverBorderColor?: TColorAndVariant;

  /**
   * Цвет границы при нажатии
   */
  pressedBorderColor?: TColorAndVariant;
}