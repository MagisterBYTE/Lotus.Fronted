import { css, cx } from '@emotion/css';
import { Theme, TThemeColorVariant } from 'ui/theme';
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';
import { ITypographyProps, Typography, TypographyHelper } from 'ui/components/Display';
import { IGeneralPropertiesElement, IGeneralPropertiesText } from 'ui/components';
import { TShadowElevation } from 'ui/types';

export interface IPanelProps extends Omit<ComponentPropsWithoutRef<'div'>, 'color'>, IGeneralPropertiesElement, IGeneralPropertiesText
{
  /**
   * Вариант отображения
   */
  colorVariant?: TThemeColorVariant;

  /**
   * Размер тени
   */
  shadowElevation?: TShadowElevation;

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
  const { borderRounded, borderStyle, color, size = 'medium', paddingControl = 'normal', extraClass,
    fontBold, fontAccent, textAlign, textEffect, textColorHarmonious, colorVariant = 'palest', shadowElevation, header, headerTypographyProps, ...divProps } = props;

  const panelClass = css(
    {
      ...Theme.getFontProps(size, fontBold, fontAccent),
      ...Theme.getTextEffectProps(size, textEffect, textAlign),
      ...Theme.getPaddingProps(size, paddingControl, 'normal', 'normal'),
      ...Theme.getBackgroundColorProps(color, colorVariant),
      ...Theme.getForegroundColorProps(color, colorVariant, true, textColorHarmonious),
      ...(borderStyle ? Theme.getBorderStyleProps(size, borderRounded, borderStyle) : {}),
      ...(borderStyle ? Theme.getBorderColorProps(color, colorVariant, 3) : {}),
      ...(shadowElevation ? Theme.getBoxShadowProps(shadowElevation, color) : {})
    })

  if (header)
  {
    if (typeof header === 'string')
    {
      const hFont = TypographyHelper.convertTypographyVariantToHeightPixel(headerTypographyProps?.variant);
      const headerClass = css(
        {
          position: 'relative',
          height: `${hFont}px`,
          top: `${-hFont}px`,
          left: '20px',
          paddingLeft: '6px',
          paddingRight: '6px',
          marginBottom: `${-hFont}px`,
          width: 'fit-content',
          ...(borderStyle ? Theme.getBorderStyleProps(size, borderRounded, borderStyle) : {}),
          ...(borderStyle ? Theme.getBorderColorProps(color, colorVariant, 3) : {}),
          ...Theme.getBackgroundColorProps(color, 'palest')
        })

      return <div ref={ref} {...divProps} className={cx(panelClass, extraClass)}>
        <div className={headerClass}><Typography {...headerTypographyProps}>{header}</Typography></div>
        {divProps.children}</div>;
    }
    else
    {
      return <div ref={ref} {...divProps} className={cx(panelClass, extraClass)}>{header}{divProps.children}</div>;
    }
  }
  else
  {
    return <div ref={ref} {...divProps} className={cx(panelClass, extraClass)}>{divProps.children}</div>;
  }
})