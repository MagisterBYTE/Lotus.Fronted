import { TControlPadding, TControlSize, TCssAlignItems, TCssJustifyContent, TCssProperties, TIconPlacement } from 'ui/types';
export declare class CssContainerHelper {
    /**
     * Получить оптимальный размер пространства между элементами по горизонтали для Flex контейнера
     * @param size Размер элемента
     * @param paddingControl Внутренний отступ
     * @returns Размер пространства в rem
     */
    static getColumnGapFromSizeInRem(size: TControlSize, paddingControl: TControlPadding): number;
    /**
     * Получить оптимальные настройки Flex контейнера по горизонтали в виде TCssProperties
     * @param size Размер элемента
     * @param paddingControl Внутренний отступ
     * @param isReverse Обратный порядок элементов
     * @param horizontalAlign Распределение элементов по ширине
     * @param verticalAlign Выравнивание элементов по вертикали
     * @returns Настройки Flex контейнера в виде TCssProperties
     */
    static getFlexRowContainer(size: TControlSize, paddingControl: TControlPadding, isReverse?: boolean, horizontalAlign?: TCssJustifyContent, verticalAlign?: TCssAlignItems): TCssProperties;
    /**
     * Получить оптимальный размер пространства между элементами по вертикали для Flex контейнера
     * @param size Размер элемента
     * @param paddingControl Внутренний отступ
     * @returns Размер пространства в rem
     */
    static getRowGapFromSizeInRem(size: TControlSize, paddingControl: TControlPadding): number;
    /**
     * Получить оптимальные настройки Flex контейнера по вертикали в виде TCssProperties
     * @param size Размер элемента
     * @param paddingControl Внутренний отступ
     * @param isReverse Обратный порядок элементов
     * @param verticalAlign Распределение элементов по высоте
     * @param horizontalAlign Выравнивание элементов по горизонтали
     * @returns Настройки Flex контейнера в виде TCssProperties
     */
    static getFlexColumnContainer(size: TControlSize, paddingControl: TControlPadding, isReverse?: boolean, verticalAlign?: TCssJustifyContent, horizontalAlign?: TCssAlignItems): TCssProperties;
    /**
     * Получить оптимальные настройки Flex контейнера для расположения иконки
     * @param iconPlacement Вариант размещения иконки
     * @param size Размер элемента
     * @param paddingControl Внутренний отступ
     * @returns Настройки Flex контейнера в виде TCssProperties
     */
    static getFlexContainerByIcon(iconPlacement: TIconPlacement, size: TControlSize, paddingControl: TControlPadding): TCssProperties;
}
