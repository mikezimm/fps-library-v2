// Added  to null so it passes linting

const validatedWithEmail: any = {
  "user": {
      "title": "Mike LastName",
      "Title": "Mike LastName",
      "initials": "MM",
      "email": "mike.tenant@tenant.onmicrosoft.com",
      "Email": "mike.tenant@tenant.onmicrosoft.com",
      "LoginName": "i:0#.f|membership|mike.tenant@tenant.onmicrosoft.com",
      "Name": "i:0#.f|membership|mike.tenant@tenant.onmicrosoft.com",
      "id": "6",
      "Id": "6",
      "ID": "6",
      "UserId": {
          "NameId": "100320004e46552a",
          "NameIdIssuer": "urn:federation:microsoftonline"
      },
      "isSiteAdmin": true,
      "IsSiteAdmin": true,
      "UserPrincipalName": "mike.tenant@tenant.onmicrosoft.com",
      "imageInitials": "",
      "imageUrl": "",
      "loginName": "i:0#.f|membership|mike.tenant@tenant.onmicrosoft.com",
      "text": "Mike LastName",
      "remoteID": null,
      "ensureWeb": "https://tenant.sharepoint.com/sites/Templates",
      "PrincipalType": 1
  },
  "errorInfo": null,
  "errorInput": {
      "e": null,
      "alertMe": false,
      "consoleLog": true,
      "traceString": "fps-library-v2|/sites/Templates/Analytics/|ErrorLog|Failed|ensureUserHere ~ 24|https://tenant.sharepoint.com/sites/Templates|||",
      "logErrors": true
  },
  "status": "success"
}

/**

const loginCreds: string = this.context.pageContext.user.email;
this._ensureUserInfo = await ensureUserInfo( 'https://tenant.sharepoint.com/sites/PivotHub', loginCreds );
this._ensureUserHere = await ensureUserHere( loginCreds , this.context.pageContext.site.absoluteUrl , false );

 */
const currentWithEmail: any = {
  "user": null,
  "errorInfo": {
      "errObj": null,
      "friendly": "This can happen if the web url is not valid.",
      "result": "Failed to fetch",
      "returnMess": "Ohh Snap!\nThis can happen if the web url is not valid. \n-- FULL ERROR MESSAGE: \nFailed to fetch"
  },
  "errorInput": {
      "e": {
          "response": {},
          "status": 404,
          "statusText": "",
          "isHttpRequestError": true
      },
      "alertMe": false,
      "consoleLog": true,
      "traceString": "fps-library-v2|/sites/Templates/Analytics/|ErrorLog|Failed|ensureUserHere ~ 24|https://tenant.sharepoint.com/sites/Templates|||",
      "logErrors": true
  },
  "status": "error"
}


/**
  const loginCreds: string = this.context.pageContext.user.loginName;
  this._ensureUserInfo = await ensureUserInfo( 'https://tenant.sharepoint.com/sites/PivotHub', loginCreds );
  this._ensureUserHere = await ensureUserHere( loginCreds , this.context.pageContext.site.absoluteUrl , false );
 */

  const remoteWithLoginName1: any = {
    "user": null,
    "errorInfo": {
        "errObj": null,
        "friendly": "This can happen if the web url is not valid.",
        "result": "Failed to fetch",
        "returnMess": "Ohh Snap!\nThis can happen if the web url is not valid. \n-- FULL ERROR MESSAGE: \nFailed to fetch"
    },
    "errorInput": {
        "e": {
            "response": {},
            "status": 404,
            "statusText": "",
            "isHttpRequestError": true
        },
        "alertMe": false,
        "consoleLog": true,
        "traceString": "fps-library-v2|/sites/Templates/Analytics/|ErrorLog|Failed|ensureUserHere ~ 24|https://tenant.sharepoint.com/sites/Templates|||",
        "logErrors": true
    },
    "status": "error"
}