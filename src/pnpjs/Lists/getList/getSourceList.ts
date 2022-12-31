
import { fetchListProps, IMinFetchListProps } from "@mikezimm/fps-pnp2/lib/services/sp/fetch/lists/fetchListProps";
import { IListInfo } from "@pnp/sp/lists/types";
import { IFpsErrorObject } from '../../Common/IFpsErrorObject';
import { checkAnyResults } from '../../Common/CheckAnyResults';

/**
 * getSourceList calls the Pnp function to get the results which returns the raw error.
 * This function then will convert the error into the helpful error and return the standard IItemsError object.
 * 
 * @param sourceProps 
 * @param alertMe 
 * @param consoleLog 
 * @returns 
 */

export interface IGetMinSourceListReturn extends IFpsErrorObject {
  list: IListInfo | null;
}

export async function getSourceList( minFetchListProps: IMinFetchListProps, alertMe: boolean | undefined, consoleLog: boolean | undefined,) : Promise<IGetMinSourceListReturn>  {

  const initialResult = await fetchListProps( minFetchListProps );

  const result: IGetMinSourceListReturn = checkAnyResults( initialResult, `fps-library-v2: getSourceList ~ 31`, alertMe, consoleLog ) as any;

  return result;

}