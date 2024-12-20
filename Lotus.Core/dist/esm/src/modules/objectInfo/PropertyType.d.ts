/**
 * Описание типа свойства
 */
export interface IPropertyTypeDesc {
    id: number;
    type: TPropertyType;
}
/**
 * Тип свойства
 */
export type TPropertyType = 'Boolean' | 'Integer' | 'Double' | 'String' | 'DateTime' | 'Guid';
/**
 * Дескрипторы (перечисление) для типа свойства
 */
export declare const PropertyTypeDescriptors: Record<TPropertyType, IPropertyTypeDesc>;
