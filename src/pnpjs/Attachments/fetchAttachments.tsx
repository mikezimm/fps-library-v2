
import * as React from 'react';
import { Link,  } from 'office-ui-fabric-react/lib/Link';
import { fetchItemAttachments, IMinItemFetchProps, IAttachmentsErrorObj} from '@mikezimm/fps-pnp2/lib/services/sp/fetch/items/attachments';
import { checkItemsResults, } from '../Common/CheckItemsResults';
import { IFpsErrorObject } from '../Common/IFpsErrorObject';

export type IPnpAttachInfo = any;

export interface IFpsAttachmentsReturn extends IFpsErrorObject {
    items: IPnpAttachInfo[];
}

export async function fetchFpsItemAttachments ( webUrl: string, listTitle: string, Id: number, alertMe:boolean , consoleLog: boolean ): Promise<IFpsAttachmentsReturn> {

  const fetchProps: IMinItemFetchProps = {
    webUrl: webUrl,
    listTitle: listTitle,
    Id: Id,
    context: null, //Not needed until Pnpjs v3
  }

  const initialResult: IAttachmentsErrorObj = await fetchItemAttachments( fetchProps );

  const result: IFpsAttachmentsReturn = checkItemsResults( initialResult, `fps-library-v2: fetchItemAttachmentsPnp ~ 24`, alertMe, consoleLog ) as any;  // added as any to fix compile error due to adding item as optional to IFPSItemsReturn

  return result;

}

export interface IMinPanelItem {
  Attachments?: boolean;
  Id: number;
}

export async function createPanelAttachmentElements( webUrl: string, listTitle: string, item: IMinPanelItem ): Promise<JSX.Element[]>{

  const attachments: JSX.Element[] = [];

  if ( item.Attachments && item.Attachments === true ) {

    const fetchAttachments = await fetchFpsItemAttachments( webUrl, listTitle, item.Id, false, true );

    if ( fetchAttachments.items.length > 0 ) {
      attachments.push( <h2>({ fetchAttachments.items.length}) Attachments</h2> );
      attachments.push( <div style={{ paddingBottom: "10px"}}><b>CTRL-Click</b> to open in new window</div> );
      fetchAttachments.items.map( a => {
          let attachmentItem = <div><Link target= { "_blank" } href= { a.ServerRelativeUrl }> { a.FileName }</Link></div>;
              attachments.push( attachmentItem );

      });
    }
  }

  return attachments;
}
