/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGeneralBackgroundProperties } from 'ui/base';
import
{
  ThemeColorVariantHelper, ThemePaletteHelper, TThemeColorVariant, TThemeColorVariantUndef,
  TThemePaletteActionType, TThemePaletteComponentStructuralPart
} from 'ui/theme';
import { ObjectHelper } from 'helpers';
import { TCssProperties } from 'ui/types';
import { TInteractivityState } from './InteractivityState';

export type TInteractivityBackgroundType = 'initial' | 'none' | 'mandatory';

/**
 * Интерактивное взаимодействие фона элемента
 */
export interface IInteractivityBackgroundProperties extends IGeneralBackgroundProperties
{
  /**
   * Цвет фона при наведении
   */
  hoverBackColor?: TThemeColorVariant;

  /**
   * Цвет фона при нажатии
   */
  pressedBackColor?: TThemeColorVariant;
}


export class InteractivityBackgroundLogic
{
  public static getEffectByState(element: any, state: TInteractivityState, part: TThemePaletteComponentStructuralPart,
    actionType?: TThemePaletteActionType): TCssProperties
  {
    const backProps: TCssProperties = {};

    const backColor: TThemeColorVariantUndef = ObjectHelper.getValueByPropertyPath<TThemeColorVariantUndef>(element, 'backColor');
    const hoverBackColor: TThemeColorVariantUndef = ObjectHelper.getValueByPropertyPath<TThemeColorVariantUndef>(element, 'hoverBackColor');
    const pressedBackColor: TThemeColorVariantUndef = ObjectHelper.getValueByPropertyPath<TThemeColorVariantUndef>(element, 'pressedBackColor');

    switch (state)
    {
      case 'normal':
        {
          backProps.backgroundColor = ThemePaletteHelper.getColorByStructuralPart(part, backColor ?? 'primaryMain', actionType).toCSSRgbValue()
        } break;
      case 'hover':
        {
          backProps.backgroundColor = ThemePaletteHelper.getColorByStructuralPart(part, hoverBackColor ??
            ThemeColorVariantHelper.next(backColor ?? 'primaryMain', -2), actionType).toCSSRgbValue()
        } break;
      case 'pressed':
        {
          backProps.backgroundColor = ThemePaletteHelper.getColorByStructuralPart(part, pressedBackColor ??
            ThemeColorVariantHelper.next(backColor ?? 'primaryMain', 2), actionType).toCSSRgbValue()
        } break;
    }

    return backProps;
  }

  public static getProperties(element: any, type: TInteractivityBackgroundType, state: TInteractivityState,
    part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties
  {
    const backProps: TCssProperties = {};

    return InteractivityBackgroundLogic.fillProperties(backProps, element, type, state, part, actionType);
  }

  public static fillProperties(target: TCssProperties, element: any, type: TInteractivityBackgroundType, state: TInteractivityState,
    part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties
  {
    switch (type)
    {
      case 'initial':
        {
          target.backgroundColor = 'initial';
        } break;

      case 'none':
        {
          target.backgroundColor = 'transparent';
        } break;
      case 'mandatory':
        {
          target.backgroundColor = InteractivityBackgroundLogic.getEffectByState(element, state, part, actionType).backgroundColor;
        } break;
    }

    return target;
  }
}