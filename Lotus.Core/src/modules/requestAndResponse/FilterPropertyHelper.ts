import { TPropertyType } from 'modules/objectInfo/PropertyType';
import { TFilterFunction } from 'modules/filter';
import { BooleanHelper } from 'helpers/BooleanHelper';
import { DateHelper } from 'helpers/DateHelper';
import { StringHelper } from 'helpers/StringHelper';
import { ObjectHelper } from 'helpers';
import { IFilterObject, IFilterProperty } from './FilterProperty';

export class FilterPropertyHelper
{
  /**
   * Проверка на значение фильтра свойства
   * @param filterProperty Параметры фильтрации свойства
   */
  public static hasValue(filterProperty: IFilterProperty): boolean
  {
    if (!filterProperty.value && !filterProperty.values) return false;

    if (filterProperty.value && !filterProperty.values)
    {
      if (filterProperty.value === '')
      {
        return false;
      }
      return true;
    }

    if (!filterProperty.value && filterProperty.values)
    {
      if (filterProperty.values.length === 0)
      {
        return false;
      }
      return true;
    }

    return false;
  }

  /**
   * Проверка на значение фильтров свойств
   * @param filterProperty Список параметров фильтрации свойства
   */
  public static hasValues(filterProperties: IFilterObject): boolean
  {
    let findValue = false;
    filterProperties.forEach(x =>
    {
      if (findValue === false)
      {
        findValue = FilterPropertyHelper.hasValue(x);
      }
    });

    return findValue;
  }

  /**
   * Фильтрация массива по указанному фильтру свойства
   * @param massive Исходный массив
   * @param filterProperty Параметры фильтрации свойства
   * @returns Отфильтрованный массив
   */
  public static filterArrayByProperty<TItem = object>(massive: TItem[], filterProperty: IFilterProperty): TItem[]
  {
    if (FilterPropertyHelper.hasValue(filterProperty))
    {
      const propertyType: TPropertyType = filterProperty.propertyTypeDesc.type;
      const filterFunction: TFilterFunction = filterProperty.function.type;
      const key = StringHelper.lowercaseFirstLetter(filterProperty.propertyPath);

      switch (propertyType)
      {
        case 'Boolean':
          {
            switch (filterFunction)
            {
              case 'Equals': return massive.filter(x => BooleanHelper.parse((ObjectHelper.getValueByPropertyPath(x, key))) === BooleanHelper.parse(filterProperty.value));
              
              // eslint-disable-next-line max-len
              case 'NotEqual': return massive.filter(x => BooleanHelper.parse((ObjectHelper.getValueByPropertyPath(x, key))) !== BooleanHelper.parse(filterProperty.value));
            }
          } break;
        case 'Integer':
        case 'Double':
          {
            switch (filterFunction)
            {
              case 'Equals': return massive.filter(x => Number((ObjectHelper.getValueByPropertyPath(x, key))) === Number(filterProperty.value));
              case 'NotEqual': return massive.filter(x => Number((ObjectHelper.getValueByPropertyPath(x, key))) !== Number(filterProperty.value));
              case 'LessThan': return massive.filter(x => Number((ObjectHelper.getValueByPropertyPath(x, key))) < Number(filterProperty.value));
              case 'LessThanOrEqual': return massive.filter(x => Number((ObjectHelper.getValueByPropertyPath(x, key))) <= Number(filterProperty.value));
              case 'GreaterThan': return massive.filter(x => Number((ObjectHelper.getValueByPropertyPath(x, key))) > Number(filterProperty.value));
              case 'GreaterThanOrEqual': return massive.filter(x => Number((ObjectHelper.getValueByPropertyPath(x, key))) >= Number(filterProperty.value));
              case 'Between': return massive.filter(x => 
              {
                const check = Number((ObjectHelper.getValueByPropertyPath(x, key)))
                const left = Number(filterProperty.values![0])
                const right = Number(filterProperty.values![1])
                return (check > left) && (check < right);
              });
            }
          } break;
        case 'String':
        case 'Guid':
          {
            switch (filterFunction)
            {
              case 'Equals': return massive.filter(x => String((ObjectHelper.getValueByPropertyPath(x, key))) === filterProperty.value);
              case 'NotEqual': return massive.filter(x => String((ObjectHelper.getValueByPropertyPath(x, key))) !== filterProperty.value);
              case 'Contains': return massive.filter(x => (String((ObjectHelper.getValueByPropertyPath(x, key)))).includes(filterProperty.value!));
              case 'StartsWith': return massive.filter(x => (String((ObjectHelper.getValueByPropertyPath(x, key)))).startsWith(filterProperty.value!));
              case 'EndsWith': return massive.filter(x => (String((ObjectHelper.getValueByPropertyPath(x, key)))).endsWith(filterProperty.value!));
              case 'NotEmpty': return massive.filter(x => StringHelper.isNullOrEmpty(String((ObjectHelper.getValueByPropertyPath(x, key)))) === false);
              case 'LessThan': return massive.filter(x => String((ObjectHelper.getValueByPropertyPath(x, key))).localeCompare(filterProperty.value!) < 0);
              case 'LessThanOrEqual': return massive.filter(x => String((ObjectHelper.getValueByPropertyPath(x, key))).localeCompare(filterProperty.value!) <= 0);
              case 'GreaterThan': return massive.filter(x => String((ObjectHelper.getValueByPropertyPath(x, key))).localeCompare(filterProperty.value!) > 0);
              case 'GreaterThanOrEqual': return massive.filter(x => String((ObjectHelper.getValueByPropertyPath(x, key))).localeCompare(filterProperty.value!) >= 0);
            }
          } break;
        case 'DateTime':
          {
            switch (filterFunction)
            {
              case 'Equals': return massive.filter(x => DateHelper.parse((ObjectHelper.getValueByPropertyPath(x, key))) === DateHelper.parse(filterProperty.value!));
              case 'NotEqual': return massive.filter(x => DateHelper.parse((ObjectHelper.getValueByPropertyPath(x, key))) !== DateHelper.parse(filterProperty.value!));
              case 'LessThan': return massive.filter(x => DateHelper.parse((ObjectHelper.getValueByPropertyPath(x, key))) < DateHelper.parse(filterProperty.value!));
              // eslint-disable-next-line max-len
              case 'LessThanOrEqual': return massive.filter(x => DateHelper.parse((ObjectHelper.getValueByPropertyPath(x, key))) <= DateHelper.parse(filterProperty.value!));
              case 'GreaterThan': return massive.filter(x => DateHelper.parse((ObjectHelper.getValueByPropertyPath(x, key))) > DateHelper.parse(filterProperty.value!));
              case 'GreaterThanOrEqual':
                return massive.filter(x => DateHelper.parse((ObjectHelper.getValueByPropertyPath(x, key))) >= DateHelper.parse(filterProperty.value!));
            }
          } break;
      }
    }

    return massive;
  }

  /**
   * Фильтрация массива по указанному массиву фильтров свойств
   * @param massive Исходный массив
   * @param filterProperties Массив фильтров свойств
   * @returns Отфильтрованный массив
   */
  public static filterArrayByProperties<TItem = object>(massive: TItem[], filterProperties?: IFilterObject): TItem[]
  {
    if(!filterProperties) return massive;

    let result: TItem[] = [...massive];

    for (const filterProperty of filterProperties) 
    {
      result = FilterPropertyHelper.filterArrayByProperty(result, filterProperty);
    }

    return result;
  }
}