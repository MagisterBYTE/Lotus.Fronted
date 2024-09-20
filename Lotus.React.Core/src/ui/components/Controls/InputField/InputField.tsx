import { css, cx } from '@emotion/css';
import { ObjectHelper } from 'lotus-core';
import React, { ComponentPropsWithoutRef, ReactNode } from 'react';
import { IGeneralPropertiesElement, IGeneralPropertiesText } from 'ui/components';
import { ILabelProps, Label, TypographyHelper } from 'ui/components/Display';
import { InteractivityLogic } from 'ui/interactivity';
import { ThemeConstants, ThemeHelper } from 'ui/theme';
import { InputFieldHelper } from './InputFieldHelper';

export interface IInputFieldProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'color'>, IGeneralPropertiesElement, IGeneralPropertiesText
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
  const { borderRounded, borderStyle, color = 'primary', size = 'medium', paddingControl = 'normal', extraClass,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fontBold, textAlign, textEffect, isBackground, labelProps, width, rightElement, ...propsInput } = props

  const inputFieldClass = css(
    {
      boxSizing: 'border-box',
      width: ObjectHelper.getIf(width, width, ''),
      ...ThemeHelper.getFontProps(size, fontBold),
      ...ThemeHelper.getTextEffectProps(size, textEffect, textAlign),
      ...ThemeHelper.getBorderProps(size, borderRounded, borderStyle),
      ...ThemeHelper.getPaddingProps(size, paddingControl, (size == 'large') ? 'half' : 'normal', 'half'),
      ...ThemeHelper.getTransitionColorsProps(),
      ...InteractivityLogic.getEffectProps(size, 'input', 'normal', color),
      ...InputFieldHelper.getBackgroundProps(color, isBackground),
      '&:hover': 
      {
        ...InteractivityLogic.getEffectProps(size, 'input', 'hover', color),
        ...((!propsInput.disabled) ? ThemeHelper.getBorderShadowProps(4, color, undefined, ThemeConstants.OpacityForBorderShadowHover) : {}),
        ...InputFieldHelper.getBackgroundProps(color, isBackground)
      },
      '&:focus':
      {
        ...InteractivityLogic.getEffectProps(size, 'input', 'normal', color, undefined, undefined, true),
        ...((!propsInput.disabled) ? ThemeHelper.getBorderShadowProps(4, color, undefined, ThemeConstants.OpacityForBorderShadowActive) : {}),
        ...InputFieldHelper.getBackgroundProps(color, isBackground),
        outline: 0
      },
      '&:disabled': 
      {
        ...InteractivityLogic.getEffectProps(size, 'input', 'normal', color, undefined, true, undefined),
        ...InputFieldHelper.getBackgroundProps(color, isBackground),
        ...ThemeHelper.getOpacityForDisabledProps()
      }
    });
  if (labelProps)
  {
    return <Label {...labelProps} size={size} variant={labelProps.variant ?? TypographyHelper.getTypographyVariantByControlSize(size)}>
      <input type='text' {...propsInput} className={cx(inputFieldClass, extraClass)} />
    </Label>
  }
  else
  {
    return <input type='text' {...propsInput} className={cx(inputFieldClass, extraClass)} />
  }
};
