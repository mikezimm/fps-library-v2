
import {
  IPropertyPaneGroup,
  PropertyPaneTextField, 
  PropertyPaneDropdown, IPropertyPaneDropdownProps,
  PropertyPaneToggle,
  IPropertyPaneField,
} from '@microsoft/sp-property-pane';

import { IFPSAgeSliderWPProps, FPSAgeSliderOptions } from './FPSAgeTypes';

export function buildAgeSliderGroup( wpProps: IFPSAgeSliderWPProps ) {

  var groupFields: IPropertyPaneField<any>[] = [];

  groupFields.push(PropertyPaneToggle('FPSAgeIsVisible', {
    label: 'Enanble Age Slider filter',
    offText: 'Off',
    onText: 'On',
  }));

  groupFields.push(
    PropertyPaneDropdown('FPSAgeDefault', <IPropertyPaneDropdownProps>{
      label: 'Default Age Filter',
      options: FPSAgeSliderOptions,
      selectedKey: wpProps.FPSAgeDefault,
    }));

  groupFields.push(
    PropertyPaneTextField('FPSAgeColumnName', {
        label: 'Date Column Internal Name',
        // description: 'Please click filters (above) to see items :)',
        disabled: wpProps.FPSAgeIsVisible === false ? true : false,
        // multiline: true,
    }));

  groupFields.push(
    PropertyPaneTextField('FPSAgeColumnTitle', {
        label: 'Date Column Title - If different',
        // description: 'Please click filters (above) to see items :)',
        disabled: wpProps.FPSAgeIsVisible === false ? true : false,
        // multiline: true,
    }));

  const ExportThisGroup: IPropertyPaneGroup = {
    groupName: `Age Slider Filter`,
    isCollapsed: true,
    groupFields: groupFields
  };

  return ExportThisGroup;

}