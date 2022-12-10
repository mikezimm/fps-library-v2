
import type { WebPartContextCopy_15_2 } from '../../common/interfaces/@msft/1.15.2/WebPartContext';

 // For SPPermission:  let addAndCustomizePages = pageContext.web.permissions.hasPermission( SPPermission.addAndCustomizePages );
//  import { SPPermission,  } from '@microsoft/sp-page-context';

import { IUser, IFPSUser, ISimplePermission } from './IUserInterfaces';
import { checkDeepProperty } from '../Objects/deep';

/**
 * Sets thisWindow.FPSUser = FPSUser; and then returns FPSUser
 * @param context 
 * @param trickyEmails 
 * @param trickyApp 
 * @returns 
 * 
 *  * 2022-11-30:  in npmFunctions was context: WebPartContext,
 */

// export function getFPSUser ( context: any, trickyEmails: string[], trickyApp: string ): IFPSUser {

// 2022-11-30:  in npmFunctions was context: WebPartContext, added SPPermission as input because I am not bringing in the context
// import { SPPermission,  } from '@microsoft/sp-page-context';
export function getFPSUser ( context: WebPartContextCopy_15_2, trickyEmails: string[], trickyApp: string, SPPermission: any ): IFPSUser {

    const { user, web }  = context.pageContext;
    let startTime = new Date();
    const thisWindow : any = window;
    let currentCultureName = checkDeepProperty(context.pageContext, ['cultureInfo','currentCultureName'], 'ShortError');
    let isSiteAdmin = checkDeepProperty(context.pageContext, ['legacyPageContext','isSiteAdmin'], 'ShortError');

    if ( isSiteAdmin !== true && isSiteAdmin !== false ) { isSiteAdmin = false; }

    let showTricks: any = false;
    trickyEmails.map( getsTricks => {
      if ( user.loginName && user.loginName.toLowerCase().indexOf( getsTricks ) > -1 ) { 
        showTricks = true ;
      }
      } );

    if ( thisWindow.FPSUser ){

      if ( showTricks === true && thisWindow.FPSUser.trickyApps.indexOf( trickyApp ) < 0 ) {
        thisWindow.FPSUser.trickyApps.push( trickyApp );
      }

      return thisWindow.FPSUser;

    } else {
      const userAny: any  = user; //Cast as any where needed... unsure where I got some of these props not on SPUser...
      const userId: number = typeof context.pageContext.legacyPageContext.userId === 'number' ? context.pageContext.legacyPageContext.userId : parseInt(context.pageContext.legacyPageContext.userId);
      const userTitle : string= user.displayName ? user.displayName : userAny.title ? userAny.title : userAny.Title ? userAny.Title : 'Unknown User';

      const FPSUser: IFPSUser = {
          title: userTitle,
          Title: userTitle,
          email: user.email,
          name: userAny.Name ? userAny.Name : userAny.LoginName ? userAny.LoginName : user.loginName,
          id: userId.toString(),
          ID: userId ,
          Id: userId,
          currentCultureName: currentCultureName,
          imageUrl: userAny.imageUrl,
          trickyApps: showTricks === true ? [ trickyApp ] : [],
          PrincipalType: userAny.PrincipalType? userAny.PrincipalType : null,
          isSiteAdmin: isSiteAdmin,
          isGuest: user.isExternalGuestUser,
          manageWeb: web.permissions.hasPermission( SPPermission.manageWeb ),
          managePermissions: web.permissions.hasPermission( SPPermission.managePermissions ),
          enumeratePermissions: web.permissions.hasPermission( SPPermission.enumeratePermissions ),
          addAndCustomizePages: web.permissions.hasPermission( SPPermission.addAndCustomizePages ), // aka design
          manageLists: web.permissions.hasPermission( SPPermission.manageLists ),// aka edit
          approveItems: web.permissions.hasPermission( SPPermission.approveItems ),
          editListItems: web.permissions.hasPermission( SPPermission.editListItems ), // aka contribute
          openItems: web.permissions.hasPermission( SPPermission.openItems ), // aka read
          simple: 'None',
          crunchTime: -1,

        };

        //'SharePoint' | 'Admin' | 'FullControl' | 'Designer' | 'Editor' | 'Approver' | 'Contributor' | 'Reader' | 'None';
        let simple: ISimplePermission = 'None';
        if ( showTricks === true ) { simple = 'SharePoint' ; }
        else if ( FPSUser.isSiteAdmin === true ) { simple = 'Admin' ; }
        else if ( FPSUser.manageWeb === true ) { simple = 'FullControl' ; }
        else if ( FPSUser.addAndCustomizePages === true ) { simple = 'Designer' ; }
        else if ( FPSUser.manageLists === true ) { simple = 'Editor' ; }
        else if ( FPSUser.approveItems === true ) { simple = 'Approver' ; }
        else if ( FPSUser.editListItems === true ) { simple = 'Contributor' ; }
        else if ( FPSUser.openItems === true ) { simple = 'Reader' ; }
        else { simple = 'None' ; }

        FPSUser.simple = simple;

        let endTime = new Date();
        let totalTime = endTime.getTime() - startTime.getTime();
        FPSUser.crunchTime = totalTime;
        console.log('PermissionCheck Time:', totalTime );

        thisWindow.FPSUser = FPSUser;

        return FPSUser;

    }
}
