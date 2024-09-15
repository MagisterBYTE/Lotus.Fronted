export const TColorVariantIndexWhite = 1;
export const TColorVariantIndexPalest = 2;
export const TColorVariantIndexLighter = 3;
export const TColorVariantIndexLight = 4;
export const TColorVariantIndexMain = 5;
export const TColorVariantIndexDark = 6;
export const TColorVariantIndexDarker = 7;
export const TColorVariantIndexDarkest = 8;
export const TColorVariantIndexBlack = 9;

/**
 * Числовой индекс в вариативности цветов, где 1 самый светлый, 5 базовый(опорный) цвет, 9 – самый темный
 */
export type TColorVariantIndex =  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 * Именованный тип в вариативности цветов, где white самый светлый, main базовый(опорный) цвет, black – самый темный
 */
export type TColorVariantName = 'white' | 'palest' | 'lighter' | 'light' | 'main' | 'dark' | 'darker' | 'darkest' | 'black';

/**
 * Массив всех именованных типов в вариативности цветов
 */
export const TColorVariantNames: readonly TColorVariantName[] = ['white', 'palest', 'lighter', 'light', 'main', 'dark', 'darker', 'darkest', 'black'];