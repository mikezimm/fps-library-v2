

import { IThisFPSWebPartClass } from "./IThisFPSWebPartClass";

export function onFPSPropPaneClosed(  thisWPClass: IThisFPSWebPartClass, ) : Promise<void> {

  if ( thisWPClass.properties.requireContacts !== true ) return;

  const supportContacts = thisWPClass.properties.supportContacts;
  if ( !supportContacts || supportContacts.length === 0 ) {
    thisWPClass.properties.supportContacts = [
      {
        fullName: thisWPClass._FPSUser.Title ,
        id: thisWPClass._FPSUser.id,
        email: thisWPClass._FPSUser.Email,
        login: thisWPClass._FPSUser.Email,
        imageUrl: thisWPClass._FPSUser.imageUrl,
      }
    ];
  }

}

