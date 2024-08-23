import { IPropertyDescriptor, IFilterProperty } from 'lotus-core';
import React from 'react';
import { ISelectProps } from 'ui/components/Controls';
export interface IFilterOneSelectProps extends ISelectProps<string> {
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
export declare const FilterOneSelect: React.FC<IFilterOneSelectProps>;
