
  import { holidays, msPerDay, msPerHr, msPerMin, msPerMo, msPerQ, msPerWk, msPerYr, } from './constants';
  import { weekday3 } from './dayLabels';
  import { monthStr, monthStr3 } from './monthLabels';

  import { ISO8601_week_no, getDayOfWeek } from './weeks';

  import { getTimeDelta } from  './deltas';

  import { ITheTime } from './Interfaces';

  //This is a more detailed version of the time object for charting purposes
  export function makeTheTimeObject( timeString : string, coreStart = 8, coreEnd = 18, useHolidays = holidays ) {

    //console.log('makeTimeObject: ', timeString);
    let rightNow = new Date();
  
    let todayYear = rightNow.getFullYear();
    let todayMonth = rightNow.getMonth() ; //Zero Index
    let todayWeek = ISO8601_week_no(rightNow);
    let todayDate = rightNow.getDate();
    let todayDay = rightNow.getDay();
    let todaysDate = new Date(todayYear,todayMonth,todayDate);
  
    let todayTime = rightNow.getTime() ;
    let todayHour = rightNow.getHours() ;
  
  
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
    let priorNewYears = new Date(givenYear,0,1);
  
    let givenTime = giveTime.getTime() ;
    let givenHour = giveTime.getHours() ;
    let givenMinutes = giveTime.getMinutes() ;
  
    let isThisYear = todayYear === givenYear ? true : false;
    let isThisMonth = isThisYear && todayMonth === givenMonth ? true : false;
    let isThisWeek = isThisYear && givenWeek === todayWeek ? true : false;
    let isToday = isThisMonth && todayDate === givenDate ? true : false;
  
    let givenDateMidnight = new Date(givenYear,givenMonth,givenDate);
    let firstOfMonth = new Date(givenYear,givenMonth,1);
  
    let priorSunday = getDayOfWeek(timeString, 'sun');
    let priorMonday = getDayOfWeek(timeString, 'mon');
  
    let coreTime = 'Normal';
    let hoursEarly = 0;
    let hoursLate = 0;
  
    let isHoliday = false;
  
    for ( let d of useHolidays ) {
      if (d[0] - 1 === givenMonth && d[1] == givenDate ) {
        isHoliday = true;
      }
    }
  
    if ( isHoliday ) {
      coreTime = 'Holiday';
  
    } else if ( givenDay === 0 || givenDay === 6 ) {
      coreTime = 'Weekend';
  
    } else if ( givenHour < coreStart ) {
      hoursEarly = coreStart - givenHour;
      hoursEarly += ( 1 - givenMinutes/60 );
      coreTime = 'Early';
  
    } else if ( givenHour >= coreEnd ) {
      hoursLate = givenHour - coreEnd;
      hoursLate += givenMinutes/60;
      coreTime = 'Late';
  
    }
  
  
    let daysAgo = Math.round(Math.abs((rightNow.getTime() - giveTime.getTime()) / msPerDay));
  
    let theTime : ITheTime = {
      now: giveTime,
      theTime: giveTime.toUTCString(),
      milliseconds: giveTime.getTime(),
      year: givenYear,
      month: givenMonth,
      week: givenWeek,
      date: givenDate,
      day: givenDay,
      hour: givenHour,
      minute: givenMinutes,
  
      isThisYear: isThisYear,
      isThisMonth: isThisMonth,
      isThisWeek: isThisWeek,
      isToday: isToday,
      isYesterday: daysAgo === 1 ? true : false ,
  
      daysAgo: getTimeDelta(givenDateMidnight, todaysDate, 'days'),
      firstOfMonth: firstOfMonth,
      
      priorSunday: priorSunday,
      priorMonday: priorMonday,
  
      daysSinceSun: getTimeDelta(priorSunday, todaysDate, 'days'),
      daysSinceMon: getTimeDelta(priorMonday, todaysDate, 'days'),
      daysSinceNewYear: getTimeDelta(priorNewYears, todaysDate, 'days'),
      daysSinceMonthStart: getTimeDelta(firstOfMonth, todaysDate, 'days'),
  
      dayMMMDD: monthStr3['en-us'][givenMonth] + '-' + givenDate,
      dayDDDMMMDD: [weekday3['en-us'][givenDay],monthStr3['en-us'][givenMonth],givenDate].join(' '),
      dayYYYYMMDD: [givenYear,("0" + (givenMonth + 1)).slice(-2),givenDate].join('-'),
      dayOfWeekDDD: weekday3['en-us'][givenDay],
  
      coreTime: coreTime,
      hoursEarly: hoursEarly,
      hoursLate: hoursLate,
  
    };
  
    //console.log('theTime:', theTime);
    return theTime;
  
  }
  
  