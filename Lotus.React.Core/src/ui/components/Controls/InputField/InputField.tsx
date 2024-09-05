import React, { ComponentPropsWithRef, ReactNode } from 'react';
import { css } from '@emotion/css';
import { ILabelProps, Label, TypographyHelper } from 'ui/components/Display';
import { ThemeHelper } from 'app/theme';
import { ICommonProps } from 'ui/components/CommonProps';
import { InputFieldHelper } from './InputFieldHelper';

export interface IInputFieldProps extends Omit<ComponentPropsWithRef<'input'>, 'size' | 'color'>, ICommonProps
{
  /**
   * Фон поля
   */
  isBackground?: boolean;

  /**
   * Параметры надписи
   */
  labelProps?: ILabelProps;

  /**
   * Дополнительный элемент справа
   */
  rightElement?: ReactNode;
}

export const InputField: React.FC<IInputFieldProps> = (props: IInputFieldProps) =>
{
  const { hasRadius, color = 'primary', size = 'medium', paddingControl = 'normal',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isBackground, labelProps, rightElement, ...propsInput } = props

  const inputFieldClass = css`
    ${ThemeHelper.getFontPropsAsText(size)}
    ${ThemeHelper.getBorderPropsAsText(color, undefined, hasRadius)}
    ${ThemeHelper.getTransitionColorsPropsAsText()}
    ${ThemeHelper.getPaddingPropsAsText(size, paddingControl, true)}
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
  if (labelProps)
  {
    return <Label {...labelProps} variant={labelProps.variant ?? TypographyHelper.getTypographyVariantByControlSize(size)}>
      <input type='text' {...propsInput} className={inputFieldClass} />
    </Label>
  }
  else
  {
    return <input type='text' {...propsInput} className={inputFieldClass} />
  }
};
