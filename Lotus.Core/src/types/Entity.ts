import { TGuid } from './Guid';

/**
 * Определение интерфейса для представления сущности предметной области
 */
export interface IEntity<TKey = number | string | TGuid>
{
  /**
   * Идентификатор сущности
   */
  id: TKey;
}