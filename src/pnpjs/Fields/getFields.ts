
import { fetchFields } from "@mikezimm/fps-pnp2/lib/services/sp/fetch/fields/fetch";

import { checkItemsResults, } from '../Common/CheckItemsResults';
import { IMinFetchListProps } from '@mikezimm/fps-pnp2/lib/services/sp/fetch/lists/fetchListProps';
import { IItemsErrorObj } from '@mikezimm/fps-pnp2';
import { IFpsErrorObject } from "../Common/IFpsErrorObject";

export type IPnpFieldInfo = any;

export interface IFpsFieldsReturn extends IFpsErrorObject {
  items: IPnpFieldInfo[];
}

export async function getListFields( minFetchListProps: IMinFetchListProps, alertMe: boolean | undefined, consoleLog: boolean | undefined,) : Promise<IFpsFieldsReturn>  {

  const itemsInput: IItemsErrorObj = await fetchFields( minFetchListProps );

  const result : IFpsFieldsReturn = checkItemsResults( itemsInput, `fps-library-v2:  getListFields ~ 19`, alertMe, consoleLog ) as any;  // added as any to fix compile error due to adding item as optional to IFPSItemsReturn

  return result;

}