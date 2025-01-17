import { BaseCommand, ICommand } from './Command';
/**
 * Интерфейс фейковой команды предназначенной для визуального разделения команд в списках
 */
export interface IDelimiterCommand extends ICommand {
}
/**
 * Фейковая команда предназначенная для визуального разделения команд в списках
 */
export declare class DelimiterCommand extends BaseCommand implements IDelimiterCommand {
    constructor(name: string);
}
/**
 * Глобальный доступ к команде разделения по умолчанию
 */
export declare const DelimiterCommandDefault: DelimiterCommand;
