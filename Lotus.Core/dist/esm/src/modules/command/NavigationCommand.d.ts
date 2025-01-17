import { IRoute } from 'types/Route';
import { BaseCommand, ICommand } from './Command';
/**
 * Интерфейс команды предназначенной для простой навигации
 */
export interface INavigationCommand extends ICommand {
}
/**
 * Класс команды для простой навигации
 */
export declare class NavigationCommand extends BaseCommand implements INavigationCommand {
    constructor(name: string, route: IRoute);
    /**
     * Статус выбора
     */
    isSelectedCommand(context?: any): boolean;
}
