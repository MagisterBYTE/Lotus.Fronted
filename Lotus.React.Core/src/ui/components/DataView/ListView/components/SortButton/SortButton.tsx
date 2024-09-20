import React, { useState } from 'react';
import { Menu } from '@mui/material';
import { IObjectInfo, ISortProperty, StringHelper } from 'lotus-core';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { Button } from 'ui/components/Controls';

export interface ISortButtonProps
{
  /**
   * Свойства объекта
   */
  objectInfo: IObjectInfo;

  /**
   * Функция обратного вызова для установки выбранной сортировки
   * @param sort 
   * @returns 
   */
  onSetSortProperties: (sort: ISortProperty[])=>void;

  /**
   * Изначальное значение сортировки
   */
  initialSortProperties:ISortProperty[];  
}

export const SortButton: React.FC<ISortButtonProps> = (props:ISortButtonProps) => 
{
  const { objectInfo, onSetSortProperties, initialSortProperties } = props;

  const [sortProperties, setSortProperties] = useState<ISortProperty[]>(initialSortProperties);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSortStatus, setIsSortStatus] = useState<boolean>(initialSortProperties.length === 0);
  const [anchorElem, setAnchorElem] = React.useState<null | HTMLElement>(null);
  const menuIdSort = 'sort-listview-menu';
  const isMenuOpen = Boolean(anchorElem);

  const properties = objectInfo.getPropertiesSorted();

  //
  // Сортировка
  //  
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => 
  {
    setAnchorElem(event.currentTarget);
  }

  const handleCloseMenu = () => 
  {
    setAnchorElem(null);
  }  

  const handleSetSortProperty = (fieldName: string, isDesc: boolean) =>
  {
    const sortProperty:ISortProperty = {propertyName: StringHelper.capitalizeFirstLetter(fieldName), isDesc};
    const newSortProperties = [sortProperty];
    setSortProperties(newSortProperties);
    setIsSortStatus(true);

    onSetSortProperties(newSortProperties);
    setAnchorElem(null);
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isSelected =(fieldName:string, isDesc:boolean) =>
  {
    if(sortProperties.length === 0) return false;
    return (StringHelper.capitalizeFirstLetter(fieldName) === sortProperties[0].propertyName && sortProperties[0].isDesc === isDesc);
  }

  return (
    <>
      <Button variant='icon' size='medium' onClick={handleOpenMenu}>
        <FaSortAmountDown />
      </Button>
      <Menu 
        anchorEl={anchorElem}
        id={menuIdSort}
        keepMounted
        open={isMenuOpen}
        onClose={handleCloseMenu}>
        {
          properties.map((x, index) =>
          {
            return <div key={index} style={{display: 'grid', 
              gridTemplateColumns: '30% auto *', 
              justifyContent: 'start', 
              alignItems: 'center',
              margin: 4}}>
              {x.name}
              <Button 
                // isSelected={isSelected(x.fieldName, false)}
                onClick={()=>{handleSetSortProperty(x.fieldName, false)}}>
                <FaSortAmountUp />
              </Button>
              <Button 
                // isSelected = {isSelected(x.fieldName, true)} 
                onClick={()=>{handleSetSortProperty(x.fieldName, true)}}>
                <FaSortAmountDown />
              </Button>
            </div>
          })
        }
      </Menu>
    </>
  )
};
