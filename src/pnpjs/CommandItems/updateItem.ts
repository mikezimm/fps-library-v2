
import { convertHelpfullError, } from '../../logic/Errors/friendly';

import { updateAnyItem } from '@mikezimm/fps-pnp2/lib/services/sp/update/item';
import { IFPSItemUpdateResultObj, IMinUpdateProps } from '@mikezimm/fps-pnp2/lib/services/sp/update/item';
import { saveErrorToLog } from '../Logging/saveErrorToLog';
import { CommandUpdateFailedMessage } from '../../components/interfaces/QuickCommands/IQuickCommands';
import { IFPSResultStatus } from '@mikezimm/fps-pnp2/lib/services/sp/IFPSResultStatus';
import { IFpsErrorObject } from '../Common/IFpsErrorObject';

/**
 * getSourceItems calls the Pnp function to get the results which returns the raw error.
 * This function then will convert the error into the helpful error and return the standard IItemsError object.
 * 
 * @param sourceProps 
 * @param alertMe 
 * @param consoleLog 
 * @returns 
 */

export interface IUpdateCommandItemProps extends IMinUpdateProps {
  alertMe: string;
  consoleLog: string;
}

export interface IUpdateCommandItemReturn extends IFpsErrorObject {
  response: any;
  statusElement?: JSX.Element;  // Optional used if you want to pass back a specific JSX.Element instead of a text warning
}

export async function updateCommandItems( commandItem: IUpdateCommandItemProps, ) : Promise<IUpdateCommandItemReturn>  {

  const initialResult: IFPSItemUpdateResultObj = await updateAnyItem( commandItem );

  const finalResult: IUpdateCommandItemReturn = {
    response: initialResult.response,
    errorInfo: null,
    status: initialResult.status,
    e: initialResult.e,
  }

  if ( initialResult.status === 'Success' ) {
    if (commandItem.alertMe) { alert('Success!\n' + commandItem.alertMe); }
    if (commandItem.consoleLog) { console.log(commandItem.consoleLog, initialResult ); }

  } else if ( initialResult.status === 'Error' ) {

    finalResult.errorInput = { e: initialResult.e, alertMe:false , consoleLog: false , traceString: 'fps-library-v2: updateCommandItems ~ 36' , logErrors:false };
    finalResult.errorInfo = convertHelpfullError( finalResult.errorInput );

    saveErrorToLog( finalResult.errorInfo, finalResult.errorInput );

    let errMessage = `${CommandUpdateFailedMessage} - ${finalResult.errorInfo.friendly}`;
  
    if (commandItem.alertMe) {
      alert(`${CommandUpdateFailedMessage}\n${commandItem.alertMe}\n${errMessage}`);
    }
    console.log(`${CommandUpdateFailedMessage}\n${commandItem.consoleLog}\n${errMessage}`);
  
  } else {
    alert ( `updateCommandItems ~ 50 - result.status = ${ initialResult.status }`);
  }

  return finalResult;

}
