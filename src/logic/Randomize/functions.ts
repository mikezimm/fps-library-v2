  
/***
 *    d8888b.  .d8b.  d8b   db d8888b.  .d88b.  .88b  d88. 
 *    88  `8D d8' `8b 888o  88 88  `8D .8P  Y8. 88'YbdP`88 
 *    88oobY' 88ooo88 88V8o 88 88   88 88    88 88  88  88 
 *    88`8b   88~~~88 88 V8o88 88   88 88    88 88  88  88 
 *    88 `88. 88   88 88  V888 88  .8D `8b  d8' 88  88  88 
 *    88   YD YP   YP VP   V8P Y8888D'  `Y88P'  YP  YP  YP 
 *                                                         
 *                                                         

import { getRandomInt, getRandomChance, getRandomFromArray, randomDate, generateVals, generateTitles }
    from '@mikezimm/npmfunctions/dist/Services/randomServices';

 */



export type IAnyArray = any[];

/**
 * https://stackoverflow.com/a/1527820
 * 
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Gets a default number or a random chance to get number in range
 * @param def 
 * @param chanceOther Enter whole number for %....  chanceOther = 49 for 49% Chance of getting number outside of default
 * @param min 
 * @param max 
 */
export function getRandomChance(def: number, chanceOther: number, min: number, max: number,  ) : number {

    let result = def;
    let thisChance = getRandomInt(1,100);
    //console.log('getRandomChance', thisChance);
    if ( thisChance <= chanceOther ) {
        //Get a randomized number instead of default
        return getRandomInt(min,max);
    } else {
        return def;
    }

}

export function getRandomFromArray(arr: any[]) : any {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function randomDate(start: Date, end: Date) :Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


export function generateVals ( qty: number, min: number, max: number ) : number[] {
  let vals: number[] = [];
  for (let i = 0; i < qty ; i++) {
    vals.push (  getRandomInt(min , max) );
  }
  return vals;
}

export function generateTitles ( lbl: string, qty: number ): string[] {
  let titles = [];
  for (let i = 0; i < qty ; i++) {
    //https://stackoverflow.com/a/3145054
    var chr = String.fromCharCode(65 + i);
    titles.push (  lbl + ' - ' + chr );
  }
  return titles;
}
