import { IZFullAnalytics, IZSentAnalytics } from './interfaces';

import { roundRatio, } from '../../logic/Math/rounding';
import { getSizeLabel } from '../../logic/Math/labels';
import { ILoadPerformance } from '../../components/molecules/Performance/IPerformance';
import { IMinPerformance, IPerformanceOp, LoadPerformanceOps } from '../../components/molecules/Performance/IPerformance';
import { getCurrentPageLink, getUrlVars, getWebUrlFromLink } from '../../logic/Links/UrlFunctions';
import { getSiteCollectionUrlFromLink, } from '../../logic/Strings/urlServices';

import { saveThisLogItem } from '@mikezimm/fps-pnp2/lib/services/sp/logging/saveThisLogItem';

export function getMinPerformanceString( performanceObj: ILoadPerformance, capMS: number = 7000, capValue: any = 'paused?' ) : string {

  let minPerformanceString = '';

  if ( performanceObj ) {
    const minPerformance : IMinPerformance = getMinPerformance( performanceObj , capMS, capValue );
    minPerformanceString = JSON.stringify( minPerformance );
  }

  return minPerformanceString;

}

/**
 * 
 * @param performanceObj: ILoadPerformance 
 * @capMS - max Milliseconds to save.... else return 'error' or null for that value.
 * @capValue - if ms value exceeds capMS, return this value in place of value
 * @returns 
 */

export function getMinPerformance( performanceObj: ILoadPerformance, capMS: number = 7000, capValue: any = 'paused?', ) : IMinPerformance {

  const minPerformance : IMinPerformance = {
    mode: null as any,
    sets:{},
    ops: {},
  };

  if ( performanceObj && performanceObj.mode ) {
    minPerformance.mode = performanceObj.mode ;
  }

  const keys: string[] = [...Object.keys( performanceObj ), ...Object.keys( performanceObj.sets ), ...Object.keys( performanceObj.ops ) ];

  keys.map( ( key : any ) => {
    if ( LoadPerformanceOps.indexOf(key) > -1 ) {
      const thisKey: any = key;
      const ops: any = performanceObj.ops;
      const sets: any = performanceObj.sets;
      const minSets: any = minPerformance.sets;
      const minOps: any = minPerformance.ops;
      const thisPart :  IPerformanceOp = ops[key];

      const performanceX : IPerformanceOp = ops[key];

      if ( key.indexOf( 'setting')  === 0 ) {

        minSets[ key ] = sets[key] ;  // NOTE: This line does not TS Error out when in an actual project.

      } else if ( performanceX ) {

        const ms: number  = performanceX['ms'] && performanceX['ms'] <= capMS ? performanceX['ms'] : capValue;
        const count = performanceX.c ? performanceX.c : undefined;
        minOps[ thisKey ] = {  // NOTE: This line does not TS Error out when in an actual project.
          label: performanceX['label'],
          ms: ms,
          c: count ? count : undefined,
          a: count ? Math.round( ( ms / count ) *10 ) / 10 : undefined,
        };

      }
    }
  });

  if ( performanceObj.getAllProps === true || performanceObj.getAllProps === false ) { 
    minPerformance.getAllProps = performanceObj.getAllProps ; }

  return minPerformance;

}


/**
 * Same as 2 but also adds the language to the object
 * @param analyticsWeb
 * @param analyticsList 
 * @param saveObject 
 * @param muteConsole 
 */
export function saveAnalytics3 ( analyticsWeb: string, analyticsList: string, saveObject: IZSentAnalytics, muteConsole: boolean, language?: string ) {

  if ( language && language.length > 0 ) { saveObject.language = navigator.language; }

  else if ( navigator && navigator.language ) {
    saveObject.language = navigator.language;

  } else {
    saveObject.language = 'Unknown';

  }

  saveObject.AnalyticsVersion = saveObject.AnalyticsVersion ? saveObject.AnalyticsVersion : 'saveAnalytics3';

  saveAnalytics2( analyticsWeb, analyticsList, saveObject, muteConsole );

}


