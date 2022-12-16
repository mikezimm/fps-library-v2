

 /***
 *     d888b  d88888b d888888b      .d8888. d888888b d88888D d88888b      db       .d8b.  d8888b. d88888b db      
 *    88' Y8b 88'     `~~88~~'      88'  YP   `88'   YP  d8' 88'          88      d8' `8b 88  `8D 88'     88      
 *    88      88ooooo    88         `8bo.      88       d8'  88ooooo      88      88ooo88 88oooY' 88ooooo 88      
 *    88  ooo 88~~~~~    88           `Y8b.    88      d8'   88~~~~~      88      88~~~88 88~~~b. 88~~~~~ 88      
 *    88. ~8~ 88.        88         db   8D   .88.    d8' db 88.          88booo. 88   88 88   8D 88.     88booo. 
 *     Y888P  Y88888P    YP         `8888Y' Y888888P d88888P Y88888P      Y88888P YP   YP Y8888P' Y88888P Y88888P 
 * 
 *    import { getSizeLabel } from '@mikezimm/npmfunctions/dist/Services/Strings/stringServices';                   
 */

 /**
  * Converts a number into a label, used in eXTreme Storage to show 100 MB and 1.23 GB sizes
  * @param size 
  * @param decimal 
  * @returns 
  */
export function getSizeLabel ( size: number, decimal: number = 1 ): string {
  if ( size === null || size === undefined ) { return '' ; }
  return size > 1e9 ? `${ (size / 1e9).toFixed(decimal) } GB` : size > 1e6 ? `${ (size / 1e6).toFixed(decimal) } MB` : size > 1e3 ? `${ ( size / 1e3).toFixed(decimal) } KB` : `${ ( size ).toFixed(decimal) } B`;
}

 /**
  * Converts a number into a label, used in eXTreme Storage to show 1.6M and 2.3G sizes
  * @param size 
  * @param decimal 
  * @returns 
  */
export function getCountLabel ( count: number, decimal: number = 1 ): string {
  if ( count === null || count === undefined ) { return '' ; }
  return count > 1e9 ? `${ (count / 1e9).toFixed(decimal) } G` : count > 1e6 ? `${ (count / 1e6).toFixed(decimal) } M` : count > 1e3 ? `${ ( count / 1e3).toFixed(decimal) } k` : `${ ( count ).toFixed(decimal) }`;
}

/**
 * Returns string with 1000's separated format.
 * For US:  1,000,000
 * For EU:  1.000.000
 * @param numb
 */
export function getCommaSepLabel( numb: number ): string {
 return new Intl.NumberFormat().format(numb);

}