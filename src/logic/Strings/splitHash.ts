/**
 * 2022-01-19
 * getStringArrayWithHashNumbers was originally built for Help Panel in Drilldown webpart.
 * The basic purpose is to be able to just type text and use #xx and  have it create link to github repo.
 * If you pass in a string, it will break it into an array of strings split by any #23 like github issues references.
 * 
 * @param testString - string to parse
 * @param matches - strings to parse the string by (like: ['#2','#23','#122'])
 */
 export type INullOrStringArray = null | string[];

export function splitByHashNumbers( testString: string, matches: INullOrStringArray ) {
  //Replace any # with link to issue
  //First find all instances of # and digits

  // console.log('getStringArrayWithHashNumbers matches: ', matches);  //Removed 2022-02-08
  let subSpans: string[] = [];
  if ( matches === null ) {
    subSpans.push(testString);
    return subSpans;
  }
    let partialString: string = testString + '';
    matches.map( ( thisMatch, i ) =>  {
      // console.log('getStringArrayWithHashNumbers partialString: ',partialString);  //Removed 2022-02-08
      let idx: number = partialString.indexOf(thisMatch);
      if ( idx === 0 )  {
        //This found string at beginning
        subSpans.push(`${thisMatch}`);
        partialString=partialString.substring(thisMatch.length);
        // console.log( `${i} ${thisMatch}`, subSpans, 'idx===0');  //Removed 2022-02-08

      } else if ( idx > 0 ) {
        //This found string after beginning
        subSpans.push(partialString.substring(0,idx));
        subSpans.push(`${thisMatch}`);
        // console.log( `${i} ${thisMatch}`, subSpans, 'idx>0 ');  //Removed 2022-02-08
        partialString=partialString.substring(idx + thisMatch.length);
      }

    });
  if ( partialString ) { subSpans.push( partialString ); }
  return subSpans;
}