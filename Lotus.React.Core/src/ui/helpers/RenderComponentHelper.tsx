import { IImageDatabase } from 'lotus-core';
import { CSSProperties, ReactElement, ReactNode } from 'react';
import { IconContext } from 'react-icons';
import { Theme } from 'ui/theme';
import { TControlSize } from 'ui/types';

/**
 * Отрисовка вспомогательных элементов UI
 */
export class RenderComponentHelper
{
  /**
   * Отрисовка иконки
   * @param size Размер элемента UI
   * @param icon Данные иконки
   * @param other Другие данные
   * @param style Стиль
   * @param imageDatabase База данных изображений
   * @returns ReactElement
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static renderIcon(size: TControlSize, icon:any, other?:ReactNode, style?:CSSProperties, imageDatabase?:IImageDatabase):ReactElement
  {
    if (typeof icon === 'string')
    {
      const sizeIcon = `${Theme.convertControlSizeToIconSizeInPixel(size)}px`;
      if(other)
      {
        return <>
          <img src={icon} width={sizeIcon} height={sizeIcon} style={style} />
          {other}
        </>
      }
      else
      {
        return <img src={icon} width={sizeIcon} height={sizeIcon} style={style} />
      }
    }
    if(typeof icon === 'number' && imageDatabase)
    {
      const iconData = imageDatabase.getImageByIdOrName(icon);
      
      if(iconData)
      {
        const sizeIcon = `${Theme.convertControlSizeToIconSizeInPixel(size)}px`;

        if(other)
        {
          return <>
            <img src={iconData.source} width={sizeIcon} height={sizeIcon} style={style} />
            {other}
          </>
        }
        else
        {
          return <img src={iconData.source} width={sizeIcon} height={sizeIcon} style={style} />
        }
      }

      return <></>;
    }
    else
    {
      const sizeIcon = `${Theme.convertControlSizeToIconSizeInRem(size)}rem`;
      if(other)
      {
        return <>
          <IconContext.Provider value={{ size: sizeIcon, style: style}} >
            {icon}
          </IconContext.Provider>
          {other}
        </>
      }
      else
      {
        return <IconContext.Provider value={{ size: sizeIcon, style: style}}>
          {icon}
        </IconContext.Provider>
      }
    }
  }
}