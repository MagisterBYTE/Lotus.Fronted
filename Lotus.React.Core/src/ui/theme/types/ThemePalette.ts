import { Color, ColorVariant, TColorVariantName } from 'lotus-core';

/**
 * Палитра цвета
 * Палитра цвета определяет варианты цветов и их применение к элемента интерфейса
 */
export interface IThemePalette
{
  /**
   * Варианты цветов
   */
  variants: ColorVariant;

  /**
   * Функция обратного вызова для получения цвета текса для указанного цвета фона
   * @param colorVariant Цвет фона
   * @returns Оптимальный цвет текса для данного фона
   */
  onText: (colorVariant: TColorVariantName) => Color

  /**
   * Функция обратного вызова для получения цвета границы для указанного цвета фона
   * @param colorVariant Цвет фона
   * @returns Оптимальный цвет границы для данного фона
   */
  onBorder: (colorVariant: TColorVariantName) => Color
}

/**
 * Палитра цвета
 */
export class ThemePalette implements IThemePalette
{
  // #region Fields
  /**
   * Варианты цветов
   */
  public variants: ColorVariant;

  /**
   * Функция обратного вызова для получения цвета текса для указанного цвета фона
   * @param colorVariant Цвет фона
   * @returns Оптимальный цвет текса для данного фона
   */
  public onText: (colorVariant: TColorVariantName) => Color

  /**
   * Функция обратного вызова для получения цвета границы для указанного цвета фона
   * @param colorVariant Цвет фона
   * @returns Оптимальный цвет границы для данного фона
   */
  public onBorder: (colorVariant: TColorVariantName) => Color
  // #endregion

  constructor(variants: ColorVariant, onText?: (colorVariant: TColorVariantName) => Color, onBorder?: (colorVariant: TColorVariantName) => Color)
  {
    this.variants = variants;
    this.getTextColor = this.getTextColor.bind(this);
    this.getBorderColor = this.getBorderColor.bind(this);
    this.onText = onText ?? this.getTextColor;
    this.onBorder = onBorder ?? this.getBorderColor;
  }


  public getTextColor(colorVariant: TColorVariantName):Color
  {
    const color = this.variants.getByName(colorVariant);
    return color.createMatchingColor().text;
  }

  public getBorderColor(colorVariant: TColorVariantName)
  {
    const color = this.variants.getNextByName(colorVariant, 2);
    return color;
  }
}