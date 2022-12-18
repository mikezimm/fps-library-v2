
import * as React from 'react';

export const autoDetailsList = ( item: any, highlightKeys: string[], specialKeys: string[], showOthers: boolean ): any[] => {

        //Build Highlighted Props:
        let hoverWebStyle = { fontWeight: 700};
        let showTheseProps = [];

        let missingProp = "Error:  prop not available";

        if ( highlightKeys.length > 0 ) { showTheseProps.push( <div><h2>Highligted Props</h2></div> ); }
        highlightKeys.map( prop => {
            if ( prop === 'refElement') { showTheseProps.push(  item[prop] );
            } else  {
                let propType = typeof item[prop];
                let propVal = propType === 'object' || propType === 'boolean' ? JSON.stringify(item[prop]) : item[prop];
                if ( propVal === undefined ) { propVal = missingProp ; }
                showTheseProps.push(  <p><span style={hoverWebStyle}>{ prop }:</span> { propVal }</p> );
            }
        });

        //console.log('spespecialKeys', specialKeys);

        //showTheseProps.push( <div><ColoredLine color='black' height='1px'></ColoredLine></div> );
        if ( specialKeys.length > 0 ) { showTheseProps.push( <div><h2>Special Props</h2></div> ); }
        specialKeys.map( prop => {
            if ( prop === 'refElement') { showTheseProps.push(  item[prop] );
            } else  {
                let propType = typeof item[prop];
                let propVal = propType === 'object' || propType === 'boolean' ? JSON.stringify(item[prop]) : item[prop];
                if ( propVal === undefined ) { propVal = missingProp ; }
                showTheseProps.push(  <p><span style={hoverWebStyle}>{ prop }:</span> { propVal }</p> );
            }
        });

        if ( showOthers ) {

            showTheseProps.push( <div><h2>Other Props</h2></div> );
            let hoverMinorPropStyle = { fontSize: 'smaller', fontWeight: 700 };

            Object.keys(item).map( prop => {

                if ( prop === 'refElement') { showTheseProps.push(  item[prop] );
                } else if (highlightKeys.indexOf(prop) < 0 && specialKeys.indexOf(prop) < 0) {
                    let propType = typeof item[prop];
                    let propVal = propType === 'object' || propType === 'boolean' ? JSON.stringify(item[prop]) : item[prop];
                    if ( propVal === undefined ) { propVal = missingProp ; }
                    showTheseProps.push(  <p><span style={hoverMinorPropStyle}>{ prop }:</span> { propVal }</p> ); }
            });
        }

  return showTheseProps;

};