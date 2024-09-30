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
    /**
     * Проверка значения на undefined или null
     * @param value Проверяемое значение
     * @returns Статус проверки
     */
    static isNullOrUndefined(value) {
        return value === undefined || value === null;
    }
    /**
     * Проверка объекта на то, что все его свойства имеют значения undefined
     * @param object Проверяемый объект
     * @returns Статус проверки
     */
    static isObjectValuesEmpty(object) {
        return !Object.values(object).some((value) => value !== undefined);
    }
    /**
     * Получить значение по условию if
     * @param check Проверяемое значение
     * @param positive Значение возвращаемое в случае не нулевого значения
     * @param negative Значение возвращаемое в случае нулевого значения
     * @returns Значение
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getIf(check, positive, negative) {
        if (check) {
            return positive;
        }
        else {
            return negative;
        }
    }
    /**
     * Получить значение по условию if
     * @param check Проверяемое значение
     * @param positive Функция вызываемая в случае не нулевого значения
     * @param negative Функция вызываемая в случае нулевого значения
     * @returns Значение
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getIfFun(check, positive, negative) {
        if (check) {
            return positive(check);
        }
        else {
            return negative(check);
        }
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
    notEmpty: 'Не пустая',
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
}

const Colors = {
    alice_blue: new Color(240, 248, 255),
    antique_white: new Color(250, 235, 215),
    antique_white_1: new Color(255, 239, 219),
    antique_white_2: new Color(238, 223, 204),
    antique_white_3: new Color(205, 192, 176),
    antique_white_4: new Color(139, 131, 120),
    aquamarine: new Color(127, 255, 212),
    aquamarine_2: new Color(118, 238, 198),
    aquamarine_4: new Color(69, 139, 116),
    azure: new Color(240, 255, 255),
    azure_2: new Color(224, 238, 238),
    azure_3: new Color(193, 205, 205),
    azure_4: new Color(131, 139, 139),
    beige: new Color(245, 245, 220),
    bisque: new Color(255, 228, 196),
    bisque_2: new Color(238, 213, 183),
    bisque_3: new Color(205, 183, 158),
    bisque_4: new Color(139, 125, 107),
    black: new Color(0, 0, 0),
    blanched_almond: new Color(255, 235, 205),
    blue: new Color(0, 0, 255),
    blue_2: new Color(0, 0, 238),
    blue_4: new Color(0, 0, 139),
    blue_violet: new Color(138, 43, 226),
    brown: new Color(165, 42, 42),
    brown_1: new Color(255, 64, 64),
    brown_2: new Color(238, 59, 59),
    brown_3: new Color(205, 51, 51),
    brown_4: new Color(139, 35, 35),
    burlywood: new Color(222, 184, 135),
    burlywood_1: new Color(255, 211, 155),
    burlywood_2: new Color(238, 197, 145),
    burlywood_3: new Color(205, 170, 125),
    burlywood_4: new Color(139, 115, 85),
    cadet_blue: new Color(95, 158, 160),
    cadet_blue_1: new Color(152, 245, 255),
    cadet_blue_2: new Color(142, 229, 238),
    cadet_blue_3: new Color(122, 197, 205),
    cadet_blue_4: new Color(83, 134, 139),
    chartreuse: new Color(127, 255, 0),
    chartreuse_2: new Color(118, 238, 0),
    chartreuse_3: new Color(102, 205, 0),
    chartreuse_4: new Color(69, 139, 0),
    chocolate: new Color(210, 105, 30),
    chocolate_1: new Color(255, 127, 36),
    chocolate_2: new Color(238, 118, 33),
    chocolate_3: new Color(205, 102, 29),
    coral: new Color(255, 127, 80),
    coral_1: new Color(255, 114, 86),
    coral_2: new Color(238, 106, 80),
    coral_3: new Color(205, 91, 69),
    coral_4: new Color(139, 62, 47),
    cornflower_blue: new Color(100, 149, 237),
    corn_silk: new Color(255, 248, 220),
    corn_silk_2: new Color(238, 232, 205),
    corn_silk_3: new Color(205, 200, 177),
    corn_silk_4: new Color(139, 136, 120),
    cyan: new Color(0, 255, 255),
    cyan_2: new Color(0, 238, 238),
    cyan_3: new Color(0, 205, 205),
    cyan_4: new Color(0, 139, 139),
    dark_golden_rod: new Color(184, 134, 11),
    dark_golden_rod_1: new Color(255, 185, 15),
    dark_golden_rod_2: new Color(238, 173, 14),
    dark_golden_rod_3: new Color(205, 149, 12),
    dark_golden_rod_4: new Color(139, 101, 8),
    dark_green: new Color(0, 100, 0),
    dark_khaki: new Color(189, 183, 107),
    dark_olive_green: new Color(85, 107, 47),
    dark_olive_green_1: new Color(202, 255, 112),
    dark_olive_green_2: new Color(188, 238, 104),
    dark_olive_green_3: new Color(162, 205, 90),
    dark_olive_green_4: new Color(110, 139, 61),
    dark_orange: new Color(255, 140, 0),
    dark_orange_1: new Color(255, 127, 0),
    dark_orange_2: new Color(238, 118, 0),
    dark_orange_3: new Color(205, 102, 0),
    dark_orange_4: new Color(139, 69, 0),
    dark_orchid: new Color(153, 50, 204),
    dark_orchid_1: new Color(191, 62, 255),
    dark_orchid_2: new Color(178, 58, 238),
    dark_orchid_3: new Color(154, 50, 205),
    dark_orchid_4: new Color(104, 34, 139),
    dark_salmon: new Color(233, 150, 122),
    dark_sea_green: new Color(143, 188, 143),
    dark_sea_green_1: new Color(193, 255, 193),
    dark_sea_green_2: new Color(180, 238, 180),
    dark_sea_green_3: new Color(155, 205, 155),
    dark_sea_green_4: new Color(105, 139, 105),
    dark_slate_blue: new Color(72, 61, 139),
    dark_slate_gray: new Color(47, 79, 79),
    dark_slate_gray_1: new Color(151, 255, 255),
    dark_slate_gray_2: new Color(141, 238, 238),
    dark_slate_gray_3: new Color(121, 205, 205),
    dark_slate_gray_4: new Color(82, 139, 139),
    dark_turquoise: new Color(0, 206, 209),
    dark_violet: new Color(148, 0, 211),
    deep_pink: new Color(255, 20, 147),
    deep_pink_2: new Color(238, 18, 137),
    deep_pink_3: new Color(205, 16, 118),
    deep_pink_4: new Color(139, 10, 80),
    deep_sky_blue: new Color(0, 191, 255),
    deep_sky_blue_2: new Color(0, 178, 238),
    deep_sky_blue_3: new Color(0, 154, 205),
    deep_sky_blue_4: new Color(0, 104, 139),
    dim_gray: new Color(105, 105, 105),
    dodger_blue: new Color(30, 144, 255),
    dodger_blue_2: new Color(28, 134, 238),
    dodger_blue_3: new Color(24, 116, 205),
    dodger_blue_4: new Color(16, 78, 139),
    fire_brick: new Color(178, 34, 34),
    fire_brick_1: new Color(255, 48, 48),
    fire_brick_2: new Color(238, 44, 44),
    fire_brick_3: new Color(205, 38, 38),
    fire_brick_4: new Color(139, 26, 26),
    floral_white: new Color(255, 250, 240),
    forest_green: new Color(34, 139, 34),
    gainsboro: new Color(220, 220, 220),
    ghost_white: new Color(248, 248, 255),
    gold: new Color(255, 215, 0),
    gold_2: new Color(238, 201, 0),
    gold_3: new Color(205, 173, 0),
    gold_4: new Color(139, 117, 0),
    golden_rod: new Color(218, 165, 32),
    golden_rod_1: new Color(255, 193, 37),
    golden_rod_2: new Color(238, 180, 34),
    golden_rod_3: new Color(205, 155, 29),
    golden_rod_4: new Color(139, 105, 20),
    gray: new Color(190, 190, 190),
    gray_1: new Color(3, 3, 3),
    gray_2: new Color(5, 5, 5),
    gray_3: new Color(8, 8, 8),
    gray_4: new Color(10, 10, 10),
    gray_5: new Color(13, 13, 13),
    gray_6: new Color(15, 15, 15),
    gray_7: new Color(18, 18, 18),
    gray_8: new Color(20, 20, 20),
    gray_9: new Color(23, 23, 23),
    gray_10: new Color(26, 26, 26),
    gray_11: new Color(28, 28, 28),
    gray_12: new Color(31, 31, 31),
    gray_13: new Color(33, 33, 33),
    gray_14: new Color(36, 36, 36),
    gray_15: new Color(38, 38, 38),
    gray_16: new Color(41, 41, 41),
    gray_17: new Color(43, 43, 43),
    gray_18: new Color(46, 46, 46),
    gray_19: new Color(48, 48, 48),
    gray_20: new Color(51, 51, 51),
    gray_21: new Color(54, 54, 54),
    gray_22: new Color(56, 56, 56),
    gray_23: new Color(59, 59, 59),
    gray_24: new Color(61, 61, 61),
    gray_25: new Color(64, 64, 64),
    gray_26: new Color(66, 66, 66),
    gray_27: new Color(69, 69, 69),
    gray_28: new Color(71, 71, 71),
    gray_29: new Color(74, 74, 74),
    gray_30: new Color(77, 77, 77),
    gray_31: new Color(79, 79, 79),
    gray_32: new Color(82, 82, 82),
    gray_33: new Color(84, 84, 84),
    gray_34: new Color(87, 87, 87),
    gray_35: new Color(89, 89, 89),
    gray_36: new Color(92, 92, 92),
    gray_37: new Color(94, 94, 94),
    gray_38: new Color(97, 97, 97),
    gray_39: new Color(99, 99, 99),
    gray_40: new Color(102, 102, 102),
    gray_41: new Color(105, 105, 105),
    gray_42: new Color(107, 107, 107),
    gray_43: new Color(110, 110, 110),
    gray_44: new Color(112, 112, 112),
    gray_45: new Color(115, 115, 115),
    gray_46: new Color(117, 117, 117),
    gray_47: new Color(120, 120, 120),
    gray_48: new Color(122, 122, 122),
    gray_49: new Color(125, 125, 125),
    gray_50: new Color(127, 127, 127),
    gray_51: new Color(130, 130, 130),
    gray_52: new Color(133, 133, 133),
    gray_53: new Color(135, 135, 135),
    gray_54: new Color(138, 138, 138),
    gray_55: new Color(140, 140, 140),
    gray_56: new Color(143, 143, 143),
    gray_57: new Color(145, 145, 145),
    gray_58: new Color(148, 148, 148),
    gray_59: new Color(150, 150, 150),
    gray_60: new Color(153, 153, 153),
    gray_61: new Color(156, 156, 156),
    gray_62: new Color(158, 158, 158),
    gray_63: new Color(161, 161, 161),
    gray_64: new Color(163, 163, 163),
    gray_65: new Color(166, 166, 166),
    gray_66: new Color(168, 168, 168),
    gray_67: new Color(171, 171, 171),
    gray_68: new Color(173, 173, 173),
    gray_69: new Color(176, 176, 176),
    gray_70: new Color(179, 179, 179),
    gray_71: new Color(181, 181, 181),
    gray_72: new Color(184, 184, 184),
    gray_73: new Color(186, 186, 186),
    gray_74: new Color(189, 189, 189),
    gray_75: new Color(191, 191, 191),
    gray_76: new Color(194, 194, 194),
    gray_77: new Color(196, 196, 196),
    gray_78: new Color(199, 199, 199),
    gray_79: new Color(201, 201, 201),
    gray_80: new Color(204, 204, 204),
    gray_81: new Color(207, 207, 207),
    gray_82: new Color(209, 209, 209),
    gray_83: new Color(212, 212, 212),
    gray_84: new Color(214, 214, 214),
    gray_85: new Color(217, 217, 217),
    gray_86: new Color(219, 219, 219),
    gray_87: new Color(222, 222, 222),
    gray_88: new Color(224, 224, 224),
    gray_89: new Color(227, 227, 227),
    gray_90: new Color(229, 229, 229),
    gray_91: new Color(232, 232, 232),
    gray_92: new Color(235, 235, 235),
    gray_93: new Color(237, 237, 237),
    gray_94: new Color(240, 240, 240),
    gray_95: new Color(242, 242, 242),
    gray_97: new Color(247, 247, 247),
    gray_98: new Color(250, 250, 250),
    gray_99: new Color(252, 252, 252),
    green: new Color(0, 255, 0),
    green_2: new Color(0, 238, 0),
    green_3: new Color(0, 205, 0),
    green_4: new Color(0, 139, 0),
    green_yellow: new Color(173, 255, 47),
    honeydew: new Color(240, 255, 240),
    honeydew_2: new Color(224, 238, 224),
    honeydew_3: new Color(193, 205, 193),
    honeydew_4: new Color(131, 139, 131),
    hot_pink: new Color(255, 105, 180),
    hot_pink_1: new Color(255, 110, 180),
    hot_pink_2: new Color(238, 106, 167),
    hot_pink_3: new Color(205, 96, 144),
    hot_pink_4: new Color(139, 58, 98),
    indian_red: new Color(205, 92, 92),
    indian_red_1: new Color(255, 106, 106),
    indian_red_2: new Color(238, 99, 99),
    indian_red_3: new Color(205, 85, 85),
    indian_red_4: new Color(139, 58, 58),
    ivory: new Color(255, 255, 240),
    ivory_2: new Color(238, 238, 224),
    ivory_3: new Color(205, 205, 193),
    ivory_4: new Color(139, 139, 131),
    khaki: new Color(240, 230, 140),
    khaki_1: new Color(255, 246, 143),
    khaki_2: new Color(238, 230, 133),
    khaki_3: new Color(205, 198, 115),
    khaki_4: new Color(139, 134, 78),
    lavender: new Color(230, 230, 250),
    lavender_blush: new Color(255, 240, 245),
    lavender_blush_2: new Color(238, 224, 229),
    lavender_blush_3: new Color(205, 193, 197),
    lavender_blush_4: new Color(139, 131, 134),
    lawn_green: new Color(124, 252, 0),
    lemon_chiffon: new Color(255, 250, 205),
    lemon_chiffon_2: new Color(238, 233, 191),
    lemon_chiffon_3: new Color(205, 201, 165),
    lemon_chiffon_4: new Color(139, 137, 112),
    light: new Color(238, 221, 130),
    light_blue: new Color(173, 216, 230),
    light_blue_1: new Color(191, 239, 255),
    light_blue_2: new Color(178, 223, 238),
    light_blue_3: new Color(154, 192, 205),
    light_blue_4: new Color(104, 131, 139),
    light_coral: new Color(240, 128, 128),
    light_cyan: new Color(224, 255, 255),
    light_cyan_2: new Color(209, 238, 238),
    light_cyan_3: new Color(180, 205, 205),
    light_cyan_4: new Color(122, 139, 139),
    light_golden_rod: new Color(255, 236, 139),
    light_golden_rod_2: new Color(238, 220, 130),
    light_golden_rod_3: new Color(205, 190, 112),
    light_golden_rod_4: new Color(139, 129, 76),
    light_golden_rod_yellow: new Color(250, 250, 210),
    light_gray: new Color(211, 211, 211),
    light_pink: new Color(255, 182, 193),
    light_pink_1: new Color(255, 174, 185),
    light_pink_2: new Color(238, 162, 173),
    light_pink_3: new Color(205, 140, 149),
    light_pink_4: new Color(139, 95, 101),
    light_salmon: new Color(255, 160, 122),
    light_salmon_2: new Color(238, 149, 114),
    light_salmon_3: new Color(205, 129, 98),
    light_salmon_4: new Color(139, 87, 66),
    light_sea_green: new Color(32, 178, 170),
    light_sky_blue: new Color(135, 206, 250),
    light_sky_blue_1: new Color(176, 226, 255),
    light_sky_blue_2: new Color(164, 211, 238),
    light_sky_blue_3: new Color(141, 182, 205),
    light_sky_blue_4: new Color(96, 123, 139),
    light_slate_blue: new Color(132, 112, 255),
    light_slate_gray: new Color(119, 136, 153),
    light_steel_blue: new Color(176, 196, 222),
    light_steel_blue_1: new Color(202, 225, 255),
    light_steel_blue_2: new Color(188, 210, 238),
    light_steel_blue_3: new Color(162, 181, 205),
    light_steel_blue_4: new Color(110, 123, 139),
    light_yellow: new Color(255, 255, 224),
    light_yellow_2: new Color(238, 238, 209),
    light_yellow_3: new Color(205, 205, 180),
    light_yellow_4: new Color(139, 139, 122),
    lime_green: new Color(50, 205, 50),
    linen: new Color(250, 240, 230),
    magenta: new Color(255, 0, 255),
    magenta_2: new Color(238, 0, 238),
    magenta_3: new Color(205, 0, 205),
    magenta_4: new Color(139, 0, 139),
    maroon: new Color(176, 48, 96),
    maroon_1: new Color(255, 52, 179),
    maroon_2: new Color(238, 48, 167),
    maroon_3: new Color(205, 41, 144),
    maroon_4: new Color(139, 28, 98),
    medium: new Color(102, 205, 170),
    medium_aquamarine: new Color(102, 205, 170),
    medium_blue: new Color(0, 0, 205),
    medium_orchid: new Color(186, 85, 211),
    medium_orchid_1: new Color(224, 102, 255),
    medium_orchid_2: new Color(209, 95, 238),
    medium_orchid_3: new Color(180, 82, 205),
    medium_orchid_4: new Color(122, 55, 139),
    medium_purple: new Color(147, 112, 219),
    medium_purple_1: new Color(171, 130, 255),
    medium_purple_2: new Color(159, 121, 238),
    medium_purple_3: new Color(137, 104, 205),
    medium_purple_4: new Color(93, 71, 139),
    medium_sea_green: new Color(60, 179, 113),
    medium_slate_blue: new Color(123, 104, 238),
    medium_spring_green: new Color(0, 250, 154),
    medium_turquoise: new Color(72, 209, 204),
    medium_violet_red: new Color(199, 21, 133),
    midnight_blue: new Color(25, 25, 112),
    mint_cream: new Color(245, 255, 250),
    misty_rose: new Color(255, 228, 225),
    misty_rose_2: new Color(238, 213, 210),
    misty_rose_3: new Color(205, 183, 181),
    misty_rose_4: new Color(139, 125, 123),
    moccasin: new Color(255, 228, 181),
    navajo_white: new Color(255, 222, 173),
    navajo_white_2: new Color(238, 207, 161),
    navajo_white_3: new Color(205, 179, 139),
    navajo_white_4: new Color(139, 121, 94),
    navy_blue: new Color(0, 0, 128),
    old_lace: new Color(253, 245, 230),
    olive_drab: new Color(107, 142, 35),
    olive_drab_1: new Color(192, 255, 62),
    olive_drab_2: new Color(179, 238, 58),
    olive_drab_4: new Color(105, 139, 34),
    orange: new Color(255, 165, 0),
    orange_2: new Color(238, 154, 0),
    orange_3: new Color(205, 133, 0),
    orange_4: new Color(139, 90, 0),
    orange_red: new Color(255, 69, 0),
    orange_red_2: new Color(238, 64, 0),
    orange_red_3: new Color(205, 55, 0),
    orange_red_4: new Color(139, 37, 0),
    orchid: new Color(218, 112, 214),
    orchid_1: new Color(255, 131, 250),
    orchid_2: new Color(238, 122, 233),
    orchid_3: new Color(205, 105, 201),
    orchid_4: new Color(139, 71, 137),
    pale: new Color(219, 112, 147),
    pale_golden_rod: new Color(238, 232, 170),
    pale_green: new Color(152, 251, 152),
    pale_green_1: new Color(154, 255, 154),
    pale_green_2: new Color(144, 238, 144),
    pale_green_3: new Color(124, 205, 124),
    pale_green_4: new Color(84, 139, 84),
    pale_turquoise: new Color(175, 238, 238),
    pale_turquoise_1: new Color(187, 255, 255),
    pale_turquoise_2: new Color(174, 238, 238),
    pale_turquoise_3: new Color(150, 205, 205),
    pale_turquoise_4: new Color(102, 139, 139),
    pale_violet_red: new Color(219, 112, 147),
    pale_violet_red_1: new Color(255, 130, 171),
    pale_violet_red_2: new Color(238, 121, 159),
    pale_violet_red_3: new Color(205, 104, 137),
    pale_violet_red_4: new Color(139, 71, 93),
    papaya_whip: new Color(255, 239, 213),
    peach_puff: new Color(255, 218, 185),
    peach_puff_2: new Color(238, 203, 173),
    peach_puff_3: new Color(205, 175, 149),
    peach_puff_4: new Color(139, 119, 101),
    pink: new Color(255, 192, 203),
    pink_1: new Color(255, 181, 197),
    pink_2: new Color(238, 169, 184),
    pink_3: new Color(205, 145, 158),
    pink_4: new Color(139, 99, 108),
    plum: new Color(221, 160, 221),
    plum_1: new Color(255, 187, 255),
    plum_2: new Color(238, 174, 238),
    plum_3: new Color(205, 150, 205),
    plum_4: new Color(139, 102, 139),
    powder_blue: new Color(176, 224, 230),
    purple: new Color(160, 32, 240),
    purple_1: new Color(155, 48, 255),
    purple_2: new Color(145, 44, 238),
    purple_3: new Color(125, 38, 205),
    purple_4: new Color(85, 26, 139),
    rebecca_purple: new Color(102, 51, 153),
    red: new Color(255, 0, 0),
    red_2: new Color(238, 0, 0),
    red_3: new Color(205, 0, 0),
    red_4: new Color(139, 0, 0),
    rosy_brown: new Color(188, 143, 143),
    rosy_brown_1: new Color(255, 193, 193),
    rosy_brown_2: new Color(238, 180, 180),
    rosy_brown_3: new Color(205, 155, 155),
    rosy_brown_4: new Color(139, 105, 105),
    royal_blue: new Color(65, 105, 225),
    royal_blue_1: new Color(72, 118, 255),
    royal_blue_2: new Color(67, 110, 238),
    royal_blue_3: new Color(58, 95, 205),
    royal_blue_4: new Color(39, 64, 139),
    saddle_brown: new Color(139, 69, 19),
    salmon: new Color(250, 128, 114),
    salmon_1: new Color(255, 140, 105),
    salmon_2: new Color(238, 130, 98),
    salmon_3: new Color(205, 112, 84),
    salmon_4: new Color(139, 76, 57),
    sandy_brown: new Color(244, 164, 96),
    sea_green: new Color(84, 255, 159),
    sea_green_2: new Color(78, 238, 148),
    sea_green_3: new Color(67, 205, 128),
    sea_green_4: new Color(46, 139, 87),
    seashell: new Color(255, 245, 238),
    seashell_2: new Color(238, 229, 222),
    seashell_3: new Color(205, 197, 191),
    seashell_4: new Color(139, 134, 130),
    sienna: new Color(160, 82, 45),
    sienna_1: new Color(255, 130, 71),
    sienna_2: new Color(238, 121, 66),
    sienna_3: new Color(205, 104, 57),
    sienna_4: new Color(139, 71, 38),
    sky_blue: new Color(135, 206, 235),
    sky_blue_1: new Color(135, 206, 255),
    sky_blue_2: new Color(126, 192, 238),
    sky_blue_3: new Color(108, 166, 205),
    sky_blue_4: new Color(74, 112, 139),
    slate_blue: new Color(106, 90, 205),
    slate_blue_1: new Color(131, 111, 255),
    slate_blue_2: new Color(122, 103, 238),
    slate_blue_3: new Color(105, 89, 205),
    slate_blue_4: new Color(71, 60, 139),
    slate_gray: new Color(112, 128, 144),
    slate_gray_1: new Color(198, 226, 255),
    slate_gray_2: new Color(185, 211, 238),
    slate_gray_3: new Color(159, 182, 205),
    slate_gray_4: new Color(108, 123, 139),
    snow: new Color(255, 250, 250),
    snow_2: new Color(238, 233, 233),
    snow_3: new Color(205, 201, 201),
    snow_4: new Color(139, 137, 137),
    spring_green: new Color(0, 255, 127),
    spring_green_2: new Color(0, 238, 118),
    spring_green_3: new Color(0, 205, 102),
    spring_green_4: new Color(0, 139, 69),
    steel_blue: new Color(70, 130, 180),
    steel_blue_1: new Color(99, 184, 255),
    steel_blue_2: new Color(92, 172, 238),
    steel_blue_3: new Color(79, 148, 205),
    steel_blue_4: new Color(54, 100, 139),
    tan: new Color(210, 180, 140),
    tan_1: new Color(255, 165, 79),
    tan_2: new Color(238, 154, 73),
    tan_3: new Color(205, 133, 63),
    tan_4: new Color(139, 90, 43),
    thistle: new Color(216, 191, 216),
    thistle_1: new Color(255, 225, 255),
    thistle_2: new Color(238, 210, 238),
    thistle_3: new Color(205, 181, 205),
    thistle_4: new Color(139, 123, 139),
    tomato: new Color(255, 99, 71),
    tomato_2: new Color(238, 92, 66),
    tomato_3: new Color(205, 79, 57),
    tomato_4: new Color(139, 54, 38),
    transparent: new Color(0, 0, 0, 0),
    turquoise: new Color(64, 224, 208),
    turquoise_1: new Color(0, 245, 255),
    turquoise_2: new Color(0, 229, 238),
    turquoise_3: new Color(0, 197, 205),
    turquoise_4: new Color(0, 134, 139),
    violet: new Color(238, 130, 238),
    violet_red: new Color(208, 32, 144),
    violet_red_1: new Color(255, 62, 150),
    violet_red_2: new Color(238, 58, 140),
    violet_red_3: new Color(205, 50, 120),
    violet_red_4: new Color(139, 34, 82),
    wheat: new Color(245, 222, 179),
    wheat_1: new Color(255, 231, 186),
    wheat_2: new Color(238, 216, 174),
    wheat_3: new Color(205, 186, 150),
    wheat_4: new Color(139, 126, 102),
    white: new Color(255, 255, 255),
    white_smoke: new Color(245, 245, 245),
    yellow: new Color(255, 255, 0),
    yellow_2: new Color(238, 238, 0),
    yellow_3: new Color(205, 205, 0),
    yellow_4: new Color(139, 139, 0),
    yellow_green: new Color(154, 205, 50)
};

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

class ColorVariantHelper {
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
class ColorVariant {
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
        return new ColorVariant(white, palest, pale, lighter, light, main, dark, darker, darkest, black);
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
        return new ColorVariant(white, palest, pale, lighter, light, main, dark, darker, darkest, black);
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
        const name = ColorVariantHelper.getNameByIndex(index);
        return this.getByName(name, modifyAlpha);
    }
    /**
     * Получить следующий цвет по его имени
     * @param name Именованный тип в палитре цветов
     * @param delta Смещение
     * @param modifyAlpha Модификация значения альфы от 0 до 1
     */
    getNextByName(name, delta, modifyAlpha) {
        const nextName = ColorVariantHelper.getNameByIndex(ColorVariantHelper.getNextIndex(ColorVariantHelper.getIndexByName(name), delta));
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        this.executeDefault = this.executeDefault.bind(this);
        this.canExecuteDefault = this.canExecuteDefault.bind(this);
        this.isSelectedDefault = this.isSelectedDefault.bind(this);
        this.execute = this.executeDefault;
        this.canExecute = this.canExecuteDefault;
        this.isSelected = this.isSelectedDefault;
    }
    /**
     * Основной метод команды отвечающий за ее выполнение
     */
    executeDefault() {
    }
    /**
     * Метод определяющий возможность выполнения команды
     */
    canExecuteDefault() {
        return true;
    }
    /**
     * Статус выбора
     */
    isSelectedDefault() {
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class DelimiterCommand extends BaseCommand {
    constructor(name) {
        super(name);
    }
}
/**
 * Глобальный доступ к команде разделения по умолчанию
 */
const DelimiterCommandDefault = new DelimiterCommand('delimiter');

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
    executeDefault() {
        const event = new CustomEvent(EventCommandKey, { detail: this.parameter });
        window.dispatchEvent(event);
    }
    /**
     * Метод определяющий возможность выполнения команды
     */
    canExecuteDefault() {
        return true;
    }
    /**
     * Статус выбора
     */
    isSelectedDefault() {
        if (window.location.pathname === this.route?.path) {
            return true;
        }
        return false;
    }
}

