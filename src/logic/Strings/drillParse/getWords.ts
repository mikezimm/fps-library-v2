
export const regexInitials = /[^a-zA-Z- ]/g;
export const regexInitialsWithNumbers = /[^a-zA-Z-\d ]/g;

// export const regexFirstHan = /\p{Han}/gu;
export function getInitials(str: string, asCaps: boolean, includeNumbers: boolean) {

  let useRegex = includeNumbers === true ? regexInitialsWithNumbers : regexInitials;

  //Get array of initials based on the includeNumbers option
  let initials = str.replace(useRegex, "").match(/\b\w/g);

  let inititalString = initials ? initials.join('') : '';

  if (asCaps === true) {
    inititalString = inititalString.toLocaleUpperCase();
  }

  return inititalString;

}
/***
 *     d888b  d88888b d888888b      d88888b d888888b d8888b. .d8888. d888888b      db   d8b   db  .d88b.  d8888b. d8888b.
 *    88' Y8b 88'     `~~88~~'      88'       `88'   88  `8D 88'  YP `~~88~~'      88   I8I   88 .8P  Y8. 88  `8D 88  `8D
 *    88      88ooooo    88         88ooo      88    88oobY' `8bo.      88         88   I8I   88 88    88 88oobY' 88   88
 *    88  ooo 88~~~~~    88         88~~~      88    88`8b     `Y8b.    88         Y8   I8I   88 88    88 88`8b   88   88
 *    88. ~8~ 88.        88         88        .88.   88 `88. db   8D    88         `8b d8'8b d8' `8b  d8' 88 `88. 88  .8D
 *     Y888P  Y88888P    YP         YP      Y888888P 88   YD `8888Y'    YP          `8b8' `8d8'   `Y88P'  88   YD Y8888D'
 *
 *
 */
/**
 * GetFirstWord is what was tested to pull the first word from a string
 * This will get the first 'word' consisting of letters and numbers
 *
 * HOWEVER, testing shows that:
 *  a value of all numbers: '2003/88', will return just ''
 *  whereas '10a08/2334' will return 'a08'
 *
 *  ALSO, this does NOT work on non-arabic characters so 'Código' just returns a 'C'
 *
 *   IN THOSE CASES, a Tested option would be 'TrimB4Space' or other triming
 *
 * @param str
 *
 */



export function GetFirstWord(str: string, asCaps: boolean, justInitial: boolean, removeDigits: boolean) {

  if (!str) { return str; }
  if (typeof str !== 'string') { return str; }

  let newValue = str.trim();
  newValue = str.split(/^[^a-zA-Z]*/gm)[1];

  if (newValue === undefined) {
    newValue = str.split(/^[^a-zA-Z]*/gm)[0].split(/\W/gm)[0];

  } else {
    newValue = newValue.split(/\W/gm)[0];
  }

  if (removeDigits === true) {
    newValue = newValue.replace(/[0-9]/g, '');
  }

  if (justInitial === true) { newValue = newValue.charAt(0); }

  if (asCaps === true) {
    newValue = newValue.toLocaleUpperCase();
  }

  return newValue;

}
/***
 *     d888b  d88888b d888888b      db       .d8b.  .d8888. d888888b      db   d8b   db  .d88b.  d8888b. d8888b.
 *    88' Y8b 88'     `~~88~~'      88      d8' `8b 88'  YP `~~88~~'      88   I8I   88 .8P  Y8. 88  `8D 88  `8D
 *    88      88ooooo    88         88      88ooo88 `8bo.      88         88   I8I   88 88    88 88oobY' 88   88
 *    88  ooo 88~~~~~    88         88      88~~~88   `Y8b.    88         Y8   I8I   88 88    88 88`8b   88   88
 *    88. ~8~ 88.        88         88booo. 88   88 db   8D    88         `8b d8'8b d8' `8b  d8' 88 `88. 88  .8D
 *     Y888P  Y88888P    YP         Y88888P YP   YP `8888Y'    YP          `8b8' `8d8'   `Y88P'  88   YD Y8888D'
 *
 *
 */
/**
 * This REGEX was tested and seems to work
 * This will get the LAST 'word' consisting of letters and/or numbers, even if the last word is only 1 char/digit
 * @param str
 */

export function GetLastWord(str: string, asCaps: boolean, justInitial: boolean, removeDigits: boolean) {

  if (!str) { return str; }
  if (typeof str !== 'string') { return str; }

  let newValue = str.trim();
  newValue = str.split(/\b(\w+)\W*$/g)[1];

  if (newValue === undefined) {
    newValue = str.split(/\b(\w+)\W*$/g)[0].split(/\W/gm)[0];

  } else {
    newValue = newValue.split(/\W/gm)[0];
  }

  if (removeDigits === true) {
    newValue = newValue.replace(/[0-9]/g, '');
  }

  if (justInitial === true) { newValue = newValue.charAt(0); }

  if (asCaps === true) {
    newValue = newValue.toLocaleUpperCase();
  }

  return newValue;

}
