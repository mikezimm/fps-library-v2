
import { EasyIconDefaultKeys } from "../../components/atoms/EasyIcons/eiTypes";
import { validateDocumentationUrl } from "../../components/atoms/Links/ValidateLinks";
import { DefaultEasyPagesTabs, DefaultOverflowTab } from "../components/EasyPages/epTypes";
import { updateFpsImportProps } from "../features/ImportExport/ImportFunctions";
import { refreshBannerStylesOnPropChange, updateBannerThemeStyles } from "../features/PageStyle/bannerThemes";
import { updateWebpartHistoryV2 } from "../features/WebPartHistory/Functions";
import { IThisFPSWebPartClass } from "./IThisFPSWebPartClass";

export async function onFPSPropPaneCHanged(  thisWPClass: IThisFPSWebPartClass, propertyPath: string, oldValue: any, newValue: any ) : Promise<void> {

  try {
    await validateDocumentationUrl ( thisWPClass.properties, propertyPath , newValue );

  } catch(e) {
    alert('unable to validateDocumentationUrl' );
  }

  thisWPClass.properties.webpartHistory = updateWebpartHistoryV2( thisWPClass.properties.webpartHistory , propertyPath , newValue, thisWPClass.context.pageContext.user.displayName, [], [] );

  if ( propertyPath === 'fpsImportProps' ) {

    thisWPClass._importErrorMessage = updateFpsImportProps( thisWPClass.properties, thisWPClass._importBlockPropsWP, propertyPath, newValue,
      thisWPClass.context.propertyPane.refresh,
      thisWPClass.onPropertyPaneConfigurationStart,
      thisWPClass._exitPropPaneChanged,
    );

  } else if ( propertyPath === 'easyIconKeys' && !newValue )  {
    //https://github.com/mikezimm/Pnpjs-v2-Upgrade-sample/issues/59
    this.properties.easyIconKeys = EasyIconDefaultKeys.join(' ; ');

  } else if ( propertyPath === 'EasyPageTabsC' && !newValue )  {
    //https://github.com/mikezimm/Pnpjs-v2-Upgrade-sample/issues/59
    this.properties.EasyPageTabsC = DefaultEasyPagesTabs.join(' ; ');

  } else if ( propertyPath === 'EasyPageTabsP' && !newValue )  {
    //https://github.com/mikezimm/Pnpjs-v2-Upgrade-sample/issues/59
    this.properties.EasyPageTabsP = DefaultEasyPagesTabs.join(' ; ');

  } else if ( propertyPath === 'EasyPageTabsA' && !newValue )  {
    //https://github.com/mikezimm/Pnpjs-v2-Upgrade-sample/issues/59
    this.properties.EasyPageTabsA = DefaultEasyPagesTabs.join(' ; ');

  } else if ( propertyPath === 'EasyPageTabsB' && !newValue )  {
    //https://github.com/mikezimm/Pnpjs-v2-Upgrade-sample/issues/59
    this.properties.EasyPageTabsB = DefaultEasyPagesTabs.join(' ; ');

  } else if ( propertyPath === 'EasyPageOverflowTab' && !newValue )  {
    this.properties.EasyPageOverflowTab = DefaultOverflowTab;

   } else if ( propertyPath === 'bannerStyle' || propertyPath === 'bannerCmdStyle' )  {

    refreshBannerStylesOnPropChange( thisWPClass.properties, propertyPath, newValue, thisWPClass.context.propertyPane.refresh );

  } else if (propertyPath === 'bannerStyleChoice')  {
    // bannerThemes, bannerThemeKeys, makeCSSPropPaneString

    updateBannerThemeStyles( thisWPClass.properties , newValue, true, thisWPClass.properties.defPinState, thisWPClass._sitePresets.forces );

    if ( newValue === 'custom' || newValue === 'lock' ) {
      //Do nothing for these cases.
      
    } else {
      //Reset main web part styles to defaults

    }

  }

  console.log('onFPSPropPaneCHanged applied these changes = Path, old, new: ' , propertyPath, oldValue, newValue );

}