export declare const TColorVariantIndexWhite = 1;
export declare const TColorVariantIndexPalest = 2;
export declare const TColorVariantIndexLighter = 3;
export declare const TColorVariantIndexLight = 4;
export declare const TColorVariantIndexMain = 5;
export declare const TColorVariantIndexDark = 6;
export declare const TColorVariantIndexDarker = 7;
export declare const TColorVariantIndexDarkest = 8;
export declare const TColorVariantIndexBlack = 9;
/**
 * Числовой индекс в вариативности цветов, где 1 самый светлый, 5 базовый(опорный) цвет, 9 – самый темный
 */
export type TColorVariantIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
/**
 * Именованный тип в вариативности цветов, где white самый светлый, main базовый(опорный) цвет, black – самый темный
 */
export type TColorVariantName = 'white' | 'palest' | 'lighter' | 'light' | 'main' | 'dark' | 'darker' | 'darkest' | 'black';
/**
 * Массив всех именованных типов в вариативности цветов
 */
export declare const TColorVariantNames: readonly TColorVariantName[];
