
/***
 *     .d88b.  db    db d888888b  .o88b. db   dD       .o88b.  .d88b.  .88b  d88. .88b  d88.  .d8b.  d8b   db d8888b. .d8888. 
 *    .8P  Y8. 88    88   `88'   d8P  Y8 88 ,8P'      d8P  Y8 .8P  Y8. 88'YbdP`88 88'YbdP`88 d8' `8b 888o  88 88  `8D 88'  YP 
 *    88    88 88    88    88    8P      88,8P        8P      88    88 88  88  88 88  88  88 88ooo88 88V8o 88 88   88 `8bo.   
 *    88    88 88    88    88    8b      88`8b        8b      88    88 88  88  88 88  88  88 88~~~88 88 V8o88 88   88   `Y8b. 
 *    `8P  d8' 88b  d88   .88.   Y8b  d8 88 `88.      Y8b  d8 `8b  d8' 88  88  88 88  88  88 88   88 88  V888 88  .8D db   8D 
 *     `Y88'Y8 ~Y8888P' Y888888P  `Y88P' YP   YD       `Y88P'  `Y88P'  YP  YP  YP YP  YP  YP YP   YP VP   V8P Y8888D' `8888Y' 
 *             
 *             

import { QuickCommandsTMT, IQuickCommands, IQuickButton, } 
    from '@mikezimm/npmfunctions/dist/QuickCommands/IQuickCommands';

 */


import { IFieldDef } from '../../../pnpjs/Fields/Interfaces';

// NOTE:  GET THIS FROM '@mikezimm/npmfunctions/dist/QuickCommands/IQuickCommands'; in 2.1.89
export const CommandItemNotUpdatedMessage: string = `Sorry, There was nothing to update :(`;
export const CommandUpdateFailedMessage: string = `Update Failed :(`;
export const CommandEnterCommentString: string = 'Enter comment';
export const CommandCancelRequired: string = 'Did NOT leave required comment, Cancelling update';
export const CommandEmptyCommentMessage: string = 'I have nothing new to add at this time';
export const CommandCaptchaTestFailed : string = 'Failed Captcha test.  Not saving';
export const CommandCaptchaRequiredFailed : string = 'Failed Captcha test - item missing comparison.  Not saving';

export interface IQuickCommands {
  // [key: string]: string | IQuickButton[][] | boolean | number | any | undefined;
  buttons: IQuickButton[][];
  fields: IQuickField[][];
  onUpdateAlsoCallback?: boolean; // If there is an update on button, then do callback
  callBack?: any;
  listWebUrl?: string;
  listName?: string;

  //Added from ActionNews
  onUpdateReload?: boolean; // If there is an update on button, then do callback... reload webpart data
  successBanner?: number; //Show message banner on successful update for x Seconds.  0 to not show, default if empty = 3.5
  refreshCallback?: any; //Internal callback function.... Do not put anything in this property in property pane
  styleRow?: any; //Valid react JSON object for style
  showWhenEvalTrue?: string;  //This is on all commands or individual buttons.  if eval resolves to true, button or commands are visible, else they are false.
  quickCommandsRequireUser?: boolean;  // Added to check for user in eval and not fetch info if not needed
}
  
//2021-01-11:  Updated from actionNews version
export interface IQuickButton {
  // [key: string]: string | boolean | string[] | any | undefined;

  str0?: string;  //Generally used for choice command filters and equals prior choice value
  strPrev?: string;  //Generally used for choice command filters and equals prior choice value
  str1?: string;
  strNext?: string;  //Generally used for choice command filters and equals the next choice value
  str2?: string;  //Generally used for choice command filters and equals the next choice value
  str3?: string;

  label: string;
  primary: boolean; //  Primary, Default
  secondary?: string;
  alert?: string;  //  Popup Alert after save.
  confirm?: string; //  Message to ask confirmation
  disabled?: boolean;
  console?: string; //  Command Message on save or error
  icon?: string;
  checked?: boolean;
  panelMessage?: string; //Message to put below buttons in panel
  updateItem: any; //  Should be object of item to update   example: { DueDate: 'setToToday', CompletedBy: 'setToMe' } 
                  // People column commands:  'setToMe', 'setToClear', 'setToUserID'
                  // Date column commands:  'setToToday', 'setOffsetDays+10', 'setOffsetDays-10', 'setToClear'
                  // 'insertField<StaticFieldName>, insertMyName, insertToday, appendToField
  groupID?: string; //Restrict button to this group of users (ID Number of Group)
  styleButton?: string;
  styleIcon?: string;

  successReload?: boolean; //Setting to true will automatically reload the data from the list to show all updated data.
  theseRefiners?: string[]; //Only show button on specific refiners... like "Status"... if you don't have Status on the view it may lead to errors if you can "Park" a project that may already be "Parked"
  showWhenEvalTrue?: string;  //This is on all commands or individual buttons.  if eval resolves to true, button or commands are visible, else they are false.
  
}

// export interface IQuickField extends Partial<IFieldDef> {
export interface IQuickField extends Partial<IFieldDef> {
    // [key: string]: string | boolean | number | string[] | undefined;
  // name: string;
  // title: string;
  // column: string;
  // type: string; //Smart, Text, Number, Divider, span, h3, h2, h1, p, link, image ...

  required: boolean;
  disabled?: boolean;
  hidden?: boolean;
  blinkOnProject?: boolean;
  choices?: string[];

  value?: any;
  default?: any;
  width?: number; //Added for Drilldown7 webpart
  styles?: any;

}
