
import { sortObjectArrayByStringKey, sortObjectArrayByStringKeyCollator } from './sorting/objects';

import type { ISimpleLink,  } from "../../logic/Links/Interfaces";

export interface IRailAnalytics {
  // [key: string]: string | number | ISimpleLink | undefined;
  'Title': string;            // What was done:  ie:
  'PageLink': ISimpleLink;     // Link to page
  'zzzText1': string;         // Set ID
  'zzzText2': string;         // Time Key
  'zzzText3': string;         // Value1:  Group Name
  'zzzText4': string;         // 
  'zzzText5': string;         // siteGuid
  'zzzText6': string;         // List or Site for assigning permissions
  'zzzText7': string;         // Sort Order
  'SiteLink': ISimpleLink;     // 
  'SiteTitle': string;        // 
  'TargetSite': ISimpleLink;   //
  'Result': string;           // Was success or error
  'TargetList': ISimpleLink;   // 
  'ListTitle': string;        // 
  'zzzRichText1': string;     // Action JSON 
  'zzzRichText2': string;     // Action JSON 
  'zzzRichText3': string;     // Action JSON 
  'zzzNumber4': number;       // Group ID
  'zzzNumber5': number;       // Either RoleID for item or Parent Group ID
  'getParams': string;        // 
  'Setting': string;          // This would be the rail function called
  'Id'?: number;
  'Created'?: any;
  'Author'?: number;
  'AuthorId'?: string;
  'AuthorTitle'?: string;
  'AuthorName'?: string;
}

export interface IArraySummaryGroup {
  // [key: string]: string | IRailAnalytics[] | any;
  key: string;
  items: IRailAnalytics[];
  groupFilter: any;
  localTime: string;
}

export interface IArraySummary {
  // [key: string]: string[] | IRailAnalytics[] | IArraySummaryGroup[];
  keys: string[]; //Keys is just string array of all the group.key which can be used to build easy list of the keys.
  items: IRailAnalytics[];
  groups: IArraySummaryGroup[];
  filteredGroups: IArraySummaryGroup[];
  filteredKeys: string[]; //Keys is just string array of all the group.key which can be used to build easy list of the keys.
}

/**
 * 
 * @param items 
 * @param keys 
 * @param keyDelim 
 * @param groupFilterKey 
 * @param groupItemOrderKey 
 * @param sort 
 * @param convertNullToEmpty  - Added for potential multi-lingual issues
 * @param localLanguage 
 */
export function groupArrayItemsByField( items: IRailAnalytics[], keys: string[], keyDelim: string, groupFilterKey: string, groupItemOrderKey: string, sort: 'asc' | 'dec', convertNullToEmpty: boolean = false, localLanguage: string = 'en' ): IArraySummary {

  let summary: IArraySummary = {
      keys: [],
      items: [],
      groups: [],
      filteredGroups: [],
      filteredKeys: [],
  };

  items.map( itemX=> {
      let item: any = itemX; //Added to remove typescript error 
      let thisKey = keys.map( key => { return item[key]; }).join( keyDelim );
      let thisKey2 = item[keys[0]];
      thisKey2 += keyDelim + item[keys[1]];

      let keyIndex = summary.keys.indexOf( thisKey );

      if ( keyIndex < 0 ) {
          summary.keys.push( thisKey );
          keyIndex = summary.keys.length -1 ;

          let thisKeyBasic = thisKey.split('~');
          let localTime : any = new Date(thisKeyBasic[0].replace(' ','').trim());
          localTime = localTime.toLocaleString();
          summary.groups.push( { key: thisKey, items: [], groupFilter: null, localTime: localTime } ) ;

          //Set the groupFilter which is intended to be an easy way to filter this group... 
          //For instance, the All items are pre-filtered by the site the item pertains to.
          //The groupFilter could be the list in that site which the items in the group have in common

          let filterKeys = groupFilterKey.split('.');
          if ( filterKeys.length === 1 ) { summary.groups[keyIndex].groupFilter = item[groupFilterKey]; }
          else { summary.groups[keyIndex].groupFilter = item[filterKeys[0]][filterKeys[1]]; }
      }
      
      summary.groups[keyIndex].items.push( item );

  });

  if ( groupItemOrderKey !== null && groupItemOrderKey !== undefined && groupItemOrderKey !== '' ) {
      summary.groups.map( group => {
          let okToSort = true;
          group.items.map( itemX => {
              let item: any = itemX; //Added to remove typescript error 
              if ( item[groupItemOrderKey] === null ) { okToSort = false; }
              else if ( item[groupItemOrderKey] === undefined ) { okToSort = false; }
          });
          if ( okToSort === true ) {
            let newItems: any = [];
              if ( localLanguage !== '' ) {
                newItems = sortObjectArrayByStringKeyCollator( group.items, sort, groupItemOrderKey, convertNullToEmpty, localLanguage );
              } else {
                newItems = sortObjectArrayByStringKey( group.items, sort, groupItemOrderKey );
              }
              group.items = newItems;
          } else {
              console.log( 'Unable to sort this group of items... one of the keyValues was not valid.', group );
          }

      });
  }

  summary.filteredGroups = summary.groups;
  summary.filteredKeys = summary.keys;
  // console.log( 'History summary: ', summary );

  return summary;

}
