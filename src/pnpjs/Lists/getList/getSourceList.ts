
import { IHelpfullOutput, IHelpfullInput, convertHelpfullError } from '../../../logic/Errors/friendly';

import { IFPSResultStatus } from '@mikezimm/fps-pnp2/lib/services/sp/IFPSResultStatus';

import { fetchListProps, IMinFetchListProps } from "@mikezimm/fps-pnp2/lib/services/sp/fetch/lists/fetchListProps";
import { check4Gulp } from '@mikezimm/fps-pnp2/lib/services/sp/CheckGulping';
import { saveErrorToLog } from '../../Logging/saveErrorToLog';
import { IListInfo } from "@pnp/sp/lists/types";

/**
 * getSourceItems calls the Pnp function to get the results which returns the raw error.
 * This function then will convert the error into the helpful error and return the standard IItemsError object.
 * 
 * @param sourceProps 
 * @param alertMe 
 * @param consoleLog 
 * @returns 
 */

export interface IGetMinSourceListReturn {
  list: IListInfo | null;
  errorInfo: IHelpfullOutput;
  errorInput?: IHelpfullInput; // Used for logging
  status: IFPSResultStatus;
}

export async function getSourceList( minFetchListProps: IMinFetchListProps, alertMe: boolean | undefined, consoleLog: boolean | undefined,) : Promise<IGetMinSourceListReturn>  {

  const initialResult = await fetchListProps( minFetchListProps );

  const result: IGetMinSourceListReturn = {
    list: initialResult.list,
    errorInfo: null,
    errorInput: null, // Used for logging
    status: initialResult.status,
  }

  //Clean up the raw error and return a human readable result
  if ( initialResult.e ) {
    const errorInput: IHelpfullInput = { e: initialResult.e, alertMe:alertMe , consoleLog: consoleLog , traceString: 'getSourceList ~ 42' , logErrors:true };
    const errorInfo: IHelpfullOutput = convertHelpfullError( errorInput );
    result.errorInfo = errorInfo;

    saveErrorToLog( result.errorInfo, errorInput );
  }

  if ( check4Gulp() === true ) { console.log( `fps-library-v2 COMPLETED: getSourceList ~ 49`, result ) };

  return result;

}