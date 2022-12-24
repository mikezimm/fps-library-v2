
import { fetchViews } from "@mikezimm/fps-pnp2/lib/services/sp/fetch/views/fetch";

import { checkItemsResults, } from '../Common/CheckItemsResults';
import { IMinFetchListProps } from '@mikezimm/fps-pnp2/lib/services/sp/fetch/lists/fetchListProps';
import { IItemsErrorObj } from '@mikezimm/fps-pnp2';
import { IFpsErrorObject } from "../Common/IFpsErrorObject";

export type IPnpViewInfo = any;

export interface IFpsViewsReturn extends IFpsErrorObject {
  items: IPnpViewInfo[];
}

export async function getListViews( minFetchListProps: IMinFetchListProps, alertMe: boolean | undefined, consoleLog: boolean | undefined,) : Promise<IFpsViewsReturn>  {

  const itemsInput: IItemsErrorObj = await fetchViews( minFetchListProps );

  const result : IFpsViewsReturn = checkItemsResults( itemsInput, `fps-library-v2: getListViews ~ 19`, alertMe, consoleLog );

  return result;

}