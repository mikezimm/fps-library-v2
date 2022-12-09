/**
 * The purpose of this file is to check permissions in standard way
 */


 // For SPPermission:  let addAndCustomizePages = pageContext.web.permissions.hasPermission( SPPermission.addAndCustomizePages );
//  import { SPPermission,  } from '@microsoft/sp-page-context';

import { IUser, IFPSUser, ISimplePermission } from './IUserInterfaces';

 /***
  *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      d8b   db d8888b. .88b  d88.      d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db .d8888. 
  *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      888o  88 88  `8D 88'YbdP`88      88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
  *       88    88  88  88 88oodD' 88    88 88oobY'    88         88V8o 88 88oodD' 88  88  88      88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 `8bo.   
  *       88    88  88  88 88~~~   88    88 88`8b      88         88 V8o88 88~~~   88  88  88      88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88   `Y8b. 
  *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         88  V888 88      88  88  88      88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 db   8D 
  *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         VP   V8P 88      YP  YP  YP      YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
  *                                                                                                                                                                              
  *                                                                                                                                                                              
  */
 
import { IEveryoneAudience } from  '../../common/interfaces/AudienceInterfaces';
 
/**
 * 
 * @param FPSUser 
 * @param showTricks 
 * @param audience 
 * @param lastChancePermission :  
 * @param beAReader //2022-04-07:  Added to allow a site admin to 'act like a reader' to test functionality 
 *                 Be sure to pass in beAReader as false to if the feature you want to show should be visible such as the BeAReader button :)
 * 
 * 
 * 2022-11-30:  in npmFunctions was lastChancePermission: SPPermission | null,
 */
export function verifyAudienceVsUser ( FPSUser: IFPSUser, showTricks: boolean, audience: IEveryoneAudience, lastChancePermission: any | null, beAReader: boolean ) {

  let result = false;

  if ( audience === 'Everyone' ) {
    result = true;

  } else if ( showTricks === true && beAReader !== true ) {
    result = true;

  } else if ( FPSUser.isSiteAdmin === true && beAReader !== true ) {
    result = true;

  } else if ( beAReader !== true && ( audience === 'Site Owners'  || audience === 'Page Editors' ) && FPSUser.manageWeb === true ) {
    result = true;

  } else if ( beAReader !== true && audience === 'Page Editors' && FPSUser.addAndCustomizePages  === true ) {
    result = true;

  } else if ( beAReader !== true && audience === 'Item Editors' && FPSUser.editListItems === true ) {
      result = true;

  } else if ( lastChancePermission ) {
    let FPSUserAny: any = FPSUser;
    let hasLast: boolean = FPSUserAny[lastChancePermission as any];
    result = hasLast === true ? true : false ;

}

  return result;

}
