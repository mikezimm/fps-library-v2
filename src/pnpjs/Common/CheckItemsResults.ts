import { check4Gulp, } from "@mikezimm/fps-pnp2";
import { convertHelpfullError, IHelpfullInput, IHelpfullOutput } from "../../logic/Errors/friendly";
import { saveErrorToLog } from "../Logging";
import { IFpsErrorObject } from "./IFpsErrorObject";

export interface IFpsItemsReturn extends IFpsErrorObject {
  items: any[];
}

export function checkItemsResults ( itemsInput: IFpsItemsReturn, traceString: string, alertMe: boolean , consoleLog: boolean ) : IFpsItemsReturn {
  //Clean up the raw error and return a human readable result

  if ( itemsInput.e ) {
    const errorInput: IHelpfullInput = { e: itemsInput.e, alertMe:alertMe , consoleLog: consoleLog , traceString: traceString ? traceString : 'fps-library-v2: checkItemsResults ~ 15' , logErrors: true };
    itemsInput.errorInput = errorInput;

    const errorInfo: IHelpfullOutput = convertHelpfullError( errorInput );
    itemsInput.errorInfo = errorInfo;

    saveErrorToLog( itemsInput.errorInfo, errorInput );

  }

  if ( check4Gulp() === true ) { console.log( `fps-library-v2 COMPLETED: checkItemsResults ~ 25`, itemsInput ) };

  return itemsInput;

}