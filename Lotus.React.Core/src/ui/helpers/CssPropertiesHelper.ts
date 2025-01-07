import { CSSProperties } from 'react';

export class CssPropertiesHelper
{
  private static kebabCase(value: string):string
  {
    const regex = new RegExp(/[A-Z]/g);
    return value.replace(regex, v => `-${v.toLowerCase()}`)
  } 

  public static toStr(css:CSSProperties):string
  {
    const result = Object.keys(css).reduce((accumulator, key) => 
    {
      // transform the key from camelCase to kebab-case
      const cssKey = CssPropertiesHelper.kebabCase(key)
      
      // remove ' in value
      // @ts-expect-error cssValue
      const cssValue = css[key].replace('\'', '')
      
      // build the result
      // you can break the line, add indent for it if you need
      return `${accumulator}${cssKey}:${cssValue};`
    }, '');

    return result;
  }

  public static overrideStyle(source:CSSProperties, override:CSSProperties)
  {
    for(const key in override)
    {
      // @ts-expect-error prop
      const prop = override[key];
      // @ts-expect-error prop
      source[key] = prop;
    }

    // убираем общий свойства если установлены конкретные значения
    // borderRadius
    if(override.borderTopLeftRadius ?? override.borderTopRightRadius ?? override.borderBottomLeftRadius ?? override.borderBottomRightRadius)
    {
      source.borderRadius = undefined;
    }
  }
}