/**
 * Класс команды для простой навигации
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class NavigationCommand extends BaseCommand {
    constructor(name, route) {
        super(name);
        this.route = route;
    }
    /**
     * Основной метод команды отвечающий за ее выполнение
     */
    executeDefault() {
        // TODO document why this method 'execute' is empty
    }
    /**
     * Метод определяющий возможность выполнения команды
     */
    canExecuteDefault() {
        return true;
    }
    /**
     * Статус выбора
     */
    isSelectedDefault() {
        if (window.location.pathname === this.route?.path) {
            return true;
        }
        return false;
    }
}

/**
 * Перечисление для типа функции для фильтрации данных
 */
const FilterFunctionEnum = {
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
     * Не равно пустой строке. Аргумент пустая строка
     */
    NotEmpty: {
        id: 10,
        type: 'NotEmpty',
        abbr: localizationCore.filters.notEmpty,
        desc: localizationCore.filters.notEmpty
    },
    /**
     * Любой из проверяемых элементов списка должен находиться в массиве аргумента
     */
    IncludeAny: {
        id: 11,
        type: 'IncludeAny',
        abbr: localizationCore.filters.includeAny,
        desc: localizationCore.filters.includeAny
    },
    /**
     * Все из проверяемых элементов списка должен находиться в массиве аргумента
     */
    IncludeAll: {
        id: 12,
        type: 'IncludeAll',
        abbr: localizationCore.filters.includeAll,
        desc: localizationCore.filters.includeAll
    },
    /**
     * Проверяемые элементы списка должен быть равны массиву аргумента
     */
    IncludeEquals: {
        id: 13,
        type: 'IncludeEquals',
        abbr: localizationCore.filters.includeEquals,
        desc: localizationCore.filters.includeEquals
    },
    /**
     * Ни один из проверяемых элементов списка не должен находится в массиве аргумента
     */
    IncludeNone: {
        id: 14,
        type: 'IncludeNone',
        abbr: localizationCore.filters.includeNone,
        desc: localizationCore.filters.includeNone
    }
};

