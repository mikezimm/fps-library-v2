
/**
 * complexStringFilter - Loosely built off of BuildTileCollection - isVisibleItem function in PivotTiles
 * @param testThis - looking for this text
 * @param againstThis - in this string
 * @param testSplitter - parser like ';', or ',' or ';or,', if it finds ANY match, it returns true
 * @param notEqualString - test for not equal like '<>' or '!=', if any parsed tests include notEqual, then it returns false
 * @param anyCase - true converts all to lowerCase() for comparison first.  Else it is case sensitive
 */

import { getStringArrayFromString } from "./arraysFromString";

export function complexStringSearch( testThis: string, againstThis: string, testSplitter: string, notEqualString: string, anyCase: boolean ): boolean {

    if ( !testThis ) { return true ; } else {
        let againstThisCase = anyCase === true ? againstThis.toLowerCase() : againstThis;
        let testThisCase = anyCase === true ? testThis.toLowerCase() : testThis;

        let testThese : any = getStringArrayFromString( testThisCase, testSplitter , true, null, false );

        let foundEquals: any = false;
        let foundNotEquals: any = false;
        let testedNotEquals: any = false;
        let testedEquals: any = false;

        testThese.map( ( test: string ) => {
            let testString = `${test}`;

            //Set up for testing Not Equals, if it's found, entire test returns false
            if ( notEqualString && foundNotEquals === false && testString.indexOf( notEqualString ) === 0 ) {
                testedNotEquals = true;
                if ( againstThisCase.indexOf( testString.replace( notEqualString, '' ) ) > -1 ) { foundNotEquals = true ; }

            //Or test for normal equals
            } else if ( foundEquals === false && againstThisCase.indexOf( testString ) > -1 ) { testedEquals = true; foundEquals = true ; }

        });

        let result = null;

        if ( foundNotEquals === false && testedNotEquals === true && testedEquals === false ) { result = true ; } //If Only tested for negative but did not find it... so assuming it's positive
        else if ( foundNotEquals === true ) { result = false ; } //If any foundNotEquals, then return false
        else { result = foundEquals; }

        return result;

    }



}