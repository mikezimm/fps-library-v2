

import { ISimpleLink } from './Interfaces';

export function getBrowser(validTypes: any ,changeSiteIcon: any): string{

  let thisBrowser = "";
  return thisBrowser;

}

export function amIOnThisWeb( webUrl: string ): boolean {

  let result = false;
  let ImOnThisWeb = getWebUrlFromLink( null , 'abs' );
  webUrl = getWebUrlFromLink( webUrl , 'abs' );

  if ( ImOnThisWeb == webUrl ) {
      result = true;
  }

  return result;

}

/**
 * Takes in full url like from a list or library and tries to trim it down to a web url.
 * Only is able to fix some links to common lists, libraries and system pages
 * @param SiteLink 
 * @param absoluteOrRelative 
 * @returns 
 */
export function getWebUrlFromLink( SiteLink: string | null, absoluteOrRelative: 'abs' | 'rel' ) : string {

  if ( !SiteLink || SiteLink === '' ) {
      SiteLink = window.location.pathname ; }
  else { SiteLink = SiteLink + ''; }

  //Remove all search parameters first
  if ( SiteLink.toLowerCase().indexOf('?') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.toLowerCase().indexOf('?')  );  }

  if ( SiteLink.toLowerCase().indexOf('/sitepages/') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.toLowerCase().indexOf('/sitepages/')  );  }
  if ( SiteLink.toLowerCase().indexOf('/documents/') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.toLowerCase().indexOf('/documents/')  );  }
  if ( SiteLink.toLowerCase().indexOf('/siteassets/') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.toLowerCase().indexOf('/siteassets/')  );  }
  if ( SiteLink.toLowerCase().indexOf('/lists/') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.toLowerCase().indexOf('/lists/')  );  }
  if ( SiteLink.toLowerCase().indexOf('/_layouts/') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.toLowerCase().indexOf('/_layouts/')  );  }
  if ( SiteLink.toLowerCase().indexOf('/forms/') > 0 ) { 
      SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.toLowerCase().indexOf('/forms/') );  
      //Need to take up one more notch
      SiteLink = SiteLink.substr( 0, SiteLink.lastIndexOf('/') );
  }

  if ( absoluteOrRelative === 'abs' ) {
      if ( SiteLink.toLowerCase().indexOf('/sites/') === 0 ) { SiteLink = window.location.origin + SiteLink; } 

  } else if ( absoluteOrRelative === 'rel' ) {
      if ( SiteLink.toLowerCase().indexOf(window.location.origin) === 0 ) { SiteLink = SiteLink.substring( window.location.origin.length ); } 

  } else {
      alert('whoops.... unexpected paramter in getWebUrlFromLink: absoluteOrRelative = ' + absoluteOrRelative );
  }

  return SiteLink;

}

/**
 * turns url variables into an object where the keys equal the paramters and the value is the value of the paramter
 * @returns 
 */
export function getUrlVars() : any {
  let vars : any = {};
  if ( !location.search || location.search.length === 0 ) { return [] ; }
  vars = location.search
  .slice(1)
  .split('&')
  .map(p => p.split('='))
  .reduce((obj, pair) => {
    const [key, value] = pair.map(decodeURIComponent);
    return ({ ...obj, [key]: value }) ;
  }, {});
  let params = Object.keys(vars).map( k => { return k + '=' + vars[k] ; } );
  return params;
}

/**
 * Returns standard link object with Url and Description
 * @returns 
 */
export function getCurrentPageLink ( ) : ISimpleLink {
  let PageURL = window.location.href;
  let PageTitle = PageURL;
  if ( PageTitle.indexOf('?') > 0 ) { PageTitle = PageTitle.substring(0, PageTitle.indexOf('?') ) ; }  //2021-05-10:  Removed -1 because page title was missing last character.
  let PageLink : ISimpleLink | null = {
      'Url': PageURL,
      'Description': PageTitle.substring(PageTitle.lastIndexOf("/") + 1) ,
  };
  return PageLink;
}

/**
 * Returns standard link object with Url and Description
 * @param TargetList 
 * @param webTitle 
 * @returns 
 */
export function makeListLink ( TargetList: string , webTitle: string ) : ISimpleLink | null {
  let targetList: ISimpleLink | null = !TargetList ? null :{
      'Url': TargetList.indexOf('http') === 0 ? TargetList : window.location.origin + TargetList,
      'Description': TargetList.replace(window.location.origin,'').replace(webTitle,'').replace(webTitle.toLowerCase(),'').replace('/lists',''),
  };
  return targetList;

}

/**
 * Returns standard link object with Url and Description
 * @param TargetSite 
 * @param webTitle 
 * @returns 
 */
export function makeSiteLink ( TargetSite: string, webTitle: string ) : ISimpleLink | null {

  let targetSite: ISimpleLink | null = !TargetSite ? null : {
      'Url':  TargetSite && TargetSite.indexOf('http') === 0 ? TargetSite : window.location.origin + TargetSite ,
      'Description': webTitle ? webTitle : TargetSite.replace(window.location.origin,'') ,
  };

  return targetSite;
}
