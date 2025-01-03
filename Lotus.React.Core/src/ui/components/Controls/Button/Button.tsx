/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { css, cx } from '@emotion/css';
import React, { ComponentPropsWithoutRef } from 'react';
import { useRippleEffect } from 'hooks/useRippleEffect';
import { RenderComponentHelper } from 'ui/helpers';
import { Theme, ThemeConstant, ThemeHelper } from 'ui/theme';
import { TButtonVariant } from 'ui/components';
import { IInteractivityElement, InteractivityLogic } from 'ui/interactivity';
import { checkOfThemeModeColor } from 'ui/theme/types/ThemeModeColor';

export interface IButtonProps extends ComponentPropsWithoutRef<'button'>, IInteractivityElement
{
  /**
   * Вариант отображения
   */
  variant?: TButtonVariant;
  
  /**
   * Используется иконка
   */
  hasIcon?: boolean;

  /**
   * Использовать эффект тени
   */
  hasBoxShadow?: boolean;

  /**
   * Использовать эффект Ripple
   */
  hasRippleEffect?: boolean;

  /**
   * Использовать эффект масштабирования
   */
  hasScaleEffect?: boolean;

  /**
   * Использовать эффект тени
   */
  hasShadowEffect?: boolean;
}


export const Button: React.FC<IButtonProps> = (props: IButtonProps) =>
{
  const isDefaultBoxShadow = ():boolean =>
  {
    return (checkOfThemeModeColor(props.backColor) && (props.variant !== 'icon' && props.variant !== 'text'));
  }

  const
    {
      fontBold, fontAccent, textEffect, textAlign, textColorHarmonious, textColor, hoverTextColor, pressedTextColor,
      backColor, backImage, hoverBackColor, pressedBackColor,
      borderRadius, borderStyle, borderWidth, borderColor, hoverBorderColor, pressedBorderColor,
      size = 'medium', paddingControl = 'normal', extraClass,
      variant = 'filled', hasIcon, hasBoxShadow = isDefaultBoxShadow(), hasRippleEffect, hasScaleEffect, hasShadowEffect,
      ...propsButton
    } = props

  const buttonClass = css(
    {
      cursor: 'pointer',
      display: 'inline-block',
      lineHeight: hasIcon ? 0 : 'normal',
      ...ThemeHelper.getFontProps(size, fontBold, fontAccent),
      ...ThemeHelper.getTextEffectProps(size, textEffect, textAlign),
      ...ThemeHelper.getPaddingProps(size, paddingControl, 'normal', 'half'),
      ...ThemeHelper.getTransitionColorsProps(),
      ...ThemeHelper.getBorderRadiusProps(size, borderRadius),
      ...InteractivityLogic.getEffectProps(variant, 'normal', props, false, props.disabled, false),
      ...((!propsButton.disabled && hasBoxShadow) ? ThemeHelper.getBoxShadowProps(2, backColor, undefined) : {}),
      '&:hover':
      {
        ...InteractivityLogic.getEffectProps(variant, 'hover', props, false, props.disabled, false, {hasRippleEffect: hasRippleEffect}),
        ...((!propsButton.disabled && hasShadowEffect && !hasBoxShadow) ? ThemeHelper.getBorderShadowProps(4, backColor, undefined, ThemeConstant.OpacityForBorderShadowHover) : {}),
        ...((!propsButton.disabled && hasBoxShadow) ? ThemeHelper.getBoxShadowProps(4, backColor, undefined) : {}),
        ...((!propsButton.disabled && hasScaleEffect) ? ThemeHelper.getTransformScaleProps(1.05) : {})
      },
      '&:active':
      {
        ...InteractivityLogic.getEffectProps(variant, 'pressed', props, false, props.disabled, false, {hasRippleEffect: hasRippleEffect}),
        ...((!propsButton.disabled && hasShadowEffect && !hasBoxShadow) ? ThemeHelper.getBorderShadowProps(6, backColor, undefined, ThemeConstant.OpacityForBorderShadowActive) : {}),
        ...((!propsButton.disabled && hasBoxShadow) ? ThemeHelper.getBoxShadowProps(8, backColor, undefined) : {}),
        ...((!propsButton.disabled && hasScaleEffect) ? ThemeHelper.getTransformScaleProps(0.95) : {})
      },
      '&:disabled':
      {
        ...InteractivityLogic.getEffectProps(variant, 'normal', props, false, true, false),
        ...ThemeHelper.getOpacityForDisabledProps()
      }
    })

  const rippleColor = ThemeHelper.getRippleColor(backColor, (variant == 'text' || variant == 'icon'));
  const [ripple, event] = useRippleEffect({ duration: ThemeConstant.TransitionSpeed * 2, color: rippleColor, disabled: propsButton.disabled });

  if (hasIcon)
  {
    return (<button {...propsButton} ref={hasRippleEffect ? ripple : undefined} className={cx(buttonClass, extraClass)} onPointerDown={event}>
      {RenderComponentHelper.renderIcon(size, propsButton.children)}
    </button>);
  }
  else
  {
    return (
      <button {...propsButton} ref={hasRippleEffect ? ripple : undefined} className={cx(buttonClass, extraClass)} onPointerDown={event}>
        {propsButton.children}
      </button>);
  }
};
