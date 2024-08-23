import React from 'react';
import { IFilterProperty, IObjectInfo } from 'lotus-core';
export interface IFormFilterRefType {
    getFilters: () => IFilterProperty[];
    clearFilters: () => void;
}
export interface IFormFilterProps {
    /**
     * Свойства объекта
     */
    objectInfo: IObjectInfo;
    /**
     * Изначальное значение фильтров
     */
    initialFilterProperties: IFilterProperty[];
}
export declare const FormFilter: React.ForwardRefExoticComponent<IFormFilterProps & React.RefAttributes<IFormFilterRefType>>;
