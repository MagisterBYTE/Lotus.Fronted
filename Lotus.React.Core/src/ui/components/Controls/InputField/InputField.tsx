import React, { ComponentPropsWithRef, ReactNode } from 'react';
import { TColorType, TControlPadding, TControlSize, TControlState } from 'ui/types';
import { css, cx } from '@emotion/css';
import { ILabelProps, Label, TypographyHelper } from 'ui/components/Display';
import { ThemeHelper } from 'app/theme';
import { InputFieldHelper } from './InputFieldHelper';

export interface IInputFieldProps extends Omit<ComponentPropsWithRef<'input'>, 'size'>
{
  /**
   * Цвет
   */
  color?: TColorType;

  /**
   * Размер поля
   */
  size?: TControlSize;

  /**
   * Фон поля
   */
  isBackground?: boolean;

  /**
   * Внутренний отступ
   */
  paddingControl?: TControlPadding;

  /**
   * Параметры надписи
   */
  labelProps?: ILabelProps;

  /**
   * Дополнительный элемент справа
   */
  rightElement?: ReactNode;
}

export const InputField: React.FC<IInputFieldProps> = ({ color = 'primary', isBackground = false, size = 'medium',
  paddingControl = 'normal', labelProps, ...propsInput }: IInputFieldProps) =>
{
  const InputFieldMain = css`
    ${ThemeHelper.getFontFamilyPropsAsText()}
    ${ThemeHelper.getBorderPropsAsText()}
    ${ThemeHelper.getTransitionPropsAsText()}
    ${InputFieldHelper.getBackgroundProps(color, isBackground)}
    ${InputFieldHelper.getBorderColorProps(color, 'normal')}
      &:hover {
        ${InputFieldHelper.getBorderColorProps(color, 'hover')}
      }
      &:focus {
        ${InputFieldHelper.getBorderColorProps(color, 'focus')}
        outline: 0;
      }
      &:disabled {
        ${InputFieldHelper.getBorderColorProps(color, 'disabled')}
        ${ThemeHelper.getOpacityPropsForDisabledAsText()}
      }
  `;
  const InputFieldClass = cx(InputFieldMain, `lotus-size-${size}-${paddingControl}`);

  if (labelProps)
  {
    return <Label {...labelProps} variant={labelProps.variant ?? TypographyHelper.getTypographyVariantByControlSize(size)}>
      <input type='text' {...propsInput} className={InputFieldClass} />
    </Label>
  }
  else
  {
    return <input type='text' {...propsInput} className={InputFieldClass} />
  }
};
