/**
 * To use this feature:
 * Apply these changes
 * 
 * 


## Copy this to main WebpartProperties

    import { IWebpartHistory, IWebpartHistoryItem2, } from '@mikezimm/npmfunctions/dist/Services/PropPane/WebPartHistory/Interface';

    //ADDED FOR WEBPART HISTORY:  
    webpartHistory: IWebpartHistory;



## Copy this to main WebpartProperties

    //Add this to MAIN WEBPART.ts
    import { IWebpartHistory, IWebpartHistoryItem2, } from '@mikezimm/npmfunctions/dist/Services/PropPane/WebPartHistory/Interface';
    import { createWebpartHistory, updateWebpartHistory } from '@mikezimm/npmfunctions/dist/Services/PropPane/WebPartHistoryFunctions';

    //ADDED FOR WEBPART HISTORY:  -
    //  === TO main webpart class
    private thisHistoryInstance: IWebpartHistoryItem2 = null;


    //ADDED FOR WEBPART HISTORY:  This sets the webpartHistory - 
    // === TO END OF onInit function
    this.thisHistoryInstance = createWebpartHistory( 'onInit' , 'new', this.context.pageContext.user.displayName );
    let priorHistory : IWebpartHistoryItem2[] = this.properties.webpartHistory ? this.properties.webpartHistory.history : [];
    this.properties.webpartHistory = {
        thisInstance: this.thisHistoryInstance,
        history: priorHistory,
    };


    //ADDED FOR WEBPART HISTORY:  This sets the webpartHistory
    //  === TO PropertyPaneChanged
    this.properties.webpartHistory = updateWebpartHistory( this.properties.webpartHistory , propertyPath , newValue, this.context.pageContext.user.displayName );


 */

    import { IWebpartHistoryItem1, IWebpartHistoryItem2, IWebpartHistory, IPropChange } from './Interface';

  export function createWebpartHistory( prop: any, newValue: any, user: string ) {

    let now = new Date();
    let timeString = now.toUTCString();

    // fields: prop === 'onInit' ? [] : [ prop ],
    // newValues: prop === 'onInit' ? [] : [ newValue ],

    let change: IPropChange = {
        prop: prop,
        value: newValue,
    }

    let history : IWebpartHistoryItem2 = {
        time: timeString,
        user: user,
        changes: prop === 'onInit' ? [] : [ change ],

    };

    return history;

  }

  export function updateCurrentHistorySaved ( allHistory: IWebpartHistory, thisInstance: IWebpartHistoryItem2 ) {
    let maxHistoryLength = 20;
    let history: IWebpartHistoryItem2[] = allHistory.history;

    if ( !history || history.length === 0 ) {
        history = [ thisInstance ];

    } else {
        if ( history [0].time !== thisInstance.time || history[0].user !== thisInstance.user ) {
            history.unshift( thisInstance );
        } else {
            history [0] = thisInstance;
        }

    }
    //Trim history to only last 20 saves
    if ( history.length > maxHistoryLength ) {
        history.length = maxHistoryLength;
    }
    
    allHistory.history = history;
    return allHistory;

  }

  export function upgradeV1History ( allHistory: IWebpartHistory, ) {
   
    //rebuild history if needed from IWebpartHistoryItem1
    if ( allHistory && allHistory.history.length > 0 && Object.keys( allHistory.history[0] ).indexOf( 'newValues' ) > -1 ) {

        let newHistory: IWebpartHistoryItem2[] = [];

        allHistory.history.map( ( instance : any )  => {
            let changes: IPropChange[] = [];
            let oldProps: string[] = instance.fields;
            let oldValues: string[] = instance.newValues;
            oldProps.map( ( field, idx ) => {
                changes.push( { prop: field, value: oldValues[idx] } );
            });

            newHistory.push( {
                time: instance.time,
                user: instance.user,
                changes: changes,
            });
            
        });

        allHistory.history = newHistory;

    }

    return allHistory;

  }

  export type ITrimThis = 'start' | 'end' | 'none';

  /**
   * Added 2022-07-25 from FPSPageInfo to simplify re-usability.
   * It just has logic to get the trimThis based on the passed in array of strings
   * @param webpartHistory
   * @param prop 
   * @param newValue 
   * @param user 
   * @param noTrimProps 
   * @param startTrimProps 
   * @param trimLength 
   * @returns 
   */
  export function updateWebpartHistoryV2( webpartHistory: IWebpartHistory, prop: string, newValue: any, user: string, noTrimProps: string[], startTrimProps: string[], trimLength: number = 20 ) {

        //ADDED FOR WEBPART HISTORY:  This sets the webpartHistory
        let trimThis: ITrimThis = 'end';
        if ( noTrimProps.indexOf(prop) > -1 ) {
          trimThis = 'none';
        } else if ( startTrimProps.indexOf(prop) > -1 ) {
          trimThis = 'start';
        }

        webpartHistory = updateWebpartHistory( webpartHistory, prop, newValue, user, trimThis, trimLength );

        return webpartHistory;

  }



  export function updateWebpartHistory( webpartHistory: IWebpartHistory, prop: string, newValue: any, user: string, trimThis : ITrimThis = 'start' , trimLength: number = 20 ) {

    let thisInstance = webpartHistory.thisInstance;

    if ( !thisInstance ) { thisInstance = createWebpartHistory( prop, newValue, user ) ; }

    let propIdx = -1;
    thisInstance.changes.map( ( thisChange, idx ) => {
        if ( thisChange.prop === prop ) { propIdx = idx ; }
    });

    let strValue = typeof newValue === 'string' ? newValue + '' : newValue.toString();
    let origLength = strValue.length + 0;

    //Need this check ( -5 ) to make sure we don't trim it unneccessarily
    if ( origLength > trimLength + 5 ) {
        if ( trimThis === 'start' ) {
            strValue= strValue.substring(0, trimLength );
            strValue += ` ...[+${origLength - strValue.length}]` ;
    
        } else if ( trimThis === 'end' ) {
            strValue = strValue.substring( origLength - trimLength );
            strValue = `[+${origLength - strValue.length}]...${strValue}` ;
        }
    }

    if ( propIdx < 0 ) {
        thisInstance.changes.push( { prop: prop, value: strValue });

    } else {
        thisInstance.changes[propIdx].value = strValue ;
    }

    webpartHistory = updateCurrentHistorySaved( webpartHistory, thisInstance );

    console.log('webpartHistory: function', webpartHistory );

    return webpartHistory;

  }