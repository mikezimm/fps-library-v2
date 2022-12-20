

import { getHelpfullError,  } from "../../../../logic/Errors/friendly";
import { IUser, } from "../../../../logic/Users/IUserInterfaces";
import { removeItemFromArrayAll } from "../../../../logic/Arrays/manipulation";
import { IDrillItemInfo } from "../../../interfaces/Drilldown/IDrillItem";
import { CommandCancelRequired, CommandEmptyCommentMessage, CommandEnterCommentString, CommandItemNotUpdatedMessage, CommandUpdateFailedMessage, IQuickButton } from "../../../interfaces/QuickCommands/IQuickCommands";
import { getInitials } from "../../../../logic/Strings/drillParse/getWords";
import { IUpdateCommandItemProps, IUpdateCommandItemReturn, updateCommandItems } from "../../../../pnpjs/CommandItems/updateItem";
// import { getInitials } from "office-ui-fabric-react";

// EVENTUALLY MOVE THIS TO npmFunctions
export const CaptchaRegex = /{{|captcha[\^]?|}}|=|\?/g;

//MOVE TO IQuickCommands in npmFunctions
export const CommandCaptchaTestFailed : string = 'Failed Captcha test.  Not saving';
export const CommandCaptchaRequiredFailed : string = 'Failed Captcha test - item missing comparison.  Not saving';

