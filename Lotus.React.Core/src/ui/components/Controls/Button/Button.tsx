import { css, cx } from '@emotion/css';
import React, { ComponentPropsWithoutRef } from 'react';
import { ThemeHelper } from 'ui/theme/helpers';
import { ThemeConstants } from 'ui/theme/constants';
import { useRippleEffect } from 'hooks/useRippleEffect';
import { InteractivityLogic } from 'ui/interactivity';
import { IGeneralPropertiesElement, IGeneralPropertiesText } from 'ui/components';
import { TButtonVariant } from './ButtonVariant';

export interface IButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'color'>, IGeneralPropertiesElement, IGeneralPropertiesText
{
  /**
   * Вариант отображения
   */
  variant?: TButtonVariant;

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
  const { borderRounded, borderStyle, color = 'primary', size = 'medium', paddingControl = 'normal', extraClass,

    fontBold, textAlign, textEffect, variant = 'filled', hasRippleEffect = true, hasScaleEffect, hasShadowEffect, ...propsButton } = props

  const buttonClass = css(
    {
      cursor: 'pointer',
      display: 'inline-block',
      ...ThemeHelper.getFontProps(size, fontBold),
      ...ThemeHelper.getTextEffectProps(size, textEffect, textAlign),
      ...ThemeHelper.getBorderProps(size, borderRounded, borderStyle),
      ...ThemeHelper.getPaddingProps(size, paddingControl, 'normal', 'half'),
      ...ThemeHelper.getTransitionColorsProps(),
      ...InteractivityLogic.getEffectProps(size, variant, 'normal', color),
      '&:hover':
      {
        ...InteractivityLogic.getEffectProps(size, variant, 'hover', color),
        ...((!propsButton.disabled && hasShadowEffect) ? ThemeHelper.getBorderShadowProps(4, color, undefined, ThemeConstants.OpacityForBorderShadowHover) : {}),
        ...((!propsButton.disabled && hasScaleEffect) ? ThemeHelper.getTransformScaleProps(1.05) : {})
      },
      '&:active':
      {
        ...InteractivityLogic.getEffectProps(size, variant, 'pressed', color),
        ...((!propsButton.disabled && hasShadowEffect) ? ThemeHelper.getBorderShadowProps(6, color, undefined, ThemeConstants.OpacityForBorderShadowActive) : {}),
        ...((!propsButton.disabled && hasScaleEffect) ? ThemeHelper.getTransformScaleProps(0.95) : {})
      },
      '&:disabled':
      {
        ...InteractivityLogic.getEffectProps(size, variant, 'normal', color, undefined, true, undefined),
        ...ThemeHelper.getOpacityForDisabledProps()
      }
    })

  const rippleColor = InteractivityLogic.getRippleColor(color);
  const [ripple, event] = useRippleEffect({ duration: ThemeConstants.TransitionSpeed, color: rippleColor, disabled: propsButton.disabled });

  return (
    <button {...propsButton} ref={hasRippleEffect ? ripple : undefined} className={cx(buttonClass, extraClass)} onPointerDown={event}>
      {propsButton.children}
    </button>);
};
