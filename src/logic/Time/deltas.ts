/***
 *    .d888b.  .d88b.  .d888b.  .d88b.          db .d888b.         db   j88D                     
 *    VP  `8D .8P  88. VP  `8D .8P  88.        o88 VP  `8D        o88  j8~88                     
 *       odD' 88  d'88    odD' 88  d'88         88    odD'         88 j8' 88                     
 *     .88'   88 d' 88  .88'   88 d' 88 C8888D  88  .88'   C8888D  88 V88888D                    
 *    j88.    `88  d8' j88.    `88  d8'         88 j88.            88     88                     
 *    888888D  `Y88P'  888888D  `Y88P'          VP 888888D         VP     VP                     
 *                                                                                               
 *                                                                                               
 *    d8888b. d888888b db    db  .d88b.  d888888b      d888888b d888888b db      d88888b .d8888. 
 *    88  `8D   `88'   88    88 .8P  Y8. `~~88~~'      `~~88~~'   `88'   88      88'     88'  YP 
 *    88oodD'    88    Y8    8P 88    88    88            88       88    88      88ooooo `8bo.   
 *    88~~~      88    `8b  d8' 88    88    88            88       88    88      88~~~~~   `Y8b. 
 *    88        .88.    `8bd8'  `8b  d8'    88            88      .88.   88booo. 88.     db   8D 
 *    88      Y888888P    YP     `Y88P'     YP            YP    Y888888P Y88888P Y88888P `8888Y' 
 *                                                                                               
 *                                                                                               
 */

 /**
  * Functions in this file
  * 
  * 
  * import { getTimeDelta, getDayTimeToMinutes, getTimeSpan, getBestTimeDelta, getAge, createDeltaDateArrays } from '@mikezimm/npmfunctions/dist/Services/Time/deltas';
  * 
  */

  import { holidays, msPerDay, msPerHr, msPerMin, msPerMo, msPerQ, msPerWk, msPerYr, } from './constants';
  import { monthStr, monthStr3 } from './monthLabels';

 import { IDeltaDaysArray } from './Interfaces';

  export function getTimeDelta( time1 : any, time2 : any, inWhat : string ){
    let date = new Date(time1).getTime();
    let now = new Date(time2).getTime();
    let age : number = (now - date);
  
    if (inWhat === 'months') { 
      age =  age/(1000 * 60 * 60 * 24 * 30.44 ) ;
      age = Math.round(age * 10) / 10;  //2020-03-02:  Added so that delta days is always whole number when in reality, 8 months out of the year there is an extra hour per day
    }
    else if (inWhat === 'days') { 
      age =  age/(1000 * 60 * 60 * 24) ;
      age = Math.round(age);  //2020-03-02:  Added so that delta days is always whole number when in reality, 8 months out of the year there is an extra hour per day
    }
    else if (inWhat === 'hours') { age =  age/(1000 * 60 * 60) ; }
    else if (inWhat === 'minutes') { age =  age/(1000 * 60) ; }
    else if (inWhat === 'seconds') { age =  age/(1000) ; }
    else if (inWhat === 'ms') { age =  age ; }
    else if (inWhat === 'best'){
    }
  
    return age;
  
  }

export function getDayTimeToMinutes ( startTime : any ){

  let thisYear = new Date().getUTCFullYear();
  let startYear = new Date(startTime).getUTCFullYear();
  let replaceYear = (thisYear === startYear) ? "/" + thisYear : "";
  let dateString : string = (new Date(startTime)).toLocaleDateString('short').replace(replaceYear,'');
  let timeString : string = (new Date(startTime)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  return [dateString,timeString].join(' ');

}

export function getTimeSpan(startTime: string,endTime: string){
  
  //console.log('getBestTimeDelta', startTime, endTime);

  let theStartTime = getDayTimeToMinutes(startTime);
  let forString = '- for';
  let deltaString : string = getBestTimeDelta(startTime,endTime);

  return [theStartTime,forString,deltaString].join(' ');

}

export function getBestTimeDelta(startTime: string,endTime: string){
  let start = new Date(startTime).getTime();
  let end = new Date(endTime).getTime();
  let delta : number = end - start;

  //console.log('getBestTimeDelta', startTime, endTime);

  if (delta/(1000) < 60 ) {
    return delta/(1000) + ' seconds';

  } else if (delta/(msPerMin) < 60 ) {
    return ((delta/msPerMin)).toFixed(0) + ' minutes';

  } else if (delta/(msPerHr) < 24 ) {
    return (delta/(msPerHr)).toFixed(0) + ' hours';

  } else if (delta/(msPerDay) < 7 ) {
    return (delta/(msPerDay)).toFixed(0) + ' days';

  } else if (delta/(msPerDay) < 30 ) {
    return (delta/(msPerWk)).toFixed(0) + ' weeks';

  } else if (delta/(msPerMo) < 24 ) {
    return (delta/(msPerMo)).toFixed(0) + ' months';

  } else if (delta/(msPerYr) < 4 ) {
    return (delta/(msPerYr)).toFixed(0) + ' years';

  } else {
    return 'Infinity and Beyond!';
  }
}



export function getAge( time : any, inWhat : string ){
  let now = new Date().getTime();
  let age = getTimeDelta(time, now, inWhat);

  return age;

}
//
export function createDeltaDateArrays(){

    let result : IDeltaDaysArray = {
      years: {
        daysAgo: [],
        daysAgoR: [],
        daysAgoNull: [],
        labelShort: [],
        labelLong: [],
      },
      months: {
        daysAgo: [],
        daysAgoR: [],
        daysAgoNull: [],
        labelShort: [],
        labelLong: [],
      }
    };
        
    let rightNow = new Date();

    let todayYear = rightNow.getFullYear();
    let todayMonth = rightNow.getMonth() ; //Zero Index
    let todayDate = rightNow.getDate();

    let todaysDate = new Date(todayYear,todayMonth,todayDate);

    for (let y = todayYear; y > todayYear  - 4 ; y--) {
      for (let m = 11; m > -1 ; m--) {

        let thisDate = new Date(y,m,1);
        let deltaDays  : number = getTimeDelta(thisDate, todaysDate, 'days');

        if ( deltaDays > 0 ) {
          result.months.daysAgo.push(deltaDays);
          let roundedDays = Math.round(deltaDays);
          result.months.daysAgoR.push(roundedDays);
          result.months.labelShort.push(y.toString().substring(2) + '-' + monthStr3['en-us'][m]);
          result.months.labelLong.push(y.toString() + '-' + monthStr3['en-us'][m]);

          result.months.daysAgoNull[roundedDays] = null;

          if ( m === 0 ) { 
            result.years.daysAgo.push(deltaDays);
            result.years.daysAgoR.push(roundedDays);
            result.years.labelShort.push(y.toString().substring(2));
            result.years.labelLong.push(y.toString());
            result.years.daysAgoNull[roundedDays] = null;
          }
        }
      }
    }

    return result;

}