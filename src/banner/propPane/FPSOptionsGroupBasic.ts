import {
  // IPropertyPaneDropdownOption,
  PropertyPaneToggle, PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { IFPSBasicToggleSetting } from '../../common/interfaces/fps/IFPSBasicToggleSetting';
import { check4Gulp } from '@mikezimm/fps-pnp2/lib/services/sp/CheckGulping';
import { IFPSWindow } from '../../common/interfaces/fps/Window';
import { IPageLayoutType } from '../../common/interfaces/indexes/Layout';
import { IThisFPSWebPartClass } from '../FPSWebPartClass/IThisFPSWebPartClass';

/**
 * This is the second version which is more simple (toggles and sliders)
 * @param showSearch
 * @param pageStyle
 * @param quickLaunchHide
 * @param containerMaxWidth
 */

//thisWPClass: IThisFPSWebPartClass
// export function FPSOptionsGroupBasic(showSearch: boolean, quickLaunchHide: boolean, pageHeaderHide: boolean, allSectWidth: IFPSBasicToggleSetting, 
//     allSectionMaxWidthEnable: any, allSectMargin: IFPSBasicToggleSetting, allSectionMarginEnable: any, toolBarHide: IFPSBasicToggleSetting) {

export function FPSOptionsGroupBasic(thisWPClass: IThisFPSWebPartClass) {

  const isSinglePageApp = thisWPClass._FPSEnviro.pageLayout === 'SingleWebPartAppPageLayout' ? true : false;

  if ( isSinglePageApp === true ) return 
  let fields: any[] = [];
  if (thisWPClass._allowShowSearch === true) {
    fields.push(
      PropertyPaneToggle('searchShow', {
        label: 'Show search bar by default', offText: 'Hide', onText: 'Show',
      }));
  }
  if (thisWPClass._allowQuickLaunchHide === true) {
    fields.push(
      PropertyPaneToggle('quickLaunchHide', {
        label: 'Hide quick launch - may be seen briefly', offText: 'Ignore', onText: 'Hidden',
      }));
  }

  if (thisWPClass._allowPageHeaderHide === true) {
    fields.push(
      PropertyPaneToggle('pageHeaderHide', {
        label: 'Hide Page Header - may be seen briefly',
        offText: 'Ignore',
        onText: 'Hidden',
      })
    );
  }
  if (thisWPClass._allowAllSectWidth !== false ) {
    fields.push(
      PropertyPaneToggle('allSectionMaxWidthEnable', {
        label: 'All Sections Max Width',
        offText: 'Off',
        onText: 'On',
      })
    );
    fields.push(
      PropertyPaneSlider('allSectionMaxWidth', {
        label: 'Max width of all sections',
        disabled: thisWPClass.properties.allSectionMaxWidthEnable === true ? false : true,
        min: 1200,
        max: 3200,
        step: 100,
      })
    );
  }
  if (thisWPClass._allowAllSectWidth !== false) {
    fields.push(
      PropertyPaneToggle('allSectionMarginEnable', {
        label: 'All Sections Margin',
        offText: 'Off',
        onText: 'On',
      })
    );
    fields.push(
      PropertyPaneSlider('allSectionMargin', {
        label: 'Top and Bottom Margin',
        disabled: thisWPClass.properties.allSectionMarginEnable === true ? false : true,
        min: 0,
        max: 100,
        step: 2,
      })
    );
  }
  if (thisWPClass._allowToolBarHide === true) {
    fields.push(
      PropertyPaneToggle('toolBarHide', {
        label: 'Hide Toolbar - while viewing',
        offText: 'Ignore',
        onText: 'Hidden',
      })
    );
  }

  let optionsGroup = {
    groupName: 'FPS Page Layout - Basic',
    isCollapsed: true,
    groupFields: fields

  };

  return optionsGroup;

}
