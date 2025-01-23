import { TThemeColorVariant } from 'ui/theme';
import { TControlSize, TCssBorderRadius, TCssBorderStyle, TCssBorderWidth, TCssProperties, TCssTextAlign, TShadowElevation, TTextEffect } from 'ui/types';
export declare class CssPropertiesHelper {
    /**
     * Получить свойства CSS по настройкам шрифта в виде TCssProperties
     * @param size Размере элемента UI
     * @param isBold Жирный шрифт
     * @param isFontAccent  Использовать шрифт для акцента внимания
     * @returns Свойства CSS по настройкам шрифта в виде TCssProperties
     */
    static getFontProps(size?: TControlSize, isBold?: boolean, isFontAccent?: boolean): TCssProperties;
    /**
     * Получить свойства CSS по эффектам текста в виде TCssProperties
     * @param size Размере элемента UI
     * @param effect Эффекты текста
     * @param textAlign Выравнивание текста по горизонтали внутри блока
     * @returns Свойства CSS по эффектам текста в виде TCssProperties
     */
    static getTextEffectProps(size?: TControlSize, effect?: TTextEffect, textAlign?: TCssTextAlign): TCssProperties;
    /**
     * Получить свойства CSS по радиусу границе в виде TCssProperties
     * @param size Размер элемента UI для получения оптимального радиуса
     * @param borderRadius Радиус скругления или статус того что его надо вычислить
     * @returns Свойства CSS по радиусу границе в виде TCssProperties
     */
    static getBorderRadiusProps(size?: TControlSize, borderRadius?: TCssBorderRadius): TCssProperties;
    /**
     * Получить свойства CSS по индивидуальному радиусу границе в виде TCssProperties
     * @param size Размер элемента UI для получения оптимального радиуса
     * @param borderRadius Радиус скругления или статус того что его надо вычислить
     * @param isTopLeft Скругление верхнего левого угла
     * @param isTopRight Скругление верхнего правого угла
     * @param isBottomLeft Скругление нижнего левого угла
     * @param isBottomRight Скругление нижнего правого угла
     * @returns
     */
    static getBorderRadiusIndividualProps(size?: TControlSize, borderRadius?: TCssBorderRadius, isTopLeft?: boolean, isTopRight?: boolean, isBottomLeft?: boolean, isBottomRight?: boolean): TCssProperties;
    /**
     * Получить свойства CSS по границе в виде TCssProperties
     * @param size Размер элемента UI для получения оптимального радиуса
     * @param borderStyle Стиль границ
     * @param borderWidth Ширина границ
     * @param borderColor Цвет границ
     * @returns Свойства CSS по границе в виде TCssProperties
     */
    static getBorderStyleProps(size?: TControlSize, borderStyle?: TCssBorderStyle, borderWidth?: TCssBorderWidth, borderColor?: TThemeColorVariant): TCssProperties;
    /**
     * Получить свойства CSS по индивидуальной границе в виде TCssProperties
     * @param size Размер элемента UI для получения оптимального радиуса
     * @param borderStyle Стиль границ
     * @param borderWidth Ширина границ
     * @param borderColor Цвет границ
     * @returns Свойства CSS по индивидуальной границе в виде TCssProperties
     */
    static getBorderStyleIndividualProps(size?: TControlSize, borderStyle?: TCssBorderStyle, borderWidth?: TCssBorderWidth, borderColor?: TThemeColorVariant, isLeft?: boolean, isTop?: boolean, isRight?: boolean, isBottom?: boolean): TCssProperties;
    /**
     * Получить свойства CSS по тени для границы в виде TCssProperties
     * @param elevation Относительный размер тени
     * @param color Цвет
     * @param shadowAlpha Альфа компонент цвета для тени
     * @returns Свойства CSS по тени для границы в виде TCssProperties
     */
    static getBorderShadowProps(elevation: TShadowElevation, color?: TThemeColorVariant, shadowAlpha?: number): TCssProperties;
    /**
     * Получить свойства CSS по переходу цвета и тени в виде TCssProperties
     * @returns Свойства CSS по переходу цвета и тени в виде TCssProperties
     */
    static getTransitionColorsProps(): TCssProperties;
    /**
     * Получить свойства CSS по тени в виде TCssProperties
     * @param elevation Относительный размер тени
     * @param color Цвет
     * @param colorVariant Вариант цвета
     * @returns Свойства CSS по тени в виде TCssProperties
     */
    static getBoxShadowProps(elevation: TShadowElevation, color?: TThemeColorVariant): TCssProperties;
    /**
     * Получить свойства CSS по трансформации масштабирования в виде TCssProperties
     * @param scale Масштаб
     * @returns Свойства CSS трансформации масштабирования в виде TCssProperties
     */
    static getTransformScaleProps(scale?: number): TCssProperties;
}
