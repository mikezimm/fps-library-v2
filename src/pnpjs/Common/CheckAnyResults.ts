import { check4Gulp } from '@mikezimm/fps-pnp2/lib/services/sp/CheckGulping';
import { convertHelpfullError, IHelpfullInput, IHelpfullOutput } from "../../logic/Errors/friendly";
import { saveErrorToLog } from "../Logging";
import { IFpsErrorObject } from "./IFpsErrorObject";

export function checkAnyResults ( anyInput: IFpsErrorObject, traceString: string, alertMe: boolean , consoleLog: boolean ) : IFpsErrorObject {
  //Clean up the raw error and return a human readable result

  if ( anyInput.e ) {
    const errorInput: IHelpfullInput = { e: anyInput.e, alertMe:alertMe , consoleLog: consoleLog , traceString: traceString ? traceString : 'fps-library-v2: checkAnyResults ~ 11' , logErrors: true };
    anyInput.errorInput = errorInput;

    const errorInfo: IHelpfullOutput = convertHelpfullError( errorInput );
    anyInput.errorInfo = errorInfo;

    saveErrorToLog( anyInput.errorInfo, errorInput );

  }

  if ( check4Gulp() === true ) { console.log( `fps-library-v2 COMPLETED: checkAnyResults ~ 21`, anyInput ) };

  return anyInput;

}