import axios from 'axios';
import numeral from 'numeral';

class ArrayHelper {
    /**
     * Получить числовой массив в указанном диапазоне
     * @param from Начальное значение
     * @param to Конечное значение
     * @returns Числовой массив
     */
    static getNumberArrayFromTo(from, to) {
        const result = [];
        for (let i = from; i <= to; i++) {
            result.push(i);
        }
        return result;
    }
    /**
     * Проверка массива что он является строго числовым
     * @param array Проверяемый массив
     * @returns Статус проверки
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static checkIsNumbers(array) {
        return array.every((element) => {
            return typeof element === 'number';
        });
    }
    /**
     * Проверка на вхождение любого элемента проверяемого массива в исходном массиве
     * @param source Исходный массив
     * @param checked Проверяемый массив
     * @returns Статус проверки
     */
    static checkInArrayAny(source, checked) {
        let find = true;
        for (const element of source) {
            find = checked.includes(element);
            if (find) {
                break;
            }
        }
        return find;
    }
    /**
     * Группировка массива по указанному свойству
     * @param source Исходный массив
     * @param propertyName Имя свойства по которому будет произведена группировка
     * @returns Массив групп
     */
    static groupByProperty(source, propertyName) {
        const result = [];
        source.forEach((element) => {
            // @ts-expect-error propertyName
            const key = element[propertyName];
            const exist = result.find((x) => x.groupKey === key);
            if (exist) {
                exist.items.push(element);
            }
            else {
                const newUserGroup = { groupKey: key, items: [element] };
                result.push(newUserGroup);
            }
        });
        return result;
    }
}

