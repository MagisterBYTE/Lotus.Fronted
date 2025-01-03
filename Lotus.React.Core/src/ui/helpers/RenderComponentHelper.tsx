import { IImageDatabase, IOption } from 'lotus-core';
import { CSSProperties, ReactElement, ReactNode } from 'react';
import { IconContext } from 'react-icons';
import { IGeneralIconProperties } from 'ui/components';
import { ThemeHelper } from 'ui/theme';
import { TControlSize } from 'ui/types';

/**
 * Отрисовка вспомогательных элементов UI
 */
export class RenderComponentHelper
{
  /**
   * Отрисовка опции
   * @param size Размер элемента UI
   * @param option Опция
   * @param style Стиль отрисовки иконки
   * @param imageDatabase База данных изображений
   * @returns ReactElement
   */
  public static renderOption(size: TControlSize, option:IOption, style?:CSSProperties, imageDatabase?:IImageDatabase):ReactElement
  {
    const { icon, text } = option;
    if (typeof icon === 'string')
    {
      const sizeIcon = `${ThemeHelper.convertControlSizeToIconSizeInPixel(size)}px`;
      if(text)
      {
        return <>
          <img src={icon} width={sizeIcon} height={sizeIcon} style={style} />
          {text}
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
        const sizeIcon = `${ThemeHelper.convertControlSizeToIconSizeInPixel(size)}px`;

        if(text)
        {
          return <>
            <img src={iconData.source} width={sizeIcon} height={sizeIcon} style={style} />
            {text}
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
      const sizeIcon = `${ThemeHelper.convertControlSizeToIconSizeInRem(size)}rem`;
      if(text)
      {
        return <>
          <IconContext.Provider value={{ size: sizeIcon, style: style}} >
            {icon}
          </IconContext.Provider>
          {text}
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
      const sizeIcon = `${ThemeHelper.convertControlSizeToIconSizeInPixel(size)}px`;
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
        const sizeIcon = `${ThemeHelper.convertControlSizeToIconSizeInPixel(size)}px`;

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
      const sizeIcon = `${ThemeHelper.convertControlSizeToIconSizeInRem(size)}rem`;
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

  /**
   * Отрисовка иконки
   * @param size Размер элемента UI
   * @param props Общие свойства иконки для элемента UI
   * @param other Другие данные
   * @param imageDatabase База данных изображений
   * @returns ReactElement
   */
  public static renderIconProps(size: TControlSize, props:IGeneralIconProperties, other?:ReactNode, imageDatabase?:IImageDatabase):ReactElement
  {
    const {icon, iconColor, iconStyle } = props

    if (typeof icon === 'string')
    {
      const sizeIcon = `${ThemeHelper.convertControlSizeToIconSizeInPixel(size)}px`;
      if(other)
      {
        return <>
          <img src={icon} width={sizeIcon} height={sizeIcon} style={iconStyle} />
          {other}
        </>
      }
      else
      {
        return <img src={icon} width={sizeIcon} height={sizeIcon} style={iconStyle} />
      }
    }
    if(typeof icon === 'number' && imageDatabase)
    {
      const iconData = imageDatabase.getImageByIdOrName(icon);
      
      if(iconData)
      {
        const sizeIcon = `${ThemeHelper.convertControlSizeToIconSizeInPixel(size)}px`;

        if(other)
        {
          return <>
            <img src={iconData.source} width={sizeIcon} height={sizeIcon} style={iconStyle} />
            {other}
          </>
        }
        else
        {
          return <img src={iconData.source} width={sizeIcon} height={sizeIcon} style={iconStyle} />
        }
      }

      return <></>;
    }
    else
    {
      const sizeIcon = `${ThemeHelper.convertControlSizeToIconSizeInRem(size)}rem`;
      if(other)
      {
        return <>
          <IconContext.Provider value={{ size: sizeIcon, style: iconStyle}} >
            {icon}
          </IconContext.Provider>
          {other}
        </>
      }
      else
      {
        return <IconContext.Provider value={{ size: sizeIcon, 
          color:ThemeHelper.getColor(iconColor ?? props.iconColor).toCSSRgbValue(), style: iconStyle}}>
          {icon}
        </IconContext.Provider>
      }
    }
  }
}