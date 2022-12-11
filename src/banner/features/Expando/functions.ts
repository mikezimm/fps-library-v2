

import { IFPSWindowProps, } from '../FPSDOM/Interfaces';
import { createFPSWindowProps, } from '../FPSDOM/FPSDocument';

import { IPageLayoutType } from '../../../common/interfaces/@msft/1.15.2/layout';

import { findParentElementLikeThis } from '../../../logic/DOM/Search/domSearch';

export function setExpandoRamicMode ( domElement: HTMLElement, maximize : boolean, controlStyle: any, alertError: boolean = true, consoleResult: boolean = false, expandoPadding: number, host: IPageLayoutType  ) {

  let fpsWindowProps: IFPSWindowProps = createFPSWindowProps();

  /**
   * DO NOT UNCOMMENT THIS OUT... Currently causes it to open but not be able to collapse.
   */
  //If this was already attempted, then exit
  // if ( fpsWindowProps.expando.attempted === true ) { return; }
  // else if ( maximize !== true ) { return; }
  // else { fpsWindowProps.expando.attempted = true; }

  //Get the webparts parent control zone

  let searchParams = window.location.search ? window.location.search : '';
  searchParams = searchParams.split('%3a').join(':');

  //Had to add this just as a precaution.... 
  //the classnames change depending on if the page is in EditMode.
  //When in EditMode, they have single -, in View mode, the have --
  let findClass = searchParams.indexOf('Mode=Edit') > -1 ? ['ControlZone-control', 'ControlZone--control'] : ['ControlZone--control', 'ControlZone-control']

  let thisControlZome: any = null;
  let foundElement = false;
  findClass.map( checkClass => {
    if ( foundElement === false ) {
      thisControlZome = findParentElementLikeThis( domElement, 'classList', checkClass, 10 , 'contains', false, true );
      if ( thisControlZome ) { foundElement = true; }
    }
  });

  //Sets property of target element
  if ( host !== "SharePointFullPage" && thisControlZome ) { 
    if ( maximize === true ) {

      domElement.style.padding = `${expandoPadding}px`;

      thisControlZome.style['display'] = 'inline-block';
      thisControlZome.style['position'] = 'fixed';
      thisControlZome.style['top'] = '0%';
      thisControlZome.style['left'] = '0';
      thisControlZome.style['bottom'] = '0';
      thisControlZome.style['right'] = '0';
      thisControlZome.style['margin'] = 'auto';
      thisControlZome.style['width'] = '100%';
      thisControlZome.style['background-color'] = 'white';
      thisControlZome.style['overflow-y'] = 'scroll';
      thisControlZome.style['z-index'] = '12';

      if ( !controlStyle || controlStyle.length === 0) {

        thisControlZome.style['background'] = 'lightgray';

        if ( consoleResult === true || alertError === true ) {
          console.log('FPS Expandoramic:  mode = default && true:');
        }

      } else {

        try {

          //Original code where it parses it in the banner
          // let styles = JSON.parse ( controlStyle );
          // Object.keys( styles ).map( key => {
          //   thisControlZome.style[key] = styles[key];
          // });

          // if ( consoleResult === true || alertError === true ) {
          //   console.log('FPS Expandoramic:  mode = true, custom styles:');
          //   console.log(styles);
          // }

          //Updated code where it parses it in the main webpart class
          Object.keys( controlStyle ).map( key => {
            thisControlZome.style[key] = controlStyle[key];
          });

          if ( consoleResult === true || alertError === true ) {
            console.log('FPS Expandoramic:  mode = true, custom styles:');
            console.log(controlStyle);
          }

        } catch (e) {

            console.log('FPS ERROR:  Unable to parse expandoRamicMode controlStyle:');
            console.log(controlStyle);
            if ( alertError === true ) {
              alert(`FPS ERROR: controlStyle is not valid ${controlStyle}`);
            }
        }

      }

    } else if ( maximize === false ) {

      domElement.style.padding = '';
      thisControlZome.style['display'] = null;
      thisControlZome.style['position'] = null;
      thisControlZome.style['top'] = null;
      thisControlZome.style['left'] = null;
      thisControlZome.style['bottom'] = null;
      thisControlZome.style['right'] = null;
      thisControlZome.style['margin'] = null;
      thisControlZome.style['width'] = null;
      thisControlZome.style['background-color'] = null;
      thisControlZome.style['overflow-y'] = null;
      thisControlZome.style['z-index'] = null;

      if ( consoleResult === true || alertError === true ) {
        console.log('FPS Expandoramic:  mode = default && FALSE:');
      }
    }
  } else if ( host === "SharePointFullPage" || host === "SingleWebPartAppPageLayout" ) { //Assume this is a single page app

    let parentElement = domElement.parentElement;

    if ( !parentElement ) {
        console.log('FPSExpandoramic unable to detect a parent element.');

    } else if ( maximize === true ) {

        //https://www.javascripttutorial.net/javascript-dom/javascript-width-height/
        let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        console.log('FPSExpandoramic Width calculated as ', width );
        //SharePoint seems to add the left app bar as a bar when the width is > 1,000 px.
        if ( width > 1000 ) {
            parentElement.style['left'] = '48px'; //Best size for app bar on left
            //https://www.w3schools.com/cssref/func_calc.asp
            // parentElement.style['width'] =  `calc(100% - 96px)`;
            parentElement.style['z-index' as any] = `10`;  //Push back when maximized and wide so it is behind the app bar menu.
            
            //Set SuiteNavWrapper behind the parentElement so it's hidden.
            let SuiteNavWrapper = document.getElementById("SuiteNavWrapper");
            if ( SuiteNavWrapper ) {
                SuiteNavWrapper.style.zIndex = `${9}`; //SuiteNavWrapper is normally at 12 for 1080p testing
            }
        } else { 

            parentElement.style['z-index' as any ] = '12';
            parentElement.style['left'] = '0px'; //Best size for app bar on left

        }

        // This works great for showing the app bar with no padding
        parentElement.style.padding = `${expandoPadding}px`; //`${0}px`;
        parentElement.style['position'] = 'fixed';
        parentElement.style['top'] = '0px';
        parentElement.style['right'] = '0px'; //`${expandoPadding * 2}px`;  //Setting right and left to zero works but blocks the sp-App Bar

        parentElement.style['background-color' as any] = 'white';
        parentElement.style['overflow-y' as any] = 'scroll';
        // domElement.style['background'] = 'lightgray';

        parentElement.style['height'] = '100%';


      //Updated code where it parses it in the main webpart class
      Object.keys( controlStyle ).map( ( key: number | string ) => {
        domElement.style[ key as any ] = controlStyle[ key ];
      });

      if ( consoleResult === true || alertError === true ) {
        console.log('FPS Expandoramic:  mode = default && true:');
      }

    } else { //Set to normal mode

       //https://www.javascripttutorial.net/javascript-dom/javascript-width-height/
       let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

       console.log('FPSExpandoramic Width calculated as ', width );

       //SharePoint seems to add the left app bar as a bar when the width is > 1,000 px.
       if ( width > 1000 ) {
           //https://www.w3schools.com/cssref/func_calc.asp
           // parentElement.style['width'] =  `calc(100% - 96px)`;

           let SuiteNavWrapper = document.getElementById("SuiteNavWrapper");
           if ( SuiteNavWrapper ) {
               SuiteNavWrapper.style.zIndex = "12"; //SuiteNavWrapper is normally at 12 for 1080p testing
           }
       } else { 

       }

        parentElement.style['top'] = '';
        parentElement.style['width'] = '';

        parentElement.style['position'] = '';
        parentElement.style['background-color' as any] = 'null';
        parentElement.style['overflow-y' as any] = 'null';
        parentElement.style[`z-index` as any] = 'null';
        parentElement.style['background'] = '';

        parentElement.style['height'] = '';
    }

  }

}

/**

style {
  display: inline-block;
  position: fixed;
  top: 0%;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  overflow-y: scroll;
  z-index: 12;
}

 */