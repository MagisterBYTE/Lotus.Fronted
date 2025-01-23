import { TControlPaddingOffset, TCssProperties } from 'ui/types';
import { TInteractivityModel } from 'ui/interactivity';
export interface ICssPropertiesBuilderContext {
    /**
     * Скругление верхнего левого угла
     */
    isTopLeft?: boolean;
    /**
     * Скругление верхнего правого угла
     */
    isTopRight?: boolean;
    /**
     * Скругление нижнего левого угла
     */
    isBottomLeft?: boolean;
    /**
     * Скругление нижнего правого угла
     */
    isBottomRight?: boolean;
    /**
     * Тип отступа слева/справа
     */
    leftRight?: TControlPaddingOffset;
    /**
     * Тип отступа сверху/снизу
     */
    topBottom?: TControlPaddingOffset;
    /**
     * Статус выбора
     */
    isSelected?: boolean;
}
export declare class CssPropertiesBuilder {
    static buildElement(props: any, context?: ICssPropertiesBuilderContext): TCssProperties;
    static buildInteractivityElement(model: TInteractivityModel, props: any, context?: ICssPropertiesBuilderContext): TCssProperties;
}
