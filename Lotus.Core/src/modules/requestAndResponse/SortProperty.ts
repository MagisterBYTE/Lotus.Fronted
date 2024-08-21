import { IPropertyTypeDesc } from 'modules/objectInfo';

/**
 * Интерфейс для сортировки по одному свойству
 */
export interface ISortProperty
{
  /**
   * Имя свойства по которому осуществляется сортировки
   */
  propertyName: string;

  /**
   * Описание типа свойства. Обязательно только при сортировке на фронте
   */
  propertyTypeDesc?: IPropertyTypeDesc;

  /**
   * Статус сортировки по убыванию
   */
  isDesc?: boolean;
}

/**
 * Тип для сортировки объектов
 */
export type ISortObject = ISortProperty[];
