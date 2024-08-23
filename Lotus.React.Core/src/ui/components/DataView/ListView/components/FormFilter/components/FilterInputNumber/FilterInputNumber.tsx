import React, { ChangeEvent, useState } from 'react';
import { TextField } from '@mui/material';
import { IPropertyDescriptor, IFilterProperty, IFilterFunctionDesc, FilterFunctionEnum, StringHelper, GroupFilterFunctionsNumber } from 'lotus-core';
import { Label } from 'ui/components/Display';
import { HorizontalStack } from 'ui/components/Layout';
import { SelectFilterFunction } from 'widget';
import { IInputFieldProps } from 'ui/components/Controls';

export interface IFilterInputNumberProps extends IInputFieldProps 
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

export const FilterInputNumber: React.FC<IFilterInputNumberProps> = (props: IFilterInputNumberProps) => 
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { propertyDescriptor, initialFilterProperty, onSetFilterProperty, ...labelProps } = props;

  const [filterValue, setFilterValue] = useState<number | null>();
  const [filterFunction, setFilterFunction] = useState<IFilterFunctionDesc>(FilterFunctionEnum.Equals);

  const handleFilterValue = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => 
  {
    setFilterValue(Number(event.target.value));

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
    <Label {...labelProps} >
      <HorizontalStack fullWidth>
        <TextField value={filterValue} onChange={handleFilterValue} type='number' />
        <SelectFilterFunction
          initialFunctionFn={filterFunction}
          groupFilterFunctions={GroupFilterFunctionsNumber}
          onSelectFilterFunction={setFilterFunction} />
      </HorizontalStack>
    </Label>
  )
};
