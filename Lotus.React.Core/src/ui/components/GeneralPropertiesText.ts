import { TTextEffect } from 'ui/types';
import { TCssTextAlign } from 'ui/types/CssTypes';

/**
 * Общие свойства текста для элемента UI
 */
export interface IGeneralPropertiesText
{
  /**
   * Статус жирного шрифта
   */
  fontBold?: boolean;

  /**
   * Тип эффекта для текста
   */
  textEffect?:TTextEffect;

  /**
   * Выравнивание текса по горизонтали внутри блока
   */
  textAlign?:TCssTextAlign;
}