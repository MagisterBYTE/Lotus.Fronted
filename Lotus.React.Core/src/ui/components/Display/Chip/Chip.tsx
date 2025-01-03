import { css, cx } from '@emotion/css';
import { ObjectHelper } from 'lotus-core';
import React, { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';
import { hasBorderProps, IGeneralElementProperties, IGeneralIconProperties } from 'ui/components';
import { RenderComponentHelper } from 'ui/helpers';
import { Theme, TThemeColorVariant } from 'ui/theme';

export interface IChipProps extends Omit<ComponentPropsWithoutRef<'span'>, 'children'|'color'>, IGeneralElementProperties, IGeneralIconProperties
{

  /**
   * Вариант отображения фона
   */
  backColorVariant?: TThemeColorVariant;

  /**
   * Вариант отображения текста
   */
  textColorVariant?: TThemeColorVariant;
  
  /**
   * Надпись
   */
  label?: ReactNode;

  /**
   * Статус доступности
   */
  // eslint-disable-next-line react/boolean-prop-naming
  disabled?: boolean;
}

export const Chip: React.FC<IChipProps> = (props: IChipProps) => 
{
  const 
    { 
      fontBold, fontAccent, textEffect, textAlign, textColorHarmonious, textColor,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      backColor, backImage,
      borderRadius, borderStyle, borderWidth, borderColor,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      icon, iconColor, iconStyle,
      size = 'medium', paddingControl, extraClass,
      backColorVariant, textColorVariant, label, disabled, ...propsSpan } = props
  
  const chipClass = css(
    {
      lineHeight: ObjectHelper.getIf<string|number>(icon, 0, 'normal'),
      userSelect: ObjectHelper.getIf(icon, 'none', undefined),
      ...Theme.getFontProps(size, fontBold, fontAccent),
      ...Theme.getTextEffectProps(size, textEffect, textAlign),
      ...Theme.getPaddingProps(size, paddingControl, 'normal', 'half'),
      ...Theme.getBorderRadiusProps(size, borderRadius),
      ...Theme.getForegroundColorByBackProps(backColor, backColorVariant, textColor, textColorVariant, textColorHarmonious),
      ...((backColor ?? backColorVariant)  ? Theme.getBackgroundColorProps(backColor, backColorVariant) : { backgroundColor: 'transparent'}),
      ...(hasBorderProps(props) ? Theme.getBorderStyleProps(size, borderStyle, borderWidth, borderColor) : { border:'none' }),
      ...(hasBorderProps(props) ? Theme.getBorderColorProps(borderColor ?? backColor, undefined, 2) : {}),
      ...((icon && label) ? Theme.getFlexRowContainer(size, paddingControl ?? 'normal') : {}),
      ...(ObjectHelper.getIf(disabled, Theme.getOpacityForDisabledProps(true), {})),
      '&:hover':
      {
      },
      '&:active':
      {
      },
      '&:disabled':
      {
        ...Theme.getOpacityForDisabledProps()
      }
    });

  const getStyleLabel = ():CSSProperties =>
  {
    switch(size)
    {
      case 'smaller': return { marginTop: fontAccent ? undefined : '2px', marginRight: paddingControl ? undefined :  '2px' }
      case 'small': return { marginTop: fontAccent ? undefined : '2px', marginRight: paddingControl ? undefined : '2px' }
      case 'medium': return { marginTop: fontAccent ? undefined : '2px', marginRight: paddingControl ? undefined : '3px' }
      case 'large': return { marginTop: fontAccent ? undefined : '1px', marginRight: paddingControl ? undefined : '4px' }
    }

    return {};
  }

  const getStyleIcon = ():CSSProperties =>
  {
    switch(size)
    {
      case 'smaller': return { marginLeft: paddingControl ? undefined :  '2px' }
      case 'small': return {  marginLeft: paddingControl ? undefined : '2px' }
      case 'medium': return {  marginLeft: paddingControl ? undefined : '3px' }
      case 'large': return { marginLeft: paddingControl ? undefined : '4px' }
    }
  
    return {};
  }

  let tempIconProps:IGeneralIconProperties = props;
  if(!paddingControl && icon)
  {
    tempIconProps = {...props}
    if(tempIconProps.iconStyle)
    {
      if(!tempIconProps.iconStyle.marginLeft)
      {
        tempIconProps.iconStyle.marginLeft = getStyleIcon().marginLeft;
      }
    }
    else
    {
      tempIconProps.iconStyle = getStyleIcon();
    }
  }

  if(icon && label)
  {
    if(typeof label == 'string' || typeof label == 'number')
    {
      return <div {...propsSpan} className={cx(chipClass, extraClass)}>
        {RenderComponentHelper.renderIconProps(size, tempIconProps)}
        <span style={getStyleLabel()}>{label}</span>
      </div>;
    }
    else
    {
      return <div {...propsSpan} className={cx(chipClass, extraClass)}>
        {RenderComponentHelper.renderIconProps(size, tempIconProps)}
        {label}
      </div>;
    }
  }
  else
  {
    if(icon)
    {
      return <div {...propsSpan} className={cx(chipClass, extraClass)}>
        {RenderComponentHelper.renderIconProps(size, tempIconProps)}
      </div>;
    }
    else
    {
      return <span {...propsSpan} className={cx(chipClass, extraClass)}>{label}</span>;
    }
  }
};