export async function updateReactListItem(webUrl: string, listName: string, Id: number, thisButtonObject: IQuickButton, sourceUserInfo: IUser, panelItem: IDrillItemInfo): Promise<IUpdateCommandItemReturn> {
  //lists.getById(listGUID).webs.orderBy("Title", true).get().then(function(result) {
  //let allItems : IDrillItemInfo[] = await sp.web.webs.get();


  const currentTime = new Date().toLocaleString();

  // let results : any[] = [];


  let failedRequiredUpdate: any = false;
  let failedCaptchaTest: any = false;
  let failedCaptchaRequired: any = false;
  let failureMessage: string[] = [];

  let newUpdateItem = JSON.stringify(thisButtonObject.updateItem);

  //Replace [Today] with currect time
  newUpdateItem = newUpdateItem.replace(/\B\[Today\]\B/gi, currentTime);

  //Regex looks for anything matching [Today-+xxx] and replaces with date string
  var newUpdateItem2 = newUpdateItem.replace(/\[Today(.*?)\]/gi, (match => {
    let numb = parseInt(match.toLowerCase().substring(6).replace("]", ""), 10);
    const today = new Date();
    var newdate = new Date();
    newdate.setDate(today.getDate() + numb);
    let newDateString = newdate.toLocaleString();
    return newDateString;
  }));

  // Fix https://github.com/mikezimm/drilldown7/issues/225
  // Replace [MyName] with userId.Title
  newUpdateItem2 = sourceUserInfo && sourceUserInfo.Title ? newUpdateItem2.replace(/\[MyName\]/gi, sourceUserInfo.Title) : newUpdateItem2;

  let newUpdateItemObj = JSON.parse(newUpdateItem2);

  //Replace [Me]
  Object.keys(newUpdateItemObj).map(k => {
    let thisColumn: any = newUpdateItemObj[k];
    if (typeof thisColumn === 'string') {
      const thisColumnLC = thisColumn?.toLowerCase();
      //Single value set to current user
      // const CommentCommands = [ 'append rich text', 'new rich text', 'append rich stamp', 'new rich stamp'  ].map( ( cmd: string ) => { return cmd.toLowerCase() });
      const isSpecial = thisColumnLC.indexOf('{{') === 0 && thisColumnLC.indexOf('}}') > 2 ? true : false;

      if (isSpecial === true) {

        const isCaptcha = thisColumnLC.indexOf('captcha') > 0 ? true : false; // Replaces current value if it doesn't find append

        if (isCaptcha === true) {
          //Get paramters from thisColumn, trim extra spaces, filter to only show elements with str length > 0
          const CaptchaSplit = thisColumn.split(CaptchaRegex).map((s: string) => { return s.trim(); }).filter((s) => { return s.length > 0; });
          if (CaptchaSplit.length === 2 || CaptchaSplit.length === 3) {
            const CaptchaCase = thisColumnLC.indexOf('captcha^') > 0 ? true : false;

            const RequiredField: any = CaptchaSplit[0] === '*' ? true : false; //Checks if there is an * after the captcha.  If so, that field MUST have a value to test against
            const InternalName: string = CaptchaSplit[RequiredField === true ? 1 : 0].replace(`/`, '');
            const TextPrompt: string = CaptchaSplit[RequiredField === true ? 2 : 1] ? CaptchaSplit[RequiredField === true ? 2 : 1] : `Please confirm you are human`;

            if (panelItem[InternalName]) { // column was deteched proceed with test

              if (typeof panelItem[InternalName] === 'string') {
                let userComment = prompt(`CAPTCHA ${InternalName} - ${TextPrompt} ${CaptchaCase === true ? 'Case Sensitive!' : ''} - IS REQUIRED to Save' : '' }`, '');
                if (!userComment) { failedCaptchaTest = true; failureMessage.push(` You did not enter required Captcha in order to save.\n`); }
                else if (CaptchaCase === true && userComment !== panelItem[InternalName]) { failedCaptchaTest = true; failureMessage.push(`${userComment} did not match ${panelItem[InternalName]} ( proper cased )\n`); }
                else if (userComment.toLowerCase() !== panelItem[InternalName].toLowerCase()) { failedCaptchaTest = true; failureMessage.push(`${userComment} did not match ${panelItem[InternalName]}\n`); }
                if (failedCaptchaTest === false)
                  thisColumn = userComment;

              } else {
                console.log('CAPTCHA code ~ 240 - Item not string, not testing', panelItem[InternalName]);

              }

            } else if (RequiredField === true) { // Item does not have this value to compare to.... handle exception?
              failedCaptchaRequired = true;
              failureMessage.push(`This item did not have required Captcha requirements... ${InternalName}\n`);
            }

          } else {

            //This does not have correct syntax.
            failedCaptchaTest = true;
            failureMessage.push(`This button's Captcha requirements were not set up correctly.\n`);
          }


        } else {

          const makeNew = thisColumnLC.indexOf('append') < 0 ? true : false; // Replaces current value if it doesn't find append
          const addStamp = thisColumnLC.indexOf('stamp') > 1 ? true : false; // Replaces current value if it doesn't find append
          const requireComment = thisColumnLC.indexOf('require') > 1 ? true : false; // Will NOT save anything unless a valid comment is entered
          const detectedRich: unknown = panelItem[k] && panelItem[k].indexOf('<div class="ExternalClass') === 0 ? true : null; // Treats as rich text if finds rich
          const detectedPlain: unknown = panelItem[k] && panelItem[k].indexOf('<div class="ExternalClass') !== 0 ? true : null; // Treats as rich text if finds rich


          // If existing data says it's rich or plain, goes with that.  Else goes by command
          const makeRich = detectedRich === true ? true : detectedPlain === true ? false : thisColumnLC.indexOf('rich') > 1 ? true : false;

          const lineFeed = makeRich === true || detectedRich === true ? '<br>' : `\n`;

          let timeStamp: string = '';

          if (addStamp === true) { //Add User Intials and Date Stamp
            const userInitals = sourceUserInfo?.Title ? getInitials(sourceUserInfo.Title, true, false) : '';

            if (makeRich === true) {
              timeStamp = `<span style="font-weight:bold">${userInitals} - ${currentTime}</span>${lineFeed}`;

            } else {
              timeStamp = `${userInitals} - ${currentTime}${lineFeed}`;
            }
          }

          let userComment = prompt(`Add comment to:  ${k} - ${timeStamp ? 'Is auto-date-stamped :)' : ''} ${requireComment ? ' - IS REQUIRED to Save' : ''}`, '');
          if (requireComment === true && (userComment === CommandEnterCommentString || !userComment)) {
            failedRequiredUpdate = true;
            failureMessage.push(`You need to add a comment to save.\n`);
          }

          //https://github.com/mikezimm/drilldown7/issues/215
          if (makeRich === true)
            userComment = `<span>${userComment}</span>`;
          if (makeNew === false)
            userComment = `${userComment}${lineFeed}${lineFeed}`;

          console.log('timeStamp: ', timeStamp);

          console.log('userComment:', userComment);

          //If user presses 'Ok' and it's not required, use the default message.
          if (userComment === '')
            userComment = CommandEmptyCommentMessage;

          // https://github.com/mikezimm/drilldown7/issues/233
          if (userComment === CommandEnterCommentString) {
            //Later on if the value is the same then do not do anything.... like canceling this prompt
            thisColumn = CommandEnterCommentString;

          } else if (userComment && makeNew === false) { //Append else make new
            thisColumn = panelItem[k] ? `${timeStamp}${userComment}${lineFeed}${panelItem[k]}` : `${timeStamp}${userComment}`; // https://github.com/mikezimm/drilldown7/issues/215

          } else if (userComment) { thisColumn = `${timeStamp}${userComment}`; }

        } // else : ( isCaptcha === true ) {

        console.log('thisColumn:', thisColumn);

      } else if (thisColumnLC === '[me]') {
        thisColumn = sourceUserInfo.Id;
        console.log('thisColumn is: ', thisColumn);

        //Single value only remove you
      } else if (thisColumnLC === '[-me]') {
        thisColumn = panelItem[k] === sourceUserInfo.Id ? null : panelItem[k];

        //Multi value set to current user
      } else if (thisColumnLC === '{me}') {
        thisColumn = { results: [sourceUserInfo.Id] };

        //Multi value add current user
      } else if (thisColumnLC === '{+me}') {

        if (panelItem[k]) {
          try {
            //thisColumn = panelItem[k].results.push( sourceUserInfo.Id ); //Errored out
            thisColumn = panelItem[k];
            if (thisColumn.indexOf(sourceUserInfo.Id) < 0) { thisColumn.push(sourceUserInfo.Id); }
            thisColumn = { results: thisColumn };

          } catch (e) {
            let err = getHelpfullError(e);
            alert(`Error updating item Column ${k} : \n\n${err}`);
            console.log(`Error updating item Column ${k} :`, err);
          }
        } else {
          thisColumn = { results: [sourceUserInfo.Id] };
        }

        //Multi value remove current user
      } else if (thisColumnLC === '{-me}') {

        if (panelItem[k]) {
          try {
            thisColumn = panelItem[k];
            thisColumn = removeItemFromArrayAll(thisColumn, sourceUserInfo.Id);
            thisColumn = { results: thisColumn };

          } catch (e) {
            let err = getHelpfullError(e);
            alert(`Error updating item Column ${k} : \n\n${err}`);
            console.log(`Error updating item Column ${k} :`, err);
          }
        } {
          console.log(`Did not find Column ${k} and could not remove you from it.`, panelItem);
          console.log(`Here's the full panelItem:`, panelItem);
        }
      }

      // https://github.com/mikezimm/drilldown7/issues/233
      if (thisColumn !== CommandEnterCommentString)
        newUpdateItemObj[k] = thisColumn;
    } // END This key value is string
  });

  let errMessage: string = '';
  if (failedRequiredUpdate === true) {
    errMessage = `${CommandCancelRequired} - ${failureMessage.join('')}`;

  } else if (failedCaptchaTest === true) {
    errMessage = `${CommandCaptchaTestFailed} - ${failureMessage.join('')}`;

  } else if (failedCaptchaRequired === true) {
    errMessage = `${CommandCaptchaRequiredFailed} - ${failureMessage.join('')}`;

  } else if (Object.keys(newUpdateItemObj).length === 0) {
    errMessage = `${CommandItemNotUpdatedMessage} - ${failureMessage.join('')}`;
  }

  console.log('newUpdateItemObj', newUpdateItemObj);

  const updateProps: IUpdateCommandItemProps = {
    webUrl: webUrl,
    listTitle: listName,
    Id: Id,
    itemUpdate: newUpdateItemObj,
    alertMe: thisButtonObject.alert,
    consoleLog: thisButtonObject.console,
  }

  let result: IUpdateCommandItemReturn = null;
  if ( errMessage ) {
    result = {
      response: null,
      errorInfo: {
        returnMess: errMessage,
        friendly: errMessage,
        result: errMessage,
        errObj: errMessage,
      },
      errorInput: null,// Used for logging
      status: 'RuleBreak',
    }

  } else {
    result = await updateCommandItems( updateProps );
  }


  //  https://github.com/mikezimm/fps-library-v2/issues/14
  //  https://github.com/mikezimm/fps-library-v2/issues/16
  return result;

}
