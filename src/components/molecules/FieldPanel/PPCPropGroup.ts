import {
  IPropertyPaneGroup,
  PropertyPaneTextField, 
  IPropertyPaneField,
  PropertyPaneLabel,
} from '@microsoft/sp-property-pane';

import { IThisFPSWebPartClass } from '../../../banner/FPSWebPartClass/IThisFPSWebPartClass';

export function FPSFieldsPanelPropGroup(  thisWPClass: IThisFPSWebPartClass  ) : IPropertyPaneGroup {

const groupFields: IPropertyPaneField<any>[] = [];

if ( thisWPClass._allowFieldPanel === 'Disabled' ) {
  groupFields.push(
    PropertyPaneLabel('nothing', {
      text: `This set of options should not be available in the prop pane: ${thisWPClass._allowFieldPanel}`
    }));

} else {

  groupFields.push(
    PropertyPaneTextField('webUrl', {
      label: 'webUrl',
      description: 'Leave blank for current site',
  }));

  groupFields.push(
    PropertyPaneTextField('listTitle', {
      label: 'listTitle',
      description: 'Full Title of list or library',
  }));

}

const ExportThisGroup: IPropertyPaneGroup = {
  groupName: `List Columns builder`,
  isCollapsed: true,
  groupFields: groupFields
};

return ExportThisGroup;

}
