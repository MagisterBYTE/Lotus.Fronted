/**
 * Описание типа свойства
 */
export interface IPropertyTypeDesc
{
  id: number,
  type: TPropertyType,
}

/**
 * Тип свойства
 */
export type TPropertyType = 'Boolean' | 'Integer' | 'Double' | 'String' | 'DateTime' | 'Guid';

/**
 * Дескрипторы (перечисление) для типа свойства
 */
export const PropertyTypeDescriptors: Record<TPropertyType, IPropertyTypeDesc> =
  {
    /**
     * Логический тип
     */
    Boolean:
    {
      id: 0,
      type: 'Boolean'
    },

    /**
     * Целый тип (byte, short, int, long, enum)
     */
    Integer:
    {
      id: 1,
      type: 'Integer'
    },

    /**
     * Вещественный тип (float, double, decimal)
     */
    Double:
    {
      id: 2,
      type: 'Double'
    },

    /**
     * Строковый тип
     */
    String:
    {
      id: 3,
      type: 'String'
    },

    /**
     * Тип даты-времени
     */
    DateTime:
    {
      id: 4,
      type: 'DateTime'
    },

    /**
     * Глобальный идентификатор в формате UUID
     */
    Guid:
    {
      id: 5,
      type: 'Guid'
    }
  } as const;