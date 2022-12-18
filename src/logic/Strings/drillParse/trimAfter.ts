
import { ITrimAfter } from '../../../pnpjs/Lists/getVX/IGetInterfaceV2';
import { DidNotTrim } from './constants';

/***
 *    d888888b d8888b. d888888b .88b  d88.       .d8b.  d88888b d888888b d88888b d8888b.      db    db
 *    `~~88~~' 88  `8D   `88'   88'YbdP`88      d8' `8b 88'     `~~88~~' 88'     88  `8D      `8b  d8'
 *       88    88oobY'    88    88  88  88      88ooo88 88ooo      88    88ooooo 88oobY'       `8bd8'
 *       88    88`8b      88    88  88  88      88~~~88 88~~~      88    88~~~~~ 88`8b         .dPYb.
 *       88    88 `88.   .88.   88  88  88      88   88 88         88    88.     88 `88.      .8P  Y8.
 *       YP    88   YD Y888888P YP  YP  YP      YP   YP YP         YP    Y88888P 88   YD      YP    YP
 *
 *
 */

export function trimAfter(str: string, trimCommand: ITrimAfter) {

  let parser: string = '';
  let result: string = DidNotTrim;

  if (trimCommand === 'TrimAfterHyphen'.toLowerCase()) { parser = '-'; }
  if (trimCommand === 'TrimAfterDash'.toLowerCase()) { parser = '-'; }
  else if (trimCommand === 'TrimAfterTilda'.toLowerCase()) { parser = '~'; }
  else if (trimCommand === 'TrimAfterColon'.toLowerCase()) { parser = ':'; }
  else if (trimCommand === 'TrimAfterPar'.toLowerCase()) { parser = ')'; }
  else if (trimCommand === 'TrimAfterDot'.toLowerCase()) { parser = '.'; }

  if (parser !== '') {
    result = TrimAfterThis(str, parser);
  }

  return result;

}

export function TrimAfterColon( str: string ) {
  return TrimAfterThis( str, ':' );
}

export function TrimAfterTilda( str: string ) {
  return TrimAfterThis( str, '~' );
}

export function TrimAfterHyphen( str: string ) {
  return TrimAfterThis( str, '-' );
}

export function TrimAfterThis( str: string, parser: string ) {
  if ( typeof str !== 'string' ) { return str; }
  let idx = str.indexOf( parser );
  return idx > -1 ? str.substring(idx + 1 ).trim() : DidNotTrim;
}