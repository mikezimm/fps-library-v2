import * as React from 'react';

import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { IMinTeachBubble } from './IMinTeachBubble';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeBubbleElementFromBubbles( teachBubble: number, TeachBubbleArray:IMinTeachBubble[], setTeachBubble: any, closeTour: any, ): JSX.Element {

  if ( teachBubble === null  ) return null;

  const theBubble: IMinTeachBubble = TeachBubbleArray[ teachBubble ];
  const nextBubble: number = teachBubble === TeachBubbleArray.length -1 ? 0 : teachBubble + 1;
  const prevBubble: number = teachBubble === 0 ? TeachBubbleArray.length -1 : teachBubble - 1;
  // console.log( `HomeTeachingBubbles:` , teachBubble , nextBubble, prevBubble );
  const Bubble: JSX.Element = <div>
      <TeachingBubble
        target={ theBubble.target }
        hasCloseButton={true}
        headline={ theBubble.headline }
        onDismiss={ () => { closeTour( ) } }
        primaryButtonProps={ { text: `${'Next'}`, onClick: () => setTeachBubble( nextBubble ) } }
        secondaryButtonProps={ { text: `${'Previous'}`, onClick: () => setTeachBubble( prevBubble ) } }
        footerContent={ `${ teachBubble + 1 } of ${ TeachBubbleArray.length }` }
      >
        { !theBubble.message ? null : <div>{ `${ theBubble.message }` }</div> }
        { !theBubble.content ? null : <div>{ `${ theBubble.content }` }</div> }
      </TeachingBubble>
  </div>

  return Bubble;

}