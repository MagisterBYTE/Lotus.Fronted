import { IPropertyDescriptor, IFilterProperty, IFilterFunctionDesc, FilterFunctionDescriptors, StringHelper, GroupFilterFunctionsString } from 'lotus-core';
import React, { ChangeEvent, useState } from 'react';
import { IInputFieldProps, InputField } from 'ui/components/Controls';
import { SelectFilterFunction } from 'widget';

export interface IFilterInputTextProps extends IInputFieldProps
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

export const FilterInputText: React.FC<IFilterInputTextProps> = (props: IFilterInputTextProps) => 
{
  const { propertyDescriptor, initialFilterProperty, onSetFilterProperty, ...inputProps } = props;

  const initFilterValue = initialFilterProperty === undefined ? undefined : initialFilterProperty.value;

  const [filterValue, setFilterValue] = useState<string | undefined>(initFilterValue);
  const [filterFunction, setFilterFunction] = useState<IFilterFunctionDesc>(initialFilterProperty === undefined ?
    FilterFunctionDescriptors.Contains : initialFilterProperty.function);

  const handleFilterValue = (event: ChangeEvent<HTMLInputElement>) => 
  {
    setFilterValue(event.target.value);

    const filterProperty: IFilterProperty =
    {
      propertyName: StringHelper.capitalizeFirstLetter(propertyDescriptor.fieldName),
      function: filterFunction,
      propertyTypeDesc: propertyDescriptor.propertyTypeDesc,
      isArray: propertyDescriptor.isArray,
      value: event.target.value
    };

    onSetFilterProperty(propertyDescriptor.fieldName, filterProperty);
  };

  return (
    <InputField {...inputProps}
      defaultValue={initFilterValue}
      value={filterValue}
      onChange={handleFilterValue}
      rightElement=
        {
          <SelectFilterFunction
            initialFunctionFn={filterFunction}
            groupFilterFunctions={GroupFilterFunctionsString}
            onSelectFilterFunction={setFilterFunction} />
        }
    />
  )
};
