


  /**
   * This was originally copied from PivotTiles basicElements.tsx file
   * 
   * Use like this:  let thisID = findParentElementPropLikeThis(e.target, 'id', 'ButtonID', 5, 'begins');
   *    Will find element where id begins wtih ButtonID up to 5 parents up.
   * @param e 
   * @param prop 
   * @param value 
   * @param maxHops 
   * @param search 
   * @param alertError  //Alert on error or not found
   * @param consoleResult //Console log result element
   * 
   */

  export function findParentElementLikeThis( e: any, prop: string, value: string, maxHops: number, search: 'begins' | 'ends' | 'contains' | 'exact', alertError: boolean = true, consoleResult: boolean = true ) {

    let result : any = null;
    let checkElement: any = e['parentElement'];
    let found = false;
    let foundHops = 0;

    for (let i = 0; i < maxHops ; i++) {

      if ( found === false ) {

        if ( checkElement[prop] ) {
          foundHops ++;
          let parentProp = prop === 'classList' ? checkElement['className'].split(' ') : checkElement[prop];

          if ( parentProp ) {
            if ( prop.toLowerCase() === 'classlist' ) {
              parentProp = JSON.parse(JSON.stringify(parentProp));
              if ( search === 'contains' ) {
                if ( parentProp.indexOf( value ) > - 1  ) { 
                  result = checkElement;
                  found = true;
                }

              } else if ( search === 'begins' ) {
                if ( parentProp.indexOf( value ) === 0  ) { result = checkElement; found = true; }

              } else if ( search === 'ends' ) {
                if ( parentProp.indexOf( value ) === parentProp.length -1  ) { result = checkElement; found = true; }

              } else if ( search === 'exact' ) {
                if ( checkElement['className'] === value ) { result = checkElement; found = true; }
              }

            } else if ( search === 'begins' ) {
              if ( parentProp.indexOf(value) === 0  ) { result = checkElement; found = true; }

            } else if ( search === 'ends' ) {
              alert('findParentElementPropLikeThis:  Error - feature not yet avaialble!');

            } else if ( search === 'contains' ) {
              if ( parentProp.indexOf(value) > -1  ) { result = checkElement; found = true; }

            } else if ( search === 'exact' ) {
              if ( parentProp === value  ) { result = checkElement; found = true; }

            }

          }

        }

        if ( found === false ) { checkElement = checkElement['parentElement'] ; }

      }

    }

    if ( found === false && alertError === true ) {
      alert('findParentElementPropLikeThis:  Could not find parent element - see console.');
      console.log('findParentElementPropLikeThis: found, prop, value, foundHops, maxHops, search', found, prop, value, foundHops, maxHops, search );

    }
    if ( consoleResult === true ) {
      console.log('findParentElementPropLikeThis: found, prop, value, foundHops, maxHops, search', found, prop, value, foundHops, maxHops, search );
    }

  return result;

  }

  export function findParentElementPropLikeThis( e: any, prop: string, value: string, maxHops: number, search: 'begins' | 'ends' | 'contains' | 'exact' ) {

    let result : any = findParentElementLikeThis( e, prop, value, maxHops, search);
    let found = result === null ? false : true;

    let propResult = result !== null ? result[prop] : result ;

    if ( found === false ) {
      alert('findParentElementPropLikeThis:  Could not find parent element - see console.');
      console.log('findParentElementPropLikeThis: Did not find: prop', prop, );
      console.log('findParentElementPropLikeThis: Did not find: value', result[prop] );
      console.log('findParentElementPropLikeThis: Did not find: maxHops', maxHops );
      console.log('findParentElementPropLikeThis: Did not find: search', search );
    }

  return propResult;

  }