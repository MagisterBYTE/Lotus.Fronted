export class StringHelper
{
  /**
   * see for details: https://stackoverflow.com/a/2140644
   * (warning: function may not work with Unicode special characters)
   */
  public static equalIgnoreCase(first: string, second: string): boolean
  {
    return first.toLocaleUpperCase() === second.toLocaleUpperCase();
  }

  /**
   * 
   * @param value 
   * @returns 
   */
  public static isNullOrEmpty(value: string): boolean
  {
    return value === undefined || value === null || value.trim() === '';
  }

  /**
   * 
   * @param value 
   * @returns 
   */
  public static capitalizeFirstLetter(value: string): string
  {
    if(value.length > 0)
    {
      return value[0].toLocaleUpperCase() + value.slice(1);
    }
    return value;
  }

  /**
   * 
   * @param value 
   * @returns 
   */
  public static lowercaseFirstLetter(value: string): string
  {
    if(value.length > 0)
    {
      return value[0].toLocaleLowerCase() + value.slice(1);
    }
    return value;
  }

  /**
   * 
   * @param value 
   * @returns 
   */
  public static toUpperCaseAllFirstLetters(value: string): string
  {
    return value.split(' ').map((word) => word.slice(0, 1).toUpperCase() + word.slice(1)).join(' ');
  }

}
