/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectHelper } from 'helpers/ObjectHelper';
import
{
  ThemeColorVariantHelper, ThemePaletteHelper, TThemeColorVariant,
  TThemeColorVariantUndef, TThemePaletteActionType, TThemePaletteComponentStructuralPart
} from 'ui/theme';
import { TCssBorderStyle, TCssBorderWidth, TCssProperties } from 'ui/types';
import { hasBorderProperties, IGeneralBorderProperties } from 'ui/base/GeneralBorderProperties';
import { TInteractivityState } from './InteractivityState';

export type TInteractivityBorderType =
  | 'none'        // Границы нет
  | 'maybe'       // Граница может быть (должно быть одно установлено хотя бы одно свойство)
  | 'invisible'   // Граница есть, но она не видима
  | 'mandatory';  // Граница обязательна, если параметры не установлены то будут взяты по умолчанию

/**
 * Интерактивное взаимодействие границы элемента
 */
export interface IInteractivityBorderProperties extends IGeneralBorderProperties
{
  /**
   * Цвет границы при наведении
   */
  hoverBorderColor?: TThemeColorVariant;

  /**
   * Цвет границы при нажатии
   */
  pressedBorderColor?: TThemeColorVariant;
}

export class InteractivityBorderLogic
{
  public static getEffectByState(element: any, state: TInteractivityState, part: TThemePaletteComponentStructuralPart,
    actionType?: TThemePaletteActionType): TCssProperties
  {
    const borderProps: TCssProperties = {};

    const backColor: TThemeColorVariantUndef = ObjectHelper.getValueByPropertyPath<TThemeColorVariantUndef>(element, 'backColor');
    const borderColor: TThemeColorVariantUndef = ObjectHelper.getValueByPropertyPath<TThemeColorVariantUndef>(element, 'borderColor');
    const hoverBorderColor: TThemeColorVariantUndef = ObjectHelper.getValueByPropertyPath<TThemeColorVariantUndef>(element, 'hoverBorderColor');
    const pressedBorderColor: TThemeColorVariantUndef = ObjectHelper.getValueByPropertyPath<TThemeColorVariantUndef>(element, 'pressedBorderColor');

    switch (state)
    {
      case 'normal':
        {
          borderProps.borderColor = ThemePaletteHelper.getColorByStructuralPart(part, borderColor ?? backColor ?? 'primary', actionType).toCSSRgbValue()
        } break;
      case 'hover':
        {
          borderProps.borderColor = ThemePaletteHelper.getColorByStructuralPart(part, hoverBorderColor ??
            ThemeColorVariantHelper.next(borderColor ?? backColor ?? 'primary', 2), actionType).toCSSRgbValue()
        } break;
      case 'pressed':
        {
          borderProps.borderColor = ThemePaletteHelper.getColorByStructuralPart(part, pressedBorderColor ??
            ThemeColorVariantHelper.next(borderColor ?? backColor ?? 'primary', -2), actionType).toCSSRgbValue()
        } break;
    }

    return borderProps;
  }

  public static getProperties(element: any, type: TInteractivityBorderType, state: TInteractivityState,
    part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties
  {
    const borderProps: TCssProperties = {};

    return InteractivityBorderLogic.fillProperties(borderProps, element, type, state, part, actionType);
  }

  public static fillProperties(target: TCssProperties, element: any, type: TInteractivityBorderType, state: TInteractivityState,
    part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties
  {
    const borderStyle: TCssBorderStyle | undefined = ObjectHelper.getValueByPropertyPath<TCssBorderStyle | undefined>(element, 'borderStyle');
    const borderWidth: TCssBorderWidth | undefined = ObjectHelper.getValueByPropertyPath<TCssBorderWidth | undefined>(element, 'borderWidth');
    const borderColor: TThemeColorVariantUndef = ObjectHelper.getValueByPropertyPath<TThemeColorVariantUndef>(element, 'borderColor');

    switch (type)
    {
      // Границы нет
      case 'none':
        {
          target.border = 'none';
          target.borderColor = 'transparent';
        } break;

      // Граница может быть
      case 'maybe':
        {
          if (hasBorderProperties(borderStyle, borderWidth, borderColor))
          {
            target.borderWidth = borderWidth ?? '1px';
            target.borderStyle = borderStyle ?? 'solid';
            target.borderColor = InteractivityBorderLogic.getEffectByState(element, state, part, actionType).borderColor;
          }
          else
          {
            target.border = 'none';
            target.borderColor = 'transparent';
          }
        } break;

      // Граница не видна
      case 'invisible':
        {
          target.borderColor = 'transparent';
          target.borderWidth = borderWidth ?? '1px';
        } break;
      // Граница обязательна
      case 'mandatory':
        {
          target.borderWidth = borderWidth ?? '1px';
          target.borderStyle = borderStyle ?? 'solid';
          target.borderColor = InteractivityBorderLogic.getEffectByState(element, state, part, actionType).borderColor;
        } break;
    }

    return target;
  }
}