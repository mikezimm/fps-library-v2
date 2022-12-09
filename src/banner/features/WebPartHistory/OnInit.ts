import { createWebpartHistory, upgradeV1History } from "./Functions";
import { IWebpartHistory, IWebpartHistoryItem2 } from "./Interface";

export function getWebPartHistoryOnInit ( userDisplayName: string, webpartHistory:  IWebpartHistory ) {

    //ADDED FOR WEBPART HISTORY:  This sets the webpartHistory
    const thisHistoryInstance : IWebpartHistoryItem2 = createWebpartHistory( 'onInit' , 'new', userDisplayName );
    const priorHistory : IWebpartHistoryItem2[] = webpartHistory ? upgradeV1History( webpartHistory ).history : [];

    const newWebPartHistory : IWebpartHistory = {
        thisInstance: thisHistoryInstance,
        history: priorHistory,
    };

    return newWebPartHistory;

}