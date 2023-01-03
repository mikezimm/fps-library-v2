
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { getSpreadIndexes, } from '../../../../logic/Arrays/thinOutArray';

require ('@mikezimm/fps-styles/dist/selectDots.css');

// These could be passed in from the parent web part via props or by parent component
export interface IDotsHookWPProps {
  maxDots: number; // max number of dots to show
  titleProp?: string; // Property key of the item to be shown when hovering over dot and with selected text
  selectedLabel?: string; // String with {current} and {Title} in it which will be replaced with the index of count and titleProp of the selected item
  containerStyle?: React.CSSProperties;  // applied to fpsDotsContainer,  like color, fontSize etc.
  constainerClass?: string;  // applied to fpsDotsContainer,  like color, fontSize etc.
  labelStyle?: React.CSSProperties;  // applied to text below the dots like color, fontSize
  iconStyle?: React.CSSProperties;  // applied to the dot icon - like padding, margin
}

export interface IDotsHookProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[]; // Items you are making dots for
  current: number; // Currently selected dot index
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectCallback: any;  // Function to call back parent and update selected prop:  () => setCurrentSlide ( index )
  dotsWPProps: IDotsHookWPProps;
}

const defaultMessage: string = `Currently showing item: {current} of {count}`;

const DotsHook: React.FC<IDotsHookProps> = ( props ) => {

  const { items, current, selectCallback, } = props;
  const { maxDots, titleProp, selectedLabel, containerStyle, labelStyle, iconStyle, constainerClass } = props.dotsWPProps;
  const [ dotsToShow, setDotsToShow ] = useState<number[]>( [] );

  // useEffect NOTES:  Start with anonomous function
  useEffect(() => {
    // useEffect NOTES:  Be sure to wrap this in an anonomous function or it will keep rendering over and over
    ( () => { const showDots: number[] = getSpreadIndexes( items.length, maxDots );
      console.log('showDots: ', showDots );
      setDotsToShow( showDots );

    // useEffect NOTES:  Be sure to add () at the end of the function to call it correctly
    })();

  // useEffect NOTES:  init has , []) at the end
  }, []);

  const dots : JSX.Element[] = [];

  items.map( ( item, index ) => { 
    const selectDot = index === current ? 'fpsSelectDot' : 'fpsUnSelectDot';
    if ( dotsToShow.indexOf( index) > -1 ) dots.push(
      <Icon title={ `#${index+1} of ${items.length} ${ titleProp ? ` - ${item[titleProp]}` : ''}` } 
        onClick = { () => selectCallback( index ) } className= { `fpsFadeDots ${selectDot}`} iconName='CircleShapeSolid'
        style= { iconStyle }/> );
  });

  const baseLabel = selectedLabel ? selectedLabel : selectedLabel !== '' ? defaultMessage : '';

  const dotLabel = baseLabel.replace(`{Title}`, items[current] ? items[current][titleProp] : '')
    .replace(`{current}`,(current + 1).toFixed() )
    .replace(`{count}`,(items.length).toFixed() );

  const dotsElement = <div className={`fpsDotsContainer ${constainerClass}`} style= { containerStyle }>
    <div className = 'fadeInDots'>
      { dots }
    </div>
    <div className = 'dotLabel'  style= { labelStyle }>
      { dotLabel }
    </div>
  </div>;

  return ( dotsElement );
}

export default DotsHook;