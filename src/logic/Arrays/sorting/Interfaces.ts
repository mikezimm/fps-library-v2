

export type ISeriesSort = 'asis' | 'labels' | 'asc' | 'dec' | string | null ;

// Duplicate in src\services\sp\pages\EasyPagesFetch.ts
export interface ISeriesSortObject {
  // [key: string]: string | ISeriesSort ;
  prop: string;
  order: ISeriesSort;
  asc?: boolean; // Added to match IOrderBoolean needed for fetching
}
