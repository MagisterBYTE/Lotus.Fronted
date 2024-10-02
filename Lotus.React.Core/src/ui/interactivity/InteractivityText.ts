import { IGeneralTextProperties } from 'ui/components';
import { TColorAndVariant } from 'ui/types';

/**
 * Интерактивное взаимодействие текста элемента
 */
export interface IInteractivityText extends IGeneralTextProperties
{
  /**
   * Цвет текста при наведении
   */
  hoverTextColor?: TColorAndVariant;

  /**
   * Цвет текста при нажатии
   */
  pressedTextColor?: TColorAndVariant;
}