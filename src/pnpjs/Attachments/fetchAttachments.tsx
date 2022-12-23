
import * as React from 'react';
import { Link,  } from 'office-ui-fabric-react/lib/Link';
import { fetchItemAttachments, IMinItemFetchProps, IFPSItemAttachmentsReturn} from '@mikezimm/fps-pnp2/lib/services/sp/fetch/items/attachments';
import { IFPSResultStatus } from '@mikezimm/fps-pnp2/lib/services/sp/IFPSResultStatus';
import { IHelpfullInput, IHelpfullOutput } from '../../logic/Errors/friendly';
import { checkItemsResults } from '../Common/CheckItemsResults';


export interface IAttachmentsReturn {
    items: any[];
    errorInfo: IHelpfullOutput;
    errorInput?: IHelpfullInput; // Used for logging
    status: IFPSResultStatus;
}


export async function fetchItemAttachmentsPnp ( webUrl: string, listTitle: string, Id: number, alertMe:boolean , consoleLog: boolean ) {

  const fetchProps: IMinItemFetchProps = {
    webUrl: webUrl,
    listTitle: listTitle,
    Id: Id,
    context: null, //Not needed until Pnpjs v3
  }

  const initialResult: IFPSItemAttachmentsReturn = await fetchItemAttachments( fetchProps );

  const result = checkItemsResults( initialResult, ``, alertMe, consoleLog );

  return result;

}

export interface IMinPanelItem {
  Attachments?: boolean;
  Id: number;
}

export async function createPanelAttachmentElements( webUrl: string, listTitle: string, item: IMinPanelItem ): Promise<JSX.Element[]>{

  const attachments: JSX.Element[] = [];

  if ( item.Attachments && item.Attachments === true ) {

    const fetchAttachments = await fetchItemAttachmentsPnp( webUrl, listTitle, item.Id, false, true );

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
