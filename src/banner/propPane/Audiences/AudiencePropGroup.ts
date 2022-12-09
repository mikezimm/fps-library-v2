

import { PropertyPaneDropdown, IPropertyPaneDropdownProps, } from '@microsoft/sp-property-pane';

import { IAudienceGroupType, EveryoneAudienceChoices, FullControlAudienceChoices, PageEditorAudienceChoices, ItemEditorAudienceChoices, EditorAudienceChoices } from './Interfaces';
export function createAudienceGroup( propName: string, label: string, audience: IAudienceGroupType, disabled: boolean ) {

  let options = EveryoneAudienceChoices;
  if ( audience === 'Owner' ) { options = FullControlAudienceChoices; }
  else if ( audience === 'Page' ) { options = PageEditorAudienceChoices; }
  else if ( audience === 'Item' ) { options = ItemEditorAudienceChoices; }
  else if ( audience === 'Editor' ) { options = EditorAudienceChoices; }

  const thisField  =   PropertyPaneDropdown( propName, <IPropertyPaneDropdownProps>{
    label: label,
    options: options,
    disabled: disabled,
  }) ;

  return thisField;


}
