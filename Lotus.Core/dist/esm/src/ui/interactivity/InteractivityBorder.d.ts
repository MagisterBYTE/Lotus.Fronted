import { TColorVariantName } from 'modules/color';
import { IGeneralBorderProperties } from 'ui/base';
import { TThemePaletteActionType, TThemePaletteComponentStructuralPart } from 'ui/theme';
import { TCssProperties } from 'ui/types';
import { TInteractivityState } from './InteractivityState';
export type TInteractivityBorderType = 'none' | 'maybe' | 'invisible' | 'mandatory';
/**
 * Интерактивное взаимодействие границы элемента
 */
export interface IInteractivityBorderProperties extends IGeneralBorderProperties {
    /**
     * Цвет границы при наведении
     */
    hoverBorderColor?: TColorVariantName;
    /**
     * Цвет границы при нажатии
     */
    pressedBorderColor?: TColorVariantName;
}
export declare class InteractivityBorderLogic {
    static getEffectByState(element: any, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
    static getProperties(element: any, type: TInteractivityBorderType, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
    static fillProperties(target: TCssProperties, element: any, type: TInteractivityBorderType, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
}
