
import * as React from 'react';

import { fetchItemAsHTML, IMinFetchItemAsXMLProps} from '@mikezimm/fps-pnp2/lib/services/sp/fetch/items/fieldAsHTML';
import { checkItemsResults, } from '../Common/CheckItemsResults';
import { IFpsErrorObject } from '../Common/IFpsErrorObject';
import { IItemErrorObj } from '@mikezimm/fps-pnp2/lib/services/sp/fetch/items/Interface';
import { getExpandColumns } from '../Lists/getVX/getExpandV2';

export type IPnpAttachInfo = any;

export interface IFpsFieldAsXMLReturn extends IFpsErrorObject {
    item?: any;
}

export async function fetchFpsItemAsXML ( webUrl: string, listTitle: string, Id: number, selectThese: string[], expandThese: string[], DoNotExpandThese : string[] = [] , 
  alertMe:boolean = false , consoleLog: boolean = true ): Promise<IFpsFieldAsXMLReturn> {

  const fetchProps: IMinFetchItemAsXMLProps = {
    webUrl: webUrl,
    listTitle: listTitle,
    Id: Id,
    selectThese: selectThese,
    expandThese: getExpandColumns( selectThese, DoNotExpandThese ),
    context: null, //Not needed until Pnpjs v3
  }

  const initialResult: IItemErrorObj = await fetchItemAsHTML( fetchProps );

  const result: IFpsFieldAsXMLReturn = checkItemsResults( initialResult, `fps-library-v2: fetchFpsItemAsXML ~ 28`, alertMe, consoleLog );

  return result;

}

