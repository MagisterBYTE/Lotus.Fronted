import { TColorVariantName } from 'modules/color';
import { IGeneralTextProperties } from 'ui/base';

/**
 * Интерактивное взаимодействие текста элемента
 */
export interface IInteractivityText extends IGeneralTextProperties
{
  /**
   * Цвет текста при наведении
   */
  hoverTextColor?: TColorVariantName;

  /**
   * Цвет текста при нажатии
   */
  pressedTextColor?: TColorVariantName;
}