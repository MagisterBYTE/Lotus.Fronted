import { css, cx } from '@emotion/css';
import React, { ComponentPropsWithRef } from 'react';
import { TColorType, TControlPadding } from 'ui/types';
import { TControlSize } from 'ui/types/ControlSize';
import { ThemeHelper } from 'app/theme/helpers';
import { ThemeConstants } from 'app/theme/constants';
import { useRippleEffect } from 'hooks/useRippleEffect';
import { ButtonHelper } from './ButtonHelper';
import { TButtonVariant } from './ButtonVariant';

export interface IButtonProps extends ComponentPropsWithRef<'button'>
{
  /**
   * Цвет
   */
  color?: TColorType;

  /**
   * Размер кнопки
   */
  size?: TControlSize;

  /**
   * Вариант отображения
   */
  variant?: TButtonVariant;

  /**
   * Внутренний отступ
   */
  paddingControl?: TControlPadding;
}

export const Button: React.FC<IButtonProps> = ({ color = 'primary', size = 'medium', variant = 'filled',
  paddingControl = 'normal', ...propsButton }: IButtonProps) =>
{
  const buttonMain = css`
    ${ThemeHelper.getFontFamilyPropsAsText()}
    font-weight: bold;
    cursor: pointer;
    display: inline-block;
    ${ThemeHelper.getBorderPropsAsText()}
    ${ThemeHelper.getTransitionPropsAsText()}
    ${ButtonHelper.getBorderColorProps(color, variant, 'normal')}
    ${ButtonHelper.getColorProps(color, variant, 'normal')}
    ${ButtonHelper.getBackgroundColorProps(color, variant, 'normal')}
    ${ButtonHelper.getPaddingSidesProps(size, paddingControl)}
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

  const buttonClass = cx(buttonMain, `lotus-size-${size}-${paddingControl}`);

  const [ripple, event] = useRippleEffect({ duration: ThemeConstants.TransitionSpeed, color: 'rgba(255, 255, 255, 0.5)', disabled: propsButton.disabled });

  return (
    <button {...propsButton} ref={ripple} className={buttonClass} onPointerDown={event}>
      {propsButton.children}
    </button>);
};
