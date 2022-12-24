import { IItemsErrorObj, IMinFetchProps } from "@mikezimm/fps-pnp2/lib/services/sp/fetch/items/Interface";
import { fetchAnyItems } from "@mikezimm/fps-pnp2/lib/services/sp/fetch/items/fetch";
import { checkItemsResults } from "../Common/CheckItemsResults";

const PreConfigSiteUrl: string = `${window.location.origin}/sites/PreConfigProps`

/**
 * This is standard fetch to get preConfigItems, initially in Drilldown.
 * These provide the user with a list of property mappings they can pick from to quickly and easily set up the web part.
 * The return result is an array of key - value objects like so:
 * 
 * result:  [
 *  { webUrl: "https:tenant.sharepoint.com/sites/collection" }
 *  { listTitle: "Documents" }
 * ];
 * 
 * usage:  returns newMap and you need to set this.propserties.newMap = newMap;
 * @param listTitle 
 * @param thisProps 
 * @param restFilter --- matches webPartScenario eq 'thisWPProps.webPartScenario' where webPartScenario might be Dev or Teams or Corp
 * @param webUrl 
 * @returns 
 */

export async function getPreConfigItems( thisWPProps: any, listTitle: string, webUrl: string = PreConfigSiteUrl ): Promise<any[]>{

    let returnProps: any[] = [];
    if ( !thisWPProps.webPartScenario ) { return returnProps; }

    let thisProps: string[] = Object.keys( thisWPProps );
    let selectProps : string[] = ['Id','Title','Template'].concat(thisProps);

    const sourceProps:IMinFetchProps = {
      webUrl: webUrl,
      listTitle: listTitle,
      restFilter: thisWPProps.webPartScenario ? `webPartScenario eq '${thisWPProps.webPartScenario}'` : '',
      selectThese: ['*'],
      expandThese: [],
      fetchCount: 300,
      consoleLog: true,
      orderByBoolean: {
        prop: 'Title',
        asc: false,
      }
    }

    const initialResult: IItemsErrorObj = await fetchAnyItems( sourceProps );

    const result = checkItemsResults( initialResult, `getPreConfigItems ~ 31`, false, true );

    if ( result.status === 'Success' ){
      if ( result.items.length === 0 ) {
        alert(`Did not find any preconfigured items at ${webUrl.replace(window.location.origin, '' )} List: ${listTitle}`);

      } else {
        result.items.map( i => {  //Loop through all items
          // i = preConfigProps list item.
          let iProps: any = {};
          let currentItemProps = Object.keys(i); //All the props in the pre-configured list

          selectProps.map( p => { //Loop through all select props
              if ( currentItemProps.indexOf(p) < 0 ) {
                  //console.log('Skipping this prop... not in the PreConfigProps list: ', p );
              } else { 
                  if ( i[p] ) { 
                      iProps[p] = i[p] ; 
                  } else { 
                      iProps[p] = i[p]; 
                  }
              }
          });
          returnProps.push( iProps ) ;
        });
      }
    } else {

    }

    return returnProps;

}
