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
 * Цвета действий для палитры
 */
export interface IThemePaletteAction
{
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
 * Дополнительный цвет для палитры
 */
export interface IThemePaletteColor
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