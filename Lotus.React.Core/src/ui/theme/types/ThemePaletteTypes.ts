import { Color, ColorVariant, TColorVariantName } from 'lotus-core';

/**
 * Общие базовые цвета для палитры
 */
export interface IThemePaletteCommon
{
  /**
   * Белый цвет
   */
  readonly white: string;

  /**
   * Черный цвет
   */
  readonly black: string;
}

/**
 * Тип тематического цвета для палитры
 */
export type TThemePaletteModeColorType = 'main' | 'light' | 'dark' | 'contrastText';

/**
 * Тематические цвета для палитры
 */
export interface IThemePaletteModeColor
{
  /**
   * Основной цвет
   */
  readonly main: string;

  /**
   * Светлый цвет
   */
  readonly light: string;

  /**
   * Темный цвет
   */
  readonly dark: string;

  /**
   * Цвет текста
   */
  readonly contrastText: string;
}

/**
 * Цвета текста для палитры
 */
export interface IThemePaletteText
{
  /**
   * Основной цвет текста
   */
  readonly primary: string;

  /**
   * Дополнительный цвет текста
   */
  readonly secondary: string;

  /**
   * Цвет текста в недоступном состоянии
   */
  readonly disabled: string;

  /**
   * Цвет текста для иконки
   */
  readonly icon: string;
}

/**
 * Цвета фона для палитры
 */
export interface IThemePaletteBackground
{
  /**
   * Основной фоновый цвет
   */
  readonly default: string;

  /**
   * Фоновый цвет для отдельного элемента
   */
  readonly paper: string;
}

/**
 * Тип цвета действий для палитры
 */
export type TThemePaletteActionType = 'active' | 'hover' | 'selected' | 'disabled' | 'focus';

/**
 * Цвета действий для палитры
 */
export interface IThemePaletteAction
{
  readonly ripple: string;
  readonly active: string;
  readonly activatedOpacity: number;
  readonly hover: string
  readonly hoverOpacity: number;
  readonly selected: string
  readonly selectedOpacity: number;
  readonly disabled: string
  readonly disabledBackground: string
  readonly disabledOpacity: number;
  readonly focus: string
  readonly focusOpacity: number;
}

/**
 * Дополнительные цвета для палитры
 */
export interface IThemePaletteAdditionalColor
{
  /**
   * Варианты цветов
   */
  variants: ColorVariant;

  /**
   * Функция обратного вызова для получения цвета текста для указанного цвета фона
   * @param colorVariant Цвет фона
   * @param isHarmonious Гармоничный или контрастный цвет текста
   * @returns Гармоничный или контрастный цвет текста для данного фона
   */
  onText: (colorVariant: TColorVariantName, isHarmonious?:boolean) => Color
}