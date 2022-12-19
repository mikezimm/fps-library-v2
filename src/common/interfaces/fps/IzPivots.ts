
 export interface IMyPivCat {
    title: string;
    desc: any; //Changed from string to any to allow elements
    order: number;
    count?: number; //2021-02-17:  Added for Easy Contents
    icon?: string; //2021-02-17:  Added for Easy Contents
  }
  
  export interface IPivot {
      headerText: string;
      itemKey: string;
      filter?: string;
      data?: string;
      lastIndex: number;
    }
    
    export interface IMyPivots {
      heading1: IPivot[];
      heading2?: IPivot[];
      heading3?: IPivot[];
    }