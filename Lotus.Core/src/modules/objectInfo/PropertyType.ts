/**
 * Описание типа свойства
 */
export interface IPropertyTypeDesc
{
  id: number,
  type: TPropertyType,
}

/**
 * Перечисление для типа свойства
 */
export const PropertyTypeEnum =
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
     * Целый тип
     */
    Integer:
    {
      id: 1,
      type: 'Integer'
    },

    /**
     * Вещественный тип
     */
    Float:
    {
      id: 2,
      type: 'Float'
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
     * Перечисление
     */
    Enum:
    {
      id: 4,
      type: 'Enum'
    },

    /**
     * Тип даты-времени
     */
    DateTime:
    {
      id: 5,
      type: 'DateTime'
    },

    /**
     * Глобальный идентификатор в формате UUID
     */
    Guid:
    {
      id: 6,
      type: 'Guid'
    },

    /**
     * Объект
     */
    Object:
    {
      id: 7,
      type: 'Object'
    }
  } as const;

/**
 * Тип свойства
 */
export type TPropertyType = keyof typeof PropertyTypeEnum;