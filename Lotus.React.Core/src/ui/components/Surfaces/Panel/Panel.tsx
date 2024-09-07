import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import { css } from '@emotion/css';
import { ThemeHelper } from 'app/theme';
import { IGeneralPropertiesElements } from 'ui/components/GeneralPropertiesElements';
import { TPanelVariant } from './PanelVariant';
import { TColorAccent } from 'ui/types';

export interface IPanelProps extends Omit<ComponentPropsWithoutRef<'div'>, 'color'>, IGeneralPropertiesElements
{
  /**
   * Вариант отображения
   */
  variant?: TPanelVariant;

  /**
   * Размер тени
   */
  elevation?: number;
}

export const Panel = forwardRef<HTMLDivElement, IPanelProps>((props, ref) => 
{
  const { hasRadius, size = 'medium', color, paddingControl = 'normal', variant = 'outlined', elevation = 2, ...divProps } = props;

  const colorAccent:TColorAccent|undefined = (color == 'main' || color == 'secondary') ? undefined : 'palest'; 

  const panelClass = css`
  ${ThemeHelper.getFontPropsAsText(size)}
  ${ThemeHelper.getForegroundColorForBackAsText(color, colorAccent)}
  ${ThemeHelper.getBackgroundColorAsText(color, colorAccent)}
  ${ThemeHelper.getBorderPropsAsText(color, undefined, hasRadius, size)}
  ${variant === 'elevation' ? ThemeHelper.getBoxShadowPropsAsText(elevation) : ''}
  ${ThemeHelper.getPaddingPropsAsText(size, paddingControl, 'normal', 'normal')}
`;

  return <div ref={ref} {...divProps} className={panelClass}>{divProps.children}</div>;
})