export async function saveAnalytics2 ( analyticsWeb: string, analyticsList: string, saveObject: IZSentAnalytics, muteConsole: boolean, ) {
  let saveOjbectCopy: any = saveObject ? JSON.parse(JSON.stringify( saveObject )) : {} ;
  let finalSaveObject: IZFullAnalytics = saveOjbectCopy;

  finalSaveObject.AnalyticsVersion = finalSaveObject.AnalyticsVersion ? finalSaveObject.AnalyticsVersion : 'saveAnalytics2';

  delete finalSaveObject[ 'loadProperties' ];

  finalSaveObject.SiteID = saveObject.loadProperties.SiteID;  //Current site collection ID for easy filtering in large list
  finalSaveObject.WebID = saveObject.loadProperties.WebID;  //Current web ID for easy filtering in large list
  finalSaveObject.SiteTitle = saveObject.loadProperties.SiteTitle; //Web Title
  finalSaveObject.ListID = saveObject.loadProperties.ListID;  //Current list ID for easy filtering in large list
  finalSaveObject.ListTitle = saveObject.loadProperties.ListTitle;

  if ( typeof saveObject.zzzRichText1 === 'object' ) { 
    finalSaveObject.zzzRichText1 = JSON.stringify( saveObject.zzzRichText1 ); 
    console.log('Length of zzzRichText1:', finalSaveObject.zzzRichText1.length );
  } else if ( typeof saveObject.zzzRichText1 === 'string' ) { 
    finalSaveObject.zzzRichText1 = saveObject.zzzRichText1 ; 
  }

  if ( typeof saveObject.zzzRichText2 === 'object' ) { 
    finalSaveObject.zzzRichText2 = JSON.stringify( saveObject.zzzRichText2 ); 
    console.log('Length of zzzRichText2:', finalSaveObject.zzzRichText2.length );
  } else if ( typeof saveObject.zzzRichText2 === 'string' ) { 
    finalSaveObject.zzzRichText2 = saveObject.zzzRichText2 ; 
  }

  if ( typeof saveObject.zzzRichText3 === 'object' ) { 
    finalSaveObject.zzzRichText3 = JSON.stringify( saveObject.zzzRichText3 ); 
    console.log('Length of zzzRichText3:', finalSaveObject.zzzRichText3.length );
  } else if ( typeof saveObject.zzzRichText3 === 'string' ) { 
    finalSaveObject.zzzRichText3 = saveObject.zzzRichText3 ; 
  }

  //Convert TargetSite to actual link object
  if ( typeof saveObject.loadProperties.TargetSite === 'string' ) {
    finalSaveObject.TargetSite = {
      'Url': saveObject.loadProperties.TargetSite,
      'Description': saveObject.loadProperties.SiteTitle,
    };
  }

  //Convert TargetSite to actual link TargetList
  if ( typeof saveObject.loadProperties.TargetList === 'string' ) {
    finalSaveObject.TargetList = {
      'Url': saveObject.loadProperties.TargetList,
      'Description': saveObject.loadProperties.ListTitle,
    };
  }

  //Create CollectionUrl string from TargetSite
  if ( saveObject.loadProperties.TargetSite && !finalSaveObject.CollectionUrl ) {

    if ( typeof saveObject.loadProperties.TargetSite === 'string' ) {
      finalSaveObject.CollectionUrl = getSiteCollectionUrlFromLink(saveObject.loadProperties.TargetSite); // Should be target Site Collection Url

    } else if ( typeof saveObject.loadProperties.TargetSite === 'object' ) {
      finalSaveObject.CollectionUrl = getSiteCollectionUrlFromLink(saveObject.loadProperties.TargetSite); // Should be target Site Collection Url

    }
  }

  //Add current Page Link and Url
  finalSaveObject.PageLink = getCurrentPageLink();

  //Fix issue:  https://github.com/mikezimm/SecureScript7/issues/52
  let PageURLpieces = finalSaveObject.PageLink.Url.split('?');
  finalSaveObject.PageURL = PageURLpieces[0];

  // Fix issue:  https://github.com/mikezimm/PageInfo/issues/108
  if ( finalSaveObject.PageLink.Url && finalSaveObject.PageLink.Url.length > 254 ) {
    finalSaveObject.PageLink.Url = finalSaveObject.PageLink.Url.substring( 0, 254 );
    finalSaveObject.PageLink.Description += ' - ( Trimmed Url )';
  }

  //Add parameters
  finalSaveObject.getParams = getUrlVars().join(' & ');

  let SiteLink = getWebUrlFromLink( '' , 'abs');
  let SiteTitle = SiteLink.substring(SiteLink.lastIndexOf("/") + 1);

  finalSaveObject.SiteLink = {
    'Url': SiteLink,
    'Description': SiteTitle,
  };

  /**
   * Get Memory usage information
   */
  //Courtesy of https://trackjs.com/blog/monitoring-javascript-memory/
  const windowAny: any = window;
  let memoryObj = windowAny.performance['memory'];

  if ( memoryObj ) {
    memoryObj.usedPerTotal = memoryObj.totalJSHeapSize && memoryObj.totalJSHeapSize !== 0 ? memoryObj.usedJSHeapSize / memoryObj.totalJSHeapSize : null;
    memoryObj.totalPerLimit = memoryObj.jsHeapSizeLimit && memoryObj.jsHeapSizeLimit !== 0 ? memoryObj.totalJSHeapSize / memoryObj.jsHeapSizeLimit : null;
    memoryObj.usedPerLimit = memoryObj.jsHeapSizeLimit && memoryObj.jsHeapSizeLimit !== 0 ? memoryObj.usedJSHeapSize / memoryObj.jsHeapSizeLimit : null;
    memoryObj.Limit = getSizeLabel( memoryObj.jsHeapSizeLimit );
    memoryObj.Total = getSizeLabel( memoryObj.totalJSHeapSize );
    memoryObj.Used = getSizeLabel( memoryObj.usedJSHeapSize );

    finalSaveObject.memory = JSON.stringify( memoryObj );
    finalSaveObject.browser = 'Chromium';
    finalSaveObject.JSHeapSize = memoryObj.totalJSHeapSize;

  } else {
    finalSaveObject.browser = 'Not Chromium';
  }

  /**
   * Get screen information
   */

  let screen = null;
  if ( window && window.screen ) {
    screen = {
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,

      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,

      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,

      ratio: window.screen.width / window.screen.height,
      aspect: getAspectRatio( window.screen.width, window.screen.height ),

    };
  }

  finalSaveObject.screen = JSON.stringify( screen );
  finalSaveObject.screenSize = `${innerHeight} x ${innerWidth}`;

  /**
   * get device information
   */

  // const navigatorAny : any = navigator;
  // let device = null;
  // if ( navigator && navigator.appVersion ) {
  //   let OSName = null;
  //   if ( navigator.appVersion ) {
  //     if ( navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
  //     else if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
  //     else if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
  //     else if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
  //   }

  //   device = {
  //     OSName: OSName,
  //     platform: navigator.platform,
  //     maxTouchPoints: navigator.maxTouchPoints,
  //     vendor: navigator.vendor,
  //     language: navigator.language,
  //     deviceMemory: navigatorAny['deviceMemory'],
  //   };

  // }

  // finalSaveObject.device = JSON.stringify( device );

  saveThisLogItem( analyticsWeb, analyticsList, finalSaveObject, muteConsole );

}

