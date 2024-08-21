import { IImageResource } from './ImageResource';
/**
 * Интерфейс для описания базы данных для доступа к ресурсам изображениям
 */
export interface IImageDatabase {
    /**
    * Получить список всех ресурсов изображений
    * @returns
    */
    getAllImages(): IImageResource[];
    /**
     * Получить идентификатор изображения по его id или имени
     * @param id Идентификатор изображения или имени ресурса изображения
     * @param category Категория изображения
     */
    getImageByIdOrName(id?: number | string, category?: string): IImageResource | undefined;
}
