
import * as React from 'react';

import { IWebpartHistory, IWebpartHistoryItem2 } from './Interface';

export function getHistoryContent(  webpartHistory: IWebpartHistory  ) : JSX.Element {

  const thisInstance = createHistoryItem( webpartHistory.thisInstance  );
  let thisInstanceChanges = webpartHistory.thisInstance.changes.length === 0 ? null : <div>
    <div style={{fontSize: 'large', textDecoration: 'underline' }}>This edit session</div>
    { thisInstance }
  </div>;

  let priorHistoryChanges = null;
  if ( webpartHistory.history && webpartHistory.history.length > 0 ) {
    let priorHistory : any[] = [];
    webpartHistory.history.map( ( item ) => {
      if ( webpartHistory.thisInstance.time !== item.time ) {
        priorHistory.push ( createHistoryItem( item ) );
      }
    });
    priorHistoryChanges = <div>
      <div style={{fontSize: 'large', textDecoration: 'underline' }}>Previous edit sessions</div>
      { priorHistory }
    </div>;
  }

  const content= <div id="HistoryPanel" style={{paddingTop: '20px'}}>
    { thisInstanceChanges }
    { priorHistoryChanges }
  </div>;

  return content;

}

function createHistoryItem( item: IWebpartHistoryItem2 ): JSX.Element | undefined {

  if ( item.changes.length === 0 ) { return  undefined ; }
  const changes = item.changes.map( ( change, idx ) => {
    return <tr><td>{change.prop} : </td><td title={change.value}>{ change.value ? change.value : 'Empty' }</td></tr>;
  });

  return <div className={ 'history-item' }>
    <div>{ item.user } : { new Date ( item.time ).toLocaleString() }</div>
    <table>{ changes }</table>
  </div>;

}