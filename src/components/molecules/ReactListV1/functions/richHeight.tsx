import { getNumberArrayFromString } from '../../../../logic/Strings/arraysFromString';

//=>> address:  https://github.com/mikezimm/drilldown7/issues/271

/**
 * This can be removed once the num version is validated
 */
export function getMaxRichHeight(autoRichHeight: string, richHeight: string, items: any[]): string {

  const autoHeight: number[] = getNumberArrayFromString(autoRichHeight, ';', true, false, 'asis');
  let maxQty = autoHeight.length >= 2 && autoHeight[0] > 0 ? autoHeight[0] : 3;
  let newRichHeight: string = `${richHeight}`; //Just added 0 so it does not mutate
  const richHeightNum = parseFloat(richHeight);

  if (items.length <= maxQty) {
    let maxHeight = autoHeight.length >= 2 && autoHeight[1] > 0 ? autoHeight[1] : 2.2;
    if ( !richHeightNum || maxHeight > richHeightNum )
      newRichHeight = `${maxHeight}em`;
  }

  return newRichHeight;
}

export function getMaxRichHeightNum(autoRichHeight: string, richHeight: number, items: any[]): number {

  const autoHeight: number[] = getNumberArrayFromString(autoRichHeight, ';', true, false, 'asis');
  const maxQty = autoHeight.length >= 2 && autoHeight[0] > 0 ? autoHeight[0] : 3;
  let richHeightNum = richHeight ? richHeight + 0 : 0;
  if (items.length <= maxQty) {
    let maxHeight = autoHeight.length >= 2 && autoHeight[1] > 0 ? autoHeight[1] : 2.2;
    if ( !richHeight || maxHeight > richHeight )
    richHeightNum = maxHeight;
  }

  return richHeightNum;
}