
export class EnumHelper
{
  /**
   * 
   * @param $enum 
   * @returns 
   */
  public static getValues<TEnum>($enum: Record<string, TEnum>): TEnum[]
  {
    return Object.keys($enum).map((key) => $enum[key]!);
  }

  public static getNames<TEnum>($enum: Record<string, TEnum>): string[]
  {
    return Object.keys($enum).map((key) => key);
  }

  /**
   * Проверка на установленный флаг
   * @param value Значение
   * @param flag Проверяемый флаг
   * @returns Статус установки флага
   */
  public static isFlagSet(value?: number, flag?: number): boolean
  {
    if(value)
    {
      if(flag)
      {
        return (value & flag) != 0;
      }
    }

    return false;
  }

  /**
   * Установка флага
   * @param value Значение
   * @param flag Флаг
   * @returns Новое значение
   */
  public static setFlag(value: number, flags: number): number
  {
    value |= flags;
    return value;
  }

  /**
   * Очистка флага
   * @param value Значение
   * @param flags Флаг
   * @returns Новое значение
   */
  public static clearFlag(value: number, flags: number): number
  {
    value &= ~flags;
    return value;
  }
}
