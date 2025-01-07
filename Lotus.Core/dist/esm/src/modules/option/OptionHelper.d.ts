import { TKey } from 'types/Key';
import { IOption } from './Option';
export declare class OptionHelper {
    /**
     * Преобразование значение в значение корректного типа
     * @param options Список опций
     * @param value Значение
     * @returns Значение корректного типа
     */
    static convertValue(options: IOption[], value: TKey): TKey;
    /**
     * Преобразование в типизированный массив
     * @param options Список опций
     * @returns
     */
    static convertToNumber(options: IOption[]): IOption[];
    /**
     * Преобразование в типизированный массив
     * @param options Список опций
     * @returns
     */
    static convertToString(options: IOption[]): IOption[];
    /**
     * Получение корректного значения по умолчанию или начального значения
     * @param options Список опций
     * @param initialSelectedValue Начальное значение
     * @returns
     */
    static getDefaultValue<TValueOption extends TKey = TKey>(options: IOption[], initialSelectedValue?: TValueOption): TValueOption;
    /**
     * Получение корректного текста по умолчанию или начального значения текста
     * @param options Список опций
     * @param initialSelectedValue Начальное значение
     * @returns
     */
    static getDefaultText<TValueOption extends TKey = TKey>(options: IOption[], initialSelectedValue?: TValueOption): string;
    /**
     * Получение корректной иконки по умолчанию или начальной иконки
     * @param options Список опций
     * @param initialSelectedValue Начальное значение
     * @returns
     */
    static getDefaultIcon<TValueOption extends TKey = TKey>(options: IOption[], initialSelectedValue?: TValueOption): any;
    /**
     * Получение корректного текста по умолчанию или начального значения текста
     * @param options Список опций
     * @param initialSelectedValues Начальное значение
     * @returns Массив текста выбранных значений
     */
    static getDefaultTexts<TValueOption extends TKey = TKey>(options: IOption[], initialSelectedValues?: TValueOption[]): string[];
    /**
     * Получение опций из значения опций
     * @param options Массив всех опций
     * @param selectedValue Выбранное значение
     * @returns Опция
     */
    static getOptionByValue(options: IOption[], selectedValue?: TKey): IOption;
    /**
     * Получение текста из значения опций
     * @param options Массив всех опций
     * @param selectedValue Выбранное значение
     * @returns Текст выбранного значения
     */
    static getTextByValue(options: IOption[], selectedValue?: TKey): string;
    /**
     * Получение иконки из значения опций
     * @param options Массив всех опций
     * @param selectedValue Выбранное значение
     * @returns Иконка выбранного значения
     */
    static getIconByValue(options: IOption[], selectedValue?: TKey): any;
    /**
     * Получение массива опций из выбранных значений опций
     * @param options Массив всех опций
     * @param selectedValues Выбранные значения
     * @returns Массив опций
     */
    static getOptionsByValues(options: IOption[], selectedValues?: TKey | TKey[]): IOption[];
    /**
     * Получение массива текста из выбранных значений опций
     * @param options Массив всех опций
     * @param selectedValues Выбранные значения
     * @returns Массив текста выбранных значений
     */
    static getTextsByValues(options: IOption[], selectedValues?: TKey[]): string[];
    /**
     * Получение массива текста из неопределённого значения(свойства объекта)
     * @param options Массив всех опций
     * @param item Неопределённое значение
     * @returns Массив текста выбранных значений
     */
    static getTextsByUnknownValues(options: IOption[], item: any): string[];
    /**
     * Проверка на наличие опции
     * @param options Массив всех опций
     * @param value Выбранное значение
     * @returns статус наличе опции
     */
    static hasOption(options: IOption[], value?: TKey): boolean;
}
