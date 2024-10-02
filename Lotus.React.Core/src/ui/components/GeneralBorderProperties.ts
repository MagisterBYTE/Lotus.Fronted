import { TColorPresentation } from 'ui/types';
import { TCssBorderStyle, TCssBorderWidth } from 'ui/types/CssTypes';

/**
 * Общие свойства для границы элемента UI
 */
export interface IGeneralBorderProperties
{
  /**
   * Тип стиля границы
   */
  borderStyle?: TCssBorderStyle;

  /**
  * Ширина границы
  */
  borderWidth?: TCssBorderWidth;

  /**
   * Цвет границы
   */
  borderColor?: TColorPresentation;
}

/**
 * Проверка на наличие любой свойства из границ элемента UI
 * @param borderStyle Тип стиля границы
 * @param borderWidth Ширина границы
 * @param borderColor Цвет границы
 */
export function hasBorderProperties(borderStyle?: TCssBorderStyle,
  borderWidth?: TCssBorderWidth, borderColor?: TColorPresentation): boolean 
{
  return (!!borderStyle) || (!!borderWidth) || (!!borderColor)
}

/**
 * Проверка на наличие любой свойства из границ элемента UI
 * @param borderProps Общие свойства для границы элемента UI
 */
export function hasBorderProps(borderProps: IGeneralBorderProperties): boolean 
{
  return (!!borderProps.borderStyle) || (!!borderProps.borderWidth) || (!!borderProps.borderColor)
}