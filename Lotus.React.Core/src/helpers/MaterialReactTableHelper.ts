import
{
  FilterFunctionDescriptors, IFilterFunctionDesc, IFilterObject, IFilterProperty, IObjectInfo,
  IPropertyDescriptor, PropertyTypeDescriptors, StringHelper
} from 'lotus-core';
import { MRT_ColumnDef, MRT_ColumnFiltersState, MRT_FilterOption } from 'material-react-table';

export class MaterialReactTableHelper
{
  public static getDefaultFilterFunction(property: IPropertyDescriptor): MRT_FilterOption
  {
    switch (property.propertyTypeDesc)
    {
      case PropertyTypeDescriptors.String: return 'contains';
      case PropertyTypeDescriptors.Enum: return 'arrIncludesSome';
    }

    return 'equals';
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static convertPropertyDescriptorToColumn<TItem extends Record<string, any>>(property: IPropertyDescriptor): MRT_ColumnDef<TItem>
  {
    const column: MRT_ColumnDef<TItem> =
    {
      accessorKey: property.fieldName,
      header: property.name,

      // Фильтрация
      enableColumnFilter: (property.filtering && property.filtering.enabled) ?? false,
      filterVariant: property.filtering && property.filtering.variant,
      filterFn: MaterialReactTableHelper.getDefaultFilterFunction(property),
      filterSelectOptions: property.options,

      // Сортировка
      enableSorting: (property.sorting && property.sorting.enabled) ?? false,

      // Редактирование
      enableEditing: (property.editing && property.editing.enabled) ?? false
    }

    return column;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static convertObjectInfoToColumns<TItem extends Record<string, any>>(objectInfo: IObjectInfo): MRT_ColumnDef<TItem>[]
  {
    const properties = objectInfo.getProperties();

    const columns = properties.map((x) =>
    {
      const column = MaterialReactTableHelper.convertPropertyDescriptorToColumn<TItem>(x);
      return column;
    });

    return columns;
  }

  public static convertColumnsFilterToFilterObjects(objectInfo: IObjectInfo, columnFilters: MRT_ColumnFiltersState,
    columnFiltersFns: Record<string, MRT_FilterOption> | undefined): IFilterObject
  {
    const properties = objectInfo.getProperties();

    const filteringAll: IFilterObject = columnFilters.map((column) => 
    {
      const filter: IFilterProperty =
      {
        propertyName: '',
        propertyTypeDesc: PropertyTypeDescriptors.Boolean,
        function: FilterFunctionDescriptors.Equals,
        value: ''
      };

      const property = properties.find((x) => x.fieldName === column.id)

      if (property?.filtering && property?.filtering.enabled && columnFiltersFns) 
      {
        const filterFn = columnFiltersFns[column.id];

        filter.propertyName = StringHelper.capitalizeFirstLetter(column.id);
        filter.propertyTypeDesc = property.propertyTypeDesc!;
        filter.function = MaterialReactTableHelper.convertToFilterFunctionDesc(filterFn);

        if (filter.function === FilterFunctionDescriptors.IncludeAll ||
          filter.function === FilterFunctionDescriptors.IncludeAny ||
          filter.function === FilterFunctionDescriptors.IncludeEquals ||
          filter.function === FilterFunctionDescriptors.IncludeNone)
        {
          filter.values = (column.value as string[]);
        }
        else
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          filter.value = (column.value as any).toString();
        }
        filter.function = MaterialReactTableHelper.convertToFilterFunctionDesc(filterFn);
      }

      return filter;
    });

    const filtering = filteringAll.filter((x) => x.propertyName !== '');

    return filtering;
  }

  public static convertToFilterFunctionDesc(filterFn: MRT_FilterOption): IFilterFunctionDesc
  {
    switch (filterFn)
    {
      case 'equals': return FilterFunctionDescriptors.Equals;
      case 'equalsString': return FilterFunctionDescriptors.Equals;
      case 'notEquals': return FilterFunctionDescriptors.NotEqual;
      case 'lessThan': return FilterFunctionDescriptors.LessThan;
      case 'greaterThan': return FilterFunctionDescriptors.GreaterThan;
      case 'greaterThanOrEqualTo': return FilterFunctionDescriptors.LessThanOrEqual;
      case 'between': return FilterFunctionDescriptors.Between;
      case 'betweenInclusive': return FilterFunctionDescriptors.Between;
      case 'contains': return FilterFunctionDescriptors.Contains;
      case 'startsWith': return FilterFunctionDescriptors.StartsWith;
      case 'endsWith': return FilterFunctionDescriptors.EndsWith;
      case 'notEmpty': return FilterFunctionDescriptors.NotEmpty;
      case 'includeAny': return FilterFunctionDescriptors.IncludeAny;
      case 'includeAll': return FilterFunctionDescriptors.IncludeAll;
      case 'includeEquals': return FilterFunctionDescriptors.IncludeEquals;
      case 'includeNone': return FilterFunctionDescriptors.IncludeNone;
      default: return FilterFunctionDescriptors.Equals;
    }
  }

  public static convertFromFilterFunctionDesc(filterFn: IFilterFunctionDesc): MRT_FilterOption
  {
    switch (filterFn)
    {
      case FilterFunctionDescriptors.Equals: return 'equals';
      case FilterFunctionDescriptors.NotEqual: return 'notEquals';
      case FilterFunctionDescriptors.LessThan: return 'lessThan';
      case FilterFunctionDescriptors.LessThanOrEqual: return 'lessThanOrEqualTo';
      case FilterFunctionDescriptors.GreaterThan: return 'greaterThan';
      case FilterFunctionDescriptors.GreaterThanOrEqual: return 'greaterThanOrEqualTo';
      case FilterFunctionDescriptors.Between: return 'between';
      case FilterFunctionDescriptors.Contains: return 'contains';
      case FilterFunctionDescriptors.StartsWith: return 'startsWith';
      case FilterFunctionDescriptors.EndsWith: return 'endsWith';
      case FilterFunctionDescriptors.NotEmpty: return 'notEmpty';
      case FilterFunctionDescriptors.IncludeAny: return 'includeAny';
      case FilterFunctionDescriptors.IncludeAll: return 'includeAll';
      case FilterFunctionDescriptors.IncludeEquals: return 'includeEquals';
      case FilterFunctionDescriptors.IncludeNone: return 'includeNone';
      default: return 'equals';
    }
  }

  /**
   * Получение списка функций фильтрации для свойств
   */
  public static getFilterOptions(objectInfo: IObjectInfo): Record<string, MRT_FilterOption>
  {
    const filterFunctions: Record<string, MRT_FilterOption> = {};

    objectInfo.getProperties().forEach((x) => 
    {
      if (x.filtering && x.filtering.enabled)
      {
        filterFunctions[`${x.fieldName}`] = MaterialReactTableHelper.convertFromFilterFunctionDesc(x.filtering.functionDefaultDesc);
      }
    })

    return filterFunctions;
  }
}