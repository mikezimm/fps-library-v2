// Copied from SPFx 1.15.2 node_modules\@microsoft\sp-property-pane\dist\index-internal.d.ts

import { PropertyPaneDropdownOptionType_15_2 } from './PropertyPaneDropdownOptionType';

/**
 * PropertyPane drop down options.
 *
 * @public
 */
 export interface IPropertyPaneDropdownOption_15_2 {
    /**
     * A key to uniquely identify this option.
     */
     key: string | number;
     /**
      * Text to render for this option.
      */
     text: string;
     /**
      * Index for this option.
      */
     index?: number;
     /**
      * The type of option. If omitted, the default is PropertyPaneDropdownMenuItemType.Normal
      */
    type?: PropertyPaneDropdownOptionType_15_2;
}
