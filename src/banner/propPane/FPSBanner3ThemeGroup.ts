
import {
    PropertyPaneTextField, 
    PropertyPaneDropdown, IPropertyPaneDropdownProps,
    PropertyPaneToggle,
  } from '@microsoft/sp-property-pane';

import { bannerThemeChoices, bannerThemeChoicesWSiteTheme } from '../../common/commandStyles/defaults';

/**
 * FPSBanner3ThemeGroup - Builds FPS Banner Theme Group:  bannerStyleChoice, bannerStyle, bannerCmdStyle, bannerHoverEffect
 * @param modifyBannerStyle
 * @param showBanner
 * @param lockStyles
 * @returns
 */

export function FPSBanner3ThemeGroup(modifyBannerStyle: boolean, showBanner: boolean, lockStyles: boolean, includeSiteTheme: boolean) {
  let fields: any[] = BannerPropButtonThemes(modifyBannerStyle, showBanner, lockStyles, includeSiteTheme);
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
  export function BannerPropButtonThemes( modifyBannerStyle: boolean, showBanner: boolean, lockStyles: boolean, includeSiteTheme: boolean ){

    let fields : any[] = [];


    fields.push(
        PropertyPaneDropdown('bannerStyleChoice', <IPropertyPaneDropdownProps>{
            label: 'Banner Theme',
            options: includeSiteTheme === true ? bannerThemeChoicesWSiteTheme : bannerThemeChoices,
            disabled: modifyBannerStyle !== true || showBanner !== true ? true : false,
        }) );

    // if ( lockStyles !== true ) {
    fields.push(
        PropertyPaneTextField('bannerStyle', {
            label: 'Style options',
            description: 'React.CSSProperties format like:  "fontSize":"larger","color":"red"',
            disabled: modifyBannerStyle !== true || showBanner !== true || lockStyles === true ? true : false,
            multiline: true,
        }) );
    // }

    // if ( lockStyles !== true ) {
    fields.push(
        PropertyPaneTextField('bannerCmdStyle', {
            label: 'Button Style options',
            description: 'React.CSSProperties format like:  "fontSize":"larger","color":"red"',
            disabled: modifyBannerStyle !== true || showBanner !== true || lockStyles === true ? true : false,
            multiline: true,
            }) );
    // }

    fields.push(
        PropertyPaneToggle('bannerHoverEffect', {
            label: 'Banner Hover Effect',
            disabled: modifyBannerStyle !== true || showBanner !== true ? true : false ,
            }) );

    return fields;

  }
