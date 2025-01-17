import { TThemeColorVariant } from 'ui/theme';
import { TShadowElevation } from 'ui/types';
import { IGeneralElementProperties } from './GeneralElementProperties';

/**
 * Расширенные свойства для элемента UI
 */
export interface IGeneralElementExtendedProperties extends IGeneralElementProperties
{
  /**
   * Вариант отображения текста
   */
  textColorVariant?: TThemeColorVariant;

  /**
   * Вариант отображения фона
   */
  backColorVariant?: TThemeColorVariant;

  /**
   * Размер тени
   */
  shadowElevation?: TShadowElevation;
}