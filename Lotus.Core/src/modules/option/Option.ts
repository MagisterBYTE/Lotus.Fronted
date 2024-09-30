import { TKey } from 'types/Key';

/**
 * Интерфейс представляющий некую опцию
 */
export interface IOption
{
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
}