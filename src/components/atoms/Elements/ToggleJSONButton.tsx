
import * as React from 'react';
import { Icon, } from 'office-ui-fabric-react/lib/Icon';


export const defCommandIconStyles = {
    // root: {padding:'10px !important', height: 32},//color: 'green' works here
    icon: { 
    //   fontSize: 18,
    //   fontWeight: "normal",
    //   margin: '0px 2px',
    //   color: '#00457e', //This will set icon color
   },
  };

  /**
   * Copied from ALVFM to toggle the JSON view button to show details
   * @param onClick 
   * @param text 
   * @param cmdStyles 
   * @returns 
   */
  export function makeToggleJSONCmd ( onClick: any, text: string, cmdStyles?: any ) {

    let useStyles = cmdStyles ? cmdStyles : defCommandIconStyles;

    let divStyles : React.CSSProperties= { 
        marginTop: '40px', fontSize: '18px', cursor: 'pointer', width: '220px',
        display: 'flex', alignItems: 'center', flexWrap: 'nowrap', justifyContent: 'space-between'
    };

    let cmd = <div onClick={ onClick } style={ divStyles }><Icon iconName='Code' styles={ useStyles }></Icon> {text}</div>;

    return cmd;
}
