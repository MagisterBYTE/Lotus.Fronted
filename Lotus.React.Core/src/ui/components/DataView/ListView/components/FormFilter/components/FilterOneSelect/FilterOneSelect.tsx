import { IPropertyDescriptor, IFilterProperty, FilterFunctionDescriptors, IFilterFunctionDesc, StringHelper, GroupFilterFunctionsEnum } from 'lotus-core';
import React, { useState } from 'react';
import { ISelectProps, Select } from 'ui/components/Controls';
import { SelectFilterFunction } from 'widget';

export interface IFilterOneSelectProps extends ISelectProps<string>
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

export const FilterOneSelect: React.FC<IFilterOneSelectProps> = (props: IFilterOneSelectProps) => 
{
  const { propertyDescriptor, initialFilterProperty, onSetFilterProperty, ...oneSelectProps } = props;

  const initFilterValue = initialFilterProperty === undefined ? undefined : initialFilterProperty.value;
  const initFilterFn = initialFilterProperty === undefined ? FilterFunctionDescriptors.Equals : initialFilterProperty.function

  const [filterValue, setFilterValue] = useState<string | undefined>(initFilterValue);
  const [filterFunction, setFilterFunction] = useState<IFilterFunctionDesc>(initFilterFn);

  const handleFilterValue = (selectedValue: string | undefined) => 
  {
    setFilterValue(selectedValue);

    const filterProperty: IFilterProperty =
    {
      propertyName: StringHelper.capitalizeFirstLetter(propertyDescriptor.fieldName),
      function: filterFunction,
      propertyTypeDesc: propertyDescriptor.propertyTypeDesc,
      isArray: propertyDescriptor.isArray,
      value: filterValue?.toString()
    };

    onSetFilterProperty(propertyDescriptor.fieldName, filterProperty);
  };

  return (
    <Select<string> {...oneSelectProps}
      initialSelectedValue={initFilterValue}
      onSetSelectedValue={handleFilterValue}
      rightElement=
        {
          <SelectFilterFunction
            initialFunctionFn={filterFunction}
            groupFilterFunctions={GroupFilterFunctionsEnum}
            onSelectFilterFunction={setFilterFunction} />
        } />
  )
};
