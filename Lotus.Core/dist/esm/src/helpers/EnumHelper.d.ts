export declare class EnumHelper {
    /**
     *
     * @param $enum
     * @returns
     */
    static getValues<TEnum>($enum: Record<string, TEnum>): TEnum[];
    static getNames<TEnum>($enum: Record<string, TEnum>): string[];
    /**
     * Проверка на установленный флаг
     * @param value Значение
     * @param flag Проверяемый флаг
     * @returns Статус установки флага
     */
    static isFlagSet(value?: number, flag?: number): boolean;
    /**
     * Установка флага
     * @param value Значение
     * @param flag Флаг
     * @returns Новое значение
     */
    static setFlag(value: number, flags: number): number;
    /**
     * Очистка флага
     * @param value Значение
     * @param flags Флаг
     * @returns Новое значение
     */
    static clearFlag(value: number, flags: number): number;
}
