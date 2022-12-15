import { DisplayMode } from '../../../common/interfaces/@msft/1.15.2/displayMode'
import { IFPSWindowProps, IFPSSectionStyle, IFPSSection } from '../FPSDOM/Interfaces';
import { createFPSWindowProps } from '../FPSDOM/FPSDocument';
import { applySectionStyle} from './setAllSectionStyles';
import { sendFPSWindowConsole } from './console';
import { initializeMinimalStyle } from '../FPSDOM/FPSDocument';

 /**
  * This minimizes the header on site pages where you do not want the Page Title at the top. originally copied from Pivot Tiles
  * 
  * @param document 
  * @param minimize 
  * @param alertError 
  * @param consoleResult 
  */


/**
 * Combines setToolbar and minimizeToolbar functions into one
 */
   export function  setToolbar( displayMode: DisplayMode, wpInstanceID: any, hideToolbar: boolean ) {
    const urlParameters = new URLSearchParams( window.location.href );

    if( displayMode == DisplayMode.Read && urlParameters.get('tool') !== 'true' ){
      let value = hideToolbar === true ? 'none' : null;
      let toolBarStyle: IFPSSectionStyle = initializeMinimalStyle( 'Miminze Toolbar', wpInstanceID, 'display', value );

      //minimizeToolbar would have been called here but code is below...

      const alertError: any = false;
      const consoleResult = true;

      let fpsWindowProps: IFPSWindowProps = createFPSWindowProps();
      let winStyle : IFPSSectionStyle = fpsWindowProps.toolBar;

      //If this was already attempted, then exit
      if ( fpsWindowProps.toolBar.attempted === true ) { return; }
      else if ( toolBarStyle.do === false || winStyle.success > 0 ) { return; }
      else { fpsWindowProps.toolBar.attempted = true; }

      // if ( proceed === false ) { return ; }

      const el: any = document.getElementById('spCommandBar');

      try {

        //This updates updates display to none or null
        if ( toolBarStyle.do === true ) {
          fpsWindowProps.toolBar = applySectionStyle( el, toolBarStyle, winStyle, alertError, consoleResult );
        }

        toolBarStyle.success ++;

      } catch (e) {
          if ( alertError === true ) {
              alert('minimizeToolbar:  Could not find element with id="spCommandBar"');
          }
          console.log('minimizeToolbar:  Could not find element with id="spCommandBar"');
          toolBarStyle.errors ++;
          fpsWindowProps.toolBar.errors ++;
      }

      sendFPSWindowConsole( true, 'COMPLETE', fpsWindowProps );
      return { toolBarStyle };


    }
  }

  export function minimizeToolbar ( document: any, sectionStyle: IFPSSectionStyle , alertError: boolean = true, consoleResult: boolean = false  ) {

    let fpsWindowProps: IFPSWindowProps = createFPSWindowProps();
    let winStyle : IFPSSectionStyle = fpsWindowProps.toolBar;

    //If this was already attempted, then exit
    if ( fpsWindowProps.toolBar.attempted === true ) { return; }
    else if ( sectionStyle.do === false || winStyle.success > 0 ) { return; }
    else { fpsWindowProps.toolBar.attempted = true; }

    // if ( proceed === false ) { return ; }

    const el: any = document.getElementById('spCommandBar');

    try {

      //This updates updates display to none or null
      if ( sectionStyle.do === true ) {
        fpsWindowProps.toolBar = applySectionStyle( el, sectionStyle, winStyle, alertError, consoleResult );
      }
      
      sectionStyle.success ++;

    } catch (e) {
        if ( alertError === true ) {
            alert('minimizeToolbar:  Could not find element with id="spCommandBar"');
        }
        console.log('minimizeToolbar:  Could not find element with id="spCommandBar"');
        sectionStyle.errors ++;
        fpsWindowProps.toolBar.errors ++;
    }

    sendFPSWindowConsole( true, 'COMPLETE', fpsWindowProps );
    return { sectionStyle };

  }