export function getAspectRatio( width: number, height: number ) {
  if ( height === 0 || width === 0 ) {
    return 'na';
  } else {
    let result = `${width} / ${ height }`;
    let ratio = roundRatio( width / height );
    if ( ratio === roundRatio(16/9 ) ) { result = '16 / 9' ; }
    else if ( ratio === roundRatio(9/16 ) ) { result = '9 / 16' ; }
    else if ( ratio === roundRatio(4/3 ) ) { result = '4 / 3' ; }
    else if ( ratio === roundRatio(3/4 ) ) { result = '3 / 4' ; }
    else if ( ratio === roundRatio(21/9 ) ) { result = '21 / 9' ; }
    else if ( ratio === roundRatio(9/21 ) ) { result = '9 / 21' ; }
    else if ( ratio === roundRatio(14/9 ) ) { result = '14 / 9' ; }
    else if ( ratio === roundRatio(9/14 ) ) { result = '9 / 14' ; }
    else if ( ratio === roundRatio(18/9 ) ) { result = '18 / 9' ; }
    else if ( ratio === roundRatio(9/18 ) ) { result = '9 / 18' ; }
    else if ( ratio === roundRatio(23/16 ) ) { result = '23 / 16' ; } // Ipad Air 4
    else if ( ratio === roundRatio(16/23 ) ) { result = '16 / 23' ; } // Ipad Air 4
    else if ( ratio === roundRatio(19.5/9 ) ) { result = '19.5 / 9' ; } // Iphone 11-12-XR
    else if ( ratio === roundRatio(9/23 ) ) { result = '9 / 19.5' ; } // Iphone 11-12-XR
    else if ( ratio === roundRatio(4/5 ) ) { result = '4 / 5' ; }
    else if ( ratio === roundRatio(5/4 ) ) { result = '5 / 4' ; }
    else if ( ratio === roundRatio(32/9 ) ) { result = '32 / 9' ; }
    else if ( ratio === roundRatio(9/32 ) ) { result = '9 / 32' ; }
    return result;
  }
}

