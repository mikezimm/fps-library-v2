
import { validateDocumentationUrl } from "../../components/atoms/Links/ValidateLinks";
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

    thisWPClass._importErrorMessage = updateFpsImportProps( thisWPClass.properties, thisWPClass._importBlockProps, propertyPath, newValue,
      thisWPClass.context.propertyPane.refresh,
      thisWPClass.onPropertyPaneConfigurationStart,
      thisWPClass._exitPropPaneChanged,
    );

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