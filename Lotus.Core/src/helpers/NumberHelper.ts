
export class NumberHelper
{
  public static compare(left?: number, right?: number, isDesc?: boolean):number
  {
    let status:number = 0;
    if(left)
    {
      if(right)
      {
        status = Math.sign(left - right);
      }
      else
      {
        status = 1;
      }
    }
    else
    {
      if(right)
      {
        status = -1;
      }
      else
      {
        status = 0;
      }
    }

    if(isDesc)
    {
      if(status > 0) return -1;
      else
      {
        if(status < 0) return 1;
        else return 0;
      }
    }

    return status;
  }  

  // #region Integer
  /**
   * Проверка на установленный флаг
   * @param value Значение
   * @param flag Проверяемый флаг
   * @returns Статус установки флага
   */
  public static isFlagSet(value: number, flag: number): boolean
  {
    return (value & flag) != 0;
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

  /**
   * Преобразование в текст который можно сконвертировать в целый тип
   * @param text Текст
   * @returns Текст
   */
  public static parsableTextInt(text: string): string
  {
    let numberText: string = '';

    let add_minus = false;
    const max = 11;
    for (let i = 0; i < text.length; i++)
    {
      const c = text[i]!;

      if (c == '-' && (i != text.length - 1) && add_minus == false)
      {
        numberText += c;
        add_minus = true;
        continue;
      }

      if (c >= '0' && c <= '9')
      {
        numberText += c;
      }

      if (numberText.length > max)
      {
        break;
      }
    }

    return numberText;
  }

  /**
   * Преобразование текста в целое число
   * @param text Текст
   * @param defaultValue Значение по умолчанию если преобразовать не удалось
   * @returns Значение
   */
  public static parseInt(text: string, defaultValue: number = 0): number
  {
    text = NumberHelper.parsableTextInt(text);

    const resultValue = Number.parseInt(text);

    if (Number.isNaN(resultValue))
    {
      return defaultValue;
    }

    return resultValue;
  }
  // #endregion

  // #region Float
  /**
   * Преобразование в текст который можно сконвертировать в вещественный тип
   * @param text Текст
   * @returns Текст
   */
  public static parsableTextFloat(text: string): string
  {
    let numberText = '';

    let add_minus = false;
    let add_dot = false;
    for (let i = 0; i < text.length; i++)
    {
      const c = text[i]!;

      if (c == '-' && (i != text.length - 1) && add_minus == false)
      {
        numberText += c;
        add_minus = true;
        continue;
      }

      if ((c == ',' || c == '.') && (i != text.length - 1) && add_dot == false)
      {
        numberText += '.';
        add_dot = true;
        continue;
      }

      if (c >= '0' && c <= '9')
      {
        numberText += c;
      }
    }

    return numberText;
  }

  /**
   * Преобразование текста в вещественное число
   * @param text Текст
   * @param defaultValue Значение по умолчанию если преобразовать не удалось
   * @returns Значение
   */
  public static parseFloat(text: string, defaultValue: number = 0): number
  {
    text = NumberHelper.parsableTextFloat(text);

    const resultValue = Number.parseFloat(text);

    if (Number.isNaN(resultValue))
    {
      return defaultValue;
    }

    return resultValue;
  }

  // #endregion
}
