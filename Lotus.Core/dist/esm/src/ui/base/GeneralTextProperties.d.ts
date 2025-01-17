import { TThemeColor } from 'ui/theme/types';
import { TTextEffect } from 'ui/types';
import { TCssTextAlign } from 'ui/types/CssTypes';
/**
 * Общие свойства текста для элемента UI
 */
export interface IGeneralTextProperties {
    /**
     * Статус жирного шрифта
     */
    fontBold?: boolean;
    /**
     * Использовать шрифт для акцента внимания
     */
    fontAccent?: boolean;
    /**
     * Тип эффекта для текста
     */
    textEffect?: TTextEffect;
    /**
     * Выравнивание текста по горизонтали внутри блока
     */
    textAlign?: TCssTextAlign;
    /**
     * Использовать гармоничный цвет текста, а не контрастный
     */
    textColorHarmonious?: boolean;
    /**
     * Цвет текста
     */
    textColor?: TThemeColor;
}
