/* eslint-disable @typescript-eslint/no-explicit-any */
import { IImageDatabase } from 'lotus-core';
import { CSSProperties, ReactNode } from 'react';
import { TColorPresentation, TIconPlacement } from 'ui/types';

export type FunctionGeneralIconDelegate = (props:IGeneralIconProperties, context?: any) => ReactNode

/**
 * Общие свойства иконки для элемента UI
 */
export interface IGeneralIconProperties
{
  /**
   * Путь к изображению / либо компонент иконки / либо индекс изображения в базе 
   */
  icon?: ReactNode | FunctionGeneralIconDelegate;

  /**
   * Цвет иконки (влияет только на векторные)
   */
  iconColor?: TColorPresentation;

  /**
   * Стиль для отображения иконки
   */
  iconStyle?:CSSProperties;

  /**
   * Местоположение иконки
   */
  iconPlacement?:TIconPlacement;

  /**
   * База данных изображений
   */
  imageDatabase?:IImageDatabase;
}