
import { IFPSWindowProps, } from '../FPSDOM/Interfaces';
import { createFPSWindowProps, } from '../FPSDOM/FPSDocument';
 /**
  * This minimizes the header on site pages where you do not want the Page Title at the top. originally copied from Pivot Tiles
  * 
  * @param document 
  * @param minimize 
  * @param alertError 
  * @param consoleResult 
  */
  export function minimizeHeader ( minimize : boolean, alertError: boolean = true, consoleResult: boolean = false  ) {

    let fpsWindowProps: IFPSWindowProps = createFPSWindowProps();

    //If this was already attempted, then exit
    if ( fpsWindowProps.header.attempted === true ) { return; }
    else if ( minimize !== true ) { return; }
    else { fpsWindowProps.header.attempted = true; }

    let height: any = minimize === true ? '0px' : null;

    /**
     * Was getting this ts error creating divs:
     * Type 'NodeListOf<Element>' is missing the following properties from type 'any[]': pop, push, concat, join, and 26 more.ts(2740)
     *
     * Found this reference:  https://stackoverflow.com/a/222847
     * which references this:  https://262.ecma-international.org/8.0/#sec-array.from
     * 
     * Which now removes the error
     */

    const divs: any[] = Array.from( document.querySelectorAll('[data-automation-id="pageHeader"]'));
    console.log( "divs.length: ", divs.length );

    //inspiration from:  https://reactgo.com/select-element-data-attribute-js/
    divs.forEach((el: any)=>{
      try {
        if ( el.style ){
          el.style.height = height;
        } else {
          el.style = { height: height};
        }
        if ( consoleResult === true ) {
            console.log('minimizeHeader:  set minimize to ', minimize);
        }
        fpsWindowProps.header.success ++;

      } catch (e) {
          if ( alertError === true ) {
              alert('minimizeHeader:  Could not find element with data-automation-id="pageHeader"');
          }
          console.log('minimizeHeader:  Could not find element with data-automation-id="pageHeader"');
          fpsWindowProps.header.errors ++;
      }
    });

  }
