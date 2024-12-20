import { IPropertyTypeDesc } from 'modules/objectInfo';

/**
 * Интерфейс для сортировки по одному свойству
 */
export interface ISortProperty
{
  /**
   * Путь/имя свойства/поля по которому идет сортировка.
   * Для доступа к вложенным свойствам в качестве разделителя используется точка
   */
  propertyPath: string;

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
