import { ArrayHelper } from 'helpers/ArrayHelper';
import { TKey } from 'types/Key';
import { ObjectHelper } from 'helpers';
import { IOption } from './Option';

export class OptionHelper
{
  /**
   * Преобразование значение в значение корректного типа
   * @param options Список опций
   * @param value Значение
   * @returns Значение корректного типа
   */
  public static convertValue(options: IOption[], value: TKey): TKey
  {
    if(typeof options[0].value == 'string')
    {
      if(typeof value == 'string') return value;
      if(typeof value == 'number') return value.toString();
    }

    if(typeof options[0].value == 'number')
    {
      if(typeof value == 'string') return Number(value);
      if(typeof value == 'number') return value;
    }

    return value;
  }

  /**
   * Преобразование в типизированный массив
   * @param options Список опций
   * @returns
   */
  public static convertToNumber(options: IOption[]): IOption[]
  {
    const result = options.map((x) =>
    {
      const value: IOption = { text: x.text, value: Number(x.value) };
      return value;
    });

    return result;
  }

  /**
   * Преобразование в типизированный массив
   * @param options Список опций
   * @returns
   */
  public static convertToString(options: IOption[]): IOption[]
  {
    const result = options.map((x) =>
    {
      const value: IOption = { text: x.text, value: String(x.value) };
      return value;
    });

    return result;
  }

  /**
   * Получение корректного значения по умолчанию или начального значения
   * @param options Список опций
   * @param initialSelectedValue Начальное значение
   * @returns
   */
  public static getDefaultValue<TValueOption extends TKey = TKey>(options: IOption[], initialSelectedValue?: TValueOption): TValueOption
  {
    if (ObjectHelper.isNullOrUndefined(initialSelectedValue) == false)
    {
      return initialSelectedValue!;
    }

    return options[0]!.value as TValueOption;
  }

  /**
   * Получение корректного текста по умолчанию или начального значения текста
   * @param options Список опций
   * @param initialSelectedValue Начальное значение
   * @returns
   */
  public static getDefaultText<TValueOption extends TKey = TKey>(options: IOption[], initialSelectedValue?: TValueOption): string
  {
    if (ObjectHelper.isNullOrUndefined(initialSelectedValue) == false)
    {
      let text = '';
      options.forEach((element) =>
      {
        if (element.value === initialSelectedValue)
        {
          text = element.text;
        }
      });

      return text;
    }

    return options[0]!.text;
  }

  /**
   * Получение корректной иконки по умолчанию или начальной иконки
   * @param options Список опций
   * @param initialSelectedValue Начальное значение
   * @returns
   */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static getDefaultIcon<TValueOption extends TKey = TKey>(options: IOption[], initialSelectedValue?: TValueOption): any
  {
    if (ObjectHelper.isNullOrUndefined(initialSelectedValue) == false)
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let icon: any = undefined;
      options.forEach((element) =>
      {
        if (element.value === initialSelectedValue)
        {
          icon = element.icon;
        }
      });

      return icon;
    }

    return options[0]!.icon;
  }

  /**
   * Получение корректного текста по умолчанию или начального значения текста
   * @param options Список опций
   * @param initialSelectedValues Начальное значение
   * @returns Массив текста выбранных значений
   */
  public static getDefaultTexts<TValueOption extends TKey = TKey>(options: IOption[], initialSelectedValues?: TValueOption[]): string[]
  {
    if (initialSelectedValues && initialSelectedValues.length > 0)
    {
      const texts: string[] = [];

      options.forEach((element) =>
      {
        if (initialSelectedValues.find((x) => x === element.value))
        {
          texts.push(element.text);
        }
      });

      return texts;
    }
    else
    {
      return [];
    }
  }

  /**
   * Получение опций из значения опций
   * @param options Массив всех опций
   * @param selectedValue Выбранное значение
   * @returns Опция
   */
  public static getOptionByValue(options: IOption[], selectedValue?: TKey): IOption
  {
    if (ObjectHelper.isNullOrUndefined(selectedValue) == false)
    {
      for (const element of options)
      {
        if (element.value === selectedValue)
        {
          return element;
        }
      }
    }

    return options[0];
  }

  /**
   * Получение текста из значения опций
   * @param options Массив всех опций
   * @param selectedValue Выбранное значение
   * @returns Текст выбранного значения
   */
  public static getTextByValue(options: IOption[], selectedValue?: TKey): string
  {
    let text = '';
    if (ObjectHelper.isNullOrUndefined(selectedValue) == false)
    {
      options.forEach((element) =>
      {
        if (element.value === selectedValue)
        {
          text = element.text;
        }
      });
    }

    return text;
  }

  /**
   * Получение иконки из значения опций
   * @param options Массив всех опций
   * @param selectedValue Выбранное значение
   * @returns Иконка выбранного значения
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static getIconByValue(options: IOption[], selectedValue?: TKey): any
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let icon: any = undefined;
    if (ObjectHelper.isNullOrUndefined(selectedValue) == false)
    {
      options.forEach((element) =>
      {
        if (element.value === selectedValue)
        {
          icon = element.icon;
        }
      });
    }

    return icon;
  }

  /**
   * Получение массива опций из выбранных значений опций
   * @param options Массив всех опций
   * @param selectedValues Выбранные значения
   * @returns Массив опций
   */
  public static getOptionsByValues(options: IOption[], selectedValues?: TKey|TKey[]): IOption[]
  {
    if(selectedValues)
    {
      if(Array.isArray(selectedValues))
      {
        if(selectedValues.length > 0)
        {
          const optionsSelected: IOption[] = [];
      
          options.forEach((element) =>
          {
            if (selectedValues.find((x) => x === element.value))
            {
              optionsSelected.push(element);
            }
          });
      
          return optionsSelected;
        }
      }
      else
      {
        for (const element of options)
        {
          if (element.value === selectedValues)
          {
            return [element];
          }
        }
      }
    }

    return [];
  }

  /**
   * Получение массива текста из выбранных значений опций
   * @param options Массив всех опций
   * @param selectedValues Выбранные значения
   * @returns Массив текста выбранных значений
   */
  public static getTextsByValues(options: IOption[], selectedValues?: TKey[]): string[]
  {
    if (selectedValues && selectedValues.length > 0)
    {
      const texts: string[] = [];

      options.forEach((element) =>
      {
        if (selectedValues.find((x) => x === element.value))
        {
          texts.push(element.text);
        }
      });

      return texts;
    }
    else
    {
      return [];
    }
  }

  /**
   * Получение массива текста из неопределённого значения(свойства объекта)
   * @param options Массив всех опций
   * @param item Неопределённое значение
   * @returns Массив текста выбранных значений
   */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static getTextsByUnknownValues(options: IOption[], item: any): string[]
  {
    if (Array.isArray(item))
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const massive: any[] = item;
      if (ArrayHelper.checkIsNumbers(massive))
      {
        const numbers = massive.map((x) =>
        {
          const value: number = Number(x);
          return value;
        });

        const result = OptionHelper.getTextsByValues(options, numbers);
        return result;
      }
      else
      {
        const texts = massive.map((x) =>
        {
          const value: string = String(x);
          return value;
        });

        const result = OptionHelper.getTextsByValues(options, texts);
        return result;
      }
    }

    return [];
  }

  /**
   * Проверка на наличие опции
   * @param options Массив всех опций
   * @param value Выбранное значение
   * @returns статус наличе опции
   */
  public static hasOption(options: IOption[], value?: TKey):boolean
  {
    if(value)
    {
      return options.find((x) => x.value == value) !== undefined;
    }

    return false;
  }
}