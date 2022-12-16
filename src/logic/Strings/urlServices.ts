

// import { cleanSPListURL, cleanURL, encodeDecodeString, } from '@mikezimm/npmfunctions/dist/Services/Strings/urlServices';

/***
 *    d88888b d8b   db  .o88b.  .d88b.  d8888b. d88888b      d8888b. d88888b  .o88b.  .d88b.  d8888b. d88888b      .d8888. d888888b d8888b. d888888b d8b   db  d888b  
 *    88'     888o  88 d8P  Y8 .8P  Y8. 88  `8D 88'          88  `8D 88'     d8P  Y8 .8P  Y8. 88  `8D 88'          88'  YP `~~88~~' 88  `8D   `88'   888o  88 88' Y8b 
 *    88ooooo 88V8o 88 8P      88    88 88   88 88ooooo      88   88 88ooooo 8P      88    88 88   88 88ooooo      `8bo.      88    88oobY'    88    88V8o 88 88      
 *    88~~~~~ 88 V8o88 8b      88    88 88   88 88~~~~~      88   88 88~~~~~ 8b      88    88 88   88 88~~~~~        `Y8b.    88    88`8b      88    88 V8o88 88  ooo 
 *    88.     88  V888 Y8b  d8 `8b  d8' 88  .8D 88.          88  .8D 88.     Y8b  d8 `8b  d8' 88  .8D 88.          db   8D    88    88 `88.   .88.   88  V888 88. ~8~ 
 *    Y88888P VP   V8P  `Y88P'  `Y88P'  Y8888D' Y88888P      Y8888D' Y88888P  `Y88P'  `Y88P'  Y8888D' Y88888P      `8888Y'    YP    88   YD Y888888P VP   V8P  Y888P  
 *                                                     
 *                                                     
 */

 export function encodeDecodeString( str : string , doThis: 'encode' | 'decode'): string {

    //https://abstractspaces.wordpress.com/2008/05/07/sharepoint-column-names-internal-name-mappings-for-non-alphabet/
  
    let newStr = str + '';
    newStr = newStr.replace(/_x007e_/g,'~');
    newStr = newStr.replace(/_x0021_/g,'!');
    newStr = newStr.replace(/_x0040_/g,'@');
    newStr = newStr.replace(/_x0023_/g,'#');
    newStr = newStr.replace(/_x0024_/g,'$');
    newStr = newStr.replace(/_x0025_/g,'%');
    newStr = newStr.replace(/_x005e_/g,'^');
    newStr = newStr.replace(/_x0026_/g,'&');
    newStr = newStr.replace(/_x002a_/g,'*');
    newStr = newStr.replace(/_x0028_/g,'(');
    newStr = newStr.replace(/_x0029_/g,')');
    newStr = newStr.replace(/_x002b_/g,'+');
    newStr = newStr.replace(/_x002d_/g,'\–');
    newStr = newStr.replace(/_x003d_/g,'=');
    newStr = newStr.replace(/_x007b_/g,'{');
    newStr = newStr.replace(/_x007d_/g,'}');
    newStr = newStr.replace(/_x003a_/g,':');
    newStr = newStr.replace(/_x0022_/g,'\“');
    newStr = newStr.replace(/_x007c_/g,'|');
    newStr = newStr.replace(/_x003b_/g,';');
    newStr = newStr.replace(/_x0027_/g,'\‘');
    newStr = newStr.replace(/_x005c_/g,'\\');
    newStr = newStr.replace(/_x003c_/g,'\<');
    newStr = newStr.replace(/_x003e_/g,'\>');
    newStr = newStr.replace(/_x003f_/g,'?');
    newStr = newStr.replace(/_x002c_/g,',');
    newStr = newStr.replace(/_x002e_/g,'.');
    newStr = newStr.replace(/_x002f_/g,'/');
    newStr = newStr.replace(/_x0060_/g,'`');
    newStr = newStr.replace(/_x0020_/g,' ');
    newStr = newStr.replace(/_x005f_/g,'_');
    newStr = newStr.replace(/_/g,'_');
  
    return newStr;
  
  }

