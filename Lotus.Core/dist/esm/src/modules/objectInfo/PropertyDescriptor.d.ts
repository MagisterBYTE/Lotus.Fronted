import { IOption } from 'modules/option';
import { IPropertyEditable } from './PropertyEditable';
import { IPropertyFiltering } from './PropertyFiltering';
import { IPropertyGrouping } from './PropertyGrouping';
import { IPropertySorting } from './PropertySorting';
import { IPropertyTypeDesc } from './PropertyType';
/**
 * Интерфейс для описания свойства объекта
 */
export interface IPropertyDescriptor {
    /**
     * Имя свойства
     */
    fieldName: string;
    /**
     * Имя свойства на бэке (если оно есть использует оно, а не fieldName)
     */
    fieldNameBackend?: string;
    /**
     * Наименования свойства
     */
    name: string;
    /**
     * Описание свойства (в виде подсказки)
     */
    desc?: string;
    /**
     * Описание типа свойства
     */
    propertyTypeDesc: IPropertyTypeDesc;
    /**
     * Типа свойства - массив
     */
    isArray?: boolean;
    /**
     * Статус типа свойства Nullable.
     */
    isNullable?: boolean;
    /**
     * Только для даты - рассматривать выбор даты как выбор дня
     */
    isDateAsDay?: boolean;
    /**
     * Опции возможных значений свойства
     */
    options?: IOption[];
    /**
     * Статус поддержки сортировки по свойству
     */
    sorting?: IPropertySorting;
    /**
     * Статус поддержки фильтрации по свойству
     */
    filtering?: IPropertyFiltering;
    /**
     * Статус поддержки группировки по свойству
     */
    grouping?: IPropertyGrouping;
    /**
     * Статус поддержки редактирования свойства
     */
    editing?: IPropertyEditable;
    /**
     * Отображение указанного свойства как изображения
     */
    viewImage?: boolean;
}
