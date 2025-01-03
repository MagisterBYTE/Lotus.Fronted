import { css, cx } from '@emotion/css';
import { ObjectHelper } from 'lotus-core';
import React, { CSSProperties, ReactNode } from 'react';
import { IGeneralIconProperties } from 'ui/components';
import { RenderComponentHelper } from 'ui/helpers';
import { Theme } from 'ui/theme';
import { TControlSize, TCssWidth } from 'ui/types';
import { ITypographyProps, Typography } from '../Typography';
import './Label.css';

export interface ILabelProps extends ITypographyProps, IGeneralIconProperties
{
  /**
   * Размер элемента
   */
  size?: TControlSize;

  /**
   * Параметры надписи
   */
  label?: ReactNode;

  /**
   * Размещать надпись сверху
   */
  isTopLabel?: boolean;

  /**
   * Ширина надписи
   */
  labelWidth?: TCssWidth;

  /**
   * Ширина контейнера
   */
  containerWidth?: TCssWidth;

  /**
   * Дополнительные настройки по отображению контента
   */
  valueStyle?: CSSProperties;
}

export const Label: React.FC<ILabelProps> = (props: ILabelProps) => 
{
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    icon, iconColor, iconStyle,
    size = 'medium', label, isTopLabel, labelWidth, containerWidth = '100%', valueStyle, ...propsTypography } = props;

  if (label)
  {
    const containerClass = css(
      {
        width: containerWidth
      }
    );

    const labelClass = css(
      {
        justifyContent: propsTypography.textAlign,
        flexGrow: 1,
        width: labelWidth,
        ...(icon ? Theme.getFlexRowContainer(size, 'normal') : {})
      }
    );

    const valueClass = css(
      {
        flexGrow: 0,
        width: ObjectHelper.getIf(isTopLabel, labelWidth, ObjectHelper.getIf(labelWidth, `calc(${containerWidth} - ${labelWidth})`, undefined)),
        ...valueStyle
      }
    );

    if (isTopLabel)
    {
      return (
        <div className={cx('lotus-label-container-v', `lotus-label-gap-v-${size}`, ObjectHelper.getIf(containerWidth, containerClass, ''))}>
          <div className={labelClass}>
            {Boolean(icon) && RenderComponentHelper.renderIconProps(size, props)}
            <Typography {...propsTypography}>
              {label}
            </Typography>
          </div>
          <div className={valueClass}>
            {props.children}
          </div>
        </div>
      )
    }
    else
    {
      return (<div className={cx('lotus-label-container-h', `lotus-label-gap-h-${size}`, ObjectHelper.getIf(containerWidth, containerClass, ''))}>
        <div className={labelClass}>
          {Boolean(icon) && RenderComponentHelper.renderIconProps(size, props)}
          <Typography {...propsTypography}>
            {label}
          </Typography>
        </div>
        <div className={valueClass}>
          {props.children}
        </div>
      </div>)
    }
  }
  else
  {
    return props.children
  }
}