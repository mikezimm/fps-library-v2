
/***
 *    d8888b. d88888b d88888b d888888b d8b   db d88888b d8888b. .d8888. 
 *    88  `8D 88'     88'       `88'   888o  88 88'     88  `8D 88'  YP 
 *    88oobY' 88ooooo 88ooo      88    88V8o 88 88ooooo 88oobY' `8bo.   
 *    88`8b   88~~~~~ 88~~~      88    88 V8o88 88~~~~~ 88`8b     `Y8b. 
 *    88 `88. 88.     88        .88.   88  V888 88.     88 `88. db   8D 
 *    88   YD Y88888P YP      Y888888P VP   V8P Y88888P 88   YD `8888Y' 
 *                                                                      
 *                                                                      


import { IRefinerLayer, IRefiners, IItemRefiners, IRefinerStats, RefineRuleValues,
  IRefinerRules, IRefinerStatType, RefinerStatTypes, IRefinerStat } from '@mikezimm/npmfunctions/dist/Refiners/IRefiners';

import { buildKeyText, refinerRuleItems } from '@mikezimm/npmfunctions/dist/Refiners/IRefiners';

import { IRefinerRulesStrs, IRefinerRulesStrs, IRefinerRulesStrs, IRefinerRulesStrs, IRefinerRulesStrs } from '@mikezimm/npmfunctions/dist/Refiners/IRefiners';
import { RefinerRulesStrs, RefinerRulesStrs, RefinerRulesStrs, RefinerRulesStrs, RefinerRulesStrs } from '@mikezimm/npmfunctions/dist/Refiners/IRefiners';

import { IRefinerRulesStrs, IRefinerRulesInts, IRefinerRulesNums, IRefinerRulesTime, IRefinerRulesUser, IRefinerRulesEXPE, IRefinerRulesNone } from '@mikezimm/npmfunctions/dist/Refiners/IRefiners';
import { RefinerRulesStrs, RefinerRulesInts, RefinerRulesNums, RefinerRulesTime, RefinerRulesUser, RefinerRulesEXPE, RefinerRulesNone } from '@mikezimm/npmfunctions/dist/Refiners/IRefiners';

*/

import { ICSSChartTypes } from '../CSSCharts/ICSSCharts';

export interface IRefinerRules {
  rules: RefineRuleValues[];
}

export type IRefinerStatType = 'sum' | 'avg' | 'max' | 'min' | 'count' | 'daysAgo' | 'monthsAgo' | 'demo' | 'eval';
export const RefinerStatTypes : IRefinerStatType[] = ['sum' , 'avg' , 'max' , 'min' , 'count', 'daysAgo' , 'monthsAgo' , 'eval' ]; // , ''];

//2022-01-11:  Updated from ActionNews webpart
export interface IRefinerStat {

  primaryField: string;
  secondField?: string;
  title: string;
  stat: IRefinerStatType;
  chartTypes: ICSSChartTypes[];

  //collapsed = false shows expanded with accordion, true means collapsed with accordion, undefined means no accordion
  isCollapsed: number; 

  //Consumer webpart number - undefined means it shows up in main webpart, 1 means it will show up in consumer webpart
  consumer: 1 | 2 | 3;  

  eval?: string;
  stylesChart?: any;
  stylesTitle?: any;
  stylesRow?: any;
  stylesBlock?: any;
  stylesLabel?: any;
  stylesValue?: any;
  stylesFigure?: any;  //Figure is for the entire array of charts... uses first valid stylesFigure object from array of charts.
  stylesGraphic?: any;  //Figure is for the entire array of charts... uses first valid stylesFigure object from array of charts.

}

export interface IRefinerStats {
  stats: IRefinerStat[];
}

export type IRefinerRulesStrs = 'parseBySemiColons' | 'parseByCommas' ;
export type IRefinerRulesInts = 'mathCeiling' | 'mathFloor' | 'mathRound' | 'groupBy10s' | 'groupBy100s' | 'groupBy1000s' | 'groupByMillions' ;
export type IRefinerRulesNums = 'textAsNumber' | 'numberAsText' | '<log10Group' | '>log10Group' | 'log10e3';
export type IRefinerRulesTime = 'isDate' | 'groupByString' | 'groupByDays' | 'groupByWeeks' | 'groupByMonthsMMM' | 'groupByMonthsYYMM' | 'groupByYears' | 'groupByDayOfWeek' | 'groupByDateBuckets' ;
export type IRefinerRulesUser = 'groupByUsers' ;
export type IRefinerRulesEXPE = 'groupByDaysDDD' ;
export type IRefinerRulesNone = 'invalidRules' ;

export type IRefinerRulesPane = IRefinerRulesStrs | IRefinerRulesInts | IRefinerRulesNums | IRefinerRulesTime | IRefinerRulesUser ;
export type RefineRuleValues = IRefinerRulesStrs | IRefinerRulesInts | IRefinerRulesNums | IRefinerRulesTime | IRefinerRulesUser | IRefinerRulesEXPE | IRefinerRulesNone ;

