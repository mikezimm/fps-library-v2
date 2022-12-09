/***
 *     .o88b.  .d8b.  d8888b. d8888b.  .d88b.  d888888b 
 *    d8P  Y8 d8' `8b 88  `8D 88  `8D .8P  Y8. `~~88~~' 
 *    8P      88ooo88 88oobY' 88oobY' 88    88    88    
 *    8b      88~~~88 88`8b   88`8b   88    88    88    
 *    Y8b  d8 88   88 88 `88. 88 `88. `8b  d8'    88    
 *     `Y88P' YP   YP 88   YD 88   YD  `Y88P'     YP    
 *                                                      
 *                                                      

import { IFoamBorder , FoamBorders, FoamBorderSettings, FoamBordersRound, FoamBordersNone, FoamBordersStraight, FoamBordersDefaults } 
    from '@mikezimm/npmfunctions/dist/CarrotCharts/IFoamTreeDefaults';

import { IFoamAnimation , FoamAnimations, FoamAnimationSettings, FoamAnimateGentle, FoamAnimateFadeIn, FoamAnimateFlyIn, FoamAnimateDefaults } 
    from '@mikezimm/npmfunctions/dist/CarrotCharts/IFoamTreeDefaults';

import { IFoamColor , FoamColors, FoamColorSettings, FoamColorLight, FoamColorDark, FoamColorWarm, FoamColorDefaults } 
    from '@mikezimm/npmfunctions/dist/CarrotCharts/IFoamTreeDefaults';

 */

/**
 * This file has all the settings from the pre-configured samples here:
 *      https://get.carrotsearch.com/foamtree/latest/demos/settings.html
 */


/***
 *    d8888b.  .d88b.  d8888b. d8888b. d88888b d8888b. .d8888. 
 *    88  `8D .8P  Y8. 88  `8D 88  `8D 88'     88  `8D 88'  YP 
 *    88oooY' 88    88 88oobY' 88   88 88ooooo 88oobY' `8bo.   
 *    88~~~b. 88    88 88`8b   88   88 88~~~~~ 88`8b     `Y8b. 
 *    88   8D `8b  d8' 88 `88. 88  .8D 88.     88 `88. db   8D 
 *    Y8888P'  `Y88P'  88   YD Y8888D' Y88888P 88   YD `8888Y' 
 *                                                             
 *                                                             
 */


 export const FoamBordersRound = {
    groupBorderRadius: 1,
    groupFillGradientCenterLightnessShift: 30,
    groupFillGradientRimSaturationShift: 20,
    groupFillGradientRimLightnessShift: -15,
  };

  export const FoamBordersNone = {
    groupBorderRadius: 0,
    groupBorderWidth: 0,
    groupInsetWidth: 0,
    groupStrokeWidth: 0,
  };

  export const FoamBordersStraight = {
    groupBorderRadius: 0,
    groupFillType: "plain",
    groupStrokePlainLightnessShift: -20,
    rainbowStartColor: "hsla(0, 100%, 60%, 1)",
    rainbowEndColor: "hsla(360, 100%, 60%, 1)",
  };

  export const FoamBordersDefaults = {
    groupBorderRadius: 4,
    groupFillGradientCenterLightnessShift: 20,
    groupFillGradientRimSaturationShift: 0,
    groupFillGradientRimLightnessShift: -5,

    //groupBorderRadius: 0,
    groupBorderWidth: 4,
    groupInsetWidth: 6,
    groupStrokeWidth: 1.5,

    //groupBorderRadius: 0,
    groupFillType: "gradient",
    groupStrokePlainLightnessShift: -10,
    rainbowStartColor: "hsla(0, 100%, 55%, 1)",
    rainbowEndColor: "hsla(359, 100%, 55%, 1)",
  };

  export type IFoamBorder = 'Default' | 'Round' | 'None' | 'Straight';
  export const FoamBorders : IFoamBorder[] = [ 'Default', 'Round' , 'None' , 'Straight' ];
  export const FoamBorderSettings = [ FoamBordersDefaults, FoamBordersRound, FoamBordersNone, FoamBordersStraight ];


