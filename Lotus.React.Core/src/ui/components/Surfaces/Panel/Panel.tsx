import React, { ComponentPropsWithoutRef } from 'react';
import { TColorType, TControlPadding, TControlSize } from 'ui/types';
import { css } from '@emotion/css';
import { ThemeHelper } from 'app/theme';
import { TPanelVariant } from './PanelVariant';

export interface IPanelProps extends ComponentPropsWithoutRef<'div'>
{
  /**
   * Радиус скругления
   */
  hasRadius?: boolean;

  /**
   * Размер панели
   */
  size?: TControlSize;
  
  /**
   * Цвет
   */
  color?: TColorType;

  /**
   * Внутренний отступ
   */
  paddingControl?: TControlPadding;

  /**
   * Вариант отображения
   */
  variant?: TPanelVariant;

  /**
   * Размер тени
   */
  elevation?: number;
}

export const Panel: React.FC<IPanelProps> = (props: IPanelProps) => 
{
  const { hasRadius, size = 'medium', color = 'main', paddingControl = 'normal', variant = 'outlined', elevation = 2, ...divProps } = props;
  const panelClass = css`
  ${ThemeHelper.getFontPropsAsText(size)}
  ${ThemeHelper.getForegroundColorForBackAsText(color, 'palest')}
  ${ThemeHelper.getBackgroundColorAsText(color, 'palest')}
  ${ThemeHelper.getBorderPropsAsText(color, undefined, hasRadius)}
  ${variant === 'elevation' ? ThemeHelper.getBoxShadowPropsAsText(elevation): ''}
  ${ThemeHelper.getPaddingPropsAsText(size, paddingControl)}
`;

  return <div {...divProps} className={panelClass}>{divProps.children}</div>;
};