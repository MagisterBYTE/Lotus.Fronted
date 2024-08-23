import { IRequest, IResponsePage, IGrouping, IObjectInfo } from 'lotus-core';
import { TPlacementDensity } from 'ui/types';
export interface IListViewProps<TItem extends Record<string, any>> {
    onGetItems: (filter: IRequest) => Promise<IResponsePage<TItem>>;
    renderList: (list: TItem[] | IGrouping<TItem>[], density: TPlacementDensity) => JSX.Element;
    objectInfo: IObjectInfo;
}
export declare const ListView: <TItem extends Record<string, any>>(props: IListViewProps<TItem>) => import("react/jsx-runtime").JSX.Element;
