
export class Assert
{
  /**
   * Проверка значения на undefined или null
   * @param value Проверяемое значение
   * @returns Статус проверки
   */
  public static empty(value: unknown):boolean
  {
    return value === undefined || value === null;
  }

  /**
   * Проверка на наличие значения
   * @param value Проверяемое значение
   * @returns Статус проверки
   */
  public static exist(value: unknown):boolean
  {
    return value !== undefined && value !== null;
  }

  /**
   * Проверка объекта на то, что все его свойства имеют значения undefined
   * @param object Проверяемый объект
   * @returns Статус проверки
   */
  public static allUndefined(object: object): boolean
  {
    return !Object.values(object).some((value) => value !== undefined)
  }
}
