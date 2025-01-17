/* eslint-disable @typescript-eslint/no-unused-vars */
import { css, cx } from '@emotion/css';
import { Assert, ObjectHelper } from 'lotus-core';
import React, { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';
import { hasBorderProps, IGeneralElementProperties, IGeneralIconProperties } from 'ui/components';
import { RenderComponentHelper } from 'ui/helpers';
import { ThemeHelper, TThemeColorVariant } from 'ui/theme';

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
      backColor, backImage,
      borderRadius, borderStyle, borderWidth, borderColor,
      icon, iconColor, iconStyle, iconPlacement = 'left', imageDatabase,
      size = 'medium', paddingControl, extraClass,
      backColorVariant, textColorVariant, label, disabled, ...propsSpan } = props
  
  const chipClass = css(
    {
      userSelect: Assert.exist(icon) ? 'none' : undefined,
      ...ThemeHelper.getFontProps(size, fontBold, fontAccent),
      ...ThemeHelper.getTextEffectProps(size, textEffect, textAlign),
      ...ThemeHelper.getPaddingProps(size, paddingControl, 'normal', 'half'),
      ...ThemeHelper.getBorderRadiusProps(size, borderRadius),
      ...ThemeHelper.getForegroundColorByBackProps(backColor, backColorVariant, textColor, textColorVariant, textColorHarmonious),
      ...((backColor ?? backColorVariant)  ? ThemeHelper.getBackgroundColorProps(backColor, backColorVariant) : { backgroundColor: 'transparent'}),
      ...(hasBorderProps(props) ? ThemeHelper.getBorderStyleProps(size, borderStyle, borderWidth, borderColor) : { border:'none' }),
      ...(hasBorderProps(props) ? ThemeHelper.getBorderColorProps(borderColor ?? backColor, undefined, 2) : {}),
      ...((icon && label) ? ThemeHelper.getFlexContainerByIcon(size, paddingControl ?? 'normal', iconPlacement) : {}),
      ...(Assert.exist(disabled) ? ThemeHelper.getOpacityForDisabledProps(true) : {}),
      '&:hover':
      {
      },
      '&:active':
      {
      },
      '&:disabled':
      {
        ...ThemeHelper.getOpacityForDisabledProps()
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

  if(icon && label)
  {
    if(typeof label == 'string' || typeof label == 'number')
    {
      return <div {...propsSpan} className={cx(chipClass, extraClass)}>
        {RenderComponentHelper.renderIconAndValue(size, icon, undefined, iconStyle, iconColor, imageDatabase)}
        <span style={getStyleLabel()}>{label}</span>
      </div>;
    }
    else
    {
      return <div {...propsSpan} className={cx(chipClass, extraClass)}>
        {RenderComponentHelper.renderIconAndValue(size, icon, undefined, iconStyle, iconColor, imageDatabase)}
        {label}
      </div>;
    }
  }
  else
  {
    if(icon)
    {
      return <div {...propsSpan} className={cx(chipClass, extraClass)}>
        {RenderComponentHelper.renderIconAndValue(size, icon, undefined, iconStyle, iconColor, imageDatabase)}
      </div>;
    }
    else
    {
      return <span {...propsSpan} className={cx(chipClass, extraClass)}>{label}</span>;
    }
  }
};
