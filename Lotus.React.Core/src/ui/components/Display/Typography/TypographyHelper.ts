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
}