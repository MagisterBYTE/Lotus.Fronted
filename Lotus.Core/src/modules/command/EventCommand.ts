/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseCommand, ICommand } from './Command';

/**
 * Наименование(тип) события который посылают команды для генерирования пользовательских событий
 */
export const EventCommandKey: string = 'EventCommand' as const;

/**
 * Базовый интерфейс для предоставления данных пользовательского события
 */
export interface IBaseEventCommandData 
{
  /**
   * Дискриминатор данных, должны быть уникальным для каждого типа пользовательского события
   */
  discriminator: string;
}

/**
 * Интерфейс команды предназначенной для генерирования пользовательских событий
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IEventCommand extends ICommand
{

}

/**
 * Класс команды для генерирования пользовательских событий
 */
export class EventCommand extends BaseCommand implements IEventCommand
{
  constructor(name: string) 
  {
    super(name);
  }

  /**
   * Основной метод команды отвечающий за ее выполнение
   */
  public override executeCommand(context?: any): void
  {
    const event = new CustomEvent<IBaseEventCommandData>(EventCommandKey, { detail: this.parameter });
    window.dispatchEvent(event);
  }
}