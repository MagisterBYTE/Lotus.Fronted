import { cx } from '@emotion/css';
import React, { ComponentPropsWithRef } from 'react';
import { TColorType } from 'ui/types';
import { TTypographyEffect } from './TypographyEffect';
import { TTypographyVariant } from './TypographyVariant';
import './Typography.css';

export interface ITypographyProps extends ComponentPropsWithRef<'p'>
{
  /**
   * Цвет
   */
  color?: TColorType;

  /**
   * Вариант отображения
   */
  variant?: TTypographyVariant;

  /**
   * Толстый шрифт
   */
  // eslint-disable-next-line react/boolean-prop-naming
  bold?: boolean;

  /**
   * Эффект отображения
   */
  effect?: TTypographyEffect;
}

export const Typography: React.FC<ITypographyProps> = ({ color, variant = 'body1', bold, effect, ...propsElem }: ITypographyProps) => 
{
  const typographyClass = cx(`lotus-typography-${variant}`, 
    color && `lotus-foreground-${color}`, 
    (bold === undefined || bold == false) ? 'lotus-typography-font-normal' : 'lotus-typography-font-bold',
    effect && `lotus-typography-effect-${effect}`);

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
