import { IPropertyPaneGroup } from "@microsoft/sp-property-pane";
import { FPSFieldsPanelPropGroup } from "../../components/molecules/FieldPanel/PPCPropGroup";
import { FPSEasyPagesGroup } from "../components/EasyPages/EasyPagesGroup";
import { FPSBanner3VisHelpGroup } from "../components/VisitorPanel/FPSOptionsGroupVisHelp";
import { FPSOptionsExpando } from "../features/Expando/ExpandoPropGroup";
import { FPSImportPropsGroup } from "../features/ImportExport/ImportFunctions";
import { FPSPinMePropsGroupX } from "../features/PinMe/PinMePropGroup";
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
export function getAllDefaultFPSFeatureGroups( thisWPClass: IThisFPSWebPartClass ): IPropertyPaneGroup[] {

  const groups: IPropertyPaneGroup[] = [];

  if ( thisWPClass._allowPinMe === true ) groups.push( FPSPinMePropsGroupX( thisWPClass ) );
  if ( thisWPClass._allowEasyPages ) groups.push( FPSEasyPagesGroup( thisWPClass ) );
  if ( thisWPClass._allowFieldPanel === 'Manual' ) groups.push( FPSFieldsPanelPropGroup( thisWPClass ) );
  groups.push( FPSBanner3VisHelpGroup( thisWPClass ) );
  groups.push( FPSBanner4BasicGroup( thisWPClass ) );
  groups.push( FPSBanner3NavGroup() );
  groups.push( FPSBanner3ThemeGroup( thisWPClass ) );
  if ( thisWPClass._isSPA !== true ) groups.push( FPSOptionsGroupBasic( thisWPClass ) );
  if ( thisWPClass._allowPandoramic ) groups.push( FPSOptionsExpando( thisWPClass ) );
  groups.push( FPSImportPropsGroup );
  
  return groups;
  
}