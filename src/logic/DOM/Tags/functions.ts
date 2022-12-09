/**
 * FROM:  src\Services\DOM\Tags\FPSTagFunctions.ts
 */

/**
 * Updated from FPSPage Info 2022-07-27.
 */

 import { IFPSHeadingClass } from '../Headings/Interfaces';
 import { IRegExTag } from './Interfaces';
 
 export type IFPSKnownStyleClasses = IFPSHeadingClass | string;
 
 export function FPSApplyTagCSSAndStyles ( applyTag: IRegExTag, cssText : string, applyClass : IFPSKnownStyleClasses[], alertError: boolean = true, consoleResult: boolean = false,  ) {
   const startTime = new Date();
   let classChanges: any[] = [];
 
   if ( applyTag ) {
     // for (let iteration = 0; iteration < 10000; iteration++) { //Tested this loop on longer page 10,000 times and on my pc took 218 ms.  Was noticable to see old and new
     for (let iteration = 0; iteration < 1; iteration++) {
 
       //Loop through all the tags to find
       applyTag.tags.map( tag => {
 
         //Get all elements with this tag
         let nodeList = document.getElementsByTagName( tag );
         if ( consoleResult && iteration === 0 ) console.log( 'FPSApplyTagCSSAndStyles found Elements:', tag, nodeList );
 
         //Loop through all elements for this tag
         if ( nodeList && nodeList.length > 0 ) {
           for (let i = 0; i < nodeList.length; i++) {
             const ele: any = nodeList[i];
             classChanges.push( ele.innerHTML );
             applyClass.map(  thisClass => {
               if ( !ele.classList.contains( thisClass ) )  {
                 ele.classList.add( thisClass ) ;
               }
             });
             if ( ele.style ) {
               ele.style.cssText += cssText;
             } else {
               ele.style.cssText = cssText;
             }
             classChanges.push( ele.innerHTML );
           }
         }
       });
     }
 
     const endTime = new Date();
     if ( consoleResult ) console.log('FPSApplyHeadingCSS time to apply styles:', endTime.getTime() - startTime.getTime() , applyTag, cssText, applyClass,  );
 
   } else {
     console.log( 'FPSApplyTagCSSAndStyles - ERROR, applyTag is undefined or null!' );
   }
 
 }
 