import { TCssProperties } from 'ui/types';
import { TInteractivityModel } from './InteractivityModel';
import { TInteractivityState } from './InteractivityState';
import { IInteractivityElementProperties } from './InteractivityElement';
/**
 * Контекст элемента UI для применения визуального эффекта
 */
export interface IEffectContextProps {
    /**
     * Элемент находиться в статусе выбора
     */
    isSelected?: boolean;
    /**
     *  Элемент не доступен
     */
    isDisabled?: boolean;
    /**
     *  Элемент находиться в фокусе
     */
    isFocused?: boolean;
    /**
     * Нужно ли применять Ripple Effect
     */
    hasRippleEffect?: boolean;
}
/**
 * Логика применения визуальных эффектов к элементу UI в зависимости от модель применения и состояния интерактивности элемента
 */
export declare class InteractivityLogic {
    /**
     * Получить визуальный эффекты для фона элемента UI
     * @param model Модель применения визуальных эффектов к элементу UI
     * @param state Состояние интерактивности элемента UI
     * @param elem Интерактивный элемент
     * @param isSelected Контекст элемента UI для применения визуального эффекта
     * @returns Свойства CSSProperties
     */
    static getEffectProps(model: TInteractivityModel, state: TInteractivityState, element: IInteractivityElementProperties, context?: IEffectContextProps): TCssProperties;
}
