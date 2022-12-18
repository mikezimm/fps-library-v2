import { getNumberArrayFromString } from '../../../../logic/Strings/arraysFromString';

//=>> address:  https://github.com/mikezimm/drilldown7/issues/271


export function getMaxRichHeight(autoRichHeight: string, richHeight: number, items: any[]): string {
  const autoHeight: number[] = getNumberArrayFromString(autoRichHeight, ';', true, false, 'asis');
  let maxQty = autoHeight.length >= 2 && autoHeight[0] > 0 ? autoHeight[0] : 3;
  let newRichHeight: string = `${richHeight}em`; //Just added 0 so it does not mutate
  if (items.length <= maxQty) {
    let maxHeight = autoHeight.length >= 2 && autoHeight[1] > 0 ? autoHeight[1] : 2.2;
    if (maxHeight > richHeight)
      newRichHeight = `${maxHeight}em`;
  }
  return newRichHeight;
}
