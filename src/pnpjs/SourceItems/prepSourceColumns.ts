import { getExpandColumns, getSelectColumns } from '@mikezimm/fps-js/lib/indexes/pnpjsListGetBasic';
import { ISourceProps } from "./Interface";

/**
 * prepSourceColumns will look at SourceProps and figure out all columns to be selected and expanded
 * @param sourceProps 
 * @returns 
 */
export function prepSourceColumns(sourceProps: ISourceProps): ISourceProps {

  const searchProps: string[] = sourceProps.searchProps ? sourceProps.searchProps : [];
  const columns: string[] = [...sourceProps.columns, ...searchProps];
  const expColumns = getExpandColumns(columns);
  const selColumns = getSelectColumns(columns);

  //Do not get * columns when using standards so you don't pull WikiFields
  const baseSelectColumns = sourceProps.selectThese ? sourceProps.selectThese : sourceProps.columns;

  //  [ added: ...    baseSelectColumns, did not have the ... not sure how that worked.
  const selectThese = [...baseSelectColumns, ...selColumns];

  sourceProps.columns = columns;
  sourceProps.selectThese = selectThese;
  sourceProps.expandThese = expColumns;

  return sourceProps;

}
