import * as React from 'react';

import { Link, } from 'office-ui-fabric-react';
import { getHelpfullErrorV2, IHelpfullOutput } from '../../../logic/Errors/friendly';


/**
 *  Blogs
 */
export const blogSPTimeZone = createLink( 'https://sharepointmaven.com/sharepoint-time-zone/','_blank', 'Set your SharePoint Time-Zone' );

export function createRepoLinks(href: string, target: string, linkDesc: string){
    return {
        repo: createLink( href, target, linkDesc + ' on Github' ),
        issues: createLink( href + '/issues', target, linkDesc + " Issues" ),
        wiki: createLink( href + '/wiki', target, linkDesc + " Wiki" ),
        projects: createLink( href + '/projects', target, linkDesc + " Projects" ),        
        href: href,
        target: target,
        desc: linkDesc,
    };
}

export function createLink(href: string, target: string, linkDesc: string, styles?: any ){
    return (
        <Link style={ styles } href={href} target={ target }>{ linkDesc }</Link>
    );
}


/**
 * This should be able to tell whether a SPO link is valid or not.
 * @param url
 * @param consoleLog 
 * @param extraMessage 
 * @returns 
 */
export async function _LinkIsValid(url: string, consoleLog : boolean = true, extraMessage: string = '' )
{
    //Require this is filled out.
    if ( !url ) { return false; }

    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    let isValid = true;
    let errMessage = '';
    try {
    
      await http.send();
      isValid = http.status!=404 ? true : false;
      if ( isValid === false && consoleLog === true ) {
        errMessage = `${extraMessage} Location does not seem to exist ~ 52:  ${url}`;
        console.log( errMessage );
      }

    }catch(e) {

      isValid = false;
      const HelpfulErrorOutput: IHelpfullOutput = getHelpfullErrorV2( e, false, true, '_LinkIsValid ~ 59', false );
      errMessage = HelpfulErrorOutput.returnMess;
      if ( consoleLog === true ) {
        console.log( `${extraMessage} Location does not seem to exist:  ${url}` );
        console.log( errMessage );

      }
    }

    return isValid === true ? '' : 'Link is not valid';
} 

/**
 * This is different from _LinkIsValid in that it returns the status... ie 404, 403, etc...
 * @param url 
 * @returns 
 */
export async function _LinkStatus( url: string)
{
    //Require this is filled out.
    if ( !url ) { return false; }

    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    let isValid: boolean | number = true;
    try {
      await http.send();
      isValid = http.status ? http.status : false;

    }catch(e) {
      isValid = false;
    }

    return isValid;
} 