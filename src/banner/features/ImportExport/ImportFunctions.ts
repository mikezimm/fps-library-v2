
import {
  PropertyPaneTextField,
  IPropertyPaneGroup,
} from '@microsoft/sp-property-pane';

import { getHelpfullErrorV2 } from '../../../logic/Errors/friendly';

import { indexOfAnyCase } from '../../../logic/Arrays/searching/objectfind';
import { exportNotAvailMess } from './ExportFunctions';

import { JSON_Edit_Link } from '../../propPane/ReusableLinks';
import { IMinBannerUtilityProps } from '../../interfaces/MinWP/IMinBannerUtilityProps';

// import { JSON_Edit_Link } from './zReusablePropPane_';

export const FPSImportPropsGroup : IPropertyPaneGroup = {
  groupName: 'Import Props',
  isCollapsed: true ,
  groupFields: [
    PropertyPaneTextField('fpsImportProps', {
      label: `Import settings from another FPS PageInfo Web part`,
      description: 'For complex settings, use the link below to edit as JSON Object',
      multiline: true,
    }),
    JSON_Edit_Link,
]};


export function updateFpsImportProps ( 
  thisProps: IMinBannerUtilityProps, importBlockProps: string[], propertyPath: string , newValue: any, 
  refreshPane: any, restartPane: any,
  exitPropPaneChanged: any, 
  ) : string {

  let importErrorMessage: string = '';

  if ( propertyPath === 'fpsImportProps' ) {

      if ( exitPropPaneChanged === true ) {//Added to prevent re-running this function on import.  Just want re-render. )
          exitPropPaneChanged = false;  //Added to prevent re-running this function on import.  Just want re-render.

      } else {
          let result = importProps( thisProps, newValue, [], importBlockProps );

          importErrorMessage = result.errMessage;
          if ( result.importError === false ) {
              thisProps.fpsImportProps = '';
              refreshPane();
          }
          exitPropPaneChanged = true;  //Added to prevent re-running this function on import.  Just want re-render.
          restartPane();
          // this.render();
      }
  }
  return importErrorMessage;
}

/**
 * @param thisProperties - this.properties of the webpart (to update and verify)
 * @param fpsImportProps - string from property pane with import properties
 * @param validImports - white list specific properties
 * @param blockImports - explicitly block these props (to avoid over-writing ones we don't want changed like scenario )
 */

export function importProps( thisProperties: any, fpsImportProps: string, validImports: string[], blockImports: string[] ){

  let errMessage = '';
  let propsObject: any = {};
  let importError = false;

  let updateCount = 0;
  let blockCount = 0;
  let unChangedCount = 0;
  let notAcceptCount = 0;

  let blocked: string[] = [];
  let updated: string[] = [];
  let unchanged: string[] = [];
  let notAccepted: string[] = [];

  if  ( fpsImportProps && fpsImportProps.length > 0 ) {
    try {
      propsObject = JSON.parse( fpsImportProps );

    } catch (e) {
      let errMessageImport = getHelpfullErrorV2(e, false, true, 'importProps ~20') ;
      console.log('Unable to parse import Props:' , fpsImportProps );

      errMessage += errMessage.length > 0 ? ' -- ' : '';
      errMessage += 'Error parsing import Props.  Check JSON.  ' +  errMessageImport;

      importError = true;
    }
    if ( importError === false ) {

      Object.keys( propsObject ).map ( propGroup => {
        //added indexOfAnyCase check for if group is part of blocked... https://github.com/mikezimm/SecureScript7/issues/77
        if ( propGroup !== 'wpInstanceID' && indexOfAnyCase( propGroup , blockImports , true, false ) < 0 ) {

          //Added this entire if for cases when propGroup is not agroup but a single prop:  https://github.com/mikezimm/SecureScript7/issues/77
          if ( typeof propsObject[propGroup] !== 'object' ) {
            //This is not an object, only test this level.

            if ( thisProperties[ propGroup ] !== propsObject[propGroup] ) {
              updateCount ++;
              thisProperties[ propGroup ] = propsObject[propGroup];
              updated.push( `${propGroup} - ${propsObject[propGroup]}` ); 

            } else {
              unChangedCount ++;
              unchanged.push( `${propGroup} - ${propsObject[propGroup]}` ); 
            }

          } else {
            Object.keys( propsObject[propGroup] ).map ( thisProp => {

              // Check for explicitly blocked properties
              if ( propsObject[propGroup][thisProp] !== exportNotAvailMess && 
                  ( blockImports.length === 0 || indexOfAnyCase( thisProp , blockImports , true, false ) < 0 ) ) {

                // Check for whitelist of valid props
                if ( validImports.length === 0 || indexOfAnyCase( thisProp , validImports , true, false ) >= 0 ) {

                  if ( thisProperties[ thisProp ] !== propsObject[propGroup][thisProp] ) {
                    updateCount ++;
                    thisProperties[ thisProp ] = propsObject[propGroup][thisProp];
                    updated.push( `${thisProp} - ${propsObject[propGroup][thisProp]}` ); 

                  } else {
                    unChangedCount ++;
                    unchanged.push( `${thisProp} - ${propsObject[propGroup][thisProp]}` ); 
                  }

                } else {
                  console.log( 'importProps - invalid prop',thisProp, propsObject[propGroup][thisProp] );
                  notAcceptCount ++;
                  notAccepted.push( `${thisProp} - ${propsObject[propGroup][thisProp]}` ); 
                }

              } else {
                console.log( 'importProps - blocked prop',thisProp, propsObject[propGroup][thisProp] );
                blockCount ++;
                blocked.push( `${thisProp} - ${propsObject[propGroup][thisProp]}` ); 
              }

            });
          }
        } else {
          //Added this to count blocked props https://github.com/mikezimm/SecureScript7/issues/77
          blockCount ++;
          blocked.push( `${propGroup} - ${propsObject[propGroup]}` ); 
        }
      });

      console.log('FPS Import Props: updated', updated );
      console.log('FPS Import Props: unchanged', unchanged );
      console.log('FPS Import Props: blocked', blocked );
      console.log('FPS Import Props: notAccepted', notAccepted );

      alert(`We just imported ${updateCount} settings, ${ unChangedCount } where unchanged, ${ blockCount } where blocked and ${ notAcceptCount } where not valid`);
    }
  }

  return { thisProps: thisProperties, importError: importError, errMessage: errMessage, updateCount: updateCount, blockCount: blockCount, notAcceptCount: notAcceptCount, unChanged: unChangedCount } ;

}
