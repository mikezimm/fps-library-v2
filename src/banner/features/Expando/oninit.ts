
import { DisplayMode } from '@microsoft/sp-core-library';
import { IMinBannerUtilityProps } from '../../interfaces/Banner/IMinBannerUtilityProps';

import { setExpandoRamicMode } from "./functions";
import { IMinPandoramicProps,  } from './Interfaces';  //thisProps: IMinPandoramicProps, 

//Use this to add more console.logs for this component
const urlParams : URLSearchParams = new URLSearchParams( window.location.search );
const fpsconsole : boolean = urlParams.get( 'fpsconsole' ) === 'true' ? true : false;
const consolePrefix : string = 'fpsconsole: expandoOnInit';

export interface IExpandoRelatedProps extends IMinPandoramicProps, IMinBannerUtilityProps {

}

export function expandoOnInit( thisProps:  IExpandoRelatedProps, domElement: HTMLElement, displayMode:  DisplayMode, ) {

    if ( fpsconsole === true ) console.log( `${consolePrefix} ~  23: webpart props:`, thisProps, );

    // DEFAULTS SECTION:  Expandoramic   <<< ================================================================
    let expandoDefault: boolean = thisProps.expandoDefault === true && thisProps.enableExpandoramic === true && displayMode === DisplayMode.Read ? true : false;

    if ( displayMode === DisplayMode.Edit ) { expandoDefault = false; }

    let expandoStyle: any = {};
    //2022-04-07:  Could use the function for parsing JSON for this... check npmFunctions
    try {
        expandoStyle = JSON.parse( thisProps.expandoStyle );
    } catch(e) {
        console.log('Unable to expandoStyle: ', thisProps.expandoStyle);
    }

    let padding = thisProps.expandoPadding ? thisProps.expandoPadding : 20;

    setExpandoRamicMode( domElement, expandoDefault, expandoStyle,  false, false, padding, thisProps.pageLayout  );

}
