//import { holidays, msPerDay, msPerHr, msPerMin, msPerMo, msPerQ, msPerWk, msPerYr, } from './constants';
import { weekday3 } from './dayLabels';
import { monthStr, monthStr3 } from './monthLabels';

import { ISO8601_week_no, getDayOfWeek } from './weeks';

import { IDeltaDaysArray, ITheTime } from './Interfaces';

import { getTimeDelta, } from './deltas';

  export function makeSmallTimeObject( timeString : any ) {
  
    //console.log('makeTimeObject: ', timeString);
    let rightNow = new Date();
  
    let todayYear = rightNow.getFullYear();
    let todayMonth = rightNow.getMonth() ;
    let todayDate = rightNow.getDate();
    let todaysDate = new Date(todayYear,todayMonth,todayDate);
  
    let giveTime = new Date();
  
    if (timeString != null && timeString.length > 0 ) { 
      giveTime = new Date(timeString);
    } else {
      timeString = giveTime.toLocaleString();
    }
  
    let givenYear = giveTime.getFullYear();
    let givenMonth = giveTime.getMonth() ; //Zero Index
    let givenWeek = ISO8601_week_no(giveTime);
    let givenDate = giveTime.getDate();
    let givenDay = giveTime.getDay();
  
    let givenDateMidnight = new Date(givenYear,givenMonth,givenDate);
  
    let theTime : ITheTime = {
      now: giveTime,
      theTime: giveTime.toUTCString(),
      milliseconds: giveTime.getTime(),
      year: givenYear,
      month: givenMonth,
      week: givenWeek,
      date: givenDate,
      day: givenDay,
  
      daysAgo: getTimeDelta(givenDateMidnight, todaysDate, 'days'),
  
      dayMMMDD: monthStr3['en-us'][givenMonth] + '-' + givenDate,
      dayDDDMMMDD: [weekday3['en-us'][givenDay],monthStr3['en-us'][givenMonth],givenDate].join(' '),
      dayYYYYMMDD: [givenYear,("0" + (givenMonth + 1)).slice(-2),givenDate].join('-'),
  
    };
  
    //console.log('theTime:', theTime);
    return theTime;
  
  }
  
