import { IPropertyTypeDesc } from 'modules/objectInfo';
import { IFilterFunctionDesc } from 'modules/filter';

/**
 * Интерфейс для фильтрации по одному свойству
 */
export interface IFilterProperty
{
  /**
   * Имя/путь свойства/поля по которому осуществляется фильтрация.
   * Для доступа к вложенным свойствам в качестве разделителя используется точка
   */
  propertyPath: string;

  /**
   * Функция для фильтрации
   */
  function: IFilterFunctionDesc;

  /**
   * Описание типа свойства
   */
  propertyTypeDesc: IPropertyTypeDesc;

  /**
   * Статус типа свойства - массив
   */
  isArray?: boolean;

  /**
  * Учитывать регистр при фильтрации строк
  */
  isSensitiveCase?: boolean;

  /**
   * Статус типа свойства Nullable.
   */
  isNullable?: boolean;

  /**
   * Значение
   */
  value?: string;

  /**
   * Массив значений
   */
  values?: string[];
}

/**
 * Тип для фильтрации объектов
 */
export type IFilterObject = IFilterProperty[];