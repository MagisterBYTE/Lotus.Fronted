import { IPropertyDescriptor, IFilterProperty } from 'lotus-core';
import React from 'react';
import { IMultiSelectProps } from 'ui/components/Controls';
export interface IFilterMultiSelectProps extends IMultiSelectProps<string> {
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
export declare const FilterMultiSelect: React.FC<IFilterMultiSelectProps>;
