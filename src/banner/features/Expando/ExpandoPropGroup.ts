

import {

    PropertyPaneLabel,
    PropertyPaneTextField, 
    PropertyPaneDropdown, IPropertyPaneDropdownProps,
    IPropertyPaneDropdownOption,PropertyPaneToggle,
    PropertyPaneSlider
  } from '@microsoft/sp-property-pane';

import { IFPSBasicToggleSetting, } from '../../../common/interfaces/fps/IFPSBasicToggleSetting';

import { JSON_Edit_Link } from '../../propPane/ReusableLinks';

import { EveryoneAudienceChoices, IEveryoneAudience } from '../../propPane/Audiences/Interfaces' 
  /**
   * This is the second version which is more simple (toggles and sliders)
   * @param showSearch
   * @param pageStyle 
   * @param quickLaunchHide 
   * @param containerMaxWidth 
   */

   /**
    * Model for IFPSBasicToggleSetting properties
    * For if ( allSectWidth !== 'skip' ) {
    */
  export function FPSOptionsExpando( enableExpandoramic: IFPSBasicToggleSetting, expandoEnabled: boolean, expandoDefault: IFPSBasicToggleSetting, expandoAudience:  IEveryoneAudience ) {
  
      let fields: any[] = [];
      if ( enableExpandoramic !== 'skip' ) {

          fields.push(
            PropertyPaneLabel('expandoText1', {
              text: 'NOTE:  This feature MAY BE deprecated by MSFT at any time without notice.  Please contact your SharePoint team if this happens.',
            }) );

          fields.push(
            PropertyPaneToggle('enableExpandoramic', {
              label: 'Enable Expandoramic Mode',
              offText: 'Off',
              onText: 'On',
            }) );

          fields.push(
            PropertyPaneLabel('expandoText2', {
              text: 'If you expand by default, some users may still see the full page briefly depending on their connection.',
            }) );

          fields.push(
            PropertyPaneToggle('expandoDefault', {
              label: 'Page load default',
              offText: 'Normal',
              onText: 'Expanded',
              disabled: enableExpandoramic === true ? false: true,
            }) );

          fields.push(
            PropertyPaneDropdown('expandoAudience', <IPropertyPaneDropdownProps>{
              disabled: enableExpandoramic === true ? false : true ,
              label: 'Expandoramic Audience',
              options: EveryoneAudienceChoices,
            }) );

            fields.push(
            PropertyPaneTextField('expandoStyle', {
              disabled: enableExpandoramic === true ? false : true ,
              label: 'Expandoramic Styling',
              description: 'React.CSSProperties format like:  "fontSize":"larger","color":"red"',
              multiline: true,
            }), );

            fields.push(
              PropertyPaneSlider('expandoPadding', { //hidePageHeader, allSectionMaxWidthEnable, allSectionMaxWidth, allSectionMarginEnable, allSectionMargin
                  label: 'Expanded padding',
                  disabled: enableExpandoramic === true ? false : true ,
                  min: 0,
                  max: 100,
                  step: 10,
                })
            );
            fields.push(JSON_Edit_Link);

        }

        let optionsGroup = { groupName: 'FPS Banner - Expandoramic',
        isCollapsed: true ,
        groupFields: fields

      };

      return optionsGroup;
      
  }
  