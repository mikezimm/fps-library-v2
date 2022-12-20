import { DoNotExpandColumns, } from './IGetInterfaceV2';

export function getExpandColumns(lookupColumns : string[] , DoNotExpandColumnsIn: string[] = DoNotExpandColumns ): string[] {

  let baseExpandColumns: string[]  = [];
  let DoNotExpandColumnsLC = DoNotExpandColumnsIn.map( item => { return item.toLowerCase(); } ) ;

  lookupColumns.map( ( column: string ) => {
    // Only look at columns with / in the name
    if (column && column.indexOf("/") > -1 ) {
      let splitCol = column.split("/");
      // let leftSide = splitCol.length === 3 ? splitCol[0] + '/' + splitCol[1]: splitCol[0] ;
      let baseColumn = splitCol[ 0 ] ; //This is always the zero index splitCol period
      let nextPart = splitCol[ 1 ];

      // Need to check 2 special cases:
      // #1 is splitCol[1] = link column?  If so, do not expand
      // #2 is if splitCol[1] = any other special column, do not expand

      if ( nextPart && DoNotExpandColumnsLC.indexOf( nextPart.toLowerCase() ) > -1 ) {
        //Then do nothing since this column is a 'faux expanded column' used in Drilldown for Link Columns

      // Added this for:  https://github.com/mikezimm/fps-library-v2/issues/12
      } else if( nextPart.toLowerCase().indexOf(`object.`) > -1 ) {
        //Then also do not expand because this is the special Object case.

      } else if(baseExpandColumns.indexOf(baseColumn) < 0) {
        baseExpandColumns.push(baseColumn);

      }
    }
  });

  // Adding this to remove duplicates:
  const finalColumns = baseExpandColumns.filter((element, index) => { return baseExpandColumns.indexOf(element) === index; });

  return finalColumns;
}