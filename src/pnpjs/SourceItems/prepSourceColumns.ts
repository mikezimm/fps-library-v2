import { check4Gulp } from '@mikezimm/fps-pnp2';
import { getExpandColumns, getSelectColumns } from '../Lists/getVX/PnpjsListGetBasic';
import { ISourceProps } from "./Interface";

/**
 * prepSourceColumns will look at SourceProps and figure out all columns to be selected and expanded
 * @param sourceProps 
 * @returns 
 */
export function prepSourceColumns(sourceProps: ISourceProps): ISourceProps {

  if ( check4Gulp() === true ) { console.log( `fps-library-v2 BEFORE: prepSourceColumns ~ 12`, JSON.parse(JSON.stringify( sourceProps) ) ) };

  const searchProps: string[] = sourceProps.searchProps ? sourceProps.searchProps : [];
  const columns: string[] = [...sourceProps.columns, ...searchProps];
  const expColumns = getExpandColumns(columns);
  const selColumns = getSelectColumns(columns);

  //Do not get * columns when using standards so you don't pull WikiFields
  const baseSelectColumns = sourceProps.selectThese ? sourceProps.selectThese : sourceProps.columns;

  //  [ added: ...    baseSelectColumns, did not have the ... not sure how that worked.
  const selectThese = [...baseSelectColumns, ...selColumns];

  sourceProps.columns = columns.filter((element, index) => { return columns.indexOf(element) === index; });
  sourceProps.selectThese = selectThese.filter((element, index) => { return selectThese.indexOf(element) === index; });
  sourceProps.expandThese = expColumns.filter((element, index) => { return expColumns.indexOf(element) === index; });

  if ( check4Gulp() === true ) { console.log( `fps-library-v2 COMPLETE: prepSourceColumns ~ 29`, sourceProps ) };

  return sourceProps;

}
