import { TControlPadding, TControlPaddingOffset, TControlSize, TCssProperties } from 'ui/types';
export declare class CssSizerHelper {
    /**
     * Получить свойства CSS по внутреннему отступу в виде TCssProperties
     * @param size Размере элемента UI
     * @param paddingControl Внутренний отступ
     * @param leftRight Тип отступа слева/справа
     * @param topBottom Тип отступа сверху/снизу
     * @returns Свойства CSS по внутреннему отступу в виде TCssProperties
     */
    static getPaddingProps(size?: TControlSize, paddingControl?: TControlPadding, leftRight?: TControlPaddingOffset, topBottom?: TControlPaddingOffset): TCssProperties;
    /**
     * Конвертация размера элемента UI в высоту в пикселях
     * @param size Размере элемента UI
     * @param paddingControl Размер отступов элемента UI
     * @param topBottom Режим отступов по высоте элемента UI
     * @param lineHeight Коэффициент высоты строки
     * @returns Соответствующий размер высоты в пикселях
     */
    static getSizeProps(size?: TControlSize, paddingControl?: TControlPadding, topBottom?: TControlPaddingOffset, lineHeight?: number): TCssProperties;
    /**
     * Конвертация размера элемента UI в высоту в rem
     * @param size Размере элемента UI
     * @param paddingControl Размер отступов элемента UI
     * @param topBottom Режим отступов по высоте элемента UI
     * @returns Соответствующий размер высоты в rem
     */
    static convertControlSizeToHeightRem(size?: TControlSize, paddingControl?: TControlPadding, topBottom?: TControlPaddingOffset): number;
    /**
     * Конвертация размера элемента UI в высоту в пикселях
     * @param size Размере элемента UI
     * @param paddingControl Размер отступов элемента UI
     * @param topBottom Режим отступов по высоте элемента UI
     * @param lineHeight Коэффициент высоты строки
     * @returns Соответствующий размер высоты в пикселях
     */
    static convertControlSizeToHeightPixel(size?: TControlSize, paddingControl?: TControlPadding, topBottom?: TControlPaddingOffset, lineHeight?: number): number;
    /**
     * Конвертация размера элемента UI в соответствующий размер иконки в rem
     * @param size Размере элемента UI
     * @returns Соответствующий размер иконки в rem
     */
    static convertControlSizeToIconSizeInRem(size?: TControlSize): number;
    /**
     * Конвертация размера элемента UI в соответствующий размер иконки в пикселях
     * @param size Размере элемента UI
     * @returns Соответствующий размер иконки в пикселях
     */
    static convertControlSizeToIconSizeInPixel(size?: TControlSize): number;
}
