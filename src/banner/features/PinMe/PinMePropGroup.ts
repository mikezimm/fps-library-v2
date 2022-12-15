

import {
     IPropertyPaneGroup,
     PropertyPaneDropdown, IPropertyPaneDropdownProps,
      IPropertyPaneDropdownOption,PropertyPaneToggle,

} from '@microsoft/sp-property-pane';

export const PinMeLocations = [
    { index: 0, key: 'normal', text: "normal" },
    { index: 1, key: 'pinFull', text: "Pin Expanded" },
    { index: 2, key: 'pinMini', text: "Pin Collapsed" },
    { index: 0, key: 'disabled', text: "disabled" },
  ];

export const FPSPinMePropsGroup : IPropertyPaneGroup = {
groupName: "Pin Me",
groupFields: [
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
]};
