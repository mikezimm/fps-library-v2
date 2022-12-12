
import * as React from 'react';
import { RegexHashNumber } from '../../../logic/Regex/constants';
import { INullOrStringArray, splitByHashNumbers } from '../../../logic/Strings/splitHash';
import { IRepoLinks } from '../Links/CreateLinks';

// import { IRepoLinks } from '../Links_/CreateLinks';

// import { RegexHashNumber, INullOrStringArray } from '../Services/Regex_/constants_';
// import { splitByHashNumbers } from '../Services/Regex_/functions_';

export function replaceHashNumStringWithRepoIssues( testString: string, repoLinks: IRepoLinks ) {
  //Replace any # with link to issue
  //First find all instances of # and digits
  let matches: INullOrStringArray = testString.match(RegexHashNumber);  //Should get array of all values like #3, #43. etc
  let createSpans: string[] = splitByHashNumbers( testString, matches ); // Gets full array of strings including #3 and everything in between
  
  let spans: any[] = [];
  createSpans.map( thisSpan => {
      if ( matches !== null && matches.indexOf( thisSpan ) > - 1) {  //Then replace text with  link
          // spans.push( `<<${thisSpan}>>` );
          spans.push( <a href={`${repoLinks.href}/issues/${ thisSpan.substr(1)}`} target="_blank">{thisSpan}</a> );
      } else { //Just push text
          spans.push( `${thisSpan}` );
      }
  });

  return spans;

}

export function convertIssuesMarkdownStringToSpan( str: string, repoLinks: IRepoLinks | null ){
    
    let StringOrLinkedSpan: any = null;
    if ( str && typeof str === 'string' && repoLinks !== null && str.indexOf('#') > -1 ) {
        StringOrLinkedSpan = <span>
            { replaceHashNumStringWithRepoIssues( str, repoLinks ) }
        </span>;

    } else { 
        StringOrLinkedSpan = str;
    }
    return StringOrLinkedSpan;

}