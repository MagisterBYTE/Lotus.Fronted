import { localizationCore } from 'localization';

/**
 * Описание функции фильтрации
 */
export interface IFilterFunctionDesc
{
  id: number,
  type: TFilterFunction,
  abbr: string,
  desc: string
}

/**
 * Перечисление для типа функции для фильтрации данных
 */
export const FilterFunctionEnum =
  {
    /**
     * Равно аргументу
     */
    Equals:
    {
      id: 0,
      type: 'Equals',
      abbr: localizationCore.filters.equalsAbbr,
      desc: localizationCore.filters.equals
    },

    /**
     * Не равно аргументу
     */
    NotEqual:
    {
      id: 1,
      type: 'NotEqual',
      abbr: localizationCore.filters.notEqualAbbr,
      desc: localizationCore.filters.notEqual
    },

    /**
     * Меньше аргумента
     */
    LessThan:
    {
      id: 2,
      type: 'LessThan',
      abbr: localizationCore.filters.lessThanAbbr,
      desc: localizationCore.filters.lessThan
    },

    /**
     * Меньше или равно аргумента
     */
    LessThanOrEqual:
    {
      id: 3,
      type: 'LessThanOrEqual',
      abbr: localizationCore.filters.lessThanOrEqualAbbr,
      desc: localizationCore.filters.lessThanOrEqual
    },

    /**
     * Больше аргумента
     */
    GreaterThan:
    {
      id: 4,
      type: 'GreaterThan',
      abbr: localizationCore.filters.greaterThanAbbr,
      desc: localizationCore.filters.greaterThan
    },

    /**
     * Больше или равно аргумента
     */
    GreaterThanOrEqual:
    {
      id: 5,
      type: 'GreaterThanOrEqual',
      abbr: localizationCore.filters.greaterThanOrEqualAbbr,
      desc: localizationCore.filters.greaterThanOrEqual
    },

    /**
     * Между первым аргументом (меньшим) и вторым аргументом (большим)
     */
    Between:
    {
      id: 6,
      type: 'Between',
      abbr: localizationCore.filters.betweenAbbr,
      desc: localizationCore.filters.between
    },

    /**
    * Аргумент (строка) может находиться в любом месте c учетом регистра
    */
    Contains:
    {
      id: 7,
      type: 'Contains',
      abbr: localizationCore.filters.contains,
      desc: localizationCore.filters.contains
    },

    /**
    * Аргумент(строка) может находиться в любом месте c учетом регистра
    */
    StartsWith:
    {
      id: 8,
      type: 'StartsWith',
      abbr: localizationCore.filters.startsWith,
      desc: localizationCore.filters.startsWith
    },

    /**
     * Аргумент(строка) должна находится в конце c учетом регистра
     */
    EndsWith:
    {
      id: 9,
      type: 'EndsWith',
      abbr: localizationCore.filters.endsWith,
      desc: localizationCore.filters.endsWith
    },

    /**
     * Не равно пустой строке. Аргумент пустая строка
     */
    NotEmpty:
    {
      id: 10,
      type: 'NotEmpty',
      abbr: localizationCore.filters.notEmpty,
      desc: localizationCore.filters.notEmpty
    },

    /**
     * Любой из проверяемых элементов списка должен находиться в массиве аргумента
     */
    IncludeAny:
    {
      id: 11,
      type: 'IncludeAny',
      abbr: localizationCore.filters.includeAny,
      desc: localizationCore.filters.includeAny
    },

    /**
     * Все из проверяемых элементов списка должен находиться в массиве аргумента
     */
    IncludeAll:
    {
      id: 12,
      type: 'IncludeAll',
      abbr: localizationCore.filters.includeAll,
      desc: localizationCore.filters.includeAll
    },

    /**
     * Проверяемые элементы списка должен быть равны массиву аргумента
     */
    IncludeEquals:
    {
      id: 13,
      type: 'IncludeEquals',
      abbr: localizationCore.filters.includeEquals,
      desc: localizationCore.filters.includeEquals
    },

    /**
     * Ни один из проверяемых элементов списка не должен находится в массиве аргумента
     */
    IncludeNone:
    {
      id: 14,
      type: 'IncludeNone',
      abbr: localizationCore.filters.includeNone,
      desc: localizationCore.filters.includeNone
    }
  } as const;

/**
 * Тип функция для фильтрации данных
 */
export type TFilterFunction = keyof typeof FilterFunctionEnum;