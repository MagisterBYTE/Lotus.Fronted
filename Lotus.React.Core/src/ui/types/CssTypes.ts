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
 * Тип свойства стиля границы Css
 */
export type TCssBorderStyle = 'solid' | 'inset' | 'outset' | 'double' | 'groove' | 'ridge' | 'dotted';
export const TCssBorderStyles: readonly TCssBorderStyle[] = ['solid', 'inset', 'outset', 'double', 'groove', 'ridge', 'dotted'];

/**
 * Тип свойства ширины границы Css
 */
export type TCssBorderWidth = Property.BorderWidth|number;

/**
 * Тип свойства радиуса скругления границы Css
 */
export type TCssBorderRadius = Property.BorderRadius|true;

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

/**
 * Тип свойства фонового изображения Css
 */
export type TCssBackgroundImage = Property.BackgroundImage;