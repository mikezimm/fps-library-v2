import * as React from 'react';

// import { Icon, IIconProps } from 'office-ui-fabric-react/lib/Icon';

import { IPerformanceOp, ILoadPerformance, ILoadPerformanceOps, LoadPerformanceOps, IMinPerformanceSetting } from './IPerformance';

require('./styles.css'); //Does not work
// window.require('./styles.css');  //Does not work

export function createPerformanceRows( performance: ILoadPerformance, keysToShow: ILoadPerformanceOps[] ) { //[ 'fetch', 'analyze' ]

    // const { fetch, analyze } = performance;

    const loadRows: any[] = [
      <tr>
        <th>Process</th>
        <th>Mode</th>
        <th>Time</th>
        <th>ms</th>
      </tr>
    ];

    if ( !keysToShow || keysToShow.length === 0 ) { keysToShow = LoadPerformanceOps ; } 
    keysToShow.map( ( part: string ) => {

      if ( part.indexOf('setting') >-1 ) {
        const sets: any = performance.sets;
        const thisPart : IMinPerformanceSetting | undefined = sets[part];

        if ( thisPart ) {
          loadRows.push( <tr>
            <td>{ thisPart.label }</td>
            <td>{ `${thisPart.value}` }</td>
          </tr>);
        }
      } else {
        const ops: any = performance.ops;
        const thisPart : IPerformanceOp | undefined = ops[part];

        if ( thisPart ) {
          let time: string = thisPart.startStr;
          loadRows.push( <tr>
            <td>{ thisPart.label }</td>
            <td>{ thisPart.mode === 1 ? 'View' : 'Edit' }</td>
            <td>{ time }</td>
            <td>{ thisPart.ms }</td>
          </tr>);
        }
      }
    });

     return loadRows;

}

// export function createCacheRows( cacheInfo: ICacheInfo ) {
export function createCacheRows( cacheInfo: any ) {

  const loadRows: any[] = [
    <tr>
      <th style={{ minWidth: '150px' }}>Property</th>
      <th style={{ minWidth: '150px' }}>Value</th>
      {/* <th>Time</th>
      <th>ms</th> */}
    </tr>
  ];

  const skipProps: string[] = [ 'wasCached', 'enableHTMLCache', 'EditorName', 'FileRef', 'size' ];
  Object.keys( cacheInfo ).map( part => {

    if ( skipProps.indexOf( part ) < 0 && cacheInfo[ part ] ) {
      loadRows.push( <tr>
        <td>{ part }</td>
        <td>{ cacheInfo[ part ] }</td>
      </tr>);
    }

  });

   return loadRows;

}

/**
 * USED BY:  ALVFM This is used for the visitor panel, not code pane
 * @param performance 
 * @returns 
 */
export function createPerformanceTableVisitor( performance: ILoadPerformance , keysToShow: ILoadPerformanceOps[] ) {

  if ( performance ) {
    const loadSummary = <div className={ 'fps-performance' } style={{ paddingLeft: '15px', paddingTop: '30px'}}>
      <div className={ 'fps-header-styles' }>Load Performance:</div>
      {/* Originally:  <div style={{paddingBottom: '8px'}}>forceReloadScripts: { JSON.stringify( performance.forceReloadScripts )}</div> */}
      {/* { !titleAboveTable ? null : <div style={{paddingBottom: '8px'}}>{ titleAboveTable } { JSON.stringify( objAboveTable )}</div> } */}
      <table>
          {/* { buildPerformanceTableRows( fetchInfo.performance ) } */}
          { createPerformanceRows( performance, keysToShow ) }
      </table>
    </div>;

return ( loadSummary );
} else {

  return ( <div></div> );

}


}

/**
 * USED BY:  SecureScript7 loadTable >> loadSummary in \secureScript7\components\SecureScriptVisitorPanel.tsx
 * @param performance 
 * @returns 
 */
 export function createPerformanceTableVisitorXtra( performance: ILoadPerformance, titleAboveTable: string = '', keysToShow: ILoadPerformanceOps[] , objAboveTable: any = null ) {

  const loadSummary = <div className={ 'fps-performance' } style={{ paddingLeft: '15px', paddingTop: '30px'}}>
    <div className={ 'fps-header-styles' }>Load Performance:</div>
    {/* Originally:  <div style={{paddingBottom: '8px'}}>forceReloadScripts: { JSON.stringify( performance.forceReloadScripts )}</div> */}
    { !titleAboveTable ? null : <div style={{paddingBottom: '8px'}}>{ titleAboveTable } { JSON.stringify( objAboveTable )}</div> }
    <table>
        {/* { buildPerformanceTableRows( fetchInfo.performance ) } */}
        { createPerformanceRows( performance, keysToShow ) }
    </table>
  </div>;

  return ( loadSummary );

}

/**
 * USED BY: SecureScript7 loadTable >> loadSummary in \secureScript7\components\SecureScript7.tsx
 * @param performance 
 * @param cacheOnClick 
 * @returns 
 */
export function createPerformanceTableSmall( performance: ILoadPerformance , keysToShow: ILoadPerformanceOps[], cacheOnClick: any ) {
  const loadSummary = <div className={ 'fps-performance' } style={{ paddingLeft: '15px'}}>
    <div className={ 'fps-tableheading' } >Performance Details</div>
    <table>
      {/* { buildPerformanceTableRows( fetchInfo.performance ) } */}
      { createPerformanceRows( performance, keysToShow ) }
      {/* { rows } */}
    </table>
  </div>;

  return ( loadSummary );

}

/**
 * USED BY: SecureScript7 code pane and includes cache info
 * @param cache 
 * @param cacheOnClick 
 * @returns 
 */
//  export function createCacheTableSmall( cache: ICacheInfo, cacheOnClick: any ) {
 export function createCacheTableSmall( cache: any, cacheOnClick: any ) {

  const loadSummary = <div className={ 'fps-performance' } style={{ paddingLeft: '15px'}}>
    <div  className={ 'fps-tableheading' }>Cache Details</div>
    <table>
      {/* { buildPerformanceTableRows( fetchInfo.performance ) } */}
      { createCacheRows( cache ) }
      {/* { rows } */}
    </table>
  </div>;
  
  return ( loadSummary );

}