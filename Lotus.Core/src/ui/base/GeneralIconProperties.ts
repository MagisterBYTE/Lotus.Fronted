/* eslint-disable @typescript-eslint/no-explicit-any */
import { IImageDatabase } from 'resources/image';
import { TThemeColorVariant } from 'ui/theme/types';
import { TCssProperties, TIconPlacement } from 'ui/types';

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
  iconColor?: TThemeColorVariant;

  /**
   * Стиль для отображения иконки
   */
  iconStyle?: TCssProperties;

  /**
   * Местоположение иконки
   */
  iconPlacement?: TIconPlacement;

  /**
   * База данных изображений
   */
  imageDatabase?: IImageDatabase;
}