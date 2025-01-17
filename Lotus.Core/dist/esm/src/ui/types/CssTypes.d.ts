import { Property } from 'csstype';
/**
 * Тип свойства - ширина Css
 */
export type TCssWidth = Property.Width<number | string>;
/**
 * Тип свойства высота Css
 */
export type TCssHeight = Property.Height<number | string>;
/**
 * Тип свойства размер шрифта Css
 */
export type TCssFontSize = Property.FontSize<number | string>;
/**
 * Тип свойства стиля границы Css
 */
export type TCssBorderStyle = 'solid' | 'inset' | 'outset' | 'double' | 'groove' | 'ridge' | 'dotted';
export declare const TCssBorderStyles: readonly TCssBorderStyle[];
/**
 * Тип свойства ширины границы Css
 */
export type TCssBorderWidth = Property.BorderWidth | number;
/**
 * Тип свойства радиуса скругления границы Css
 */
export type TCssBorderRadius = Property.BorderRadius | true;
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
/**
 * Тип свойства выравнивания контента по основной оси Css
 */
export type TCssJustifyContent = Property.JustifyContent;
/**
 * Тип свойства выравнивания контента по второстепенной оси Css
 */
export type TCssAlignItems = Property.AlignItems;
