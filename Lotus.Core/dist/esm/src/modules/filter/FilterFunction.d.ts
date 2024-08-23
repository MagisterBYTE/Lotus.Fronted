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
 * Перечисление для типа функции для фильтрации данных
 */
export declare const FilterFunctionEnum: Record<string, IFilterFunctionDesc>;
/**
 * Тип функция для фильтрации данных
 */
export type TFilterFunction = keyof typeof FilterFunctionEnum;
