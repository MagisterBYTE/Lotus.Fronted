import React, { ComponentPropsWithRef, ReactNode } from 'react';
import { TColorType, TControlPadding, TControlSize, TControlState } from 'ui/types';
import { css, cx } from '@emotion/css';
import { ThemeHelper } from 'app/theme';
import { TChipVariant } from './ChipVariant';
import { ChipHelper } from './ChipHelper';

export interface IChipProps extends Omit<ComponentPropsWithRef<'span'>, 'children'>
{
  /**
   * Цвет
   */
  color?: TColorType;

  /**
   * Размер чипа
   */
  size?: TControlSize;

  /**
   * Вариант отображения
   */
  variant?: TChipVariant;

  /**
   * Внутренний отступ
   */
  paddingControl?: TControlPadding;

  /**
   * Надпись
   */
  label: ReactNode;
}

export const Chip: React.FC<IChipProps> = (
  { 
    color = 'secondary', 
    size = 'medium', 
    variant = TChipVariant.Filled, 
    paddingControl = 'normal',
    label,
    ...propsSpan
  }: IChipProps) => 
{
  const chipMain = css`
  ${ThemeHelper.getFontFamilyPropsAsText()}
  border-width: var(--lotus-border-width);
  border-style: var(--lotus-border-style);
  border-radius: 0.2rem;
  ${ChipHelper.getBorderColorProps(color, variant, 'normal')}
  ${ChipHelper.getColorProps(color, variant, 'normal')}
  ${ChipHelper.getBackgroundColorProps(color, variant, 'normal')}
  ${ChipHelper.getPaddingSidesProps(size, paddingControl)}
    &:hover {
      ${ChipHelper.getBorderColorProps(color, variant, 'hover')}
      ${ChipHelper.getBackgroundColorProps(color, variant, 'hover')}
      ${ChipHelper.getColorProps(color, variant, 'hover')}
    }
    &:active {
      ${ChipHelper.getBorderColorProps(color, variant, 'pressed')}
      ${ChipHelper.getBackgroundColorProps(color, variant, 'pressed')}
      ${ChipHelper.getColorProps(color, variant, 'pressed')}
    }
    &:disabled {
      ${ChipHelper.getBorderColorProps(color, variant, 'disabled')}
      ${ChipHelper.getBackgroundColorProps(color, variant, 'disabled')}
      ${ChipHelper.getColorProps(color, variant, 'disabled')}
      ${ThemeHelper.getOpacityPropsForDisabledAsText()}
    }
`;

  const chipClass = cx(chipMain);

  return <span {...propsSpan} className={chipClass}>{label}</span>;
};
