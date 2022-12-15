import {
    PropertyPaneDropdown, IPropertyPaneDropdownProps,
    PropertyPaneToggle,
  } from '@microsoft/sp-property-pane';

import { EveryoneAudienceChoices } from './Audiences/Interfaces';

/**
 * BannerPropNavButtonFields - Builds Fields for FPS Banner Nav Group
 */
export const BannerPropNavButtonFields : any[] = [

  PropertyPaneToggle('showGoToHome', {
      label: 'Show Go to Home Page Icon',
  }),

  PropertyPaneToggle('showGoToParent', {
      label: 'Show Got to Parent Site Icon',
  }),

  PropertyPaneDropdown('homeParentGearAudience', <IPropertyPaneDropdownProps>{
      label: 'Gear, Home, Parent audience',
      options: EveryoneAudienceChoices,
  }),

];

/**
 * FPSBanner3NavGroup - Builds Prop Pane group for Nav Buttons:  showGoToHome, showGoToParent, homeParentGearAudience
 * @returns
 */

export function FPSBanner3NavGroup() {
  let fields: any[] = BannerPropNavButtonFields;
  let bannerGroup = {
    groupName: 'FPS Banner - Navigation',
    isCollapsed: true,
    groupFields: fields
  };
  return bannerGroup;
}
