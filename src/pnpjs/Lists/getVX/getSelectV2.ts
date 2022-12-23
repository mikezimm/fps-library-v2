
import { DoNotExpandColumns, DoNotFetchSpecial, DoNotFetchSpecialLC, } from './IGetInterfaceV2';

/**
   * getSelectColumns function will take an array of column names (string format)
   * 
   * VERIFIED SAME AS getSelectColumnsV2 from Drilldown but with map instead of for.
   * 
   *    and return an array of the columns that need to be added to the select variable in getItems
   *    It pushes the entire expanded name like:  Created/ID
   * 
   * This came from Drilldown and figures out which columns using / are actually intended to be special columns functions vs actual lookup types
   *  So if you pass in a column called TextColumnName/TrimAfterColon, it only 'selects' TextColumnName 
   *  since 'TrimAfterColon' is way to tell Drilldown to apply a function to that column.
   * 
   * @param lookupColumns 
   */

  export function getSelectColumns( lookupColumns : string[], DoNotExpandColumnsIn: string[] = DoNotExpandColumns ) : string[] {

    let baseSelectColumns: string[]  = [];
    let DoNotExpandColumnsLC = DoNotExpandColumnsIn.map( item => { return item.toLowerCase(); } ) ;
    let DoNotExpandFuncColumnsLC = DoNotExpandColumnsIn.map( item => { return item.toLowerCase(); } ) ;

    lookupColumns.map( ( column: string ) => {
      // Only look at columns with / in the name
      if ( DoNotFetchSpecialLC.indexOf( column.toLowerCase() ) > - 1 ) {
        // Do NOT select this
      } else if (column && column.indexOf("/") > -1 ) {
        let isLookup = column.indexOf("/");
        if(isLookup) {
          let splitCol = column.split("/");
          let baseColumn = splitCol[ 0 ] ; //This is always the zero index splitCol period
          let nextPart = splitCol[ 1 ];
          let rightSide = splitCol[ splitCol.length -1 ];

          let hasFunctionError = false;
          if ( rightSide.toLowerCase().indexOf('before') > -1 && DoNotExpandFuncColumnsLC.indexOf( rightSide.toLowerCase().replace('before','b4'))  > -1 ) {
            hasFunctionError = true;
          }

          if ( nextPart && DoNotExpandColumnsLC.indexOf( nextPart.toLowerCase() ) > -1 ) {
            //Then do nothing since this column is a 'faux expanded column' used in Drilldown for Link Columns

          } else if ( splitCol && splitCol.length === 2 && hasFunctionError === true  ) {
            //Then do nothing since this column is a 'faux expanded column' used in Drilldown for Link Columns
            baseSelectColumns.push( splitCol[ 0 ] );

          } else if ( splitCol && splitCol.length === 3 ) {
            //Then check since this is likely an expanded column with special function
            if ( nextPart && DoNotExpandColumnsLC.indexOf( nextPart.toLowerCase() ) < 0 ) {
              let temp = hasFunctionError !== true ? '/' + splitCol[ 1 ] : '';
              baseSelectColumns.push( splitCol[ 0 ] + temp );

            }
          } else {
            baseSelectColumns.push(column);

          }
        }
      }
    });

    /**
     * Added for https://github.com/mikezimm/fps-library-v2/issues/12
     * From drilldown to clean the select columns list
     */

    const cleanSelectCols: string[] = [];
    baseSelectColumns.map( column => { 
      let cleanColumn: string = `${column}`;
      if ( column.indexOf('/') > -1 ) {
        DoNotExpandColumns.map( doNotExp => {
          //https://reactgo.com/javascript-variable-regex/
          const removeStr = `/${doNotExp}`;
          const regex =  new RegExp(removeStr,'gi'); // eslint-disable-line @rushstack/security/no-unsafe-regexp
          /**
           * Added this if then because when I just replace Object. from a select that has more 'dots' afterwords
           *    This was a real case of a select column:  "performance/Object.ops.analyze1.c"
           *    Without this loop, it returned the clean column as "performanceops.analyze1.c"
           *    In reality, the column to 'select' would just be "performance"
           * 
           */
          if ( doNotExp.toLowerCase() === 'object.' ) {
            const cleanSplit = cleanColumn.split(regex); // it works  
            cleanColumn = cleanSplit[0];
          } else {
            cleanColumn = cleanColumn.replace(regex,''); // it works  
          }
        });
      }
      cleanSelectCols.push( cleanColumn ); // it works  
    });

    // Adding this to remove duplicates:
    const finalColumns = cleanSelectCols.filter((element, index) => { return cleanSelectCols.indexOf(element) === index; });


    // NOT Needed since it is taken care of in prepSourceColumns on all arrays now.
    // const noDupsColumns: string[] = [];
    // baseSelectColumns.map( column => {
    //   if ( noDupsColumns.indexOf( column ) === -1 ) noDupsColumns.push( column );
    // });

    return finalColumns;
  }
