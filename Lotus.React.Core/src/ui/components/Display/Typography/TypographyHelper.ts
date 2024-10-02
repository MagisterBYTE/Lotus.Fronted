import { TControlSize } from 'ui/types';
import { TTypographyVariant } from './TypographyVariant';

export class TypographyHelper
{
  /**
   * Получение оптимального варианта текста при указанном размере элемента UI
   * @param size Размер элемента UI
   * @returns Оптимальный варианта текста
   */
  public static getTypographyVariantByControlSize(size?: TControlSize): TTypographyVariant
  {
    if (size)
    {
      switch (size)
      {
        case 'smaller': return 'smaller';
        case 'small': return 'small';
        case 'medium': return 'medium';
        case 'large': return 'large';
      }
    }

    return 'medium';
  }

  /**
   * Получение размера элемента UI при указанном варианте отображения текста 
   * @param size Вариант отображения текста 
   * @returns Размер элемента UI
   */
  public static convertTypographyVariantToControlSize(variant?: TTypographyVariant): TControlSize
  {
    if (variant)
    {
      switch (variant)
      {
        case 'smaller': return 'smaller';
        case 'small': return 'small';
        case 'medium': return 'medium';
        case 'large': return 'large';
      }
    }

    return 'medium';
  }

  /**
   * Конвертация варианта отображения текста в высоту в пикселях
   * @param size Вариант отображения текста 
   * @returns Соответствующий размер высоты в пикселях
   */
  public static convertTypographyVariantToHeightPixel(variant?: TTypographyVariant): number
  {
    if (variant)
    {
      switch (variant)
      {
        case 'h3': return 3 * 16 * 1.2;
        case 'h4': return 2.125 * 16 * 1.2;
        case 'h5': return 1.5 * 16 * 1.2;
        case 'h6': return 1.25 * 16 * 1.1;
        case 'large': return 18 * 1.05;
        case 'medium': return 16 * 1.05;
        case 'small': return 13 * 1;
        case 'smaller': return 10 * 0.8;
        case 'body1': return 1 * 16 * 1.1;
        case 'body2': return 0.875 * 16 * 1.05;
      }
    }

    return 16;
  }
}