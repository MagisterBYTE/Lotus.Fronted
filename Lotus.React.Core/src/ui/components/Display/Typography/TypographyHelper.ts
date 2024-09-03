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
        case 'smaller': return TTypographyVariant.TitleSmaller;
        case 'small': return TTypographyVariant.TitleSmall;
        case 'medium': return TTypographyVariant.TitleMedium;
        case 'large': return TTypographyVariant.TitleLarge;
      }
    }

    return TTypographyVariant.TitleMedium;
  }
}