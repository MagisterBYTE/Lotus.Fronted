export declare const TColorVariantIndexWhite = 1;
export declare const TColorVariantIndexPalest = 2;
export declare const TColorVariantIndexPale = 3;
export declare const TColorVariantIndexLighter = 4;
export declare const TColorVariantIndexLight = 5;
export declare const TColorVariantIndexMain = 6;
export declare const TColorVariantIndexDark = 7;
export declare const TColorVariantIndexDarker = 8;
export declare const TColorVariantIndexDarkest = 9;
export declare const TColorVariantIndexBlack = 10;
/**
 * Числовой индекс в вариативности цветов, где 1 самый светлый, 6 базовый(опорный) цвет, 10 – самый темный
 */
export type TColorVariantIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
/**
 * Именованный тип в вариативности цветов, где white самый светлый, main базовый(опорный) цвет, black – самый темный
 */
export type TColorVariantName = 'white' | 'palest' | 'pale' | 'lighter' | 'light' | 'main' | 'dark' | 'darker' | 'darkest' | 'black';
/**
 * Массив всех именованных типов в вариативности цветов
 */
export declare const TColorVariantNames: readonly TColorVariantName[];
/**
 * Функция для проверки, является ли значение именованным типом в вариативности цветов
 * @param value Проверяемое значение
 * @returns Статус проверки
 */
export declare function checkOfColorVariantName(value: any): value is TColorVariantName;
