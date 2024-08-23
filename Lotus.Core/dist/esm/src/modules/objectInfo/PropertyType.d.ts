/**
 * Описание типа свойства
 */
export interface IPropertyTypeDesc {
    id: number;
    type: TPropertyType;
}
/**
 * Перечисление для типа свойства
 */
export declare const PropertyTypeEnum: Record<string, IPropertyTypeDesc>;
/**
 * Тип свойства
 */
export type TPropertyType = keyof typeof PropertyTypeEnum;
