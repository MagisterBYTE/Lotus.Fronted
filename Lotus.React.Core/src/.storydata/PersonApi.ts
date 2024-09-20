import { FilterPropertyHelper, IRequest, IResponsePage, SortPropertyHelper } from 'lotus-core';
import { IPerson } from './PersonInfo';
import { Persons } from './PersonData';

class PersonApiClass
{
  private static _PersonApiClass: PersonApiClass;

  public static get Instance(): PersonApiClass 
  {
    return (this._PersonApiClass || (this._PersonApiClass = new this()));
  }

  constructor()
  {
    this.getPersonsAsync = this.getPersonsAsync.bind(this);
  } 

  public getPersonsAsync(filter: IRequest): Promise<IResponsePage<IPerson>>
  {
    let result = Persons;
    result = FilterPropertyHelper.filterArrayByProperties(result, filter.filtering)
    result = SortPropertyHelper.sortArrayByProperties(result, filter.sorting)
    const response: IResponsePage = {
      payload: result,
      pageInfo: { currentPageSize: 4, pageNumber: 0, pageSize: 20, totalCount: 4 }
    }

    return Promise.resolve(response);
  }
}

export const PersonApi = PersonApiClass.Instance;