/**
 * Класс для описания ресурса изображения
 */
export interface IImageResource
{
  /**
   * Идентификатор изображения
   */
  id: number;

  /**
   * Название изображения
   */
  name: string;

  /**
   * Категория изображения
   */
  category?: string;

  /**
   * Строка с данными изображения
   */
  source: string;
}