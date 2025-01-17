/**
 * Набор констант для темы
 */
export class ThemeConstant
{
  // #region Const 
  /**
   * Ключ под которым сохраняется тема сайта
   */
  public static readonly SaveKey: string = 'lotus-theme';

  /**
   * Названия атрибута в документа под которым сохраняется тема сайта
   */
  public static readonly DataAttributeThemeMode: string = 'data-theme';

  /**
   * Названия атрибута в документа под которым сохраняется цвет темы сайта
   */
  public static readonly DataAttributeThemeColor: string = 'data-color';

  /**
   * Шрифт по умолчанию
   */
  public static readonly FontDefault: string = 'Verdana, Geneva, Tahoma, sans-serif';

  /**
   * Шрифт для акцента
   */
  public static readonly FontAccent: string = 'Arial, Helvetica, sans-serif';

  /**
   * Скорость переходов анимации/состояния, в миллисекундах
   */
  public static readonly TransitionSpeed: number = 400;

  /**
   * Скорость переходов анимации/состояния, в миллисекундах
   */
  public static readonly TransitionSpeedFast: number = 250;

  /**
   * Прозрачность тени для границы элементов UI которые при наведении
   */
  public static readonly OpacityForBorderShadowHover: number = 0.2;

  /**
   * Прозрачность тени для границы элементов UI которые при активном состоянии
   */
  public static readonly OpacityForBorderShadowActive: number = 0.4;
  // #endregion
}