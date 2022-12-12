

import { indexOfAnyCase } from '../../../logic/Arrays/searching/objectfind';

/**
 * @param exportStructure returns an object with selected this.properties to export via the help panel
 * Should only be property keys that you want to import
 * exportStructure = {
 *    key1: [ prop1, prop2, prop3 ] }
 * }
 * @param thisProperties - this is the webpart properties
 * @returns 
 */

export const exportNotAvailMess = 'Export Unavailable';

export type IAny = any;

export interface IMinExportObject extends IAny  {
  wpInstanceID: string;
  currentWeb: string;
}

  /**
  * 
  * @param exportStructure - object with keys as groups of properties to export, will cycle through each group which has it's own property keys in string array
  * @param thisProperties - webpart props
  * @param ignoreProps - array of property keys to explicitly not export
  * @param skipNullUndefined - false by default, will show null and undefined values in export
  * @returns 
  */
export function createExportObject( exportStructure: IMinExportObject, thisProperties: any, ignoreProps: string[], skipNullUndefined: boolean = false ): any {
  let finalObject:  any = {};

  Object.keys( exportStructure ).map( key => {
    if ( key === 'wpInstanceID' || key === 'currentWeb' ) {  //If this is the wpInstanceID, then do not look for props
      finalObject[key] = exportStructure[ key ];
    } else { 
      finalObject[key] = createExportGroup( exportStructure[ key ], thisProperties, ignoreProps, skipNullUndefined );
    }
  });

  return finalObject;

}

/**
 * 
 * @param updateOnThese - array of property keys to fetch from webpart props and save to exportProps object
 * @param thisProperties - webpart props
 * @param ignoreProps - array of property keys to explicitly not export
 * @param skipNullUndefined - false by default, will show null and undefined values in export
 * @returns 
 */
  export function createExportGroup( updateOnThese:string[], thisProperties: any, ignoreProps: string[], skipNullUndefined: boolean = false ): any {
    let exportProps: any = { };
    updateOnThese.map( thisProp => {
      if ( indexOfAnyCase( thisProp, ignoreProps, true, false ) < 0 ) {
        //2022-02-16:  had to update this so that it exports false, but also you can now specify to skip null or undefined if neccessary
        let isUnknown = thisProperties[ thisProp ] === null || thisProperties[ thisProp ] === undefined ? true : false;
        if ( isUnknown === true && skipNullUndefined === true ) {
          //Skip this property because it's null or undefined and the paramter says to skip these
        } else {
          exportProps[ thisProp ] = thisProperties[thisProp];
        }
      } else {
        exportProps[ thisProp ] = exportNotAvailMess;
      }
    });

    return exportProps;
  }