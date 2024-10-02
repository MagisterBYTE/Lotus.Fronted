/* eslint-disable @typescript-eslint/no-unused-vars */
import { css, cx } from '@emotion/css';
import React, { ComponentPropsWithoutRef } from 'react';
import { useRippleEffect } from 'hooks/useRippleEffect';
import { RenderComponentHelper } from 'ui/helpers';
import { Theme } from 'ui/theme';
import { hasBorderProps, TButtonVariant } from 'ui/components';
import { IInteractivityElement, InteractivityLogic } from 'ui/interactivity';

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
  const
    {
      fontBold, fontAccent, textEffect, textAlign, textColorHarmonious, textColor,
      backColor, backImage,
      borderRadius, borderStyle, borderWidth, borderColor,
      size = 'medium', paddingControl = 'normal', extraClass,
      variant = 'filled', hasIcon, hoverBackColor, pressedBackColor, hasRippleEffect = true, hasScaleEffect, hasShadowEffect,
      ...propsButton
    } = props

  const buttonClass = css(
    {
      cursor: 'pointer',
      display: 'inline-block',
      lineHeight: hasIcon ? 0 : 'normal',
      ...Theme.getFontProps(size, fontBold, fontAccent),
      ...Theme.getTextEffectProps(size, textEffect, textAlign),
      ...Theme.getPaddingProps(size, paddingControl, 'normal', 'half'),
      ...Theme.getTransitionColorsProps(),
      ...Theme.getBorderRadiusProps(size, borderRadius),
      ...InteractivityLogic.getEffectProps(variant, 'normal', props, false, props.disabled, false),
      '&:hover':
      {
        ...InteractivityLogic.getEffectProps(variant, 'hover', props, false, props.disabled, false),
        ...((!propsButton.disabled && hasShadowEffect) ? Theme.getBorderShadowProps(4, backColor, undefined, Theme.OpacityForBorderShadowHover) : {}),
        ...((!propsButton.disabled && hasScaleEffect) ? Theme.getTransformScaleProps(1.05) : {})
      },
      '&:active':
      {
        ...InteractivityLogic.getEffectProps(variant, 'pressed', props, false, props.disabled, false),
        ...((!propsButton.disabled && hasShadowEffect) ? Theme.getBorderShadowProps(6, backColor, undefined, Theme.OpacityForBorderShadowActive) : {}),
        ...((!propsButton.disabled && hasScaleEffect) ? Theme.getTransformScaleProps(0.95) : {})
      },
      '&:disabled':
      {
        ...InteractivityLogic.getEffectProps(variant, 'normal', props, false, true, false),
        ...Theme.getOpacityForDisabledProps()
      }
    })

  const rippleColor = Theme.getRippleColor(backColor);
  const [ripple, event] = useRippleEffect({ duration: Theme.TransitionSpeed, color: rippleColor, disabled: propsButton.disabled });

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
