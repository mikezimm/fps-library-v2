
//import { holidays, msPerDay, msPerHr, msPerMin, msPerMo, msPerQ, msPerWk, msPerYr, } from './constants';
//import { weekday3 } from './dayLabels';
  import { monthStr, monthStr3 } from './monthLabels';

//import { ISO8601_week_no, getDayOfWeek } from './weeks';

//import { IDeltaDaysArray, ITheTime } from './Interfaces';

//  import { getQuarter, getYearMonthLabel, getLocalMonths,  } from '@mikezimm/npmfunctions/dist/Services/Time/getLabels';

/**
 * Copied from PivotTiles
 * @param date :  Format = new Date() or new Date(2015, 1, 21)
 */
  export function getQuarter(date : Date) {
    var month = date.getMonth() + 1;
    return (Math.ceil(month / 3));
  }

  /**
   * Created for GridCharts
   * @param theDate 
   */
  export function getYearMonthLabel ( theDate : Date ) {

    let year = theDate.getFullYear();
    let month = theDate.getMonth();
    let monthNo = ( month + 1 ).toString();
    let monthLabel : any = year + ' : ' + monthNo + '-' + monthStr3["en-us"][month];

    return monthLabel;

  }

  // export function getLocalMonths( local : string,format : string ){
  //2022-08-29:  Refactored return statement to fix compile warning.
  export function getLocalMonths( local : string, format : "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined ){

  let months = [];

  let getMonth = (idx : any) => {
      var objDate = new Date();
      objDate.setDate(1);
      objDate.setMonth(idx-1);
      var locale = local,
          month = objDate.toLocaleString(locale, { month: format });
        return month;
    };
  
    var i;
    for (i = 1; i < 12; i++) {
      months.push(getMonth(i));
    }

    return months;
}
  