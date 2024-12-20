/**
 * Описание функции фильтрации
 */
export interface IFilterFunctionDesc {
    id: number;
    type: TFilterFunction;
    abbr: string;
    desc: string;
}
/**
 * Тип функция для фильтрации данных
 */
export type TFilterFunction = 'Equals' | 'NotEqual' | 'LessThan' | 'LessThanOrEqual' | 'GreaterThan' | 'GreaterThanOrEqual' | 'Between' | 'Contains' | 'StartsWith' | 'EndsWith' | 'Like' | 'NotEmpty' | 'Empty' | 'IncludeAny' | 'IncludeAll' | 'IncludeEquals' | 'IncludeNone';
/**
 * Перечисление для типа функции для фильтрации данных
 */
export declare const FilterFunctionDescriptors: Record<TFilterFunction, IFilterFunctionDesc>;
