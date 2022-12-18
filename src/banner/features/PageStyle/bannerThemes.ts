import { createBannerStyleStr } from "../../../common/commandStyles/defaults";
import { IConfigurationProp } from "../../../common/PropPaneHelp/preconfig/IPreConfig";
import { doesObjectExistInArray } from "../../../logic/indexes/ArrayFindObjects";
import { IMinBannerThemeProps } from "../../interfaces/Theme/Interfaces";
import { IPinMeState } from "../PinMe/Interfaces";



/**
 * This will update bannerStyle and bannerCmdStyle in the following way
 * Typically the appPresetCollectionDefaults run before this so it's possible the defBannerTheme is already preset.
 * If for some reason the bannerStyle or bannerCmdStyle are not properly set in the Pre-ConfiguredProps, this will udpate them based on the bannerStyleChoice
 * 
 * Then it will adjust bannerCmdStyle fontSize, margins and paddings down so that the PinMe buttons are larger.
 * NOTE This may have to be adjusted when PinMe is not activated.
 * 
 * @param thisProps 
 * @param serverRelativeUrl 
 * @param bannerStyleChoice 
 * @returns 
 */
export function updateBannerThemeStyles ( thisProps: IMinBannerThemeProps, bannerStyleChoice: string, forceUpdate: boolean, defPinState: IPinMeState, forcedProps: IConfigurationProp[] ) {

  // DEFAULTS SECTION:  Banner   <<< ================================================================
  //This updates unlocks styles only when bannerStyleChoice === custom.  Rest are locked in the ui.


  if ( bannerStyleChoice === 'custom' ) { 
      thisProps.lockStyles = false ;

  } else { thisProps.lockStyles = true; }

  const checkForcebannerStyle = doesObjectExistInArray( forcedProps , 'prop', 'bannerStyle', true );
  //Update bannerStyle
  if ( checkForcebannerStyle === false && ( forceUpdate === true || !thisProps.bannerStyle ) ) { 
    //  https://github.com/mikezimm/drilldown7/issues/189
    if ( thisProps.bannerStyleChoice !== 'custom'  && thisProps.bannerStyleChoice !== 'lock' ) 
        thisProps.bannerStyle = createBannerStyleStr( bannerStyleChoice, 'banner') ;
  }

  const checkForcebannerCmdStyle = doesObjectExistInArray( forcedProps , 'prop', 'bannerCmdStyle', true  );
  //Update bannerCmdStyle
  if ( checkForcebannerCmdStyle === false && ( forceUpdate === true || !thisProps.bannerCmdStyle ) ) { 
    //  https://github.com/mikezimm/drilldown7/issues/189
      let bannerCmdStyle = thisProps.bannerStyleChoice === 'custom' || thisProps.bannerStyleChoice === 'lock'  ?
         thisProps.bannerCmdStyle : createBannerStyleStr( bannerStyleChoice, 'cmd');

      //Adjust the default size down compared to PinMe buttons which are primary functions in the web part
      if ( defPinState && defPinState !== 'disabled' ) {  
          // bannerCmdStyle.replace('"fontSize":20,', '"fontSize":16,') ;
          bannerCmdStyle = bannerCmdStyle.replace('"fontSize":20,', '"fontSize":16,') ;
          bannerCmdStyle = bannerCmdStyle.replace('"marginRight":"9px"', '"marginRight":"0px"') ;
          bannerCmdStyle = bannerCmdStyle.replace('"padding":"7px"', '"padding":"7px 4px"') ;

      }

      thisProps.bannerCmdStyle = bannerCmdStyle;
  }

  return thisProps;

}


export function refreshBannerStylesOnPropChange ( thisProps: IMinBannerThemeProps, propertyPath: string, newValue: string, 
  refreshPane: any, ) {

  if ( propertyPath === 'bannerStyle' || propertyPath === 'bannerCmdStyle' )  {
      thisProps[ propertyPath ] = newValue;
      refreshPane();

  }

}