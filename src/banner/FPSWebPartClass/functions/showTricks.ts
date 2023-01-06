import { PageContextCopy_15_2_User } from "../../../common/interfaces/@msft/1.15.2/WebPartContext";

/**
 * This was moved from BuildBannerPropsX2 to here so the same logic could be used directly in the web part.
 *    Also created IPageContextCopy_15_2User in WebPartContext
 * @param _trickyEmailsAll 
 * @param user 
 * @returns 
 */
export function check4Tricks( _trickyEmailsAll: string[], user: PageContextCopy_15_2_User ): boolean {
  let showTricks: any = false;
  _trickyEmailsAll.map( getsTricks => {
    if ( user && user.loginName && user.loginName.toLowerCase().indexOf( getsTricks ) > -1 ) { 
      showTricks = true ;
    }
  });
  return showTricks;
}
