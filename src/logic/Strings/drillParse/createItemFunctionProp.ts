import { DoNotExpandTrimB4, DoNotExpandTrimAfter, DoNotExpandTrimTimes } from '../../../pnpjs/Lists/getVX/IGetInterfaceV2';
import { ITrimTimes } from '../../../pnpjs/Lists/getVX/IGetInterfaceV2';
import { convertArrayToLC } from '../../../logic/Arrays/manipulation';

import { DidNotTrim } from './constants';
import { convertUTCTime } from "./convertUTCTime";
import { GetFirstWord, GetLastWord, getInitials } from "./getWords";
import { trimAfter } from "./trimAfter";
import { trimB4 } from "./trimB4";
import { getDetailValueType } from '../../Types/typeServices';
import { replaceHTMLEntities } from '../html';
import { checkDeepProperty } from '../../Objects/deep';

/***
 *     .o88b. d8888b. d88888b  .d8b.  d888888b d88888b      d888888b d888888b d88888b .88b  d88.
 *    d8P  Y8 88  `8D 88'     d8' `8b `~~88~~' 88'            `88'   `~~88~~' 88'     88'YbdP`88
 *    8P      88oobY' 88ooooo 88ooo88    88    88ooooo         88       88    88ooooo 88  88  88
 *    8b      88`8b   88~~~~~ 88~~~88    88    88~~~~~         88       88    88~~~~~ 88  88  88
 *    Y8b  d8 88 `88. 88.     88   88    88    88.            .88.      88    88.     88  88  88
 *     `Y88P' 88   YD Y88888P YP   YP    YP    Y88888P      Y888888P    YP    Y88888P YP  YP  YP
 *
 *
 *    d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db      d8888b. d8888b.  .d88b.  d8888b.
 *    88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88      88  `8D 88  `8D .8P  Y8. 88  `8D
 *    88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88      88oodD' 88oobY' 88    88 88oodD'
 *    88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88      88~~~   88`8b   88    88 88~~~
 *    88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888      88      88 `88. `8b  d8' 88
 *    YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P      88      88   YD  `Y88P'  88
 *
 *
 */

