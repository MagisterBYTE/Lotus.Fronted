import { TControlPadding, TControlSize, TCssBorderRadius } from 'ui/types';
import { IGeneralBackgroundProperties } from './GeneralBackgroundProperties';
import { IGeneralBorderProperties } from './GeneralBorderProperties';
import { IGeneralTextProperties } from './GeneralTextProperties';

/**
 * Базовые свойства для элемента UI
 */
export interface IGeneralBaseElementProperties 
{
  /**
   * Скругление границы
   */
  borderRadius?: TCssBorderRadius;

  /**
   * Размер элемента
   */
  size?: TControlSize;
  
  /**
   * Внутренний отступ
   */
  paddingControl?: TControlPadding;

  /**
   * Дополнительный класс для отображения
   */
  extraClass?: string;
}

/**
 * Общие свойства для элемента UI
 */
export interface IGeneralElementProperties extends IGeneralBaseElementProperties, IGeneralBackgroundProperties,
  IGeneralBorderProperties, IGeneralTextProperties
{
}