import { BaseCommand, ICommand } from './Command';
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
 * Интерфейс команды предназначенной для генерирования пользовательских событий
 */
export interface IEventCommand extends ICommand {
}
/**
 * Класс команды для генерирования пользовательских событий
 */
export declare class EventCommand extends BaseCommand implements IEventCommand {
    constructor(name: string);
    /**
     * Основной метод команды отвечающий за ее выполнение
     */
    executeCommand(context?: any): void;
}
