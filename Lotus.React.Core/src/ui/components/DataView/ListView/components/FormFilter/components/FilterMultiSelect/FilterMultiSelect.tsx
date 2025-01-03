import { IPropertyDescriptor, IFilterProperty, FilterFunctionDescriptors, IFilterFunctionDesc, StringHelper, GroupFilterFunctionsArray } from 'lotus-core';
import React, { useState } from 'react';
import { IMultiSelectProps, MultiSelect } from 'ui/components/Controls';
import { SelectFilterFunction } from 'widget';


export interface IFilterMultiSelectProps extends IMultiSelectProps<string>
{
  /**
   * Дескриптор свойства по которому идет фильтрация
   */
  propertyDescriptor: IPropertyDescriptor;

  /**
   * Функция обратного вызова для установки выбранного фильтра
   * @param fieldName Имя поля
   * @param filterProperty Фильтрация свойства
   * @returns 
   */
  onSetFilterProperty: (fieldName: string, filterProperty: IFilterProperty) => void;

  /**
   * Изначальное значение фильтра свойства
   */
  initialFilterProperty?: IFilterProperty;
}

export const FilterMultiSelect: React.FC<IFilterMultiSelectProps> = (props: IFilterMultiSelectProps) => 
{
  const { propertyDescriptor, initialFilterProperty, onSetFilterProperty, ...multiSelectProps } = props;

  const initFilterValue = initialFilterProperty === undefined ? undefined : initialFilterProperty.values;
  const initFilterFn = initialFilterProperty === undefined ? FilterFunctionDescriptors.IncludeAny : initialFilterProperty.function;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filterValues, setFilterValues] = useState<string[]>(initFilterValue ?? []);
  const [filterFunction, setFilterFunction] = useState<IFilterFunctionDesc>(initFilterFn);

  const handleFilterValue = (selectedValues: string[]) => 
  {
    setFilterValues(selectedValues);

    const filterProperty: IFilterProperty =
    {
      propertyName: StringHelper.capitalizeFirstLetter(propertyDescriptor.fieldName),
      function: filterFunction,
      propertyTypeDesc: propertyDescriptor.propertyTypeDesc,
      isArray: propertyDescriptor.isArray,
      values: selectedValues
    };

    onSetFilterProperty(propertyDescriptor.fieldName, filterProperty);
  };

  return (
    <MultiSelect<string> {...multiSelectProps}
      initialSelectedValues={initFilterValue}
      // value={filterValues} 
      onSetSelectedValues={handleFilterValue}
      rightElement=
        {
          <SelectFilterFunction
            groupFilterFunctions={GroupFilterFunctionsArray}
            initialFunctionFn={filterFunction}
            onSelectFilterFunction={setFilterFunction} />
        } />
  )
};
