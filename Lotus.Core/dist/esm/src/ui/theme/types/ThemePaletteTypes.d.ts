import { Color, ColorVariants, TColorVariantName } from 'modules/color';
/**
 * Цвета текста для соответствующей темы
 */
export interface IThemePaletteText {
    /**
     * Основной цвет текста
     */
    readonly primary: Color;
    /**
     * Дополнительный цвет текста
     */
    readonly secondary: Color;
    /**
     * Модификатор прозрачности для недоступности
     */
    readonly disabledOpacity: number;
}
/**
 * Цвета фона для соответствующей темы
 */
export interface IThemePaletteBackground {
    /**
     * Основной фоновый цвет
     */
    readonly default: Color;
    /**
     * Дополнительный фоновый цвет
     */
    readonly secondary: Color;
    /**
     * Модификатор прозрачности для недоступности
     */
    readonly disabledOpacity: number;
}
/**
 * Цвета границы для соответствующей темы
 */
export interface IThemePaletteBorder {
    /**
     * Основной цвет границы
     */
    readonly primary: Color;
    /**
     * Дополнительный фоновый границы
     */
    readonly secondary: Color;
    /**
     * Модификатор прозрачности для недоступности
     */
    readonly disabledOpacity: number;
}
/**
 * Тип действий для модификации цвета для соответствующей темы
 */
export type TThemePaletteActionType = 'active' | 'hover' | 'selected' | 'disabled' | 'focus';
/**
 * Модификаторы прозрачности для соответствующей темы
 */
export interface IThemePaletteAction {
    readonly activatedOpacity: number;
    readonly hoverOpacity: number;
    readonly selectedOpacity: number;
    readonly disabledOpacity: number;
    readonly focusOpacity: number;
}
/**
 * Основные цвета палитры для соответствующей темы
 */
export interface IThemePaletteColor {
    /**
     * Варианты цветов
     */
    variants: ColorVariants;
    /**
     * Функция обратного вызова для получения цвета текста для указанного цвета фона
     * @param colorVariant Цвет фона
     * @param isHarmonious Гармоничный или контрастный цвет текста
     * @returns Гармоничный или контрастный цвет текста для данного фона
     */
    onText: (colorVariant: TColorVariantName, isHarmonious?: boolean) => Color;
}
