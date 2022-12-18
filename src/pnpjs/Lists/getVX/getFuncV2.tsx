import { DoNotExpandFuncColumns } from './IGetInterfaceV2';

export type IFunctionErrorType = 'beforeB4' | 'invalidRight' | 'none' ;

export interface IFunctionError {
  error: IFunctionErrorType;
  column: string;
  leftSide: string;
  rightSide: string;
}

export interface IFullColumnFunctionsReturn { all: string[], actual: string[], errors: IFunctionError[] }


/**
 * This function gets columns known to be Function columns in the Drilldown web part logic
 * 
 * NOT VERIFIED/TESTED SAME AS getLinkColumnsV2 from Drilldown but with map instead of for.
 * 
 * @param lookupColumns 
 * @param DoNotExpandColumnsIn 
 * @returns 
 */
export function getFuncColumns(lookupColumns : string[], DoNotExpandColumnsIn: string[] = DoNotExpandFuncColumns ): IFullColumnFunctionsReturn {

  let allFuncColumns: string[]  = [];
  let funcErrors : IFunctionError[] = [];
  let actualFuncColumns: string[]  = [];
  let DoNotExpandFuncColumnsLC = DoNotExpandColumnsIn.map( item => { return item.toLowerCase(); } ) ;

  lookupColumns.map( ( column: string ) => {
    // Only look at columns with / in the name

    let splitCol = column.split("/");
    let leftSide = splitCol.length === 3 ? splitCol[0] + '/' + splitCol[1]: splitCol[0] ;
    let rightSide = splitCol[ splitCol.length -1 ];

    if ( rightSide && DoNotExpandFuncColumnsLC.indexOf( rightSide.toLowerCase() ) > -1 ) {
      //Then do nothing since this column is a 'faux expanded column' used in Drilldown for Func Columns
      if ( allFuncColumns.indexOf( column ) < 0 ) { 
        allFuncColumns.push( column );

        //This extra if-then is required because there could be 2 functions pointing to the same actual column
        if ( actualFuncColumns.indexOf( leftSide ) < 0 ) { actualFuncColumns.push( leftSide ); }

      }
    }

    let errorType: IFunctionErrorType = 'none';
    let funcIdx =  DoNotExpandFuncColumnsLC.indexOf( rightSide.toLowerCase() );

    if ( rightSide.toLowerCase().indexOf('before') > -1 && DoNotExpandFuncColumnsLC.indexOf( rightSide.toLowerCase().replace('before','b4'))  > -1 ) {
      errorType = 'beforeB4';

    } else if ( splitCol.length === 3 && funcIdx < 0 ) {
      errorType = 'invalidRight';
    }

    if ( errorType !== 'none' ) funcErrors.push( { error: errorType, column: column, leftSide: leftSide, rightSide: rightSide} );

  });

  return { all: allFuncColumns, actual: actualFuncColumns, errors: funcErrors };

}
