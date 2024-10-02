/* eslint-disable @typescript-eslint/no-unused-vars */
import { css, cx } from '@emotion/css';
import React, { ComponentPropsWithoutRef } from 'react';
import { ILabelProps, Label, TypographyHelper } from 'ui/components';
import { IGeneralBaseElementProperties } from 'ui/components/GeneralElementProperties';
import { InteractivityLogic } from 'ui/interactivity';
import { Theme } from 'ui/theme';
import { TColorPresentation } from 'ui/types';

export interface ICheckBoxProps extends Omit<ComponentPropsWithoutRef<'input'>, keyof IGeneralBaseElementProperties>, IGeneralBaseElementProperties
{
  /**
   * Основной цвет
   */
  accentColor?: TColorPresentation;

  /**
   * Параметры надписи
   */
  labelProps?: ILabelProps;
  
  /**
   * Использовать эффект масштабирования
   */
  hasScaleEffect?: boolean;

  /**
   * Использовать эффект тени
   */
  hasShadowEffect?: boolean;
}

export const CheckBox: React.FC<ICheckBoxProps> = (props: ICheckBoxProps) =>
{
  const
    {
      accentColor, labelProps, size = 'medium', paddingControl = 'normal', extraClass,
      hasScaleEffect, hasShadowEffect, children,
      ...propsCheckBox
    } = props

  const checkBoxClass = css(
    {
      cursor: 'pointer',
      ...Theme.getSizeProps(size, paddingControl, 'half'),
      accentColor: Theme.getBackgroundColorProps(accentColor).backgroundColor,
      '&:hover':
      {
        ...InteractivityLogic.getEffectProps('outline', 'hover', props, false, props.disabled, false),
        ...((!propsCheckBox.disabled && hasShadowEffect) ? Theme.getBorderShadowProps(4, accentColor, undefined, Theme.OpacityForBorderShadowHover) : {}),
        ...((!propsCheckBox.disabled && hasScaleEffect) ? Theme.getTransformScaleProps(1.2) : {})
      },
      '&:active':
      {
        ...InteractivityLogic.getEffectProps('outline', 'pressed', props, false, props.disabled, false),
        ...((!propsCheckBox.disabled && hasShadowEffect) ? Theme.getBorderShadowProps(6, accentColor, undefined, Theme.OpacityForBorderShadowActive) : {}),
        ...((!propsCheckBox.disabled && hasScaleEffect) ? Theme.getTransformScaleProps(1.2) : {})
      },
      '&:disabled':
      {
        ...Theme.getOpacityForDisabledProps()
      }
    })

  if (labelProps)
  {
    return <Label {...labelProps} size={size} 
      variant={labelProps.variant ?? TypographyHelper.getTypographyVariantByControlSize(size)}
      textColor={labelProps.textColor ?? accentColor}>
      <input type='checkbox' {...propsCheckBox} className={cx(checkBoxClass, extraClass)} />
    </Label>
  }
  else
  {
    return <input type='checkbox' {...propsCheckBox} className={cx(checkBoxClass, extraClass)} />
  }
};
