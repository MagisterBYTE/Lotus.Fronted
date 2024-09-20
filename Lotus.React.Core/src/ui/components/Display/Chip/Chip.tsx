import { css } from '@emotion/css';
import { ThemeHelper } from 'ui/theme';
import React, { ComponentPropsWithoutRef, ReactNode } from 'react';
import { IGeneralPropertiesElement } from 'ui/components/GeneralPropertiesElements';
import { IconContext } from 'react-icons';
import { ObjectHelper } from 'lotus-core';
import { ChipHelper } from './ChipHelper';
import { TChipVariant } from './ChipVariant';

export interface IChipProps extends Omit<ComponentPropsWithoutRef<'span'>, 'children'|'color'>, IGeneralPropertiesElement
{
  /**
   * Вариант отображения
   */
  variant?: TChipVariant;

  /**
   * Надпись
   */
  label: ReactNode;

  /**
   * Статус доступности
   */
  // eslint-disable-next-line react/boolean-prop-naming
  disabled?: boolean;

  /**
   * Статус иконки в label
   */
  hasIcon?: boolean;
}

export const Chip: React.FC<IChipProps> = (props: IChipProps) => 
{
  const { borderRounded: hasRadius, color = 'primary', size = 'medium', paddingControl = 'normal', variant = 'filled', 
    label, disabled, hasIcon, ...propsSpan } = props
  
  const chipClass = css(
    {
      ...ThemeHelper.getFontProps(size),
      ...ThemeHelper.getBorderProps(undefined, undefined, hasRadius, size),
      ...ThemeHelper.getPaddingProps(size, paddingControl, 'half', 'half'),
      lineHeight: ObjectHelper.getIf<string|number>(hasIcon, 0, 'normal'),
      borderColor: ChipHelper.getBorderColorProps(color, variant, 'normal'),
      backgroundColor: ChipHelper.getBackgroundColorProps(color, variant, 'normal'),
      color: ChipHelper.getColorProps(color, variant, 'normal'),
      userSelect: ObjectHelper.getIf(hasIcon, 'none', undefined),
      ...(ObjectHelper.getIf(disabled, ThemeHelper.getOpacityForDisabledProps(true), {})),
      '&:hover':
      {
        borderColor: ChipHelper.getBorderColorProps(color, variant, 'hover'),
        backgroundColor: ChipHelper.getBackgroundColorProps(color, variant, 'hover'),
        color: ChipHelper.getColorProps(color, variant, 'hover')
      },
      '&:active':
      {
        borderColor: ChipHelper.getBorderColorProps(color, variant, 'pressed'),
        backgroundColor: ChipHelper.getBackgroundColorProps(color, variant, 'pressed'),
        color: ChipHelper.getColorProps(color, variant, 'pressed')
      },
      '&:disabled':
      {
        borderColor: ChipHelper.getBorderColorProps(color, variant, 'disabled'),
        backgroundColor: ChipHelper.getBackgroundColorProps(color, variant, 'disabled'),
        color: ChipHelper.getColorProps(color, variant, 'disabled'),
        ...ThemeHelper.getOpacityForDisabledProps()
      }
    });

  if(hasIcon)
  {
    if(typeof label == 'string')
    {
      const sizeIcon = `${ThemeHelper.convertControlSizeToIconSizeInPixel(size)}px`;
      return <div {...propsSpan} className={chipClass}>
        <img src={label} width={sizeIcon} height={sizeIcon} />
      </div>
    }
    else
    {
      const sizeIcon = `${ThemeHelper.convertControlSizeToIconSizeInRem(size)}rem`;
      return <div {...propsSpan} className={chipClass}>
        <IconContext.Provider value={{ size: sizeIcon }}>
          {label}
        </IconContext.Provider>
      </div>;
    }
  }
  else
  {
    return <span {...propsSpan} className={chipClass}>{label}</span>;
  }
};
