import { TThemeColorVariant } from 'ui/theme/types';
import { TCssBorderStyle, TCssBorderWidth } from 'ui/types';
/**
 * Общие свойства для границы элемента UI
 */
export interface IGeneralBorderProperties {
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
    borderColor?: TThemeColorVariant;
}
/**
 * Проверка на наличие любой свойства из границ элемента UI
 * @param borderStyle Тип стиля границы
 * @param borderWidth Ширина границы
 * @param borderColor Цвет границы
 */
export declare function hasBorderProperties(borderStyle?: TCssBorderStyle, borderWidth?: TCssBorderWidth, borderColor?: TThemeColorVariant): boolean;
/**
 * Проверка на наличие любой свойства из границ элемента UI
 * @param borderProps Общие свойства для границы элемента UI
 */
export declare function hasBorderProps(borderProps: IGeneralBorderProperties): boolean;
