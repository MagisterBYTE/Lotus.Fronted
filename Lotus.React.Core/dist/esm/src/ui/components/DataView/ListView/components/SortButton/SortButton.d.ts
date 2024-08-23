import React from 'react';
import { IObjectInfo, ISortProperty } from 'lotus-core';
export interface ISortButtonProps {
    /**
     * Свойства объекта
     */
    objectInfo: IObjectInfo;
    /**
     * Функция обратного вызова для установки выбранной сортировки
     * @param sort
     * @returns
     */
    onSetSortProperties: (sort: ISortProperty[]) => void;
    /**
     * Изначальное значение сортировки
     */
    initialSortProperties: ISortProperty[];
}
export declare const SortButton: React.FC<ISortButtonProps>;
