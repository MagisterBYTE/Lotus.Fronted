import { IGeneralBackgroundProperties } from 'ui/base/GeneralBackgroundProperties';
import { TThemeColorVariant, TThemePaletteActionType, TThemePaletteComponentStructuralPart } from 'ui/theme';
import { TCssProperties } from 'ui/types';
import { TInteractivityState } from './InteractivityState';
export type TInteractivityBackgroundType = 'initial' | 'none' | 'mandatory';
/**
 * Интерактивное взаимодействие фона элемента
 */
export interface IInteractivityBackgroundProperties extends IGeneralBackgroundProperties {
    /**
     * Цвет фона при наведении
     */
    hoverBackColor?: TThemeColorVariant;
    /**
     * Цвет фона при нажатии
     */
    pressedBackColor?: TThemeColorVariant;
}
export declare class InteractivityBackgroundLogic {
    static getEffectByState(element: any, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
    static getProperties(element: any, type: TInteractivityBackgroundType, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
    static fillProperties(target: TCssProperties, element: any, type: TInteractivityBackgroundType, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
}
