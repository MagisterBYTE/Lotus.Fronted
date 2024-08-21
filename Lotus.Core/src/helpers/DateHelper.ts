
export class DateHelper
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static parse(item: any): Date
  {
    if(item)
    {
      if(item instanceof Date)
      {
        return item as Date;
      }
      if(typeof item == 'number')
      {
        return new Date(item as number);
      }
      if(typeof item == 'string')
      {
        return new Date(Date.parse(item as string));
      }
    }
    return new Date(Date.now());
  }

  public static compare(left?: Date, right?: Date, isDesc?: boolean):number
  {
    let status:number = 0;
    if(left)
    {
      if(right)
      {
        if(left > right)
        {
          status = 1;
        }
        else
        {
          if(left < right)
          {
            status = -1;
          }
          else
          {
            status = 0;
          }
        }
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
