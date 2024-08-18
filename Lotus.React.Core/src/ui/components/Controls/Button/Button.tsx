import { css, cx } from '@emotion/css';
import React, { ComponentPropsWithRef } from 'react';
import { TColorType, TControlPadding, TControlState } from 'ui/types';
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

export const Button: React.FC<IButtonProps> = ({ color = TColorType.Primary, size = TControlSize.Medium, variant = TButtonVariant.Filled,
  paddingControl = TControlPadding.Normal, ...propsButton }: IButtonProps) =>
{
  const buttonMain = css`
    ${ThemeHelper.getFontFamilyPropsAsText()}
    font-weight: bold;
    cursor: pointer;
    display: inline-block;
    ${ThemeHelper.getBorderPropsAsText()}
    ${ThemeHelper.getTransitionPropsAsText()}
    ${ButtonHelper.getBorderColorProps(color, variant, TControlState.Normal)}
    ${ButtonHelper.getColorProps(color, variant, TControlState.Normal)}
    ${ButtonHelper.getBackgroundColorProps(color, variant, TControlState.Normal)}
    ${ButtonHelper.getPaddingSidesProps(size, paddingControl)}
      &:hover {
        ${ButtonHelper.getBorderColorProps(color, variant, TControlState.Hover)}
        ${ButtonHelper.getBackgroundColorProps(color, variant, TControlState.Hover)}
        ${ButtonHelper.getColorProps(color, variant, TControlState.Hover)}
      }
      &:active {
        ${ButtonHelper.getBorderColorProps(color, variant, TControlState.Pressed)}
        ${ButtonHelper.getBackgroundColorProps(color, variant, TControlState.Pressed)}
        ${ButtonHelper.getColorProps(color, variant, TControlState.Pressed)}
      }
      &:disabled {
        ${ButtonHelper.getBorderColorProps(color, variant, TControlState.Disabled)}
        ${ButtonHelper.getBackgroundColorProps(color, variant, TControlState.Disabled)}
        ${ButtonHelper.getColorProps(color, variant, TControlState.Disabled)}
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
