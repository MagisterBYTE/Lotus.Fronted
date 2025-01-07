/* eslint-disable @typescript-eslint/no-unused-vars */
import { css, cx } from '@emotion/css';
import React, { ComponentPropsWithoutRef, ReactNode } from 'react';
import { IGeneralElementProperties } from 'ui/components';
import { ILabelProps, Label, TypographyHelper } from 'ui/components/Display';
import { IInteractivityBackgroundEffect, InteractivityLogic } from 'ui/interactivity';
import { ThemeConstant, ThemeHelper } from 'ui/theme';

export interface IInputFieldProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'color'>, 
  IGeneralElementProperties, IInteractivityBackgroundEffect
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
    labelProps, width, rightElement, 
    hasRippleEffect, hasScaleEffect, hasShadowBorderEffect, hasShadowBoxEffect,
    ...propsInput } = props

  const inputFieldClass = css(
    {
      boxSizing: 'border-box',
      width: width ? width : '',
      ...ThemeHelper.getFontProps(size, fontBold, fontAccent),
      ...ThemeHelper.getTextEffectProps(size, textEffect, textAlign),
      ...ThemeHelper.getPaddingProps(size, paddingControl, (size == 'large') ? 'half' : 'normal', 'half'),
      ...ThemeHelper.getBorderRadiusProps(size, borderRadius),
      ...ThemeHelper.getTransitionColorsProps(),
      ...InteractivityLogic.getEffectProps('input', 'normal', props, false, props.disabled, false),
      '&:hover': 
      {
        ...InteractivityLogic.getEffectProps('input', 'hover', props, false, props.disabled, false),
        ...((!propsInput.disabled && hasShadowBorderEffect) ? ThemeHelper.getBorderShadowProps(4, backColor, undefined, ThemeConstant.OpacityForBorderShadowHover) : {}),
        ...((!propsInput.disabled && hasShadowBoxEffect) ? ThemeHelper.getBoxShadowProps(4, backColor, undefined) : {}),
        ...((!propsInput.disabled && hasScaleEffect) ? ThemeHelper.getTransformScaleProps(1.05) : {})
      },
      '&:focus':
      {
        outline: 0,
        ...InteractivityLogic.getEffectProps('input', 'hover', props, false, props.disabled, true),
        ...((!propsInput.disabled && hasShadowBorderEffect) ? ThemeHelper.getBorderShadowProps(6, backColor, undefined, ThemeConstant.OpacityForBorderShadowActive) : {}),
        ...((!propsInput.disabled && hasShadowBoxEffect) ? ThemeHelper.getBoxShadowProps(8, backColor, undefined) : {}),
        ...((!propsInput.disabled && hasScaleEffect) ? ThemeHelper.getTransformScaleProps(0.95) : {})
      },
      '&:disabled': 
      {
        ...InteractivityLogic.getEffectProps('input', 'normal', props, false, true, false),
        ...ThemeHelper.getOpacityForDisabledProps()
      }
    });
  if (labelProps)
  {
    return <Label {...labelProps} size={size} 
      variant={labelProps.variant ?? TypographyHelper.getTypographyVariantByControlSize(size)}
      textColor={labelProps.textColor ?? textColor}>
      <input type='text' {...propsInput} className={cx(inputFieldClass, extraClass)} />
    </Label>
  }
  else
  {
    return <input type='text' {...propsInput} className={cx(inputFieldClass, extraClass)} />
  }
};
