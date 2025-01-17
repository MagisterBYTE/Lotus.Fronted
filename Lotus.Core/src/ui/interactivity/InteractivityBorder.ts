import { TColorVariantName } from 'modules/color';
import { IGeneralBorderProperties } from 'ui/base';

/**
 * Интерактивное взаимодействие границы элемента
 */
export interface IInteractivityBorder extends IGeneralBorderProperties
{
  /**
   * Цвет границы при наведении
   */
  hoverBorderColor?: TColorVariantName;

  /**
   * Цвет границы при нажатии
   */
  pressedBorderColor?: TColorVariantName;
}