class BooleanHelper {
    /**
     * Текстовые значение логического типа которые означает истинное значение
     */
    static TrueValues = [
        'True',
        'true',
        '1',
        'on',
        'On',
        'истина',
        'Истина',
        'да',
        'Да'
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static parse(item) {
        if (item) {
            if (typeof item == 'boolean') {
                return item;
            }
            if (typeof item == 'string') {
                return BooleanHelper.TrueValues.indexOf(item) > -1;
            }
            if (typeof item == 'number') {
                return Boolean(item);
            }
        }
        return false;
    }
    static getValue(value, yes = 'Да', no = 'Нет') {
        return (value ? yes : no);
    }
    static compare(left, right, isDesc) {
        let status = 0;
        if (left) {
            if (right) {
                status = 0;
            }
            else {
                status = 1;
            }
        }
        else {
            if (right) {
                status = -1;
            }
            else {
                status = 0;
            }
        }
        if (isDesc) {
            if (status > 0)
                return -1;
            else {
                if (status < 0)
                    return 1;
                else
                    return 0;
            }
        }
        return status;
    }
}

class BrowserHelper {
    static isLocalhost() {
        return Boolean(window.location.hostname === 'localhost' ||
            // [::1] is the IPv6 localhost address.
            window.location.hostname === '[::1]' ||
            // 127.0.0.1/8 is considered localhost for IPv4.
            window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
    }
    /**
     * return true if url is in absolute form
     * see for details: https://stackoverflow.com/a/19709846
     * @param url url
     */
    static isAbsoluteUrl(url) {
        return new RegExp('^((?:[a-z]+:)?//|mailto:)', 'i').test(url);
    }
    static open(url, openInNewTab = false) {
        window.open(url, openInNewTab ? '_blank' : '_self');
    }
    /**
     *
     * @param file
     * @param fileName
     */
    static downloadBlobFile(file, fileName) {
        const downloadUrl = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
    ;
}

class CookiesHelper {
    /**
     * Возвращает куки с указанным name или undefined, если ничего не найдено
     * @param name Имя куки
     * @returns куки с указанным name или undefined, если ничего не найдено
     */
    static get(name) {
        const matches = document.cookie.match(new RegExp(
        // eslint-disable-next-line no-useless-escape
        '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    /**
     * Установка куки
     * @param name Имя
     * @param value Значение
     * @param encodeValue Нужно ли стандартное преобразование
     * @param options Дополнительные опции
     */
    static set(name, value, encodeValue = true, options = {}) {
        const currentOptions = {
            path: '/',
            // при необходимости добавьте другие значения по умолчанию
            ...options
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        };
        if (currentOptions['expires'] instanceof Date) {
            currentOptions['expires'] = currentOptions['expires'].toUTCString();
        }
        let updatedCookie = encodeURIComponent(name) + '=' + (encodeValue ? encodeURIComponent(value) : value);
        for (const optionKey in currentOptions) {
            updatedCookie += '; ' + optionKey;
            const optionValue = currentOptions[optionKey];
            if (optionValue !== true) {
                updatedCookie += '=' + optionValue;
            }
        }
        document.cookie = updatedCookie;
    }
    /**
     * Удаление куки
     * @param name Имя
     * @param encodeValue Нужно ли стандартное преобразование
     * @param options Дополнительные опции
     */
    static delete(name, encodeValue = true, options = {}) {
        CookiesHelper.set(name, '', encodeValue, {
            'max-age': -1,
            ...options
        });
    }
    /**
     * Удаление всех кук
     */
    static deleteAll() {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
    }
}

class DateHelper {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static parse(item) {
        if (item) {
            if (item instanceof Date) {
                return item;
            }
            if (typeof item == 'number') {
                return new Date(item);
            }
            if (typeof item == 'string') {
                return new Date(Date.parse(item));
            }
        }
        return new Date(Date.now());
    }
    static compare(left, right, isDesc) {
        let status = 0;
        if (left) {
            if (right) {
                if (left > right) {
                    status = 1;
                }
                else {
                    if (left < right) {
                        status = -1;
                    }
                    else {
                        status = 0;
                    }
                }
            }
            else {
                status = 1;
            }
        }
        else {
            if (right) {
                status = -1;
            }
            else {
                status = 0;
            }
        }
        if (isDesc) {
            if (status > 0)
                return -1;
            else {
                if (status < 0)
                    return 1;
                else
                    return 0;
            }
        }
        return status;
    }
}

class EnumHelper {
    /**
     *
     * @param $enum
     * @returns
     */
    static getValues($enum) {
        return Object.keys($enum).map((key) => $enum[key]);
    }
    static getNames($enum) {
        return Object.keys($enum).map((key) => key);
    }
    /**
     * Проверка на установленный флаг
     * @param value Значение
     * @param flag Проверяемый флаг
     * @returns Статус установки флага
     */
    static isFlagSet(value, flag) {
        if (value) {
            if (flag) {
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
    static setFlag(value, flags) {
        value |= flags;
        return value;
    }
    /**
     * Очистка флага
     * @param value Значение
     * @param flags Флаг
     * @returns Новое значение
     */
    static clearFlag(value, flags) {
        value &= ~flags;
        return value;
    }
}

class ObjectHelper {
    static ALL_DIGITS_REGEX = /^\d+$/;
    static PATH_SPLIT_REGEX = /\.|\]|\[/;
    /**
     * Получить значения свойства у объекта source по пути propertyPath
     * @param source Объект
     * @param propertyPath Имя/путь свойства
     * @param shouldThrow Генерировать исключение если свойство не найдено
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getValueByPropertyPath(source, propertyPath, shouldThrow = false) {
        if (source === null || source === undefined) {
            return undefined;
        }
        // split path: "param[3].test" => ["param", 3, "test"]
        const parts = ObjectHelper.splitPath(propertyPath);
        // eslint-disable-next-line consistent-return
        return parts.reduce((acc, el) => {
            if (acc === undefined) {
                if (shouldThrow) {
                    throw new Error(`Could not dig the value using path: ${propertyPath}`);
                }
                else {
                    return undefined;
                }
            }
            if (ObjectHelper.isNum(el)) {
                // array getter [3]
                const arrIndex = parseInt(el);
                if (acc instanceof Set) {
                    // eslint-disable-next-line consistent-return
                    return Array.from(acc)[arrIndex];
                }
                else {
                    // eslint-disable-next-line consistent-return
                    return acc[arrIndex];
                }
            }
            else {
                // object getter
                if (acc instanceof Map) {
                    // eslint-disable-next-line consistent-return
                    return acc.get(el);
                }
                else {
                    // eslint-disable-next-line consistent-return
                    return acc[el];
                }
            }
        }, source);
    }
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getPropertyDefinitionObject(scope, prop) {
        if (!scope)
            return null;
        return Object.prototype.hasOwnProperty.call(scope, prop)
            ? scope
            : this.getPropertyDefinitionObject(Object.getPrototypeOf(scope), prop);
    }
    static isNum(str) {
        return str.match(ObjectHelper.ALL_DIGITS_REGEX);
    }
    static splitPath(str) {
        return (str
            .split(ObjectHelper.PATH_SPLIT_REGEX)
            // remove empty strings
            .filter((x) => !!x));
    }
}

class FunctionHelper {
    /**
       * Bind all methods on `scope` to that `scope`.
       *
       * Normal fat arrow/lambda functions in TypeScript are simply member functions
       * that replace the value of `this`, with `_this` (a reference to `this` from
       * within the constructor's scope). They're not on the prototype and as such do not
       * support inheritance. So no calling `super.myMethod()` if it's been
       * declared with a `=>`.
       *
       * `FunctionUtil.bindAllMethods( this )` should be called from the base class' constructor.
       * It will bind each method as such that it will always execute using the class scope.
       *
       * Essentially, we should now write class methods without `=>`. When executed,
       * the scope will be preserved and they will importantly continue to support
       * inheritance. Fat arrow/lambda functions (`=>`) are still great when you
       * don't require inheritance, for example, when using anonymous function callbacks.
       *
       * @param scope     Usually, pass the value of `this` from your base class.
       */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static bindAllMethods(scope) {
        for (const p in scope) {
            // Find the object in which prop was originally defined on
            const ownObject = ObjectHelper.getPropertyDefinitionObject(scope, p);
            // Now we can check if it is a getter/setter
            const descriptor = Object.getOwnPropertyDescriptor(ownObject, p);
            if (descriptor && (descriptor.get || descriptor.set))
                continue; // Don't bind if `scope[p]` is a getter/setter, we'd be attemping to bind the value returned by the getter
            // Only bind if scope[p] is a function that's not already a class member
            // the bound function will be added as a class member, referencing the function on the prototype
            if (!Object.prototype.hasOwnProperty.call(scope, p) && typeof scope[p] == 'function')
                scope[p] = scope[p].bind(scope);
        }
    }
}

class NumberHelper {
    static compare(left, right, isDesc) {
        let status = 0;
        if (left) {
            if (right) {
                status = Math.sign(left - right);
            }
            else {
                status = 1;
            }
        }
        else {
            if (right) {
                status = -1;
            }
            else {
                status = 0;
            }
        }
        if (isDesc) {
            if (status > 0)
                return -1;
            else {
                if (status < 0)
                    return 1;
                else
                    return 0;
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
    static isFlagSet(value, flag) {
        return (value & flag) != 0;
    }
    /**
     * Установка флага
     * @param value Значение
     * @param flag Флаг
     * @returns Новое значение
     */
    static setFlag(value, flags) {
        value |= flags;
        return value;
    }
    /**
     * Очистка флага
     * @param value Значение
     * @param flags Флаг
     * @returns Новое значение
     */
    static clearFlag(value, flags) {
        value &= ~flags;
        return value;
    }
    /**
     * Преобразование в текст который можно сконвертировать в целый тип
     * @param text Текст
     * @returns Текст
     */
    static parsableTextInt(text) {
        let numberText = '';
        let add_minus = false;
        const max = 11;
        for (let i = 0; i < text.length; i++) {
            const c = text[i];
            if (c == '-' && (i != text.length - 1) && add_minus == false) {
                numberText += c;
                add_minus = true;
                continue;
            }
            if (c >= '0' && c <= '9') {
                numberText += c;
            }
            if (numberText.length > max) {
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
    static parseInt(text, defaultValue = 0) {
        text = NumberHelper.parsableTextInt(text);
        const resultValue = Number.parseInt(text);
        if (Number.isNaN(resultValue)) {
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
    static parsableTextFloat(text) {
        let numberText = '';
        let add_minus = false;
        let add_dot = false;
        for (let i = 0; i < text.length; i++) {
            const c = text[i];
            if (c == '-' && (i != text.length - 1) && add_minus == false) {
                numberText += c;
                add_minus = true;
                continue;
            }
            if ((c == ',' || c == '.') && (i != text.length - 1) && add_dot == false) {
                numberText += '.';
                add_dot = true;
                continue;
            }
            if (c >= '0' && c <= '9') {
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
    static parseFloat(text, defaultValue = 0) {
        text = NumberHelper.parsableTextFloat(text);
        const resultValue = Number.parseFloat(text);
        if (Number.isNaN(resultValue)) {
            return defaultValue;
        }
        return resultValue;
    }
}

class PathHelper {
    /**
     *
     * @param fileName
     * @returns
     */
    static splitNameAndExtension(fileName) {
        const index = fileName.lastIndexOf('.');
        if (index !== -1) {
            return [fileName.substring(0, index), fileName.substring(index)];
        }
        return [fileName, ''];
    }
    ;
}

class RandomHelper {
    static getMinMax(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    static getMax(max) {
        return Math.floor(Math.random() * max);
    }
}

class StringHelper {
    /**
     * see for details: https://stackoverflow.com/a/2140644
     * (warning: function may not work with Unicode special characters)
     */
    static equalIgnoreCase(first, second) {
        return first.toLocaleUpperCase() === second.toLocaleUpperCase();
    }
    /**
     *
     * @param value
     * @returns
     */
    static isNullOrEmpty(value) {
        return value === undefined || value === null || value.trim() === '';
    }
    /**
     *
     * @param value
     * @returns
     */
    static capitalizeFirstLetter(value) {
        if (value.length > 0) {
            return value[0].toLocaleUpperCase() + value.slice(1);
        }
        return value;
    }
    /**
     *
     * @param value
     * @returns
     */
    static lowercaseFirstLetter(value) {
        if (value.length > 0) {
            return value[0].toLocaleLowerCase() + value.slice(1);
        }
        return value;
    }
    /**
     *
     * @param value
     * @returns
     */
    static toUpperCaseAllFirstLetters(value) {
        return value.split(' ').map((word) => word.slice(0, 1).toUpperCase() + word.slice(1)).join(' ');
    }
}

const actions = {
    get: 'Получить',
    getting: 'Получение...',
    gettingSucceed: 'Получение данных прошло успешно',
    gettingFailed: 'При получение данных произошла ошибка',
    add: 'Добавить',
    adding: 'Добавление...',
    addingSucceed: 'Добавление прошло успешно',
    addingFailed: 'При добавление произошла ошибка',
    edit: 'Редактировать',
    save: 'Сохранить',
    saving: 'Сохранение...',
    savingSucceed: 'Сохранение прошло успешно',
    savingFailed: 'При сохранении произошла ошибка',
    duplicate: 'Дублировать',
    delete: 'Удалить',
    deleting: 'Удаление...',
    deletingSucceed: 'Удаление прошло успешно',
    deletingFailed: 'При удаление произошла ошибка',
    deleteObject: 'Удалить объект?',
    cancel: 'Отменить',
    clear: 'Отчистить',
    confirm: 'Подтверждаю'
};

const common = {
    name: 'Наименование',
    displayName: 'Отображаемое наименование'
};

const filters = {
    equals: 'Равно',
    equalsAbbr: '=',
    notEqual: 'Не равно',
    notEqualAbbr: '!=',
    lessThan: 'Меньше',
    lessThanAbbr: '<',
    lessThanOrEqual: 'Меньше или равно',
    lessThanOrEqualAbbr: '<=',
    greaterThan: 'Больше',
    greaterThanAbbr: '>',
    greaterThanOrEqual: 'Больше или равно',
    greaterThanOrEqualAbbr: '>=',
    between: 'Между',
    betweenAbbr: '<>',
    contains: 'Содержит',
    startsWith: 'Начинается с',
    endsWith: 'Заканчивается на',
    like: 'Содержит',
    notEmpty: 'Не пустая',
    empty: 'Пустая',
    includeAny: 'Любой из элементов',
    includeAll: 'Все из элементов',
    includeEquals: 'Только эти элементы',
    includeNone: 'Ни один из элементов'
};

const validation = {
    required: 'Поле обязательно для ввода',
    maxLength: (length) => `Длина поля не может превышать ${length} символов`
};

const ruLocale = {
    // Common
    actions,
    common,
    filters,
    validation
};

const localizationCore = ruLocale;

class XMath {
    static EPSILON = 0.00001;
}

class Vector3 {
    static get zero() {
        return new Vector3([0, 0, 0]);
    }
    static get one() {
        return new Vector3([1, 1, 1]);
    }
    static get up() {
        return new Vector3([0, 1, 0]);
    }
    static get down() {
        return new Vector3([0, -1, 0]);
    }
    static get right() {
        return new Vector3([1, 0, 0]);
    }
    static get left() {
        return new Vector3([-1, 0, 0]);
    }
    static get forward() {
        return new Vector3([0, 0, 1]);
    }
    static get backward() {
        return new Vector3([0, 0, -1]);
    }
    get x() {
        return this._values[0];
    }
    get y() {
        return this._values[1];
    }
    get z() {
        return this._values[2];
    }
    get xy() {
        return [this._values[0], this._values[1]];
    }
    get xyz() {
        return [this._values[0], this._values[1], this._values[2]];
    }
    set x(value) {
        this._values[0] = value;
    }
    set y(value) {
        this._values[1] = value;
    }
    set z(value) {
        this._values[2] = value;
    }
    set xy(values) {
        this._values[0] = values[0];
        this._values[1] = values[1];
    }
    set xyz(values) {
        this._values[0] = values[0];
        this._values[1] = values[1];
        this._values[2] = values[2];
    }
    _values = new Float32Array(3);
    constructor(values) {
        if (values) {
            this.xyz = values;
        }
    }
    static cross(vector, vector2, dest) {
        if (!dest)
            dest = new Vector3();
        const x = vector.x;
        const y = vector.y;
        const z = vector.z;
        const x2 = vector2.x;
        const y2 = vector2.y;
        const z2 = vector2.z;
        dest.x = y * z2 - z * y2;
        dest.y = z * x2 - x * z2;
        dest.z = x * y2 - y * x2;
        return dest;
    }
    static dot(vector, vector2) {
        const x = vector.x;
        const y = vector.y;
        const z = vector.z;
        const x2 = vector2.x;
        const y2 = vector2.y;
        const z2 = vector2.z;
        return x * x2 + y * y2 + z * z2;
    }
    static distance(vector, vector2) {
        return Math.sqrt(this.squaredDistance(vector, vector2));
    }
    static squaredDistance(vector, vector2) {
        const x = vector2.x - vector.x;
        const y = vector2.y - vector.y;
        const z = vector2.z - vector.z;
        return x * x + y * y + z * z;
    }
    static direction(vector, vector2, dest) {
        if (!dest)
            dest = new Vector3();
        const x = vector.x - vector2.x;
        const y = vector.y - vector2.y;
        const z = vector.z - vector2.z;
        let length = Math.sqrt(x * x + y * y + z * z);
        if (length === 0) {
            dest.x = 0;
            dest.y = 0;
            dest.z = 0;
            return dest;
        }
        length = 1 / length;
        dest.x = x * length;
        dest.y = y * length;
        dest.z = z * length;
        return dest;
    }
    static lerp(a, b, t, dest) {
        if (!dest)
            dest = new Vector3();
        dest.x = a.x + t * (b.x - a.x);
        dest.y = a.y + t * (b.y - a.y);
        dest.z = a.z + t * (b.z - a.z);
        return dest;
    }
    static sum(vector, vector2, dest) {
        if (!dest)
            dest = new Vector3();
        dest.x = vector.x + vector2.x;
        dest.y = vector.y + vector2.y;
        dest.z = vector.z + vector2.z;
        return dest;
    }
    static difference(vector, vector2, dest) {
        if (!dest)
            dest = new Vector3();
        dest.x = vector.x - vector2.x;
        dest.y = vector.y - vector2.y;
        dest.z = vector.z - vector2.z;
        return dest;
    }
    static product(vector, vector2, dest) {
        if (!dest)
            dest = new Vector3();
        dest.x = vector.x * vector2.x;
        dest.y = vector.y * vector2.y;
        dest.z = vector.z * vector2.z;
        return dest;
    }
    static quotient(vector, vector2, dest) {
        if (!dest)
            dest = new Vector3();
        dest.x = vector.x / vector2.x;
        dest.y = vector.y / vector2.y;
        dest.z = vector.z / vector2.z;
        return dest;
    }
    at(index) {
        return this._values[index];
    }
    reset() {
        this.xyz = [0, 0, 0];
    }
    copy(dest) {
        if (!dest)
            dest = new Vector3();
        dest.xyz = this.xyz;
        return dest;
    }
    negate(dest) {
        if (!dest)
            dest = new Vector3(this.xyz);
        dest.x = -this.x;
        dest.y = -this.y;
        dest.z = -this.z;
        return dest;
    }
    equals(other, threshold = XMath.EPSILON) {
        if (Math.abs(this.x - other.x) > threshold) {
            return false;
        }
        if (Math.abs(this.y - other.y) > threshold) {
            return false;
        }
        if (Math.abs(this.z - other.z) > threshold) {
            return false;
        }
        return true;
    }
    length() {
        return Math.sqrt(this.squaredLength());
    }
    squaredLength() {
        const x = this.x;
        const y = this.y;
        const z = this.z;
        return x * x + y * y + z * z;
    }
    add(vector, dest) {
        if (!dest)
            dest = new Vector3(this.xyz);
        dest.x = this.x + vector.x;
        dest.y = this.y + vector.y;
        dest.z = this.z + vector.z;
        return dest;
    }
    subtract(vector, dest) {
        if (!dest)
            dest = new Vector3(this.xyz);
        dest.x = this.x - vector.x;
        dest.y = this.y - vector.y;
        dest.z = this.z - vector.z;
        return dest;
    }
    multiply(vector, dest) {
        if (!dest)
            dest = new Vector3(this.xyz);
        dest.x = this.x * vector.x;
        dest.y = this.y * vector.y;
        dest.z = this.z * vector.z;
        return dest;
    }
    /**
     *
     * @param vector
     * @param dest
     * @returns
     */
    divide(vector, dest) {
        if (!dest)
            dest = new Vector3(this.xyz);
        dest.x = this.x / vector.x;
        dest.y = this.y / vector.y;
        dest.z = this.z / vector.z;
        return dest;
    }
    scale(value, dest) {
        if (!dest)
            dest = new Vector3(this.xyz);
        dest.x = this.x * value;
        dest.y = this.y * value;
        dest.z = this.z * value;
        return dest;
    }
    normalize(dest) {
        if (!dest)
            dest = new Vector3(this.xyz);
        dest.xyz = this.xyz;
        let length = dest.length();
        if (length === 1) {
            return dest;
        }
        if (length === 0) {
            dest.reset();
            return dest;
        }
        length = 1.0 / length;
        dest.x *= length;
        dest.y *= length;
        dest.z *= length;
        return dest;
    }
}

class Vector2 {
    // #region Const
    /**
     * Единичный вектор
     */
    static One = new Vector2(1, 1);
    /**
     * Вектор "право"
     */
    static Right = new Vector2(1, 0);
    /**
     * Вектор "влево"
     */
    static Left = new Vector2(-1, 0);
    /**
     * Вектор "вверх"
     */
    static Up = new Vector2(0, 1);
    /**
     * Вектор "вниз"
     */
    static Down = new Vector2(0, -1);
    /**
     * Нулевой вектор
     */
    static Zero = new Vector2(0, 0);
    // #endregion
    // #region Static methods
    static cross(vector, vector2, dest) {
        if (!dest)
            dest = new Vector3();
        const x = vector.x;
        const y = vector.y;
        const x2 = vector2.x;
        const y2 = vector2.y;
        const z = x * y2 - y * x2;
        dest.xyz = [0, 0, z];
        return dest;
    }
    /**
     * Calculates the dot product of two vectors
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @returns {number} The dot product of the two vectors
     */
    static dot(vector, vector2) {
        return vector.x * vector2.x + vector.y * vector2.y;
    }
    /**
     * Calculates the distance between two vectors
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @returns {number} The distance between the two vectors
     */
    static distance(vector, vector2) {
        return Math.sqrt(this.squaredDistance(vector, vector2));
    }
    /**
     * Calculates the distance between two vectors squared
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @returns {number} The distance between the two vectors
     */
    static squaredDistance(vector, vector2) {
        const x = vector2.x - vector.x;
        const y = vector2.y - vector.y;
        return x * x + y * y;
    }
    /**
     * Calculates a normalized vector representing the direction from one vector to another.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static direction(vector, vector2, dest) {
        if (!dest)
            dest = new Vector2(0, 0);
        const x = vector.x - vector2.x;
        const y = vector.y - vector2.y;
        let length = Math.sqrt(x * x + y * y);
        if (length === 0) {
            dest.reset();
            return dest;
        }
        length = 1.0 / length;
        dest.x = x * length;
        dest.y = y * length;
        return dest;
    }
    /**
     * Performs a linear interpolation over two vectors.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} a
     * @param {Vector2} b
     * @param {number} t
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static lerp(a, b, t, dest) {
        if (!dest)
            dest = new Vector2(0, 0);
        dest.x = a.x + t * (b.x - a.x);
        dest.y = a.y + t * (b.y - a.y);
        return dest;
    }
    /**
     * Adds two vectors.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static sum(vector, vector2, dest) {
        if (!dest)
            dest = new Vector2(0, 0);
        dest.x = vector.x + vector2.x;
        dest.y = vector.y + vector2.y;
        return dest;
    }
    /**
     * Subtracts two vectors.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static difference(vector, vector2, dest) {
        if (!dest)
            dest = new Vector2(0, 0);
        dest.x = vector.x - vector2.x;
        dest.y = vector.y - vector2.y;
        return dest;
    }
    /**
     * Multiplies two vectors piecewise.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static product(vector, vector2, dest) {
        if (!dest)
            dest = new Vector2(0, 0);
        dest.x = vector.x * vector2.x;
        dest.y = vector.y * vector2.y;
        return dest;
    }
    /**
     * Divides two vectors piecewise.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static quotient(vector, vector2, dest) {
        if (!dest)
            dest = new Vector2(0, 0);
        dest.x = vector.x / vector2.x;
        dest.y = vector.y / vector2.y;
        return dest;
    }
    // #endregion
    // #region Fields  
    /**
     * Координата X
     */
    x;
    /**
     * Координата Y
     */
    y;
    // #endregion
    // #region Properties  
    /**
     * @returns {number[]} An array containing the x-component and y-component of the vector
     */
    get xy() {
        return [this.x, this.y];
    }
    /**
     * @param {number[]} values An array containing the new x-component and y-component of the vector
     */
    set xy(values) {
        this.x = values[0];
        this.y = values[1];
    }
    // #endregion
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    // #region Main methods
    /**
     * Retrieves the x-component or y-component of the vector.
     * @param {number} index
     * @returns {number}
     */
    at(index) {
        if (index === 0)
            return this.x;
        return this.y;
    }
    /**
     * Sets both the x- and y-components of the vector to 0.
     */
    reset() {
        this.x = 0;
        this.y = 0;
    }
    /**
     * Copies the x- and y-components from one vector to another.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    copy(dest) {
        if (!dest)
            dest = new Vector2(0, 0);
        dest.xy = this.xy;
        return dest;
    }
    /**
     * Multiplies both the x- and y-components of a vector by -1.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    negate(dest) {
        if (!dest)
            dest = new Vector2(this.x, this.y);
        dest.x = -this.x;
        dest.y = -this.y;
        return dest;
    }
    /**
     * Checks if two vectors are equal, using a threshold to avoid floating-point precision errors.
     * @param {Vector2} other
     * @param {number} threshold
     * @returns {boolean}
     */
    equals(other, threshold = XMath.EPSILON) {
        if (Math.abs(this.x - other.x) > threshold) {
            return false;
        }
        if (Math.abs(this.y - other.y) > threshold) {
            return false;
        }
        return true;
    }
    /**
     * Returns the distance from the vector to the origin.
     * @returns {number}
     */
    length() {
        return Math.sqrt(this.squaredLength());
    }
    /**
     * Returns the distance from the vector to the origin, squared.
     * @returns {number}
     */
    squaredLength() {
        const x = this.x;
        const y = this.y;
        return x * x + y * y;
    }
    /**
     * Adds two vectors together.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {Vector2} vector
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    add(vector, dest) {
        if (!dest)
            dest = new Vector2(this.x, this.y);
        dest.x = this.x + vector.x;
        dest.y = this.y + vector.y;
        return dest;
    }
    /**
     * Subtracts one vector from another.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {Vector2} vector
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    subtract(vector, dest) {
        if (!dest)
            dest = new Vector2(this.x, this.y);
        dest.x = this.x - vector.x;
        dest.y = this.y - vector.y;
        return dest;
    }
    /**
     * Multiplies two vectors together piecewise.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {Vector2} vector
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    multiply(vector, dest) {
        if (!dest)
            dest = new Vector2(this.x, this.y);
        dest.x = this.x * vector.x;
        dest.y = this.y * vector.y;
        return dest;
    }
    /**
     * Divides two vectors piecewise.
     * @param {Vector2} vector
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    divide(vector, dest) {
        if (!dest)
            dest = new Vector2(this.x, this.y);
        dest.x = this.x / vector.x;
        dest.y = this.y / vector.y;
        return dest;
    }
    /**
     * Scales a vector by a scalar parameter.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {number} value
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    scale(value, dest) {
        if (!dest)
            dest = new Vector2(this.x, this.y);
        dest.x = this.x * value;
        dest.y = this.y * value;
        return dest;
    }
    /**
     * Normalizes a vector.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    normalize(dest) {
        if (!dest)
            dest = new Vector2(this.x, this.y);
        dest.xy = this.xy;
        let length = dest.length();
        if (length === 1) {
            return dest;
        }
        if (length === 0) {
            dest.reset();
            return dest;
        }
        length = 1.0 / length;
        dest.x *= length;
        dest.y *= length;
        return dest;
    }
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

/**
 * Проверка объекта на поддержку интерфейса IResult
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkOfResult(value) {
    if (value) {
        return ('succeeded' in value) && ('code' in value);
    }
    return false;
}
/**
 * Преобразование объекта к интерфейсу IResult
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function instanceOfResult(value) {
    if (checkOfResult(value)) {
        return value;
    }
    else {
        // eslint-disable-next-line consistent-return
        return undefined;
    }
}

/**
 * Базовый класс для сервисов Api
 */
class ApiService {
    api;
    constructor() {
        const api = axios.create({
            baseURL: process.env['REACT_APP_API_URI']
        });
        api.interceptors.request.use(this.handleRequest, this.handleRequestError);
        api.interceptors.response.use(this.handleResponse, this.handleResponseError);
        this.api = api;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleRequest(config) {
        config.timeout = 10 * 60 * 1000;
        config.cancelToken = axios.CancelToken.source().token;
        return config;
    }
    handleRequestError(error) {
        console.error(`[request error] [${JSON.stringify(error)}]`);
        return Promise.reject(error);
    }
    handleResponse(response) {
        return response;
    }
    handleResponseError(error) {
        // Запрос был сделан, и сервер ответил кодом состояния, который выходит за пределы 2xx
        if (error.response) {
            // Все ошибки приводим к типу IResult для унификации обработки и реагирования
            const result = instanceOfResult(error.response.data);
            if (result) {
                console.log(error.response.data);
                return Promise.reject(result);
            }
            else {
                const resultError = {
                    succeeded: false,
                    code: Number(error.response.status ?? 500),
                    message: error.message
                };
                return Promise.reject(resultError);
            }
        }
        else {
            // Запрос был сделан, но ответ не получен - `error.request`- это экземпляр XMLHttpRequest в браузере
            if (error.request) {
                // Проверка на отдельные коды ошибок
                if (error.code === 'ERR_NETWORK') {
                    const result = { succeeded: false, code: 500, message: error.message };
                    return Promise.reject(result);
                }
                console.log(error);
                console.log('Error is not result!!!');
                return Promise.reject(error);
            }
            else {
                // Произошло что-то при настройке запроса, вызвавшее ошибку
                console.log(error);
                console.log('Error is not result!!!');
                return Promise.reject(error);
            }
        }
    }
    ;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(path, config) {
        return this.api.get(path, config);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    post(path, payload, config) {
        return this.api.post(path, payload, config);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    put(path, payload, config) {
        return this.api.put(path, payload, config);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete(path, config) {
        return this.api.delete(path, config);
    }
    getConfigAcceptJson() {
        const config = {
            headers: {
                'Accept': 'application/json'
            }
        };
        return config;
    }
}

// This is a slightly modified version of this list:
//   https://www.color-hex.com/color-names.html
const ColorNames = {
    'alice blue': [240, 248, 255],
    'antique white': [250, 235, 215],
    'antique white 1': [255, 239, 219],
    'antique white 2': [238, 223, 204],
    'antique white 3': [205, 192, 176],
    'antique white 4': [139, 131, 120],
    'aquamarine': [127, 255, 212],
    'aquamarine 2': [118, 238, 198],
    'aquamarine 4': [69, 139, 116],
    'azure': [240, 255, 255],
    'azure 2': [224, 238, 238],
    'azure 3': [193, 205, 205],
    'azure 4': [131, 139, 139],
    'beige': [245, 245, 220],
    'bisque': [255, 228, 196],
    'bisque 2': [238, 213, 183],
    'bisque 3': [205, 183, 158],
    'bisque 4': [139, 125, 107],
    'black': [0, 0, 0],
    'blanched almond': [255, 235, 205],
    'blue': [0, 0, 255],
    'blue 2': [0, 0, 238],
    'blue 4': [0, 0, 139],
    'blue violet': [138, 43, 226],
    'brown': [165, 42, 42],
    'brown 1': [255, 64, 64],
    'brown 2': [238, 59, 59],
    'brown 3': [205, 51, 51],
    'brown 4': [139, 35, 35],
    'burlywood': [222, 184, 135],
    'burlywood 1': [255, 211, 155],
    'burlywood 2': [238, 197, 145],
    'burlywood 3': [205, 170, 125],
    'burlywood 4': [139, 115, 85],
    'cadet blue': [95, 158, 160],
    'cadet blue 1': [152, 245, 255],
    'cadet blue 2': [142, 229, 238],
    'cadet blue 3': [122, 197, 205],
    'cadet blue 4': [83, 134, 139],
    'chartreuse': [127, 255, 0],
    'chartreuse 2': [118, 238, 0],
    'chartreuse 3': [102, 205, 0],
    'chartreuse 4': [69, 139, 0],
    'chocolate': [210, 105, 30],
    'chocolate 1': [255, 127, 36],
    'chocolate 2': [238, 118, 33],
    'chocolate 3': [205, 102, 29],
    'coral': [255, 127, 80],
    'coral 1': [255, 114, 86],
    'coral 2': [238, 106, 80],
    'coral 3': [205, 91, 69],
    'coral 4': [139, 62, 47],
    'cornflower blue': [100, 149, 237],
    'corn silk': [255, 248, 220],
    'corn silk 2': [238, 232, 205],
    'corn silk 3': [205, 200, 177],
    'corn silk 4': [139, 136, 120],
    'cyan': [0, 255, 255],
    'cyan 2': [0, 238, 238],
    'cyan 3': [0, 205, 205],
    'cyan 4': [0, 139, 139],
    'dark golden rod': [184, 134, 11],
    'dark golden rod 1': [255, 185, 15],
    'dark golden rod 2': [238, 173, 14],
    'dark golden rod 3': [205, 149, 12],
    'dark golden rod 4': [139, 101, 8],
    'dark green': [0, 100, 0],
    'dark khaki': [189, 183, 107],
    'dark olive green': [85, 107, 47],
    'dark olive green 1': [202, 255, 112],
    'dark olive green 2': [188, 238, 104],
    'dark olive green 3': [162, 205, 90],
    'dark olive green 4': [110, 139, 61],
    'dark orange': [255, 140, 0],
    'dark orange 1': [255, 127, 0],
    'dark orange 2': [238, 118, 0],
    'dark orange 3': [205, 102, 0],
    'dark orange 4': [139, 69, 0],
    'dark orchid': [153, 50, 204],
    'dark orchid 1': [191, 62, 255],
    'dark orchid 2': [178, 58, 238],
    'dark orchid 3': [154, 50, 205],
    'dark orchid 4': [104, 34, 139],
    'dark salmon': [233, 150, 122],
    'dark sea green': [143, 188, 143],
    'dark sea green 1': [193, 255, 193],
    'dark sea green 2': [180, 238, 180],
    'dark sea green 3': [155, 205, 155],
    'dark sea green 4': [105, 139, 105],
    'dark slate blue': [72, 61, 139],
    'dark slate gray': [47, 79, 79],
    'dark slate gray 1': [151, 255, 255],
    'dark slate gray 2': [141, 238, 238],
    'dark slate gray 3': [121, 205, 205],
    'dark slate gray 4': [82, 139, 139],
    'dark turquoise': [0, 206, 209],
    'dark violet': [148, 0, 211],
    'deep pink': [255, 20, 147],
    'deep pink 2': [238, 18, 137],
    'deep pink 3': [205, 16, 118],
    'deep pink 4': [139, 10, 80],
    'deep sky blue': [0, 191, 255],
    'deep sky blue 2': [0, 178, 238],
    'deep sky blue 3': [0, 154, 205],
    'deep sky blue 4': [0, 104, 139],
    'dim gray': [105, 105, 105],
    'dodger blue': [30, 144, 255],
    'dodger blue 2': [28, 134, 238],
    'dodger blue 3': [24, 116, 205],
    'dodger blue 4': [16, 78, 139],
    'fire brick': [178, 34, 34],
    'fire brick 1': [255, 48, 48],
    'fire brick 2': [238, 44, 44],
    'fire brick 3': [205, 38, 38],
    'fire brick 4': [139, 26, 26],
    'floral white': [255, 250, 240],
    'forest green': [34, 139, 34],
    'gainsboro': [220, 220, 220],
    'ghost white': [248, 248, 255],
    'gold': [255, 215, 0],
    'gold 2': [238, 201, 0],
    'gold 3': [205, 173, 0],
    'gold 4': [139, 117, 0],
    'golden rod': [218, 165, 32],
    'golden rod 1': [255, 193, 37],
    'golden rod 2': [238, 180, 34],
    'golden rod 3': [205, 155, 29],
    'golden rod 4': [139, 105, 20],
    'gray': [190, 190, 190],
    'gray 1': [3, 3, 3],
    'gray 2': [5, 5, 5],
    'gray 3': [8, 8, 8],
    'gray 4': [10, 10, 10],
    'gray 5': [13, 13, 13],
    'gray 6': [15, 15, 15],
    'gray 7': [18, 18, 18],
    'gray 8': [20, 20, 20],
    'gray 9': [23, 23, 23],
    'gray 10': [26, 26, 26],
    'gray 11': [28, 28, 28],
    'gray 12': [31, 31, 31],
    'gray 13': [33, 33, 33],
    'gray 14': [36, 36, 36],
    'gray 15': [38, 38, 38],
    'gray 16': [41, 41, 41],
    'gray 17': [43, 43, 43],
    'gray 18': [46, 46, 46],
    'gray 19': [48, 48, 48],
    'gray 20': [51, 51, 51],
    'gray 21': [54, 54, 54],
    'gray 22': [56, 56, 56],
    'gray 23': [59, 59, 59],
    'gray 24': [61, 61, 61],
    'gray 25': [64, 64, 64],
    'gray 26': [66, 66, 66],
    'gray 27': [69, 69, 69],
    'gray 28': [71, 71, 71],
    'gray 29': [74, 74, 74],
    'gray 30': [77, 77, 77],
    'gray 31': [79, 79, 79],
    'gray 32': [82, 82, 82],
    'gray 33': [84, 84, 84],
    'gray 34': [87, 87, 87],
    'gray 35': [89, 89, 89],
    'gray 36': [92, 92, 92],
    'gray 37': [94, 94, 94],
    'gray 38': [97, 97, 97],
    'gray 39': [99, 99, 99],
    'gray 40': [102, 102, 102],
    'gray 41': [105, 105, 105],
    'gray 42': [107, 107, 107],
    'gray 43': [110, 110, 110],
    'gray 44': [112, 112, 112],
    'gray 45': [115, 115, 115],
    'gray 46': [117, 117, 117],
    'gray 47': [120, 120, 120],
    'gray 48': [122, 122, 122],
    'gray 49': [125, 125, 125],
    'gray 50': [127, 127, 127],
    'gray 51': [130, 130, 130],
    'gray 52': [133, 133, 133],
    'gray 53': [135, 135, 135],
    'gray 54': [138, 138, 138],
    'gray 55': [140, 140, 140],
    'gray 56': [143, 143, 143],
    'gray 57': [145, 145, 145],
    'gray 58': [148, 148, 148],
    'gray 59': [150, 150, 150],
    'gray 60': [153, 153, 153],
    'gray 61': [156, 156, 156],
    'gray 62': [158, 158, 158],
    'gray 63': [161, 161, 161],
    'gray 64': [163, 163, 163],
    'gray 65': [166, 166, 166],
    'gray 66': [168, 168, 168],
    'gray 67': [171, 171, 171],
    'gray 68': [173, 173, 173],
    'gray 69': [176, 176, 176],
    'gray 70': [179, 179, 179],
    'gray 71': [181, 181, 181],
    'gray 72': [184, 184, 184],
    'gray 73': [186, 186, 186],
    'gray 74': [189, 189, 189],
    'gray 75': [191, 191, 191],
    'gray 76': [194, 194, 194],
    'gray 77': [196, 196, 196],
    'gray 78': [199, 199, 199],
    'gray 79': [201, 201, 201],
    'gray 80': [204, 204, 204],
    'gray 81': [207, 207, 207],
    'gray 82': [209, 209, 209],
    'gray 83': [212, 212, 212],
    'gray 84': [214, 214, 214],
    'gray 85': [217, 217, 217],
    'gray 86': [219, 219, 219],
    'gray 87': [222, 222, 222],
    'gray 88': [224, 224, 224],
    'gray 89': [227, 227, 227],
    'gray 90': [229, 229, 229],
    'gray 91': [232, 232, 232],
    'gray 92': [235, 235, 235],
    'gray 93': [237, 237, 237],
    'gray 94': [240, 240, 240],
    'gray 95': [242, 242, 242],
    'gray 97': [247, 247, 247],
    'gray 98': [250, 250, 250],
    'gray 99': [252, 252, 252],
    'green': [0, 255, 0],
    'green 2': [0, 238, 0],
    'green 3': [0, 205, 0],
    'green 4': [0, 139, 0],
    'green yellow': [173, 255, 47],
    'honeydew': [240, 255, 240],
    'honeydew 2': [224, 238, 224],
    'honeydew 3': [193, 205, 193],
    'honeydew 4': [131, 139, 131],
    'hot pink': [255, 105, 180],
    'hot pink 1': [255, 110, 180],
    'hot pink 2': [238, 106, 167],
    'hot pink 3': [205, 96, 144],
    'hot pink 4': [139, 58, 98],
    'indian red': [205, 92, 92],
    'indian red 1': [255, 106, 106],
    'indian red 2': [238, 99, 99],
    'indian red 3': [205, 85, 85],
    'indian red 4': [139, 58, 58],
    'ivory': [255, 255, 240],
    'ivory 2': [238, 238, 224],
    'ivory 3': [205, 205, 193],
    'ivory 4': [139, 139, 131],
    'khaki': [240, 230, 140],
    'khaki 1': [255, 246, 143],
    'khaki 2': [238, 230, 133],
    'khaki 3': [205, 198, 115],
    'khaki 4': [139, 134, 78],
    'lavender': [230, 230, 250],
    'lavender blush': [255, 240, 245],
    'lavender blush 2': [238, 224, 229],
    'lavender blush 3': [205, 193, 197],
    'lavender blush 4': [139, 131, 134],
    'lawn green': [124, 252, 0],
    'lemon chiffon': [255, 250, 205],
    'lemon chiffon 2': [238, 233, 191],
    'lemon chiffon 3': [205, 201, 165],
    'lemon chiffon 4': [139, 137, 112],
    'light': [238, 221, 130],
    'light blue': [173, 216, 230],
    'light blue 1': [191, 239, 255],
    'light blue 2': [178, 223, 238],
    'light blue 3': [154, 192, 205],
    'light blue 4': [104, 131, 139],
    'light coral': [240, 128, 128],
    'light cyan': [224, 255, 255],
    'light cyan 2': [209, 238, 238],
    'light cyan 3': [180, 205, 205],
    'light cyan 4': [122, 139, 139],
    'light golden rod': [255, 236, 139],
    'light golden rod 2': [238, 220, 130],
    'light golden rod 3': [205, 190, 112],
    'light golden rod 4': [139, 129, 76],
    'light golden rod yellow': [250, 250, 210],
    'light gray': [211, 211, 211],
    'light pink': [255, 182, 193],
    'light pink 1': [255, 174, 185],
    'light pink 2': [238, 162, 173],
    'light pink 3': [205, 140, 149],
    'light pink 4': [139, 95, 101],
    'light salmon': [255, 160, 122],
    'light salmon 2': [238, 149, 114],
    'light salmon 3': [205, 129, 98],
    'light salmon 4': [139, 87, 66],
    'light sea green': [32, 178, 170],
    'light sky blue': [135, 206, 250],
    'light sky blue 1': [176, 226, 255],
    'light sky blue 2': [164, 211, 238],
    'light sky blue 3': [141, 182, 205],
    'light sky blue 4': [96, 123, 139],
    'light slate blue': [132, 112, 255],
    'light slate gray': [119, 136, 153],
    'light steel blue': [176, 196, 222],
    'light steel blue 1': [202, 225, 255],
    'light steel blue 2': [188, 210, 238],
    'light steel blue 3': [162, 181, 205],
    'light steel blue 4': [110, 123, 139],
    'light yellow': [255, 255, 224],
    'light yellow 2': [238, 238, 209],
    'light yellow 3': [205, 205, 180],
    'light yellow 4': [139, 139, 122],
    'lime green': [50, 205, 50],
    'linen': [250, 240, 230],
    'magenta': [255, 0, 255],
    'magenta 2': [238, 0, 238],
    'magenta 3': [205, 0, 205],
    'magenta 4': [139, 0, 139],
    'maroon': [176, 48, 96],
    'maroon 1': [255, 52, 179],
    'maroon 2': [238, 48, 167],
    'maroon 3': [205, 41, 144],
    'maroon 4': [139, 28, 98],
    'medium': [102, 205, 170],
    'medium aquamarine': [102, 205, 170],
    'medium blue': [0, 0, 205],
    'medium orchid': [186, 85, 211],
    'medium orchid 1': [224, 102, 255],
    'medium orchid 2': [209, 95, 238],
    'medium orchid 3': [180, 82, 205],
    'medium orchid 4': [122, 55, 139],
    'medium purple': [147, 112, 219],
    'medium purple 1': [171, 130, 255],
    'medium purple 2': [159, 121, 238],
    'medium purple 3': [137, 104, 205],
    'medium purple 4': [93, 71, 139],
    'medium sea green': [60, 179, 113],
    'medium slate blue': [123, 104, 238],
    'medium spring green': [0, 250, 154],
    'medium turquoise': [72, 209, 204],
    'medium violet red': [199, 21, 133],
    'midnight blue': [25, 25, 112],
    'mint cream': [245, 255, 250],
    'misty rose': [255, 228, 225],
    'misty rose 2': [238, 213, 210],
    'misty rose 3': [205, 183, 181],
    'misty rose 4': [139, 125, 123],
    'moccasin': [255, 228, 181],
    'navajo white': [255, 222, 173],
    'navajo white 2': [238, 207, 161],
    'navajo white 3': [205, 179, 139],
    'navajo white 4': [139, 121, 94],
    'navy blue': [0, 0, 128],
    'old lace': [253, 245, 230],
    'olive drab': [107, 142, 35],
    'olive drab 1': [192, 255, 62],
    'olive drab 2': [179, 238, 58],
    'olive drab 4': [105, 139, 34],
    'orange': [255, 165, 0],
    'orange 2': [238, 154, 0],
    'orange 3': [205, 133, 0],
    'orange 4': [139, 90, 0],
    'orange red': [255, 69, 0],
    'orange red 2': [238, 64, 0],
    'orange red 3': [205, 55, 0],
    'orange red 4': [139, 37, 0],
    'orchid': [218, 112, 214],
    'orchid 1': [255, 131, 250],
    'orchid 2': [238, 122, 233],
    'orchid 3': [205, 105, 201],
    'orchid 4': [139, 71, 137],
    'pale': [219, 112, 147],
    'pale golden rod': [238, 232, 170],
    'pale green': [152, 251, 152],
    'pale green 1': [154, 255, 154],
    'pale green 2': [144, 238, 144],
    'pale green 3': [124, 205, 124],
    'pale green 4': [84, 139, 84],
    'pale turquoise': [175, 238, 238],
    'pale turquoise 1': [187, 255, 255],
    'pale turquoise 2': [174, 238, 238],
    'pale turquoise 3': [150, 205, 205],
    'pale turquoise 4': [102, 139, 139],
    'pale violet red': [219, 112, 147],
    'pale violet red 1': [255, 130, 171],
    'pale violet red 2': [238, 121, 159],
    'pale violet red 3': [205, 104, 137],
    'pale violet red 4': [139, 71, 93],
    'papaya whip': [255, 239, 213],
    'peach puff': [255, 218, 185],
    'peach puff 2': [238, 203, 173],
    'peach puff 3': [205, 175, 149],
    'peach puff 4': [139, 119, 101],
    'pink': [255, 192, 203],
    'pink 1': [255, 181, 197],
    'pink 2': [238, 169, 184],
    'pink 3': [205, 145, 158],
    'pink 4': [139, 99, 108],
    'plum': [221, 160, 221],
    'plum 1': [255, 187, 255],
    'plum 2': [238, 174, 238],
    'plum 3': [205, 150, 205],
    'plum 4': [139, 102, 139],
    'powder blue': [176, 224, 230],
    'purple': [160, 32, 240],
    'purple 1': [155, 48, 255],
    'purple 2': [145, 44, 238],
    'purple 3': [125, 38, 205],
    'purple 4': [85, 26, 139],
    'rebecca purple': [102, 51, 153],
    'red': [255, 0, 0],
    'red 2': [238, 0, 0],
    'red 3': [205, 0, 0],
    'red 4': [139, 0, 0],
    'rosy brown': [188, 143, 143],
    'rosy brown 1': [255, 193, 193],
    'rosy brown 2': [238, 180, 180],
    'rosy brown 3': [205, 155, 155],
    'rosy brown 4': [139, 105, 105],
    'royal blue': [65, 105, 225],
    'royal blue 1': [72, 118, 255],
    'royal blue 2': [67, 110, 238],
    'royal blue 3': [58, 95, 205],
    'royal blue 4': [39, 64, 139],
    'saddle brown': [139, 69, 19],
    'salmon': [250, 128, 114],
    'salmon 1': [255, 140, 105],
    'salmon 2': [238, 130, 98],
    'salmon 3': [205, 112, 84],
    'salmon 4': [139, 76, 57],
    'sandy brown': [244, 164, 96],
    'sea green': [84, 255, 159],
    'sea green 2': [78, 238, 148],
    'sea green 3': [67, 205, 128],
    'sea green 4': [46, 139, 87],
    'seashell': [255, 245, 238],
    'seashell 2': [238, 229, 222],
    'seashell 3': [205, 197, 191],
    'seashell 4': [139, 134, 130],
    'sienna': [160, 82, 45],
    'sienna 1': [255, 130, 71],
    'sienna 2': [238, 121, 66],
    'sienna 3': [205, 104, 57],
    'sienna 4': [139, 71, 38],
    'sky blue': [135, 206, 235],
    'sky blue 1': [135, 206, 255],
    'sky blue 2': [126, 192, 238],
    'sky blue 3': [108, 166, 205],
    'sky blue 4': [74, 112, 139],
    'slate blue': [106, 90, 205],
    'slate blue 1': [131, 111, 255],
    'slate blue 2': [122, 103, 238],
    'slate blue 3': [105, 89, 205],
    'slate blue 4': [71, 60, 139],
    'slate gray': [112, 128, 144],
    'slate gray 1': [198, 226, 255],
    'slate gray 2': [185, 211, 238],
    'slate gray 3': [159, 182, 205],
    'slate gray 4': [108, 123, 139],
    'snow': [255, 250, 250],
    'snow 2': [238, 233, 233],
    'snow 3': [205, 201, 201],
    'snow 4': [139, 137, 137],
    'spring green': [0, 255, 127],
    'spring green 2': [0, 238, 118],
    'spring green 3': [0, 205, 102],
    'spring green 4': [0, 139, 69],
    'steel blue': [70, 130, 180],
    'steel blue 1': [99, 184, 255],
    'steel blue 2': [92, 172, 238],
    'steel blue 3': [79, 148, 205],
    'steel blue 4': [54, 100, 139],
    'tan': [210, 180, 140],
    'tan 1': [255, 165, 79],
    'tan 2': [238, 154, 73],
    'tan 3': [205, 133, 63],
    'tan 4': [139, 90, 43],
    'thistle': [216, 191, 216],
    'thistle 1': [255, 225, 255],
    'thistle 2': [238, 210, 238],
    'thistle 3': [205, 181, 205],
    'thistle 4': [139, 123, 139],
    'tomato': [255, 99, 71],
    'tomato 2': [238, 92, 66],
    'tomato 3': [205, 79, 57],
    'tomato 4': [139, 54, 38],
    'transparent': [0, 0, 0, 0],
    'turquoise': [64, 224, 208],
    'turquoise 1': [0, 245, 255],
    'turquoise 2': [0, 229, 238],
    'turquoise 3': [0, 197, 205],
    'turquoise 4': [0, 134, 139],
    'violet': [238, 130, 238],
    'violet red': [208, 32, 144],
    'violet red 1': [255, 62, 150],
    'violet red 2': [238, 58, 140],
    'violet red 3': [205, 50, 120],
    'violet red 4': [139, 34, 82],
    'wheat': [245, 222, 179],
    'wheat 1': [255, 231, 186],
    'wheat 2': [238, 216, 174],
    'wheat 3': [205, 186, 150],
    'wheat 4': [139, 126, 102],
    'white': [255, 255, 255],
    'white smoke': [245, 245, 245],
    'yellow': [255, 255, 0],
    'yellow 2': [238, 238, 0],
    'yellow 3': [205, 205, 0],
    'yellow 4': [139, 139, 0],
    'yellow green': [154, 205, 50]
};

class ColorHelper {
    static isColorValue(value) {
        return value >= 0 && value <= 255;
    }
    static isAlphaValue(value) {
        return value >= 0 && value <= 1;
    }
    static isRGBArray(rgb) {
        if (rgb.length === 3) {
            for (let i = 0; i < 3; i++) {
                if (!ColorHelper.isColorValue(rgb[i])) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    static isRGBAArray(rgba) {
        if (rgba.length === 4) {
            for (let i = 0; i < 3; i++) {
                if (!ColorHelper.isColorValue(rgba[i])) {
                    return false;
                }
            }
            return ColorHelper.isAlphaValue(rgba[3]);
        }
        return false;
    }
    static isHex3(colorString) {
        return /^#[0-9a-fA-F]{3}/.test(colorString);
    }
    static isHex6(colorString) {
        return /^#[0-9a-fA-F]{6}/.test(colorString);
    }
    // eslint-disable-next-line consistent-return
    static parseColorString(colorString) {
        const c = colorString;
        if (ColorHelper.isHex6(c)) {
            return [parseInt(c.substring(1, 3), 16), parseInt(c.substring(3, 5), 16), parseInt(c.substring(5, 7), 16)];
        }
        if (ColorHelper.isHex3(c)) {
            return [parseInt(c[1] + c[1], 16), parseInt(c[2] + c[2], 16), parseInt(c[3] + c[3], 16)];
        }
        let m;
        // eslint-disable-next-line no-cond-assign
        if (m = c.match(/rgb\( ?(\d+), ?(\d+), ?(\d+) ?\)/)) {
            const r = parseInt(m[1], 10);
            const g = parseInt(m[2], 10);
            const b = parseInt(m[3], 10);
            if (ColorHelper.isColorValue(r) && ColorHelper.isColorValue(g) && ColorHelper.isColorValue(b)) {
                return [r, g, b];
            }
        }
        // eslint-disable-next-line no-cond-assign
        if (m = c.match(/rgba\( ?(\d+), ?(\d+), ?(\d+), ?(\d+.?\d*) ?\)/)) {
            const r = parseInt(m[1], 10);
            const g = parseInt(m[2], 10);
            const b = parseInt(m[3], 10);
            const a = parseFloat(m[4]);
            if (ColorHelper.isColorValue(r) && ColorHelper.isColorValue(g) && ColorHelper.isColorValue(b) && ColorHelper.isAlphaValue(a)) {
                return [r, g, b, a];
            }
        }
        const name = ColorHelper.getColorName(c);
        if (name) {
            return name;
        }
    }
    // eslint-disable-next-line consistent-return
    static getColorName(colorString) {
        const colStr = colorString.toLowerCase();
        if (colStr in ColorNames) {
            return ColorNames[colStr];
        }
        if (/ 1$/.test(colStr)) {
            // some color names had a 1 (eg. "blue 1') but none without the 1
            // the 1's were removed from colorNames, and this code was added to support either case
            const noOne = colStr.replace(/ 1$/, '');
            if (noOne in ColorNames) {
                return ColorNames[noOne];
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static isHSL(hsla) {
        return (typeof hsla === 'object' &&
            'h' in hsla && ColorHelper.isAlphaValue(hsla.h) &&
            's' in hsla && ColorHelper.isAlphaValue(hsla.s) &&
            'l' in hsla && ColorHelper.isAlphaValue(hsla.l) &&
            !('a' in hsla));
    }
    static rgb2hex(c) {
        const r = ColorHelper.int2hex(Math.round(c[0]));
        const g = ColorHelper.int2hex(Math.round(c[1]));
        const b = ColorHelper.int2hex(Math.round(c[2]));
        if (r[0] === r[1] && g[0] === g[1] && b[0] === b[1])
            return ('#' + r[0] + g[0] + b[0]); // .toLowerCase();
        return ('#' + r + g + b); // .toLowerCase();
    }
    static int2hex(i) {
        const v = i.toString(16);
        return v.length === 1 ? '0' + v : v;
    }
    static hslval(x, y, r) {
        if (r < 0)
            r += 1;
        if (r > 1)
            r -= 1;
        let c;
        if (6 * r < 1)
            c = x + (y - x) * 6 * r;
        else if (2 * r < 1)
            c = y;
        else if (3 * r < 2)
            c = x + (y - x) * ((2 / 3) - r) * 6;
        else
            c = x;
        return c * 255;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static hsl2rgb(hsl) {
        const h = hsl.h, s = hsl.s, l = hsl.l;
        let r, g, b;
        if (s === 0) {
            r = g = b = l * 255;
        }
        else {
            let y;
            if (l < 0.5)
                y = l * (1 + s);
            else
                y = l + s - l * s;
            const x = 2 * l - y;
            r = ColorHelper.hslval(x, y, h + 1 / 3);
            g = ColorHelper.hslval(x, y, h);
            b = ColorHelper.hslval(x, y, h - 1 / 3);
        }
        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);
        return [r, g, b];
    }
    static rgb2hsl(rgb) {
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;
        const x = Math.max(r, g, b);
        const n = Math.min(r, g, b);
        const l = (x + n) / 2;
        let s = 0, h = 0;
        if (x === n) {
            s = 0;
            h = 0;
        }
        else {
            const d = x - n;
            if (l > 0.5)
                s = d / (2 - x - n);
            else
                s = d / (x + n);
            if (x === r)
                h = (g - b) / d + (g < b ? 6 : 0);
            if (x === g)
                h = 2 + (b - r) / d;
            if (x === b)
                h = 4 + (r - g) / d;
            h /= 6;
            if (h < 0)
                h += 1;
        }
        return {
            h,
            s,
            l
        };
    }
    static combine(s, t, amount) {
        amount = typeof amount === 'number' ? amount : 0.5;
        const r = Math.round((t[0] - s[0]) * amount);
        const g = Math.round((t[1] - s[1]) * amount);
        const b = Math.round((t[2] - s[2]) * amount);
        const rgb = [s[0] + r, s[1] + g, s[2] + b];
        if (s.length === 4)
            rgb[3] = s[3];
        return rgb;
    }
    static invert(c) {
        const rgba = c.slice();
        for (let i = 0; i < 3; i++) {
            rgba[i] = 255 - rgba[i];
        }
        return rgba;
    }
    static tint(sourceHue, targetHue, amount) {
        const sH = sourceHue;
        const tH = targetHue;
        const diff = tH - sH;
        const dH = diff * amount;
        let newh = sH + dH;
        if (newh < 0)
            newh += 1;
        if (newh > 1)
            newh -= 1;
        return newh;
    }
}

/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/** @class Color
* Color class accepts a CSS color string, rgb, hsl data as the input, manipulate the color, and returns a CSS-compatible color string.
* @constructor
*
* @example
* new Color('red')  // named CSS colors
*
* @example
* new Color('red', 0.5)  // named CSS colors and transparency
*
* @example
* new Color('#f00')  // hex 3 characters
*
* @example
* new Color('#e2b644')  // hex 6 characters
*
* @example
* new Color('rgb(255, 0, 100)')  // rgb()
*
* @example
* new Color('rgba(255, 0, 100, 0.5)')  // rgba()
*
* @example
* new Color('rgba(255, 0, 100, 0.5)', 0.1)  // 0.1 overrides alpha from rgba
*
* @example
* new Color([255,0,0])  // rgb array
*
* @example
* new Color([255,0,0], 0.5)  // rgb and transparency
*
* @example
* new Color({  // hsl object
*     h: 0.2,
*     s: 0.5,
*     l: 1
* })
*
* @example
* new Color({  // hsl object and transparency
*     h: 0.5,
*     s: 1,
*     l: 1
* }, 0.5)
*/
class Color {
    rgb;
    hsl;
    a;
    constructor(red, green, blue, alpha) {
        if (arguments.length === 0) {
            this.rgb = [0, 0, 0];
            this.a = 0;
        }
        else if (typeof arguments[0] === 'number') {
            if (arguments.length === 3 && ColorHelper.isRGBArray([red, green, blue])) {
                this.rgb = [red, green, blue];
                this.a = 1;
            }
            else if (arguments.length === 4 && ColorHelper.isRGBAArray([red, green, blue, alpha])) {
                this.rgb = [red, green, blue];
                this.a = alpha;
            }
            else
                throw Error('invalid color');
        }
        else if (typeof arguments[0] === 'string') {
            const rgba = ColorHelper.parseColorString(arguments[0]);
            if (rgba) {
                this.rgb = rgba.slice(0, 3);
                if (arguments.length === 2 && ColorHelper.isAlphaValue(arguments[1])) {
                    this.a = arguments[1];
                }
                else if (rgba.length === 4) {
                    this.a = rgba[3];
                }
                else {
                    this.a = 1;
                }
            }
            else
                throw Error('invalid color');
        }
        else if (typeof arguments[0] === 'object') {
            const obj = arguments[0];
            if (obj.length > 0) {
                if (obj.length === 3 && ColorHelper.isRGBArray(obj)) {
                    this.rgb = obj.slice(0, 3);
                    if (arguments.length === 2) {
                        if (ColorHelper.isAlphaValue(arguments[1])) {
                            this.a = arguments[1];
                        }
                        else
                            throw new Error('invalid alpha value');
                    }
                    else {
                        this.a = 1;
                    }
                }
                else
                    throw Error('invalid color');
            }
            else {
                if (obj instanceof Color) {
                    if (obj.hsl) {
                        this.hsl = {
                            h: obj.hsl.h,
                            s: obj.hsl.s,
                            l: obj.hsl.l
                        };
                    }
                    if (obj.rgb) {
                        this.rgb = obj.rgb.slice();
                    }
                    if (arguments.length === 2) {
                        if (ColorHelper.isAlphaValue(arguments[1])) {
                            this.a = arguments[1];
                        }
                        else
                            throw new Error('invalid alpha value');
                    }
                    else {
                        this.a = obj.a;
                    }
                }
                else if (ColorHelper.isHSL(obj)) {
                    this.hsl = {
                        h: obj.h,
                        s: obj.s,
                        l: obj.l
                    };
                    if (arguments.length === 2) {
                        if (ColorHelper.isAlphaValue(arguments[1])) {
                            this.a = arguments[1];
                        }
                        else
                            throw new Error('invalid alpha value');
                    }
                    else {
                        this.a = 1;
                    }
                }
                else
                    throw Error('invalid color');
            }
        }
        else
            throw new Error('invalid color');
    }
    _getRGB() {
        if (!this.rgb) {
            this.rgb = ColorHelper.hsl2rgb(this.hsl);
        }
        return this.rgb;
    }
    /**
     * Return the red, green, blue color values with the alpha channel as an array
     *
     * @method getRGB
     * @memberof Color
     * @return {Array} rgba the array of color values
     * @instance
     *
     * @example
     * new Color('red).getRGB();   // returns [255,0,0]
     *
     */
    getRGB() {
        return this._getRGB().slice();
    }
    /**
     * Returns the hexadecimal value of the color
     *
     * @method getHex
     * @memberof Color
     * @return {String} hex color value
     * @instance
     *
     * @example
     * new Color('rgba(255,0,0,0.5)').getHex(); // returns "#f00"
     *
     */
    getHex() {
        return ColorHelper.rgb2hex(this._getRGB());
    }
    _getHSL() {
        if (!this.hsl) {
            this.hsl = ColorHelper.rgb2hsl(this.rgb);
        }
        return this.hsl;
    }
    /**
     * Returns an [h,s,l] array from color string
     *
     * @method getHSL
     * @memberof Color
     * @return {Number[]} hsl array of [hue,saturation,lightness]
     * @instance
     *
     * @example
     * new Color('#f00').getHSL(); // returns [0,1,0.5]
     *
     */
    getHSL() {
        const hsl = this._getHSL();
        return {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        };
    }
    /**
     * Returns the red component of a color string
     *
     * @method getRed
     * @memberof Color
     * @return {Number} red component 0-255
     * @instance
     *
     * @example
     * new Color('#fff').getRed(); // returns 255
     *
     */
    getRed() {
        return this._getRGB()[0];
    }
    /**
     * Set the red component of a color
     *
     * @method setRed
     * @memberof Color
     * @param {Number} red red component 0-255
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('rgb(0,0,255)').red(255).toString();  // returns "#F0F"
     *
     */
    setRed(red) {
        if (ColorHelper.isColorValue(red)) {
            const rgb = this._getRGB();
            return new Color([red, rgb[1], rgb[2]], this.a);
        }
        else
            throw new Error('invalid red');
    }
    /**
     * Returns the green component of a color string
     *
     * @method getGreen
     * @memberof Color
     * @return {Number} green component 0-255
     * @instance
     *
     * @example
     * new Color('#fff').getGreen(); // returns 255
     *
     */
    getGreen() {
        return this._getRGB()[1];
    }
    /**
     * Set the green component of a color
     *
     * @method setGreen
     * @memberof Color
     * @param {Number} green green component 0-255
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('rgb(255,0,0)').green(255).toString();  // returns "#FF0"
     *
     */
    setGreen(green) {
        if (ColorHelper.isColorValue(green)) {
            const rgb = this._getRGB();
            return new Color([rgb[0], green, rgb[2]], this.a);
        }
        else
            throw new Error('invalid green');
    }
    /**
     * Returns the blue component of a color string
     *
     * @method getBlue
     * @memberof Color
     * @return {Number} blue component 0-255
     * @instance
     *
     * @example
     * new Color('#fff').getBlue(); // returns 255
     *
     */
    getBlue() {
        return this._getRGB()[2];
    }
    /**
     * Set the blue component of a color
     *
     * @method setBlue
     * @memberof Color
     * @param {Number} blue blue component 0-255
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('#FF0').blue(255).toString();  // returns "#FFF"
     *
     */
    setBlue(blue) {
        if (ColorHelper.isColorValue(blue)) {
            const rgb = this._getRGB();
            return new Color([rgb[0], rgb[1], blue], this.a);
        }
        else
            throw new Error('invalid blue');
    }
    /**
     * Returns the transparency of a color
     *
     * @method getAlpha
     * @memberof Color
     * @return {Number} alpha transparency level between 0 and 1
     * @instance
     *
     * @example
     * new Color('#F00').getAlpha(); // returns 0
     * new Color('rgba(255,0,0,0.5)').getAlpha(); // returns 0.5
     *
     */
    getAlpha() {
        return this.a;
    }
    /**
     * Sets the transparency of a color
     *
     * @method setAlpha
     * @memberof Color
     * @param {Number} alpha transparency level between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('#f00').alpha(0.5).toString();  // returns "rgba(255,0,0,0.5)"
     *
     */
    setAlpha(alpha) {
        if (ColorHelper.isAlphaValue(alpha)) {
            if (this.hsl) {
                return new Color(this.getHSL(), alpha);
            }
            else {
                return new Color(this.getRGB(), alpha);
            }
        }
        else {
            throw new Error('invalid alpha value');
        }
    }
    /**
     * Return the "saturation" of a color
     *
     * @method getSaturation
     * @memberof Color
     * @return {Number} saturation saturation value between 0 and 1
     * @instance
     v
     * @example
     * new Color('rgb(100,100,100)').getSaturation(); // returns 0
     * new Color('rgb(100,50,100)').getSaturation();  // returns 0.8333333333333334
     * new Color('rgb(100,0,100)').getSaturation();   // returns 1
     *
     */
    getSaturation() {
        const hsl = this._getHSL();
        return hsl.s;
    }
    /**
     * Set the "saturation" of a color
     *
     * @method setSaturation
     * @memberof Color
     * @param {Number} saturation saturation value between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color(100,50,50).saturation(0.5).toString().toBe("#712626");
     *
     */
    setSaturation(saturation) {
        if (ColorHelper.isAlphaValue(saturation)) {
            const hsl = this._getHSL();
            return new Color({
                h: hsl.h,
                s: saturation,
                l: hsl.l
            }, this.a);
        }
        else
            throw new Error('invalid saturation');
    }
    /**
     * Increases the "saturation" of a color value
     *
     * @method increaseSaturate
     * @memberof Color
     * @param {Number} saturateBy amount to saturate between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('corn silk 3').saturate(0.1).toString(); // returns "#d3ccab"
     *
     */
    increaseSaturate(amount) {
        if (amount >= -1 && amount <= 1) {
            let s = this.getSaturation();
            s += amount;
            if (s > 1)
                s = 1;
            if (s < 0)
                s = 0;
            return this.setSaturation(s);
        }
        else
            throw new Error('invalid saturate');
    }
    /**
     * Decreases the "saturation" of a color value
     *
     * @method decreaseSaturate
     * @memberof Color
     * @param {Number} amount amount to desaturate between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('#d3ccab').desaturate(0.1).toString(); // returns "#cdc8b1"
     *
     */
    decreaseSaturate(amount) {
        return this.increaseSaturate(-amount);
    }
    /**
     * Return the "hue" of a color
     *
     * @method getHue
     * @memberof Color
     * @return {Number} hue hue value between 0 and 1
     * @instance
     *
     * @example
     * new Color('#a1b2c1').getHue(); // returns "0.578125"}
     * new Color('#f00').getHue(); // returns 0
     * new Color('#0f0').getHue(); // returns 0.3333333333333333
     * new Color('#00f').getHue(); // returns 0.6666666666666666
     *
     */
    getHue() {
        const hsl = this._getHSL();
        return hsl.h;
    }
    /**
     * Set the "hue" of a color
     *
     * @method setHue
     * @memberof Color
     * @param {Number} hue hue value between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('#f00').hue(2/3).toString(); // returns "#00f"
     * new Color('#0f0').hue(1/3).toString(); // returns "#0f0"
     * new Color('#00f').hue(0.23).toString(); // returns "#9eff00"
     *
     */
    setHue(hue) {
        if (ColorHelper.isAlphaValue(hue)) {
            const hsl = this._getHSL();
            return new Color({
                h: hue,
                s: hsl.s,
                l: hsl.l
            }, this.a);
        }
        else
            throw new Error('invalid hue');
    }
    /**
     * Shifts the "hue" of a color value by a given percentage
     *
     * @method shiftHue
     * @memberof Color
     * @param {Number} hueShift amount to modify the hue by between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color(255,255,0).shiftHue(0.25).toString(); // returns "#00ff7f"
     *
     */
    shiftHue(amount) {
        const hsl = this._getHSL();
        let newHue = hsl.h + amount;
        if (newHue > 1) {
            const x = Math.floor(newHue);
            newHue -= x;
        }
        if (newHue < -1) {
            const x = Math.floor(newHue);
            newHue += Math.abs(x);
        }
        if (newHue < 0) {
            newHue += 1;
        }
        return new Color({
            h: newHue,
            s: hsl.s,
            l: hsl.l
        }, this.a);
    }
    /**
     * Return the lightness of a color (how close to white or black the color is)
     *
     * @method getLightness
     * @memberof Color
     * @return {Number} lightness lightness value between 0 and 1
     * @instance
     *
     * @example
     * new Color('rgb(0,0,0)').getLightness();       // returns 0
     * new Color('rgb(100,50,100)').getLightness();  // returns 0.29411764705882354
     * new Color('rgb(255,255,255)').getLightness(); // returns 1
     *
     */
    getLightness() {
        const hsl = this._getHSL();
        return hsl.l;
    }
    /**
     * Set the lightness of a color, how close to white or black the color will be
     *
     * @method setLightness
     * @memberof Color
     * @param {Number} lightness lightness value between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('rgb(255,0,0)').lightness(0).toString(); // returns "#000"
     * new Color('rgb(255,0,0)').lightness(0.5).toString(); // returns "#F00"
     * new Color('rgb(255,0,0)').lightness(1).toString(); // returns "#FFF"
     *
     */
    setLightness(lightness) {
        if (ColorHelper.isAlphaValue(lightness)) {
            const hsl = this._getHSL();
            return new Color({
                h: hsl.h,
                s: hsl.s,
                l: lightness
            }, this.a);
        }
        else {
            return new Color(255, 255, 255);
        }
    }
    /**
     * Increases the "lightness" of a color value
     *
     * @method increaseLighten
     * @memberof Color
     * @param {Number} amount amount to lighten between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('#f00').lighten(0.5).toString(); // returns "#FF8080"
     *
     */
    increaseLightness(amount) {
        if (amount >= -1 && amount <= 1) {
            const hsl = this._getHSL();
            let l = hsl.l + amount;
            if (l > 1)
                l = 1;
            if (l < 0)
                l = 0;
            return new Color({
                h: hsl.h,
                s: hsl.s,
                l
            }, this.a);
        }
        else
            throw new Error('invalid lighten');
    }
    /**
     * Decreases the "lightness" of a color value
     *
     * @method decreaseLighten
     * @memberof Color
     * @param {Number} darkenBy amount to darken between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('#f00').darken(0.5).toString(); // returns "#800000"
     *
     */
    decreaseLightness(amount) {
        return this.increaseLightness(-amount);
    }
    /**
     * Changes the color closer to another color by a given percentage
     *
     * @method combine
     * @memberof Color
     * @param {Object} colorValue color string, array, or object
     * @param {Number} [amount=0.5] how close to the target color between 0 and 1 (0.5 is half-way between)
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('black').combine('red', 0.5).toString(); // returns "#800000"
     *
     */
    combine(colorValue, amount) {
        if (ColorHelper.isAlphaValue(amount)) {
            let color;
            if (colorValue instanceof Color) {
                color = colorValue;
            }
            else {
                color = new Color(colorValue);
            }
            const newRgb = ColorHelper.combine(this._getRGB(), color._getRGB(), amount);
            return new Color(newRgb, this.a);
        }
        else
            throw new Error('invalid combine amount');
    }
    /**
     * Inverts the color
     *
     * @method invert
     * @memberof Color
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('#f00').invert(1).toString(); // returns "#0FF"
     * new Color('#fff').invert().toString();  // returns "#000"
     *
     */
    invert() {
        return new Color(ColorHelper.invert(this._getRGB()), this.a);
    }
    /**
     * Shifts only the hue of a color closer to another color by a given percentage
     *
     * @method tint
     * @memberof Color
     * @param {String} colorValue color string or array
     * @param {Number} amount amount to shift the hue toward the target color between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('#f00').tint('#00f',0.5).toString(); // returns "#0f0"
     * new Color('rgb(0,0,100)').tint('rgb(100,0,0)',0.1).toString(); // returns "#002864"
     *
     */
    tint(colorValue, amount) {
        let color;
        if (colorValue instanceof Color) {
            color = colorValue;
        }
        else {
            color = new Color(colorValue);
        }
        if (typeof amount === 'undefined') {
            amount = 0.5;
        }
        const h = ColorHelper.tint(this.getHue(), color.getHue(), amount);
        return new Color({
            h,
            s: this.hsl.s,
            l: this.hsl.l
        }, this.a);
    }
    /**
     * Вернуть этот же цвет, но с модифицированным альфа значением
     * @param amount Альфа значение от 0 до 1
     * @returns {Color} new Color() instance
     */
    toModifyAlpha(amount) {
        const rgb = this._getRGB();
        return new Color(rgb[0], rgb[1], rgb[2], amount);
    }
    /**
     * Вернуть этот же цвет, но с модифицированным альфа значением или текущий цвет
     * @param amount Альфа значение от 0 до 1
     * @returns {Color} new Color() instance
     */
    toModifyAlphaOrThis(amount) {
        if (amount) {
            const rgb = this._getRGB();
            return new Color(rgb[0], rgb[1], rgb[2], amount);
        }
        else {
            return this;
        }
    }
    /**
     * Returns the CSS string of the color, either as hex value, or rgba if an alpha value is defined
     *
     * @method toString
     * @memberof Color
     * @return {String} css color value
     * @instance
     *
     * @example
     * new Color('rgb(0,0,255)').toString(); // returns "#00f"
     *
     */
    toString(isHex) {
        if (this.a === 0) {
            return 'transparent';
        }
        if (this.a < 1) {
            const rgb = this._getRGB();
            return 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + this.a + ')';
        }
        else {
            if (isHex) {
                return this.getHex();
            }
            else {
                const rgb = this._getRGB();
                return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
            }
        }
    }
    /**
     * Преобразование в CSS rgb/rgba значения
     * @param modifyAlpha Модификация значения альфы от 0 до 1
     * @param addSemicolon Добавить точку с запятой в конце
     * @returns {String} CSS rgb/rgba значение
     */
    toCSSRgbValue(modifyAlpha, addSemicolon) {
        let textColor = '';
        if (modifyAlpha) {
            const rgb = this._getRGB();
            textColor = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + modifyAlpha + ')';
            if (addSemicolon) {
                textColor = textColor + ';';
            }
            return textColor;
        }
        if (this.a === 0) {
            textColor = 'transparent;';
        }
        if (this.a < 1) {
            const rgb = this._getRGB();
            textColor = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + this.a + ')';
        }
        else {
            const rgb = this._getRGB();
            textColor = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
        }
        if (addSemicolon) {
            textColor = textColor + ';';
        }
        return textColor;
    }
    /**
     * Получить яркость цвета
     * @returns Яркость цвета
     */
    luma() {
        const rgb = this._getRGB();
        return (0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2]);
    }
    /**
     * Получить цвет и цвет тени гармоничный к текущему
     * @returns Цвет и цвет тени гармоничный к текущему
     */
    createHarmoniousColorAndShadow() {
        const hsl = this._getHSL();
        let h = hsl.h * 360;
        let s = hsl.s * 100;
        let l = hsl.l * 100;
        /* originals*/
        const o_h = h, o_s = s, o_l = l;
        s = 100;
        if (o_s <= 25) {
            if (o_l > 60) {
                l = 10;
            }
            else {
                l = 95;
            }
        }
        else {
            if ((o_h >= 25 && o_h <= 195) || o_h >= 295) {
                l = 10;
            }
            else if ((o_h >= 285 && o_h < 295) || (o_h > 195 && o_h <= 205)) {
                h = 60;
                l = 50;
            }
            else {
                l = 95;
            }
        }
        if ((o_h >= 295 || (o_h > 20 && o_h < 200)) && o_l <= 35) {
            l = 95;
        }
        else if (((o_h < 25 || o_h > 275) && o_l >= 60) || (o_h > 195 && o_l >= 70)) {
            l = 10;
        }
        let s_l = l;
        let s_h = h;
        const s_s = o_s;
        /* shadow*/
        if (l < 25) {
            s_l = 80;
        }
        else {
            s_l = 10;
        }
        if (h == 60 && (l < 90 || l > 20)) {
            s_h = 320;
        }
        else {
            s_h = h;
        }
        const textColor = { h: h / 360, s: s / 100, l: l / 100 };
        const shadowColor = { h: s_h / 360, s: s_s / 100, l: s_l / 100 };
        return { text: new Color(textColor, 1), shadow: new Color(shadowColor, 0.5) };
    }
    /**
     * Получить цвет гармоничный к текущему
     * @returns Цвет гармоничный к текущему
     */
    createHarmoniousColor() {
        const hsl = this._getHSL();
        let h = hsl.h * 360;
        let s = hsl.s * 100;
        let l = hsl.l * 100;
        /* originals*/
        const o_h = h, o_s = s, o_l = l;
        s = 100;
        if (o_s <= 25) {
            if (o_l > 60) {
                l = 10;
            }
            else {
                l = 95;
            }
        }
        else {
            if ((o_h >= 25 && o_h <= 195) || o_h >= 295) {
                l = 10;
            }
            else if ((o_h >= 285 && o_h < 295) || (o_h > 195 && o_h <= 205)) {
                h = 60;
                l = 50;
            }
            else {
                l = 95;
            }
        }
        if ((o_h >= 295 || (o_h > 20 && o_h < 200)) && o_l <= 35) {
            l = 95;
        }
        else if (((o_h < 25 || o_h > 275) && o_l >= 60) || (o_h > 195 && o_l >= 70)) {
            l = 10;
        }
        const textColor = { h: h / 360, s: s / 100, l: l / 100 };
        return new Color(textColor, 1);
    }
    /**
     * Получить цвет контрастный к текущему
     * @returns Цвет контрастный к текущему
     */
    createContrastColor() {
        return (this.luma() >= 165) ? new Color(255, 255, 255) : new Color(0, 0, 0);
    }
    /**
     * Получить цвет контрастный или гармоничный к текущему
     * @param isHarmonious Гармоничный цвет текста
     * @returns Цвет контрастный или гармоничный к текущему
     */
    createContrastOrHarmoniousColor(isHarmonious) {
        if (isHarmonious) {
            return this.createHarmoniousColor();
        }
        else {
            return this.createContrastColor();
        }
    }
}

class Colors {
    static alice_blue = new Color(240, 248, 255);
    static antique_white = new Color(250, 235, 215);
    static antique_white_1 = new Color(255, 239, 219);
    static antique_white_2 = new Color(238, 223, 204);
    static antique_white_3 = new Color(205, 192, 176);
    static antique_white_4 = new Color(139, 131, 120);
    static aquamarine = new Color(127, 255, 212);
    static aquamarine_2 = new Color(118, 238, 198);
    static aquamarine_4 = new Color(69, 139, 116);
    static azure = new Color(240, 255, 255);
    static azure_2 = new Color(224, 238, 238);
    static azure_3 = new Color(193, 205, 205);
    static azure_4 = new Color(131, 139, 139);
    static beige = new Color(245, 245, 220);
    static bisque = new Color(255, 228, 196);
    static bisque_2 = new Color(238, 213, 183);
    static bisque_3 = new Color(205, 183, 158);
    static bisque_4 = new Color(139, 125, 107);
    static black = new Color(0, 0, 0);
    static blanched_almond = new Color(255, 235, 205);
    static blue = new Color(0, 0, 255);
    static blue_2 = new Color(0, 0, 238);
    static blue_4 = new Color(0, 0, 139);
    static blue_violet = new Color(138, 43, 226);
    static brown = new Color(165, 42, 42);
    static brown_1 = new Color(255, 64, 64);
    static brown_2 = new Color(238, 59, 59);
    static brown_3 = new Color(205, 51, 51);
    static brown_4 = new Color(139, 35, 35);
    static burlywood = new Color(222, 184, 135);
    static burlywood_1 = new Color(255, 211, 155);
    static burlywood_2 = new Color(238, 197, 145);
    static burlywood_3 = new Color(205, 170, 125);
    static burlywood_4 = new Color(139, 115, 85);
    static cadet_blue = new Color(95, 158, 160);
    static cadet_blue_1 = new Color(152, 245, 255);
    static cadet_blue_2 = new Color(142, 229, 238);
    static cadet_blue_3 = new Color(122, 197, 205);
    static cadet_blue_4 = new Color(83, 134, 139);
    static chartreuse = new Color(127, 255, 0);
    static chartreuse_2 = new Color(118, 238, 0);
    static chartreuse_3 = new Color(102, 205, 0);
    static chartreuse_4 = new Color(69, 139, 0);
    static chocolate = new Color(210, 105, 30);
    static chocolate_1 = new Color(255, 127, 36);
    static chocolate_2 = new Color(238, 118, 33);
    static chocolate_3 = new Color(205, 102, 29);
    static coral = new Color(255, 127, 80);
    static coral_1 = new Color(255, 114, 86);
    static coral_2 = new Color(238, 106, 80);
    static coral_3 = new Color(205, 91, 69);
    static coral_4 = new Color(139, 62, 47);
    static cornflower_blue = new Color(100, 149, 237);
    static corn_silk = new Color(255, 248, 220);
    static corn_silk_2 = new Color(238, 232, 205);
    static corn_silk_3 = new Color(205, 200, 177);
    static corn_silk_4 = new Color(139, 136, 120);
    static cyan = new Color(0, 255, 255);
    static cyan_2 = new Color(0, 238, 238);
    static cyan_3 = new Color(0, 205, 205);
    static cyan_4 = new Color(0, 139, 139);
    static dark_golden_rod = new Color(184, 134, 11);
    static dark_golden_rod_1 = new Color(255, 185, 15);
    static dark_golden_rod_2 = new Color(238, 173, 14);
    static dark_golden_rod_3 = new Color(205, 149, 12);
    static dark_golden_rod_4 = new Color(139, 101, 8);
    static dark_green = new Color(0, 100, 0);
    static dark_khaki = new Color(189, 183, 107);
    static dark_olive_green = new Color(85, 107, 47);
    static dark_olive_green_1 = new Color(202, 255, 112);
    static dark_olive_green_2 = new Color(188, 238, 104);
    static dark_olive_green_3 = new Color(162, 205, 90);
    static dark_olive_green_4 = new Color(110, 139, 61);
    static dark_orange = new Color(255, 140, 0);
    static dark_orange_1 = new Color(255, 127, 0);
    static dark_orange_2 = new Color(238, 118, 0);
    static dark_orange_3 = new Color(205, 102, 0);
    static dark_orange_4 = new Color(139, 69, 0);
    static dark_orchid = new Color(153, 50, 204);
    static dark_orchid_1 = new Color(191, 62, 255);
    static dark_orchid_2 = new Color(178, 58, 238);
    static dark_orchid_3 = new Color(154, 50, 205);
    static dark_orchid_4 = new Color(104, 34, 139);
    static dark_salmon = new Color(233, 150, 122);
    static dark_sea_green = new Color(143, 188, 143);
    static dark_sea_green_1 = new Color(193, 255, 193);
    static dark_sea_green_2 = new Color(180, 238, 180);
    static dark_sea_green_3 = new Color(155, 205, 155);
    static dark_sea_green_4 = new Color(105, 139, 105);
    static dark_slate_blue = new Color(72, 61, 139);
    static dark_slate_gray = new Color(47, 79, 79);
    static dark_slate_gray_1 = new Color(151, 255, 255);
    static dark_slate_gray_2 = new Color(141, 238, 238);
    static dark_slate_gray_3 = new Color(121, 205, 205);
    static dark_slate_gray_4 = new Color(82, 139, 139);
    static dark_turquoise = new Color(0, 206, 209);
    static dark_violet = new Color(148, 0, 211);
    static deep_pink = new Color(255, 20, 147);
    static deep_pink_2 = new Color(238, 18, 137);
    static deep_pink_3 = new Color(205, 16, 118);
    static deep_pink_4 = new Color(139, 10, 80);
    static deep_sky_blue = new Color(0, 191, 255);
    static deep_sky_blue_2 = new Color(0, 178, 238);
    static deep_sky_blue_3 = new Color(0, 154, 205);
    static deep_sky_blue_4 = new Color(0, 104, 139);
    static dim_gray = new Color(105, 105, 105);
    static dodger_blue = new Color(30, 144, 255);
    static dodger_blue_2 = new Color(28, 134, 238);
    static dodger_blue_3 = new Color(24, 116, 205);
    static dodger_blue_4 = new Color(16, 78, 139);
    static fire_brick = new Color(178, 34, 34);
    static fire_brick_1 = new Color(255, 48, 48);
    static fire_brick_2 = new Color(238, 44, 44);
    static fire_brick_3 = new Color(205, 38, 38);
    static fire_brick_4 = new Color(139, 26, 26);
    static floral_white = new Color(255, 250, 240);
    static forest_green = new Color(34, 139, 34);
    static gainsboro = new Color(220, 220, 220);
    static ghost_white = new Color(248, 248, 255);
    static gold = new Color(255, 215, 0);
    static gold_2 = new Color(238, 201, 0);
    static gold_3 = new Color(205, 173, 0);
    static gold_4 = new Color(139, 117, 0);
    static golden_rod = new Color(218, 165, 32);
    static golden_rod_1 = new Color(255, 193, 37);
    static golden_rod_2 = new Color(238, 180, 34);
    static golden_rod_3 = new Color(205, 155, 29);
    static golden_rod_4 = new Color(139, 105, 20);
    static gray = new Color(190, 190, 190);
    static gray_1 = new Color(3, 3, 3);
    static gray_2 = new Color(5, 5, 5);
    static gray_3 = new Color(8, 8, 8);
    static gray_4 = new Color(10, 10, 10);
    static gray_5 = new Color(13, 13, 13);
    static gray_6 = new Color(15, 15, 15);
    static gray_7 = new Color(18, 18, 18);
    static gray_8 = new Color(20, 20, 20);
    static gray_9 = new Color(23, 23, 23);
    static gray_10 = new Color(26, 26, 26);
    static gray_11 = new Color(28, 28, 28);
    static gray_12 = new Color(31, 31, 31);
    static gray_13 = new Color(33, 33, 33);
    static gray_14 = new Color(36, 36, 36);
    static gray_15 = new Color(38, 38, 38);
    static gray_16 = new Color(41, 41, 41);
    static gray_17 = new Color(43, 43, 43);
    static gray_18 = new Color(46, 46, 46);
    static gray_19 = new Color(48, 48, 48);
    static gray_20 = new Color(51, 51, 51);
    static gray_21 = new Color(54, 54, 54);
    static gray_22 = new Color(56, 56, 56);
    static gray_23 = new Color(59, 59, 59);
    static gray_24 = new Color(61, 61, 61);
    static gray_25 = new Color(64, 64, 64);
    static gray_26 = new Color(66, 66, 66);
    static gray_27 = new Color(69, 69, 69);
    static gray_28 = new Color(71, 71, 71);
    static gray_29 = new Color(74, 74, 74);
    static gray_30 = new Color(77, 77, 77);
    static gray_31 = new Color(79, 79, 79);
    static gray_32 = new Color(82, 82, 82);
    static gray_33 = new Color(84, 84, 84);
    static gray_34 = new Color(87, 87, 87);
    static gray_35 = new Color(89, 89, 89);
    static gray_36 = new Color(92, 92, 92);
    static gray_37 = new Color(94, 94, 94);
    static gray_38 = new Color(97, 97, 97);
    static gray_39 = new Color(99, 99, 99);
    static gray_40 = new Color(102, 102, 102);
    static gray_41 = new Color(105, 105, 105);
    static gray_42 = new Color(107, 107, 107);
    static gray_43 = new Color(110, 110, 110);
    static gray_44 = new Color(112, 112, 112);
    static gray_45 = new Color(115, 115, 115);
    static gray_46 = new Color(117, 117, 117);
    static gray_47 = new Color(120, 120, 120);
    static gray_48 = new Color(122, 122, 122);
    static gray_49 = new Color(125, 125, 125);
    static gray_50 = new Color(127, 127, 127);
    static gray_51 = new Color(130, 130, 130);
    static gray_52 = new Color(133, 133, 133);
    static gray_53 = new Color(135, 135, 135);
    static gray_54 = new Color(138, 138, 138);
    static gray_55 = new Color(140, 140, 140);
    static gray_56 = new Color(143, 143, 143);
    static gray_57 = new Color(145, 145, 145);
    static gray_58 = new Color(148, 148, 148);
    static gray_59 = new Color(150, 150, 150);
    static gray_60 = new Color(153, 153, 153);
    static gray_61 = new Color(156, 156, 156);
    static gray_62 = new Color(158, 158, 158);
    static gray_63 = new Color(161, 161, 161);
    static gray_64 = new Color(163, 163, 163);
    static gray_65 = new Color(166, 166, 166);
    static gray_66 = new Color(168, 168, 168);
    static gray_67 = new Color(171, 171, 171);
    static gray_68 = new Color(173, 173, 173);
    static gray_69 = new Color(176, 176, 176);
    static gray_70 = new Color(179, 179, 179);
    static gray_71 = new Color(181, 181, 181);
    static gray_72 = new Color(184, 184, 184);
    static gray_73 = new Color(186, 186, 186);
    static gray_74 = new Color(189, 189, 189);
    static gray_75 = new Color(191, 191, 191);
    static gray_76 = new Color(194, 194, 194);
    static gray_77 = new Color(196, 196, 196);
    static gray_78 = new Color(199, 199, 199);
    static gray_79 = new Color(201, 201, 201);
    static gray_80 = new Color(204, 204, 204);
    static gray_81 = new Color(207, 207, 207);
    static gray_82 = new Color(209, 209, 209);
    static gray_83 = new Color(212, 212, 212);
    static gray_84 = new Color(214, 214, 214);
    static gray_85 = new Color(217, 217, 217);
    static gray_86 = new Color(219, 219, 219);
    static gray_87 = new Color(222, 222, 222);
    static gray_88 = new Color(224, 224, 224);
    static gray_89 = new Color(227, 227, 227);
    static gray_90 = new Color(229, 229, 229);
    static gray_91 = new Color(232, 232, 232);
    static gray_92 = new Color(235, 235, 235);
    static gray_93 = new Color(237, 237, 237);
    static gray_94 = new Color(240, 240, 240);
    static gray_95 = new Color(242, 242, 242);
    static gray_97 = new Color(247, 247, 247);
    static gray_98 = new Color(250, 250, 250);
    static gray_99 = new Color(252, 252, 252);
    static green = new Color(0, 255, 0);
    static green_2 = new Color(0, 238, 0);
    static green_3 = new Color(0, 205, 0);
    static green_4 = new Color(0, 139, 0);
    static green_yellow = new Color(173, 255, 47);
    static honeydew = new Color(240, 255, 240);
    static honeydew_2 = new Color(224, 238, 224);
    static honeydew_3 = new Color(193, 205, 193);
    static honeydew_4 = new Color(131, 139, 131);
    static hot_pink = new Color(255, 105, 180);
    static hot_pink_1 = new Color(255, 110, 180);
    static hot_pink_2 = new Color(238, 106, 167);
    static hot_pink_3 = new Color(205, 96, 144);
    static hot_pink_4 = new Color(139, 58, 98);
    static indian_red = new Color(205, 92, 92);
    static indian_red_1 = new Color(255, 106, 106);
    static indian_red_2 = new Color(238, 99, 99);
    static indian_red_3 = new Color(205, 85, 85);
    static indian_red_4 = new Color(139, 58, 58);
    static ivory = new Color(255, 255, 240);
    static ivory_2 = new Color(238, 238, 224);
    static ivory_3 = new Color(205, 205, 193);
    static ivory_4 = new Color(139, 139, 131);
    static khaki = new Color(240, 230, 140);
    static khaki_1 = new Color(255, 246, 143);
    static khaki_2 = new Color(238, 230, 133);
    static khaki_3 = new Color(205, 198, 115);
    static khaki_4 = new Color(139, 134, 78);
    static lavender = new Color(230, 230, 250);
    static lavender_blush = new Color(255, 240, 245);
    static lavender_blush_2 = new Color(238, 224, 229);
    static lavender_blush_3 = new Color(205, 193, 197);
    static lavender_blush_4 = new Color(139, 131, 134);
    static lawn_green = new Color(124, 252, 0);
    static lemon_chiffon = new Color(255, 250, 205);
    static lemon_chiffon_2 = new Color(238, 233, 191);
    static lemon_chiffon_3 = new Color(205, 201, 165);
    static lemon_chiffon_4 = new Color(139, 137, 112);
    static light = new Color(238, 221, 130);
    static light_blue = new Color(173, 216, 230);
    static light_blue_1 = new Color(191, 239, 255);
    static light_blue_2 = new Color(178, 223, 238);
    static light_blue_3 = new Color(154, 192, 205);
    static light_blue_4 = new Color(104, 131, 139);
    static light_coral = new Color(240, 128, 128);
    static light_cyan = new Color(224, 255, 255);
    static light_cyan_2 = new Color(209, 238, 238);
    static light_cyan_3 = new Color(180, 205, 205);
    static light_cyan_4 = new Color(122, 139, 139);
    static light_golden_rod = new Color(255, 236, 139);
    static light_golden_rod_2 = new Color(238, 220, 130);
    static light_golden_rod_3 = new Color(205, 190, 112);
    static light_golden_rod_4 = new Color(139, 129, 76);
    static light_golden_rod_yellow = new Color(250, 250, 210);
    static light_gray = new Color(211, 211, 211);
    static light_pink = new Color(255, 182, 193);
    static light_pink_1 = new Color(255, 174, 185);
    static light_pink_2 = new Color(238, 162, 173);
    static light_pink_3 = new Color(205, 140, 149);
    static light_pink_4 = new Color(139, 95, 101);
    static light_salmon = new Color(255, 160, 122);
    static light_salmon_2 = new Color(238, 149, 114);
    static light_salmon_3 = new Color(205, 129, 98);
    static light_salmon_4 = new Color(139, 87, 66);
    static light_sea_green = new Color(32, 178, 170);
    static light_sky_blue = new Color(135, 206, 250);
    static light_sky_blue_1 = new Color(176, 226, 255);
    static light_sky_blue_2 = new Color(164, 211, 238);
    static light_sky_blue_3 = new Color(141, 182, 205);
    static light_sky_blue_4 = new Color(96, 123, 139);
    static light_slate_blue = new Color(132, 112, 255);
    static light_slate_gray = new Color(119, 136, 153);
    static light_steel_blue = new Color(176, 196, 222);
    static light_steel_blue_1 = new Color(202, 225, 255);
    static light_steel_blue_2 = new Color(188, 210, 238);
    static light_steel_blue_3 = new Color(162, 181, 205);
    static light_steel_blue_4 = new Color(110, 123, 139);
    static light_yellow = new Color(255, 255, 224);
    static light_yellow_2 = new Color(238, 238, 209);
    static light_yellow_3 = new Color(205, 205, 180);
    static light_yellow_4 = new Color(139, 139, 122);
    static lime_green = new Color(50, 205, 50);
    static linen = new Color(250, 240, 230);
    static magenta = new Color(255, 0, 255);
    static magenta_2 = new Color(238, 0, 238);
    static magenta_3 = new Color(205, 0, 205);
    static magenta_4 = new Color(139, 0, 139);
    static maroon = new Color(176, 48, 96);
    static maroon_1 = new Color(255, 52, 179);
    static maroon_2 = new Color(238, 48, 167);
    static maroon_3 = new Color(205, 41, 144);
    static maroon_4 = new Color(139, 28, 98);
    static medium = new Color(102, 205, 170);
    static medium_aquamarine = new Color(102, 205, 170);
    static medium_blue = new Color(0, 0, 205);
    static medium_orchid = new Color(186, 85, 211);
    static medium_orchid_1 = new Color(224, 102, 255);
    static medium_orchid_2 = new Color(209, 95, 238);
    static medium_orchid_3 = new Color(180, 82, 205);
    static medium_orchid_4 = new Color(122, 55, 139);
    static medium_purple = new Color(147, 112, 219);
    static medium_purple_1 = new Color(171, 130, 255);
    static medium_purple_2 = new Color(159, 121, 238);
    static medium_purple_3 = new Color(137, 104, 205);
    static medium_purple_4 = new Color(93, 71, 139);
    static medium_sea_green = new Color(60, 179, 113);
    static medium_slate_blue = new Color(123, 104, 238);
    static medium_spring_green = new Color(0, 250, 154);
    static medium_turquoise = new Color(72, 209, 204);
    static medium_violet_red = new Color(199, 21, 133);
    static midnight_blue = new Color(25, 25, 112);
    static mint_cream = new Color(245, 255, 250);
    static misty_rose = new Color(255, 228, 225);
    static misty_rose_2 = new Color(238, 213, 210);
    static misty_rose_3 = new Color(205, 183, 181);
    static misty_rose_4 = new Color(139, 125, 123);
    static moccasin = new Color(255, 228, 181);
    static navajo_white = new Color(255, 222, 173);
    static navajo_white_2 = new Color(238, 207, 161);
    static navajo_white_3 = new Color(205, 179, 139);
    static navajo_white_4 = new Color(139, 121, 94);
    static navy_blue = new Color(0, 0, 128);
    static old_lace = new Color(253, 245, 230);
    static olive_drab = new Color(107, 142, 35);
    static olive_drab_1 = new Color(192, 255, 62);
    static olive_drab_2 = new Color(179, 238, 58);
    static olive_drab_4 = new Color(105, 139, 34);
    static orange = new Color(255, 165, 0);
    static orange_2 = new Color(238, 154, 0);
    static orange_3 = new Color(205, 133, 0);
    static orange_4 = new Color(139, 90, 0);
    static orange_red = new Color(255, 69, 0);
    static orange_red_2 = new Color(238, 64, 0);
    static orange_red_3 = new Color(205, 55, 0);
    static orange_red_4 = new Color(139, 37, 0);
    static orchid = new Color(218, 112, 214);
    static orchid_1 = new Color(255, 131, 250);
    static orchid_2 = new Color(238, 122, 233);
    static orchid_3 = new Color(205, 105, 201);
    static orchid_4 = new Color(139, 71, 137);
    static pale = new Color(219, 112, 147);
    static pale_golden_rod = new Color(238, 232, 170);
    static pale_green = new Color(152, 251, 152);
    static pale_green_1 = new Color(154, 255, 154);
    static pale_green_2 = new Color(144, 238, 144);
    static pale_green_3 = new Color(124, 205, 124);
    static pale_green_4 = new Color(84, 139, 84);
    static pale_turquoise = new Color(175, 238, 238);
    static pale_turquoise_1 = new Color(187, 255, 255);
    static pale_turquoise_2 = new Color(174, 238, 238);
    static pale_turquoise_3 = new Color(150, 205, 205);
    static pale_turquoise_4 = new Color(102, 139, 139);
    static pale_violet_red = new Color(219, 112, 147);
    static pale_violet_red_1 = new Color(255, 130, 171);
    static pale_violet_red_2 = new Color(238, 121, 159);
    static pale_violet_red_3 = new Color(205, 104, 137);
    static pale_violet_red_4 = new Color(139, 71, 93);
    static papaya_whip = new Color(255, 239, 213);
    static peach_puff = new Color(255, 218, 185);
    static peach_puff_2 = new Color(238, 203, 173);
    static peach_puff_3 = new Color(205, 175, 149);
    static peach_puff_4 = new Color(139, 119, 101);
    static pink = new Color(255, 192, 203);
    static pink_1 = new Color(255, 181, 197);
    static pink_2 = new Color(238, 169, 184);
    static pink_3 = new Color(205, 145, 158);
    static pink_4 = new Color(139, 99, 108);
    static plum = new Color(221, 160, 221);
    static plum_1 = new Color(255, 187, 255);
    static plum_2 = new Color(238, 174, 238);
    static plum_3 = new Color(205, 150, 205);
    static plum_4 = new Color(139, 102, 139);
    static powder_blue = new Color(176, 224, 230);
    static purple = new Color(160, 32, 240);
    static purple_1 = new Color(155, 48, 255);
    static purple_2 = new Color(145, 44, 238);
    static purple_3 = new Color(125, 38, 205);
    static purple_4 = new Color(85, 26, 139);
    static rebecca_purple = new Color(102, 51, 153);
    static red = new Color(255, 0, 0);
    static red_2 = new Color(238, 0, 0);
    static red_3 = new Color(205, 0, 0);
    static red_4 = new Color(139, 0, 0);
    static rosy_brown = new Color(188, 143, 143);
    static rosy_brown_1 = new Color(255, 193, 193);
    static rosy_brown_2 = new Color(238, 180, 180);
    static rosy_brown_3 = new Color(205, 155, 155);
    static rosy_brown_4 = new Color(139, 105, 105);
    static royal_blue = new Color(65, 105, 225);
    static royal_blue_1 = new Color(72, 118, 255);
    static royal_blue_2 = new Color(67, 110, 238);
    static royal_blue_3 = new Color(58, 95, 205);
    static royal_blue_4 = new Color(39, 64, 139);
    static saddle_brown = new Color(139, 69, 19);
    static salmon = new Color(250, 128, 114);
    static salmon_1 = new Color(255, 140, 105);
    static salmon_2 = new Color(238, 130, 98);
    static salmon_3 = new Color(205, 112, 84);
    static salmon_4 = new Color(139, 76, 57);
    static sandy_brown = new Color(244, 164, 96);
    static sea_green = new Color(84, 255, 159);
    static sea_green_2 = new Color(78, 238, 148);
    static sea_green_3 = new Color(67, 205, 128);
    static sea_green_4 = new Color(46, 139, 87);
    static seashell = new Color(255, 245, 238);
    static seashell_2 = new Color(238, 229, 222);
    static seashell_3 = new Color(205, 197, 191);
    static seashell_4 = new Color(139, 134, 130);
    static sienna = new Color(160, 82, 45);
    static sienna_1 = new Color(255, 130, 71);
    static sienna_2 = new Color(238, 121, 66);
    static sienna_3 = new Color(205, 104, 57);
    static sienna_4 = new Color(139, 71, 38);
    static sky_blue = new Color(135, 206, 235);
    static sky_blue_1 = new Color(135, 206, 255);
    static sky_blue_2 = new Color(126, 192, 238);
    static sky_blue_3 = new Color(108, 166, 205);
    static sky_blue_4 = new Color(74, 112, 139);
    static slate_blue = new Color(106, 90, 205);
    static slate_blue_1 = new Color(131, 111, 255);
    static slate_blue_2 = new Color(122, 103, 238);
    static slate_blue_3 = new Color(105, 89, 205);
    static slate_blue_4 = new Color(71, 60, 139);
    static slate_gray = new Color(112, 128, 144);
    static slate_gray_1 = new Color(198, 226, 255);
    static slate_gray_2 = new Color(185, 211, 238);
    static slate_gray_3 = new Color(159, 182, 205);
    static slate_gray_4 = new Color(108, 123, 139);
    static snow = new Color(255, 250, 250);
    static snow_2 = new Color(238, 233, 233);
    static snow_3 = new Color(205, 201, 201);
    static snow_4 = new Color(139, 137, 137);
    static spring_green = new Color(0, 255, 127);
    static spring_green_2 = new Color(0, 238, 118);
    static spring_green_3 = new Color(0, 205, 102);
    static spring_green_4 = new Color(0, 139, 69);
    static steel_blue = new Color(70, 130, 180);
    static steel_blue_1 = new Color(99, 184, 255);
    static steel_blue_2 = new Color(92, 172, 238);
    static steel_blue_3 = new Color(79, 148, 205);
    static steel_blue_4 = new Color(54, 100, 139);
    static tan = new Color(210, 180, 140);
    static tan_1 = new Color(255, 165, 79);
    static tan_2 = new Color(238, 154, 73);
    static tan_3 = new Color(205, 133, 63);
    static tan_4 = new Color(139, 90, 43);
    static thistle = new Color(216, 191, 216);
    static thistle_1 = new Color(255, 225, 255);
    static thistle_2 = new Color(238, 210, 238);
    static thistle_3 = new Color(205, 181, 205);
    static thistle_4 = new Color(139, 123, 139);
    static tomato = new Color(255, 99, 71);
    static tomato_2 = new Color(238, 92, 66);
    static tomato_3 = new Color(205, 79, 57);
    static tomato_4 = new Color(139, 54, 38);
    static transparent = new Color(0, 0, 0, 0);
    static turquoise = new Color(64, 224, 208);
    static turquoise_1 = new Color(0, 245, 255);
    static turquoise_2 = new Color(0, 229, 238);
    static turquoise_3 = new Color(0, 197, 205);
    static turquoise_4 = new Color(0, 134, 139);
    static violet = new Color(238, 130, 238);
    static violet_red = new Color(208, 32, 144);
    static violet_red_1 = new Color(255, 62, 150);
    static violet_red_2 = new Color(238, 58, 140);
    static violet_red_3 = new Color(205, 50, 120);
    static violet_red_4 = new Color(139, 34, 82);
    static wheat = new Color(245, 222, 179);
    static wheat_1 = new Color(255, 231, 186);
    static wheat_2 = new Color(238, 216, 174);
    static wheat_3 = new Color(205, 186, 150);
    static wheat_4 = new Color(139, 126, 102);
    static white = new Color(255, 255, 255);
    static white_smoke = new Color(245, 245, 245);
    static yellow = new Color(255, 255, 0);
    static yellow_2 = new Color(238, 238, 0);
    static yellow_3 = new Color(205, 205, 0);
    static yellow_4 = new Color(139, 139, 0);
    static yellow_green = new Color(154, 205, 50);
}

const TColorVariantIndexWhite = 1;
const TColorVariantIndexPale = 3;
const TColorVariantIndexLighter = 4;
const TColorVariantIndexLight = 5;
const TColorVariantIndexMain = 6;
const TColorVariantIndexDark = 7;
const TColorVariantIndexDarker = 8;
const TColorVariantIndexDarkest = 9;
const TColorVariantIndexBlack = 10;
/**
 * Массив всех именованных типов в вариативности цветов
 */
const TColorVariantNames = ['white', 'palest', 'pale', 'lighter', 'light', 'main', 'dark', 'darker', 'darkest', 'black'];
/**
 * Функция для проверки, является ли значение именованным типом в вариативности цветов
 * @param value Проверяемое значение
 * @returns Статус проверки
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkOfColorVariantName(value) {
    return TColorVariantNames.includes(value);
}

class ColorVariantsHelper {
    /**
     * Получить цвет по его индексу
     * @param index Числовой индекс в палитре цветов
     * @returns Именованный тип в палитре цветов
     */
    static getNameByIndex(index) {
        return TColorVariantNames[(index ?? TColorVariantIndexMain) - 1];
    }
    /**
     * Получить индексу по имени цвета
     * @param name Именованный тип в палитре цветов
     * @returns Числовой индекс в палитре цветов
     */
    static getIndexByName(name) {
        if (name) {
            const index = TColorVariantNames.findIndex((x => x === name));
            return (index + 1);
        }
        return TColorVariantIndexMain;
    }
    /**
     * Получить индекс смещенный на определенную величину
     * @param index Числовой индекс в палитре цветов
     * @param delta Смещение
     * @returns Числовой индекс в палитре цветов
     */
    static getNextIndex(index, delta) {
        const next = (index ?? TColorVariantIndexMain) + (delta ?? 0);
        if (next > TColorVariantIndexBlack) {
            return (next % TColorVariantIndexBlack);
        }
        else {
            if (next < TColorVariantIndexWhite) {
                return (next + TColorVariantIndexBlack);
            }
            else {
                return next;
            }
        }
    }
    /**
     * Вычислить цвет на основании варианта
     * @param baseColor Базовый цвет
     * @param name Именованный тип в вариативности цветов
     */
    static calcColor(baseColor, name) {
        if (name) {
            switch (name) {
                case 'white': return baseColor.combine(ColorNames['white'], 0.95);
                case 'palest': return baseColor.combine(ColorNames['white'], 0.87);
                case 'pale': return baseColor.combine(ColorNames['white'], 0.82);
                case 'lighter': return baseColor.combine(ColorNames['white'], 0.77);
                case 'light': return baseColor.combine(ColorNames['white'], 0.67);
                case 'main': return baseColor;
                case 'dark': return baseColor.combine(ColorNames['black'], 0.15);
                case 'darker': return baseColor.combine(ColorNames['black'], 0.40);
                case 'darkest': return baseColor.combine(ColorNames['black'], 0.60);
                case 'black': return baseColor.combine(ColorNames['black'], 0.80);
            }
        }
        return baseColor;
    }
}

/**
 * Вариативность цветов
 */
class ColorVariants {
    // #region  Static methods
    static createFromColorLightness(red, green, blue) {
        const main = new Color(red, green, blue);
        const white = main.increaseLightness(0.95);
        const palest = main.increaseLightness(0.87);
        const pale = main.increaseLightness(0.82);
        const lighter = main.increaseLightness(0.77);
        const light = main.increaseLightness(0.67);
        const dark = main.decreaseLightness(0.15);
        const darker = main.decreaseLightness(0.40);
        const darkest = main.decreaseLightness(0.60);
        const black = main.decreaseLightness(0.80);
        return new ColorVariants(white, palest, pale, lighter, light, main, dark, darker, darkest, black);
    }
    static createFromColorCombine(red, green, blue) {
        const main = new Color(red, green, blue);
        const white = main.combine(ColorNames['white'], 0.95);
        const palest = main.combine(ColorNames['white'], 0.87);
        const pale = main.combine(ColorNames['white'], 0.82);
        const lighter = main.combine(ColorNames['white'], 0.77);
        const light = main.combine(ColorNames['white'], 0.67);
        const dark = main.combine(ColorNames['black'], 0.15);
        const darker = main.combine(ColorNames['black'], 0.40);
        const darkest = main.combine(ColorNames['black'], 0.60);
        const black = main.combine(ColorNames['black'], 0.80);
        return new ColorVariants(white, palest, pale, lighter, light, main, dark, darker, darkest, black);
    }
    static createFromColorRelativeLightness(mainColor, lightColor, darkColor) {
        const main = new Color(mainColor);
        const white = main.increaseLightness(0.95);
        const palest = main.increaseLightness(0.87);
        const pale = main.increaseLightness(0.82);
        const lighter = main.increaseLightness(0.77);
        const light = new Color(lightColor);
        const dark = new Color(darkColor);
        const darker = main.decreaseLightness(0.40);
        const darkest = main.decreaseLightness(0.60);
        const black = main.decreaseLightness(0.80);
        return new ColorVariants(white, palest, pale, lighter, light, main, dark, darker, darkest, black);
    }
    // #endregion
    white; // 1
    palest; // 2
    pale; // 3
    lighter; // 4
    light; // 5
    main; // 6
    dark; // 7
    darker; // 8
    darkest; // 9
    black; // 10
    constructor(white, palest, pale, lighter, light, main, dark, darker, darkest, black) {
        this.white = white;
        this.palest = palest;
        this.pale = pale;
        this.lighter = lighter;
        this.light = light;
        this.main = main;
        this.dark = dark;
        this.darker = darker;
        this.darkest = darkest;
        this.black = black;
        this.getByName = this.getByName.bind(this);
        this.getByIndex = this.getByIndex.bind(this);
    }
    /**
     * Получить цвет по его имени
     * @param name Именованный тип в палитре цветов
     * @param modifyAlpha Модификация значения альфы от 0 до 1
     */
    getByName(name, modifyAlpha) {
        if (name) {
            const color = this[name];
            if (modifyAlpha) {
                return color.toModifyAlpha(modifyAlpha);
            }
            else {
                return color;
            }
        }
        else {
            if (modifyAlpha) {
                return this.main.toModifyAlpha(modifyAlpha);
            }
            else {
                return this.main;
            }
        }
    }
    /**
     * Получить цвет по его индексу
     * @param index  Числовой индекс в палитре цветов
     * @param modifyAlpha Модификация значения альфы от 0 до 1
     */
    getByIndex(index, modifyAlpha) {
        const name = ColorVariantsHelper.getNameByIndex(index);
        return this.getByName(name, modifyAlpha);
    }
    /**
     * Получить следующий цвет по его имени
     * @param name Именованный тип в палитре цветов
     * @param delta Смещение
     * @param modifyAlpha Модификация значения альфы от 0 до 1
     */
    getNextByName(name, delta, modifyAlpha) {
        const nextName = ColorVariantsHelper.getNameByIndex(ColorVariantsHelper.getNextIndex(ColorVariantsHelper.getIndexByName(name), delta));
        const color = this[nextName];
        if (modifyAlpha) {
            return color.toModifyAlpha(modifyAlpha);
        }
        else {
            return color;
        }
    }
}

/**
 * Базовый класс команды
 */
class BaseCommand {
    //
    // ОСНОВНЫЕ ДАННЫЕ
    //
    /**
     * Имя команды
     */
    name;
    /**
     * Параметр команды
     */
    parameter;
    /**
     * Основной метод команды отвечающий за ее выполнение
     */
    execute;
    /**
     * Метод определяющий возможность выполнения команды
     */
    canExecute;
    /**
     * Статус выбора
     */
    isSelected;
    //
    // ПАРАМЕТРЫ МАРШРУТИЗАЦИИ
    //
    /**
     * Маршрут команды
     */
    route;
    //
    // СВЯЗЬ С ВИЗУАЛЬНОЙ ЧАСТЬЮ
    //
    /**
     * Надпись
     */
    label;
    /**
     * Иконка
     */
    icon;
    /**
     * Порядок при сортировке команд
     */
    order;
    /**
     * Группа к которой относиться команда
     */
    group;
    constructor(name) {
        this.name = name;
        this.label = '';
        this.executeCommand = this.executeCommand.bind(this);
        this.canExecuteCommand = this.canExecuteCommand.bind(this);
        this.isSelectedCommand = this.isSelectedCommand.bind(this);
        this.execute = () => { };
    }
    /**
     * Основной метод команды отвечающий за ее выполнение
     */
    executeCommand(context) {
        this.execute(this, context);
    }
    /**
     * Метод определяющий возможность выполнения команды
     */
    canExecuteCommand(context) {
        if (this.canExecute) {
            return this.canExecute(this, context);
        }
        return true;
    }
    /**
     * Статус выбора
     */
    isSelectedCommand(context) {
        if (this.isSelected) {
            return this.isSelected(this, context);
        }
        return false;
    }
}

/**
 * Сервис для работы с командами
 * @description Все команды которые есть в приложении должны быть добавлены в данный сервис
 */
class CommandServiceClass {
    static _CommandService;
    static get Instance() {
        return (this._CommandService || (this._CommandService = new this()));
    }
    commands;
    constructor() {
        this.commands = [];
        this.getCommands = this.getCommands.bind(this);
        this.getCommandsByGroup = this.getCommandsByGroup.bind(this);
        this.getCommandsByGroupAsName = this.getCommandsByGroupAsName.bind(this);
        this.getCommandsByName = this.getCommandsByName.bind(this);
    }
    addCommands(commands) {
        commands.forEach(element => {
            this.commands.push(element);
        });
    }
    getCommands() {
        return this.commands;
    }
    getCommandsByGroup(group) {
        return this.commands.filter((x) => x.group === group);
    }
    getCommandsByGroupAsName(group) {
        return this.commands.filter((x) => x.group === group).map(x => x.name);
    }
    getCommandsByName(names) {
        const result = [];
        if (names) {
            names.forEach((x) => {
                const command = this.commands.find(c => c.name === x);
                if (command) {
                    result.push(command);
                }
            });
        }
        return result;
    }
}
/**
 * Глобальный доступ к сервису для работы с командами
 */
const CommandService = CommandServiceClass.Instance;

/**
 * Фейковая команда предназначенная для визуального разделения команд в списках
 */
class DelimiterCommand extends BaseCommand {
    constructor(name) {
        super(name);
    }
}
/**
 * Глобальный доступ к команде разделения по умолчанию
 */
const DelimiterCommandDefault = new DelimiterCommand('delimiter');

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Наименование(тип) события который посылают команды для генерирования пользовательских событий
 */
const EventCommandKey = 'EventCommand';
/**
 * Класс команды для генерирования пользовательских событий
 */
class EventCommand extends BaseCommand {
    constructor(name) {
        super(name);
    }
    /**
     * Основной метод команды отвечающий за ее выполнение
     */
    executeCommand(context) {
        const event = new CustomEvent(EventCommandKey, { detail: this.parameter });
        window.dispatchEvent(event);
    }
}

/**
 * Класс команды для простой навигации
 */
class NavigationCommand extends BaseCommand {
    constructor(name, route) {
        super(name);
        this.route = route;
    }
    /**
     * Статус выбора
     */
    isSelectedCommand(context) {
        if (window.location.pathname === this.route?.path) {
            return true;
        }
        return false;
    }
}

/**
 * Перечисление для типа функции для фильтрации данных
 */
const FilterFunctionDescriptors = {
    /**
     * Равно аргументу
     */
    Equals: {
        id: 0,
        type: 'Equals',
        abbr: localizationCore.filters.equalsAbbr,
        desc: localizationCore.filters.equals
    },
    /**
     * Не равно аргументу
     */
    NotEqual: {
        id: 1,
        type: 'NotEqual',
        abbr: localizationCore.filters.notEqualAbbr,
        desc: localizationCore.filters.notEqual
    },
    /**
     * Меньше аргумента
     */
    LessThan: {
        id: 2,
        type: 'LessThan',
        abbr: localizationCore.filters.lessThanAbbr,
        desc: localizationCore.filters.lessThan
    },
    /**
     * Меньше или равно аргумента
     */
    LessThanOrEqual: {
        id: 3,
        type: 'LessThanOrEqual',
        abbr: localizationCore.filters.lessThanOrEqualAbbr,
        desc: localizationCore.filters.lessThanOrEqual
    },
    /**
     * Больше аргумента
     */
    GreaterThan: {
        id: 4,
        type: 'GreaterThan',
        abbr: localizationCore.filters.greaterThanAbbr,
        desc: localizationCore.filters.greaterThan
    },
    /**
     * Больше или равно аргумента
     */
    GreaterThanOrEqual: {
        id: 5,
        type: 'GreaterThanOrEqual',
        abbr: localizationCore.filters.greaterThanOrEqualAbbr,
        desc: localizationCore.filters.greaterThanOrEqual
    },
    /**
     * Между первым аргументом (меньшим) и вторым аргументом (большим)
     */
    Between: {
        id: 6,
        type: 'Between',
        abbr: localizationCore.filters.betweenAbbr,
        desc: localizationCore.filters.between
    },
    /**
    * Аргумент (строка) может находиться в любом месте c учетом регистра
    */
    Contains: {
        id: 7,
        type: 'Contains',
        abbr: localizationCore.filters.contains,
        desc: localizationCore.filters.contains
    },
    /**
    * Аргумент(строка) может находиться в любом месте c учетом регистра
    */
    StartsWith: {
        id: 8,
        type: 'StartsWith',
        abbr: localizationCore.filters.startsWith,
        desc: localizationCore.filters.startsWith
    },
    /**
     * Аргумент(строка) должна находится в конце c учетом регистра
     */
    EndsWith: {
        id: 9,
        type: 'EndsWith',
        abbr: localizationCore.filters.endsWith,
        desc: localizationCore.filters.endsWith
    },
    /**
     * Аргумент(строка) должна сравнивается с учетом оператора Like
     */
    Like: {
        id: 10,
        type: 'Like',
        abbr: localizationCore.filters.like,
        desc: localizationCore.filters.like
    },
    /**
     * Не равно пустой или NULL строке. Аргумент НЕ требуется.
     * Не равно значению NULL для иных объектов.
     */
    NotEmpty: {
        id: 11,
        type: 'NotEmpty',
        abbr: localizationCore.filters.notEmpty,
        desc: localizationCore.filters.notEmpty
    },
    /**
     * Равно пустой или NULL строке. Аргумент НЕ требуется.
     * Равно значению NULL для иных объектов.
     */
    Empty: {
        id: 12,
        type: 'Empty',
        abbr: localizationCore.filters.empty,
        desc: localizationCore.filters.empty
    },
    /**
     * Любой из проверяемых элементов списка должен находиться в массиве аргумента
     */
    IncludeAny: {
        id: 13,
        type: 'IncludeAny',
        abbr: localizationCore.filters.includeAny,
        desc: localizationCore.filters.includeAny
    },
    /**
     * Все из проверяемых элементов списка должен находиться в массиве аргумента
     */
    IncludeAll: {
        id: 14,
        type: 'IncludeAll',
        abbr: localizationCore.filters.includeAll,
        desc: localizationCore.filters.includeAll
    },
    /**
     * Проверяемые элементы списка должен быть равны массиву аргумента
     */
    IncludeEquals: {
        id: 15,
        type: 'IncludeEquals',
        abbr: localizationCore.filters.includeEquals,
        desc: localizationCore.filters.includeEquals
    },
    /**
     * Ни один из проверяемых элементов списка не должен находится в массиве аргумента
     */
    IncludeNone: {
        id: 16,
        type: 'IncludeNone',
        abbr: localizationCore.filters.includeNone,
        desc: localizationCore.filters.includeNone
    }
};

/**
 * Группа функций фильтрации для числовых типов
 */
const GroupFilterFunctionsNumber = [
    FilterFunctionDescriptors.Equals,
    FilterFunctionDescriptors.NotEqual,
    FilterFunctionDescriptors.LessThan,
    FilterFunctionDescriptors.LessThanOrEqual,
    FilterFunctionDescriptors.GreaterThan,
    FilterFunctionDescriptors.GreaterThanOrEqual,
    FilterFunctionDescriptors.Between
];
/**
 * Группа функций фильтрации для строк
 */
const GroupFilterFunctionsString = [
    FilterFunctionDescriptors.Equals,
    FilterFunctionDescriptors.Contains,
    FilterFunctionDescriptors.StartsWith,
    FilterFunctionDescriptors.EndsWith,
    FilterFunctionDescriptors.NotEqual,
    FilterFunctionDescriptors.NotEmpty
];
/**
 * Группа функций фильтрации для перечисления
 */
const GroupFilterFunctionsEnum = [
    FilterFunctionDescriptors.Equals,
    FilterFunctionDescriptors.NotEqual
];
/**
 * Группа функций фильтрации для массива
 */
const GroupFilterFunctionsArray = [
    FilterFunctionDescriptors.IncludeAll,
    FilterFunctionDescriptors.IncludeAny,
    FilterFunctionDescriptors.IncludeEquals,
    FilterFunctionDescriptors.IncludeNone
];

class HumanizerNumber {
    static DEFAULT_FORMAT = '0,0[.][00]';
    static CURRENCY_FORMAT = '0,0[.]00';
    static PERCENTAGE_FORMAT = '0,0[.]00%';
    static formatNumber(number) {
        return numeral(number).format(HumanizerNumber.DEFAULT_FORMAT);
    }
    static formatCurrency(amount) {
        return numeral(amount).format(HumanizerNumber.CURRENCY_FORMAT);
    }
    static formatPercentage(amount) {
        return numeral(amount).format(HumanizerNumber.PERCENTAGE_FORMAT);
    }
}

class HumanizerByteSize {
    /**
     *
     * @param sizeInBytes
     * @returns
     */
    static byteSize(sizeInBytes) {
        let size = sizeInBytes / 1024;
        if (size < 1000) {
            return `${HumanizerNumber.formatNumber(size)} КБ`;
        }
        size = size / 1024;
        if (size < 1000) {
            return `${HumanizerNumber.formatNumber(size)} МБ`;
        }
        size = size / 1024;
        return `${HumanizerNumber.formatNumber(size)} ГБ`;
    }
    ;
}

class HumanizerDateTime {
}

class HumanizerPerson {
    /**
     *
     * @param lastName
     * @param firstName
     * @param patronymic
     * @param substitutes
     * @returns
     */
    static getLastNameWithInitials(lastName, firstName, patronymic, substitutes) {
        if (!lastName) {
            return ((substitutes && substitutes.find((sub) => !!sub)) || '');
        }
        return StringHelper.toUpperCaseAllFirstLetters(`${lastName}${firstName ? ` ${firstName[0]}.` : ''}${patronymic ? ` ${patronymic[0]}.` : ''}`);
    }
    ;
    /**
     *
     * @param firstName
     * @param patronymic
     * @param substitutes
     * @returns
     */
    static getNameWithPatronymic(firstName, patronymic, substitutes) {
        if (!firstName) {
            return ((substitutes && substitutes.find((sub) => !!sub)) || '');
        }
        return StringHelper.toUpperCaseAllFirstLetters(`${firstName}${patronymic ? ` ${patronymic}` : ''}`);
    }
    ;
    /**
     *
     * @param lastName
     * @param firstName
     * @param patronymic
     * @param substitutes
     * @returns
     */
    static getFullName(lastName, firstName, patronymic, substitutes) {
        if (!lastName) {
            return HumanizerPerson.getNameWithPatronymic(firstName, patronymic, substitutes);
        }
        const nameWithPatronymic = HumanizerPerson.getNameWithPatronymic(firstName, patronymic);
        if (nameWithPatronymic) {
            return StringHelper.toUpperCaseAllFirstLetters(`${lastName} ${nameWithPatronymic}`);
        }
        else {
            return StringHelper.toUpperCaseAllFirstLetters(lastName);
        }
    }
}

class HumanizerString {
}

/**
 * Класс для представления(описания) свойств объектов
 */
class ObjectInfo {
    descriptors = [];
    constructor() {
        this.getProperties = this.getProperties.bind(this);
        this.getPropertiesSorted = this.getPropertiesSorted.bind(this);
        this.getPropertyByName = this.getPropertyByName.bind(this);
        this.getFilterFunctionsDesc = this.getFilterFunctionsDesc.bind(this);
    }
    getProperties() {
        return this.descriptors;
    }
    getPropertiesSorted() {
        return this.descriptors.filter(x => (x.sorting && x.sorting.enabled));
    }
    getPropertyByName(name) {
        return this.descriptors.find(x => x.fieldName === name);
    }
    getFilterFunctionsDesc() {
        const filterFunctions = {};
        this.descriptors.forEach((x) => {
            if (x.filtering && x.filtering.enabled) {
                filterFunctions[`${x.fieldName}`] = x.filtering.functionDefaultDesc;
            }
        });
        return filterFunctions;
    }
}

/**
 * Дескрипторы (перечисление) для типа свойства
 */
const PropertyTypeDescriptors = {
    /**
     * Логический тип
     */
    Boolean: {
        id: 0,
        type: 'Boolean'
    },
    /**
     * Целый тип (byte, short, int, long, enum)
     */
    Integer: {
        id: 1,
        type: 'Integer'
    },
    /**
     * Вещественный тип (float, double, decimal)
     */
    Double: {
        id: 2,
        type: 'Double'
    },
    /**
     * Строковый тип
     */
    String: {
        id: 3,
        type: 'String'
    },
    /**
     * Тип даты-времени
     */
    DateTime: {
        id: 4,
        type: 'DateTime'
    },
    /**
     * Глобальный идентификатор в формате UUID
     */
    Guid: {
        id: 5,
        type: 'Guid'
    }
};

class FilterPropertyHelper {
    /**
     * Проверка на значение фильтра свойства
     * @param filterProperty Параметры фильтрации свойства
     */
    static hasValue(filterProperty) {
        if (!filterProperty.value && !filterProperty.values)
            return false;
        if (filterProperty.value && !filterProperty.values) {
            if (filterProperty.value === '') {
                return false;
            }
            return true;
        }
        if (!filterProperty.value && filterProperty.values) {
            if (filterProperty.values.length === 0) {
                return false;
            }
            return true;
        }
        return false;
    }
    /**
     * Проверка на значение фильтров свойств
     * @param filterProperty Список параметров фильтрации свойства
     */
    static hasValues(filterProperties) {
        let findValue = false;
        filterProperties.forEach(x => {
            if (findValue === false) {
                findValue = FilterPropertyHelper.hasValue(x);
            }
        });
        return findValue;
    }
    /**
     * Фильтрация массива по указанному фильтру свойства
     * @param massive Исходный массив
     * @param filterProperty Параметры фильтрации свойства
     * @returns Отфильтрованный массив
     */
    static filterArrayByProperty(massive, filterProperty) {
        if (FilterPropertyHelper.hasValue(filterProperty)) {
            const propertyType = filterProperty.propertyTypeDesc.type;
            const filterFunction = filterProperty.function.type;
            const key = StringHelper.lowercaseFirstLetter(filterProperty.propertyPath);
            switch (propertyType) {
                case 'Boolean':
                    {
                        switch (filterFunction) {
                            case 'Equals': return massive.filter(x => BooleanHelper.parse((ObjectHelper.getValueByPropertyPath(x, key))) === BooleanHelper.parse(filterProperty.value));
                            // eslint-disable-next-line max-len
                            case 'NotEqual': return massive.filter(x => BooleanHelper.parse((ObjectHelper.getValueByPropertyPath(x, key))) !== BooleanHelper.parse(filterProperty.value));
                        }
                    }
                    break;
                case 'Integer':
                case 'Double':
                    {
                        switch (filterFunction) {
                            case 'Equals': return massive.filter(x => Number((ObjectHelper.getValueByPropertyPath(x, key))) === Number(filterProperty.value));
                            case 'NotEqual': return massive.filter(x => Number((ObjectHelper.getValueByPropertyPath(x, key))) !== Number(filterProperty.value));
                            case 'LessThan': return massive.filter(x => Number((ObjectHelper.getValueByPropertyPath(x, key))) < Number(filterProperty.value));
                            case 'LessThanOrEqual': return massive.filter(x => Number((ObjectHelper.getValueByPropertyPath(x, key))) <= Number(filterProperty.value));
                            case 'GreaterThan': return massive.filter(x => Number((ObjectHelper.getValueByPropertyPath(x, key))) > Number(filterProperty.value));
                            case 'GreaterThanOrEqual': return massive.filter(x => Number((ObjectHelper.getValueByPropertyPath(x, key))) >= Number(filterProperty.value));
                            case 'Between': return massive.filter(x => {
                                const check = Number((ObjectHelper.getValueByPropertyPath(x, key)));
                                const left = Number(filterProperty.values[0]);
                                const right = Number(filterProperty.values[1]);
                                return (check > left) && (check < right);
                            });
                        }
                    }
                    break;
                case 'String':
                case 'Guid':
                    {
                        switch (filterFunction) {
                            case 'Equals': return massive.filter(x => String((ObjectHelper.getValueByPropertyPath(x, key))) === filterProperty.value);
                            case 'NotEqual': return massive.filter(x => String((ObjectHelper.getValueByPropertyPath(x, key))) !== filterProperty.value);
                            case 'Contains': return massive.filter(x => (String((ObjectHelper.getValueByPropertyPath(x, key)))).includes(filterProperty.value));
                            case 'StartsWith': return massive.filter(x => (String((ObjectHelper.getValueByPropertyPath(x, key)))).startsWith(filterProperty.value));
                            case 'EndsWith': return massive.filter(x => (String((ObjectHelper.getValueByPropertyPath(x, key)))).endsWith(filterProperty.value));
                            case 'NotEmpty': return massive.filter(x => StringHelper.isNullOrEmpty(String((ObjectHelper.getValueByPropertyPath(x, key)))) === false);
                            case 'LessThan': return massive.filter(x => String((ObjectHelper.getValueByPropertyPath(x, key))).localeCompare(filterProperty.value) < 0);
                            case 'LessThanOrEqual': return massive.filter(x => String((ObjectHelper.getValueByPropertyPath(x, key))).localeCompare(filterProperty.value) <= 0);
                            case 'GreaterThan': return massive.filter(x => String((ObjectHelper.getValueByPropertyPath(x, key))).localeCompare(filterProperty.value) > 0);
                            case 'GreaterThanOrEqual': return massive.filter(x => String((ObjectHelper.getValueByPropertyPath(x, key))).localeCompare(filterProperty.value) >= 0);
                        }
                    }
                    break;
                case 'DateTime':
                    {
                        switch (filterFunction) {
                            case 'Equals': return massive.filter(x => DateHelper.parse((ObjectHelper.getValueByPropertyPath(x, key))) === DateHelper.parse(filterProperty.value));
                            case 'NotEqual': return massive.filter(x => DateHelper.parse((ObjectHelper.getValueByPropertyPath(x, key))) !== DateHelper.parse(filterProperty.value));
                            case 'LessThan': return massive.filter(x => DateHelper.parse((ObjectHelper.getValueByPropertyPath(x, key))) < DateHelper.parse(filterProperty.value));
                            // eslint-disable-next-line max-len
                            case 'LessThanOrEqual': return massive.filter(x => DateHelper.parse((ObjectHelper.getValueByPropertyPath(x, key))) <= DateHelper.parse(filterProperty.value));
                            case 'GreaterThan': return massive.filter(x => DateHelper.parse((ObjectHelper.getValueByPropertyPath(x, key))) > DateHelper.parse(filterProperty.value));
                            case 'GreaterThanOrEqual':
                                return massive.filter(x => DateHelper.parse((ObjectHelper.getValueByPropertyPath(x, key))) >= DateHelper.parse(filterProperty.value));
                        }
                    }
                    break;
            }
        }
        return massive;
    }
    /**
     * Фильтрация массива по указанному массиву фильтров свойств
     * @param massive Исходный массив
     * @param filterProperties Массив фильтров свойств
     * @returns Отфильтрованный массив
     */
    static filterArrayByProperties(massive, filterProperties) {
        if (!filterProperties)
            return massive;
        let result = [...massive];
        for (const filterProperty of filterProperties) {
            result = FilterPropertyHelper.filterArrayByProperty(result, filterProperty);
        }
        return result;
    }
}

class RequestHelper {
    static createURLSearchParams(request) {
        if (request) {
            const search = new URLSearchParams();
            if (request.pageInfo) {
                search.append('pageInfo.pageNumber', request.pageInfo.pageNumber.toString());
                search.append('pageInfo.pageSize', request.pageInfo.pageSize.toString());
            }
            if (request.sorting) {
                let index = 0;
                request.sorting.forEach((value) => {
                    search.append(`sorting[${index}].propertyPath`, value.propertyPath);
                    if (value.isDesc && value.isDesc === true) {
                        search.append(`sorting[${index}].isDesc`, 'true');
                    }
                    index++;
                });
            }
            if (request.filtering) {
                let index = 0;
                request.filtering.forEach((filter) => {
                    if (filter.value) {
                        const value = filter.value;
                        search.append(`filtering[${index}].propertyPath`, filter.propertyPath);
                        search.append(`filtering[${index}].function`, filter.function.id.toString());
                        search.append(`filtering[${index}].propertyType`, filter.propertyTypeDesc.id.toString());
                        search.append(`filtering[${index}].value`, value);
                        if (filter.isSensitiveCase) {
                            search.append(`filtering[${index}].isSensitiveCase`, 'true');
                        }
                        index++;
                    }
                    else if (filter.values) {
                        const values = filter.values;
                        search.append(`filtering[${index}].propertyPath`, filter.propertyPath);
                        search.append(`filtering[${index}].function`, filter.function.id.toString());
                        search.append(`filtering[${index}].propertyType`, filter.propertyTypeDesc.id.toString());
                        for (let iv = 0; iv < values.length; iv++) {
                            const val = values[iv];
                            search.append(`filtering[${index}].values[${iv}]`, val);
                        }
                    }
                });
            }
            return search;
        }
        else {
            const search = new URLSearchParams();
            search.append('pageInfo.pageNumber', '0');
            search.append('pageInfo.pageSize', '9999');
            return search;
        }
    }
}

class SortPropertyHelper {
    /**
     * Сортировка массива по указанному свойству сортировки
     * @param massive Исходный массив
     * @param sortProperty Параметры сортировки свойства
     * @returns Отсортированный массив
     */
    static sortArrayByProperty(massive, sortProperty) {
        const propertyType = sortProperty.propertyTypeDesc.type;
        const result = [...massive];
        const key = StringHelper.lowercaseFirstLetter(sortProperty.propertyPath);
        switch (propertyType) {
            case 'Boolean':
                {
                    return result.sort((a, b) => {
                        const l = BooleanHelper.parse(a[key]);
                        const r = BooleanHelper.parse(b[key]);
                        return BooleanHelper.compare(l, r, sortProperty.isDesc);
                    });
                }
            case 'Integer':
            case 'Double':
                {
                    return result.sort((a, b) => {
                        const l = Number(a[key]);
                        const r = Number(b[key]);
                        return NumberHelper.compare(l, r, sortProperty.isDesc);
                    });
                }
            case 'String':
            case 'Guid':
                {
                    return result.sort((a, b) => {
                        const l = String(a[key]);
                        const r = String(b[key]);
                        const status = l.localeCompare(r);
                        if (sortProperty.isDesc) {
                            if (status > 0)
                                return -1;
                            if (status < 0)
                                return 1;
                        }
                        return status;
                    });
                }
            case 'DateTime':
                {
                    return result.sort((a, b) => {
                        const l = DateHelper.parse(a[key]);
                        const r = DateHelper.parse(b[key]);
                        return DateHelper.compare(l, r, sortProperty.isDesc);
                    });
                }
        }
        return massive;
    }
    /**
     * Сортировка массива по указанному массиву свойств сортировки
     * @param massive Исходный массив
     * @param sortProperties Массив свойств сортировки
     * @returns Отсортированный массив
     */
    static sortArrayByProperties(massive, sortProperties) {
        if (!sortProperties)
            return massive;
        let result = [...massive];
        for (const sortProperty of sortProperties) {
            result = SortPropertyHelper.sortArrayByProperty(result, sortProperty);
        }
        return result;
    }
}

class Assert {
    /**
     * Проверка значения на undefined или null
     * @param value Проверяемое значение
     * @returns Статус проверки
     */
    static empty(value) {
        return value === undefined || value === null;
    }
    /**
     * Проверка на наличие значения
     * @param value Проверяемое значение
     * @returns Статус проверки
     */
    static exist(value) {
        return value !== undefined && value !== null;
    }
    /**
     * Проверка объекта на то, что все его свойства имеют значения undefined
     * @param object Проверяемый объект
     * @returns Статус проверки
     */
    static allUndefined(object) {
        return !Object.values(object).some((value) => value !== undefined);
    }
}

class OptionHelper {
    /**
     * Преобразование значение в значение корректного типа
     * @param options Список опций
     * @param value Значение
     * @returns Значение корректного типа
     */
    static convertValue(options, value) {
        if (typeof options[0].value == 'string') {
            if (typeof value == 'string')
                return value;
            if (typeof value == 'number')
                return value.toString();
        }
        if (typeof options[0].value == 'number') {
            if (typeof value == 'string')
                return Number(value);
            if (typeof value == 'number')
                return value;
        }
        return value;
    }
    /**
     * Преобразование в типизированный массив
     * @param options Список опций
     * @returns
     */
    static convertToNumber(options) {
        const result = options.map((x) => {
            const value = { text: x.text, value: Number(x.value) };
            return value;
        });
        return result;
    }
    /**
     * Преобразование в типизированный массив
     * @param options Список опций
     * @returns
     */
    static convertToString(options) {
        const result = options.map((x) => {
            const value = { text: x.text, value: String(x.value) };
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
    static getDefaultValue(options, initialSelectedValue) {
        if (Assert.exist(initialSelectedValue)) {
            return initialSelectedValue;
        }
        return options[0].value;
    }
    /**
     * Получение корректного текста по умолчанию или начального значения текста
     * @param options Список опций
     * @param initialSelectedValue Начальное значение
     * @returns
     */
    static getDefaultText(options, initialSelectedValue) {
        if (Assert.exist(initialSelectedValue)) {
            let text = '';
            options.forEach((element) => {
                if (element.value === initialSelectedValue) {
                    text = element.text;
                }
            });
            return text;
        }
        return options[0].text;
    }
    /**
     * Получение корректной иконки по умолчанию или начальной иконки
     * @param options Список опций
     * @param initialSelectedValue Начальное значение
     * @returns
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getDefaultIcon(options, initialSelectedValue) {
        if (Assert.exist(initialSelectedValue)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let icon = undefined;
            options.forEach((element) => {
                if (element.value === initialSelectedValue) {
                    icon = element.icon;
                }
            });
            return icon;
        }
        return options[0].icon;
    }
    /**
     * Получение корректного текста по умолчанию или начального значения текста
     * @param options Список опций
     * @param initialSelectedValues Начальное значение
     * @returns Массив текста выбранных значений
     */
    static getDefaultTexts(options, initialSelectedValues) {
        if (initialSelectedValues && initialSelectedValues.length > 0) {
            const texts = [];
            options.forEach((element) => {
                if (initialSelectedValues.find((x) => x === element.value)) {
                    texts.push(element.text);
                }
            });
            return texts;
        }
        else {
            return [];
        }
    }
    /**
     * Получение опций из значения опций
     * @param options Массив всех опций
     * @param selectedValue Выбранное значение
     * @returns Опция
     */
    static getOptionByValue(options, selectedValue) {
        if (Assert.exist(selectedValue)) {
            for (const element of options) {
                if (element.value === selectedValue) {
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
    static getTextByValue(options, selectedValue) {
        let text = '';
        if (Assert.exist(selectedValue)) {
            options.forEach((element) => {
                if (element.value === selectedValue) {
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
    static getIconByValue(options, selectedValue) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let icon = undefined;
        if (Assert.exist(selectedValue)) {
            options.forEach((element) => {
                if (element.value === selectedValue) {
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
    static getOptionsByValues(options, selectedValues) {
        if (selectedValues) {
            if (Array.isArray(selectedValues)) {
                if (selectedValues.length > 0) {
                    const optionsSelected = [];
                    options.forEach((element) => {
                        if (selectedValues.find((x) => x === element.value)) {
                            optionsSelected.push(element);
                        }
                    });
                    return optionsSelected;
                }
            }
            else {
                for (const element of options) {
                    if (element.value === selectedValues) {
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
    static getTextsByValues(options, selectedValues) {
        if (selectedValues && selectedValues.length > 0) {
            const texts = [];
            options.forEach((element) => {
                if (selectedValues.find((x) => x === element.value)) {
                    texts.push(element.text);
                }
            });
            return texts;
        }
        else {
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
    static getTextsByUnknownValues(options, item) {
        if (Array.isArray(item)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const massive = item;
            if (ArrayHelper.checkIsNumbers(massive)) {
                const numbers = massive.map((x) => {
                    const value = Number(x);
                    return value;
                });
                const result = OptionHelper.getTextsByValues(options, numbers);
                return result;
            }
            else {
                const texts = massive.map((x) => {
                    const value = String(x);
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
     * @returns Статус наличия опции
     */
    static hasOption(options, value) {
        if (Assert.exist(value)) {
            return options.find((x) => x.value == value) !== undefined;
        }
        return false;
    }
    /**
     * Проверка на наличие иконки
     * @param options Массив всех опций
     * @param context Контекст вызова
     * @returns Статус наличия иконки
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static hasIcons(options, context) {
        for (const option of options) {
            if (option.icon) {
                if (typeof option.icon == 'function') {
                    if (option.icon(option, context))
                        return true;
                }
                else {
                    return true;
                }
            }
        }
        return false;
    }
}

/**
 * Успешный результат валидации
 */
const ValidationResultSuccess = { error: false };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class ValidationSuccess {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validation(_) {
        return ValidationResultSuccess;
    }
}

/**
 * Проверка объекта на поддержку интерфейса IConstantable
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkOfConstantable(value) {
    if (value) {
        return ('isConst' in value) && value.isConst === true;
    }
    return false;
}
/**
 * Преобразование объекта к интерфейсу IConstantable
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function instanceOfConstantable(value) {
    if (checkOfConstantable(value)) {
        return value;
    }
    else {
        // eslint-disable-next-line consistent-return
        return undefined;
    }
}

/**
 * Проверка объекта на поддержку интерфейса IEditable
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkOfEditable(value) {
    if (value) {
        return ('id' in value);
    }
    return false;
}
/**
 * Преобразование объекта к интерфейсу IEditable
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function instanceOfEditable(value) {
    if (checkOfEditable(value)) {
        return value;
    }
    else {
        // eslint-disable-next-line consistent-return
        return undefined;
    }
}

/**
 * Проверка объекта на поддержку интерфейса IGrouping
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkOfGrouping(value) {
    if (value) {
        return ('groupKey' in value) && ('items' in value) && (Array.isArray(value['items']));
    }
    return false;
}
/**
 * Преобразование объекта к интерфейсу IGrouping
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function instanceOfGrouping(value) {
    if (checkOfGrouping(value)) {
        return value;
    }
    else {
        // eslint-disable-next-line consistent-return
        return undefined;
    }
}

/**
 * Класс для определения маршрута в приложении
 */
class Route {
    /**
     * Маршрут
     */
    path;
    /**
     * Должен ли он быть пользователь авторизован для перехода по данному маршруту
     */
    isShouldBeAuthorized;
    /**
     * Набор разрешений для перехода по данному маршруту
     */
    permissions;
    constructor(path, isShouldBeAuthorized, permissions) {
        this.path = path;
        this.isShouldBeAuthorized = isShouldBeAuthorized;
        this.permissions = permissions;
    }
}

/**
 * Проверка на наличие любой свойства из границ элемента UI
 * @param borderStyle Тип стиля границы
 * @param borderWidth Ширина границы
 * @param borderColor Цвет границы
 */
function hasBorderProperties(borderStyle, borderWidth, borderColor) {
    return (!!borderStyle) || (!!borderWidth) || (!!borderColor);
}
/**
 * Проверка на наличие любой свойства из границ элемента UI
 * @param borderProps Общие свойства для границы элемента UI
 */
function hasBorderProps(borderProps) {
    return (!!borderProps.borderStyle) || (!!borderProps.borderWidth) || (!!borderProps.borderColor);
}

/**
 * Наборы типовых вариантов цвета
 */
class ThemeColorVariants {
    static AntPrimary = new ColorVariants(new Color(230, 247, 255), // white
    new Color(186, 234, 255), // palest
    new Color(145, 213, 255), // pale
    new Color(105, 192, 255), // lighter
    new Color(24, 144, 255), // light
    new Color(64, 169, 255), // main
    new Color(9, 109, 217), // dark
    new Color(0, 80, 179), // darker
    new Color(0, 58, 140), // darkest
    new Color(0, 39, 102) // black
    );
    static MuiBlue = new ColorVariants(new Color('#e3f2fd'), // white
    new Color('#bbdefb'), // palest
    new Color('#90caf9'), // pale
    new Color('#64b5f6'), // lighter
    new Color('#42a5f5'), // light
    new Color('#2196f3'), // main
    new Color('#1e88e5'), // dark
    new Color('#1976d2'), // darker
    new Color('#1565c0'), // darkest
    new Color('#0d47a1') // black
    );
    static MuiBlueGrey = new ColorVariants(new Color('#eceff1'), // white
    new Color('#cfd8dc'), // palest
    new Color('#b0bec5'), // pale
    new Color('#90a4ae'), // lighter
    new Color('#78909c'), // light
    new Color('#607d8b'), // main
    new Color('#546e7a'), // dark
    new Color('#455a64'), // darker
    new Color('#37474f'), // darkest
    new Color('#263238') // black
    );
    static MuiIndigo = new ColorVariants(new Color('#e8eaf6'), // white
    new Color('#c5cae9'), // palest
    new Color('#9fa8da'), // pale
    new Color('#7986cb'), // lighter
    new Color('#5c6bc0'), // light
    new Color('#3f51b5'), // main
    new Color('#3949ab'), // dark
    new Color('#303f9f'), // darker
    new Color('#283593'), // darkest
    new Color('#1a237e') // black
    );
    static MuiGreen = new ColorVariants(new Color('#e8f5e9'), // white
    new Color('#c8e6c9'), // palest
    new Color('#a5d6a7'), // pale
    new Color('#81c784'), // lighter
    new Color('#66bb6a'), // light
    new Color('#4caf50'), // main
    new Color('#43a047'), // dark
    new Color('#388e3c'), // darker
    new Color('#2e7d32'), // darkest
    new Color('#1b5e20') // black
    );
    static MuiTeal = new ColorVariants(new Color('#e0f2f1'), // white
    new Color('#b2dfdb'), // palest
    new Color('#80cbc4'), // pale
    new Color('#4db6ac'), // lighter
    new Color('#26a69a'), // light
    new Color('#009688'), // main
    new Color('#00897b'), // dark
    new Color('#00796b'), // darker
    new Color('#00695c'), // darkest
    new Color('#004d40') // black
    );
    static MuiYellow = new ColorVariants(new Color('#fffde7'), // white
    new Color('#fff9c4'), // palest
    new Color('#fff59d'), // pale
    new Color('#fff176'), // lighter
    new Color('#ffee58'), // light
    new Color('#ffeb3b'), // main
    new Color('#fdd835'), // dark
    new Color('#fbc02d'), // darker
    new Color('#f9a825'), // darkest
    new Color('#f57f17') // black
    );
    static MuiAmber = new ColorVariants(new Color('#fff8e1'), // white
    new Color('#ffecb3'), // palest
    new Color('#ffe082'), // pale
    new Color('#ffd54f'), // lighter
    new Color('#ffca28'), // light
    new Color('#ffc107'), // main
    new Color('#ffb300'), // dark
    new Color('#ffa000'), // darker
    new Color('#ff8f00'), // darkest
    new Color('#ff6f00') // black
    );
    static MuiRed = new ColorVariants(new Color('#ffebee'), // white
    new Color('#ffcdd2'), // palest
    new Color('#ef9a9a'), // pale
    new Color('#e57373'), // lighter
    new Color('#ef5350'), // light
    new Color('#f44336'), // main
    new Color('#e53935'), // dark
    new Color('#d32f2f'), // darker
    new Color('#c62828'), // darkest
    new Color('#b71c1c') // black
    );
    static MuiBrown = new ColorVariants(new Color('#efebe9'), // white
    new Color('#d7ccc8'), // palest
    new Color('#bcaaa4'), // pale
    new Color('#a1887f'), // lighter
    new Color('#8d6e63'), // light
    new Color('#795548'), // main
    new Color('#6d4c41'), // dark
    new Color('#5d4037'), // darker
    new Color('#4e342e'), // darkest
    new Color('#3e2723') // black
    );
    static MuiGray = new ColorVariants(new Color('#fafafa'), // white
    new Color('#f5f5f5'), // palest
    new Color('#eeeeee'), // pale
    new Color('#e0e0e0'), // lighter
    new Color('#bdbdbd'), // light
    new Color('#9e9e9e'), // main
    new Color('#757575'), // dark
    new Color('#616161'), // darker
    new Color('#424242'), // darkest
    new Color('#212121') // black
    );
}

/**
 * Наборы палитр тем
 */
class ThemeColorPalettes {
    // #region Static methods
    static getMuiBlueColor(colorVariant, isHarmonious) {
        if (isHarmonious) {
            return ThemeColorVariants.MuiBlue.getByName(colorVariant).createHarmoniousColor();
        }
        else {
            return (ColorVariantsHelper.getIndexByName(colorVariant) <= 5) ? Colors.black : Colors.white;
        }
    }
    static getMuiBlueGreyColor(colorVariant, isHarmonious) {
        if (isHarmonious) {
            return ThemeColorVariants.MuiBlueGrey.getByName(colorVariant).createHarmoniousColor();
        }
        else {
            return (ColorVariantsHelper.getIndexByName(colorVariant) <= 5) ? Colors.black : Colors.white;
        }
    }
    static getMuiIndigoColor(colorVariant, isHarmonious) {
        if (isHarmonious) {
            return ThemeColorVariants.MuiIndigo.getByName(colorVariant).createHarmoniousColor();
        }
        else {
            return (ColorVariantsHelper.getIndexByName(colorVariant) <= 3) ? Colors.black : Colors.white;
        }
    }
    static getMuiGreenColor(colorVariant, isHarmonious) {
        if (isHarmonious) {
            return ThemeColorVariants.MuiGreen.getByName(colorVariant).createHarmoniousColor();
        }
        else {
            return (ColorVariantsHelper.getIndexByName(colorVariant) <= 6) ? Colors.black : Colors.white;
        }
    }
    static getMuiTealColor(colorVariant, isHarmonious) {
        if (isHarmonious) {
            return ThemeColorVariants.MuiTeal.getByName(colorVariant).createHarmoniousColor();
        }
        else {
            return (ColorVariantsHelper.getIndexByName(colorVariant) <= 4) ? Colors.black : Colors.white;
        }
    }
    static getMuiYellowColor(colorVariant, isHarmonious) {
        if (isHarmonious) {
            return ThemeColorVariants.MuiYellow.getByName(colorVariant).createHarmoniousColor();
        }
        else {
            return Colors.black;
        }
    }
    static getMuiAmberColor(colorVariant, isHarmonious) {
        if (isHarmonious) {
            return ThemeColorVariants.MuiAmber.getByName(colorVariant).createHarmoniousColor();
        }
        else {
            return Colors.black;
        }
    }
    static getMuiRedColor(colorVariant, isHarmonious) {
        if (isHarmonious) {
            return ThemeColorVariants.MuiRed.getByName(colorVariant).createHarmoniousColor();
        }
        else {
            return (ColorVariantsHelper.getIndexByName(colorVariant) <= 4) ? Colors.black : Colors.white;
        }
    }
    static getMuiBrownColor(colorVariant, isHarmonious) {
        if (isHarmonious) {
            return ThemeColorVariants.MuiBrown.getByName(colorVariant).createHarmoniousColor();
        }
        else {
            return (ColorVariantsHelper.getIndexByName(colorVariant) <= 3) ? Colors.black : Colors.white;
        }
    }
    // #endregion
    static Palettes = {
        'light': {
            mode: 'light',
            text: {
                primary: new Color('rgba(0, 0, 0, 0.87)'),
                secondary: new Color('rgba(0, 0, 0, 0.6)'),
                disabledOpacity: 0.38
            },
            background: {
                default: new Color('#fff'),
                secondary: new Color('#fff'),
                disabledOpacity: 0.12
            },
            border: {
                primary: new Color('rgba(0, 0, 0, 0.25)'),
                secondary: new Color('rgba(0, 0, 0, 0.4)'),
                disabledOpacity: 0.26
            },
            action: {
                activatedOpacity: 0.12,
                hoverOpacity: 0.1,
                selectedOpacity: 0.08,
                disabledOpacity: 0.38,
                focusOpacity: 0.12
            },
            colors: {
                'primary': {
                    variants: ColorVariants.createFromColorRelativeLightness('#1976d2', '#42a5f5', '#1565c0'),
                    onText: () => Colors.white
                },
                'secondary': {
                    variants: ColorVariants.createFromColorRelativeLightness('#9c27b0', '#ba68c8', '#7b1fa2'),
                    onText: () => Colors.white
                },
                'error': {
                    variants: ColorVariants.createFromColorRelativeLightness('#d32f2f', '#ef5350', '#c62828'),
                    onText: () => Colors.white
                },
                'warning': {
                    variants: ColorVariants.createFromColorRelativeLightness('#ed6c02', '#ff9800', '#e65100'),
                    onText: () => Colors.white
                },
                'info': {
                    variants: ColorVariants.createFromColorRelativeLightness('#0288d1', '#03a9f4', '#01579b'),
                    onText: () => Colors.white
                },
                'success': {
                    variants: ColorVariants.createFromColorRelativeLightness('#2e7d32', '#4caf50', '#1b5e20'),
                    onText: () => Colors.white
                },
                'blue': {
                    variants: ThemeColorVariants.MuiBlue,
                    onText: ThemeColorPalettes.getMuiBlueColor
                },
                'blueGrey': {
                    variants: ThemeColorVariants.MuiBlueGrey,
                    onText: ThemeColorPalettes.getMuiBlueGreyColor
                },
                'indigo': {
                    variants: ThemeColorVariants.MuiIndigo,
                    onText: ThemeColorPalettes.getMuiIndigoColor
                },
                'green': {
                    variants: ThemeColorVariants.MuiGreen,
                    onText: ThemeColorPalettes.getMuiGreenColor
                },
                'teal': {
                    variants: ThemeColorVariants.MuiTeal,
                    onText: ThemeColorPalettes.getMuiTealColor
                },
                'yellow': {
                    variants: ThemeColorVariants.MuiYellow,
                    onText: ThemeColorPalettes.getMuiYellowColor
                },
                'amber': {
                    variants: ThemeColorVariants.MuiAmber,
                    onText: ThemeColorPalettes.getMuiAmberColor
                },
                'red': {
                    variants: ThemeColorVariants.MuiRed,
                    onText: ThemeColorPalettes.getMuiRedColor
                },
                'brown': {
                    variants: ThemeColorVariants.MuiBrown,
                    onText: ThemeColorPalettes.getMuiBrownColor
                }
            }
        },
        'dark': {
            mode: 'dark',
            text: {
                primary: new Color('rgba(255, 255, 255, 0.9)'),
                secondary: new Color('rgba(255, 255, 255, 0.7)'),
                disabledOpacity: 0.5
            },
            background: {
                default: new Color('#121212'),
                secondary: new Color('#121212'),
                disabledOpacity: 0.12
            },
            border: {
                primary: new Color('rgba(255, 255, 255, 0.25)'),
                secondary: new Color('rgba(255, 255, 255, 0.4)'),
                disabledOpacity: 0.26
            },
            action: {
                activatedOpacity: 0.12,
                hoverOpacity: 0.1,
                selectedOpacity: 0.16,
                disabledOpacity: 0.3,
                focusOpacity: 0.12
            },
            colors: {
                'primary': {
                    variants: ColorVariants.createFromColorRelativeLightness('#90caf9', '#e3f2fd', '#42a5f5'),
                    onText: () => new Color('rgba(0, 0, 0, 0.87)')
                },
                'secondary': {
                    variants: ColorVariants.createFromColorRelativeLightness('#ce93d8', '#f3e5f5', '#ab47bc'),
                    onText: () => new Color('rgba(0, 0, 0, 0.87)')
                },
                'error': {
                    variants: ColorVariants.createFromColorRelativeLightness('#f44336', '#e57373', '#d32f2f'),
                    onText: () => Colors.white
                },
                'warning': {
                    variants: ColorVariants.createFromColorRelativeLightness('#ffa726', '#ffb74d', '#f57c00'),
                    onText: () => new Color('rgba(0, 0, 0, 0.87)')
                },
                'info': {
                    variants: ColorVariants.createFromColorRelativeLightness('#29b6f6', '#4fc3f7', '#4fc3f7'),
                    onText: () => new Color('rgba(0, 0, 0, 0.87)')
                },
                'success': {
                    variants: ColorVariants.createFromColorRelativeLightness('#66bb6a', '#81c784', '#388e3c'),
                    onText: () => new Color('rgba(0, 0, 0, 0.87)')
                },
                'blue': {
                    variants: ThemeColorVariants.MuiBlue,
                    onText: ThemeColorPalettes.getMuiBlueColor
                },
                'blueGrey': {
                    variants: ThemeColorVariants.MuiBlueGrey,
                    onText: ThemeColorPalettes.getMuiBlueGreyColor
                },
                'indigo': {
                    variants: ThemeColorVariants.MuiIndigo,
                    onText: ThemeColorPalettes.getMuiIndigoColor
                },
                'green': {
                    variants: ThemeColorVariants.MuiGreen,
                    onText: ThemeColorPalettes.getMuiGreenColor
                },
                'teal': {
                    variants: ThemeColorVariants.MuiTeal,
                    onText: ThemeColorPalettes.getMuiTealColor
                },
                'yellow': {
                    variants: ThemeColorVariants.MuiYellow,
                    onText: ThemeColorPalettes.getMuiYellowColor
                },
                'amber': {
                    variants: ThemeColorVariants.MuiAmber,
                    onText: ThemeColorPalettes.getMuiAmberColor
                },
                'red': {
                    variants: ThemeColorVariants.MuiRed,
                    onText: ThemeColorPalettes.getMuiRedColor
                },
                'brown': {
                    variants: ThemeColorVariants.MuiBrown,
                    onText: ThemeColorPalettes.getMuiBrownColor
                }
            }
        }
    };
}

/**
 * Набор констант для темы
 */
class ThemeConstant {
    // #region Const 
    /**
     * Ключ под которым сохраняется тема сайта
     */
    static SaveKey = 'lotus-theme';
    /**
     * Названия атрибута в документа под которым сохраняется тема сайта
     */
    static DataAttributeThemeMode = 'data-theme';
    /**
     * Названия атрибута в документа под которым сохраняется цвет темы сайта
     */
    static DataAttributeThemeColor = 'data-color';
    /**
     * Шрифт по умолчанию
     */
    static FontDefault = 'Verdana, Geneva, Tahoma, sans-serif';
    /**
     * Шрифт для акцента
     */
    static FontAccent = 'Arial, Helvetica, sans-serif';
    /**
     * Скорость переходов анимации/состояния, в миллисекундах
     */
    static TransitionSpeed = 400;
    /**
     * Скорость переходов анимации/состояния, в миллисекундах
     */
    static TransitionSpeedFast = 250;
    /**
     * Прозрачность тени для границы элементов UI которые при наведении
     */
    static OpacityForBorderShadowHover = 0.2;
    /**
     * Прозрачность тени для границы элементов UI которые при активном состоянии
     */
    static OpacityForBorderShadowActive = 0.4;
}

/**
 * Тема приложения
 */
class Theme {
    // #region Static properties
    static _currentPalette;
    static _currentColor;
    /**
     * Получить текущую палитру цвета
     */
    static get currentPalette() {
        if (Theme._currentPalette)
            return Theme._currentPalette;
        return ThemeColorPalettes.Palettes['light'];
    }
    /**
     * Установить текущую палитру цвета
     */
    static set currentPalette(palette) {
        Theme._currentPalette = palette;
    }
    /**
     * Получить основной цвет
     */
    static get currentColor() {
        if (Theme._currentColor)
            return Theme._currentColor;
        return 'blue';
    }
    /**
     * Установить основной цвет
     */
    static set currentColor(themeColor) {
        Theme._currentColor = themeColor;
    }
}

/**
 * Массив типов цветов
 */
const TThemeColors = ['primary', 'secondary', 'error', 'warning', 'info', 'success',
    'blue', 'blueGrey', 'indigo', 'green', 'teal', 'yellow', 'amber', 'brown'];
/**
 * Набор типов цветов в виде опций
 */
const ThemeColorOptions = TThemeColors.map((x) => {
    return {
        text: StringHelper.capitalizeFirstLetter(x),
        value: x
    };
});
/**
 * Функция для проверки, является ли цвет типом цвета темы
 * @param color Проверяемый цвет
 * @returns Статус проверки
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkOfThemeColor(color) {
    return TThemeColors.includes(color);
}

/**
 * Массив режимов тем
 */
const TThemeModes = ['light', 'dark'];
/**
 * Набор режимов тем в виде опций
 */
const ThemeModeOptions = TThemeModes.map((x) => {
    return {
        text: StringHelper.capitalizeFirstLetter(x),
        value: x
    };
});

/* eslint-disable @typescript-eslint/no-explicit-any */
class ThemeColorVariantHelper {
    /**
     * Функция для проверки, является ли цвет вариантом цвета темы
     * @param color Проверяемый цвет
     * @returns Статус проверки
     */
    static checkOf(color) {
        if (typeof color == 'string') {
            for (let index = color.length - 1; index >= 0; index--) {
                const c = color[index];
                if (c == c.toUpperCase()) {
                    const themeColor = color.substring(0, index);
                    const colorVariant = StringHelper.lowercaseFirstLetter(color.substring(index));
                    return checkOfThemeColor(themeColor) && checkOfColorVariantName(colorVariant);
                }
            }
        }
        return false;
    }
    /**
     * Создание вариант цвета темы
     * @param color Тип цвета темы
     * @param colorVariant Именованный тип в вариативности цветов
     * @returns Вариант цвета темы
     */
    static create(color, colorVariant) {
        if (colorVariant == 'main')
            return color;
        return `${color}${StringHelper.capitalizeFirstLetter(colorVariant)}`;
    }
    /**
     * Деконструкция варианта цвета темы в тип цвета темы и именованный тип в вариативности цветов
     * @param color Вариант цвета темы
     * @returns Тип цвета темы и именованный тип в вариативности цветов
     */
    static deconstruction(color) {
        if (typeof color == 'string') {
            if (checkOfThemeColor(color))
                return { themeColor: color, colorVariant: 'main' };
            for (let index = color.length - 1; index >= 0; index--) {
                const c = color[index];
                if (c == c.toUpperCase()) {
                    const themeColor = color.substring(0, index);
                    const colorVariant = StringHelper.lowercaseFirstLetter(color.substring(index));
                    if (checkOfThemeColor(themeColor) && checkOfColorVariantName(colorVariant)) {
                        return {
                            themeColor: themeColor,
                            colorVariant: colorVariant
                        };
                    }
                }
            }
        }
        // eslint-disable-next-line consistent-return
        return undefined;
    }
    /**
     * Получить варианта цвета темы смещенный на указанную величину
     * @param color Вариант цвета темы
     * @returns Смещенный варианта цвета
     */
    static next(color, delta) {
        if (typeof color == 'string') {
            for (let index = color.length - 1; index >= 0; index--) {
                const c = color[index];
                if (c == c.toUpperCase()) {
                    const themeColor = color.substring(0, index);
                    const colorVariant = StringHelper.lowercaseFirstLetter(color.substring(index));
                    if (checkOfThemeColor(themeColor) && checkOfColorVariantName(colorVariant)) {
                        const colorVariantNext = ColorVariantsHelper.getNextIndex(ColorVariantsHelper.getIndexByName(colorVariant), delta);
                        return ThemeColorVariantHelper.create(themeColor, ColorVariantsHelper.getNameByIndex(colorVariantNext));
                    }
                }
            }
        }
        return color;
    }
}

class ThemePaletteHelper {
    /**
     * Получить степень прозрачности
     * @param actionType Тип действия
     */
    static getOpacity(actionType) {
        let opacity = undefined;
        if (actionType) {
            switch (actionType) {
                case 'active':
                    opacity = Theme.currentPalette.action.activatedOpacity;
                    break;
                case 'hover':
                    opacity = Theme.currentPalette.action.hoverOpacity;
                    break;
                case 'selected':
                    opacity = Theme.currentPalette.action.selectedOpacity;
                    break;
                case 'disabled':
                    opacity = Theme.currentPalette.action.disabledOpacity;
                    break;
                case 'focus':
                    opacity = Theme.currentPalette.action.focusOpacity;
                    break;
            }
        }
        return opacity;
    }
    /**
     * Получить палитру цвета
     * @param color Вариант цвета темы
     */
    static getPaletteColor(color) {
        const colorData = ThemeColorVariantHelper.deconstruction(color);
        if (!colorData)
            return;
        const palette = Theme.currentPalette.colors[colorData.themeColor];
        // eslint-disable-next-line consistent-return
        return palette;
    }
    /**
     * Получить цвет текущей темы
     * @param color Вариант цвета темы
     * @param actionType Тип действия
     * @returns Цвет
     */
    static getElementColor(color, actionType) {
        const colorData = ThemeColorVariantHelper.deconstruction(color);
        if (!colorData)
            return Colors.red;
        const palette = Theme.currentPalette.colors[colorData.themeColor];
        return palette.variants.getByName(colorData.colorVariant, ThemePaletteHelper.getOpacity(actionType));
    }
    /**
     * Получить цвет текста текущей темы
     * @param color Вариант цвета темы
     * @param allColor Если True то будет браться не только основной или дополнительный цвет
     * @param actionType Тип действия
     * @returns Цвет
     */
    static getTextColor(color, allColor, actionType) {
        const colorData = ThemeColorVariantHelper.deconstruction(color);
        if (!colorData)
            return Colors.red;
        let opacity = undefined;
        if (actionType) {
            switch (actionType) {
                case 'active':
                    opacity = Theme.currentPalette.action.activatedOpacity;
                    break;
                case 'hover':
                    opacity = Theme.currentPalette.action.hoverOpacity;
                    break;
                case 'selected':
                    opacity = Theme.currentPalette.action.selectedOpacity;
                    break;
                case 'disabled':
                    opacity = Theme.currentPalette.text.disabledOpacity;
                    break;
                case 'focus':
                    opacity = Theme.currentPalette.action.focusOpacity;
                    break;
            }
        }
        if (allColor) {
            if (colorData.themeColor !== 'primary' && colorData.themeColor !== 'secondary') {
                const palette = Theme.currentPalette.colors[colorData.themeColor];
                return palette.variants.getByName(colorData.colorVariant, opacity);
            }
        }
        if (colorData.themeColor == 'primary') {
            return Theme.currentPalette.text.primary.toModifyAlphaOrThis(opacity);
        }
        else {
            return Theme.currentPalette.text.secondary.toModifyAlphaOrThis(opacity);
        }
    }
    /**
     * Получить цвет фона текущей темы
     * @param color Вариант цвета темы
     * @param allColor Если True то будет браться не только основной или дополнительный цвет
     * @param actionType Тип действия
     * @returns Цвет
     */
    static getBackgroundColor(color, allColor, actionType) {
        const colorData = ThemeColorVariantHelper.deconstruction(color);
        if (!colorData)
            return Colors.red;
        let opacity = undefined;
        if (actionType) {
            switch (actionType) {
                case 'active':
                    opacity = Theme.currentPalette.action.activatedOpacity;
                    break;
                case 'hover':
                    opacity = Theme.currentPalette.action.hoverOpacity;
                    break;
                case 'selected':
                    opacity = Theme.currentPalette.action.selectedOpacity;
                    break;
                case 'disabled':
                    opacity = Theme.currentPalette.background.disabledOpacity;
                    break;
                case 'focus':
                    opacity = Theme.currentPalette.action.focusOpacity;
                    break;
            }
        }
        if (allColor) {
            if (colorData.themeColor !== 'primary' && colorData.themeColor !== 'secondary') {
                const palette = Theme.currentPalette.colors[colorData.themeColor];
                return palette.variants.getByName(colorData.colorVariant, opacity);
            }
        }
        if (colorData.themeColor == 'primary') {
            return Theme.currentPalette.background.default.toModifyAlphaOrThis(opacity);
        }
        else {
            return Theme.currentPalette.background.secondary.toModifyAlphaOrThis(opacity);
        }
    }
    /**
     * Получить цвет границы текущей темы
     * @param color Вариант цвета темы
     * @param allColor Если True то будет браться не только основной или дополнительный цвет
     * @param actionType Тип действия
     * @returns Цвет
     */
    static getBorderColor(color, allColor, actionType) {
        const colorData = ThemeColorVariantHelper.deconstruction(color);
        if (!colorData)
            return Colors.red;
        let opacity = undefined;
        if (actionType) {
            switch (actionType) {
                case 'active':
                    opacity = Theme.currentPalette.action.activatedOpacity;
                    break;
                case 'hover':
                    opacity = Theme.currentPalette.action.hoverOpacity;
                    break;
                case 'selected':
                    opacity = Theme.currentPalette.action.selectedOpacity;
                    break;
                case 'disabled':
                    opacity = Theme.currentPalette.border.disabledOpacity;
                    break;
                case 'focus':
                    opacity = Theme.currentPalette.action.focusOpacity;
                    break;
            }
        }
        if (allColor) {
            if (colorData.themeColor !== 'primary' && colorData.themeColor !== 'secondary') {
                const palette = Theme.currentPalette.colors[colorData.themeColor];
                return palette.variants.getByName(colorData.colorVariant, opacity);
            }
        }
        if (colorData.themeColor == 'primary') {
            return Theme.currentPalette.border.primary.toModifyAlphaOrThis(opacity);
        }
        else {
            return Theme.currentPalette.border.secondary.toModifyAlphaOrThis(opacity);
        }
    }
    /**
     * Получить цвет текущей темы для указанной структурной части элемента
     * @param part Структурная часть UI
     * @param color Вариант цвета темы
     * @param actionType Тип действия
     * @returns Цвет
     */
    static getColorByStructuralPart(part, color, actionType) {
        switch (part) {
            case 'element': return ThemePaletteHelper.getElementColor(color, actionType);
            case 'background': return ThemePaletteHelper.getBackgroundColor(color, true, actionType);
            case 'text': return ThemePaletteHelper.getTextColor(color, true, actionType);
            case 'border': return ThemePaletteHelper.getBorderColor(color, true, actionType);
        }
        return Colors.red;
    }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
class InteractivityBackgroundLogic {
    static getEffectByState(element, state, part, actionType) {
        const backProps = {};
        const backColor = ObjectHelper.getValueByPropertyPath(element, 'backColor');
        const hoverBackColor = ObjectHelper.getValueByPropertyPath(element, 'hoverBackColor');
        const pressedBackColor = ObjectHelper.getValueByPropertyPath(element, 'pressedBackColor');
        switch (state) {
            case 'normal':
                {
                    backProps.backgroundColor = ThemePaletteHelper.getColorByStructuralPart(part, backColor ?? 'primary', actionType).toCSSRgbValue();
                }
                break;
            case 'hover':
                {
                    backProps.backgroundColor = ThemePaletteHelper.getColorByStructuralPart(part, hoverBackColor ??
                        ThemeColorVariantHelper.next(backColor ?? 'primary', -2), actionType).toCSSRgbValue();
                }
                break;
            case 'pressed':
                {
                    backProps.backgroundColor = ThemePaletteHelper.getColorByStructuralPart(part, pressedBackColor ??
                        ThemeColorVariantHelper.next(backColor ?? 'primary', 2), actionType).toCSSRgbValue();
                }
                break;
        }
        return backProps;
    }
    static getProperties(element, type, state, part, actionType) {
        const backProps = {};
        return InteractivityBackgroundLogic.fillProperties(backProps, element, type, state, part, actionType);
    }
    static fillProperties(target, element, type, state, part, actionType) {
        switch (type) {
            case 'initial':
                {
                    target.backgroundColor = 'initial';
                }
                break;
            case 'none':
                {
                    target.backgroundColor = 'transparent';
                }
                break;
            case 'mandatory':
                {
                    target.backgroundColor = InteractivityBackgroundLogic.getEffectByState(element, state, part, actionType).backgroundColor;
                }
                break;
        }
        return target;
    }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
class InteractivityBorderLogic {
    static getEffectByState(element, state, part, actionType) {
        const borderProps = {};
        const backColor = ObjectHelper.getValueByPropertyPath(element, 'backColor');
        const borderColor = ObjectHelper.getValueByPropertyPath(element, 'borderColor');
        const hoverBorderColor = ObjectHelper.getValueByPropertyPath(element, 'hoverBorderColor');
        const pressedBorderColor = ObjectHelper.getValueByPropertyPath(element, 'pressedBorderColor');
        switch (state) {
            case 'normal':
                {
                    borderProps.borderColor = ThemePaletteHelper.getColorByStructuralPart(part, borderColor ?? backColor ?? 'primary', actionType).toCSSRgbValue();
                }
                break;
            case 'hover':
                {
                    borderProps.borderColor = ThemePaletteHelper.getColorByStructuralPart(part, hoverBorderColor ??
                        ThemeColorVariantHelper.next(borderColor ?? backColor ?? 'primary', 2), actionType).toCSSRgbValue();
                }
                break;
            case 'pressed':
                {
                    borderProps.borderColor = ThemePaletteHelper.getColorByStructuralPart(part, pressedBorderColor ??
                        ThemeColorVariantHelper.next(borderColor ?? backColor ?? 'primary', -2), actionType).toCSSRgbValue();
                }
                break;
        }
        return borderProps;
    }
    static getProperties(element, type, state, part, actionType) {
        const borderProps = {};
        return InteractivityBorderLogic.fillProperties(borderProps, element, type, state, part, actionType);
    }
    static fillProperties(target, element, type, state, part, actionType) {
        const borderStyle = ObjectHelper.getValueByPropertyPath(element, 'borderStyle');
        const borderWidth = ObjectHelper.getValueByPropertyPath(element, 'borderWidth');
        const borderColor = ObjectHelper.getValueByPropertyPath(element, 'borderColor');
        switch (type) {
            // Границы нет
            case 'none':
                {
                    target.border = 'none';
                    target.borderColor = 'transparent';
                }
                break;
            // Граница может быть
            case 'maybe':
                {
                    if (hasBorderProperties(borderStyle, borderWidth, borderColor)) {
                        target.borderWidth = borderWidth ?? '1px';
                        target.borderStyle = borderStyle ?? 'solid';
                        target.borderColor = InteractivityBorderLogic.getEffectByState(element, state, part, actionType).borderColor;
                    }
                    else {
                        target.border = 'none';
                        target.borderColor = 'transparent';
                    }
                }
                break;
            // Граница не видна
            case 'invisible':
                {
                    target.borderColor = 'transparent';
                    target.borderWidth = borderWidth ?? '1px';
                }
                break;
            // Граница обязательна
            case 'mandatory':
                {
                    target.borderWidth = borderWidth ?? '1px';
                    target.borderStyle = borderStyle ?? 'solid';
                    target.borderColor = InteractivityBorderLogic.getEffectByState(element, state, part, actionType).borderColor;
                }
                break;
        }
        return target;
    }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
class InteractivityTextLogic {
    static getEffectByState(element, state, part, actionType) {
        const textProps = {};
        const backColor = ObjectHelper.getValueByPropertyPath(element, 'backColor');
        const textColor = ObjectHelper.getValueByPropertyPath(element, 'textColor');
        const hoverTextColor = ObjectHelper.getValueByPropertyPath(element, 'hoverTextColor');
        const pressedTextColor = ObjectHelper.getValueByPropertyPath(element, 'pressedTextColor');
        switch (state) {
            case 'normal':
                {
                    textProps.color = ThemePaletteHelper.getColorByStructuralPart(part, textColor ?? backColor ?? 'primary', actionType).toCSSRgbValue();
                }
                break;
            case 'hover':
                {
                    textProps.color = ThemePaletteHelper.getColorByStructuralPart(part, hoverTextColor ??
                        ThemeColorVariantHelper.next(textColor ?? backColor ?? 'primary', 2), actionType).toCSSRgbValue();
                }
                break;
            case 'pressed':
                {
                    textProps.color = ThemePaletteHelper.getColorByStructuralPart(part, pressedTextColor ??
                        ThemeColorVariantHelper.next(textColor ?? backColor ?? 'primary', -2), actionType).toCSSRgbValue();
                }
                break;
        }
        return textProps;
    }
    static getProperties(element, type, state, part, actionType) {
        const textProps = {};
        return InteractivityTextLogic.fillProperties(textProps, element, type, state, part, actionType);
    }
    static fillProperties(target, element, type, state, part, actionType) {
        const backColor = ObjectHelper.getValueByPropertyPath(element, 'backColor');
        const textColor = ObjectHelper.getValueByPropertyPath(element, 'textColor');
        switch (type) {
            case 'default':
                {
                    target.color = InteractivityTextLogic.getEffectByState(element, state, part, actionType).color;
                }
                break;
            case 'background':
                {
                    if (textColor) {
                        target.color = InteractivityTextLogic.getEffectByState(element, state, part, actionType).color;
                    }
                    else {
                        target.color = ThemePaletteHelper.getPaletteColor(backColor ?? 'primary')?.onText('main').toCSSRgbValue();
                    }
                }
                break;
        }
        return target;
    }
}

/**
 * Логика применения визуальных эффектов к элементу UI в зависимости от модель применения и состояния интерактивности элемента
 */
class InteractivityLogic {
    /**
     * Получить визуальный эффекты для фона элемента UI
     * @param model Модель применения визуальных эффектов к элементу UI
     * @param state Состояние интерактивности элемента UI
     * @param elem Интерактивный элемент
     * @param isSelected Контекст элемента UI для применения визуального эффекта
     * @returns Свойства CSSProperties
     */
    static getEffectProps(model, state, element, context) {
        const isSelected = Boolean(context?.isSelected);
        Boolean(context?.isDisabled);
        Boolean(context?.isFocused);
        Boolean(context?.hasRippleEffect);
        const effectProps = {};
        switch (model) {
            case 'filled':
                {
                    switch (state) {
                        case 'normal':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'normal', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'background', 'normal', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'maybe', 'normal', 'element');
                            }
                            break;
                        case 'hover':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'hover', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'background', 'hover', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'maybe', 'hover', 'element');
                            }
                            break;
                        case 'pressed':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'pressed', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'background', 'pressed', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'maybe', 'pressed', 'element');
                            }
                            break;
                    }
                }
                break;
            case 'outline':
                {
                    switch (state) {
                        case 'normal':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'none', 'normal', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'normal', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'mandatory', 'normal', 'element');
                            }
                            break;
                        case 'hover':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'hover', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'background', 'hover', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'mandatory', 'hover', 'element');
                            }
                            break;
                        case 'pressed':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'pressed', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'background', 'pressed', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'mandatory', 'pressed', 'element');
                            }
                            break;
                    }
                }
                break;
            case 'text':
                {
                    switch (state) {
                        case 'normal':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'none', 'normal', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'normal', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'none', 'normal', 'element');
                            }
                            break;
                        case 'hover':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'hover', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'hover', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'none', 'hover', 'element');
                            }
                            break;
                        case 'pressed':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'pressed', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'pressed', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'none', 'pressed', 'element');
                            }
                            break;
                    }
                }
                break;
            case 'icon':
                {
                    switch (state) {
                        case 'normal':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'none', 'normal', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'normal', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'invisible', 'normal', 'element');
                            }
                            break;
                        case 'hover':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'hover', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'hover', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'mandatory', 'hover', 'element');
                            }
                            break;
                        case 'pressed':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'pressed', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'background', 'pressed', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'mandatory', 'pressed', 'element');
                            }
                            break;
                    }
                }
                break;
            case 'menu':
            case 'input':
                {
                    switch (state) {
                        case 'normal':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'initial', 'normal', 'background');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'normal', 'text');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'mandatory', 'normal', 'border');
                            }
                            break;
                        case 'hover':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'initial', 'hover', 'background');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'hover', 'text');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'mandatory', 'hover', 'border');
                            }
                            break;
                        case 'pressed':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'initial', 'pressed', 'background');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'pressed', 'text');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'mandatory', 'pressed', 'border');
                            }
                            break;
                    }
                }
                break;
            case 'list':
                {
                    switch (state) {
                        case 'normal':
                            {
                                if (isSelected) {
                                    InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'normal', 'background');
                                    InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'normal', 'text');
                                    InteractivityBorderLogic.fillProperties(effectProps, model, 'none', 'normal', 'border');
                                }
                                else {
                                    InteractivityBackgroundLogic.fillProperties(effectProps, model, 'initial', 'normal', 'background');
                                    InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'normal', 'text');
                                    InteractivityBorderLogic.fillProperties(effectProps, model, 'none', 'normal', 'border');
                                }
                            }
                            break;
                        case 'hover':
                            {
                                if (isSelected) {
                                    InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'hover', 'background');
                                    InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'hover', 'text');
                                    InteractivityBorderLogic.fillProperties(effectProps, model, 'none', 'hover', 'border');
                                }
                                else {
                                    InteractivityBackgroundLogic.fillProperties(effectProps, model, 'initial', 'hover', 'background');
                                    InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'hover', 'text');
                                    InteractivityBorderLogic.fillProperties(effectProps, model, 'none', 'hover', 'border');
                                }
                            }
                            break;
                        case 'pressed':
                            {
                                if (isSelected) {
                                    InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'pressed', 'background');
                                    InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'pressed', 'text');
                                    InteractivityBorderLogic.fillProperties(effectProps, model, 'none', 'pressed', 'border');
                                }
                                else {
                                    InteractivityBackgroundLogic.fillProperties(effectProps, model, 'initial', 'pressed', 'background');
                                    InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'pressed', 'text');
                                    InteractivityBorderLogic.fillProperties(effectProps, model, 'none', 'pressed', 'border');
                                }
                            }
                            break;
                    }
                }
                break;
        }
        return effectProps;
    }
}

class CssSizerHelper {
    // #region Padding And Size
    /**
     * Получить свойства CSS по внутреннему отступу в виде TCssProperties
     * @param size Размере элемента UI
     * @param paddingControl Внутренний отступ
     * @param leftRight Тип отступа слева/справа
     * @param topBottom Тип отступа сверху/снизу
     * @returns Свойства CSS по внутреннему отступу в виде TCssProperties
     */
    static getPaddingProps(size, paddingControl, leftRight, topBottom) {
        const paddingProps = {};
        switch (size) {
            case 'smaller':
                {
                    switch (paddingControl) {
                        case 'minimum':
                            {
                                if (topBottom == 'normal') {
                                    paddingProps.paddingTop = '0.06rem';
                                    paddingProps.paddingBottom = '0.08rem';
                                }
                                if (topBottom == 'half') {
                                    paddingProps.paddingTop = '0.06rem';
                                    paddingProps.paddingBottom = '0.08rem';
                                }
                                if (leftRight == 'normal') {
                                    paddingProps.paddingLeft = '0.06rem';
                                    paddingProps.paddingRight = '0.06rem';
                                }
                                if (leftRight == 'half') {
                                    paddingProps.paddingLeft = '0.06rem';
                                    paddingProps.paddingRight = '0.06rem';
                                }
                            }
                            break;
                        case 'normal':
                            {
                                if (topBottom == 'normal') {
                                    paddingProps.paddingTop = '0.15rem';
                                    paddingProps.paddingBottom = '0.15rem';
                                }
                                if (topBottom == 'half') {
                                    paddingProps.paddingTop = '0.1rem';
                                    paddingProps.paddingBottom = '0.15rem';
                                }
                                if (leftRight == 'normal') {
                                    paddingProps.paddingLeft = '0.15rem';
                                    paddingProps.paddingRight = '0.15rem';
                                }
                                if (leftRight == 'half') {
                                    paddingProps.paddingLeft = '0.1rem';
                                    paddingProps.paddingRight = '0.1rem';
                                }
                            }
                            break;
                        case 'enlarged':
                            {
                                if (topBottom == 'normal') {
                                    paddingProps.paddingTop = '0.25rem';
                                    paddingProps.paddingBottom = '0.25rem';
                                }
                                if (topBottom == 'half') {
                                    paddingProps.paddingTop = '0.15rem';
                                    paddingProps.paddingBottom = '0.15rem';
                                }
                                if (leftRight == 'normal') {
                                    paddingProps.paddingLeft = '0.25rem';
                                    paddingProps.paddingRight = '0.25rem';
                                }
                                if (leftRight == 'half') {
                                    paddingProps.paddingLeft = '0.15rem';
                                    paddingProps.paddingRight = '0.15rem';
                                }
                            }
                            break;
                    }
                }
                break;
            case 'small':
                {
                    switch (paddingControl) {
                        case 'minimum':
                            {
                                if (topBottom == 'normal') {
                                    paddingProps.paddingTop = '0.12rem';
                                    paddingProps.paddingBottom = '0.12rem';
                                }
                                if (topBottom == 'half') {
                                    paddingProps.paddingTop = '0.08rem';
                                    paddingProps.paddingBottom = '0.1rem';
                                }
                                if (leftRight == 'normal') {
                                    paddingProps.paddingLeft = '0.12rem';
                                    paddingProps.paddingRight = '0.12rem';
                                }
                                if (leftRight == 'half') {
                                    paddingProps.paddingLeft = '0.08rem';
                                    paddingProps.paddingRight = '0.08rem';
                                }
                            }
                            break;
                        case 'normal':
                            {
                                if (topBottom == 'normal') {
                                    paddingProps.paddingTop = '0.25rem';
                                    paddingProps.paddingBottom = '0.25rem';
                                }
                                if (topBottom == 'half') {
                                    paddingProps.paddingTop = '0.15rem';
                                    paddingProps.paddingBottom = '0.175rem';
                                }
                                if (leftRight == 'normal') {
                                    paddingProps.paddingLeft = '0.25rem';
                                    paddingProps.paddingRight = '0.25rem';
                                }
                                if (leftRight == 'half') {
                                    paddingProps.paddingLeft = '0.15rem';
                                    paddingProps.paddingRight = '0.15rem';
                                }
                            }
                            break;
                        case 'enlarged':
                            {
                                if (topBottom == 'normal') {
                                    paddingProps.paddingTop = '0.4rem';
                                    paddingProps.paddingBottom = '0.4rem';
                                }
                                if (topBottom == 'half') {
                                    paddingProps.paddingTop = '0.2rem';
                                    paddingProps.paddingBottom = '0.25rem';
                                }
                                if (leftRight == 'normal') {
                                    paddingProps.paddingLeft = '0.4rem';
                                    paddingProps.paddingRight = '0.4rem';
                                }
                                if (leftRight == 'half') {
                                    paddingProps.paddingLeft = '0.2rem';
                                    paddingProps.paddingRight = '0.2rem';
                                }
                            }
                            break;
                    }
                }
                break;
            case 'medium':
                {
                    switch (paddingControl) {
                        case 'minimum':
                            {
                                if (topBottom == 'normal') {
                                    paddingProps.paddingTop = '0.25rem';
                                    paddingProps.paddingBottom = '0.25rem';
                                }
                                if (topBottom == 'half') {
                                    paddingProps.paddingTop = '0.13rem';
                                    paddingProps.paddingBottom = '0.13rem';
                                }
                                if (leftRight == 'normal') {
                                    paddingProps.paddingLeft = '0.25rem';
                                    paddingProps.paddingRight = '0.25rem';
                                }
                                if (leftRight == 'half') {
                                    paddingProps.paddingLeft = '0.13rem';
                                    paddingProps.paddingRight = '0.13rem';
                                }
                            }
                            break;
                        case 'normal':
                            {
                                if (topBottom == 'normal') {
                                    paddingProps.paddingTop = '0.375rem';
                                    paddingProps.paddingBottom = '0.375rem';
                                }
                                if (topBottom == 'half') {
                                    paddingProps.paddingTop = '0.2rem';
                                    paddingProps.paddingBottom = '0.2rem';
                                }
                                if (leftRight == 'normal') {
                                    paddingProps.paddingLeft = '0.375rem';
                                    paddingProps.paddingRight = '0.375rem';
                                }
                                if (leftRight == 'half') {
                                    paddingProps.paddingLeft = '0.2rem';
                                    paddingProps.paddingRight = '0.2rem';
                                }
                            }
                            break;
                        case 'enlarged':
                            {
                                if (topBottom == 'normal') {
                                    paddingProps.paddingTop = '0.55rem';
                                    paddingProps.paddingBottom = '0.55rem';
                                }
                                if (topBottom == 'half') {
                                    paddingProps.paddingTop = '0.28rem';
                                    paddingProps.paddingBottom = '0.28rem';
                                }
                                if (leftRight == 'normal') {
                                    paddingProps.paddingLeft = '0.55rem';
                                    paddingProps.paddingRight = '0.55rem';
                                }
                                if (leftRight == 'half') {
                                    paddingProps.paddingLeft = '0.28rem';
                                    paddingProps.paddingRight = '0.28rem';
                                }
                            }
                            break;
                    }
                }
                break;
            case 'large':
                {
                    switch (paddingControl) {
                        case 'minimum':
                            {
                                if (topBottom == 'normal') {
                                    paddingProps.paddingTop = '0.5rem';
                                    paddingProps.paddingBottom = '0.5rem';
                                }
                                if (topBottom == 'half') {
                                    paddingProps.paddingTop = '0.25rem';
                                    paddingProps.paddingBottom = '0.25rem';
                                }
                                if (leftRight == 'normal') {
                                    paddingProps.paddingLeft = '0.5rem';
                                    paddingProps.paddingRight = '0.5rem';
                                }
                                if (leftRight == 'half') {
                                    paddingProps.paddingLeft = '0.25rem';
                                    paddingProps.paddingRight = '0.25rem';
                                }
                            }
                            break;
                        case 'normal':
                            {
                                if (topBottom == 'normal') {
                                    paddingProps.paddingTop = '0.75rem';
                                    paddingProps.paddingBottom = '0.75rem';
                                }
                                if (topBottom == 'half') {
                                    paddingProps.paddingTop = '0.375rem';
                                    paddingProps.paddingBottom = '0.375rem';
                                }
                                if (leftRight == 'normal') {
                                    paddingProps.paddingLeft = '0.75rem';
                                    paddingProps.paddingRight = '0.75rem';
                                }
                                if (leftRight == 'half') {
                                    paddingProps.paddingLeft = '0.375rem';
                                    paddingProps.paddingRight = '0.375rem';
                                }
                            }
                            break;
                        case 'enlarged':
                            {
                                if (topBottom == 'normal') {
                                    paddingProps.paddingTop = '1.0rem';
                                    paddingProps.paddingBottom = '1.0rem';
                                }
                                if (topBottom == 'half') {
                                    paddingProps.paddingTop = '0.5rem';
                                    paddingProps.paddingBottom = '0.5rem';
                                }
                                if (leftRight == 'normal') {
                                    paddingProps.paddingLeft = '1.0rem';
                                    paddingProps.paddingRight = '1.0rem';
                                }
                                if (leftRight == 'half') {
                                    paddingProps.paddingLeft = '0.5rem';
                                    paddingProps.paddingRight = '0.5rem';
                                }
                            }
                            break;
                    }
                }
                break;
        }
        return paddingProps;
    }
    /**
     * Конвертация размера элемента UI в высоту в пикселях
     * @param size Размере элемента UI
     * @param paddingControl Размер отступов элемента UI
     * @param topBottom Режим отступов по высоте элемента UI
     * @param lineHeight Коэффициент высоты строки
     * @returns Соответствующий размер высоты в пикселях
     */
    static getSizeProps(size, paddingControl, topBottom, lineHeight) {
        const result = CssSizerHelper.convertControlSizeToHeightRem(size, paddingControl, topBottom);
        if (lineHeight) {
            return {
                width: `${result * 16 * lineHeight}px`,
                height: `${result * 16 * lineHeight}px`
            };
        }
        else {
            return {
                width: `${result * 16}px`,
                height: `${result * 16}px`
            };
        }
    }
    // #endregion
    /**
     * Конвертация размера элемента UI в высоту в rem
     * @param size Размере элемента UI
     * @param paddingControl Размер отступов элемента UI
     * @param topBottom Режим отступов по высоте элемента UI
     * @returns Соответствующий размер высоты в rem
     */
    static convertControlSizeToHeightRem(size, paddingControl, topBottom) {
        let result = 0;
        if (size) {
            switch (size) {
                case 'smaller':
                    result = 10 / 16;
                    break;
                case 'small':
                    result = 13 / 16;
                    break;
                case 'medium':
                    result = 1;
                    break;
                case 'large':
                    result = 19 / 16;
                    break;
            }
        }
        const css = CssSizerHelper.getPaddingProps(size, paddingControl, 'normal', topBottom);
        if (css.paddingTop)
            result += NumberHelper.parseFloat(css.paddingTop);
        if (css.paddingBottom)
            result += NumberHelper.parseFloat(css.paddingBottom);
        return result;
    }
    /**
     * Конвертация размера элемента UI в высоту в пикселях
     * @param size Размере элемента UI
     * @param paddingControl Размер отступов элемента UI
     * @param topBottom Режим отступов по высоте элемента UI
     * @param lineHeight Коэффициент высоты строки
     * @returns Соответствующий размер высоты в пикселях
     */
    static convertControlSizeToHeightPixel(size, paddingControl, topBottom, lineHeight) {
        const result = CssSizerHelper.convertControlSizeToHeightRem(size, paddingControl, topBottom);
        if (lineHeight) {
            return result * 16 * lineHeight;
        }
        else {
            return result * 16;
        }
    }
    /**
     * Конвертация размера элемента UI в соответствующий размер иконки в rem
     * @param size Размере элемента UI
     * @returns Соответствующий размер иконки в rem
     */
    static convertControlSizeToIconSizeInRem(size) {
        if (size) {
            switch (size) {
                case 'smaller': return 10 / 16 * 1.5;
                case 'small': return 13 / 16 * 1.5;
                case 'medium': return 1.5;
                case 'large': return 19 / 16 * 1.5;
            }
        }
        return 1.5;
    }
    /**
     * Конвертация размера элемента UI в соответствующий размер иконки в пикселях
     * @param size Размере элемента UI
     * @returns Соответствующий размер иконки в пикселях
     */
    static convertControlSizeToIconSizeInPixel(size) {
        if (size) {
            switch (size) {
                case 'smaller': return 10 * 1.5;
                case 'small': return 13 * 1.5;
                case 'medium': return 16 * 1.5;
                case 'large': return 19 * 1.5;
            }
        }
        return 16 * 1.5;
    }
}

class CssPropertiesHelper {
    // #region Font
    /**
     * Получить свойства CSS по настройкам шрифта в виде TCssProperties
     * @param size Размере элемента UI
     * @param isBold Жирный шрифт
     * @param isFontAccent  Использовать шрифт для акцента внимания
     * @returns Свойства CSS по настройкам шрифта в виде TCssProperties
     */
    static getFontProps(size, isBold, isFontAccent) {
        const fontProps = {};
        if (isFontAccent) {
            fontProps.fontFamily = ThemeConstant.FontDefault;
        }
        else {
            fontProps.fontFamily = ThemeConstant.FontAccent;
        }
        if (size) {
            switch (size) {
                case 'smaller':
                    fontProps.fontSize = 'x-small';
                    break;
                case 'small':
                    fontProps.fontSize = 'small';
                    break;
                case 'medium':
                    fontProps.fontSize = 'medium';
                    break;
                case 'large':
                    fontProps.fontSize = 'large';
                    break;
            }
        }
        if (isBold) {
            fontProps.fontWeight = 'bold';
        }
        return fontProps;
    }
    // #endregion
    // #region TextEffect
    /**
     * Получить свойства CSS по эффектам текста в виде TCssProperties
     * @param size Размере элемента UI
     * @param effect Эффекты текста
     * @param textAlign Выравнивание текста по горизонтали внутри блока
     * @returns Свойства CSS по эффектам текста в виде TCssProperties
     */
    static getTextEffectProps(size, effect, textAlign) {
        const textProps = {};
        const getSizeShadow = () => {
            if (size) {
                switch (size) {
                    case 'smaller': return 0.05;
                    case 'small': return 0.07;
                    case 'medium': return 0.085;
                    case 'large': return 0.1;
                }
            }
            return 0.07;
        };
        const getSizeStroke = () => {
            if (size) {
                switch (size) {
                    case 'smaller': return 0.4;
                    case 'small': return 0.5;
                    case 'medium': return 0.7;
                    case 'large': return 1;
                }
            }
            return 0.5;
        };
        if (effect) {
            switch (effect) {
                case 'shadow':
                    {
                        const sizeShadow = getSizeShadow();
                        textProps.textShadow = `${sizeShadow}rem ${sizeShadow}rem 0 rgba(0, 0, 0, 0.15)`;
                    }
                    break;
                case 'stroke':
                    {
                        const sizeStroke = getSizeStroke();
                        textProps.WebkitTextStroke = `${sizeStroke}px black`;
                    }
                    break;
            }
        }
        if (textAlign) {
            textProps.textAlign = textAlign;
        }
        return textProps;
    }
    // #endregion
    // #region Border
    /**
     * Получить свойства CSS по радиусу границе в виде TCssProperties
     * @param size Размер элемента UI для получения оптимального радиуса
     * @param borderRadius Радиус скругления или статус того что его надо вычислить
     * @returns Свойства CSS по радиусу границе в виде TCssProperties
     */
    static getBorderRadiusProps(size, borderRadius) {
        const getBorderRadius = () => {
            let rem = 0.4;
            switch (size) {
                case 'smaller':
                    {
                        rem = 0.2;
                    }
                    break;
                case 'small':
                    {
                        rem = 0.25;
                    }
                    break;
                case 'medium':
                    {
                        rem = 0.375;
                    }
                    break;
                case 'large':
                    {
                        rem = 0.5;
                    }
                    break;
            }
            return `${rem}rem`;
        };
        if (borderRadius) {
            if (typeof borderRadius === 'boolean') {
                return { borderRadius: getBorderRadius() };
            }
            else {
                return { borderRadius: borderRadius };
            }
        }
        return {};
    }
    /**
     * Получить свойства CSS по индивидуальному радиусу границе в виде TCssProperties
     * @param size Размер элемента UI для получения оптимального радиуса
     * @param borderRadius Радиус скругления или статус того что его надо вычислить
     * @param isTopLeft Скругление верхнего левого угла
     * @param isTopRight Скругление верхнего правого угла
     * @param isBottomLeft Скругление нижнего левого угла
     * @param isBottomRight Скругление нижнего правого угла
     * @returns
     */
    static getBorderRadiusIndividualProps(size, borderRadius, isTopLeft, isTopRight, isBottomLeft, isBottomRight) {
        const getBorderRadius = () => {
            let rem = 0.4;
            switch (size) {
                case 'smaller':
                    {
                        rem = 0.2;
                    }
                    break;
                case 'small':
                    {
                        rem = 0.25;
                    }
                    break;
                case 'medium':
                    {
                        rem = 0.375;
                    }
                    break;
                case 'large':
                    {
                        rem = 0.5;
                    }
                    break;
            }
            return `${rem}rem`;
        };
        const borderProps = {
            borderRadius: 'undefined'
        };
        if (borderRadius) {
            if (typeof borderRadius === 'boolean') {
                if (isTopLeft)
                    borderProps.borderTopLeftRadius = getBorderRadius();
                if (isTopRight)
                    borderProps.borderTopRightRadius = getBorderRadius();
                if (isBottomLeft)
                    borderProps.borderBottomLeftRadius = getBorderRadius();
                if (isBottomRight)
                    borderProps.borderBottomRightRadius = getBorderRadius();
            }
            else {
                if (isTopLeft)
                    borderProps.borderTopLeftRadius = borderRadius;
                if (isTopRight)
                    borderProps.borderTopRightRadius = borderRadius;
                if (isBottomLeft)
                    borderProps.borderBottomLeftRadius = borderRadius;
                if (isBottomRight)
                    borderProps.borderBottomRightRadius = borderRadius;
            }
        }
        return borderProps;
    }
    /**
     * Получить свойства CSS по границе в виде TCssProperties
     * @param size Размер элемента UI для получения оптимального радиуса
     * @param borderStyle Стиль границ
     * @param borderWidth Ширина границ
     * @param borderColor Цвет границ
     * @returns Свойства CSS по границе в виде TCssProperties
     */
    static getBorderStyleProps(size, borderStyle, borderWidth, borderColor) {
        if (hasBorderProperties(borderStyle, borderWidth, borderColor) == false) {
            return { border: 'none' };
        }
        const getBorderWidth = () => {
            let pixel = 1;
            switch (size) {
                case 'smaller':
                    {
                        pixel = 1;
                    }
                    break;
                case 'small':
                    {
                        pixel = 1;
                    }
                    break;
                case 'medium':
                    {
                        if (borderStyle === 'solid' || borderStyle === undefined)
                            pixel = 1;
                        else
                            pixel = 3;
                    }
                    break;
                case 'large':
                    {
                        if (borderStyle === 'solid' || borderStyle === undefined)
                            pixel = 2;
                        else
                            pixel = 3;
                    }
                    break;
            }
            return `${pixel}px`;
        };
        const borderProps = {
            borderWidth: borderWidth ?? getBorderWidth(),
            borderStyle: borderStyle ?? 'solid'
        };
        return borderProps;
    }
    /**
     * Получить свойства CSS по индивидуальной границе в виде TCssProperties
     * @param size Размер элемента UI для получения оптимального радиуса
     * @param borderStyle Стиль границ
     * @param borderWidth Ширина границ
     * @param borderColor Цвет границ
     * @returns Свойства CSS по индивидуальной границе в виде TCssProperties
     */
    static getBorderStyleIndividualProps(size, borderStyle, borderWidth, borderColor, isLeft, isTop, isRight, isBottom) {
        if (hasBorderProperties(borderStyle, borderWidth, borderColor) == false) {
            return { border: 'none' };
        }
        const getBorderWidth = () => {
            let pixel = 1;
            switch (size) {
                case 'smaller':
                    {
                        pixel = 1;
                    }
                    break;
                case 'small':
                    {
                        pixel = 1;
                    }
                    break;
                case 'medium':
                    {
                        if (borderStyle === 'solid' || borderStyle === undefined)
                            pixel = 1;
                        else
                            pixel = 3;
                    }
                    break;
                case 'large':
                    {
                        if (borderStyle === 'solid' || borderStyle === undefined)
                            pixel = 2;
                        else
                            pixel = 3;
                    }
                    break;
            }
            return `${pixel}px`;
        };
        const borderProps = {};
        if (isLeft) {
            borderProps.borderLeftWidth = borderWidth ?? getBorderWidth();
            borderProps.borderLeftStyle = borderStyle ?? 'solid';
        }
        if (isTop) {
            borderProps.borderTopWidth = borderWidth ?? getBorderWidth();
            borderProps.borderTopStyle = borderStyle ?? 'solid';
        }
        if (isRight) {
            borderProps.borderRightWidth = borderWidth ?? getBorderWidth();
            borderProps.borderRightStyle = borderStyle ?? 'solid';
        }
        if (isBottom) {
            borderProps.borderBottomWidth = borderWidth ?? getBorderWidth();
            borderProps.borderBottomStyle = borderStyle ?? 'solid';
        }
        return borderProps;
    }
    // #endregion
    // #endregion
    // #region BorderShadow
    /**
     * Получить свойства CSS по тени для границы в виде TCssProperties
     * @param elevation Относительный размер тени
     * @param color Цвет
     * @param shadowAlpha Альфа компонент цвета для тени
     * @returns Свойства CSS по тени для границы в виде TCssProperties
     */
    static getBorderShadowProps(elevation, color, shadowAlpha) {
        const colorShadow = ThemePaletteHelper.getElementColor(color ?? 'primaryBlack');
        return { boxShadow: `0px 0px ${elevation}px ${elevation}px ${colorShadow.toCSSRgbValue(shadowAlpha)}` };
    }
    // #endregion
    // #region TransitionColors
    /**
     * Получить свойства CSS по переходу цвета и тени в виде TCssProperties
     * @returns Свойства CSS по переходу цвета и тени в виде TCssProperties
     */
    static getTransitionColorsProps() {
        return {
            transition: `background-color ${ThemeConstant.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    box-shadow ${ThemeConstant.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    border-color ${ThemeConstant.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    color ${ThemeConstant.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1);`
        };
    }
    // #endregion
    // #region BoxShadow
    /**
     * Получить свойства CSS по тени в виде TCssProperties
     * @param elevation Относительный размер тени
     * @param color Цвет
     * @param colorVariant Вариант цвета
     * @returns Свойства CSS по тени в виде TCssProperties
     */
    static getBoxShadowProps(elevation, color) {
        const colorShadow = ThemePaletteHelper.getElementColor(color ?? 'primaryBlack');
        const rgba02 = colorShadow.toCSSRgbValue(0.2);
        const rgba014 = colorShadow.toCSSRgbValue(0.14);
        const rgba012 = colorShadow.toCSSRgbValue(0.12);
        let boxShadowValue = '';
        switch (elevation) {
            case 1:
                boxShadowValue = `0px 2px 1px -1px ${rgba02},0px 1px 1px 0px ${rgba014},0px 1px 3px 0px ${rgba012}`;
                break;
            case 2:
                boxShadowValue = `0px 3px 1px -2px ${rgba02},0px 2px 2px 0px ${rgba014},0px 1px 5px 0px ${rgba012}`;
                break;
            case 3:
                boxShadowValue = `0px 3px 3px -2px ${rgba02},0px 3px 4px 0px ${rgba014},0px 1px 8px 0px ${rgba012}`;
                break;
            case 4:
                boxShadowValue = `0px 2px 4px -1px ${rgba02},0px 4px 5px 0px ${rgba014},0px 1px 10px 0px ${rgba012}`;
                break;
            case 5:
                boxShadowValue = `0px 3px 5px -1px ${rgba02},0px 5px 8px 0px ${rgba014},0px 1px 14px 0px ${rgba012}`;
                break;
            case 6:
                boxShadowValue = `0px 3px 5px -1px ${rgba02},0px 6px 10px 0px ${rgba014},0px 1px 18px 0px ${rgba012}`;
                break;
            case 7:
                boxShadowValue = `0px 4px 5px -2px ${rgba02},0px 7px 10px 1px ${rgba014},0px 2px 16px 1px ${rgba012}`;
                break;
            case 8:
                boxShadowValue = `0px 5px 5px -3px ${rgba02},0px 8px 10px 1px ${rgba014},0px 3px 14px 2px ${rgba012}`;
                break;
            case 9:
                boxShadowValue = `0px 5px 6px -3px ${rgba02},0px 9px 12px 1px ${rgba014},0px 3px 16px 2px ${rgba012}`;
                break;
            case 10:
                boxShadowValue = `0px 6px 6px -3px ${rgba02},0px 10px 14px 1px ${rgba014},0px 4px 18px 3px ${rgba012}`;
                break;
            case 11:
                boxShadowValue = `0px 6px 7px -4px ${rgba02},0px 11px 15px 1px ${rgba014},0px 4px 20px 3px ${rgba012}`;
                break;
            case 12:
                boxShadowValue = `0px 7px 8px -4px ${rgba02},0px 12px 17px 2px ${rgba014},0px 5px 22px 4px ${rgba012}`;
                break;
            case 13:
                boxShadowValue = `0px 7px 8px -4px ${rgba02},0px 13px 19px 2px ${rgba014},0px 5px 24px 4px ${rgba012}`;
                break;
            case 14:
                boxShadowValue = `0px 7px 9px -4px ${rgba02},0px 14px 21px 2px ${rgba014},0px 5px 26px 4px ${rgba012}`;
                break;
            case 15:
                boxShadowValue = `0px 8px 9px -5px ${rgba02},0px 15px 22px 2px ${rgba014},0px 6px 28px 5px ${rgba012}`;
                break;
            case 16:
                boxShadowValue = `0px 8px 10px -5px ${rgba02},0px 16px 24px 2px ${rgba014},0px 6px 30px 5px ${rgba012}`;
                break;
            case 17:
                boxShadowValue = `0px 8px 11px -5px ${rgba02},0px 17px 26px 2px ${rgba014},0px 6px 32px 5px ${rgba012}`;
                break;
            case 18:
                boxShadowValue = `0px 9px 11px -5px ${rgba02},0px 18px 28px 2px ${rgba014},0px 7px 34px 6px ${rgba012}`;
                break;
            case 19:
                boxShadowValue = `0px 9px 12px -6px ${rgba02},0px 19px 29px 2px ${rgba014},0px 7px 36px 6px ${rgba012}`;
                break;
            case 20:
                boxShadowValue = `0px 10px 13px -6px ${rgba02},0px 20px 31px 3px ${rgba014},0px 8px 38px 7px ${rgba012}`;
                break;
            case 21:
                boxShadowValue = `0px 10px 13px -6px ${rgba02},0px 21px 33px 3px ${rgba014},0px 8px 40px 7px ${rgba012}`;
                break;
            case 22:
                boxShadowValue = `0px 10px 14px -6px ${rgba02},0px 22px 35px 3px ${rgba014},0px 8px 42px 7px ${rgba012}`;
                break;
            case 23:
                boxShadowValue = `0px 11px 14px -7px ${rgba02},0px 23px 36px 3px ${rgba014},0px 9px 44px 8px ${rgba012}`;
                break;
            case 24:
                boxShadowValue = `0px 11px 15px -7px ${rgba02},0px 24px 38px 3px ${rgba014},0px 9px 46px 8px ${rgba012}`;
                break;
        }
        return { boxShadow: boxShadowValue };
    }
    // #endregion
    // #region TransformScale
    /**
     * Получить свойства CSS по трансформации масштабирования в виде TCssProperties
     * @param scale Масштаб
     * @returns Свойства CSS трансформации масштабирования в виде TCssProperties
     */
    static getTransformScaleProps(scale) {
        if (scale) {
            return { transform: `scale(${scale});` };
        }
        return {};
    }
}

class CssPropertiesBuilder {
    static buildElement(props, context) {
        // Element
        const borderRadius = ObjectHelper.getValueByPropertyPath(props, 'borderRadius');
        const size = ObjectHelper.getValueByPropertyPath(props, 'size');
        const paddingControl = ObjectHelper.getValueByPropertyPath(props, 'paddingControl');
        // Text
        const fontBold = ObjectHelper.getValueByPropertyPath(props, 'fontBold');
        const fontAccent = ObjectHelper.getValueByPropertyPath(props, 'fontAccent');
        const textEffect = ObjectHelper.getValueByPropertyPath(props, 'textEffect');
        const textAlign = ObjectHelper.getValueByPropertyPath(props, 'textAlign');
        // Status
        Boolean(props.disabled || props.isDisabled);
        Boolean(props.isSelected || context?.isSelected);
        // Settings
        const leftRight = ((context && context.leftRight) ? context.leftRight : 'normal');
        const topBottom = ((context && context.topBottom) ? context.topBottom : 'half');
        const isBorderRadiusIndividual = context && (context.isBottomLeft ?? context.isBottomRight ?? context.isTopLeft ?? context.isTopRight);
        return {
            // Element
            ...CssSizerHelper.getPaddingProps(size, paddingControl, leftRight, topBottom),
            ...(isBorderRadiusIndividual
                ? CssPropertiesHelper.getBorderRadiusIndividualProps(size, borderRadius, context?.isTopLeft, context?.isTopRight, context?.isBottomLeft, context?.isBottomRight)
                : CssPropertiesHelper.getBorderRadiusProps(size, borderRadius)),
            // Text
            ...CssPropertiesHelper.getFontProps(size, fontBold, fontAccent),
            ...CssPropertiesHelper.getTextEffectProps(size, textEffect, textAlign)
        };
    }
    static buildInteractivityElement(model, props, context) {
        // Status
        const isDisabled = Boolean(props.disabled || props.isDisabled);
        const isSelected = Boolean(context?.isSelected || props.isSelected);
        // Background
        const backColor = ObjectHelper.getValueByPropertyPath(props, 'backColor');
        // BackgroundEffect
        const hasRippleEffect = Boolean(ObjectHelper.getValueByPropertyPath(props, 'hasRippleEffect'));
        const hasScaleEffect = Boolean(ObjectHelper.getValueByPropertyPath(props, 'hasScaleEffect'));
        const hasShadowBorderEffect = Boolean(ObjectHelper.getValueByPropertyPath(props, 'hasShadowBorderEffect'));
        const hasShadowBoxEffect = Boolean(ObjectHelper.getValueByPropertyPath(props, 'hasShadowBoxEffect'));
        const effectContext = {
            isDisabled: isDisabled,
            isSelected: isSelected,
            hasRippleEffect: hasRippleEffect
        };
        return {
            ...CssPropertiesBuilder.buildElement(props, context),
            ...CssPropertiesHelper.getTransitionColorsProps(),
            ...InteractivityLogic.getEffectProps(model, 'normal', props, effectContext),
            ...((!isDisabled && hasShadowBoxEffect) ? CssPropertiesHelper.getBoxShadowProps(isSelected ? 8 : 2, backColor) : {}),
            ...((!isDisabled && hasShadowBorderEffect && isSelected) ? CssPropertiesHelper.getBorderShadowProps(6, backColor, ThemeConstant.OpacityForBorderShadowActive) : {}),
            ...((!isDisabled && hasScaleEffect && isSelected) ? CssPropertiesHelper.getTransformScaleProps(1.2) : {}),
            // @ts-expect-error IInteractivityBackgroundEffect 
            '&:hover': {
                ...InteractivityLogic.getEffectProps(model, 'hover', props, effectContext),
                ...((!isDisabled && hasShadowBorderEffect && !isSelected) ? CssPropertiesHelper.getBorderShadowProps(4, backColor, ThemeConstant.OpacityForBorderShadowHover) : {}),
                ...((!isDisabled && hasShadowBoxEffect && !isSelected) ? CssPropertiesHelper.getBoxShadowProps(4, backColor) : {}),
                ...((!isDisabled && hasScaleEffect && !isSelected) ? CssPropertiesHelper.getTransformScaleProps(1.05) : {})
            },
            '&:active': {
                ...InteractivityLogic.getEffectProps(model, 'pressed', props, effectContext),
                ...((!isDisabled && hasShadowBorderEffect) ? CssPropertiesHelper.getBorderShadowProps(6, backColor, ThemeConstant.OpacityForBorderShadowActive) : {}),
                ...((!isDisabled && hasShadowBoxEffect) ? CssPropertiesHelper.getBoxShadowProps(8, backColor) : {}),
                ...((!isDisabled && hasScaleEffect && !isSelected) ? CssPropertiesHelper.getTransformScaleProps(0.95) : {})
            },
            '&:checked': {
                ...InteractivityLogic.getEffectProps(model, 'normal', props, effectContext),
                ...((!isDisabled && hasShadowBorderEffect) ? CssPropertiesHelper.getBorderShadowProps(6, backColor, ThemeConstant.OpacityForBorderShadowActive) : {}),
                ...((!isDisabled && hasShadowBoxEffect) ? CssPropertiesHelper.getBoxShadowProps(8, backColor) : {}),
                ...((!isDisabled && hasScaleEffect) ? CssPropertiesHelper.getTransformScaleProps(1.2) : {})
            },
            '&:disabled': {
                ...InteractivityLogic.getEffectProps(model, 'normal', props, effectContext)
            }
        };
    }
}

class CssContainerHelper {
    // #region FlexRowContainer
    /**
     * Получить оптимальный размер пространства между элементами по горизонтали для Flex контейнера
     * @param size Размер элемента
     * @param paddingControl Внутренний отступ
     * @returns Размер пространства в rem
     */
    static getColumnGapFromSizeInRem(size, paddingControl) {
        switch (size) {
            case 'smaller':
                {
                    switch (paddingControl) {
                        case 'minimum': return 0.12;
                        case 'normal': return 0.15;
                        case 'enlarged': return 0.2;
                    }
                }
                break;
            case 'small':
                {
                    switch (paddingControl) {
                        case 'minimum': return 0.15;
                        case 'normal': return 0.2;
                        case 'enlarged': return 0.25;
                    }
                }
                break;
            case 'medium':
                {
                    switch (paddingControl) {
                        case 'minimum': return 0.25;
                        case 'normal': return 0.3;
                        case 'enlarged': return 0.375;
                    }
                }
                break;
            case 'large':
                {
                    switch (paddingControl) {
                        case 'minimum': return 0.2;
                        case 'normal': return 0.35;
                        case 'enlarged': return 0.45;
                    }
                }
                break;
        }
        return 0.3;
    }
    /**
     * Получить оптимальные настройки Flex контейнера по горизонтали в виде TCssProperties
     * @param size Размер элемента
     * @param paddingControl Внутренний отступ
     * @param isReverse Обратный порядок элементов
     * @param horizontalAlign Распределение элементов по ширине
     * @param verticalAlign Выравнивание элементов по вертикали
     * @returns Настройки Flex контейнера в виде TCssProperties
     */
    static getFlexRowContainer(size, paddingControl, isReverse = false, horizontalAlign = 'flex-start', verticalAlign = 'center') {
        return {
            display: 'flex',
            flexDirection: isReverse ? 'row-reverse' : 'row',
            justifyContent: horizontalAlign,
            alignItems: verticalAlign,
            columnGap: `${CssContainerHelper.getColumnGapFromSizeInRem(size, paddingControl)}rem`
        };
    }
    // #endregion
    // #region FlexColumnContainer
    /**
     * Получить оптимальный размер пространства между элементами по вертикали для Flex контейнера
     * @param size Размер элемента
     * @param paddingControl Внутренний отступ
     * @returns Размер пространства в rem
     */
    static getRowGapFromSizeInRem(size, paddingControl) {
        switch (size) {
            case 'smaller':
                {
                    switch (paddingControl) {
                        case 'minimum': return 0.24;
                        case 'normal': return 0.3;
                        case 'enlarged': return 0.4;
                    }
                }
                break;
            case 'small':
                {
                    switch (paddingControl) {
                        case 'minimum': return 0.3;
                        case 'normal': return 0.4;
                        case 'enlarged': return 0.5;
                    }
                }
                break;
            case 'medium':
                {
                    switch (paddingControl) {
                        case 'minimum': return 0.5;
                        case 'normal': return 0.6;
                        case 'enlarged': return 0.75;
                    }
                }
                break;
            case 'large':
                {
                    switch (paddingControl) {
                        case 'minimum': return 0.4;
                        case 'normal': return 0.7;
                        case 'enlarged': return 0.9;
                    }
                }
                break;
        }
        return 0.6;
    }
    /**
     * Получить оптимальные настройки Flex контейнера по вертикали в виде TCssProperties
     * @param size Размер элемента
     * @param paddingControl Внутренний отступ
     * @param isReverse Обратный порядок элементов
     * @param verticalAlign Распределение элементов по высоте
     * @param horizontalAlign Выравнивание элементов по горизонтали
     * @returns Настройки Flex контейнера в виде TCssProperties
     */
    static getFlexColumnContainer(size, paddingControl, isReverse = false, verticalAlign = 'flex-start', horizontalAlign = 'center') {
        return {
            display: 'flex',
            flexDirection: isReverse ? 'column-reverse' : 'column',
            justifyContent: verticalAlign,
            alignItems: horizontalAlign,
            rowGap: `${CssContainerHelper.getRowGapFromSizeInRem(size, paddingControl)}rem`
        };
    }
    // #endregion
    /**
     * Получить оптимальные настройки Flex контейнера для расположения иконки
     * @param iconPlacement Вариант размещения иконки
     * @param size Размер элемента
     * @param paddingControl Внутренний отступ
     * @returns Настройки Flex контейнера в виде TCssProperties
     */
    static getFlexContainerByIcon(iconPlacement, size, paddingControl) {
        switch (iconPlacement) {
            case 'left': return CssContainerHelper.getFlexRowContainer(size, paddingControl);
            case 'right': return CssContainerHelper.getFlexRowContainer(size, paddingControl, true);
            case 'top': return CssContainerHelper.getFlexColumnContainer(size, paddingControl);
            case 'bottom': return CssContainerHelper.getFlexColumnContainer(size, paddingControl, true);
        }
        return {};
    }
}

const TControlPaddings = ['minimum', 'normal', 'enlarged'];

const TControlSizes = ['smaller', 'small', 'medium', 'large'];

const TCssBorderStyles = ['solid', 'inset', 'outset', 'double', 'groove', 'ridge', 'dotted'];

const TIconPlacements = ['left', 'right', 'top', 'bottom'];

const TShadowElevations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

const TTextEffects = ['shadow', 'stroke', 'glow'];

/**
 *
 * @param timeoutInMs
 * @returns
 */
function sleep(timeoutInMs) {
    return new Promise((resolve) => setTimeout(resolve, timeoutInMs));
}

export { ApiService, ArrayHelper, Assert, BaseCommand, BooleanHelper, BrowserHelper, Color, ColorHelper, ColorNames, ColorVariants, ColorVariantsHelper, Colors, CommandService, CommandServiceClass, CookiesHelper, CssContainerHelper, CssPropertiesBuilder, CssPropertiesHelper, CssSizerHelper, DateHelper, DelimiterCommand, DelimiterCommandDefault, EnumHelper, EventCommand, EventCommandKey, FilterFunctionDescriptors, FilterPropertyHelper, FunctionHelper, GroupFilterFunctionsArray, GroupFilterFunctionsEnum, GroupFilterFunctionsNumber, GroupFilterFunctionsString, HumanizerByteSize, HumanizerDateTime, HumanizerNumber, HumanizerPerson, HumanizerString, InteractivityBackgroundLogic, InteractivityBorderLogic, InteractivityLogic, InteractivityTextLogic, NavigationCommand, NumberHelper, ObjectHelper, ObjectInfo, OptionHelper, PathHelper, PropertyTypeDescriptors, RandomHelper, RequestHelper, Route, SortPropertyHelper, StringHelper, TColorVariantIndexBlack, TColorVariantIndexDark, TColorVariantIndexDarker, TColorVariantIndexDarkest, TColorVariantIndexLight, TColorVariantIndexLighter, TColorVariantIndexMain, TColorVariantIndexPale, TColorVariantIndexWhite, TColorVariantNames, TControlPaddings, TControlSizes, TCssBorderStyles, TIconPlacements, TShadowElevations, TTextEffects, TThemeColors, TThemeModes, Theme, ThemeColorOptions, ThemeColorPalettes, ThemeColorVariantHelper, ThemeColorVariants, ThemeConstant, ThemeModeOptions, ThemePaletteHelper, ValidationResultSuccess, ValidationSuccess, Vector2, Vector3, XMath, checkOfColorVariantName, checkOfConstantable, checkOfEditable, checkOfGrouping, checkOfResult, checkOfThemeColor, hasBorderProperties, hasBorderProps, instanceOfConstantable, instanceOfEditable, instanceOfGrouping, instanceOfResult, localizationCore, sleep };
