/* eslint-disable @typescript-eslint/no-explicit-any */
import type * as CSS from 'csstype';
import { IImageDatabase } from 'resources/image';
import { TThemeColor } from 'ui/theme/types';
import { TIconPlacement } from 'ui/types';

export type FunctionGeneralIconDelegate = (props: IGeneralIconProperties, context?: any) => any

/**
 * Общие свойства иконки для элемента UI
 */
export interface IGeneralIconProperties
{
  /**
   * Путь к изображению / либо компонент иконки / либо индекс изображения в базе 
   */
  icon?: any | FunctionGeneralIconDelegate;

  /**
   * Цвет иконки (влияет только на векторные)
   */
  iconColor?: TThemeColor;

  /**
   * Стиль для отображения иконки
   */
  iconStyle?: CSS.Properties;

  /**
   * Местоположение иконки
   */
  iconPlacement?: TIconPlacement;

  /**
   * База данных изображений
   */
  imageDatabase?: IImageDatabase;
}