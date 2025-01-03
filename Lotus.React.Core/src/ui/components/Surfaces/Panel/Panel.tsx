import { css, cx } from '@emotion/css';
import { ComponentPropsWithoutRef, CSSProperties, forwardRef, ReactNode } from 'react';
import { IGeneralElementProperties, IGeneralIconProperties } from 'ui/components';
import { ITypographyProps, TTypographyVariant, Typography, TypographyHelper } from 'ui/components/Display';
import { hasBorderProps } from 'ui/components/GeneralBorderProperties';
import { RenderComponentHelper } from 'ui/helpers';
import { Theme, TThemeColorVariant } from 'ui/theme';
import { TShadowElevation } from 'ui/types';

export interface IPanelProps extends Omit<ComponentPropsWithoutRef<'div'>, keyof IGeneralElementProperties>, IGeneralElementProperties, 
  IGeneralIconProperties
{
  /**
   * Вариант отображения
   */
  backColorVariant?: TThemeColorVariant;

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
  const {
    fontBold, fontAccent, textEffect, textAlign, textColorHarmonious, textColor,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    backColor, backImage,
    borderRadius, borderStyle, borderWidth, borderColor,
    size = 'medium', paddingControl = 'normal', extraClass,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    backColorVariant = 'palest', shadowElevation, header, headerTypographyProps, icon, iconColor, iconStyle, ...divProps } = props;

  const hasIcon = Boolean(icon);

  const panelClass = css(
    {
      ...Theme.getFontProps(size, fontBold, fontAccent),
      ...Theme.getTextEffectProps(size, textEffect, textAlign),
      ...Theme.getPaddingProps(size, paddingControl, 'normal', 'normal'),
      ...Theme.getBackgroundColorProps(backColor, backColorVariant, undefined),
      ...Theme.getForegroundColorByBackProps(backColor, backColorVariant, textColor, undefined, textColorHarmonious),
      ...Theme.getBorderRadiusProps(size, borderRadius),
      ...(hasBorderProps(props) ? Theme.getBorderStyleProps(size, borderStyle, borderWidth, borderColor) : {}),
      ...(hasBorderProps(props) ? Theme.getBorderColorProps(borderColor ?? backColor, backColorVariant, 3, undefined) : {}),
      ...(shadowElevation ? Theme.getBoxShadowProps(shadowElevation, backColor, undefined) : {})
    })

  const getHeaderProps = (variant: TTypographyVariant): CSSProperties =>
  {
    const headerProps: CSSProperties = {}
    const hFontSize = TypographyHelper.convertTypographyVariantToHeightPixel(variant);
    let topOffset = hFontSize + (hasBorderProps(props) ? 2 : 0);
    if(hasIcon)
    {
      const minIcon = Theme.convertControlSizeToIconSizeInPixel(size);
      if(minIcon > topOffset)
      {
        topOffset = minIcon;
      }
    }

    switch (size)
    {
      case 'smaller':
        {
          headerProps.height = `${topOffset}px`;
          headerProps.top = `${-topOffset * 1.2}px`;
          headerProps.left = '20px';
          headerProps.paddingLeft = '6px';
          headerProps.paddingRight = '6px';
          headerProps.paddingTop = '2px';
          headerProps.paddingBottom = '2px';
          headerProps.marginBottom = `${-topOffset * 1.4}px`;
        } break;
      case 'small':
        {
          headerProps.height = `${topOffset}px`;
          headerProps.top = `${-topOffset}px`;
          headerProps.left = '20px';
          headerProps.paddingLeft = '6px';
          headerProps.paddingRight = '6px';
          headerProps.paddingTop = '2px';
          headerProps.paddingBottom = '2px';
          headerProps.marginBottom = `${-topOffset * 1.2}px`;
        } break;
      case 'medium':
        {
          headerProps.height = `${topOffset}px`;
          headerProps.top = `${-topOffset}px`;
          headerProps.left = '20px';
          headerProps.paddingLeft = '10px';
          headerProps.paddingRight = '10px';
          headerProps.paddingTop = '3px';
          headerProps.paddingBottom = '3px';
          headerProps.marginBottom = `${-topOffset * 1.2}px`;
        } break;
      case 'large':
        {
          headerProps.height = `${topOffset}px`;
          headerProps.top = `${-topOffset * 1.4}px`;
          headerProps.left = '20px';
          headerProps.paddingLeft = '10px';
          headerProps.paddingRight = '10px';
          headerProps.paddingTop = '3px';
          headerProps.paddingBottom = '3px';
          headerProps.marginBottom = `${-topOffset * 1.4}px`;
        } break;
    }

    return headerProps;
  }

  if (header)
  {
    if (typeof header === 'string')
    {
      const variant = headerTypographyProps?.variant ?? TypographyHelper.getTypographyVariantByControlSize(size);
      const headerClass = css(
        {
          ...getHeaderProps(variant),
          width: 'fit-content',
          position: 'relative',
          ...(hasIcon ? Theme.getFlexRowContainer(size, paddingControl) : {}),
          ...Theme.getBorderRadiusProps(size, borderRadius),
          ...(hasBorderProps(props) ? Theme.getBorderStyleProps(size, borderStyle, borderWidth, borderColor) : {}),
          ...(hasBorderProps(props) ? Theme.getBorderColorProps(borderColor ?? backColor, backColorVariant, 3, undefined) : {}),
          ...Theme.getBackgroundColorProps(backColor, backColorVariant, undefined)
        })

      return <div ref={ref} {...divProps} className={cx(panelClass, extraClass)}>
        <div className={headerClass}>
          {Boolean(icon) && RenderComponentHelper.renderIconProps(size, props)}
          <Typography {...headerTypographyProps}
            variant={variant}
            textColor={headerTypographyProps?.textColor ?? Theme.getColor(textColor ?? backColor,
              (textColor ? undefined : backColorVariant),
              (textColor ? undefined : true),
              (textColor ? undefined : textColorHarmonious), undefined)}>
            {header}
          </Typography>
        </div>
        {divProps.children}
      </div>;
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