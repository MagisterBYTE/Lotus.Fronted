/* eslint-disable @typescript-eslint/no-unused-vars */
import { css, cx } from '@emotion/css';
import { Color } from 'lotus-core';
import { ComponentPropsWithRef, ReactNode } from 'react';
import { IGeneralElementProperties, IGeneralIconProperties } from 'ui/components';
import { ITypographyProps, Typography, TypographyHelper } from 'ui/components/Display';
import { hasBorderProps } from 'ui/components/GeneralBorderProperties';
import { CssPropertiesBuilder, RenderComponentHelper } from 'ui/helpers';
import { ThemeHelper, TThemeColorVariant } from 'ui/theme';
import { TShadowElevation } from 'ui/types';

export interface IPanelProps extends Omit<ComponentPropsWithRef<'div'>, keyof IGeneralElementProperties>, IGeneralElementProperties, 
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

export const Panel: React.FC<IPanelProps> = (props: IPanelProps) =>
{
  const {
    fontBold, fontAccent, textEffect, textAlign, textColorHarmonious, textColor,
    icon, iconColor, iconStyle, iconPlacement = 'left', imageDatabase,
    backColor, backImage,
    borderRadius, borderStyle, borderWidth, borderColor,
    size = 'medium', paddingControl = 'normal', extraClass,
    backColorVariant = 'palest', shadowElevation, header, headerTypographyProps, 
    ...divProps } = props;

  const hasIcon = Boolean(icon);

  const panelClass = css(
    {
      ...ThemeHelper.getFontProps(size, fontBold, fontAccent),
      ...ThemeHelper.getTextEffectProps(size, textEffect, textAlign),
      ...ThemeHelper.getPaddingProps(size, paddingControl, 'normal', 'normal'),
      ...ThemeHelper.getBackgroundColorProps(backColor, backColorVariant, undefined),
      ...ThemeHelper.getForegroundColorByBackProps(backColor, backColorVariant, textColor, undefined, textColorHarmonious),
      ...ThemeHelper.getBorderRadiusProps(size, borderRadius),
      ...(hasBorderProps(props) ? ThemeHelper.getBorderStyleProps(size, borderStyle, borderWidth, borderColor) : {}),
      ...(hasBorderProps(props) ? ThemeHelper.getBorderColorProps(borderColor ?? backColor, backColorVariant, 3, undefined) : {}),
      ...(shadowElevation ? ThemeHelper.getBoxShadowProps(shadowElevation, backColor, undefined) : {})
    })

  if (header)
  {
    if (typeof header === 'string')
    {
      const variant = headerTypographyProps?.variant ?? TypographyHelper.getTypographyVariantByControlSize(size);
      const headerProps = CssPropertiesBuilder.buildHeader(props, variant);
      const headerClass = css(
        {
          ...headerProps,
          width: 'fit-content',
          position: 'relative',
          ...(hasIcon ? ThemeHelper.getFlexRowContainer(size, paddingControl) : {}),
          ...ThemeHelper.getBorderRadiusProps(size, borderRadius),
          ...(hasBorderProps(props) ? ThemeHelper.getBorderStyleProps(size, borderStyle, borderWidth, borderColor) : {}),
          ...(hasBorderProps(props) ? ThemeHelper.getBorderColorProps(borderColor ?? backColor, backColorVariant, 3, undefined) : {}),
          ...ThemeHelper.getBackgroundColorProps(backColor, backColorVariant, undefined)
        })

      return <div {...divProps} className={cx(panelClass, extraClass)}>
        <div className={headerClass}>
          {Boolean(icon) && RenderComponentHelper.renderIconAndValue(size, icon, undefined, iconStyle, iconColor, imageDatabase)}
          <Typography {...headerTypographyProps}
            variant={variant}
            textColor={headerTypographyProps?.textColor ?? ThemeHelper.getForegroundColorByBack(backColor, backColorVariant, textColor, undefined, textColorHarmonious)}>
            {header}
          </Typography>
        </div>
        {divProps.children}
      </div>;
    }
    else
    {
      return <div {...divProps} className={cx(panelClass, extraClass)}>{header}{divProps.children}</div>;
    }
  }
  else
  {
    return <div {...divProps} className={cx(panelClass, extraClass)}>{divProps.children}</div>;
  }
}