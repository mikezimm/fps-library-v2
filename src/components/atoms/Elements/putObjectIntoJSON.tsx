import * as React from 'react';
import ReactJson from "react-json-view";

export function putObjectIntoJSON(obj: any, name: string = null, collapsed: boolean | false = false ) {
  // return <ReactJson src={ obj } name={ 'panelItem' } collapsed={ true } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } style={{ padding: '20px 0px' }}/>;
  return <ReactJson src={obj} name={name} collapsed={collapsed} displayDataTypes={false} displayObjectSize={false} enableClipboard={true} style={{ padding: '20px 0px' }} theme={'rjv-default'} indentWidth={2} />;
}
