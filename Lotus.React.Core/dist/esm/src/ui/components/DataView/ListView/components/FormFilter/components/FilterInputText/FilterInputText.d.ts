import { IPropertyDescriptor, IFilterProperty } from 'lotus-core';
import React from 'react';
import { IInputFieldProps } from 'ui/components/Controls';
export interface IFilterInputTextProps extends IInputFieldProps {
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
export declare const FilterInputText: React.FC<IFilterInputTextProps>;
