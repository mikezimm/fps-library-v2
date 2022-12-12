/**
 * The purpose of this file is to build the FPS Banner props in a standard way.
 * To benefit from typescript, it's meant to be copied to the specific webpart using it
 */

import { WebPartContextCopy_15_2, } from "../../common/interfaces/@msft/1.15.2/WebPartContext";
import { IRepoLinks } from '../../components/atoms/Links/CreateLinks';
import { IFPSUser } from '../../logic/indexes/Users';
// import { DisplayMode, Version } from '@microsoft/sp-core-library';

//  import { IRepoLinks } from '../../Links_/CreateLinks';

// //  import { verifyAudienceVsUser } from '../../Services/Users/CheckPermissions';
//  import { IFPSUser, } from '../../Services/Users_/IUserInterfaces_';


 export interface IBuildBannerSettings {

     //this. related info
     context: WebPartContextCopy_15_2;
     clientWidth: number;
     exportProps: any;
 
     //Webpart related info
     panelTitle: string;
     modifyBannerTitle: boolean;

     repoLinks: IRepoLinks;

    //These were added to be able to surpress banner click or replace panel content with something else for Secure Script webpart
     replacePanelWarning: any;
 
     //Hard-coded Banner settings on webpart itself
     forceBanner: boolean;
     earyAccess: boolean;
     wideToggle: boolean;
     expandAlert: boolean;
     expandConsole: boolean;

     //Error info
     errMessage: string;
     errorObjArray: any []; //In the case of Pivot Tiles, this is manualLinks[];
     expandoErrorObj: any;

     FPSUser: IFPSUser;

     beAUser: boolean; //This is true if someone presses the beAUser button
     showBeAUserIcon: boolean; // this would be true if the banner has any audience targetting in any way that is not 'Everyone'

 }
 