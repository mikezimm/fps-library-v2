import { IRefinerLayer, IRefinerStat } from '../Refiners/IRefiners';

/***
 *     .o88b. .d8888. .d8888.       .o88b. db   db  .d8b.  d8888b. d888888b .d8888. 
 *    d8P  Y8 88'  YP 88'  YP      d8P  Y8 88   88 d8' `8b 88  `8D `~~88~~' 88'  YP 
 *    8P      `8bo.   `8bo.        8P      88ooo88 88ooo88 88oobY'    88    `8bo.   
 *    8b        `Y8b.   `Y8b.      8b      88~~~88 88~~~88 88`8b      88      `Y8b. 
 *    Y8b  d8 db   8D db   8D      Y8b  d8 88   88 88   88 88 `88.    88    db   8D 
 *     `Y88P' `8888Y' `8888Y'       `Y88P' YP   YP YP   YP 88   YD    YP    `8888Y' 
 *                                                                                  
 *                                                                                  

import { ILabelColor, ICSSChartTypes, CSSChartTypes, ISeriesSort, ICSSChartSeries, IChartSeries, ICharNote, } 
    from '@mikezimm/npmfunctions/dist/CSSCharts/ICSSCharts';

*/

   export interface ILabelColor {
    // [key: string]: string | undefined ;
    label: string;
    barColor?: string;
    fontColor?: string;
    fontStyle?: string;
  }

  export type ICSSChartTypes = 'pareto-asc' | 'pareto-dec' | 'pareto-labels' | 'stacked-column-labels' | 'stacked-column-dec' | 'stacked-column-asc' | 'kpi-tiles';
  export const CSSChartTypes : ICSSChartTypes[] = ['pareto-asc' , 'pareto-dec' , 'pareto-labels' , 'stacked-column-labels' , 'stacked-column-dec' , 'stacked-column-asc'];

  export interface ICSSChartSeries {
    // [key: string]: string | string[] | number | number[] | boolean | ICSSChartTypes[] | ILabelColor[] | any[] | undefined ;
    title: string;
    labels: any[];
    chartTypes: ICSSChartTypes[];
    activeType?: number;
    key: string;
    valueIsCount?: boolean;

    barValueAsPercent? : boolean;
    height?: number | string ; //This would be horizonal bar height... one horizontal layer
    barValues?: 'val1' | 'sums' | 'avgs' | 'percents' | string ;
    titleLocation?: 'top' | 'side';

    barColors?: 'blue' | 'green' |'brown' | 'gray' | 'red' | 'brown' | 'themed' | 'custom' ;
    customColors?: ILabelColor[];
    axisTitle?: string;
    val1?: number[];
    percents?: any[];
    count?: number;
    avg?: number;
    sum?: number;
    min?: number;
    max?: number;
    changes?: any[];
    changeNotes?: string[];
    warnNotes?: string[];
    errorNotes?: string[];
    stylesChart?: any;
    stylesTitle?: any;
    stylesRow?: any;
    stylesBlock?: any;
    stylesLabel?: any;
    stylesValue?: any;
  }
  // , IChartSeries, ICharNote
  
export interface IChartSeries {
  // [key: string]: string | string[] | number | any[] | undefined ;
  title: string;
  axisTitle: string;
  labels: any[];
  sums: any[];
  counts: any[];
  totalS: number;
  totalC: number;
  changes: any[];
  changeNotes: string[];
  warnNotes: string[];
  errorNotes: string[];
  origLabels?: any[];
  origSums?: any[];
  origCounts?: any[];
}

export interface ICharNote {
  // [key: string]: string | undefined ;
  parent: string;
  source: string;
  note: string;
}


export interface ICSSChartDD {
  // [key: string]: string | string[] | IRefinerLayer | IRefinerStat[] | undefined ;
  stats: IRefinerStat[];
  callBackID: string;
  refinerObj: IRefinerLayer;
  breadCrumb?: string[];

}