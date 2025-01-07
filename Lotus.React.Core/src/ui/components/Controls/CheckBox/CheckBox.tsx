/* eslint-disable @typescript-eslint/no-unused-vars */
import { css, cx } from '@emotion/css';
import React, { ComponentPropsWithoutRef, CSSProperties } from 'react';
import { IGeneralElementProperties, ILabelProps, Label, Typography, TypographyHelper } from 'ui/components';
import { CssPropertiesBuilder } from 'ui/helpers';
import { IInteractivityBackgroundEffect } from 'ui/interactivity';
import { ThemeHelper } from 'ui/theme';
import { ThemePaletteHelper } from 'ui/theme/helpers/ThemePaletteHelper';
import { checkOfThemeModeColor } from 'ui/theme/types/ThemeModeColor';

export interface ICheckBoxProps extends Omit<ComponentPropsWithoutRef<'input'>, keyof IGeneralElementProperties>, 
  IGeneralElementProperties, IInteractivityBackgroundEffect
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
}

export const CheckBox: React.FC<ICheckBoxProps> = (props: ICheckBoxProps) =>
{
  const
    {
      fontBold, fontAccent, textEffect, textAlign, textColorHarmonious, textColor,
      backColor, backImage,
      borderRadius, borderStyle, borderWidth, borderColor,
      size = 'medium', paddingControl = 'normal', extraClass, 
      useCustom, checkedSymbolStyle, labelProps, 
      hasRippleEffect, hasScaleEffect, hasShadowBorderEffect, hasShadowBoxEffect,
      children, checked,
      ...propsCheckBox
    } = props

  const cssProperties = CssPropertiesBuilder.buildInteractivityElement('outline', props, { isSelected: checked });

  const checkBoxClass = css(
    {
      ...cssProperties,
      appearance: useCustom ? 'none' :'auto', 
      cursor: 'pointer',
      margin: '0px',
      accentColor: useCustom ? 'initial' : ((checkOfThemeModeColor(backColor) 
        ? ThemePaletteHelper.getColor(backColor, 'main').toCSSRgbValue() 
        : ThemeHelper.getBackgroundColorProps(backColor).backgroundColor)),
      ...ThemeHelper.getSizeProps(size, paddingControl),
      '&:checked::after':
      {
        ...checkedSymbolStyle
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

  const renderCheckBox = () =>
  {
    return <input {...propsCheckBox} type={propsCheckBox.type == 'radio' ? 'radio' : 'checkbox'} className={cx(checkBoxClass, extraClass)} />
  }

  if (labelProps)
  {
    return <Label {...labelProps} size={labelProps.size ?? size} valueStyle={getStyleValue()}
      variant={labelProps.variant ?? TypographyHelper.getTypographyVariantByControlSize(size)}
      textColor={labelProps.textColor ?? textColor}>
      {renderCheckBox()}
    </Label>
  }
  else
  {
    if(props.children)
    {
      return <span style={ThemeHelper.getFlexRowContainer(size, paddingControl)}>
        {renderCheckBox()}
        <Typography 
          textColor={textColor ?? backColor}
          variant={TypographyHelper.getTypographyVariantByControlSize(size)} >
          {props.children}
        </Typography>
      </span>
    }
    else
    {
      return renderCheckBox();
    }
  }
};
