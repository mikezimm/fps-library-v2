

  import { holidays, msPerDay, msPerHr, msPerMin, msPerMo, msPerQ, msPerWk, msPerYr, } from './constants';

/**
 * This was built for TrackMyTime and will get the Sunday or Monday of the week of 'd'.
 * It returns the prior Sunday or prior Monday.
 * 
 * Similarly getOffSetDayOfWeek can do this but it can uses different calculation
 * 
 * Based upon:  https://stackoverflow.com/questions/4156434/javascript-get-the-first-day-of-the-week-from-current-date
 * 
 * @param d 
 * @param sunOrMon 
 */
 export function getDayOfWeek( d : any ,sunOrMon: string ) {

    let d1 = new Date(d);
    let diff;
    let day = d1.getDay();
    if (sunOrMon === 'sun') {
      diff = d1.getDate() - day;
    } else {
      diff = d1.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    }
  
    let newDate = new Date(d1.setDate(diff));
  
    let returnDate = new Date(newDate.getFullYear(),newDate.getMonth(),newDate.getDate());
  //  console.log('getDayOfWeek:', d, sunOrMon,newDate );
  //  var day = d.getDay(),
  //      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  
  
    return returnDate;
  }

//https://www.w3resource.com/javascript-exercises/javascript-date-exercise-24.php
export function ISO8601_week_no( dt : any ) 
{
  var tdt = new Date(dt.valueOf());
  var dayn = (dt.getDay() + 6) % 7;
  tdt.setDate(tdt.getDate() - dayn + 3);
  var firstThursday = tdt.valueOf();
  tdt.setMonth(0, 1);
  if (tdt.getDay() !== 4) 
    {
    tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
      }
  return 1 + Math.ceil((firstThursday - tdt.valueOf()) / 604800000);
}


/**
 * Created for GridCharts  
 * @param theDate 
 */
    export function getYearWeekLabel ( theDate : Date ) {

    let year = theDate.getFullYear();
    let weekNo = ISO8601_week_no(theDate).toString();
    if ( weekNo.length === 1 ) { weekNo = "0" + weekNo; }
    let weekLabel : any = year + ' :  w' + weekNo ;
    return weekLabel;

    }
  
    
  /**
   * This is similar to getDayOfWeek except more complex:
   * 
   *  Function does not adjust the timestamp.
   *  So if the day number is the same even if it's earlier or later, it will return the date you originally passed in.
   * 
   *  You can pass in any day number (0 for Sunday) and which = prior or next.
   *  0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
   *  
   *  Which = prior:
   *  Say today is Wednesday and you request day 2, that would return Tuesday (yesterday)
   *  say today is Wednesday and you request day 4, that would return LAST Thursday because that is the first prior Thursday.
   * 
   *  Which = next:
   *  Say today is Wednesday and you request day 2, that will return NEXT Tuesday
   *  Say today is Wednesday and you request day 4, that will return tommorrow.
   * 
   * Pass in a date, the day number to get and wether it's prior or future and it will get the date.
   * @param d 
   * @param day 
   * @param which 
   */
    //This will be in npmfunctions in v.0.0.5
    export function  getOffSetDayOfWeek ( d : string, day: number, which: 'prior' | 'next' ) {
        //First get current day number of week
        let theDate = new Date( d );
        let dayOfWeek = theDate.getDay();
        if ( dayOfWeek === day ) {
          return theDate; 
  
        } else {
          let deltaDays = which === 'prior' ? -dayOfWeek :  7 - dayOfWeek ;
          let deltaMS = deltaDays * msPerDay;
          let adjustedTime = theDate.getTime() + deltaMS;
          let adjustedDate = new Date( adjustedTime );
  
          return adjustedDate;
        }
      } 