/**
 * FROM:  src\HeadingCSS_\FPSHeadingFunctions.ts
 */

export type IFPSHeadingClass = 'dottedBorder' | 'dashedBorder' | 'solidBorder' | 'doubleBorder' | 'ridgeBorder' | 'insetBorder' | 'outsetBorder' | 
'textCenter' | 'heavyTopBotBorder' | 'dottedTopBotBorder' | 'gradiant1' | 
'autoNumberh1' | 'autoNumberh2' | 'autoNumberh3' | 
'fpsStarBlack' | 'fpsStarWhite' | 'fpsSect' | 'fpsPara' | 
'fpsBox' | 'fpsCheckBox' | 
'fpsSun' | 'fpsSmile' | 'fpsComet' | 'fpsPupper' | 'fpsKitty' | 
'arrowDown' | 'arrowRight' | 'eyeBalls' | 'thumbsUp'
;

export const FPSBorderClasses: IFPSHeadingClass[] = [ 'dottedBorder' , 'dashedBorder' , 'solidBorder' , 'doubleBorder' , 'ridgeBorder' , 'insetBorder' , 'outsetBorder' , 
'textCenter' , 'heavyTopBotBorder' , 'dottedTopBotBorder' , ];

export const FPSHeadingNumberClasses: IFPSHeadingClass[] = [ 'dottedBorder' , 'dashedBorder' , 'solidBorder' , 'doubleBorder' , 'ridgeBorder' , 'insetBorder' , 'outsetBorder' , 
'autoNumberh1' , 'autoNumberh2' , 'autoNumberh3' ,  ];

export const FPSEmojiClasses: IFPSHeadingClass[] = [ 'fpsStarBlack' , 'fpsStarWhite' , 'fpsSect' , 'fpsPara' , 
'fpsBox' , 'fpsCheckBox' , 
'fpsSun' , 'fpsSmile' , 'fpsComet' , 'fpsPupper' , 'fpsKitty' , 
'arrowDown' , 'arrowRight' , 'eyeBalls' , 'thumbsUp' ];

export const FPSMiscClasses: IFPSHeadingClass[] = [ 'textCenter' , 'gradiant1' ];

export const FPSHeadingClasses: IFPSHeadingClass[] = [ ...FPSBorderClasses, ...FPSHeadingNumberClasses, ...FPSEmojiClasses, ...FPSMiscClasses ];

//Should match keys of IMinHeadingStyleProps in src\HeadingCSS\FPSHeadingFunctions.ts
export const changeHeadingStyleProps = [ 'h1Style', 'h2Style' ,'h3Style' ];

//Keys should match changeHeadingStyleProps in src\WebPartInterfaces\ImportProps.ts
export interface IMinHeadingStyleProps {
    h1Style: string;
    h2Style: string;
    h3Style: string;
};
