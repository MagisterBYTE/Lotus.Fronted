import { css } from '@emotion/css';
import { ThemeHelper } from 'app/theme';
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';
import { ITypographyProps, Typography, TypographyHelper } from 'ui/components/Display';
import { IGeneralPropertiesElements } from 'ui/components/GeneralPropertiesElements';
import { TColorAccent } from 'ui/types';
import { TPanelVariant } from './PanelVariant';

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

  /**
   * Заголовок
   */
  header?: ReactNode;

  /**
   * Параметры отображения заголовка
   */
  headerTypographyProps?: ITypographyProps;
}

export const Panel = forwardRef<HTMLDivElement, IPanelProps>((props, ref) => 
{
  const { hasRadius, size = 'medium', color, paddingControl = 'normal', variant = 'outlined', elevation = 2, header, headerTypographyProps, ...divProps } = props;

  const colorAccent:TColorAccent|undefined = (color == 'main' || color == 'secondary') ? undefined : 'palest'; 

  const panelClass = css`
  ${ThemeHelper.getFontPropsAsText(size)}
  ${ThemeHelper.getForegroundColorForBackAsText(color, colorAccent)}
  ${ThemeHelper.getBackgroundColorAsText(color, colorAccent)}
  ${ThemeHelper.getBorderPropsAsText(color, undefined, hasRadius, size)}
  ${variant === 'elevation' ? ThemeHelper.getBoxShadowPropsAsText(elevation) : ''}
  ${ThemeHelper.getPaddingPropsAsText(size, paddingControl, 'normal', 'normal')}
`;

  if(header)
  {
    if(typeof header === 'string')
    {
      const hFont = TypographyHelper.getTypographyVariantToHeightPixel(headerTypographyProps?.variant);
      const headerClass = css(
        {
          position: 'relative',
          height: `${hFont}px`,
          top: `${-hFont}px`,
          left: '20px',
          paddingLeft: '2px',
          paddingRight: '2px',
          marginBottom: `${-hFont}px`,
          width: 'fit-content',
          ...ThemeHelper.getBackgroundColorAsCSS(color, colorAccent)
        })

      return <div ref={ref} {...divProps} className={panelClass}>
        <div className={headerClass}><Typography {...headerTypographyProps}>{header}</Typography></div>
        {divProps.children}</div>;
    }
    else
    {
      return <div ref={ref} {...divProps} className={panelClass}>{header}{divProps.children}</div>;
    }
  }
  else
  {
    return <div ref={ref} {...divProps} className={panelClass}>{divProps.children}</div>;
  }
})