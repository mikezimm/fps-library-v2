
import { createFPSWindowProps, defWpInstanceID, initializeFPSSection, initializeFPSPage, webpartInstance} from '../FPSDOM/FPSDocument';
import { IFPSWindowProps, IFPSSection, IFPSSectionStyle } from '../FPSDOM/Interfaces';
import { IMinWPBannerProps } from '../../interfaces/Banner/IMinWPBannerProps';
import { sendStandardConsole, sendFPSWindowConsole } from './console';

/**
 * Combined updateSectionStyles and setSectionStyles
 */
  export function  updateSectionStyles( wpInstanceID: any, wpProps: IMinWPBannerProps, ) {

    let allSectionMaxWidth = wpProps.allSectionMaxWidthEnable !== true ? null : wpProps.allSectionMaxWidth;
    let allSectionMargin = wpProps.allSectionMarginEnable !== true ? null : wpProps.allSectionMargin;
    let sectionStyles = initializeFPSSection( wpInstanceID, allSectionMaxWidth, allSectionMargin,  );

    const alertError: any = true;
    const consoleResult: any = true;

    let fpsWindowProps: IFPSWindowProps = createFPSWindowProps();
    let winMaxWidthStyle: IFPSSectionStyle = fpsWindowProps.sections.maxWidth;
    let winMarginTBStyle: IFPSSectionStyle = fpsWindowProps.sections.marginTB;

    //Check if everything was already attempted
    let proceed: boolean = false;

    if ( sectionStyles.maxWidth.do === true && winMaxWidthStyle.success === 0 ) {
      proceed = true;

    } else if ( sectionStyles.marginTB.do === true && winMarginTBStyle.success === 0  ) {
      proceed = true;
    }

    if ( proceed === false ) { return ; }

    /**
     * Was getting this ts error creating divs:
     * Type 'NodeListOf<Element>' is missing the following properties from type 'any[]': pop, push, concat, join, and 26 more.ts(2740)
     *
     * Found this reference:  https://stackoverflow.com/a/222847
     * which references this:  https://262.ecma-international.org/8.0/#sec-array.from
     * 
     * Which now removes the error
     */

    const divs: any[] = Array.from( document.querySelectorAll('[data-automation-id="CanvasSection"]'));
    console.log( "divs.length: ", divs.length );

    //inspiration from:  https://reactgo.com/select-element-data-attribute-js/
    let maxWidthStyle: IFPSSectionStyle = sectionStyles.maxWidth;
    let marginTBStyle: IFPSSectionStyle = sectionStyles.marginTB;

    divs.forEach((el: any)=>{
      try {

        //This updates section maxWidth:   As of 2022-02-08:  default = '1256px'
        if ( maxWidthStyle.do === true ) {
          fpsWindowProps.sections.maxWidth = applySectionStyle( el.parentNode, maxWidthStyle, winMaxWidthStyle, alertError, consoleResult );
        }

        //This updates section top and bottom margin:  As of 2022-02-08:  default = '24px 0'
        if ( marginTBStyle.do === true ) {
          fpsWindowProps.sections.marginTB = applySectionStyle( el.childNodes[0], marginTBStyle, winMarginTBStyle, alertError, consoleResult );

        }
        
        sectionStyles.summary.success ++;

      } catch (e) {
          if ( alertError === true ) {
              alert('minimizeHeader:  Could not find element with data-automation-id="pageHeader"');
          }
          console.log('minimizeHeader:  Could not find element with data-automation-id="pageHeader"');
          sectionStyles.summary.errors ++;
          fpsWindowProps.sections.summary.errors ++;
      }
    });

    sendFPSWindowConsole( true, 'COMPLETE', fpsWindowProps );
    return { sectionStyles };

  }


  export function applySectionStyle( el : any , targetStyle: IFPSSectionStyle, windowStyle: IFPSSectionStyle, alertError: boolean = true, consoleResult: boolean = false ) {

    let cssProp: string = targetStyle.cssProp;
    windowStyle.do = true;

    //Needed to get instanceId this way to prevent mutation
    const thisInstanceId = targetStyle.wpInstanceID + '';
    windowStyle.wpInstanceID = thisInstanceId;
    windowStyle.history.push(thisInstanceId) ;

    try {
      if ( el.style ){
        if ( windowStyle.original === 'tbd' ) { 
          windowStyle.original = el.style[ cssProp ];
        }
        el.style[ cssProp ] = targetStyle.value;
      } else {
        if ( windowStyle.original === 'tbd' ) { 
          windowStyle.original = null;
        }
        el.style = { };
        el.style[ cssProp ] = targetStyle.value; 
        windowStyle.value = targetStyle.value;
      }
      windowStyle.success ++;
      windowStyle.attempted = true;
      sendStandardConsole( consoleResult, 'SUCCESS', windowStyle );

    } catch (e) {
      windowStyle.errors ++;
      windowStyle.attempted = true;
      sendStandardConsole( consoleResult, 'FAILURE', windowStyle );

    }
    return windowStyle;

  }

