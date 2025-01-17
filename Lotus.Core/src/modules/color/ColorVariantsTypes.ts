export const TColorVariantIndexWhite = 1;
export const TColorVariantIndexPalest = 2;
export const TColorVariantIndexPale = 3;
export const TColorVariantIndexLighter = 4;
export const TColorVariantIndexLight = 5;
export const TColorVariantIndexMain = 6;
export const TColorVariantIndexDark = 7;
export const TColorVariantIndexDarker = 8;
export const TColorVariantIndexDarkest = 9;
export const TColorVariantIndexBlack = 10;

/**
 * Числовой индекс в вариативности цветов, где 1 самый светлый, 6 базовый(опорный) цвет, 10 – самый темный
 */
export type TColorVariantIndex =  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/**
 * Именованный тип в вариативности цветов, где white самый светлый, main базовый(опорный) цвет, black – самый темный
 */
export type TColorVariantName = 'white' | 'palest' | 'pale' | 'lighter' | 'light' | 'main' | 'dark' | 'darker' | 'darkest' | 'black';

/**
 * Массив всех именованных типов в вариативности цветов
 */
export const TColorVariantNames: readonly TColorVariantName[] = ['white', 'palest', 'pale', 'lighter', 'light', 'main', 'dark', 'darker', 'darkest', 'black'];