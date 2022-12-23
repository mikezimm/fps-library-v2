import { convertArrayToLC } from '../../../logic/Arrays/manipulation';
import { DoNotFetchSpecial, } from './IGetInterfaceV2';

export function getSpecialColumns(lookupColumns : string[] , SpecialColumnsIn: string[] = DoNotFetchSpecial ): string[] {

  let baseSpecialColumns: string[]  = [];
  const SpecialColumnsInLC = convertArrayToLC( SpecialColumnsIn );

  lookupColumns.map( ( column: string ) => {
    // Only look at columns with / in the name
    if ( SpecialColumnsInLC.indexOf( column.toLowerCase() ) > -1  ) baseSpecialColumns.push( column );
  });

  // Adding this to remove duplicates:
  const finalColumns = baseSpecialColumns.filter((element, index) => { return baseSpecialColumns.indexOf(element) === index; });

  return finalColumns;
}