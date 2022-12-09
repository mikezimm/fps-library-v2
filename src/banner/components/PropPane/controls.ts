// was src\Services\PropPane\zReusablePropPane.ts

import {
  PropertyPaneTextField, 
  PropertyPaneToggle,
  PropertyPaneSlider,
} from '@microsoft/sp-property-pane';

import { camelToSentanceCase } from '../../../logic/Strings/stringCase';


/**
* makePropDataToggles creates an array of data Toggle elements based on a camelCase string array like prop keys
* and turns the keys into Sentance Case text
* @param props 
* @param off 
* @param on 
* @param checked 
*/

export function makePropDataToggles( newProps: string[], prevArray: any[] = [], off: string = 'Off', on: string = 'On', checked: boolean = true, disabled: boolean = false ) {

  let newArray : any[] = prevArray;
  newProps.map( propName => {
    let newLabel = camelToSentanceCase(propName);
    newArray.push(
        PropertyPaneToggle(propName, {
          label: newLabel,
          onAriaLabel: newLabel + ' ' + on,
          offAriaLabel: newLabel + ' ' + off,
          offText: off,
          onText: on,
          disabled: disabled,
          checked: checked,
        })
    );
  });
  return newArray;
}

/**
* makePropDataText creates an array of data Toggle elements based on a camelCase string array like prop keys
* and turns the keys into Sentance Case text
* 
* @param newProps 
* @param prevArray 
* @param description 
* @param disabled 
*/
export function makePropDataText( newProps: string[], prevArray: any[] = [], description: string = '', disabled: boolean = false ) {
  let newArray : any[] = prevArray;
  newProps.map( propName => {
    let newLabel = camelToSentanceCase(propName);
    newArray.push(
      PropertyPaneTextField(propName, {
        label: newLabel,
        ariaLabel: newLabel,
        disabled: disabled,
        description: description,
      })
    );
  });
  return newArray;
}

/**
* makePropDataSliders creates an array of data Slider elements based on a camelCase string array like prop keys
* and turns the keys into Sentance Case text

 * @param newProps 
 * @param prevArray 
 * @param min 
 * @param max 
 * @param step 
 * @param disabled 
 */
export function makePropDataSliders( newProps: string[], prevArray: any[] = [], min: number, max: number, step: number, disabled: boolean = false ) {
  let newArray : any[] = prevArray;
  newProps.map( propName => {
    let newLabel = camelToSentanceCase(propName);
    newArray.push(
      PropertyPaneSlider(propName, {
        label: newLabel,
        ariaLabel: newLabel,
        disabled: disabled,
        min: min,
        max: max,
        step: step,
        showValue: true,
      }),

    );
  });
  return newArray;
}