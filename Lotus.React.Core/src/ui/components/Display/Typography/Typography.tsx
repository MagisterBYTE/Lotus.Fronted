import { css, cx } from '@emotion/css';
import React, { ComponentPropsWithoutRef } from 'react';
import { IGeneralTextProperties } from 'ui/components/GeneralTextProperties';
import { Theme, TThemeColorVariant } from 'ui/theme';
import { TypographyHelper } from './TypographyHelper';
import { TTypographyVariant } from './TypographyVariant';
import './Typography.css';

export interface ITypographyProps extends Omit<ComponentPropsWithoutRef<'p'>, 'color'>, Omit<IGeneralTextProperties, 'textColorHarmonious'>
{
  /**
   * Вариант цвета
   */
  textColorVariant?: TThemeColorVariant;

  /**
   * Вариант отображения
   */
  variant?: TTypographyVariant;

  /**
   * Дополнительный класс для отображения
   */
  extraClass?: string;
}

export const Typography: React.FC<ITypographyProps> = (props: ITypographyProps) => 
{
  const 
    { 
      fontBold, fontAccent, textEffect, textAlign, textColor,
      textColorVariant, variant = 'body1', extraClass, ...propsElem 
    } = props;
  
  const size = TypographyHelper.convertTypographyVariantToControlSize(variant);

  const typographyMain = css(
    {
      ...Theme.getForegroundColorProps(textColor, textColorVariant, undefined, undefined, undefined),
      ...Theme.getTextEffectProps(size, textEffect, textAlign)
    }
  )
  
  const typographyClass = cx(typographyMain, 
    `lotus-typography-${variant}`,
    (fontBold) ? 'lotus-typography-font-weight-bold' : 'lotus-typography-font-weight-normal',
    (fontAccent) ? 'lotus-typography-font-family-accent' : 'lotus-typography-font-family-default',
    extraClass);

  switch (variant)
  {
    case 'h3': return <h3 {...propsElem} className={typographyClass}>{propsElem.children}</h3>;
    case 'h4': return <h4 {...propsElem} className={typographyClass}>{propsElem.children}</h4>;
    case 'h5': return <h5 {...propsElem} className={typographyClass}>{propsElem.children}</h5>;
    case 'h6': return <h6 {...propsElem} className={typographyClass}>{propsElem.children}</h6>;
    case 'large': return <span {...propsElem} className={typographyClass}>{propsElem.children}</span>;
    case 'medium': return <span {...propsElem} className={typographyClass}>{propsElem.children}</span>;
    case 'small': return <span {...propsElem} className={typographyClass}>{propsElem.children}</span>;
    case 'smaller': return <span {...propsElem} className={typographyClass}>{propsElem.children}</span>;
    case 'body1': return <p {...propsElem} className={typographyClass}>{propsElem.children}</p>;
    case 'body2': return <p {...propsElem} className={typographyClass}>{propsElem.children}</p>;
  }

  return <></>;
};
