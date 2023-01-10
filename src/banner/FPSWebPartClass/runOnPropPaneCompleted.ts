

import { IThisFPSWebPartClass } from "./IThisFPSWebPartClass";

export function onFPSPropPaneClosed(  thisWPClass: IThisFPSWebPartClass, ) : Promise<void> {

  if ( thisWPClass.properties.requireContacts !== true ) return;

  const supportContacts = thisWPClass.properties.supportContacts;
  if ( !supportContacts || supportContacts.length === 0 ) {
    thisWPClass.properties.supportContacts = [
      {
        fullName: thisWPClass._FPSUser.Title ,
        id: thisWPClass._FPSUser.id,
        email: thisWPClass._FPSUser.email, // Verified _FPSUser.email was valid as of 2023-01-09 - SPFx v1.15.2
        login: thisWPClass._FPSUser.name, // Verified _FPSUser.name was valid as of 2023-01-09 - SPFx v1.15.2
        imageUrl: thisWPClass.context.pageContext.user.imageUrl,  // Verified context.pageContext.user.imageUrl was valid as of 2023-01-09 - SPFx v1.15.2
      }
    ];
    console.log('FPS-onFPSPropPaneClosed... We ADDED you to supportContacts because it can not be left empty:', thisWPClass.properties.supportContacts);
  }

}

