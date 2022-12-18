// import { IViewField } from "@pnp/spfx-controls-react/lib/ListView";

import { IViewField } from "../../../../common/interfaces/openSource/spfxControlsReact/@3.7.2/IViewField";

//Try variation of this as well
// export const HandleBarsRegexV2 =/[^{{\}]+(?=}})/gi
export interface IViewFieldDD extends IViewField {
  linkSubstitute?: string;
  textSubstitute?: string;
  showEmptyAsEmpty?: boolean;
  render?: any;
}
