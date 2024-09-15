import { BaseCommand } from './Command';

/**
 * Фейковая команда предназначенная для визуального разделения команд в списках
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class DelimiterCommand<TCommandParameter = any> extends BaseCommand<TCommandParameter>
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