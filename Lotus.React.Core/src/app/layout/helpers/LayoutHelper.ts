import { TBreakpoint } from 'ui/types/Breakpoint';
import { CssTypesHelper } from 'ui/helpers';
import { EventCommandKey } from 'lotus-core';
import { defaultStateDesktop, ILayoutState } from '../store/LayoutState';
import { IOpenViewSettingsEventData, OpenViewSettingsEventDiscriminator } from '../events';

export class LayoutHelper
{
  /**
   * Ключ под которым сохраняется макет сайта
   */
  public static readonly LayoutStateKey: string = 'lotus-layoutState' as const;

  /**
   * Получение оптимальной точки Breakpoint для текущей ширины
   * @returns 
   */
  public static getBreakpoints(): TBreakpoint
  {
    if (screen.width > 1800)
    {
      return 'xxl';
    }

    return 'xl';
  }

  /**
   * Получение рабочей высоты сайта 
   * @param delta Уменьшение к расчету
   * @returns 
   */
  public static getClientHeight(delta?: number): number
  {
    const layoutState = LayoutHelper.loadFromStorage();
    const isFooter = layoutState.footer.isVisible && layoutState.footer.isVisibleUser;
    const isHeader = layoutState.header.isVisible && layoutState.header.isVisibleUser;

    let screenHeight = Math.min(screen.height, window.innerHeight);

    if (isHeader)
    {
      screenHeight -= CssTypesHelper.toPixelHeight(layoutState.header.height);
    }

    if (isFooter)
    {
      screenHeight -= CssTypesHelper.toPixelHeight(layoutState.footer.height);
    }

    if (delta)
    {
      screenHeight -= delta;
    }

    return screenHeight;
  }

  /**
   * Получение отступа от нижней части
   * @param delta Увеличение к расчету
   * @returns 
   */
  public static getMarginBottom(delta?: number): number
  {
    const layoutState = LayoutHelper.loadFromStorage();
    const footer = layoutState.footer;
    const isFooter = footer.isVisible;
    let marginBottom: number = isFooter ? CssTypesHelper.toPixelHeight(footer.height) : 0;

    if (delta)
    {
      marginBottom += delta;
    }

    return marginBottom;
  }

  /**
   * Загрузка макета сайта из локального хранилища 
   * @returns Макет сайта или макет сайта по умолчанию
   */
  public static loadFromStorage(): ILayoutState
  {
    const value = localStorage.getItem(LayoutHelper.LayoutStateKey);
    if (value)
    {
      const layoutState: ILayoutState = JSON.parse(value);
      return layoutState;
    }
    else
    {
      return defaultStateDesktop;
    }
  }

  /**
   * Сохранение текущего макета сайта в локальное хранилище
   * @param layoutState Макет сайта
   */
  public static saveToStorage(layoutState: ILayoutState)
  {
    const value = JSON.stringify(layoutState);
    localStorage.setItem(LayoutHelper.LayoutStateKey, value);
  }

  public static createOpenViewSettingsEvent():CustomEvent
  {
    const data: IOpenViewSettingsEventData = { discriminator: OpenViewSettingsEventDiscriminator, sender: 'buttonMenu' };
    const event = new CustomEvent<IOpenViewSettingsEventData>(EventCommandKey, { detail: data });
    return event;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static isOpenViewSettingsEvent(value: any):IOpenViewSettingsEventData|undefined
  {
    if (value)
    {
      if(('discriminator' in value) && value.discriminator === OpenViewSettingsEventDiscriminator)
      {
        return value as IOpenViewSettingsEventData;
      }
    }

    // eslint-disable-next-line consistent-return
    return undefined;
  }
}