export function createItemFunctionProp(staticColumn: string, item: any, defaultValue: string | 'originalValue') {

  const DoNotExpandTrimB4LC = convertArrayToLC(DoNotExpandTrimB4);
  const DoNotExpandTrimAfterLC = convertArrayToLC(DoNotExpandTrimAfter);
  const DoNotExpandTrimTimesLC = convertArrayToLC(DoNotExpandTrimTimes);
  // const DoNotExpandColumnsLC = convertArrayToLC( DoNotExpandColumns );
  /**
   * MEMO TO SELF... WHere you left off...
   * Test here:  https://tenant.sharepoint.com/sites/SharePointLists/SitePages/Training-List---Drilldown-Sample.aspx?debug=true&noredir=true&debugManifestsFile=https%3A%2F%2Flocalhost%3A4321%2Ftemp%2Fmanifests.js
   *
   *  In this loop, the
   *  let isMultiSelect = typeof itemLeftSide === 'object' && Array.isArray( itemLeftSide ) === true ? true : false;
   */
  /**
* MEMO TO SELF... The problem here is that item [ splitCol[0] ] is AN ARRAY OF LOOKUP VALUES.... SO YOU HAVE TO LOOP THROUGH ALL OF THEM :(
* CURRENTLY itemLeftSide[ Role ] [ Department ] is undefined because you need to actually do something like:  itemLeftSide[ Role ] [ DepartmentCalc ] [ i ]
* BASICALLY Create an Array of values like I did somewhere else if it were multi-select
* Like arrValues = itemLeftSide[ Role ] [ DepartmentCalc ];
*/
  /**
   *
 
  if ( rightSide && DoNotExpandColumnsLC.indexOf( rightSide.toLowerCase() ) > -1 ) {
    // this column is a 'faux expanded column' used in Drilldown for Link Columns
 
    if ( splitCol.length === 3 ) {
      leftSide = [ splitCol[0], splitCol[1] ] ;
      //Added ternary to the update below for cases where the base column ( like person column is null or empty )
 
 
 
       stop here now ^^^^^ SEE NOTES ABOVE
 
      if ( item [ splitCol[0] ] ) {
        itemLeftSide =  item [ splitCol[0] ] [ splitCol[1] ] ;
 
      } else {
        itemLeftSide = null ;
      }
 
    }  else if ( splitCol.length === 2 ) {
      leftSide = [ splitCol[0] ] ;
      itemLeftSide = item [ splitCol[0] ] ;
    }
 
  } else {
    // baseSelectColumns.push(thisColumn);
    rightSide = '';
  }
  */
  let splitCol = staticColumn.split("/");
  let rightSide = splitCol[splitCol.length - 1];
  let leftSide: string[] = [];
  let itemLeftSide: any = null;

  /**
   * MEMO TO SELF... The problem here is that item [ splitCol[0] ] is AN ARRAY OF LOOKUP VALUES.... SO YOU HAVE TO LOOP THROUGH ALL OF THEM :(
   * CURRENTLY itemLeftSide[ Role ] [ Department ] is undefined because you need to actually do something like:  itemLeftSide[ Role ] [ DepartmentCalc ] [ i ]
   * BASICALLY Create an Array of values like I did somewhere else if it were multi-select
   * Like arrValues = itemLeftSide[ Role ] [ DepartmentCalc ];
   */
  /**
   * This is what lookup column looks like at this point:
   * Main column ('Role' is an array of objects)
   * Secondary columns (Title, DepartmentCalc are arrays of string)
   *
   * Role: Array(4)
       0: {odata.type: 'SP.Data.TrainingRolesListItem', odata.id: 'c5c603c4-73cf-407c-8a59-96da495a3687', Title: 'Coordinador de QMS', DepartmentCalc: 'Quality'}
       1: {odata.type: 'SP.Data.TrainingRolesListItem', odata.id: '1fb880e9-4bfa-4560-be4a-9b9290246f9d', Title: 'ING de cal Proveedores', DepartmentCalc: 'Other'}
       2: {odata.type: 'SP.Data.TrainingRolesListItem', odata.id: '252f0759-588b-4f94-b5f7-86030ea64cb6', Title: 'Ingeniero de Calidad', DepartmentCalc: 'Quality'}
       3: {odata.type: 'SP.Data.TrainingRolesListItem', odata.id: 'a3886af4-d85e-46aa-986b-764a2eba25f7', Title: 'Supervisor de Calidad', DepartmentCalc: 'Quality'}
       length: 4
       [[Prototype]]: Array(0)
     Role@odata.navigationLinkUrl: "Web/Lists(guid'7057e999-09a5-4044-9310-f1192153ee59')/Items(358)/Role"
     RoleDepartmentCalc: (2) ['Quality', 'Other']
     RoleId: (4) [7, 6, 5, 4]
     RoleTitle: (4) ['Coordinador de QMS', 'ING de cal Proveedores', 'Ingeniero de Calidad', 'Supervisor de Calidad']

     11:02 initial StaticColumn testing the value:  "Role/DepartmentCalc/initials"

     LeftSideItem would be RoleDepartmentCalc which is an array by this point.

   */
  if (splitCol.length === 3) {
    leftSide = [splitCol[0], splitCol[1]];
    //Added ternary to the update below for cases where the base column ( like person column is null or empty )
    if (item[splitCol[0]]) {
      itemLeftSide = item[splitCol[0] + splitCol[1]];

    } else {
      itemLeftSide = null;
    }

  } else if (splitCol.length === 2) {
    leftSide = [splitCol[0]];
    itemLeftSide = item[splitCol[0]];
  }

  let rightSideLC = rightSide ? rightSide.toLowerCase() : null;
  let newProp = leftSide.join('') + rightSide;
  let itemTypes: string[] = [];
  let newValuesArray: any[] = [];

  let detailType = getDetailValueType(itemLeftSide);

  let isMultiSelect = typeof itemLeftSide === 'object' && Array.isArray(itemLeftSide) === true ? true : false;

  //Added this to apply rules to multi-select items
  let arrayOfItemValues = isMultiSelect === true ? itemLeftSide : [itemLeftSide];

  //Get an array of all the individual item types (for multi-select items)
  if (isMultiSelect === true) {
    itemLeftSide.map((singleItem: any) => { itemTypes.push(getDetailValueType(singleItem)); });
  } else { itemTypes.push(detailType); }


  //Added this to apply rules to multi-select items
  arrayOfItemValues.map((singleItemValue: any, idx: number) => {

    let singleItemType = itemTypes[idx];

    //If this is singleItemValue is a string and length > 0, then apply the rules
    if (singleItemType.indexOf('string') > -1 && singleItemValue.length > 0) {
      let trimmedItem = singleItemValue.trim();

      //Handle all TrimB4
      if (DoNotExpandTrimB4LC.indexOf(rightSideLC) > -1) {
        singleItemValue = trimB4(trimmedItem, rightSideLC as any);

        //Handle all TrimAfter
      } else if (DoNotExpandTrimAfterLC.indexOf(rightSideLC) > -1) {
        let newValue = DidNotTrim;
        newValue = trimAfter(trimmedItem, rightSideLC as any);

        if (newValue !== DidNotTrim) { singleItemValue = newValue; }

        //Hanlde FirstWord
      } else if (rightSideLC === 'FirstWord'.toLowerCase()) {
        singleItemValue = GetFirstWord(trimmedItem, false, false, false);

        //Hanlde FirstWord
      } else if (rightSideLC === 'FirstWord2C'.toLowerCase()) {
        singleItemValue = GetFirstWord(trimmedItem, false, false, false);
        singleItemValue = singleItemValue.substring(0, 2);

        //Hanlde FirstWord
      } else if (rightSideLC === 'FirstWord3C'.toLowerCase()) {
        singleItemValue = GetFirstWord(trimmedItem, false, false, false);
        singleItemValue = singleItemValue.substring(0, 3);

        //Hanlde FirstWord
      } else if (rightSideLC === 'FirstWord4C'.toLowerCase()) {
        singleItemValue = GetFirstWord(trimmedItem, false, false, false);
        singleItemValue = singleItemValue.substring(0, 4);

        //Hanlde FirstWord
      } else if (rightSideLC === 'FirstWordNoNum2C'.toLowerCase()) {
        singleItemValue = GetFirstWord(trimmedItem, false, false, true);
        singleItemValue = singleItemValue.substring(0, 2);

        //Hanlde FirstWord
      } else if (rightSideLC === 'FirstWordNoNum3C'.toLowerCase()) {
        singleItemValue = GetFirstWord(trimmedItem, false, false, true);
        singleItemValue = singleItemValue.substring(0, 3);

        //Hanlde FirstWord
      } else if (rightSideLC === 'FirstWordNoNum4C'.toLowerCase()) {
        singleItemValue = GetFirstWord(trimmedItem, false, false, true);
        singleItemValue = singleItemValue.substring(0, 4);

        //Hanlde FirstWord
      } else if (rightSideLC === 'FirstWordNoNum'.toLowerCase()) {
        singleItemValue = GetFirstWord(trimmedItem, false, false, true);

        //Hanlde LastWord
      } else if (rightSideLC === 'LastWord'.toLowerCase()) {
        singleItemValue = GetLastWord(trimmedItem, false, false, false);

        //Hanlde LastWord
      } else if (rightSideLC === 'LastWordNoNum'.toLowerCase()) {
        singleItemValue = GetLastWord(trimmedItem, false, false, true);

        //Hanlde FirstWord
      } else if (rightSideLC === 'FirstLetter'.toLowerCase()) {
        singleItemValue = GetFirstWord(trimmedItem, false, true, false);

      } else if (rightSideLC === 'FirstLetterAsCap'.toLowerCase()) {
        singleItemValue = GetFirstWord(trimmedItem, true, true, false);

      } else if (rightSideLC === 'FirstInFirst'.toLowerCase()) {
        singleItemValue = GetFirstWord(trimmedItem, false, true, false);

      } else if (rightSideLC === 'FirstInFirstAsCap'.toLowerCase()) {
        singleItemValue = GetFirstWord(trimmedItem, true, true, false);

      } else if (rightSideLC === 'FirstInLast'.toLowerCase()) {
        singleItemValue = GetLastWord(trimmedItem, false, true, false);

      } else if (rightSideLC === 'FirstInLastAsCap'.toLowerCase()) {
        singleItemValue = GetLastWord(trimmedItem, true, true, false);

      } else if (rightSideLC === 'Initials'.toLowerCase()) {
        singleItemValue = getInitials(trimmedItem, false, false);

      } else if (rightSideLC === 'InitialsAsCaps'.toLowerCase()) {
        singleItemValue = getInitials(trimmedItem, true, false);

      } else if (rightSideLC === 'InitialsD'.toLowerCase()) {
        singleItemValue = getInitials(trimmedItem, false, true);

      } else if (rightSideLC === 'InitialsAsCapsD'.toLowerCase()) {
        singleItemValue = getInitials(trimmedItem, true, true);

      } else if (rightSideLC === 'FirstNumber'.toLowerCase()) {
        let firstNumber = trimmedItem.match(/(\d+)/);
        singleItemValue = firstNumber ? firstNumber[0] : '';

        // https://github.com/mikezimm/drilldown7/issues/147
        //  export type ITrimTimes = 'YYYY-MM-DD' | 'YYYY-MM' | 'HH:mm' | 'HH:mm:ss' | 'HH:mm_AM' | 'HH:mm:ss_AM' |  'Q1-YY' | 'YY-Q1' | 'YYYY-Q1' ;
      } else if (DoNotExpandTrimTimesLC.indexOf(rightSideLC) > -1) {
        singleItemValue = convertUTCTime(trimmedItem, rightSide as ITrimTimes);

        //  
      } else if (rightSideLC.indexOf('object.') === 0) {

        let objKeys = rightSide.slice(7).split('.');

        try {
          const isMultiLine = trimmedItem.indexOf('</div>') > 0 ? true : false;
          if (isMultiLine === true) {
            const firstGt = trimmedItem.indexOf('>') + 1;
            trimmedItem = trimmedItem.slice(firstGt).replace('</div>', '');
            trimmedItem = replaceHTMLEntities(trimmedItem);
          }
          let obj = JSON.parse(trimmedItem);
          singleItemValue = checkDeepProperty(obj, objKeys, 'Actual');

        } catch (e) {
          // singleItemValue = `${}`;
          singleItemValue = `Invalid object`;
        }


        // } else if ( rightSideLC === 'First象征' ) {
        //   let firstHan = testWord.match(/\p{Han}/gu);
        //   singleItemValue = firstHan ? firstHan[0] : ''; 
      }

      if (singleItemValue === '' && defaultValue !== 'originalValue') { singleItemValue = defaultValue; }

    } else { //Opposite of:  If this is singleItemValue is a string and length > 0, then apply the rules
    }

    newValuesArray.push(singleItemValue);

  });

  if (isMultiSelect === true) {
    item[newProp] = newValuesArray;
  } else {
    item[newProp] = newValuesArray[0];
  }

  return { item: item, isMultiSelect: isMultiSelect };

}