/**
 * Группа функций фильтрации для числовых типов
 */
const GroupFilterFunctionsNumber = [
    FilterFunctionEnum.Equals,
    FilterFunctionEnum.NotEqual,
    FilterFunctionEnum.LessThan,
    FilterFunctionEnum.LessThanOrEqual,
    FilterFunctionEnum.GreaterThan,
    FilterFunctionEnum.GreaterThanOrEqual,
    FilterFunctionEnum.Between
];
/**
 * Группа функций фильтрации для строк
 */
const GroupFilterFunctionsString = [
    FilterFunctionEnum.Equals,
    FilterFunctionEnum.Contains,
    FilterFunctionEnum.StartsWith,
    FilterFunctionEnum.EndsWith,
    FilterFunctionEnum.NotEqual,
    FilterFunctionEnum.NotEmpty
];
/**
 * Группа функций фильтрации для перечисления
 */
const GroupFilterFunctionsEnum = [
    FilterFunctionEnum.Equals,
    FilterFunctionEnum.NotEqual
];
/**
 * Группа функций фильтрации для массива
 */
const GroupFilterFunctionsArray = [
    FilterFunctionEnum.IncludeAll,
    FilterFunctionEnum.IncludeAny,
    FilterFunctionEnum.IncludeEquals,
    FilterFunctionEnum.IncludeNone
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
 * Базовый класс для представления(описания) свойств объектов
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class ObjectInfoBase {
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
 * Перечисление для типа свойства
 */
const PropertyTypeEnum = {
    /**
     * Логический тип
     */
    Boolean: {
        id: 0,
        type: 'Boolean'
    },
    /**
     * Целый тип
     */
    Integer: {
        id: 1,
        type: 'Integer'
    },
    /**
     * Вещественный тип
     */
    Float: {
        id: 2,
        type: 'Float'
    },
    /**
     * Строковый тип
     */
    String: {
        id: 3,
        type: 'String'
    },
    /**
     * Перечисление
     */
    Enum: {
        id: 4,
        type: 'Enum'
    },
    /**
     * Тип даты-времени
     */
    DateTime: {
        id: 5,
        type: 'DateTime'
    },
    /**
     * Глобальный идентификатор в формате UUID
     */
    Guid: {
        id: 6,
        type: 'Guid'
    },
    /**
     * Объект
     */
    Object: {
        id: 7,
        type: 'Object'
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
            const key = StringHelper.lowercaseFirstLetter(filterProperty.propertyName);
            switch (propertyType) {
                case 'Boolean':
                    {
                        switch (filterFunction) {
                            case 'Equals': return massive.filter(x => BooleanHelper.parse((x[key])) === BooleanHelper.parse(filterProperty.value));
                            case 'NotEqual': return massive.filter(x => BooleanHelper.parse((x[key])) !== BooleanHelper.parse(filterProperty.value));
                        }
                    }
                    break;
                case 'Integer':
                case 'Float':
                    {
                        switch (filterFunction) {
                            case 'Equals': return massive.filter(x => Number((x[key])) === Number(filterProperty.value));
                            case 'NotEqual': return massive.filter(x => Number((x[key])) !== Number(filterProperty.value));
                            case 'LessThan': return massive.filter(x => Number((x[key])) < Number(filterProperty.value));
                            case 'LessThanOrEqual': return massive.filter(x => Number((x[key])) <= Number(filterProperty.value));
                            case 'GreaterThan': return massive.filter(x => Number((x[key])) > Number(filterProperty.value));
                            case 'GreaterThanOrEqual': return massive.filter(x => Number((x[key])) >= Number(filterProperty.value));
                            case 'Between': return massive.filter(x => {
                                const check = Number((x[key]));
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
                            case 'Equals': return massive.filter(x => String((x[key])) === filterProperty.value);
                            case 'NotEqual': return massive.filter(x => String((x[key])) !== filterProperty.value);
                            case 'Contains': return massive.filter(x => (String((x[key]))).includes(filterProperty.value));
                            case 'StartsWith': return massive.filter(x => (String((x[key]))).startsWith(filterProperty.value));
                            case 'EndsWith': return massive.filter(x => (String((x[key]))).endsWith(filterProperty.value));
                            case 'NotEmpty': return massive.filter(x => StringHelper.isNullOrEmpty(String((x[key]))) === false);
                            case 'LessThan': return massive.filter(x => String((x[key])).localeCompare(filterProperty.value) < 0);
                            case 'LessThanOrEqual': return massive.filter(x => String((x[key])).localeCompare(filterProperty.value) <= 0);
                            case 'GreaterThan': return massive.filter(x => String((x[key])).localeCompare(filterProperty.value) > 0);
                            case 'GreaterThanOrEqual': return massive.filter(x => String((x[key])).localeCompare(filterProperty.value) >= 0);
                        }
                    }
                    break;
                case 'Enum': return massive;
                case 'DateTime':
                    {
                        switch (filterFunction) {
                            case 'Equals': return massive.filter(x => DateHelper.parse((x[key])) === DateHelper.parse(filterProperty.value));
                            case 'NotEqual': return massive.filter(x => DateHelper.parse((x[key])) !== DateHelper.parse(filterProperty.value));
                            case 'LessThan': return massive.filter(x => DateHelper.parse((x[key])) < DateHelper.parse(filterProperty.value));
                            case 'LessThanOrEqual': return massive.filter(x => DateHelper.parse((x[key])) <= DateHelper.parse(filterProperty.value));
                            case 'GreaterThan': return massive.filter(x => DateHelper.parse((x[key])) > DateHelper.parse(filterProperty.value));
                            case 'GreaterThanOrEqual':
                                return massive.filter(x => DateHelper.parse((x[key])) >= DateHelper.parse(filterProperty.value));
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
                    search.append(`sorting[${index}].propertyName`, value.propertyName);
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
                        search.append(`filtering[${index}].propertyName`, filter.propertyName);
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
                        search.append(`filtering[${index}].propertyName`, filter.propertyName);
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
        const key = StringHelper.lowercaseFirstLetter(sortProperty.propertyName);
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
            case 'Float':
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
            case 'Enum': return result;
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

class OptionHelper {
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
        if (initialSelectedValue) {
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
        if (initialSelectedValue) {
            let text = '';
            options.forEach(element => {
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
        if (initialSelectedValue) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let icon = undefined;
            options.forEach(element => {
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
            options.forEach(element => {
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
    static getSelectOptionByValue(options, selectedValue) {
        if (selectedValue) {
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
        if (selectedValue) {
            options.forEach(element => {
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
        if (selectedValue) {
            options.forEach(element => {
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
        if (selectedValues && selectedValues.length > 0) {
            const optionsSelected = [];
            options.forEach(element => {
                if (selectedValues.find((x) => x === element.value)) {
                    optionsSelected.push(element);
                }
            });
            return optionsSelected;
        }
        else {
            return [];
        }
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
            options.forEach(element => {
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
 *
 * @param timeoutInMs
 * @returns
 */
const sleep = (timeoutInMs) => {
    return new Promise((resolve) => setTimeout(resolve, timeoutInMs));
};

export { ApiService, ArrayHelper, BaseCommand, BooleanHelper, BrowserHelper, Color, ColorHelper, ColorNames, ColorVariant, ColorVariantHelper, Colors, CommandService, CommandServiceClass, CookiesHelper, DateHelper, DelimiterCommand, DelimiterCommandDefault, EnumHelper, EventCommand, EventCommandKey, FilterFunctionEnum, FilterPropertyHelper, FunctionHelper, GroupFilterFunctionsArray, GroupFilterFunctionsEnum, GroupFilterFunctionsNumber, GroupFilterFunctionsString, HumanizerByteSize, HumanizerDateTime, HumanizerNumber, HumanizerPerson, HumanizerString, NavigationCommand, NumberHelper, ObjectHelper, ObjectInfoBase, OptionHelper, PathHelper, PropertyTypeEnum, RandomHelper, RequestHelper, Route, SortPropertyHelper, StringHelper, TColorVariantIndexBlack, TColorVariantIndexDark, TColorVariantIndexDarker, TColorVariantIndexDarkest, TColorVariantIndexLight, TColorVariantIndexLighter, TColorVariantIndexMain, TColorVariantIndexPale, TColorVariantIndexWhite, TColorVariantNames, ValidationResultSuccess, ValidationSuccess, Vector2, Vector3, XMath, checkOfConstantable, checkOfEditable, checkOfGrouping, checkOfResult, instanceOfConstantable, instanceOfEditable, instanceOfGrouping, instanceOfResult, localizationCore, sleep };
