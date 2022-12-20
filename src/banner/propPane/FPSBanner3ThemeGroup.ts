
import {
    PropertyPaneTextField, 
    PropertyPaneDropdown, IPropertyPaneDropdownProps,
    PropertyPaneToggle,
  } from '@microsoft/sp-property-pane';

import { bannerThemeChoices } from '../../common/commandStyles/defaults';
import { bannerThemeChoicesWSiteTheme } from "../../common/commandStyles/ISiteThemeChoices";
import { IThisFPSWebPartClass } from '../FPSWebPartClass/IThisFPSWebPartClass';

/**
 * FPSBanner3ThemeGroup - Builds FPS Banner Theme Group:  bannerStyleChoice, bannerStyle, bannerCmdStyle, bannerHoverEffect
 * @param modifyBannerStyle
 * @param showBanner
 * @param lockStyles
 * @returns
 */

// export function FPSBanner3ThemeGroup(modifyBannerStyle: boolean, showBanner: boolean, lockStyles: boolean, includeSiteTheme: boolean) {
export function FPSBanner3ThemeGroup( thisWPClass: IThisFPSWebPartClass ) {
  let fields: any[] = BannerPropButtonThemes( thisWPClass );
  let bannerGroup = {
    groupName: 'FPS Banner - Theme',
    isCollapsed: true,
    groupFields: fields
  };
  return bannerGroup;
}


  /**
   * Generates prop pane FIELDS for:  bannerStyleChoice, bannerStyle, bannerCmdStyle, bannerHoverEffect
   * @param modifyBannerStyle 
   * @param showBanner 
   * @param lockStyles 
   * @returns 
   */
  // export function BannerPropButtonThemes( modifyBannerStyle: boolean, showBanner: boolean, lockStyles: boolean, includeSiteTheme: boolean ){
  export function BannerPropButtonThemes( thisWPClass: IThisFPSWebPartClass ){

    let fields : any[] = [];
    const { showBanner, lockStyles,  } = thisWPClass.properties;

    fields.push(
        PropertyPaneDropdown('bannerStyleChoice', <IPropertyPaneDropdownProps>{
            label: 'Banner Theme',
            options: thisWPClass._allowSiteThemeChoice === true ? bannerThemeChoicesWSiteTheme : bannerThemeChoices,
            disabled: thisWPClass._modifyBannerStyle !== true || showBanner !== true ? true : false,
        }) );

    // if ( lockStyles !== true ) {
    fields.push(
        PropertyPaneTextField('bannerStyle', {
            label: 'Style options',
            description: 'React.CSSProperties format like:  "fontSize":"larger","color":"red"',
            disabled: thisWPClass._modifyBannerStyle !== true || showBanner !== true || lockStyles === true ? true : false,
            multiline: true,
        }) );
    // }

    // if ( lockStyles !== true ) {
    fields.push(
        PropertyPaneTextField('bannerCmdStyle', {
            label: 'Button Style options',
            description: 'React.CSSProperties format like:  "fontSize":"larger","color":"red"',
            disabled: thisWPClass._modifyBannerStyle !== true || showBanner !== true || lockStyles === true ? true : false,
            multiline: true,
            }) );
    // }

    fields.push(
        PropertyPaneToggle('bannerHoverEffect', {
            label: 'Banner Hover Effect',
            disabled: thisWPClass._modifyBannerStyle !== true || showBanner !== true ? true : false ,
            }) );

    return fields;

  }
