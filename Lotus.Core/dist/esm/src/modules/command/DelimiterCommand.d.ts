import { BaseCommand } from './Command';
/**
 * Фейковая команда предназначенная для визуального разделения команд в списках
 */
export declare class DelimiterCommand<TCommandParameter = any> extends BaseCommand<TCommandParameter> {
    constructor(name: string);
}
/**
 * Глобальный доступ к команде разделения по умолчанию
 */
export declare const DelimiterCommandDefault: DelimiterCommand<any>;
