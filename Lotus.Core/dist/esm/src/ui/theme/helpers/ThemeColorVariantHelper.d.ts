import { TColorVariantName } from 'modules/color';
import { TThemeColor, TThemeColorVariant } from '../types';
export declare class ThemeColorVariantHelper {
    /**
     * Функция для проверки, является ли цвет вариантом цвета темы
     * @param color Проверяемый цвет
     * @returns Статус проверки
     */
    static checkOf(color: any): color is TThemeColorVariant;
    /**
     * Создание вариант цвета темы
     * @param color Тип цвета темы
     * @param colorVariant Именованный тип в вариативности цветов
     * @returns Вариант цвета темы
     */
    static create(color: TThemeColor, colorVariant: TColorVariantName): TThemeColorVariant;
    /**
     * Деконструкция варианта цвета темы в тип цвета темы и именованный тип в вариативности цветов
     * @param color Вариант цвета темы
     * @returns Тип цвета темы и именованный тип в вариативности цветов
     */
    static deconstruction(color: any): {
        themeColor: TThemeColor;
        colorVariant: TColorVariantName;
    } | undefined;
    /**
     * Получить варианта цвета темы смещенный на указанную величину
     * @param color Вариант цвета темы
     * @returns Смещенный варианта цвета
     */
    static next(color: TThemeColorVariant, delta?: number): TThemeColorVariant;
}
