// import * as React from 'react';
// import { Icon, IIconProps  } from 'office-ui-fabric-react/lib/Icon';

// // import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
// import { Stack, IStackTokens } from 'office-ui-fabric-react';
// import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

// import { NoCommandsInfo } from './noCommandsInfo';
// import { IDrillItemInfo } from '../../../interfaces/Drilldown/IDrillItem';
// import { getHelpfullError } from '../../../../logic/Errors/friendly';
// import { IQuickCommandsDesign } from '../../FieldPanel/components/command/IAccordion';
// import { IUser } from '../../../../pnpjs';
// import { IQuickButton } from '../../../interfaces/QuickCommands/IQuickCommands';
// import { defaultBannerCommandStyles } from '../../../../common/commandStyles/defaults';

// /**
//  * 
//  * @param quickCommands 
//  * @param item 
//  * @param sourceUserInfo  //This is just passed in in order to allow for user targeted b.showWhenEvalTrue checks
//  */
// export function createPanelButtonsV1 ( quickCommands: IQuickCommandsDesign, item: IDrillItemInfo , sourceUserInfo: IUser, _panelButtonClicked: any, delim: string ) {

//     let allButtonRows : any[] = [];

//     //Adjusted per:  https://github.com/mikezimm/drilldown7/issues/211
//     if ( !quickCommands || !quickCommands.buttons || quickCommands.buttons.length === 0 ) { 
//         return NoCommandsInfo;

//     } else {

//         let buildAllButtonsTest = true;
//         if ( quickCommands.showWhenEvalTrue && quickCommands.showWhenEvalTrue.length > 0 ) {

//             //2022-01-18:  Added Try catch when testing and found my typed in quick command had error.
//             try {
//                 buildAllButtonsTest = eval( quickCommands.showWhenEvalTrue );
            
//                 if ( buildAllButtonsTest === true ) {
//                     //build all the buttons ( subject to individual button checks )
//                 } else { buildAllButtonsTest = false; }
//             } catch (e) {
//                 buildAllButtonsTest = false;
//                 let errMessage = getHelpfullError(e, false, false);
//                 console.log(`ERROR:  createPanelButtons: quickCommands.showWhenEvalTrue !!!`, quickCommands.showWhenEvalTrue);
//                 console.log(`ERROR:  createPanelButtons: quickCommands.showWhenEvalTrue Error Details`, errMessage);

//                 alert(`createPanelButtons: quickCommands.showWhenEvalTrue error !!! Check the console for details:   ${quickCommands.showWhenEvalTrue}`);
//             }

//         }

//         if ( buildAllButtonsTest === true ) {
//             quickCommands.buttons.map( (buttonRow, r) => {

//                 if ( buttonRow && buttonRow.length > 0 ) {
//                   let rowResult : any = null;
//                   const buttons : any[] = [];

//                     buttonRow.map( (b: IQuickButton,i: number) => {

//                         let buildThisButton = true;

//                         /**
//                          * showWhenEvalTrue must be run in the context of this section of code to be valid.
//                          */

//                         if ( b.showWhenEvalTrue && b.showWhenEvalTrue.length > 0 ) {

//                             //2022-01-18:  Added Try catch when testing and found my typed in quick command had error.
//                             try {
//                               const buildButtonTest = eval( b.showWhenEvalTrue );
//                                 if ( buildButtonTest === true ) {
//                                     //build all the buttons
//                                 } else { buildThisButton = false; }
//                             } catch (e) {
//                               const errMessage = getHelpfullError(e, false, false);
//                                 console.log(`createPanelButtons: b[${i}].showWhenEvalTrue error !!!`, b.showWhenEvalTrue);
//                                 console.log(`createPanelButtons: b[${i}].showWhenEvalTrue Error Details`, errMessage);

//                                 alert(`createPanelButtons: quickCommands.showWhenEvalTrue error !!! Check the console for details:   ${quickCommands.showWhenEvalTrue}`);
//                             }

//                         }

//                         if ( buildThisButton === true ) {

//                           const buttonStyles: React.CSSProperties = b.styleButton ? b.styleButton as React.CSSProperties :  { minWidth: buttonRow.length === 1 ? '350px' : '', padding: '25px', marginBottom: '10px', fontSize: 'larger' };

//                           //Tried adding 
//                           // const IconElement = b.icon ? <Icon iconName= { 'Emoji2' } style={ defaultBannerCommandStyles }/> : undefined;
//                           const buttonID = ['ButtonID', r, i , item.Id].join(delim);
//                           const buttonTitle = b.label;
//                           // const iconName: string = b.icon;
//                           const buttonIcon : IIconProps = { iconName: b.icon, style: defaultBannerCommandStyles }
//                           const thisButton = b.primary === true ?

//                             //Tried adding  iconName into Primary Button, does not work,
//                             //Tried adding IconElement into icon Props, can't see it.
//                             //Tried adding Icon Element into the div next to Primary button and could see it.
//                             //
//                                 <div id={ buttonID } title={ buttonTitle } >
//                                   <PrimaryButton style= { buttonStyles } iconProps= { buttonIcon } text={b.label} onClick={_panelButtonClicked} disabled={b.disabled} checked={b.checked} /></div>:

//                                   <div id={ buttonID } title={ buttonTitle } >
//                                     <DefaultButton style= { buttonStyles } iconProps= { buttonIcon } text={b.label} onClick={_panelButtonClicked} disabled={b.disabled} checked={b.checked} /></div>;

//                             buttons.push( thisButton );
//                         }

//                     }); //END buttonRow.map( (b,i) => {

//                     const stackQuickCommands: IStackTokens = { childrenGap: 10 };
//                     rowResult = <Stack horizontal={ true } tokens={stackQuickCommands}>
//                         {buttons}

//                     </Stack>;

//                     const styleRows: any = {paddingBottom: 10};
//                     if ( quickCommands.styleRow ) {
//                         try {
//                             Object.keys(quickCommands.styleRow).map( k => {
//                                 styleRows[k] = quickCommands.styleRow[k];
//                             });
//                         } catch (e) {
//                             alert( `quickCommands.styleRow is not valid JSON... please fix: ${quickCommands.styleRow}` );
//                         }
//                     }
//                     allButtonRows.push( <div style={ styleRows }> { rowResult } </div> );


//                 } //END   if ( buttonRow && buttonRow.length > 0 ) {

//             }); //END  quickCommands.buttons.map( (buttonRow, r) => {
//             allButtonRows.push( <Icon iconName= { 'Emoji2' } style={ { fontSize: '24px', } }/> );
            
//         } //END   if ( buildAllButtonsTest === true ) {


//     }

//     return allButtonRows;

// }
