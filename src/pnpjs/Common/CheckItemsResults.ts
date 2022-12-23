import { check4Gulp } from "@mikezimm/fps-pnp2";
import { IFPSResultStatus } from "@mikezimm/fps-pnp2/lib/services/sp/IFPSResultStatus";
import { convertHelpfullError, IHelpfullInput, IHelpfullOutput } from "../../logic/Errors/friendly";
import { saveErrorToLog } from "../Logging";

export interface IStandardItemsReturn {
  items: any[];
  errorInfo: IHelpfullOutput;
  errorInput: IHelpfullInput; // Used for logging
  status: IFPSResultStatus;
}

export interface IStandardItemsInput {
  items: any[];
  status: IFPSResultStatus;
  e: any;
}

export function checkItemsResults ( itemsInput: IStandardItemsInput, traceString: string, alertMe: boolean , consoleLog: boolean ) : IStandardItemsReturn {

  const result: IStandardItemsReturn = {
    items: itemsInput.items,
    errorInfo: null,
    errorInput: null, // Used for logging
    status: itemsInput.status,
  }

  //Clean up the raw error and return a human readable result

  if ( itemsInput.e ) {
    const errorInput: IHelpfullInput = { e: itemsInput.e, alertMe:alertMe , consoleLog: consoleLog , traceString: traceString ? traceString : 'processItemsResults ~ 31' , logErrors: true };
    result.errorInput = errorInput;

    const errorInfo: IHelpfullOutput = convertHelpfullError( errorInput );
    result.errorInfo = errorInfo;

    saveErrorToLog( result.errorInfo, errorInput );

  }

  if ( check4Gulp() === true ) { console.log( `fps-library-v2 COMPLETED: processItemsResults ~ 41`, result ) };

  return result;

}