/***
 *     .d8b.  d8b   db d888888b .88b  d88.  .d8b.  d888888b d888888b  .d88b.  d8b   db .d8888. 
 *    d8' `8b 888o  88   `88'   88'YbdP`88 d8' `8b `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
 *    88ooo88 88V8o 88    88    88  88  88 88ooo88    88       88    88    88 88V8o 88 `8bo.   
 *    88~~~88 88 V8o88    88    88  88  88 88~~~88    88       88    88    88 88 V8o88   `Y8b. 
 *    88   88 88  V888   .88.   88  88  88 88   88    88      .88.   `8b  d8' 88  V888 db   8D 
 *    YP   YP VP   V8P Y888888P YP  YP  YP YP   YP    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
 *                                                                                             
 *                                                                                             
 */

  export const FoamAnimateFadeIn = {
    rolloutDuration: 0,
    pullbackDuration: 0,
  };

  export const FoamAnimateGentle = {
    rolloutEasing: "squareInOut",
    rolloutScalingStrength: -0.3,
    rolloutRotationStrength: 0,
    pullbackEasing: "squareInOut",
    pullbackScalingStrength: -0.3,
    pullbackRotationStrength: 0,
    pullbackPolygonDelay: 0.1,
  };

  export const FoamAnimateFlyIn = {
    rolloutMethod: "individual",
    rolloutDuration: 3000,
    rolloutScalingStrength: -1,
    rolloutTranslationXStrength: -0.5,
    rolloutTranslationYStrength: -0.3,
    rolloutRotationStrength: 0,
    rolloutTransformationCenter: 0,
    rolloutPolygonDrag: 0.02,
    rolloutLabelDrag: 0.03,
    rolloutChildGroupsDrag: 0.02,
    pullbackMethod: "individual",
    pullbackDuration: 3000,
    pullbackScalingStrength: -1,
    pullbackTranslationXStrength: -0.5,
    pullbackTranslationYStrength: -0.3,
    pullbackRotationStrength: 0,
    pullbackTransformationCenter: 0,
    pullbackPolygonDelay: 1,
    pullbackPolygonDrag: 0.02,
    pullbackLabelDrag: 0.03,
    pullbackChildGroupsDrag: 0.02,
  };

  export const FoamAnimateDefaults = {
    rolloutDuration: 2000,
    pullbackDuration: 1500,

    rolloutEasing: "squareOut",
    rolloutScalingStrength: -0.7,
    rolloutRotationStrength: -0.7,
    pullbackEasing: "squareIn",
    pullbackScalingStrength: -0.7,
    pullbackRotationStrength: -0.7,
    pullbackPolygonDelay: 0.3,

    rolloutMethod: "groups",
    //rolloutDuration: 3000,
    //rolloutScalingStrength: -1,
    rolloutTranslationXStrength: 0,
    rolloutTranslationYStrength: 0,
    //rolloutRotationStrength: 0,
    rolloutTransformationCenter: 0.7,
    rolloutPolygonDrag: 0.1,
    rolloutLabelDrag: 0.1,
    rolloutChildGroupsDrag: 0.1,
    pullbackMethod: "groups",
    //pullbackDuration: 3000,
    //pullbackScalingStrength: -1,
    pullbackTranslationXStrength: 0,
    pullbackTranslationYStrength: 0,
    //pullbackRotationStrength: 0,
    pullbackTransformationCenter: 0.7,
    //pullbackPolygonDelay: 1,
    pullbackPolygonDrag: 0.1,
    pullbackLabelDrag: 0.1,
    pullbackChildGroupsDrag: 0.1,

  }

  export type IFoamAnimation = 'Default' | 'Gentle' | 'FadeIn' | 'FlyIn';
  export const FoamAnimations : IFoamAnimation[] = [ 'Default', 'Gentle' , 'FadeIn' , 'FlyIn' ];
  export const FoamAnimationSettings = [ FoamAnimateDefaults, FoamAnimateGentle, FoamAnimateFadeIn , FoamAnimateFlyIn ];



/***
 *     .o88b.  .d88b.  db       .d88b.  d8888b. .d8888. 
 *    d8P  Y8 .8P  Y8. 88      .8P  Y8. 88  `8D 88'  YP 
 *    8P      88    88 88      88    88 88oobY' `8bo.   
 *    8b      88    88 88      88    88 88`8b     `Y8b. 
 *    Y8b  d8 `8b  d8' 88booo. `8b  d8' 88 `88. db   8D 
 *     `Y88P'  `Y88P'  Y88888P  `Y88P'  88   YD `8888Y' 
 *                                                      
 *                                                      
 */

  export const FoamColorLight = {
  };

  export const FoamColorDark = {
    groupSelectionOutlineColor: "#fff",
    groupSelectionOutlineShadowSize: 2,
    groupSelectionOutlineShadowColor: "#000",
    groupFillGradientRadius: 1.2,
    groupFillGradientCenterLightnessShift: 30,
    groupFillGradientRimLightnessShift: 0,
    groupStrokeType: "gradient",
    groupStrokeGradientLowerLightnessShift: 0,
    groupHoverStrokeLightnessShift: 10,
    groupExposureShadowColor: "#000",
    groupUnexposureLightnessShift: -50,
    groupUnexposureLabelColorThreshold: 0.15,
  };

  export const FoamColorWarm = {
    rainbowColorDistribution: "linear",
    rainbowColorDistributionAngle: 45,
    rainbowStartColor: "hsla(60, 100%, 55%, 1)",
    rainbowEndColor: "hsla(0, 100%, 60%, 1)",
  };
  
  
  export const FoamColorDefaults = {
    groupStrokeGradientLowerLightnessShift: -20,
    rainbowEndColor: "hsla(359, 100%, 55%, 1)",

    groupSelectionOutlineColor: "#222",
    groupSelectionOutlineShadowSize: 0,
    groupSelectionOutlineShadowColor: "#fff",
    groupFillGradientRadius: 1,
    groupFillGradientCenterLightnessShift: 20,
    groupFillGradientRimLightnessShift: -5,
    groupStrokeType: "plain",
    //groupStrokeGradientLowerLightnessShift: 0,
    groupHoverStrokeLightnessShift: -10,
    groupExposureShadowColor: "rgba(0, 0, 0, 0.5)",
    groupUnexposureLightnessShift: 65,
    groupUnexposureLabelColorThreshold: 0.35,

    rainbowColorDistribution: "radial",
    rainbowColorDistributionAngle: -45,
    rainbowStartColor: "hsla(0, 100%, 55%, 1)",
    //rainbowEndColor: "hsla(0, 100%, 60%, 1)",
  };

  export type IFoamColor = 'Default' | 'Light' | 'Dark' | 'Warm';
  export const FoamColors : IFoamColor[] = [ 'Default', 'Light' , 'Dark' , 'Warm' ];
  export const FoamColorSettings = [ FoamColorDefaults, FoamColorLight, FoamColorDark , FoamColorWarm ];

  