/***
 *     .o88b. db      d88888b  .d8b.  d8b   db      .d8888. d8888b.      db      d888888b .d8888. d888888b      db    db d8888b. db      
 *    d8P  Y8 88      88'     d8' `8b 888o  88      88'  YP 88  `8D      88        `88'   88'  YP `~~88~~'      88    88 88  `8D 88      
 *    8P      88      88ooooo 88ooo88 88V8o 88      `8bo.   88oodD'      88         88    `8bo.      88         88    88 88oobY' 88      
 *    8b      88      88~~~~~ 88~~~88 88 V8o88        `Y8b. 88~~~        88         88      `Y8b.    88         88    88 88`8b   88      
 *    Y8b  d8 88booo. 88.     88   88 88  V888      db   8D 88           88booo.   .88.   db   8D    88         88b  d88 88 `88. 88booo. 
 *     `Y88P' Y88888P Y88888P YP   YP VP   V8P      `8888Y' 88           Y88888P Y888888P `8888Y'    YP         ~Y8888P' 88   YD Y88888P 
 *                        
 *                        
 */
/**
 * SharePoint automatically removes characters from library names
 * 
 * @param str
 */
 export function cleanSPListURL( str : string ): string {
    return str.replace(/\s\%\&\?\.\+/g, '');
  
  }
  
  /***
   *     .o88b. db      d88888b  .d8b.  d8b   db      db    db d8888b. db      
   *    d8P  Y8 88      88'     d8' `8b 888o  88      88    88 88  `8D 88      
   *    8P      88      88ooooo 88ooo88 88V8o 88      88    88 88oobY' 88      
   *    8b      88      88~~~~~ 88~~~88 88 V8o88      88    88 88`8b   88      
   *    Y8b  d8 88booo. 88.     88   88 88  V888      88b  d88 88 `88. 88booo. 
   *     `Y88P' Y88888P Y88888P YP   YP VP   V8P      ~Y8888P' 88   YD Y88888P 
   *                                                                           
   *                                                                           
   */
  
  //Sample to convert to arrow function
  //const sum1 = function(list, prop){ return list.reduce( function(a, b){ return a + b[prop];}, 0);}
  //const sum2 = (list,prop) =>  { return list.reduce((a,b) => {return (a+ b[prop])}, 0);}
  
  export function cleanURL(originalURL: String): string {
  
      let newURL = originalURL.toLowerCase();
      if ( newURL.indexOf('/sitepages/') > 0 ) { return newURL.substring(0, newURL.indexOf('/sitepages/') + 1) ; }
      if ( newURL.indexOf('/lists/') > 0 ) { return newURL.substring(0, newURL.indexOf('/lists/') + 1) ; }
      if ( newURL.indexOf('/siteassets/') > 0 ) { return newURL.substring(0, newURL.indexOf('/siteassets/') + 1) ; }
      if ( newURL.indexOf('/_layouts/') > 0 ) { return newURL.substring(0, newURL.indexOf('/_layouts/') + 1) ; }
      if ( newURL.indexOf('/documents/') > 0 ) { return newURL.substring(0, newURL.indexOf('/documents/') + 1) ; }
      if ( newURL.indexOf('/shared documents/') > 0 ) { return newURL.substring(0, newURL.indexOf('/shared documents/') + 1) ; }
      if ( newURL.indexOf('/shared%20documents/') > 0 ) { return newURL.substring(0, newURL.indexOf('/shared%20documents/') + 1) ; }
      if ( newURL.indexOf('/forms/') > 0 ) { 
        newURL = newURL.substring(0, newURL.indexOf('/forms/'));
        newURL = newURL.substring(0, newURL.indexOf('/') + 1);
        return newURL;
      }
      if ( newURL.indexOf('/pages/') > 0 ) { return newURL.substring(0, newURL.indexOf('/pages/') + 1) ; }
      if ( newURL.substring(newURL.length -1) !== '/' ) { return newURL + '/'; }
      
      return newURL;
  
    }
  
    /**
     * NOTE This only works when the /sites/ you are refering to is in the same tenant
     * @param relUrl 
     */
    export function getFullUrlFromSlashSitesUrl( relUrl : string, showConsole: boolean = true ): string {
      if ( relUrl === undefined || relUrl === null ) { relUrl = '' ; }
      let newURL = relUrl + '';
      //Added this to prevent errors in next
      if ( !relUrl || relUrl.length === 0 ) {
        newURL = '' ;
      }
      if ( relUrl.indexOf('/sites/') === 0 ) {
          // let domain = window.location.href.substr( 0, window.location.href.indexOf('/sites/') );
          newURL = window.location.origin + relUrl;
          if ( showConsole === true ) { console.log( 'updated Url to: ', newURL ) ; }
      } 
      return newURL;
  }

