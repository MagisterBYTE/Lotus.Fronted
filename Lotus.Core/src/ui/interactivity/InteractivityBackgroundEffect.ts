
/**
 * Эффект при интерактивном взаимодействие фона элемента
 */
export interface IInteractivityBackgroundEffect
{
  /**
   * Использовать эффект Ripple (при нажатии)
   */
  hasRippleEffect?: boolean;

  /**
   * Использовать эффект масштабирования (при наведении и нажатии)
   */
  hasScaleEffect?: boolean;

  /**
   * Использовать эффект тени границы (при наведении и нажатии)
   */
  hasShadowBorderEffect?: boolean;

  /**
   * Использовать эффект тени прямоугольника (при наведении и нажатии)
   */
  hasShadowBoxEffect?: boolean;
}