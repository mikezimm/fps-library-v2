

import {
     IPropertyPaneGroup,
     PropertyPaneDropdown, IPropertyPaneDropdownProps,
      IPropertyPaneDropdownOption,PropertyPaneToggle, PropertyPaneLabel,

} from '@microsoft/sp-property-pane';
import { IThisFPSWebPartClass } from '../../FPSWebPartClass/IThisFPSWebPartClass';

export const PinMeLocations = [
    { index: 0, key: 'normal', text: "normal" },
    { index: 1, key: 'pinFull', text: "Pin Expanded" },
    { index: 2, key: 'pinMini', text: "Pin Collapsed" },
    { index: 0, key: 'disabled', text: "disabled" },
  ];

export function FPSPinMePropsGroupX( thisWPClass: IThisFPSWebPartClass ) : IPropertyPaneGroup {

  let fields: any[] = [];

  // Added this check for https://github.com/mikezimm/fps-library-v2/issues/7
  if ( thisWPClass._isSPA === true ) {
    fields.push(
      PropertyPaneLabel('nothing', {
        text: 'This set of options is NOT available in SPA Format'
      }));

  } else {
    fields = [
      PropertyPaneDropdown('defPinState', <IPropertyPaneDropdownProps>{
      label: 'Default Location - "Pin Expanded" updates after save',
      options: PinMeLocations, //MinHeadingOptions
      }),
      //
      PropertyPaneToggle("forcePinState", {
      label: "Force Pin State",
      onText: "Enforce - No toggle",
      offText: "Let user change",
      // disabled: true,
      }),
    ]
  }

  // fix https://github.com/mikezimm/drilldown7/issues/304
  const collapseGroup: boolean = thisWPClass._repoLink.desc && thisWPClass._repoLink.desc.toLowerCase().indexOf( 'pageinfo' ) > -1 ? false : true ;
  const returnGroup = {
    groupName: "Pin Me",
    groupFields: fields ,
    isCollapsed: collapseGroup ,
  }

  return returnGroup;

}