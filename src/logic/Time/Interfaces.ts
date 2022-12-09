
//  import { IDeltaDaysArray, ITheTime } from '@mikezimm/npmfunctions/dist/Services/Time/Interfaces';

export interface IDeltaDaysArray {
    years: {
      daysAgo: number[],
      daysAgoR: number[],
      daysAgoNull: any[],
      labelShort: string[],
      labelLong: string[],
    },
    months: {        
      daysAgo: number[],
      daysAgoR: number[],
      daysAgoNull: any[],
      labelShort: string[],
      labelLong: string[],
    }
  }

export interface ITheTime {

    now: Date;
    theTime : string;
    milliseconds : number;
    year?: number;
    month?: number; //Zero Index
    minute?: number; //Zero Index
    monthStr?: string;
    week?: number;
    day?: number;
    date?: number;
    dayStr?: string;
    hour?: number;
  
    isToday?: boolean;
    isYesterday?: boolean;
    isThisWeek?: boolean;
    isThisMonth?: boolean;
    isThisYear?: boolean;
    daysAgo?: number;
    isoWeek?: number;
  
    priorSunday?: Date;
    priorMonday?: Date;
    firstOfMonth?: Date;
  
    daysSinceSun?: number;
    daysSinceMon?: number;
    daysSinceNewYear?: number;
    daysSinceMonthStart?: number;
  
    dayMMMDD?: string;
    dayDDDMMMDD?: string;
    dayYYYYMMDD?: string;
    dayOfWeekDDD?: string;
    dayOfWeekDxx?: string;
  
    coreTime?: string;
    hoursEarly?: number;
    hoursLate?: number;
  
  }