import { css, cx } from '@emotion/css';
import { ObjectHelper } from 'lotus-core';
import React, { ReactNode } from 'react';
import { TControlSize, TCssWidth } from 'ui/types';
import { ITypographyProps, Typography } from '../Typography';
import './Label.css';

export interface ILabelProps extends ITypographyProps 
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
}

export const Label: React.FC<ILabelProps> = (props: ILabelProps) => 
{
  const { size, label, isTopLabel, labelWidth, containerWidth = '100%', ...propsTypography } = props;

  if (label)
  {
    const containerClass = css(
      {
        width: containerWidth,
      }
    );
  
    const labelClass = css(
      {
        display: 'flex',
        flexDirection:'row', 
        justifyContent: propsTypography.textAlign,
        flexGrow: 1,
        width: labelWidth
      }
    );
  
    const valueClass = css(
      {
        flexGrow: 0,
        width: ObjectHelper.getIf(isTopLabel, labelWidth, ObjectHelper.getIf(labelWidth, `calc(${containerWidth} - ${labelWidth})`, undefined))
      }
    );

    if (isTopLabel)
    {
      return (
        <div className={cx('lotus-label-container-v', `lotus-label-gap-v-${size}`, ObjectHelper.getIf(containerWidth, containerClass, ''))}>
          <div className={labelClass}>
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