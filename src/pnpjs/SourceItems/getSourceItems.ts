
import { IHelpfullOutput, IHelpfullInput, convertHelpfullError } from '../../logic/indexes/HelpfullErrors';

import { fetchSourceItems } from "@mikezimm/fps-pnp2/lib/services/sp/fetch/items/fetchSourceItems";
import { IItemsError, ISourceProps } from './Interface';
import { check4Gulp } from '@mikezimm/fps-pnp2/lib/services/sp/CheckGulping';
import { saveErrorToLog } from '../Logging';

/**
 * getSourceItems calls the Pnp function to get the results which returns the raw error.
 * This function then will convert the error into the helpful error and return the standard IItemsError object.
 * 
 * @param sourceProps 
 * @param alertMe 
 * @param consoleLog 
 * @returns 
 */
export async function getSourceItems( sourceProps: ISourceProps, alertMe: boolean | undefined, consoleLog: boolean | undefined,) : Promise<IItemsError>  {

  const initialResult = await fetchSourceItems( sourceProps, alertMe, consoleLog );

  const result: IItemsError = {
    items: initialResult.items,
    errorInfo: null as any,
  };

  //Clean up the raw error and return a human readable result
  if ( initialResult.e ) {
    const errorInput: IHelpfullInput = { e: initialResult.e, alertMe:alertMe , consoleLog: consoleLog , traceString: 'getSourceItems ~ 18' , logErrors:true };
    const errorInfo: IHelpfullOutput = convertHelpfullError( errorInput );
    result.errorInfo = errorInfo;

    saveErrorToLog( result.errorInfo, errorInput );
  }

  if ( check4Gulp() === true ) { console.log( `fps-library-v2 COMPLETED: getSourceItems ~ 33`, result ) };

  return result;

}