export const RefinerRulesStrs : IRefinerRulesStrs[] = [ 'parseBySemiColons' , 'parseByCommas' ];
export const RefinerRulesInts : IRefinerRulesInts[] = [ 'mathCeiling' , 'mathFloor' , 'mathRound' , 'groupBy10s' , 'groupBy100s' , 'groupBy1000s' , 'groupByMillions' ];
export const RefinerRulesNums : IRefinerRulesNums[] = [ 'textAsNumber' , 'numberAsText', '<log10Group' , '>log10Group' , 'log10e3' ];
export const RefinerRulesTime : IRefinerRulesTime[] = [ 'isDate' , 'groupByString' , 'groupByDays' , 'groupByWeeks' , 'groupByMonthsMMM' , 'groupByMonthsYYMM' , 'groupByYears' , 'groupByDayOfWeek' , 'groupByDateBuckets' ];
export const RefinerRulesUser : IRefinerRulesUser[] = [ 'groupByUsers' ];
export const RefinerRulesEXPE : IRefinerRulesEXPE[] = [ 'groupByDaysDDD' ];
export const RefinerRulesNone : IRefinerRulesNone[] = [ 'invalidRules' ];

export const RefinerRulesPane = [ ...RefinerRulesStrs, ...RefinerRulesInts, ...RefinerRulesNums, ...RefinerRulesTime, ...RefinerRulesUser, ];
export const RefinerRulesAll  = [ ...RefinerRulesStrs, ...RefinerRulesInts, ...RefinerRulesNums, ...RefinerRulesTime, ...RefinerRulesUser, ...RefinerRulesEXPE, ...RefinerRulesNone, ];


export interface IItemRefiners {
  // [key: string]: string | number | number[] | string[] | any[] | undefined;
  //In Drilldown v1.15.2, this works but does not work here
  // [lev0: string]: any[];
  // [lev1: string]: any[];
  // [lev2: string]: any[];

  lev0: any[]; 
  lev1: any[]; 
  lev2: any[];

  comments: string[];
  stat0?: number;
  stat1?: number;
  stat2?: number;
  stat3?: number;
  stat4?: number;
  stat5?: number;
  stat6?: number;
  stat7?: number;
  stat8?: number;
  stat9?: number;
  stat0Count?: number;
  stat1Count?: number;
  stat2Count?: number;
  stat3Count?: number;
  stat4Count?: number;
  stat5Count?: number;
  stat6Count?: number;
  stat7Count?: number;
  stat8Count?: number;
  stat9Count?: number;
}

export interface IRefiners {
  // [key: string]: string | number | number[] | IRefinerLayer[] | string[] | undefined;
  thisKey: string;
  multiCount: number; // Count when counting multi-value fields each time
  itemCount: number; // Count when only counting multi-value fields once

  childrenKeys: string[];
  childrenObjs: IRefinerLayer[];
  childrenMultiCounts: number[];
  childrenCounts: number[];
  stat0?: number;
  stat1?: number;
  stat2?: number;
  stat3?: number;
  stat4?: number;
  stat5?: number;
  stat6?: number;
  stat7?: number;
  stat8?: number;
  stat9?: number;
  stat0Count?: number;
  stat1Count?: number;
  stat2Count?: number;
  stat3Count?: number;
  stat4Count?: number;
  stat5Count?: number;
  stat6Count?: number;
  stat7Count?: number;
  stat8Count?: number;
  stat9Count?: number;
  /*
  stat0Total?: number;
  stat1Total?: number;
  stat2Total?: number;
  stat3Total?: number;
  stat4Total?: number;
  stat5Total?: number;
  stat6Total?: number;
  stat7Total?: number;
  stat8Total?: number;
  stat9Total?: number;
  */
}

export interface IRefinerLayer {
  // [key: string]: string | number | number[] | IRefinerLayer[] | string[] | undefined;
  thisKey: string;
  multiCount: number; // Count when counting multi-value fields each time
  itemCount: number; // Count when only counting multi-value fields once
  childrenKeys: string[];
  childrenObjs?: IRefinerLayer[];
  childrenMultiCounts?: number[];
  childrenCounts?: number[];
  stat0?: number;
  stat1?: number;
  stat2?: number;
  stat3?: number;
  stat4?: number;
  stat5?: number;
  stat6?: number;
  stat7?: number;
  stat8?: number;
  stat9?: number;
  stat0Count?: number;
  stat1Count?: number;
  stat2Count?: number;
  stat3Count?: number;
  stat4Count?: number;
  stat5Count?: number;
  stat6Count?: number;
  stat7Count?: number;
  stat8Count?: number;
  stat9Count?: number;
  /*
  stat0Total?: number;
  stat1Total?: number;
  stat2Total?: number;
  stat3Total?: number;
  stat4Total?: number;
  stat5Total?: number;
  stat6Total?: number;
  stat7Total?: number;
  stat8Total?: number;
  stat9Total?: number;
  */
}

