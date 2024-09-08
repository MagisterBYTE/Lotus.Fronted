export declare class ObjectHelper {
    /**
     * Проверка значения на undefined или null
     * @param value Проверяемое значение
     * @returns Статус проверки
     */
    static isNullOrUndefined(value: unknown): value is null | undefined;
    /**
     * Проверка объекта на то, что все его свойства имеют значения undefined
     * @param object Проверяемый объект
     * @returns Статус проверки
     */
    static isObjectValuesEmpty(object: object): boolean;
    /**
     * Получить значение по условию if
     * @param check Проверяемое значение
     * @param positive Значение возвращаемое в случае не нулевого значения
     * @param negative Значение возвращаемое в случае нулевого значения
     * @returns Значение
     */
    static getIf<TResult = any>(check: any, positive: TResult, negative: TResult): TResult;
    /**
     * Получить значение по условию if
     * @param check Проверяемое значение
     * @param positive Функция вызываемая в случае не нулевого значения
     * @param negative Функция вызываемая в случае нулевого значения
     * @returns Значение
     */
    static getIfFun<TResult = any>(check: any, positive: (check: any) => TResult, negative: (check: any) => TResult): TResult;
    /**
     * Searches the supplied object, and then down it's prototype chain until it
     * finds the object where `prop` is its own property. In other words, finds
     * the object in which `prop` was actually defined on, skipping objects that
     * merely inherit `prop`. This is useful when using methods like
     * `Object.getOwnPropertyDescriptor()` which only work on "own" properties.
     *
     * @param scope   The scope on which to start checking for
     * @param prop    The name of the property we're searching for
     * @returns {*}
     */
    static getPropertyDefinitionObject(scope: object, prop: string): any;
}
