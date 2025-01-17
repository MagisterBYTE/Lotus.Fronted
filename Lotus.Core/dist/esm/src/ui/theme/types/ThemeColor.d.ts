import { IOption } from 'modules/option';
/**
 * Тип цвета
 */
export type TThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'blue' | 'blueGrey' | 'indigo' | 'green' | 'teal' | 'yellow' | 'amber' | 'red' | 'brown';
/**
 * Массив типов цветов
 */
export declare const TThemeColors: readonly TThemeColor[];
/**
 * Набор типов цветов в виде опций
 */
export declare const ThemeColorOptions: IOption[];
/**
 * Функция для проверки, является ли цвет типом цвета
 * @param color Проверяемый цвет
 * @returns Статус проверки
 */
export declare function checkOfThemeColor(color: any): color is TThemeColor;