// window.location properties
// host: "tenant.sharepoint.com"
// hostname: "tenant.sharepoint.com"
// href: "https://tenant.sharepoint.com/sites/WebPartDev/SitePages/ECStorage.aspx?debug=true&noredir=true&debugManifestsFile=https%3A%2F%2Flocalhost%3A4321%2Ftemp%2Fmanifests.js&allowOtherSites=true&scenario=dev"
// origin: "https://tenant.sharepoint.com"
// pathname: "/sites/WebPartDev/SitePages/ECStorage.aspx"
// protocol: "https:"
// search: "?debug=true&noredir=true&debugManifestsFile=https%3A%2F%2Flocalhost%3A4321%2Ftemp%2Fmanifests.js&allowOtherSites=true&scenario=dev"

export function getSiteCollectionUrlFromLink( link: string ): string {
  if ( !link || link.length === 0 ) {
    link = window.location.pathname ;
  } else if ( link.indexOf('http') === 0 ) {
    link = link.replace( window.location.origin, '');
  }
  //At this point, link should be relative url /sites/collection....
  let parts = link.split('/');
  let collectionUrl = `${window.location.origin}/sites/${parts[2]}`;
  return collectionUrl;
}


export const regexMultiFwdSlash = /\/+/g;
export const regexInsecureProtocall = /(http:\/\/)/ig;
export const regexSecureProtocall = /(https:\/\/)/ig;

export const regexAnyProtocoll = /https?:\/\/+/ig; // https:// or hTTps:// or http://

/**
 * Copied from SecureScript
 * 
 * This coverts any Url to serverRelativeUrl style (starts with /sites/) if it's on tenant ( removes the current hostname )
 * The special part about it is it also:
 * handles different cAsEs of the protocall and origin
 * cleans up cases with extra // in back part of url:  like /sites/test///anotherUrl
 * handles both http: and https: links
 * 
 * @param url 
 * @returns 
 */
export function standardizeLocalLink( url : string ): string {

  //1.) remove the hostname from a link
  let newUrl = url.toLowerCase().indexOf( `${window.location.origin}` ) === 0 ? url.slice( window.location.origin.length ) : url;

  //2.) %3a with : if it is pasted in
  newUrl = newUrl.replace(/%3a/gi,':');

  //2.) get backHalf of url ( any part after https:// )
  let proto = newUrl.toLowerCase().indexOf('http://') === 0 ? 'http://' : newUrl.toLowerCase().indexOf('https://') === 0 ? 'https://' : '';
  let backHalf = newUrl.slice( proto.length );
  backHalf = backHalf.replace( regexSecureProtocall,'regexSecureProtocall' ).replace( regexInsecureProtocall,'regexInsecureProtocall' );

  //3.) remove any non-protocol multi-slashes from back half of url
  backHalf = backHalf.replace( regexMultiFwdSlash, '\/' );

  //4.) add back any protocols that might be part of paramters (so they still have // in them )
  backHalf = backHalf.replace( /regexSecureProtocall/g, 'https://' );
  backHalf = backHalf.replace( /regexInsecureProtocall/g, 'http://' );
  
  let result = proto + backHalf;
  return result;

}