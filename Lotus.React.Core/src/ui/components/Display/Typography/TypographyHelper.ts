import { TControlSize } from 'ui/types';
import { TTypographyVariant } from './TypographyVariant';

export class TypographyHelper
{
  /**
   * Получение оптимального варианта текста при указанном размере элемента UI
   * @param size Размере элемента UI
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
   * Конвертация варианта отображения текста в высоту в пикселях
   * @param size Вариант отображения текста 
   * @returns Соответствующий размер высоты в пикселях
   */
  public static getTypographyVariantToHeightPixel(variant?: TTypographyVariant): number
  {
    if (variant)
    {
      switch (variant)
      {
        case 'h3': return 3*16;
        case 'h4': return 2.125*16;
        case 'h5': return 1.5*16;
        case 'h6': return 1.25*16;
        case 'large': return 18;
        case 'medium': return 16;
        case 'small': return 13;
        case 'smaller': return 10;
        case 'body1': return 1*16;
        case 'body2': return 0.875*16;
      }
    }

    return 16;
  }
}