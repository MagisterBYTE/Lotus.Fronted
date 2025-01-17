/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectHelper } from 'lotus-core';
import { CSSProperties } from 'react';
import { hasBorderProps, IGeneralElementExtendedProperties, IGeneralElementProperties, TTypographyVariant, TypographyHelper } from 'ui/components';
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
  public static buildHeader(model: IGeneralElementProperties, variant: TTypographyVariant): CSSProperties
  {
    const hasIcon = Boolean(ObjectHelper.getValueByPropertyPath(model, 'icon'));
    const size = model.size ?? 'medium';
    const headerProps: CSSProperties = {}
    const hFontSize = TypographyHelper.convertTypographyVariantToHeightPixel(variant);
    let topOffset = hFontSize + (hasBorderProps(model) ? 2 : 0);
    if (hasIcon)
    {
      const minIcon = ThemeHelper.convertControlSizeToIconSizeInPixel(size);
      if (minIcon > topOffset)
      {
        topOffset = minIcon;
      }
    }

    switch (size)
    {
      case 'smaller':
        {
          headerProps.height = `${topOffset}px`;
          headerProps.top = `${-topOffset * 1.2}px`;
          headerProps.left = '20px';
          headerProps.paddingLeft = '6px';
          headerProps.paddingRight = '6px';
          headerProps.paddingTop = '2px';
          headerProps.paddingBottom = '2px';
          headerProps.marginBottom = `${-topOffset * 1.4}px`;
        } break;
      case 'small':
        {
          headerProps.height = `${topOffset}px`;
          headerProps.top = `${-topOffset}px`;
          headerProps.left = '20px';
          headerProps.paddingLeft = '6px';
          headerProps.paddingRight = '6px';
          headerProps.paddingTop = '2px';
          headerProps.paddingBottom = '2px';
          headerProps.marginBottom = `${-topOffset * 1.2}px`;
        } break;
      case 'medium':
        {
          headerProps.height = `${topOffset}px`;
          headerProps.top = `${-topOffset}px`;
          headerProps.left = '20px';
          headerProps.paddingLeft = '10px';
          headerProps.paddingRight = '10px';
          headerProps.paddingTop = '3px';
          headerProps.paddingBottom = '3px';
          headerProps.marginBottom = `${-topOffset * 1.2}px`;
        } break;
      case 'large':
        {
          headerProps.height = `${topOffset}px`;
          headerProps.top = `${-topOffset * 1.4}px`;
          headerProps.left = '20px';
          headerProps.paddingLeft = '10px';
          headerProps.paddingRight = '10px';
          headerProps.paddingTop = '3px';
          headerProps.paddingBottom = '3px';
          headerProps.marginBottom = `${-topOffset * 1.4}px`;
        } break;
    }

    return headerProps;
  }

  public static buildElementExtended(model: IGeneralElementExtendedProperties, leftRight?: 'normal' | 'half', topBottom?: 'normal' | 'half'): CSSProperties
  {
    const {
      fontBold, fontAccent, textEffect, textAlign, textColorHarmonious, textColor,
      backColor, backImage,
      borderRadius, borderStyle, borderWidth, borderColor,
      size = 'medium', paddingControl = 'normal', extraClass,
      backColorVariant, textColorVariant, shadowElevation
    } = model;
    
    return {
      ...ThemeHelper.getFontProps(size, fontBold, fontAccent),
      ...ThemeHelper.getTextEffectProps(size, textEffect, textAlign),
      ...ThemeHelper.getPaddingProps(size, paddingControl, 'normal', 'normal'),
      ...ThemeHelper.getBackgroundColorProps(backColor, backColorVariant, undefined),
      ...ThemeHelper.getForegroundColorByBackProps(backColor, backColorVariant, textColor, textColorVariant, textColorHarmonious),
      ...ThemeHelper.getBorderRadiusProps(size, borderRadius),
      ...(hasBorderProps(model) ? ThemeHelper.getBorderStyleProps(size, borderStyle, borderWidth, borderColor) : {}),
      ...(hasBorderProps(model) ? ThemeHelper.getBorderColorProps(borderColor ?? backColor, backColorVariant, 3, undefined) : {}),
      ...(shadowElevation ? ThemeHelper.getBoxShadowProps(shadowElevation, backColor, undefined) : {})
    };
  }

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
        ...((!isDisabled && hasScaleEffect && !isSelected) ? ThemeHelper.getTransformScaleProps(1.05) : {})
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