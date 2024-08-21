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
export declare const PropertyTypeEnum: {
    /**
     * Логический тип
     */
    readonly Boolean: {
        readonly id: 0;
        readonly type: "Boolean";
    };
    /**
     * Целый тип
     */
    readonly Integer: {
        readonly id: 1;
        readonly type: "Integer";
    };
    /**
     * Вещественный тип
     */
    readonly Float: {
        readonly id: 2;
        readonly type: "Float";
    };
    /**
     * Строковый тип
     */
    readonly String: {
        readonly id: 3;
        readonly type: "String";
    };
    /**
     * Перечисление
     */
    readonly Enum: {
        readonly id: 4;
        readonly type: "Enum";
    };
    /**
     * Тип даты-времени
     */
    readonly DateTime: {
        readonly id: 5;
        readonly type: "DateTime";
    };
    /**
     * Глобальный идентификатор в формате UUID
     */
    readonly Guid: {
        readonly id: 6;
        readonly type: "Guid";
    };
    /**
     * Объект
     */
    readonly Object: {
        readonly id: 7;
        readonly type: "Object";
    };
};
/**
 * Тип свойства
 */
export type TPropertyType = keyof typeof PropertyTypeEnum;
