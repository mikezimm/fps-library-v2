
import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import DotsHook, { IDotsHookProps } from './SelectDots/component'
import { getWhoDunItElements } from '../../atoms/WhoDunItRow/getWhoDunIt';

require ('@mikezimm/fps-styles/dist/fadeCarouselStyles.css');
require ('@mikezimm/fps-styles/dist/fadeCarouselArrows.css');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ICarouselItem extends Partial<any> {
  imageSrc?: string;
  title?: string;
  location?: string;
  //Added to make it easier for opening based on parent item link
  href?: string;
  target?: string;
  FirstPublishedDate?: any;

  createdLoc?: string;
  "Author/Title"?: string;

  modifiedLoc?: string;
  "Editor/Title"?: string;

 }

export interface ICarouselProps {
  items: ICarouselItem[];
  firstXItems?: number;
  titleField?: string;        // Default = Title
  descriptionField?: string;  // Default = Description
  hrefField?: string;         // Default = FileRef
  imageUrlField?: string;     // Default = BannerImageUrl.Url
  noImage?: boolean;
  showCreated?: boolean;       // Show Created Date / Author if it is different
  showPublished?: boolean;     // Show first published date and by whome
  showModified?: boolean;      // Show Modified Date / Editor if it is different
  constainerStyles?: React.CSSProperties; // {{ width: '650px', height: '450px' }}
  constainerClass?: string; // css class name from parent web part
}

export interface IFadeCarouselProps {
  carouselProps: ICarouselProps;
  dotProps?: IDotsHookProps;
}

// getNextIndex copied to fps-library-v2 here:  src\logic\Arrays\searching\getNextIndex.ts
export function getNextIndex( length: number, current: number, back: boolean = false ): number {
  if ( back === false ) {
    return current === length - 1 ? 0 : current + 1;
  } else {
    return current === 0 ? length - 1 : current - 1;
  }
}

const FadeCarousel: React.FC<IFadeCarouselProps> = ( props ) => {

  const { items, titleField, descriptionField, hrefField, imageUrlField, constainerStyles, constainerClass, noImage, firstXItems, showCreated, showModified, showPublished } = props.carouselProps;
  const [ currentSlide, setCurrentSlide ] = useState<number>( 0 );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ showItems, setShowItems ] = useState<ICarouselItem[]>( firstXItems && firstXItems > 0 ? items.slice(0, firstXItems ) : items );

  const titleProp: string = titleField ? titleField : 'Title';

  const slides = showItems.map( ( item, index ) => {
    const inOrOut = index === currentSlide ? 'fpsFadeIn' : 'fpsFadeOut';
    const imageLink = imageUrlField ? item[ imageUrlField ] : item.BannerImageUrl ? item.BannerImageUrl.Url.replace( 'tenant', 'mcclickster' ) : '' ;
    const openLink = `${window.location.origin}${item[ hrefField ? hrefField : 'FileRef' ]}`;



    const WhoDates = getWhoDunItElements( { item: item, showCreated: showCreated, showModified: showModified, showPublished: showPublished } );

    // const modifiedString: string = showModified === true ? `Modified${ item.modifiedLoc } - ${ item['Editor/Title'] }` : '';
    // const WhoDates = <div className={ 'whoDateStamps' }>
    //   { showCreated !== true || item.FirstPublishedDate ? null : 
    //     <div className={ 'dateStamps' } title = { modifiedString } >
    //       <div>Created</div> <div>{ item.createdLoc }</div> <div>{ item['Author/Title'] }</div>
    //     </div>
    //   }
    //   { showPublished !== true ? null : 
    //     <div className={ 'dateStamps' } title = { modifiedString } >
    //       {/* <div>Published</div> <div>{ item.FirstPublishedDate.toLocalTime() }</div> <div>{ item['Author/Title'] }</div> */}
    //       <div>Published</div> <div>{ item.FirstPublishedDate ? item.FirstPublishedDate : 'NOT YET PUBLISHED' }</div> <div>{  }</div>
    //     </div>
    //   }
    //   {/* { showModified !== true ? null : 
    //     <div className={ 'dateStamps' }>
    //       <div>Modified</div> <div>{ item.modifiedLoc }</div> <div>{ item['Editor/Title'] }</div>
    //     </div>
    //   } */}
    // </div>;

    return ( <div key={index} onClick={ () => window.open( openLink , '_blank') } className= { `fpsFadeElement ${inOrOut}`}>
      { !imageLink || noImage === true ? null : <img src={ imageLink.replace( 'tenant', 'mcclickster' ) }/> }
      <h3>{ item[ titleProp ] }</h3>
      <p>{ item[ descriptionField ? descriptionField : 'Description' ] }</p>
      { WhoDates }
    </div>
    )});

  const slider = <div className={ `fpsFadeContainer ${constainerClass}` } style={ constainerStyles }>
    <div className = 'fpsFadeArrow fpsFadeArrowL' onClick={ () => setCurrentSlide ( getNextIndex( showItems.length, currentSlide, true )) }>
        <Icon iconName="ChevronLeft" />
    </div>

    { slides }

    <div className = 'fpsFadeArrow fpsFadeArrowR' onClick={ () => setCurrentSlide ( getNextIndex( showItems.length, currentSlide )) }>
      <Icon iconName="ChevronRight" />
    </div>

    <DotsHook 
      items={ showItems }
      current={ currentSlide }
      selectCallback= { setCurrentSlide }
      dotsWPProps = {{...{
        maxDots: firstXItems ? firstXItems : 7,
        titleProp: titleProp,
        // selectedLabel = { `This is a new {count} label from {current} based on {Title}` }
        // containerStyle = {{ fontSize: '48px', color: 'darkred', padding: '10px', }}
        // iconStyle = {{ fontSize: '18px', color: 'darkgreen', padding: '3px', }}
        // labelStyle = {{ fontSize: '22px', color: 'purple', padding: '5px',  }}
      },...props.dotProps }}

    />
  </div>;

  return ( slider );

}

export default FadeCarousel;