
import { IMinTeachBubble } from "./IMinTeachBubble";

export function getHomeTeachBubbles(wpId: string): IMinTeachBubble[] {
  return [
    {
      // step: 0,
      // NOTE:  Target must start with # for Id and prefer to end with a unique webpart instance ID
      target: `#ALVFMHomeTour${wpId}`,
      headline: `Want a tour of this web part?`,
      message: `If you find a 'Map' icon like this, you can click on it and get a Tour of a feature.  In all Tours, Click 'Next' to continue.  You can press the X button to close this tour at any time :).`,
    }, {
      // step: 0,
      target: `#ALVFMMainPivotGeneral${wpId}`,
      headline: `'GENERAL' tab`,
      message: `General information about the manual, not tied to any specific Policy, Instruction or process.`,
    },
  ];
}
