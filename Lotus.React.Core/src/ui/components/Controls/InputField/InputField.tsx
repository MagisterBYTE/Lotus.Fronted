/* eslint-disable @typescript-eslint/no-unused-vars */
import { css, cx } from '@emotion/css';
import React, { ComponentPropsWithoutRef, ReactNode } from 'react';
import { IGeneralElementProperties } from 'ui/components';
import { ILabelProps, Label, TypographyHelper } from 'ui/components/Display';
import { InteractivityLogic } from 'ui/interactivity';
import { Theme } from 'ui/theme';

export interface IInputFieldProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'color'>, IGeneralElementProperties
{
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
  const { 
    fontBold, fontAccent, textEffect, textAlign, textColorHarmonious, textColor,
    backColor, backImage,
    borderRadius, borderStyle, borderWidth, borderColor,
    size = 'medium', paddingControl = 'normal', extraClass,
    labelProps, width, rightElement, ...propsInput } = props

  const inputFieldClass = css(
    {
      boxSizing: 'border-box',
      width: width ? width : '',
      ...Theme.getFontProps(size, fontBold, fontAccent),
      ...Theme.getTextEffectProps(size, textEffect, textAlign),
      ...Theme.getPaddingProps(size, paddingControl, (size == 'large') ? 'half' : 'normal', 'half'),
      ...Theme.getBorderRadiusProps(size, borderRadius),
      ...Theme.getTransitionColorsProps(),
      ...InteractivityLogic.getEffectProps('input', 'normal', props, false, false, false),
      '&:hover': 
      {
        ...InteractivityLogic.getEffectProps('input', 'hover', props, false, false, false),
        ...((!propsInput.disabled) ? Theme.getBorderShadowProps(4, backColor, undefined, Theme.OpacityForBorderShadowHover) : {})
      },
      '&:focus':
      {
        ...InteractivityLogic.getEffectProps('input', 'hover', props, false, false, true),
        ...((!propsInput.disabled) ? Theme.getBorderShadowProps(4, backColor, undefined, Theme.OpacityForBorderShadowActive) : {}),
        outline: 0
      },
      '&:disabled': 
      {
        ...InteractivityLogic.getEffectProps('input', 'normal', props, false, true, false),
        ...Theme.getOpacityForDisabledProps()
      }
    });
  if (labelProps)
  {
    return <Label {...labelProps} size={size} variant={labelProps.variant ?? TypographyHelper.getTypographyVariantByControlSize(size)}
      textColor={labelProps.textColor ?? textColor}>
      <input type='text' {...propsInput} className={cx(inputFieldClass, extraClass)} />
    </Label>
  }
  else
  {
    return <input type='text' {...propsInput} className={cx(inputFieldClass, extraClass)} />
  }
};
