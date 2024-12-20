import { FilterFunctionDescriptors, IFilterFunctionDesc } from './FilterFunction';

/**
 * Группа функций фильтрации для числовых типов
 */
export const GroupFilterFunctionsNumber: readonly IFilterFunctionDesc[] =
  [
    FilterFunctionDescriptors.Equals,
    FilterFunctionDescriptors.NotEqual,
    FilterFunctionDescriptors.LessThan,
    FilterFunctionDescriptors.LessThanOrEqual,
    FilterFunctionDescriptors.GreaterThan,
    FilterFunctionDescriptors.GreaterThanOrEqual,
    FilterFunctionDescriptors.Between
  ];

/**
 * Группа функций фильтрации для строк
 */
export const GroupFilterFunctionsString: readonly IFilterFunctionDesc[] =
  [
    FilterFunctionDescriptors.Equals,
    FilterFunctionDescriptors.Contains,
    FilterFunctionDescriptors.StartsWith,
    FilterFunctionDescriptors.EndsWith,
    FilterFunctionDescriptors.NotEqual,
    FilterFunctionDescriptors.NotEmpty
  ];

/**
 * Группа функций фильтрации для перечисления
 */
export const GroupFilterFunctionsEnum: readonly IFilterFunctionDesc[] =
  [
    FilterFunctionDescriptors.Equals,
    FilterFunctionDescriptors.NotEqual
  ];

/**
 * Группа функций фильтрации для массива
 */
export const GroupFilterFunctionsArray: readonly IFilterFunctionDesc[] =
  [
    FilterFunctionDescriptors.IncludeAll,
    FilterFunctionDescriptors.IncludeAny,
    FilterFunctionDescriptors.IncludeEquals,
    FilterFunctionDescriptors.IncludeNone
  ];
