
const validatedWithEmail2: any = {
  "user": {
      "title": "Mike LastName",
      "Title": "Mike LastName",
      "initials": "MM",
      "email": "mike.tenant@tenant.onmicrosoft.com",
      "Email": "mike.tenant@tenant.onmicrosoft.com",
      "LoginName": "i:0#.f|membership|mike.tenant@tenant.onmicrosoft.com",
      "Name": "i:0#.f|membership|mike.tenant@tenant.onmicrosoft.com",
      "id": "9",
      "Id": "9",
      "ID": "9",
      "UserId": {
          "NameId": "100320004e46552a",
          "NameIdIssuer": "urn:federation:microsoftonline"
      },
      "isSiteAdmin": false,
      "IsSiteAdmin": false,
      "UserPrincipalName": "mike.tenant@tenant.onmicrosoft.com",
      "imageInitials": "",
      "imageUrl": "",
      "loginName": "i:0#.f|membership|mike.tenant@tenant.onmicrosoft.com",
      "text": "Mike LastName",
      "remoteID": null,
      "ensureWeb": "https://tenant.sharepoint.com/sites/PivotHub",
      "PrincipalType": 1
  },
  "errorInfo": null,
  "errorInput": {
      "e": null,
      "alertMe": false,
      "consoleLog": false,
      "traceString": "fps-library-v2|/sites/Templates/Analytics/|ErrorLog|Failed|ensureUserInfo ~ 21|https://tenant.sharepoint.com/sites/PivotHub|||",
      "logErrors": true
  },
  "status": "success"
}

/**

  const loginCreds: string = this.context.pageContext.user.email;
  this._ensureUserInfo = await ensureUserInfo( 'https://tenant.sharepoint.com/sites/PivotHub', loginCreds );
  this._ensureUserHere = await ensureUserHere( loginCreds , this.context.pageContext.site.absoluteUrl , false );

 */
const remoteUbWEmail: any = {
  "user": {
      "title": "",
      "Title": "",
      "initials": "",
      "email": "",
      "Email": "",
      "LoginName": "",
      "Name": "",
      "id": "undefined",
      "Id": "undefined",
      "ID": "undefined",
      "UserId": null,
      "UserPrincipalName": null,
      "imageInitials": "",
      "imageUrl": "",
      "loginName": "",
      "text": "",
      "remoteID": null,
      "ensureWeb": "https://tenant.sharepoint.com/sites/PivotHub"
  },
  "errorInfo": null,
  "errorInput": {
      "e": null,
      "alertMe": false,
      "consoleLog": false,
      "traceString": "fps-library-v2|/sites/Templates/Analytics/|ErrorLog|Failed|ensureUserInfo ~ 21|https://tenant.sharepoint.com/sites/PivotHub|||",
      "logErrors": true
  },
  "status": "success"
}

/**
  const loginCreds: string = this.context.pageContext.user.loginName;
  this._ensureUserInfo = await ensureUserInfo( 'https://tenant.sharepoint.com/sites/PivotHub', loginCreds );
  this._ensureUserHere = await ensureUserHere( loginCreds , this.context.pageContext.site.absoluteUrl , false );
 */

const remoteWithLoginName2: any = {
  "user": {
      "title": "",
      "Title": "",
      "initials": "",
      "email": "",
      "Email": "",
      "LoginName": "",
      "Name": "",
      "id": "undefined",
      "Id": "undefined",
      "ID": "undefined",
      "UserId": null,
      "UserPrincipalName": null,
      "imageInitials": "",
      "imageUrl": "",
      "loginName": "",
      "text": "",
      "remoteID": null,
      "ensureWeb": "https://tenant.sharepoint.com/sites/PivotHub"
  },
  "errorInfo": null,
  "errorInput": {
      "e": null,
      "alertMe": false,
      "consoleLog": false,
      "traceString": "fps-library-v2|/sites/Templates/Analytics/|ErrorLog|Failed|ensureUserInfo ~ 21|https://tenant.sharepoint.com/sites/PivotHub|||",
      "logErrors": true
  },
  "status": "success"
}