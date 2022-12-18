

import { ITrimB4 } from "../../../pnpjs/Lists/getVX/IGetInterfaceV2";

/***
 *    d888888b d8888b. d888888b .88b  d88.      d8888b.   j88D
 *    `~~88~~' 88  `8D   `88'   88'YbdP`88      88  `8D  j8~88
 *       88    88oobY'    88    88  88  88      88oooY' j8' 88
 *       88    88`8b      88    88  88  88      88~~~b. V88888D
 *       88    88 `88.   .88.   88  88  88      88   8D     88
 *       YP    88   YD Y888888P YP  YP  YP      Y8888P'     VP
 *
 *
 */
/**
 *
 * @param str
 * @param trimCommand
 * @param item - Currently not used since updateThisItemKey handles this part
 */

export function trimB4(str: string, trimCommand: ITrimB4) {

  let parser: string = '';
  let result: string = '';

  if (trimCommand === 'TrimB4Hyphen'.toLowerCase()) { parser = '-'; }
  if (trimCommand === 'TrimB4Dash'.toLowerCase()) { parser = '-'; }
  else if (trimCommand === 'TrimB4Space'.toLowerCase()) { parser = ' '; }
  else if (trimCommand === 'TrimB4Tilda'.toLowerCase()) { parser = '~'; }
  else if (trimCommand === 'TrimB4Par'.toLowerCase()) { parser = ')'; }
  else if (trimCommand === 'TrimB4LPar'.toLowerCase()) { parser = '('; }
  else if (trimCommand === 'TrimB4Colon'.toLowerCase()) { parser = ':'; }
  else if (trimCommand === 'TrimB4Dot'.toLowerCase()) { parser = '.'; }
  else if (trimCommand === 'TrimB42ndDot'.toLowerCase()) {
    //This does not currently work... DO NOT USE
    // var pos1 = str.indexOf(".");           // 3
    // var pos2 = str.indexOf(".", pos1 + 1); // 7
    result = str.split('.')[0].trim();
  }

  if (parser !== '') { result = str.split(parser)[0].trim(); }

  return result;

}
