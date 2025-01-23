/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TControlPadding, TControlPaddingOffset, TControlSize, TCssBorderRadius, TCssProperties, TCssTextAlign, TTextEffect } from 'ui/types';
import { ObjectHelper } from 'helpers';
import { ThemeConstant, TThemeColorVariantUndef } from 'ui/theme';
import { InteractivityLogic, TInteractivityModel } from 'ui/interactivity';
import { IEffectContextProps } from 'ui/interactivity/InteractivityLogic';
import { CssSizerHelper } from './CssSizerHelper';
import { CssPropertiesHelper } from './CssPropertiesHelper';

export interface ICssPropertiesBuilderContext
{
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

export class CssPropertiesBuilder
{
  public static buildElement(props: any, context?: ICssPropertiesBuilderContext): TCssProperties
  {
    // Element
    const borderRadius: TCssBorderRadius|undefined = ObjectHelper.getValueByPropertyPath<TCssBorderRadius|undefined>(props, 'borderRadius');
    const size: TControlSize|undefined = ObjectHelper.getValueByPropertyPath<TControlSize|undefined>(props, 'size');
    const paddingControl: TControlPadding|undefined = ObjectHelper.getValueByPropertyPath<TControlPadding|undefined>(props, 'paddingControl');

    // Text
    const fontBold:boolean|undefined = ObjectHelper.getValueByPropertyPath<boolean|undefined>(props, 'fontBold');
    const fontAccent:boolean|undefined = ObjectHelper.getValueByPropertyPath<boolean|undefined>(props, 'fontAccent');
    const textEffect:TTextEffect|undefined = ObjectHelper.getValueByPropertyPath<TTextEffect|undefined>(props, 'textEffect');
    const textAlign:TCssTextAlign|undefined = ObjectHelper.getValueByPropertyPath<TCssTextAlign|undefined>(props, 'textAlign');

    // Status
    const isDisabled: boolean = Boolean(props.disabled || props.isDisabled);
    const isSelected: boolean = Boolean(props.isSelected || context?.isSelected);

    // Settings
    const leftRight = ((context && context.leftRight) ? context.leftRight : 'normal');
    const topBottom = ((context && context.topBottom) ? context.topBottom : 'half');
    const isBorderRadiusIndividual = context && (context.isBottomLeft ?? context.isBottomRight ?? context.isTopLeft ?? context.isTopRight);
    
    return {
      // Element
      ...CssSizerHelper.getPaddingProps(size, paddingControl, leftRight, topBottom),
      ...(isBorderRadiusIndividual
        ? CssPropertiesHelper.getBorderRadiusIndividualProps(size, borderRadius, context?.isTopLeft, context?.isTopRight, context?.isBottomLeft, context?.isBottomRight)
        : CssPropertiesHelper.getBorderRadiusProps(size, borderRadius)),

      // Text
      ...CssPropertiesHelper.getFontProps(size, fontBold, fontAccent),
      ...CssPropertiesHelper.getTextEffectProps(size, textEffect, textAlign)
    }
  }

  public static buildInteractivityElement(model: TInteractivityModel, props: any, context?: ICssPropertiesBuilderContext): TCssProperties
  {
    // Status
    const isDisabled: boolean = Boolean(props.disabled || props.isDisabled);
    const isSelected: boolean = Boolean(context?.isSelected || props.isSelected);

    // Background
    const backColor: TThemeColorVariantUndef = ObjectHelper.getValueByPropertyPath<TThemeColorVariantUndef>(props, 'backColor');

    // BackgroundEffect
    const hasRippleEffect:boolean = Boolean(ObjectHelper.getValueByPropertyPath<boolean|undefined>(props, 'hasRippleEffect'));
    const hasScaleEffect:boolean = Boolean(ObjectHelper.getValueByPropertyPath<boolean|undefined>(props, 'hasScaleEffect'));
    const hasShadowBorderEffect:boolean = Boolean(ObjectHelper.getValueByPropertyPath<boolean|undefined>(props, 'hasShadowBorderEffect'));
    const hasShadowBoxEffect:boolean = Boolean(ObjectHelper.getValueByPropertyPath<boolean|undefined>(props, 'hasShadowBoxEffect'));

    const effectContext:IEffectContextProps =
    {
      isDisabled: isDisabled,
      isSelected: isSelected,
      hasRippleEffect: hasRippleEffect
    } 

    return {
      ...CssPropertiesBuilder.buildElement(props, context),
      ...CssPropertiesHelper.getTransitionColorsProps(),

      ...InteractivityLogic.getEffectProps(model, 'normal', props, effectContext),

      ...((!isDisabled && hasShadowBoxEffect) ? CssPropertiesHelper.getBoxShadowProps(isSelected ? 8 : 2, backColor) : {}),
      ...((!isDisabled && hasShadowBorderEffect && isSelected) ? CssPropertiesHelper.getBorderShadowProps(6, backColor, ThemeConstant.OpacityForBorderShadowActive) : {}),
      ...((!isDisabled && hasScaleEffect && isSelected) ? CssPropertiesHelper.getTransformScaleProps(1.2) : {}),

      // @ts-expect-error IInteractivityBackgroundEffect 
      '&:hover':
      {
        ...InteractivityLogic.getEffectProps(model, 'hover', props, effectContext),
        ...((!isDisabled && hasShadowBorderEffect && !isSelected) ? CssPropertiesHelper.getBorderShadowProps(4, backColor, ThemeConstant.OpacityForBorderShadowHover) : {}),
        ...((!isDisabled && hasShadowBoxEffect && !isSelected) ? CssPropertiesHelper.getBoxShadowProps(4, backColor) : {}),
        ...((!isDisabled && hasScaleEffect&& !isSelected) ? CssPropertiesHelper.getTransformScaleProps(1.05) : {})
      },
      '&:active':
      {
        ...InteractivityLogic.getEffectProps(model, 'pressed', props, effectContext),
        ...((!isDisabled && hasShadowBorderEffect) ? CssPropertiesHelper.getBorderShadowProps(6, backColor, ThemeConstant.OpacityForBorderShadowActive) : {}),
        ...((!isDisabled && hasShadowBoxEffect) ? CssPropertiesHelper.getBoxShadowProps(8, backColor) : {}),
        ...((!isDisabled && hasScaleEffect && !isSelected) ? CssPropertiesHelper.getTransformScaleProps(0.95) : {})
      },
      '&:checked':
      {
        ...InteractivityLogic.getEffectProps(model, 'normal', props, effectContext),
        ...((!isDisabled && hasShadowBorderEffect) ? CssPropertiesHelper.getBorderShadowProps(6, backColor, ThemeConstant.OpacityForBorderShadowActive) : {}),
        ...((!isDisabled && hasShadowBoxEffect) ? CssPropertiesHelper.getBoxShadowProps(8, backColor) : {}),
        ...((!isDisabled && hasScaleEffect) ? CssPropertiesHelper.getTransformScaleProps(1.2) : {})
      },
      '&:disabled':
      {
        ...InteractivityLogic.getEffectProps(model, 'normal', props, effectContext)
      }
    }
  }
}