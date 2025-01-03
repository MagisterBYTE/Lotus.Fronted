/* eslint-disable @typescript-eslint/no-unused-vars */
import { css, cx } from '@emotion/css';
import React, { ComponentPropsWithoutRef, CSSProperties } from 'react';
import { ILabelProps, Label, Typography, TypographyHelper } from 'ui/components';
import { IGeneralElementProperties } from 'ui/components';
import { InteractivityLogic } from 'ui/interactivity';
import { Theme } from 'ui/theme';
import { ThemePaletteHelper } from 'ui/theme/helpers/ThemePaletteHelper';
import { checkOfThemeModeColor } from 'ui/theme/types/ThemeModeColor';

export interface ICheckBoxProps extends Omit<ComponentPropsWithoutRef<'input'>, keyof IGeneralElementProperties>, IGeneralElementProperties
{
  /**
   * Использовать НЕ стандартный checkbox или radio
   */
  // eslint-disable-next-line react/boolean-prop-naming
  useCustom?: boolean;

  /**
   * Настройки символа для НЕ стандартного элемента
   */
  checkedSymbolStyle?: CSSProperties;

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
      fontBold, fontAccent, textEffect, textAlign, textColorHarmonious, textColor,
      backColor, backImage,
      borderRadius, borderStyle, borderWidth, borderColor,
      size = 'medium', paddingControl = 'normal', extraClass, 
      useCustom, checkedSymbolStyle, labelProps, hasScaleEffect, hasShadowEffect, 
      children, checked,
      ...propsCheckBox
    } = props

  const checkBoxClass = css(
    {
      appearance: useCustom ? 'none' :'auto', 
      cursor: 'pointer',
      margin: '0px',
      accentColor: useCustom ? 'initial' : ((checkOfThemeModeColor(backColor) 
        ? ThemePaletteHelper.getColor(backColor, 'main').toCSSRgbValue() 
        : Theme.getBackgroundColorProps(backColor).backgroundColor)),
      ...Theme.getFontProps(size, fontBold, fontAccent),
      ...Theme.getSizeProps(size, paddingControl),
      ...Theme.getTextEffectProps(size, textEffect, textAlign),
      ...Theme.getPaddingProps(size, paddingControl, 'normal', 'half'),
      ...Theme.getTransitionColorsProps(),
      ...Theme.getBorderRadiusProps(size, borderRadius),
      ...InteractivityLogic.getEffectProps('outline', 'normal', props, checked),
      '&:hover':
      {
        ...InteractivityLogic.getEffectProps('outline', 'hover', props, checked, props.disabled),
        ...((!propsCheckBox.disabled && hasShadowEffect) ? Theme.getBorderShadowProps(4, backColor, undefined, Theme.OpacityForBorderShadowHover) : {}),
        ...((!propsCheckBox.disabled && hasScaleEffect) ? Theme.getTransformScaleProps(1.2) : {})
      },
      '&:active':
      {
        ...InteractivityLogic.getEffectProps('outline', 'pressed', props, checked, props.disabled),
        ...((!propsCheckBox.disabled && hasShadowEffect) ? Theme.getBorderShadowProps(6, backColor, undefined, Theme.OpacityForBorderShadowActive) : {}),
        ...((!propsCheckBox.disabled && hasScaleEffect) ? Theme.getTransformScaleProps(1.2) : {})
      },
      '&:checked':
      {
        ...InteractivityLogic.getEffectProps('outline', 'normal', props, true, props.disabled),
        ...((!propsCheckBox.disabled && hasShadowEffect) ? Theme.getBorderShadowProps(6, backColor, undefined, Theme.OpacityForBorderShadowActive) : {}),
        ...((!propsCheckBox.disabled && hasScaleEffect) ? Theme.getTransformScaleProps(1.2) : {})
      },
      '&:checked::after':
      {
        ...checkedSymbolStyle
      },
      '&:disabled':
      {
        ...Theme.getOpacityForDisabledProps()
      }
    })

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

  if (labelProps)
  {
    return <Label {...labelProps} size={labelProps.size ?? size} valueStyle={getStyleValue()}
      variant={labelProps.variant ?? TypographyHelper.getTypographyVariantByControlSize(size)}
      textColor={labelProps.textColor ?? textColor}>
      <input {...propsCheckBox} type={propsCheckBox.type == 'radio' ? 'radio' : 'checkbox'} className={cx(checkBoxClass, extraClass)} />
    </Label>
  }
  else
  {
    if(props.children)
    {
      return <span style={Theme.getFlexRowContainer(size, paddingControl)}>
        <input {...propsCheckBox} type={propsCheckBox.type == 'radio' ? 'radio' : 'checkbox'} className={cx(checkBoxClass, extraClass)}/>
        <Typography 
          textColor={textColor ?? backColor}
          variant={TypographyHelper.getTypographyVariantByControlSize(size)} >
          {props.children}
        </Typography>
      </span>
    }
    else
    {
      return <input {...propsCheckBox} type={propsCheckBox.type == 'radio' ? 'radio' : 'checkbox'} className={cx(checkBoxClass, extraClass)} />
    }
  }
};
