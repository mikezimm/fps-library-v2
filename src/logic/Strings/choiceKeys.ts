
// import { getChoiceKey, getChoiceText } from '@mikezimm/npmfunctions/dist/Services/Strings/choiceKeys';


  /***
 *     d888b  d88888b d888888b       .o88b. db   db  .d88b.  d888888b  .o88b. d88888b      db   dD d88888b db    db 
 *    88' Y8b 88'     `~~88~~'      d8P  Y8 88   88 .8P  Y8.   `88'   d8P  Y8 88'          88 ,8P' 88'     `8b  d8' 
 *    88      88ooooo    88         8P      88ooo88 88    88    88    8P      88ooooo      88,8P   88ooooo  `8bd8'  
 *    88  ooo 88~~~~~    88         8b      88~~~88 88    88    88    8b      88~~~~~      88`8b   88~~~~~    88    
 *    88. ~8~ 88.        88         Y8b  d8 88   88 `8b  d8'   .88.   Y8b  d8 88.          88 `88. 88.        88    
 *     Y888P  Y88888P    YP          `Y88P' YP   YP  `Y88P'  Y888888P  `Y88P' Y88888P      YP   YD Y88888P    YP    
 *   
 *   
 */
/**
 * This is used specifically for making a key value from text that can be in a css ID or classname.
 * Used in Dropdown Fields
 * 
 * @param val 
 */
 export function getChoiceKey(val: string): string {

    if (val === null) {  
      console.log('getChoiceKey is null');
      return'valueIsNull'; }
    else if (val === undefined) {  
      console.log('getChoiceKey is undefined');
      return'valueIsNull'; }
    else {
      return val.replace(' ','SPACE').replace('.','DOT').replace('~','TILDE').replace('~','COMMA');
    }

}

/***
 *     d888b  d88888b d888888b       .o88b. db   db  .d88b.  d888888b  .o88b. d88888b      d888888b d88888b db    db d888888b 
 *    88' Y8b 88'     `~~88~~'      d8P  Y8 88   88 .8P  Y8.   `88'   d8P  Y8 88'          `~~88~~' 88'     `8b  d8' `~~88~~' 
 *    88      88ooooo    88         8P      88ooo88 88    88    88    8P      88ooooo         88    88ooooo  `8bd8'     88    
 *    88  ooo 88~~~~~    88         8b      88~~~88 88    88    88    8b      88~~~~~         88    88~~~~~  .dPYb.     88    
 *    88. ~8~ 88.        88         Y8b  d8 88   88 `8b  d8'   .88.   Y8b  d8 88.             88    88.     .8P  Y8.    88    
 *     Y888P  Y88888P    YP          `Y88P' YP   YP  `Y88P'  Y888888P  `Y88P' Y88888P         YP    Y88888P YP    YP    YP    
 *             
 *             
 */

/**
 * This is the opposite of getChoiceKey..
 * Just converts the key back to the text
 * 
 * @param val 
 */
export function getChoiceText(val: string): string | null {

    if (val === null) {  
      console.log('getChoiceText is null');
      return null; }
    else if (val === undefined) {  
      console.log('getChoiceText is undefined');
      return null; }
    else {
      return val.replace('SPACE',' ').replace('DOT','.').replace('TILDE','~').replace('COMMA','~');
    }

}
