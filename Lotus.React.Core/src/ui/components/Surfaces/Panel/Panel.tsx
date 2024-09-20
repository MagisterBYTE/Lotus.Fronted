import { css } from '@emotion/css';
import { ThemeHelper, TThemeColorVariant } from 'ui/theme';
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';
import { ITypographyProps, Typography, TypographyHelper } from 'ui/components/Display';
import { IGeneralPropertiesElement } from 'ui/components/GeneralPropertiesElements';
import { TPanelVariant } from './PanelVariant';

export interface IPanelProps extends Omit<ComponentPropsWithoutRef<'div'>, 'color'>, IGeneralPropertiesElement
{
  /**
   * Вариант отображения
   */
  colorVariant?: TThemeColorVariant;

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
  const { borderRounded: hasRadius, size = 'medium', color, paddingControl = 'normal', colorVariant, 
    variant = 'outlined', elevation = 2, header, headerTypographyProps, ...divProps } = props;

  const panelClass = css(
    {
      ...ThemeHelper.getFontProps(size),
      ...ThemeHelper.getForegroundColorForBackAsCSS(color, colorVariant),
      ...ThemeHelper.getBackgroundColorProps(color, colorVariant),
      ...ThemeHelper.getBorderProps(color, undefined, hasRadius, size),
      ...(variant === 'elevation' ? ThemeHelper.getBoxShadowProps(elevation) : {}),
      ...ThemeHelper.getPaddingProps(size, paddingControl, 'normal', 'normal')
    })

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
          ...ThemeHelper.getBackgroundColorProps(color, 'palest')
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