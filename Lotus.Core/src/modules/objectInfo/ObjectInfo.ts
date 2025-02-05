import { IFilterFunctionDesc } from 'modules/filter/FilterFunction';
import { IPropertyDescriptor } from './PropertyDescriptor';

/**
 * Интерфейс для представления(описания) свойств объектов
 */
export interface IObjectInfo
{
  /**
   * Получение списка свойств
   */
  getProperties(): IPropertyDescriptor[];

  /**
   * Получение списка свойств поддерживающих сортировку
   */
  getPropertiesSorted(): IPropertyDescriptor[];

  /**
   * Получение свойства по имени
   * @param name Имя свойства 
   */
  getPropertyByName(name: string): IPropertyDescriptor;

  /**
   * Получение списка функций фильтрации для свойств
   */
  getFilterFunctionsDesc(): Record<string, IFilterFunctionDesc>
}

/**
 * Класс для представления(описания) свойств объектов
 */
export class ObjectInfo implements IObjectInfo
{
  public descriptors: IPropertyDescriptor[] = [];

  constructor() 
  {
    this.getProperties = this.getProperties.bind(this);
    this.getPropertiesSorted = this.getPropertiesSorted.bind(this);
    this.getPropertyByName = this.getPropertyByName.bind(this);
    this.getFilterFunctionsDesc = this.getFilterFunctionsDesc.bind(this);
  }

  public getProperties(): IPropertyDescriptor[] 
  {
    return this.descriptors;
  }

  public getPropertiesSorted(): IPropertyDescriptor[]
  {
    return this.descriptors.filter(x => (x.sorting && x.sorting.enabled));
  }

  public getPropertyByName(name: string): IPropertyDescriptor
  {
    return this.descriptors.find(x => x.fieldName === name)!;
  }

  public getFilterFunctionsDesc(): Record<string, IFilterFunctionDesc>
  {
    const filterFunctions: Record<string, IFilterFunctionDesc> = {};

    this.descriptors.forEach((x) => 
    {
      if (x.filtering && x.filtering.enabled)
      {
        filterFunctions[`${x.fieldName}`] = x.filtering.functionDefaultDesc;
      }
    })

    return filterFunctions;
  }
}