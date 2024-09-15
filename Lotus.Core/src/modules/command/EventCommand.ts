import { BaseCommand } from './Command';

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
 * Класс команды для генерирования пользовательских событий
 */
export class EventCommand<TCommandParameter extends IBaseEventCommandData> extends BaseCommand<TCommandParameter>
{
  constructor(name: string) 
  {
    super(name);
  }

  /**
   * Основной метод команды отвечающий за ее выполнение
   */
  public override executeDefault(): void
  {
    const event = new CustomEvent<IBaseEventCommandData>(EventCommandKey, { detail: this.parameter });
    window.dispatchEvent(event);
  }

  /**
   * Метод определяющий возможность выполнения команды
   */
  public override canExecuteDefault(): boolean
  {
    return true;
  }

  /**
   * Статус выбора
   */
  public override isSelectedDefault(): boolean
  {
    if (window.location.pathname === this.route?.path)
    {
      return true;
    }

    return false;
  }
}