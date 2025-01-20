import { IGeneralTextProperties } from 'ui/base';
import { TThemePaletteComponentStructuralPart, TThemeColorVariant, TThemePaletteActionType } from 'ui/theme';
import { TCssProperties } from 'ui/types';
import { TInteractivityState } from './InteractivityState';
export type TInteractivityTextType = 'default' | 'background';
/**
 * Интерактивное взаимодействие текста элемента
 */
export interface IInteractivityTextProperties extends IGeneralTextProperties {
    /**
     * Цвет текста при наведении
     */
    hoverTextColor?: TThemeColorVariant;
    /**
     * Цвет текста при нажатии
     */
    pressedTextColor?: TThemeColorVariant;
}
export declare class InteractivityTextLogic {
    static getEffectByState(element: any, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
    static getProperties(element: any, type: TInteractivityTextType, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
    static fillProperties(target: TCssProperties, element: any, type: TInteractivityTextType, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
}
