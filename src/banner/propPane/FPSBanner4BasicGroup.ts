
import {
  //  IPropertyPanePage,
  //  IPropertyPaneGroup,
  //  PropertyPaneLabel,
  //  IPropertyPaneLabelProps,
  //  PropertyPaneHorizontalRule,
    PropertyPaneTextField, 
    // IPropertyPaneTextFieldProps,
    // PropertyPaneLink, IPropertyPaneLinkProps,
   PropertyPaneDropdown, IPropertyPaneDropdownProps,
    // IPropertyPaneDropdownOption,
    PropertyPaneToggle,
  //  IPropertyPaneConfiguration,
  //  PropertyPaneButton,
  //  PropertyPaneButtonType,
  //   PropertyPaneSlider, IPropertyPaneSliderProps,
    PropertyPaneHorizontalRule  } from '@microsoft/sp-property-pane';

import { bannerInfoEleChoices } from '../../common/commandStyles/defaults';
import { PageEditorAudienceChoices } from './Audiences/Interfaces';
/**
 * FPSBanner3BasicGroup builds FPS Banner Basics Prop Pane Group: showBanner, bannerTitle, infoElementChoice, infoElementText,
 * @param forceBanner
 * @param modifyBannerTitle
 * @param showBanner
 * @param infoElementText
 * @returns
 */

export function FPSBanner4BasicGroup(forceBanner: boolean, modifyBannerTitle: boolean, showBanner: boolean, infoElementText: boolean,
  feedback: boolean, enableBeAUser: boolean) {
  let fields: any[] = BannerPropPaneButtonBasics(forceBanner, modifyBannerTitle, showBanner, infoElementText, feedback, enableBeAUser);
  let bannerGroup = {
    groupName: 'FPS Banner - Basics',
    isCollapsed: true,
    groupFields: fields
  };
  return bannerGroup;
}


  /**
   * BannerPropPaneButtonBasics - Builds Basic FIELDS for Banner
   * @param forceBanner 
   * @param modifyBannerTitle 
   * @param showBanner 
   * @param infoElementText 
   * @returns 
   */
  export function BannerPropPaneButtonBasics( forceBanner: boolean, modifyBannerTitle: boolean, showBanner: boolean, 
    infoElementText: boolean, feedback: boolean, enableBeAUser: boolean ) {
  
    let fields : any[] = [];

    fields.push(
        PropertyPaneToggle('showBanner', {
            label: 'Show Banner',
            disabled: forceBanner !== false ? true : false ,
            })
      );

      fields.push(
        PropertyPaneTextField('bannerTitle', {
            label: 'Webpart Title',
            description: '',
            disabled: modifyBannerTitle !== true || showBanner !== true ? true : false,
            })
      );

    fields.push(
        PropertyPaneDropdown('infoElementChoice', <IPropertyPaneDropdownProps>{
            label: 'More Info text-button',
            options: bannerInfoEleChoices,
            disabled: showBanner !== true ? true : false,
        }) );


    fields.push(
        PropertyPaneTextField('infoElementText', {
            label: 'More Information text on right of banner',
            description: 'Keep simple to one word if possible.',
            disabled:infoElementText !== true || showBanner !== true ? true : false,
        }) );
//feedbackEmail: string;
    fields.push(
        PropertyPaneTextField('feedbackEmail', {
            label: 'Feedback email',
            description: 'Adds Feedback icon in the banner.',
            disabled:feedback !== true || showBanner !== true ? true : false,
        }) );
    
    if ( enableBeAUser === true ) { 
        fields.push(
        PropertyPaneDropdown('beAUserAudience', <IPropertyPaneDropdownProps>{
            label: 'Audience for Be A User mode',
            options: PageEditorAudienceChoices,
            disabled: showBanner !== true ? true : false,
        }) );
    }


    return fields;
    
  }
