import { IPropertyFieldGroupOrPerson } from "../../../common/interfaces/openSource/spfxPropControls/@3.11.0/IPropertyFieldGroupOrPerson";

// ####################################################### #######################################################
// ####################################################### #######################################################

import { IEveryoneAudience } from "../../propPane/Audiences/Interfaces";

/***
 *    d888888b d8b   db d888888b d88888b d8888b. d88888b  .d8b.   .o88b. d88888b 
 *      `88'   888o  88 `~~88~~' 88'     88  `8D 88'     d8' `8b d8P  Y8 88'     
 *       88    88V8o 88    88    88ooooo 88oobY' 88ooo   88ooo88 8P      88ooooo 
 *       88    88 V8o88    88    88~~~~~ 88`8b   88~~~   88~~~88 8b      88~~~~~ 
 *      .88.   88  V888    88    88.     88 `88. 88      88   88 Y8b  d8 88.     
 *    Y888888P VP   V8P    YP    Y88888P 88   YD YP      YP   YP  `Y88P' Y88888P 
 *                                                                               
 *                                                                               
 */

export interface IMinWPVisitorPanelInfo {
  // [key: string]: string | IPropertyFieldGroupOrPerson[] ;
    bannerTitle: string;

    panelMessageDescription1: string; //
    panelMessageSupport: string;
    panelMessageDocumentation: string;
    panelMessageIfYouStill: string;

    documentationLinkDesc: string;
    documentationLinkUrl: string;

    supportContacts: IPropertyFieldGroupOrPerson[];

}

export interface IMinCustomHelpProps extends IMinWPVisitorPanelInfo {
  // [key: string]: string | boolean | IPropertyFieldGroupOrPerson[] | any | undefined ;
  showCustomHelp: boolean;
  fullPanelAudience : IEveryoneAudience;

  replacePanelHTML : any;  //This is the jsx sent to panel for User controled information (aka what reader will see when clicking 'info' button)

  requireDocumentation: boolean;  //Should be adjusted using PreConfiguredPresets if needed on WP or site basis

  documentationIsValid: boolean;
  requireContacts: boolean; //This is used to throw an error if it is required but there are no contacts.

}

export const changeCustomHelp : string[] = [ 'panelMessageDescription1', 'panelMessageSupport', 'panelMessageDocumentation', 'panelMessageIfYouStill',
    'documentationLinkDesc', 'documentationLinkUrl', 'documentationIsValid', 'supportContacts', 'requireDocumentation', 'requireContacts' ];
