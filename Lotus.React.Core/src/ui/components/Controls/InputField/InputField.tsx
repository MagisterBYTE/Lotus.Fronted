import React, { ComponentPropsWithRef, ReactNode } from 'react';
import { css } from '@emotion/css';
import { ILabelProps, Label, TypographyHelper } from 'ui/components/Display';
import { ThemeHelper } from 'app/theme';
import { IGeneralPropertiesElements } from 'ui/components/GeneralPropertiesElements';
import { InputFieldHelper } from './InputFieldHelper';

export interface IInputFieldProps extends Omit<ComponentPropsWithRef<'input'>, 'size' | 'color'>, IGeneralPropertiesElements
{
  /**
   * Параметры надписи
   */
  labelProps?: ILabelProps;

  /**
   * Фон поля
   */
  isBackground?: boolean;

  /**
   * Дополнительный элемент справа
   */
  rightElement?: ReactNode;
}

export const InputField: React.FC<IInputFieldProps> = (props: IInputFieldProps) =>
{
  const { hasRadius, color = 'primary', size = 'medium', paddingControl = 'normal',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    labelProps, isBackground, width, rightElement, ...propsInput } = props

  const getWidth = ():string =>
  {
    if(width)
    {
      return `width: ${width};`;
    }
    else
    {
      return '';
    }
  }

  const inputFieldClass = css`
    box-sizing: border-box;
    ${getWidth()}
    ${ThemeHelper.getFontPropsAsText(size)}
    ${ThemeHelper.getBorderPropsAsText(undefined, undefined, hasRadius, size)}
    ${ThemeHelper.getTransitionColorsPropsAsText()}
    ${ThemeHelper.getPaddingPropsAsText(size, paddingControl, (size == 'large') ? 'half' : 'normal', 'half')}
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
    return <Label {...labelProps} size={size} variant={labelProps.variant ?? TypographyHelper.getTypographyVariantByControlSize(size)}>
      <input type='text' {...propsInput} className={inputFieldClass} />
    </Label>
  }
  else
  {
    return <input type='text' {...propsInput} className={inputFieldClass} />
  }
};
