/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRoute } from 'types/Route';

/**
 * Делегат для интерфейса команды, возвращает any
 */
export type FunctionCommandDelegateAny = (option: ICommand, context?: any) => any

/**
 * Делегат для интерфейса команды, возвращает boolean
 */
export type FunctionCommandDelegateBool = (option: ICommand, context?: any) => boolean

/**
 * Интерфейс команды
 * @description Команда предоставляет собой концепцию (паттерн) для связывания логики выполнения действия и визуального элемента. 
 * Как паттерн, команда позволяет инкапсулировать запрос на выполнение определенного действия в виде отдельного объекта
 */
export interface ICommand
{
  //
  // ОСНОВНЫЕ ДАННЫЕ
  //
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

  //
  // ПАРАМЕТРЫ МАРШРУТИЗАЦИИ
  //
  /**
   * Маршрут команды 
   */
  route?: IRoute;

  //
  // СВЯЗЬ С ВИЗУАЛЬНОЙ ЧАСТЬЮ
  //
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

export class BaseCommand implements ICommand
{
  //
  // ОСНОВНЫЕ ДАННЫЕ
  //
  /**
   * Имя команды
   */
  public name: string;

  /**
   * Параметр команды
   */
  public parameter?: any;

  /**
   * Основной метод команды отвечающий за ее выполнение
   */
  public execute: FunctionCommandDelegateAny

  /**
   * Метод определяющий возможность выполнения команды
   */
  public canExecute?: FunctionCommandDelegateBool;

  /**
   * Статус выбора
   */
  public isSelected?: FunctionCommandDelegateBool;

  //
  // ПАРАМЕТРЫ МАРШРУТИЗАЦИИ
  //
  /**
   * Маршрут команды 
   */
  public route?: IRoute;

  //
  // СВЯЗЬ С ВИЗУАЛЬНОЙ ЧАСТЬЮ
  //
  /**
   * Надпись
   */
  public label: string;

  /**
   * Иконка
   */
  public icon?: any | FunctionCommandDelegateAny;

  /**
   * Порядок при сортировке команд
   */
  public order?: number;

  /**
   * Группа к которой относиться команда
   */
  public group?: string;

  constructor(name: string) 
  {
    this.name = name;
    this.label = '';
    this.executeCommand = this.executeCommand.bind(this);
    this.canExecuteCommand = this.canExecuteCommand.bind(this);
    this.isSelectedCommand = this.isSelectedCommand.bind(this);
    this.execute = () => {};
  }

  /**
   * Основной метод команды отвечающий за ее выполнение
   */
  public executeCommand(context?: any): void
  {
    this.execute(this, context);
  }


  /**
   * Метод определяющий возможность выполнения команды
   */
  public canExecuteCommand(context?: any): boolean
  {
    if(this.canExecute)
    {
      return this.canExecute(this, context);
    }

    return true;
  }

  /**
   * Статус выбора
   */
  public isSelectedCommand(context?: any): boolean
  {
    if(this.isSelected)
    {
      return this.isSelected(this, context);
    }
  
    return false;
  }
}