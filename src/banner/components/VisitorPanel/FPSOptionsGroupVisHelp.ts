

import {

  PropertyPaneTextField, IPropertyPaneTextFieldProps,
  IPropertyPaneDropdownOption,PropertyPaneToggle,
  PropertyPaneDropdown, IPropertyPaneDropdownProps,

} from '@microsoft/sp-property-pane';

import { PropertyFieldPeoplePicker, PrincipalType } from '@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker';

// import { IMinWPBannerProps } from '../HelpPanelOnNPM/onNpm/BannerInterface';
import { EveryoneAudienceChoices } from '../../propPane/Audiences/Interfaces';
import { IMinCustomHelpProps, } from './Interfaces';

    /**
     * FPSBanner3VisHelpGroup - Builds FPS Banner Visitor Help Group:
     * fullPanelAudience, panelMessageDescription1, panelMessageSupport,
     * panelMessageDocumentation, documentationLinkUrl, documentationLinkDesc,
     * panelMessageIfYouStill, supportContacts
     * 
  */
    export function FPSBanner3VisHelpGroup( wpContext: any, onPropertyPaneFieldChanged: any, wpProperties: any ) {
    let fields: any[] = BannerPropVisHelp( wpContext, onPropertyPaneFieldChanged, wpProperties );
    let bannerGroup = { groupName: 'Visitor Help Info (required)',
        isCollapsed: true ,
        groupFields: fields
    };
    return bannerGroup;
  }
  
    /**
     * Generates prop pane FIELDS for:  bannerStyleChoice, bannerStyle, bannerCmdStyle, bannerHoverEffect
     */
     export function BannerPropVisHelp( wpContext: any, onPropertyPaneFieldChanged: any, wpProperties: IMinCustomHelpProps ) {
  
      let fields : any[] = [];
      let disabled: boolean =  wpProperties.showCustomHelp === false ? true : false;

      fields.push( PropertyPaneToggle('showCustomHelp', {
        label: 'Enable custom help panel', offText: 'Disable', onText: 'Enable',  
        }) );

      fields.push( PropertyPaneDropdown('fullPanelAudience', <IPropertyPaneDropdownProps>{
          label: 'Full Help Panel Audience',
          options: EveryoneAudienceChoices,
          disabled:disabled,
      }) );
  
      fields.push( PropertyPaneTextField('panelMessageDescription1',{
          label: 'Panel Description',
          description: 'Optional message displayed at the top of the panel for the end user to see.',
          disabled:disabled,
      }) );
  
      fields.push( PropertyPaneTextField('panelMessageSupport',{
          label: 'Support Message',
          description: 'Optional message to the user when looking for support',
          disabled:disabled,
      }) );
  
      fields.push( PropertyPaneTextField('panelMessageDocumentation',{
          label: 'Documentation message',
          description: 'Optional message to the user shown directly above the Documentation link',
          disabled:disabled,
      }) );
  
      fields.push( PropertyPaneTextField('documentationLinkUrl',{
          label: 'PASTE a Documentation Link',
          description: 'REQUIRED:  A valid link to documentation - DO NOT TYPE in or webpart will lage',
          disabled:disabled,
      }) );
  
      fields.push( PropertyPaneTextField('documentationLinkDesc',{
          label: 'Documentation Description',
          description: 'Optional:  Text user sees as the clickable documentation link',
          disabled:disabled,
      }) );
  
      fields.push( PropertyPaneTextField('panelMessageIfYouStill',{
          label: 'If you still have... message',
          description: 'If you have more than one contact, explain who to call for what',
          disabled:disabled,
      }) );
  
      fields.push( PropertyFieldPeoplePicker('supportContacts', {
          label: 'Support Contacts',
          initialData: wpProperties.supportContacts,
          allowDuplicate: false,
          principalType: [ PrincipalType.Users, ],
          onPropertyChange: onPropertyPaneFieldChanged,
          //Had to cast  to get it to work
          //https://github.com/pnp/sp-dev-fx-controls-react/issues/851#issuecomment-978990638
          context: wpContext as any,
          properties: wpProperties,
          onGetErrorMessage: undefined, // 2022-12-12:  Changed from null to undefined to resolve linting error
          deferredValidationTime: 0,
          key: 'peopleFieldId',
          disabled:disabled,
      }) );

      return fields;

}