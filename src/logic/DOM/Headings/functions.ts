import { IMinHeadingStyleProps, IFPSHeadingClass } from './Interfaces';
import { FPSApplyTagCSSAndStyles } from '../Tags/functions';
import { HTMLRegEx,  } from '../Tags/regexHtmlTags';
import { IRegExTag } from '../Tags/Interfaces';

// This needs to be moved downstream
// require('@mikezimm/fps-styles/dist/FPSHeadings.css');

/**
 * Processes web part prop heading props and preps to update h2, h3, h4 tag styles.  NOTE SharePoint does not have h1 on the page.
 * @param wpProps 
 */
export function  applyHeadingCSS( wpProps: IMinHeadingStyleProps, ): void {

    if ( wpProps.h1Style ) {
      let pieces : any[] = wpProps.h1Style.split(';');
      let classes: IFPSHeadingClass[] = [];
      let cssStyles: string[] = [];
      pieces.map( piece => {
        piece = piece.trim();
        if ( piece.indexOf('.') === 0 ) { classes.push( piece.replace('.','') ) ; } else { cssStyles.push( piece ) ; }
      });
//FPSApplyTagCSSAndStyles
      if ( cssStyles.length > 0 || classes.length > 0 ) FPSApplyTagCSSAndStyles( HTMLRegEx.h2 as IRegExTag, cssStyles.join( ';' ) , classes, true, false, );
    }

    if ( wpProps.h2Style ) {
      let pieces : any[]  = wpProps.h2Style.split(';');
      let classes: IFPSHeadingClass[] = [];
      let cssStyles: string[] = [];
      pieces.map( piece => {
        piece = piece.trim();
        if ( piece.indexOf('.') === 0 ) { classes.push( piece.replace('.','') ) ; } else { cssStyles.push( piece ) ; }
      });

      if ( cssStyles.length > 0 || classes.length > 0 ) FPSApplyTagCSSAndStyles( HTMLRegEx.h3 as IRegExTag, cssStyles.join( ';' ) , classes, true, false, );

    }

    if ( wpProps.h3Style ) {
      let pieces : any[]  = wpProps.h3Style.split(';');
      let classes: IFPSHeadingClass[] = [];
      let cssStyles: string[] = [];
      pieces.map( piece => {
        piece = piece.trim();
        if ( piece.indexOf('.') === 0 ) { classes.push( piece.replace('.','') ) ; } else { cssStyles.push( piece ) ; }
      });

      if ( cssStyles.length > 0 || classes.length > 0 ) FPSApplyTagCSSAndStyles( HTMLRegEx.h4 as IRegExTag, cssStyles.join( ';' ) , classes, true, false, );

    }
  }


  /**
 * This actually Applies CSS to html page headings h2, h3, h4 per web part props.  NOTE SharePoint does not have h1 on the page.
 * @param applyTag 
 * @param applyClass 
 * @param alertError 
 * @param consoleResult 
 */

export function FPSApplyHeadingCSS ( applyTag: IRegExTag, applyClass : IFPSHeadingClass[], alertError: boolean = true, consoleResult: boolean = false  ): void {
  const startTime = new Date();
  let classChanges: any[] = [];

  // for (let iteration = 0; iteration < 10000; iteration++) { //Tested this loop on longer page 10,000 times and on my pc took 218 ms.  Was noticable to see old and new
  for (let iteration = 0; iteration < 1; iteration++) {

    //Loop through all the tags to find
    applyTag.tags.map( tag => {

      //Get all elements with this tag
      let nodeList = document.getElementsByTagName( tag );
      if ( consoleResult && iteration === 0 ) console.log( 'FPSApplyHeadingCSS found Elements:', tag, nodeList );

      //Loop through all elements for this tag
      if ( nodeList && nodeList.length > 0 ) {
        for (let i = 0; i < nodeList.length; i++) {
          const ele = nodeList[i];
          classChanges.push( ele.innerHTML );
          applyClass.map(  thisClass => {
            if ( !ele.classList.contains( thisClass ) )  {
              ele.classList.add( thisClass ) ;
            }
          });
        }
      }
    });
  }

  const endTime = new Date();
  if ( consoleResult ) console.log('FPSApplyHeadingCSS time to apply styles:', endTime.getTime() - startTime.getTime() , applyTag, applyClass );

}

export function FPSApplyHeadingStyle ( applyTag: IRegExTag, cssText : string, alertError: boolean = true, consoleResult: boolean = false ): void {
  const startTime = new Date();
  let classChanges: any[] = [];

  for (let iteration = 0; iteration < 1; iteration++) {

    //Loop through all the tags to find
    applyTag.tags.map( tag => {

      //Get all elements with this tag
      let nodeList = document.getElementsByTagName( tag );
      if ( consoleResult && iteration === 0 ) console.log( 'FPSApplyHeadingCSS found Elements:', tag, nodeList );

      //Loop through all elements for this tag
      if ( nodeList && nodeList.length > 0 ) {
        for (let i = 0; i < nodeList.length; i++) {
          const ele: any = nodeList[i];
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
  if ( consoleResult ) console.log('FPSApplyHeadingStyle time to apply styles:', endTime.getTime() - startTime.getTime() , applyTag, cssText, classChanges );

}
