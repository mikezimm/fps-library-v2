

import { IFPSWindowProps, IFPSSection, IFPSSectionStyle } from '../FPSDOM/Interfaces';
//import { sendStandardConsole, sendFPSWindowConsole } from './console';
  /**
   * This will just send standard message to the console if it's needed
   * @param consoleResult
   * @param result 
   * @param section 
   */
  export function sendStandardConsole(consoleResult: boolean, result: string, section: IFPSSectionStyle ){
    if ( consoleResult === true ) {//winFPS createWinProps
      console.log(`winFPS setSecStyle ${result}:  ${section.title}`, section);
    }
  }

  /**
   * This will just send standard message to the console if it's needed
   * @param consoleResult
   * @param result 
   * @param section 
   */
  export function sendFPSWindowConsole(consoleResult: boolean, result: string, FPSOptions: IFPSWindowProps ){
    if ( consoleResult === true ) {
      console.log(`winFPS sendFPSWinCon ${result}: FPSOptions`, FPSOptions);
      console.log(`winFPS sendFPSWinCon ${result}: Window`, window );
    }
  }