import { IRoute } from 'types/Route';
/**
 * Делегат для интерфейса команды, возвращает any
 */
export type FunctionCommandDelegateAny = (option: ICommand, context?: any) => any;
/**
 * Делегат для интерфейса команды, возвращает boolean
 */
export type FunctionCommandDelegateBool = (option: ICommand, context?: any) => boolean;
/**
 * Интерфейс команды
 * @description Команда предоставляет собой концепцию (паттерн) для связывания логики выполнения действия и визуального элемента.
 * Как паттерн, команда позволяет инкапсулировать запрос на выполнение определенного действия в виде отдельного объекта
 */
export interface ICommand {
    /**
     * Имя команды
     */
    name: string;
    /**
     * Параметр команды
     */
    parameter?: any;
    /**
     * Основной метод команды отвечающий за ее выполнение
     */
    execute: FunctionCommandDelegateAny;
    /**
     * Метод определяющий возможность выполнения команды
     */
    canExecute?: FunctionCommandDelegateBool;
    /**
     * Статус выбора
     */
    isSelected?: FunctionCommandDelegateBool;
    /**
     * Маршрут команды
     */
    route?: IRoute;
    /**
     * Надпись
     */
    label: string;
    /**
    * Иконка
    */
    icon?: any | FunctionCommandDelegateAny;
    /**
     * Порядок при сортировке команд
     */
    order?: number;
    /**
     * Группа к которой относиться команда
     */
    group?: string;
}
/**
 * Базовый класс команды
 */
export declare class BaseCommand implements ICommand {
    /**
     * Имя команды
     */
    name: string;
    /**
     * Параметр команды
     */
    parameter?: any;
    /**
     * Основной метод команды отвечающий за ее выполнение
     */
    execute: FunctionCommandDelegateAny;
    /**
     * Метод определяющий возможность выполнения команды
     */
    canExecute?: FunctionCommandDelegateBool;
    /**
     * Статус выбора
     */
    isSelected?: FunctionCommandDelegateBool;
    /**
     * Маршрут команды
     */
    route?: IRoute;
    /**
     * Надпись
     */
    label: string;
    /**
     * Иконка
     */
    icon?: any | FunctionCommandDelegateAny;
    /**
     * Порядок при сортировке команд
     */
    order?: number;
    /**
     * Группа к которой относиться команда
     */
    group?: string;
    constructor(name: string);
    /**
     * Основной метод команды отвечающий за ее выполнение
     */
    executeCommand(context?: any): void;
    /**
     * Метод определяющий возможность выполнения команды
     */
    canExecuteCommand(context?: any): boolean;
    /**
     * Статус выбора
     */
    isSelectedCommand(context?: any): boolean;
}
