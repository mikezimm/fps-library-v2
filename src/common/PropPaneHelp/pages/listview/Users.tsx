import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';

import { PivotItem, } from 'office-ui-fabric-react/lib/Pivot';

const padRight15: React.CSSProperties = { paddingRight: '15px' };
// const padRight40: React.CSSProperties = { paddingRight: '40px' };

const UserColumnRestPropertiesSPO : string[] = [ 'Title', 'Name', 'EMail', 'FirstName', 'UserName', 'ID', 'SipAddress', 'Office', 'Modified', 'Created', ];
const UserColumnRestPropertiesSPONOTWORK : string[] = [ 'MobilePhone', 'Department', 'JobTitle', 'WorkPhone', 'ImnName', 'NameWithPicture', 'NameWithPictureAndDetails', 'ContentTypeDisp', ];

export function getHelpUsers ( ) : JSX.Element {

  const WebPartHelpElement = <PivotItem  headerText={ 'Users' } >
    <div className={ 'fps-pph-content' }>
      <div className={ 'fps-pph-topic' }>Properties you can get from a Single/Multi User Column.</div>

      <div style={{ display: 'flex' }}>


        <div style={ padRight15 }><div className={ 'fps-pph-topic' }>Valid User Props</div><ul>
          { UserColumnRestPropertiesSPO.map( ( rule : string, idx: number) => <li key={ idx }>{ rule }</li> ) }
          </ul></div>

        <div style={ padRight15 }><div className={ 'fps-pph-topic' }>May not work in SPO</div><ul>
            { UserColumnRestPropertiesSPONOTWORK.map( ( rule : string, idx: number) => <li key={ idx }>{ rule }</li> ) }
            </ul></div>

        <div>
          <div className={ 'fps-pph-topic' }>Sample User Props</div>
          <ul>
            <li><b>Title</b> ~ John Smith</li>
            <li><b>Name</b> ~ i:0#.f|membership|john.smith@fps.com</li>
            <li><b>EMail</b> ~ john.smith@fps.com</li>
            <li><b>Office</b> ~ Office in Delve</li>
            <li><b>ID</b> ~ 79</li>
            <li><b>FirstName</b> ~ John</li>
            <li><b>LastName</b> ~ Smith</li>
            <li><b>UserName</b> ~ john.smith@fps.com</li>
            <li><b>SipAddress</b> ~ john.smith@fps.com</li>
          </ul>
        </div>
      </div>
      <a href="https://sharepoint.stackexchange.com/a/272687" target="_blank">source:  stack exchange</a>
    </div>
  </PivotItem>
  ;
 
  return WebPartHelpElement;

}