import { BaseCommand } from './Command';
/**
 * Наименование(тип) события который посылают команды для генерирования пользовательских событий
 */
export declare const EventCommandKey: string;
/**
 * Базовый интерфейс для предоставления данных пользовательского события
 */
export interface IBaseEventCommandData {
    /**
     * Дискриминатор данных, должны быть уникальным для каждого типа пользовательского события
     */
    discriminator: string;
}
/**
 * Класс команды для генерирования пользовательских событий
 */
export declare class EventCommand<TCommandParameter extends IBaseEventCommandData> extends BaseCommand<TCommandParameter> {
    constructor(name: string);
    /**
     * Основной метод команды отвечающий за ее выполнение
     */
    executeDefault(): void;
    /**
     * Метод определяющий возможность выполнения команды
     */
    canExecuteDefault(): boolean;
    /**
     * Статус выбора
     */
    isSelectedDefault(): boolean;
}
