
/**
 * Notably missing as is:
 * 
 * LoginName, loginName, Name, UserPrincipalName
 * https://learn.microsoft.com/en-us/azure/active-directory/hybrid/plan-connect-userprincipalname#upn-format
 * Based upon above docs, UPN should be like email address

    Following are typical PAGECONTEXT.USER props
    ==============================================
    displayName : "Mike LastName"
    email : "mike.tenant@tenant.onmicrosoft.com"
    firstDayOfWeek : undefined
    isAnonymousGuestUser : false
    isExternalGuestUser : false
    loginName : "mike.tenant@tenant.onmicrosoft.com"


    Following are typical LEGACYPAGECONTEXT props:
    ==============================================
    userDisplayName : "Mike LastName"
    userEmail : "mike.tenant@tenant.onmicrosoft.com"
    userFirstDayOfWeek : 0
    userId : 6
    userLoginName : "mike.tenant@tenant.onmicrosoft.com"
    userPhotoCdnBaseUrl : "https://tenant.sharepoint.com/_vti_bin/afdcache.ashx/_userprofile/userphoto.jpg?_oat_=1670754241_...."
    userPrincipalName : "mike.tenant@tenant.onmicrosoft.com"

 */
const ThisUser = {
  "title": "Mike LastName",
  "Title": "Mike LastName",
  "initials": "MM",
  "email": "mike.tenant@tenant.onmicrosoft.com",
  "Email": "mike.tenant@tenant.onmicrosoft.com",
  "id": "6",
  "Id": "6",
  "ID": "6",
  "UserId": null,
  "isSiteAdmin": true,
  "IsSiteAdmin": true,
  "UserPrincipalName": null,
  "imageInitials": "",
  "imageUrl": "",
  "text": "Mike LastName",
  "remoteID": null,
  "ensureWeb": "https://tenant.sharepoint.com/sites/Templates"
}