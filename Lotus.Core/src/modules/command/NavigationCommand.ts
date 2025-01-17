/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IRoute } from 'types/Route';
import { BaseCommand, ICommand } from './Command';

/**
 * Интерфейс команды предназначенной для простой навигации
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface INavigationCommand extends ICommand
{

}

/**
 * Класс команды для простой навигации
 */
export class NavigationCommand extends BaseCommand implements INavigationCommand
{
  constructor(name: string, route: IRoute) 
  {
    super(name);
    this.route = route;
  }

  /**
   * Статус выбора
   */
  public override isSelectedCommand(context?: any): boolean
  {
    if (window.location.pathname === this.route?.path)
    {
      return true;
    }

    return false;
  }
}