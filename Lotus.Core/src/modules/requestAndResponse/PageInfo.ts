/**
 * Интерфейса для постраничного запроса данных
 */
export interface IPageInfoRequest
{
  /**
   * Номер страницы, отсчет от нуля
   */
  pageNumber: number;

  /**
   * Размер страницы (количество данных)
   */
  pageSize: number;
}

/**
 * Интерфейс для постраничного получения данных
 */
export interface IPageInfoResponse
{
  /**
   * Номер страницы, отсчет от нуля
   */
  pageNumber: number;

  /**
   * Размер страницы (количество данных)
   */
  pageSize: number;

  /**
   * Количество данных на текущей странице
   */
  currentPageSize: number;

  /**
   * Общие количество данных по данному запросу
   */
  totalCount: number;
}