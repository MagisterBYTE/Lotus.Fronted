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
export declare const FilterFunctionEnum: {
    /**
     * Равно аргументу
     */
    readonly Equals: {
        readonly id: 0;
        readonly type: "Equals";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Не равно аргументу
     */
    readonly NotEqual: {
        readonly id: 1;
        readonly type: "NotEqual";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Меньше аргумента
     */
    readonly LessThan: {
        readonly id: 2;
        readonly type: "LessThan";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Меньше или равно аргумента
     */
    readonly LessThanOrEqual: {
        readonly id: 3;
        readonly type: "LessThanOrEqual";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Больше аргумента
     */
    readonly GreaterThan: {
        readonly id: 4;
        readonly type: "GreaterThan";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Больше или равно аргумента
     */
    readonly GreaterThanOrEqual: {
        readonly id: 5;
        readonly type: "GreaterThanOrEqual";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Между первым аргументом (меньшим) и вторым аргументом (большим)
     */
    readonly Between: {
        readonly id: 6;
        readonly type: "Between";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
    * Аргумент (строка) может находиться в любом месте c учетом регистра
    */
    readonly Contains: {
        readonly id: 7;
        readonly type: "Contains";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
    * Аргумент(строка) может находиться в любом месте c учетом регистра
    */
    readonly StartsWith: {
        readonly id: 8;
        readonly type: "StartsWith";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Аргумент(строка) должна находится в конце c учетом регистра
     */
    readonly EndsWith: {
        readonly id: 9;
        readonly type: "EndsWith";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Не равно пустой строке. Аргумент пустая строка
     */
    readonly NotEmpty: {
        readonly id: 10;
        readonly type: "NotEmpty";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Любой из проверяемых элементов списка должен находиться в массиве аргумента
     */
    readonly IncludeAny: {
        readonly id: 11;
        readonly type: "IncludeAny";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Все из проверяемых элементов списка должен находиться в массиве аргумента
     */
    readonly IncludeAll: {
        readonly id: 12;
        readonly type: "IncludeAll";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Проверяемые элементы списка должен быть равны массиву аргумента
     */
    readonly IncludeEquals: {
        readonly id: 13;
        readonly type: "IncludeEquals";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Ни один из проверяемых элементов списка не должен находится в массиве аргумента
     */
    readonly IncludeNone: {
        readonly id: 14;
        readonly type: "IncludeNone";
        readonly abbr: string;
        readonly desc: string;
    };
};
/**
 * Тип функция для фильтрации данных
 */
export type TFilterFunction = keyof typeof FilterFunctionEnum;
