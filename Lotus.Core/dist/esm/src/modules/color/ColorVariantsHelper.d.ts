import { Color } from './Color';
import { TColorVariantIndex, TColorVariantName } from './ColorVariantsTypes';
export declare class ColorVariantsHelper {
    /**
     * Получить цвет по его индексу
     * @param index Числовой индекс в палитре цветов
     * @returns Именованный тип в палитре цветов
     */
    static getNameByIndex(index?: TColorVariantIndex): TColorVariantName;
    /**
     * Получить индексу по имени цвета
     * @param name Именованный тип в палитре цветов
     * @returns Числовой индекс в палитре цветов
     */
    static getIndexByName(name?: TColorVariantName): TColorVariantIndex;
    /**
     * Получить индекс смещенный на определенную величину
     * @param index Числовой индекс в палитре цветов
     * @param delta Смещение
     * @returns Числовой индекс в палитре цветов
     */
    static getNextIndex(index?: TColorVariantIndex, delta?: number): TColorVariantIndex;
    /**
     * Вычислить цвет на основании варианта
     * @param baseColor Базовый цвет
     * @param name Именованный тип в вариативности цветов
     */
    static calcColor(baseColor: Color, name?: TColorVariantName): Color;
}
