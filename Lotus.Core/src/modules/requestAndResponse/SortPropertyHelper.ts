import { TPropertyType } from 'modules/objectInfo/PropertyType';
import { BooleanHelper } from 'helpers/BooleanHelper';
import { NumberHelper } from 'helpers/NumberHelper';
import { DateHelper } from 'helpers/DateHelper';
import { ISortObject, ISortProperty } from './SortProperty';

export class SortPropertyHelper
{
  /**
   * Сортировка массива по указанному свойству сортировки
   * @param massive Исходный массив
   * @param sortProperty Параметры сортировки свойства
   * @returns Отсортированный массив
   */
  public static sortArrayByProperty<TItem = object>(massive: TItem[], sortProperty: ISortProperty): TItem[]
  {
    const propertyType: TPropertyType = sortProperty.propertyTypeDesc!.type;
    const result: TItem[] = [...massive]

    switch (propertyType)
    {
      case 'Boolean':
        {
          return result.sort((a, b) =>
          {
            const l: boolean = BooleanHelper.parse(a);
            const r: boolean = BooleanHelper.parse(b);
            return BooleanHelper.compare(l, r, sortProperty.isDesc);
          });
        } break;
      case 'Integer':
      case 'Float':
        {
          return result.sort((a, b) =>
          {
            const l: number = Number(a);
            const r: number = Number(b);
            return NumberHelper.compare(l, r, sortProperty.isDesc);
          });
        } break;
      case 'String':
      case 'Guid':
        {
          return result.sort((a, b) =>
          {
            const l: string = String(a);
            const r: string = String(b);
            return l.localeCompare(r);
          });
        } break;
      case 'Enum': return result;
      case 'DateTime':
        {
          return result.sort((a, b) =>
          {
            const l: Date = DateHelper.parse(a);
            const r: Date = DateHelper.parse(b);
            return DateHelper.compare(l, r, sortProperty.isDesc);
          });
        } break;
      case 'Object':
    }

    return massive;
  }

  /**
   * Сортировка массива по указанному массиву свойств сортировки
   * @param massive Исходный массив
   * @param sortProperties Массив свойств сортировки
   * @returns Отсортированный массив
   */
  public static sortArrayByProperties<TItem = object>(massive: TItem[], sortProperties: ISortObject): TItem[]
  {
    let result: TItem[] = [...massive];

    for (const sortProperty of sortProperties) 
    {
      result = SortPropertyHelper.sortArrayByProperty(result, sortProperty);
    }

    return result;
  }
}