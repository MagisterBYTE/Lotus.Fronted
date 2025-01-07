/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CSSProperties } from 'react';
import { IInteractivityElement, InteractivityLogic, TInteractivityModel } from 'ui/interactivity';
import { ThemeConstant, ThemeHelper } from 'ui/theme';

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
   * Статус выбора
   */
  isSelected?: boolean;
}

export class CssPropertiesBuilder
{
  public static buildInteractivityElement(model: TInteractivityModel, props: IInteractivityElement, context?: ICssPropertiesBuilderContext): CSSProperties
  {
    // @ts-expect-error disabled
    const isDisabled: boolean | undefined = props.disabled || props.isDisabled;

    const isSelected: boolean | undefined = context?.isSelected;

    const isBorderRadiusIndividual = context && (context.isBottomLeft ?? context.isBottomRight ?? context.isTopLeft ?? context.isTopRight);
    const
      {
        fontBold, fontAccent, textEffect, textAlign,
        backColor,
        borderRadius,
        size = 'medium', paddingControl = 'normal',

        // @ts-expect-error IGeneralIconProperties
        icon, iconColor, iconStyle, imageDatabase,

        // @ts-expect-error IInteractivityBackgroundEffect
        hasRippleEffect, hasScaleEffect, hasShadowBorderEffect, hasShadowBoxEffect
      } = props

    return {
      cursor: 'pointer',
      display: 'inline-block',
      // lineHeight: icon ? 0 : 'normal',
      ...ThemeHelper.getFontProps(size, fontBold, fontAccent),
      ...ThemeHelper.getTextEffectProps(size, textEffect, textAlign),
      ...ThemeHelper.getPaddingProps(size, paddingControl, 'normal', 'half'),
      ...ThemeHelper.getTransitionColorsProps(),
      ...(isBorderRadiusIndividual
        ? ThemeHelper.getBorderRadiusIndividualProps(size, borderRadius, context?.isTopLeft, context?.isTopRight, context?.isBottomLeft, context?.isBottomRight)
        : ThemeHelper.getBorderRadiusProps(size, borderRadius)),
      ...InteractivityLogic.getEffectProps(model, 'normal', props, isSelected, isDisabled, false),

      ...((!isDisabled && hasShadowBoxEffect) ? ThemeHelper.getBoxShadowProps(isSelected ? 8 : 2, backColor, undefined) : {}),
      ...((!isDisabled && hasShadowBorderEffect && isSelected) ? ThemeHelper.getBorderShadowProps(6, backColor, undefined, ThemeConstant.OpacityForBorderShadowActive) : {}),
      ...((!isDisabled && hasScaleEffect && isSelected) ? ThemeHelper.getTransformScaleProps(1.2) : {}),

      // @ts-expect-error IInteractivityBackgroundEffect 
      '&:hover':
      {
        ...InteractivityLogic.getEffectProps(model, 'hover', props, isSelected, isDisabled, false, { hasRippleEffect: hasRippleEffect }),
        ...((!isDisabled && hasShadowBorderEffect && !isSelected) ? ThemeHelper.getBorderShadowProps(4, backColor, undefined, ThemeConstant.OpacityForBorderShadowHover) : {}),
        ...((!isDisabled && hasShadowBoxEffect && !isSelected) ? ThemeHelper.getBoxShadowProps(4, backColor, undefined) : {}),
        ...((!isDisabled && hasScaleEffect&& !isSelected) ? ThemeHelper.getTransformScaleProps(1.05) : {})
      },
      '&:active':
      {
        ...InteractivityLogic.getEffectProps(model, 'pressed', props, isSelected, isDisabled, false, { hasRippleEffect: hasRippleEffect }),
        ...((!isDisabled && hasShadowBorderEffect) ? ThemeHelper.getBorderShadowProps(6, backColor, undefined, ThemeConstant.OpacityForBorderShadowActive) : {}),
        ...((!isDisabled && hasShadowBoxEffect) ? ThemeHelper.getBoxShadowProps(8, backColor, undefined) : {}),
        ...((!isDisabled && hasScaleEffect && !isSelected) ? ThemeHelper.getTransformScaleProps(0.95) : {})
      },
      '&:checked':
      {
        ...InteractivityLogic.getEffectProps(model, 'normal', props, isSelected, isDisabled),
        ...((!isDisabled && hasShadowBorderEffect) ? ThemeHelper.getBorderShadowProps(6, backColor, undefined, ThemeConstant.OpacityForBorderShadowActive) : {}),
        ...((!isDisabled && hasShadowBoxEffect) ? ThemeHelper.getBoxShadowProps(8, backColor, undefined) : {}),
        ...((!isDisabled && hasScaleEffect) ? ThemeHelper.getTransformScaleProps(1.2) : {})
      },
      '&:disabled':
      {
        ...InteractivityLogic.getEffectProps(model, 'normal', props, false, true, false),
        ...ThemeHelper.getOpacityForDisabledProps()
      }
    }
  }
}