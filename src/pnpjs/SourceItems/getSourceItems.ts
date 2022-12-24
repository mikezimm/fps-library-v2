
import { fetchAnyItems } from "@mikezimm/fps-pnp2/lib/services/sp/fetch/items/fetch";
import { IOrderByBoolean, IMinFetchProps } from "@mikezimm/fps-pnp2/lib/services/sp/fetch/items/Interface";
import { ISourceProps } from './Interface';
import { checkItemsResults, IFpsItemsReturn } from '../Common/CheckItemsResults';
import { ISeriesSortObject } from "../../logic/indexes/ArraySortingNumbers";

export interface IMinSourceFetchProps {
  webUrl: string;
  listTitle: string;
  selectThese?: string[];
  expandThese?: string[];
  restFilter?: string;
  fetchCount: number; // Default is 200 if no value is provided
  orderBy?: ISeriesSortObject;
}

/**
 * getSourceItems calls the Pnp function to get the results which returns the raw error.
 * This function then will convert the error into the helpful error and return the standard IItemsError object.
 * 
 * @param sourceProps 
 * @param alertMe 
 * @param consoleLog 
 * @returns 
 */
export async function getSourceItems( sourceProps: ISourceProps, alertMe: boolean | undefined, consoleLog: boolean | undefined,) : Promise<IFpsItemsReturn>  {

  //This converts ISeriesSortObject which has string order to IOrderByBoolean for fetch requirements
  const orderBy: IOrderByBoolean = !sourceProps.orderBy ? null as any : {
    prop: sourceProps.orderBy.prop,
    asc: sourceProps.orderBy.asc ? sourceProps.orderBy.asc : sourceProps.orderBy.order === 'dec' ? false : true,
  };

  const FetchProps: IMinFetchProps = { ...sourceProps, ...{
      orderBy: orderBy,
      alertMe: alertMe,
      fetchCount: sourceProps.fetchCount,
      consoleLog: consoleLog,
    }
  }

  const initialResult = await fetchAnyItems( FetchProps );

  const result : IFpsItemsReturn = checkItemsResults( initialResult, `fps-library-v2: getSourceItems ~ 19`, alertMe, consoleLog );

  return result;

}
