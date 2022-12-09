
import { IFPSWindowProps, IFPSSection, IFPSSectionStyle, IFPSPage } from './Interfaces';

/**
 * The purpose of this file is to establish a node in the dom to store all current page variables that can easily be seen and updated by any FPS Webpart
 */

export function webpartInstance( str: string ) {
  const start = new Date();
  const thisInstance = `${str} | ${start.toUTCString()} | ${start.getTime()} | ${Math.floor(Math.random() * 7997)}`;
  console.log( `winFPS Initiating wpInstanceID:  ${thisInstance}` );
  return thisInstance;
}
/**
 * Creates default pageStyles object for window.FPSOptions
 */
export function initializeFPSPage( wpInstanceID: any, doThis: boolean | null, fpsPageStyle: string | null, fpsPageArray: any[]  ) {
  let pageStyles: IFPSPage = {
    title: 'FPS Page Styles',
    do: doThis,
    wpInstanceID: wpInstanceID,
    attempted: false,
    success: 0, errors: 0,
    Style: fpsPageStyle,
    Array: fpsPageArray,
  };
  return pageStyles;
}


export function initializeFPSSection( wpInstanceID: any, maxWidth: any = null, marginTB: any = null ) {
  let sectionStyles: IFPSSection = {
    summary: { success: 0, errors: 0 },
    maxWidth: { 
      title: 'Section maxWidth',
      cssProp: 'maxWidth',
      wpInstanceID: wpInstanceID,
      history: [wpInstanceID],
      original: 'tbd', 
      attempted: false, 
      do: maxWidth === null ? null : true , 
      value:  maxWidth === null ? null : `${maxWidth}px`,
      success: 0, errors: 0 
    },
    marginTB: { 
      title: 'Section marginTopBottom',
      cssProp: 'margin',
      wpInstanceID: wpInstanceID,
      history: [wpInstanceID],
      original: 'tbd', 
      attempted: false, 
      do: marginTB === null ? null : true , 
      value: marginTB === null ? '24px 0' :  `${marginTB}px 0`,
      success: 0, errors: 0 
    },
  };
  return sectionStyles;
}

/**
 * initializeToolbar usage:
 * initializeToolbar( 'Hide Toolbar', wpInstanceID, 'display', this.properties.togglevalue )
 * @param title 
 * @param wpInstanceID 
 * @param cssProp 
 * @param value 
 */
export function initializeMinimalStyle( title: string, wpInstanceID: any, cssProp: string, value: any = null  ) {
  let sectionStyles: IFPSSectionStyle = {
    title: title,
    cssProp: cssProp,
    wpInstanceID: wpInstanceID,
    history: [wpInstanceID],
    original: 'tbd', 
    attempted: false, 
    do: value === null ? null : true , 
    value: value === null ? null :  value,
    success: 0, errors: 0 
  };
  return sectionStyles;
}

export const defWpInstanceID = 'window';
export const defHideHeaderTitle = 'Hide Page Header';
export const defHideQuicklaunchTitle = 'Hide Quick Launch';
export const defToolBarTitle = 'Hide Toolbar';

export function createFPSWindowProps() {
  const thisWindow : any = window;

  let didThis: string = 'Did not do anything this time';

  if ( !thisWindow.FPSOptions ){
    didThis = 'Adding FPSOptions to page'
    let fpsWindowProps: IFPSWindowProps = {
      page: initializeFPSPage( defWpInstanceID, null, null, [] ),
      sections: initializeFPSSection( defWpInstanceID ),
      header: {
        title: 'Hide Page Header',
        wpInstanceID: defWpInstanceID,
        history: [defWpInstanceID],
        original: null,
        attempted: false,
        value: null, 
        success: 0,
        errors: 0,
      },
      quicklaunch: {
        title: 'Hide Quick Launch',
        wpInstanceID: defWpInstanceID,
        history: [defWpInstanceID],
        original: null,
        attempted: false,
        value: null, 
        success: 0,
        errors: 0,
      },
      expando: {
        title: 'Expandoramic Viewport',
        wpInstanceID: defWpInstanceID,
        history: [defWpInstanceID],
        original: null,
        attempted: false,
        value: null, 
        success: 0,
        errors: 0,
      },
      toolBar: initializeMinimalStyle( defToolBarTitle, defWpInstanceID, 'display', null ),
    };
    thisWindow.FPSOptions = fpsWindowProps;

  } else {

  }
  console.log('winFPS createWinProps', didThis, thisWindow.FPSOptions );
  return thisWindow.FPSOptions;

}