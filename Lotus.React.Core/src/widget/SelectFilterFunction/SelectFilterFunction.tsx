import { MenuItem, Select } from '@mui/material';
import { FilterFunctionEnum, IFilterFunctionDesc } from 'lotus-core';
import React, { useState } from 'react';

export interface ISelectFilterFunctionProps
{
  initialFunctionFn?: IFilterFunctionDesc;
  onSelectFilterFunction: (filterFunction: IFilterFunctionDesc) => void;
  groupFilterFunctions: readonly IFilterFunctionDesc[];
}

export const SelectFilterFunction: React.FC<ISelectFilterFunctionProps> = (props: ISelectFilterFunctionProps) => 
{
  const { initialFunctionFn, onSelectFilterFunction, groupFilterFunctions } = props;

  const [selectedValue, setSelectedValue] = useState<string>(initialFunctionFn?.type ?? groupFilterFunctions[0].type);

  const handleSelectFilterFunction = (filterFn: IFilterFunctionDesc) =>
  {
    setSelectedValue(filterFn.type);
    onSelectFilterFunction(filterFn);
  }

  return <Select
    value={selectedValue}
    renderValue={(selected) => { return FilterFunctionEnum[selected].desc }}
  >
    {groupFilterFunctions.map((option) => (
      <MenuItem key={option.id} value={option.type} onClick={() => { handleSelectFilterFunction(option) }}>
        {(option.desc)}
      </MenuItem>
    ))}
  </Select>
};