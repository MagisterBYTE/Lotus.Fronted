import { IFilterFunctionDesc } from 'modules/filter';
/**
 * Интерфейс для описания фильтрации свойства
 */
export interface IPropertyFiltering {
    /**
     * Статус включенности фильтрации
     */
    enabled?: boolean;
    /**
     * Функция фильтрации по умолчанию
     */
    functionDefaultDesc: IFilterFunctionDesc;
    /**
     * Вариант фильтра
     */
    variant?: 'text' | 'select' | 'multi-select' | 'range' | 'checkbox' | 'date' | 'date-range' | 'autocomplete';
}
