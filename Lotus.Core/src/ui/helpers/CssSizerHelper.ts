import { NumberHelper } from 'helpers';
import { TControlPadding, TControlPaddingOffset, TControlSize, TCssProperties } from 'ui/types';

export class CssSizerHelper
{
  // #region Padding And Size
  /**
   * Получить свойства CSS по внутреннему отступу в виде TCssProperties
   * @param size Размере элемента UI
   * @param paddingControl Внутренний отступ
   * @param leftRight Тип отступа слева/справа
   * @param topBottom Тип отступа сверху/снизу
   * @returns Свойства CSS по внутреннему отступу в виде TCssProperties
   */
  public static getPaddingProps(size?: TControlSize, paddingControl?: TControlPadding, leftRight?: TControlPaddingOffset,
    topBottom?: TControlPaddingOffset): TCssProperties
  {
    const paddingProps: TCssProperties = {}

    switch (size)
    {
      case 'smaller':
        {
          switch (paddingControl)
          {
            case 'minimum':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '0.06rem';
                  paddingProps.paddingBottom = '0.08rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.06rem';
                  paddingProps.paddingBottom = '0.08rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '0.06rem';
                  paddingProps.paddingRight = '0.06rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.06rem';
                  paddingProps.paddingRight = '0.06rem';
                }
              } break;
            case 'normal':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '0.15rem';
                  paddingProps.paddingBottom = '0.15rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.1rem';
                  paddingProps.paddingBottom = '0.15rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '0.15rem';
                  paddingProps.paddingRight = '0.15rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.1rem';
                  paddingProps.paddingRight = '0.1rem';
                }
              } break;
            case 'enlarged':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '0.25rem';
                  paddingProps.paddingBottom = '0.25rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.15rem';
                  paddingProps.paddingBottom = '0.15rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '0.25rem';
                  paddingProps.paddingRight = '0.25rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.15rem';
                  paddingProps.paddingRight = '0.15rem';
                }
              } break;
          }
        } break;
      case 'small':
        {
          switch (paddingControl)
          {
            case 'minimum':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '0.12rem';
                  paddingProps.paddingBottom = '0.12rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.08rem';
                  paddingProps.paddingBottom = '0.1rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '0.12rem';
                  paddingProps.paddingRight = '0.12rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.08rem';
                  paddingProps.paddingRight = '0.08rem';
                }
              } break;
            case 'normal':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '0.25rem';
                  paddingProps.paddingBottom = '0.25rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.15rem';
                  paddingProps.paddingBottom = '0.175rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '0.25rem';
                  paddingProps.paddingRight = '0.25rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.15rem';
                  paddingProps.paddingRight = '0.15rem';
                }
              } break;
            case 'enlarged':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '0.4rem';
                  paddingProps.paddingBottom = '0.4rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.2rem';
                  paddingProps.paddingBottom = '0.25rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '0.4rem';
                  paddingProps.paddingRight = '0.4rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.2rem';
                  paddingProps.paddingRight = '0.2rem';
                }
              } break;
          }
        } break;
      case 'medium':
        {
          switch (paddingControl)
          {
            case 'minimum':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '0.25rem';
                  paddingProps.paddingBottom = '0.25rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.13rem';
                  paddingProps.paddingBottom = '0.13rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '0.25rem';
                  paddingProps.paddingRight = '0.25rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.13rem';
                  paddingProps.paddingRight = '0.13rem';
                }
              } break;
            case 'normal':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '0.375rem';
                  paddingProps.paddingBottom = '0.375rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.2rem';
                  paddingProps.paddingBottom = '0.2rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '0.375rem';
                  paddingProps.paddingRight = '0.375rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.2rem';
                  paddingProps.paddingRight = '0.2rem';
                }
              } break;
            case 'enlarged':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '0.55rem';
                  paddingProps.paddingBottom = '0.55rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.28rem';
                  paddingProps.paddingBottom = '0.28rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '0.55rem';
                  paddingProps.paddingRight = '0.55rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.28rem';
                  paddingProps.paddingRight = '0.28rem';
                }
              } break;
          }
        } break;
      case 'large':
        {
          switch (paddingControl)
          {
            case 'minimum':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '0.5rem';
                  paddingProps.paddingBottom = '0.5rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.25rem';
                  paddingProps.paddingBottom = '0.25rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '0.5rem';
                  paddingProps.paddingRight = '0.5rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.25rem';
                  paddingProps.paddingRight = '0.25rem';
                }
              } break;
            case 'normal':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '0.75rem';
                  paddingProps.paddingBottom = '0.75rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.375rem';
                  paddingProps.paddingBottom = '0.375rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '0.75rem';
                  paddingProps.paddingRight = '0.75rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.375rem';
                  paddingProps.paddingRight = '0.375rem';
                }
              } break;
            case 'enlarged':
              {
                if (topBottom == 'normal')
                {
                  paddingProps.paddingTop = '1.0rem';
                  paddingProps.paddingBottom = '1.0rem';
                }
                if (topBottom == 'half')
                {
                  paddingProps.paddingTop = '0.5rem';
                  paddingProps.paddingBottom = '0.5rem';
                }
                if (leftRight == 'normal')
                {
                  paddingProps.paddingLeft = '1.0rem';
                  paddingProps.paddingRight = '1.0rem';
                }
                if (leftRight == 'half')
                {
                  paddingProps.paddingLeft = '0.5rem';
                  paddingProps.paddingRight = '0.5rem';
                }
              } break;
          }
        } break;
    }

    return paddingProps;
  }

  /**
   * Конвертация размера элемента UI в высоту в пикселях
   * @param size Размере элемента UI
   * @param paddingControl Размер отступов элемента UI
   * @param topBottom Режим отступов по высоте элемента UI
   * @param lineHeight Коэффициент высоты строки
   * @returns Соответствующий размер высоты в пикселях
   */
  public static getSizeProps(size?: TControlSize, paddingControl?: TControlPadding, topBottom?: TControlPaddingOffset, lineHeight?: number): TCssProperties
  {
    const result: number = CssSizerHelper.convertControlSizeToHeightRem(size, paddingControl, topBottom);
    if (lineHeight)
    {
      return {
        width: `${result * 16 * lineHeight}px`,
        height: `${result * 16 * lineHeight}px`
      }
    }
    else
    {
      return {
        width: `${result * 16}px`,
        height: `${result * 16}px`
      }
    }
  }
  // #endregion

  /**
   * Конвертация размера элемента UI в высоту в rem
   * @param size Размере элемента UI
   * @param paddingControl Размер отступов элемента UI
   * @param topBottom Режим отступов по высоте элемента UI
   * @returns Соответствующий размер высоты в rem
   */
  public static convertControlSizeToHeightRem(size?: TControlSize, paddingControl?: TControlPadding, topBottom?: TControlPaddingOffset): number
  {
    let result: number = 0;
    if (size)
    {
      switch (size)
      {
        case 'smaller': result = 10 / 16; break;
        case 'small': result = 13 / 16; break;
        case 'medium': result = 1; break;
        case 'large': result = 19 / 16; break;
      }
    }

    const css = CssSizerHelper.getPaddingProps(size, paddingControl, 'normal', topBottom);

    if (css.paddingTop) result += NumberHelper.parseFloat(css.paddingTop as string);
    if (css.paddingBottom) result += NumberHelper.parseFloat(css.paddingBottom as string);

    return result;
  }

  /**
   * Конвертация размера элемента UI в высоту в пикселях
   * @param size Размере элемента UI
   * @param paddingControl Размер отступов элемента UI
   * @param topBottom Режим отступов по высоте элемента UI
   * @param lineHeight Коэффициент высоты строки
   * @returns Соответствующий размер высоты в пикселях
   */
  public static convertControlSizeToHeightPixel(size?: TControlSize, paddingControl?: TControlPadding, topBottom?: TControlPaddingOffset, lineHeight?: number): number
  {
    const result: number = CssSizerHelper.convertControlSizeToHeightRem(size, paddingControl, topBottom);
    if (lineHeight)
    {
      return result * 16 * lineHeight;
    }
    else
    {
      return result * 16;
    }
  }

  /**
   * Конвертация размера элемента UI в соответствующий размер иконки в rem
   * @param size Размере элемента UI
   * @returns Соответствующий размер иконки в rem
   */
  public static convertControlSizeToIconSizeInRem(size?: TControlSize): number
  {
    if (size)
    {
      switch (size)
      {
        case 'smaller': return 10 / 16 * 1.5;
        case 'small': return 13 / 16 * 1.5;
        case 'medium': return 1.5;
        case 'large': return 19 / 16 * 1.5;
      }
    }

    return 1.5;
  }

  /**
   * Конвертация размера элемента UI в соответствующий размер иконки в пикселях
   * @param size Размере элемента UI
   * @returns Соответствующий размер иконки в пикселях
   */
  public static convertControlSizeToIconSizeInPixel(size?: TControlSize): number
  {
    if (size)
    {
      switch (size)
      {
        case 'smaller': return 10 * 1.5;
        case 'small': return 13 * 1.5;
        case 'medium': return 16 * 1.5;
        case 'large': return 19 * 1.5;
      }
    }

    return 16 * 1.5;
  }
}