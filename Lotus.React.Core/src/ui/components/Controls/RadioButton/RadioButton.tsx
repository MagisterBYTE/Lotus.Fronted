/* eslint-disable @typescript-eslint/no-unused-vars */
import { css, cx } from '@emotion/css';
import React, { ComponentPropsWithoutRef, CSSProperties } from 'react';
import { ILabelProps, Label, TypographyHelper } from 'ui/components';
import { IGeneralBaseElementProperties } from 'ui/components/GeneralElementProperties';
import { InteractivityLogic } from 'ui/interactivity';
import { Theme } from 'ui/theme';
import { TColorPresentation } from 'ui/types';

export interface IRadioButtonProps extends Omit<ComponentPropsWithoutRef<'input'>, keyof IGeneralBaseElementProperties>, IGeneralBaseElementProperties
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

export const RadioButton: React.FC<IRadioButtonProps> = (props: IRadioButtonProps) =>
{
  const
    {
      accentColor, labelProps, borderRadius, size = 'medium', paddingControl = 'normal', extraClass,
      hasScaleEffect, hasShadowEffect, children,
      ...propsRadioButton
    } = props

  const getStyleValue = ():CSSProperties =>
  {
    const style:CSSProperties = { lineHeight: 0 }
    switch (size) 
    {
      case 'smaller': style.marginTop = '4px'; break;
      case 'small': break;
      case 'medium': break;
      case 'large': style.marginTop = '-2px'; break;
    }
    return style;
  }

  const radioButtonClass = css(
    {
      cursor: 'pointer',
      margin: '0px',
      ...Theme.getSizeProps(size, paddingControl),
      accentColor: Theme.getBackgroundColorProps(accentColor).backgroundColor,
      '&:hover':
      {
        ...InteractivityLogic.getEffectProps('outline', 'hover', props, false, props.disabled, false),
        ...((!propsRadioButton.disabled && hasShadowEffect) ? Theme.getBorderShadowProps(4, accentColor, undefined, Theme.OpacityForBorderShadowHover) : {}),
        ...((!propsRadioButton.disabled && hasScaleEffect) ? Theme.getTransformScaleProps(1.2) : {})
      },
      '&:active':
      {
        ...InteractivityLogic.getEffectProps('outline', 'pressed', props, false, props.disabled, false),
        ...((!propsRadioButton.disabled && hasShadowEffect) ? Theme.getBorderShadowProps(6, accentColor, undefined, Theme.OpacityForBorderShadowActive) : {}),
        ...((!propsRadioButton.disabled && hasScaleEffect) ? Theme.getTransformScaleProps(1.2) : {})
      },
      '&:disabled':
      {
        ...Theme.getOpacityForDisabledProps()
      }
    })

  if (labelProps)
  {
    return <Label {...labelProps} size={labelProps.size ?? size} valueStyle={getStyleValue()}
      variant={labelProps.variant ?? TypographyHelper.getTypographyVariantByControlSize(size)}
      textColor={labelProps.textColor ?? accentColor}>
      <input type='radio' {...propsRadioButton} className={cx(radioButtonClass, extraClass)} />
    </Label>
  }
  else
  {
    return <input type='radio' {...propsRadioButton} className={cx(radioButtonClass, extraClass)} />
  }
};
