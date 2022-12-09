

import {
    //  IPropertyPanePage,
     IPropertyPaneGroup,
    //  PropertyPaneLabel,
    //  IPropertyPaneLabelProps,
    //  PropertyPaneHorizontalRule,
    //   PropertyPaneTextField, IPropertyPaneTextFieldProps,
    //   PropertyPaneLink, IPropertyPaneLinkProps,
     PropertyPaneDropdown, IPropertyPaneDropdownProps,
      IPropertyPaneDropdownOption,PropertyPaneToggle,
    //  IPropertyPaneConfiguration,
    //  PropertyPaneButton,
    //  PropertyPaneButtonType,
    //   PropertyPaneSlider, IPropertyPaneSliderProps,
    // PropertyPaneHorizontalRule,
    // PropertyPaneSlider
} from '@microsoft/sp-property-pane';

// import { getHelpfullErrorV2 } from '../Logging/ErrorHandler';
// import { JSON_Edit_Link } from './zReusablePropPane';

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
