import { Property } from 'csstype';

/**
 * Тип свойства - ширина Css
 */
export type TCssWidth = Property.Width<number | string>

/**
 * Тип свойства высота Css
 */
export type TCssHeight = Property.Height<number | string>

/**
 * Тип свойства размер шрифта Css
 */
export type TCssFontSize = Property.FontSize<number | string>

/**
 * Тип стиля границы Css
 */
export type TCssBorderStyle = 'solid'  | 'inset' | 'outset' | 'double' | 'groove' | 'ridge' | 'dotted'

/**
 * Тип свойства трансформации Css
 */
export type TCssTransform = Property.Transform;

/**
 * Тип свойства выравнивания текста Css
 */
export type TCssTextAlign = Property.TextAlign;

/**
 * Тип свойства тени границы Css
 */
export type TCssBoxShadow = Property.BoxShadow;