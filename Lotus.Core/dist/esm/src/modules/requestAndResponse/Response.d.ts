import { IResult } from 'types/Result';
import { IPageInfoResponse } from './PageInfo';
/**
 * Интерфейса для получения данных
 */
export interface IResponse<TPayload = any> {
    /**
     * Результат
     */
    result?: IResult;
    /**
     * Данные
     */
    payload?: TPayload;
}
/**
 * Интерфейс для постраничного получения данных
 */
export interface IResponsePage<TPayload = any> extends Omit<IResponse<TPayload>, 'payload'> {
    /**
    * Данные
    */
    payload?: TPayload[];
    /**
     * Информация о странице
     */
    pageInfo?: IPageInfoResponse;
}
