import { TThemeColorVariant, TThemePaletteActionType, TThemePaletteComponentStructuralPart } from 'ui/theme';
import { TCssProperties } from 'ui/types';
import { IGeneralBorderProperties } from 'ui/base/GeneralBorderProperties';
import { TInteractivityState } from './InteractivityState';
export type TInteractivityBorderType = 'none' | 'maybe' | 'invisible' | 'mandatory';
/**
 * Интерактивное взаимодействие границы элемента
 */
export interface IInteractivityBorderProperties extends IGeneralBorderProperties {
    /**
     * Цвет границы при наведении
     */
    hoverBorderColor?: TThemeColorVariant;
    /**
     * Цвет границы при нажатии
     */
    pressedBorderColor?: TThemeColorVariant;
}
export declare class InteractivityBorderLogic {
    static getEffectByState(element: any, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
    static getProperties(element: any, type: TInteractivityBorderType, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
    static fillProperties(target: TCssProperties, element: any, type: TInteractivityBorderType, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
}
