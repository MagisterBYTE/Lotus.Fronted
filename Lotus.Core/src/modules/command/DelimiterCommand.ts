import { BaseCommand, ICommand } from './Command';

/**
 * Интерфейс фейковой команды предназначенной для визуального разделения команд в списках
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IDelimiterCommand extends ICommand
{

}

/**
 * Фейковая команда предназначенная для визуального разделения команд в списках
 */
export class DelimiterCommand extends BaseCommand implements IDelimiterCommand
{
  constructor(name: string) 
  {
    super(name)
  }
}

/**
 * Глобальный доступ к команде разделения по умолчанию
 */
export const DelimiterCommandDefault = new DelimiterCommand('delimiter');