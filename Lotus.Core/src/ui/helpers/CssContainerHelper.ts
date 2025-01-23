import { TControlPadding, TControlSize, TCssAlignItems, TCssJustifyContent, TCssProperties, TIconPlacement } from 'ui/types';

export class CssContainerHelper
{
  // #region FlexRowContainer
  /**
   * Получить оптимальный размер пространства между элементами по горизонтали для Flex контейнера
   * @param size Размер элемента
   * @param paddingControl Внутренний отступ
   * @returns Размер пространства в rem
   */
  public static getColumnGapFromSizeInRem(size: TControlSize, paddingControl: TControlPadding): number
  {
    switch (size) 
    {
      case 'smaller':
        {
          switch (paddingControl)
          {
            case 'minimum': return 0.12;
            case 'normal': return 0.15;
            case 'enlarged': return 0.2;
          }
        } break;
      case 'small':
        {
          switch (paddingControl)
          {
            case 'minimum': return 0.15;
            case 'normal': return 0.2;
            case 'enlarged': return 0.25;
          }
        } break;
      case 'medium':
        {
          switch (paddingControl)
          {
            case 'minimum': return 0.25;
            case 'normal': return 0.3;
            case 'enlarged': return 0.375;
          }
        } break;
      case 'large':
        {
          switch (paddingControl)
          {
            case 'minimum': return 0.2;
            case 'normal': return 0.35;
            case 'enlarged': return 0.45;
          }
        } break;
    }

    return 0.3;
  }

  /**
   * Получить оптимальные настройки Flex контейнера по горизонтали в виде TCssProperties
   * @param size Размер элемента
   * @param paddingControl Внутренний отступ
   * @param isReverse Обратный порядок элементов
   * @param horizontalAlign Распределение элементов по ширине
   * @param verticalAlign Выравнивание элементов по вертикали
   * @returns Настройки Flex контейнера в виде TCssProperties
   */
  public static getFlexRowContainer(size: TControlSize, paddingControl: TControlPadding, isReverse:boolean = false, 
    horizontalAlign: TCssJustifyContent = 'flex-start', verticalAlign: TCssAlignItems = 'center'): TCssProperties
  {
    return {
      display: 'flex',
      flexDirection:  isReverse ? 'row-reverse' : 'row',
      justifyContent: horizontalAlign,
      alignItems: verticalAlign,
      columnGap: `${CssContainerHelper.getColumnGapFromSizeInRem(size, paddingControl)}rem`
    }
  }
  // #endregion

  // #region FlexColumnContainer
  /**
   * Получить оптимальный размер пространства между элементами по вертикали для Flex контейнера
   * @param size Размер элемента
   * @param paddingControl Внутренний отступ
   * @returns Размер пространства в rem
   */
  public static getRowGapFromSizeInRem(size: TControlSize, paddingControl: TControlPadding): number
  {
    switch (size) 
    {
      case 'smaller':
        {
          switch (paddingControl)
          {
            case 'minimum': return 0.24;
            case 'normal': return 0.3;
            case 'enlarged': return 0.4;
          }
        } break;
      case 'small':
        {
          switch (paddingControl)
          {
            case 'minimum': return 0.3;
            case 'normal': return 0.4;
            case 'enlarged': return 0.5;
          }
        } break;
      case 'medium':
        {
          switch (paddingControl)
          {
            case 'minimum': return 0.5;
            case 'normal': return 0.6;
            case 'enlarged': return 0.75;
          }
        } break;
      case 'large':
        {
          switch (paddingControl)
          {
            case 'minimum': return 0.4;
            case 'normal': return 0.7;
            case 'enlarged': return 0.9;
          }
        } break;
    }

    return 0.6;
  }

  /**
   * Получить оптимальные настройки Flex контейнера по вертикали в виде TCssProperties
   * @param size Размер элемента
   * @param paddingControl Внутренний отступ
   * @param isReverse Обратный порядок элементов
   * @param verticalAlign Распределение элементов по высоте
   * @param horizontalAlign Выравнивание элементов по горизонтали
   * @returns Настройки Flex контейнера в виде TCssProperties
   */
  public static getFlexColumnContainer(size: TControlSize, paddingControl: TControlPadding, isReverse:boolean = false, 
    verticalAlign: TCssJustifyContent = 'flex-start', horizontalAlign: TCssAlignItems = 'center'): TCssProperties
  {
    return {
      display: 'flex',
      flexDirection:  isReverse ? 'column-reverse' : 'column',
      justifyContent: verticalAlign,
      alignItems: horizontalAlign,
      rowGap: `${CssContainerHelper.getRowGapFromSizeInRem(size, paddingControl)}rem`
    }
  }
  // #endregion

  /**
   * Получить оптимальные настройки Flex контейнера для расположения иконки
   * @param iconPlacement Вариант размещения иконки
   * @param size Размер элемента
   * @param paddingControl Внутренний отступ
   * @returns Настройки Flex контейнера в виде TCssProperties
   */
  public static getFlexContainerByIcon(iconPlacement:TIconPlacement, size: TControlSize, paddingControl: TControlPadding):TCssProperties
  {
    switch (iconPlacement)
    {
      case 'left': return CssContainerHelper.getFlexRowContainer(size, paddingControl);
      case 'right': return CssContainerHelper.getFlexRowContainer(size, paddingControl, true);
      case 'top': return CssContainerHelper.getFlexColumnContainer(size, paddingControl);
      case 'bottom': return CssContainerHelper.getFlexColumnContainer(size, paddingControl, true);
    }
  
    return {};
  }
}