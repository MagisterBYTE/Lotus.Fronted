import { css, cx } from '@emotion/css';
import { Theme, TThemeColorVariant } from 'ui/theme';
import React, { ComponentPropsWithoutRef, ReactNode } from 'react';
import { ObjectHelper } from 'lotus-core';
import { IGeneralPropertiesElement, IGeneralPropertiesText } from 'ui/components';
import { RenderComponentHelper } from 'ui/helpers';

export interface IChipProps extends Omit<ComponentPropsWithoutRef<'span'>, 'children'|'color'>, IGeneralPropertiesElement, IGeneralPropertiesText
{
  /**
   * Вариант цвета
   */
  colorVariant?: TThemeColorVariant;
  
  /**
   * Надпись
   */
  label: ReactNode;

  /**
   * Статус доступности
   */
  // eslint-disable-next-line react/boolean-prop-naming
  disabled?: boolean;

  /**
   * Статус иконки в label
   */
  hasIcon?: boolean;
}

export const Chip: React.FC<IChipProps> = (props: IChipProps) => 
{
  const { borderRounded, borderStyle, color, size = 'medium', paddingControl = 'normal', extraClass,
    fontBold, fontAccent, textAlign, textEffect, textColorHarmonious, colorVariant, label, disabled, hasIcon, ...propsSpan } = props
  
  const chipClass = css(
    {
      lineHeight: ObjectHelper.getIf<string|number>(hasIcon, 0, 'normal'),
      userSelect: ObjectHelper.getIf(hasIcon, 'none', undefined),
      ...Theme.getFontProps(size, fontBold, fontAccent),
      ...Theme.getTextEffectProps(size, textEffect, textAlign),
      ...Theme.getPaddingProps(size, paddingControl, 'half', 'half'),
      ...Theme.getForegroundColorProps(color, colorVariant ?? 'white', true, textColorHarmonious),
      ...(colorVariant ? Theme.getBackgroundColorProps(color, colorVariant) : {}),
      ...(borderStyle ? Theme.getBorderStyleProps(size, borderRounded, borderStyle) : {}),
      ...(borderStyle ? Theme.getBorderColorProps(color, colorVariant, 2) : {}),
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

  if(hasIcon)
  {
    return <div {...propsSpan} className={cx(chipClass, extraClass)}>
      {RenderComponentHelper.renderIcon(size, label)}
    </div>;
  }
  else
  {
    return <span {...propsSpan} className={cx(chipClass, extraClass)}>{label}</span>;
  }
};
