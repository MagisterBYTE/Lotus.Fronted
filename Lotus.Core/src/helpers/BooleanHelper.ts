
export class BooleanHelper
{
  /**
   * Текстовые значение логического типа которые означает истинное значение
   */
  public static readonly TrueValues: string[] =
    [
      'True',
      'true',
      '1',
      'on',
      'On',
      'истина',
      'Истина',
      'да',
      'Да'
    ];

   
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static parse(item: any): boolean
  {
    if(item)
    {
      if(typeof item == 'boolean')
      {
        return item as boolean;
      }
      if(typeof item == 'string')
      {
        return BooleanHelper.TrueValues.indexOf(item as string) > -1;
      }
      if(typeof item == 'number')
      {
        return Boolean(item as number);
      }
    }
    return false;
  }

  public static getValue(value: boolean, yes: string = 'Да', no: string = 'Нет')
  {
    return (value ? yes : no);
  }

  public static compare(left?: boolean, right?: boolean, isDesc?: boolean):number
  {
    let status:number = 0;
    if(left)
    {
      if(right)
      {
        status = 0;
      }
      else
      {
        status = 1;
      }
    }
    else
    {
      if(right)
      {
        status = -1;
      }
      else
      {
        status = 0;
      }
    }

    if(isDesc)
    {
      if(status > 0) return -1;
      else
      {
        if(status < 0) return 1;
        else return 0;
      }
    }

    return status;
  }
}
