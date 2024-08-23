import { IFilterObject, IFilterProperty } from './FilterProperty';
export declare class FilterPropertyHelper {
    /**
     * Проверка на значение фильтра свойства
     * @param filterProperty Параметры фильтрации свойства
     */
    static hasValue(filterProperty: IFilterProperty): boolean;
    /**
     * Проверка на значение фильтров свойств
     * @param filterProperty Список параметров фильтрации свойства
     */
    static hasValues(filterProperties: IFilterObject): boolean;
    /**
     * Фильтрация массива по указанному фильтру свойства
     * @param massive Исходный массив
     * @param filterProperty Параметры фильтрации свойства
     * @returns Отфильтрованный массив
     */
    static filterArrayByProperty<TItem = object>(massive: TItem[], filterProperty: IFilterProperty): TItem[];
    /**
     * Фильтрация массива по указанному массиву фильтров свойств
     * @param massive Исходный массив
     * @param filterProperties Массив фильтров свойств
     * @returns Отфильтрованный массив
     */
    static filterArrayByProperties<TItem = object>(massive: TItem[], filterProperties?: IFilterObject): TItem[];
}
