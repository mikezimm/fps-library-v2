import * as React from "react";
import { Icon, } from 'office-ui-fabric-react/lib/Icon';

import { ISpecialMessage } from './interface';

export function createSpecialElement( SpecialMessage: ISpecialMessage ) {

  if ( SpecialMessage ) {

    const SpecialIconLeft: any = SpecialMessage.leftIcon ? <Icon style={{ marginRight: '20px' }} iconName={ SpecialMessage.leftIcon }/>: undefined ;
    const SpecialIconRight: any = SpecialMessage.rightIcon ? <Icon  style={{ marginLeft: '20px' }} iconName={ SpecialMessage.rightIcon }/>: undefined ;
    const specialUrl: string = SpecialMessage.link !== undefined ? SpecialMessage.link.Url : '';
    const SpecialLink: any = SpecialMessage.link !== undefined ? <span className= { 'special-link' }style={{ padding: '0px 20px' }}
      >{ SpecialMessage.link.Desc ? SpecialMessage.link.Desc : 'More Info' }
    </span>: undefined ;

    if ( specialUrl ) {
      if ( SpecialMessage.style ) {
        SpecialMessage.style.cursor = 'pointer'; 
      }  else { SpecialMessage.style = { cursor: 'pointer' } ; }
    }

    const SpecialElement = <div className={ 'banner-special' } style={ SpecialMessage.style } onClick={ !specialUrl ? undefined : () => ( window.open( specialUrl , '_blank' )) } >
      { SpecialIconLeft }
      { SpecialMessage.message }
      { SpecialLink }
      { SpecialIconRight }
    </div>;

    return SpecialElement;

  } else {

    return undefined;
  }


}