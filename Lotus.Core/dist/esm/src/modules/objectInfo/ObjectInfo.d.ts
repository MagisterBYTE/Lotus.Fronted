import { IFilterFunctionDesc } from 'modules/filter/FilterFunction';
import { IPropertyDescriptor } from './PropertyDescriptor';
/**
 * Интерфейс для представления(описания) свойств объектов
 */
export interface IObjectInfo {
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
    getFilterFunctionsDesc(): Record<string, IFilterFunctionDesc>;
}
/**
 * Класс для представления(описания) свойств объектов
 */
export declare class ObjectInfo implements IObjectInfo {
    descriptors: IPropertyDescriptor[];
    constructor();
    getProperties(): IPropertyDescriptor[];
    getPropertiesSorted(): IPropertyDescriptor[];
    getPropertyByName(name: string): IPropertyDescriptor;
    getFilterFunctionsDesc(): Record<string, IFilterFunctionDesc>;
}
