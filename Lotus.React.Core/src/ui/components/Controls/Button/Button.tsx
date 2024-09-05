import { css } from '@emotion/css';
import React, { ComponentPropsWithoutRef } from 'react';
import { ThemeHelper } from 'app/theme/helpers';
import { ThemeConstants } from 'app/theme/constants';
import { useRippleEffect } from 'hooks/useRippleEffect';
import { ICommonProps } from 'ui/components/CommonProps';
import { ButtonHelper } from './ButtonHelper';
import { TButtonVariant } from './ButtonVariant';

export interface IButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'color'>, ICommonProps
{
  /**
   * Вариант отображения
   */
  variant?: TButtonVariant;
}

export const Button: React.FC<IButtonProps> = (props: IButtonProps) =>
{
  const { hasRadius, color = 'primary', size = 'medium', paddingControl = 'normal', variant = 'filled', ...propsButton } = props

  const buttonClass = css`
    font-weight: bold;
    cursor: pointer;
    display: inline-block;
    ${ThemeHelper.getFontPropsAsText(size)}
    ${ThemeHelper.getBorderPropsAsText(undefined, undefined, hasRadius, size)}
    ${ThemeHelper.getPaddingPropsAsText(size, paddingControl, (variant == 'icon' || size == 'large') ? 'half' : 'normal', 'half')}
    ${ThemeHelper.getTransitionColorsPropsAsText()}
    ${ButtonHelper.getBorderColorProps(color, variant, 'normal')}
    ${ButtonHelper.getColorProps(color, variant, 'normal')}
    ${ButtonHelper.getBackgroundColorProps(color, variant, 'normal')}
      &:hover {
        ${ButtonHelper.getBorderColorProps(color, variant, 'hover')}
        ${ButtonHelper.getBackgroundColorProps(color, variant, 'hover')}
        ${ButtonHelper.getColorProps(color, variant, 'hover')}
      }
      &:active {
        ${ButtonHelper.getBorderColorProps(color, variant, 'pressed')}
        ${ButtonHelper.getBackgroundColorProps(color, variant, 'pressed')}
        ${ButtonHelper.getColorProps(color, variant, 'pressed')}
      }
      &:disabled {
        ${ButtonHelper.getBorderColorProps(color, variant, 'disabled')}
        ${ButtonHelper.getBackgroundColorProps(color, variant, 'disabled')}
        ${ButtonHelper.getColorProps(color, variant, 'disabled')}
        ${ThemeHelper.getOpacityPropsForDisabledAsText()}
      }
  `;

  const [ripple, event] = useRippleEffect({ duration: ThemeConstants.TransitionSpeed, color: 'rgba(255, 255, 255, 0.5)', disabled: propsButton.disabled });

  return (
    <button {...propsButton} ref={ripple} className={buttonClass} onPointerDown={event}>
      {propsButton.children}
    </button>);
};
