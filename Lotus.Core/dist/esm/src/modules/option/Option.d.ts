import { TKey } from 'types/Key';
/**
 * Интерфейс представляющий некую опцию
 */
export interface IOption {
    /**
     * Значение
     */
    value: TKey;
    /**
     * Текст
     */
    text: string;
    /**
     * Путь к изображению / либо компонент иконки / либо индекс изображения в базе
     */
    icon?: any;
}
