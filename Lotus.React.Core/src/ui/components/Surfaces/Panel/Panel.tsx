import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import { css } from '@emotion/css';
import { ThemeHelper } from 'app/theme';
import { ICommonProps } from 'ui/components/CommonProps';
import { TPanelVariant } from './PanelVariant';

export interface IPanelProps extends Omit<ComponentPropsWithoutRef<'div'>, 'color'>, ICommonProps
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
  const { hasRadius, size = 'medium', color = 'main', paddingControl = 'normal', variant = 'outlined', elevation = 2, ...divProps } = props;
  const panelClass = css`
  ${ThemeHelper.getFontPropsAsText(size)}
  ${ThemeHelper.getForegroundColorForBackAsText(color, 'palest')}
  ${ThemeHelper.getBackgroundColorAsText(color, 'palest')}
  ${ThemeHelper.getBorderPropsAsText(color, undefined, hasRadius)}
  ${variant === 'elevation' ? ThemeHelper.getBoxShadowPropsAsText(elevation): ''}
  ${ThemeHelper.getPaddingPropsAsText(size, paddingControl, 'normal', 'normal')}
`;

  return <div ref={ref} {...divProps} className={panelClass}>{divProps.children}</div>;
})