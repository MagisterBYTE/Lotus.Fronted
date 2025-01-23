/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectHelper } from 'helpers';
import { IGeneralTextProperties } from 'ui/base/GeneralTextProperties';
import
{
  TThemeColorVariant, TThemeColorVariantUndef,
  TThemePaletteActionType,
  TThemePaletteComponentStructuralPart,
  ThemeColorVariantHelper,
  ThemePaletteHelper
} from 'ui/theme';
import { TCssProperties } from 'ui/types';
import { TInteractivityState } from './InteractivityState';

export type TInteractivityTextType =
  | 'default'      // Стандартный цвет
  | 'background'   // Цвет относительно фона

/**
 * Интерактивное взаимодействие текста элемента
 */
export interface IInteractivityTextProperties extends IGeneralTextProperties
{
  /**
   * Цвет текста при наведении
   */
  hoverTextColor?: TThemeColorVariant;

  /**
   * Цвет текста при нажатии
   */
  pressedTextColor?: TThemeColorVariant;
}

export class InteractivityTextLogic
{
  public static getEffectByState(element: any, state: TInteractivityState, part: TThemePaletteComponentStructuralPart,
    actionType?: TThemePaletteActionType): TCssProperties
  {
    const textProps: TCssProperties = {};

    const backColor: TThemeColorVariantUndef = ObjectHelper.getValueByPropertyPath<TThemeColorVariantUndef>(element, 'backColor');
    const textColor: TThemeColorVariantUndef = ObjectHelper.getValueByPropertyPath<TThemeColorVariantUndef>(element, 'textColor');
    const hoverTextColor: TThemeColorVariantUndef = ObjectHelper.getValueByPropertyPath<TThemeColorVariantUndef>(element, 'hoverTextColor');
    const pressedTextColor: TThemeColorVariantUndef = ObjectHelper.getValueByPropertyPath<TThemeColorVariantUndef>(element, 'pressedTextColor');

    switch (state)
    {
      case 'normal':
        {
          textProps.color = ThemePaletteHelper.getColorByStructuralPart(part, textColor ?? backColor ?? 'primary', actionType).toCSSRgbValue()
        } break;
      case 'hover':
        {
          textProps.color = ThemePaletteHelper.getColorByStructuralPart(part, hoverTextColor ??
            ThemeColorVariantHelper.next(textColor ?? backColor ?? 'primary', 2), actionType).toCSSRgbValue()
        } break;
      case 'pressed':
        {
          textProps.color = ThemePaletteHelper.getColorByStructuralPart(part, pressedTextColor ??
            ThemeColorVariantHelper.next(textColor ?? backColor ?? 'primary', -2), actionType).toCSSRgbValue()
        } break;
    }

    return textProps;
  }

  public static getProperties(element: any, type: TInteractivityTextType, state: TInteractivityState,
    part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties
  {
    const textProps: TCssProperties = {};
    return InteractivityTextLogic.fillProperties(textProps, element, type, state, part, actionType);
  }

  public static fillProperties(target: TCssProperties, element: any, type: TInteractivityTextType, state: TInteractivityState,
    part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties
  {
    const backColor: TThemeColorVariantUndef = ObjectHelper.getValueByPropertyPath<TThemeColorVariantUndef>(element, 'backColor');
    const textColor: TThemeColorVariantUndef = ObjectHelper.getValueByPropertyPath<TThemeColorVariantUndef>(element, 'textColor');

    switch (type)
    {
      case 'default':
        {
          target.color = InteractivityTextLogic.getEffectByState(element, state, part, actionType).color;
        } break;
  
      case 'background':
        {
          if(textColor)
          {
            target.color = InteractivityTextLogic.getEffectByState(element, state, part, actionType).color;
          }
          else
          {
            target.color = ThemePaletteHelper.getPaletteColor(backColor ?? 'primary')?.onText('main').toCSSRgbValue();
          }
        } break;
    }
  
    return target;
  }
}