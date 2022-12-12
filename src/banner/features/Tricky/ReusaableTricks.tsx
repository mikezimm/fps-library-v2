import * as React from 'react';
import { IHelpTable } from '../../components/SingleHelpPage/ISinglePageProps';


//import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../Component/ISinglePageProps';
// import { IHelpTable, } from '../HelpPanelOnNPM/banner/SinglePage_/ISinglePageProps';

/**
 * tricksTable creates table of "tricks" which provide url paramters to reload the page in different modes
 * Originally copied from FPSPageInfo
 * const showScenario, showTool, showGulp, showAllowOther, showCrazy, showCreate: boolean = true;
 * @param showScenario 
 * @param showTool 
 * @param showGulp 
 * @param showAllowOther 
 * @param showCrazy 
 * @param showCreate 
 * @returns 
 */

export function tricksTable( showScenario: boolean, showTool: boolean, showGulp: boolean, showAllowOther: boolean, showCrazy: boolean, showCreate: boolean, ) {

    let table : IHelpTable  = {
        heading: 'Undocumented and dangerous url parameters',
        headers: ['Param','Value','Active?', 'Notes'],
        rows: [],
    };

    let hasSearch = window.location.search && window.location.search.length > 0 ? true : false;
    let searchParams = hasSearch === true ? window.location.search : '';

    searchParams = searchParams.split('%3a').join(':');
    let hasSearchParams = searchParams.length > 0 ? '&' : '?';

    if ( showScenario === true ) {
        let hasScenarioDev = searchParams.indexOf('scenario=dev') > -1 
            ? makeCenteredBoldSpan( 'true' )
            : makeCenteredBoldSpan (<a href={ window.location + hasSearchParams + 'scenario=dev' }>Activate!</a> ) ;
        table.rows.push( [ makeCenteredSpan('scenario'), makeCenteredSpan('dev'), hasScenarioDev, <span>Opens up additional options - 'Rails Off' meaning limited safety checks. </span>] );
    }

    if ( showTool === true ) {
        let hasToolTrue = searchParams.indexOf('tool=true') > -1 
            ? makeCenteredBoldSpan( 'true' ) 
            : makeCenteredBoldSpan (<a href={ window.location + hasSearchParams + 'tool=true' }>Activate!</a> ) ;
        table.rows.push( [ makeCenteredSpan('tool'), makeCenteredSpan('true'), hasToolTrue,    <span>Displays commandbar in some webparts if it's hidden. </span>] );
    }

    if ( showGulp === true ) {
        //Just replacing : with encoded url based on testing.
        let gulpParam1 = 'debug=true&noredir=true&debugManifestsFile=https://localhost:4321/temp/manifests.js';
        let gulpParam2 = 'debug=true&noredir=true&debugManifestsFile=https%3A%2F%2Flocalhost%3A4321%2Ftemp%2Fmanifests.js';

        let hasGulp = searchParams.indexOf( gulpParam1 ) > -1 || searchParams.indexOf( gulpParam2 ) > -1 
            ? makeCenteredBoldSpan('true') 
            : makeCenteredBoldSpan (<a href={ window.location + hasSearchParams + gulpParam1 }>Activate!</a> ) ;

        table.rows.push( [ makeCenteredSpan('gulp serve'), makeCenteredSpan('dev'), hasGulp,    <span>Adds param to Url to use gulp serve code instead of published code</span>] );
    }

    if ( showAllowOther === true ) {
        let hasAllowOther = searchParams.indexOf('allowOtherSites=true') > -1 
            ? makeCenteredBoldSpan('true') 
            : makeCenteredBoldSpan (<a href={ window.location + hasSearchParams + 'allowOtherSites=true' }>Activate!</a> ) ;
        table.rows.push( [ makeCenteredSpan('allowOtherSites'), makeCenteredSpan('true'), hasAllowOther,   <span>Allows you to do some 'Rails Off' functions on other sites { '' } </span>] );

    }

    if ( showCrazy === true ) {
        let hasCrazy = searchParams.indexOf('crazy=true') > -1 ?  
        makeCenteredBoldSpan('true') : '' ;
        table.rows.push( [ makeCenteredSpan('crazy'), makeCenteredSpan('true'), hasCrazy,   <span>Opens up additional even more options - 'DO NOT USE UNLESS YOU KNOW WHAT YOU ARE DOING'.</span>] );
    }

    if ( showCreate === true ) {
        let hasCreate = searchParams.indexOf('create=true') > -1 ?  
        makeCenteredBoldSpan('true') : '' ;
        table.rows.push( [ makeCenteredSpan('create'), makeCenteredSpan('true'), hasCreate,   <span>Opens up additional options - create sample items in lists</span>] );
    }

    const showBare: boolean = true;
    if ( showBare === true ) {
        let bareLink = hasSearch ?  
        makeCenteredBoldSpan (<a href={ window.location.pathname }>Activate!</a> ) :
        makeCenteredBoldSpan('true');
        table.rows.push( [ makeCenteredSpan('clearParams'), makeCenteredSpan( `${hasSearch}` ), bareLink,   <span>Reload without any parameters (wwwthing after the ? in the url ) </span>] );
    }

    return { table: table };

}

export function makeCenteredSpan( info: any ) {
    return { info: info, style: { textAlign: 'center'} } ;
}

export function makeCenteredBoldSpan( info: any ) {
    return { info: info, style: { textAlign: 'center', fontWeight: 'bolder' } } ;
}