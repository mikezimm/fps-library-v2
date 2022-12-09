
import { DoNotExpandLinkColumns,  } from './IGetInterfaceV2';

/**
 * This came from Drilldown and figures out which columns using / are actually intended to be link Function columns
 * @param lookupColumns 
 * @param DoNotExpandColumnsIn 
 * @returns 
 */

export function getLinkColumns(lookupColumns : string[], DoNotExpandColumnsIn: string[] = DoNotExpandLinkColumns ) : string[] {

  let baseLinkColumns: string[] = [];
  let DoNotExpandLinkColumnsLC = DoNotExpandColumnsIn.map( item => { return item.toLowerCase(); } ) ;

  lookupColumns.map( ( column: string ) => {
    // Only look at columns with / in the name
    let splitCol = column.split("/");
    let leftSide = splitCol[0];
    let rightSide = splitCol[ splitCol.length -1 ];

    if ( rightSide && DoNotExpandLinkColumnsLC.indexOf( rightSide.toLowerCase() ) > -1 ) {
      //Then do nothing since this column is a 'faux expanded column' used in Drilldown for Link Columns
      if ( baseLinkColumns.indexOf( column ) < 0 ) { baseLinkColumns.push( column ); }
    }
  });

  return baseLinkColumns;
}

