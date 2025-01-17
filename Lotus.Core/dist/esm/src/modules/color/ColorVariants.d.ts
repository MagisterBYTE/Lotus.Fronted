import { Color } from './Color';
import { TColorVariantIndex, TColorVariantName } from './ColorVariantsTypes';
/**
 * Интерфейс вариативности цветов
 * Вариативность цветов - совокупность цветов расположенных от самого светлого до самого темного от основного цвета.
 */
export interface IColorVariants {
    readonly white: Color;
    readonly palest: Color;
    readonly pale: Color;
    readonly lighter: Color;
    readonly light: Color;
    readonly main: Color;
    readonly dark: Color;
    readonly darker: Color;
    readonly darkest: Color;
    readonly black: Color;
}
/**
 * Вариативность цветов
 */
export declare class ColorVariants implements IColorVariants {
    static createFromColorLightness(red: number, green: number, blue: number): ColorVariants;
    static createFromColorCombine(red: number, green: number, blue: number): ColorVariants;
    static createFromColorRelativeLightness(mainColor: string, lightColor: string, darkColor: string): ColorVariants;
    readonly white: Color;
    readonly palest: Color;
    readonly pale: Color;
    readonly lighter: Color;
    readonly light: Color;
    readonly main: Color;
    readonly dark: Color;
    readonly darker: Color;
    readonly darkest: Color;
    readonly black: Color;
    constructor(white: Color, palest: Color, pale: Color, lighter: Color, light: Color, main: Color, dark: Color, darker: Color, darkest: Color, black: Color);
    /**
     * Получить цвет по его имени
     * @param name Именованный тип в палитре цветов
     * @param modifyAlpha Модификация значения альфы от 0 до 1
     */
    getByName(name?: TColorVariantName, modifyAlpha?: number): Color;
    /**
     * Получить цвет по его индексу
     * @param index  Числовой индекс в палитре цветов
     * @param modifyAlpha Модификация значения альфы от 0 до 1
     */
    getByIndex(index?: TColorVariantIndex, modifyAlpha?: number): Color;
    /**
     * Получить следующий цвет по его имени
     * @param name Именованный тип в палитре цветов
     * @param delta Смещение
     * @param modifyAlpha Модификация значения альфы от 0 до 1
     */
    getNextByName(name?: TColorVariantName, delta?: number, modifyAlpha?: number): Color;
}
