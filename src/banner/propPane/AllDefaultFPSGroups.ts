import { IPropertyPaneGroup } from "@microsoft/sp-property-pane";
import { FPSEasyPagesGroup } from "../components/EasyPages/EasyPagesGroup";
import { FPSBanner3VisHelpGroup } from "../components/VisitorPanel/FPSOptionsGroupVisHelp";
import { FPSOptionsExpando } from "../features/Expando/ExpandoPropGroup";
import { FPSImportPropsGroup } from "../features/ImportExport/ImportFunctions";
import { FPSPinMePropsGroup } from "../features/PinMe/PinMePropGroup";
import { IThisFPSWebPartClass } from "../FPSWebPartClass/IThisFPSWebPartClass";
import { FPSBanner3NavGroup } from "./FPSBanner3NavGroup";
import { FPSBanner3ThemeGroup } from "./FPSBanner3ThemeGroup";
import { FPSBanner4BasicGroup } from "./FPSBanner4BasicGroup";
import { FPSOptionsGroupBasic } from "./FPSOptionsGroupBasic";

/**
 * This will auto build all allowable FPSPropPane Groups
 *  With the exception of WebPartInfoGroup which typically is created separately
 * @param thisWPClass 
 */
export function getAllDefaultFPSFeatureGroups( thisWPClass: IThisFPSWebPartClass ) {

  const groups: IPropertyPaneGroup[] = [];

  if ( this._allowPinMe === true ) groups.push( FPSPinMePropsGroup );
  if ( this._allowEasyPages ) groups.push( FPSEasyPagesGroup( thisWPClass ) );
  groups.push( FPSBanner3VisHelpGroup( thisWPClass ) );
  groups.push( FPSBanner4BasicGroup( thisWPClass ) );
  groups.push( FPSBanner3NavGroup() );
  groups.push( FPSBanner3ThemeGroup( thisWPClass ) );
  groups.push( FPSOptionsGroupBasic( thisWPClass ) );
  if ( this._allowPandoramic ) groups.push( FPSOptionsExpando( thisWPClass ) );
  groups.push( FPSImportPropsGroup );

}