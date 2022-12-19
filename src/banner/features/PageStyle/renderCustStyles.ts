import { DisplayMode } from "../../../common/interfaces/@msft/1.15.2/displayMode";
import { applyHeadingCSS, IMinHeadingStyleProps } from "../../../logic/indexes/DOMHeadings";
import { IMinWPBannerProps } from "../../interfaces/MinWP/IMinWPBannerProps";
import { minimizeHeader } from "./minimzeHeader";
import { setToolbar } from "./minimzeToolbar";
import { setQuickLaunch } from "./quickLaunch";
import { updateSectionStyles } from "./setAllSectionStyles";



interface IRenderCustomStyles {
  wpInstanceID: any;
  domElement:  HTMLElement;
  wpProps: IMinWPBannerProps;
  // fpsPageDone: boolean | null;  // Deprecating - No longer needed with more modern styling options in updateSectionStyles.
  // fpsPageArray: any[];  // Deprecating - No longer needed with more modern styling options in updateSectionStyles.
  displayMode: DisplayMode;
  // minHideToolbar: boolean;  //Should not be needed, using web part props for value and local function for url 
  // hideToolbar: boolean;  //Should not be needed, using web part props for value and local function for url 
  doHeadings: boolean;
}

/**
 * renderCustomStyles is intended for one-time style changes during onInit.  Not dynamic changes
 * NOT for things like PinMe or Expando which the user changes on the fly
 * 
 * @param wpInstanceID 
 * @param domElement 
 * @param wpProps 
//  * @param fpsPageDone   // Deprecating - No longer needed with more modern styling options in updateSectionStyles.
//  * @param fpsPageArray  // Deprecating - No longer needed with more modern styling options in updateSectionStyles.
 * @param displayMode 
//  * @param minHideToolbar //Should not be needed, using web part props for value and local function for url param
//  * @param hideToolbar  //Should not be needed, using web part props for value and local function for url 
 * @param doHeadings 
 */

export function  renderCustomStyles( sty: IRenderCustomStyles ) {

  const TempHeadingStyleProps: IMinHeadingStyleProps = sty.wpProps as any;
    if ( sty.doHeadings === true ) applyHeadingCSS( TempHeadingStyleProps );

    //Used with FPS Options Functions
    setQuickLaunch( sty.wpProps.quickLaunchHide ); // >> change to: minimizeQuickLaunch
    // minimizeHeader( document, sty.wpProps.pageHeaderHide, false, true );

    //Dropped sending document because it is always there
    minimizeHeader( sty.wpProps.pageHeaderHide, false, true ); 

    // Deprecating - No longer needed with more modern styling options in updateSectionStyles.
    // setThisPageFormatting( sty.wpInstanceID, sty.domElement, sty.wpProps.fpsPageStyle, sty.fpsPageDone, sty.fpsPageArray );
    setToolbar( sty.displayMode, sty.wpInstanceID, sty.wpProps.toolBarHide );
    updateSectionStyles( sty.wpInstanceID, sty.wpProps );
}
