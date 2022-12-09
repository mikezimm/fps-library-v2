/**
 * To use this feature:
 * Apply these changes
 * 
 * 


## Copy this to main WebpartProperties

    import { IWebpartHistory } from '@mikezimm/npmfunctions/dist/Services/PropPane/WebPartHistory';

    //ADDED FOR WEBPART HISTORY:  
    webpartHistory: IWebpartHistory;



## Copy this to main WebpartProperties

    //Add this to MAIN WEBPART.ts
    import { IWebpartHistory, IWebpartHistoryItem, createWebpartHistory, updateWebpartHistory } from '@mikezimm/npmfunctions/dist/Services/PropPane/WebPartHistory';

    //ADDED FOR WEBPART HISTORY:  -
    //  === TO main webpart class
    private thisHistoryInstance: IWebpartHistoryItem = null;


    //ADDED FOR WEBPART HISTORY:  This sets the webpartHistory - 
    // === TO END OF onInit function
    this.thisHistoryInstance = createWebpartHistory( 'onInit' , 'new', this.context.pageContext.user.displayName );
    let priorHistory : IWebpartHistoryItem[] = this.properties.webpartHistory ? this.properties.webpartHistory.history : [];
    this.properties.webpartHistory = {
    thisInstance: this.thisHistoryInstance,
    history: priorHistory,
    };


    //ADDED FOR WEBPART HISTORY:  This sets the webpartHistory
    //  === TO PropertyPaneChanged
    this.properties.webpartHistory = updateWebpartHistory( this.properties.webpartHistory , propertyPath , newValue, this.context.pageContext.user.displayName );


 */
export interface IPropChange {
  // [key: string]: string ;
  prop: string;
  value: string;

}

export interface IWebpartHistoryItem2 {
  // [key: string]: string | IPropChange[];
    time: string;
    user: string;
    changes: IPropChange[];

  }

  export interface IWebpartHistoryItem1 {
    // [key: string]: string | string[];
    time: string;
    user: string;
    fields: string[];
    newValues: string[];
  }

  export interface IWebpartHistory {
    // [key: string]: IWebpartHistoryItem2 | IWebpartHistoryItem2[];
    thisInstance: IWebpartHistoryItem2;
    history: IWebpartHistoryItem2[];

  }
