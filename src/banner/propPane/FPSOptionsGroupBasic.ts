import {
  // IPropertyPaneDropdownOption,
  PropertyPaneToggle, PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { IFPSBasicToggleSetting } from '../../common/interfaces/fps/IFPSBasicToggleSetting';


/**
 * This is the second version which is more simple (toggles and sliders)
 * @param showSearch
 * @param pageStyle
 * @param quickLaunchHide
 * @param containerMaxWidth
 */


export function FPSOptionsGroupBasic(showSearch: boolean, quickLaunchHide: boolean, pageHeaderHide: boolean, allSectWidth: IFPSBasicToggleSetting, allSectionMaxWidthEnable: any, allSectMargin: IFPSBasicToggleSetting, allSectionMarginEnable: any, toolBarHide: IFPSBasicToggleSetting) {

  let fields: any[] = [];
  if (showSearch === true) {
    fields.push(
      PropertyPaneToggle('searchShow', {
        label: 'Show search bar by default', offText: 'Hide', onText: 'Show',
      }));
  }
  if (quickLaunchHide === true) {
    fields.push(
      PropertyPaneToggle('quickLaunchHide', {
        label: 'Hide quick launch - may be seen briefly', offText: 'Ignore', onText: 'Hidden',
      }));
  }

  if (pageHeaderHide === true) {
    fields.push(
      PropertyPaneToggle('pageHeaderHide', {
        label: 'Hide Page Header - may be seen briefly',
        offText: 'Ignore',
        onText: 'Hidden',
      })
    );
  }
  if (allSectWidth !== 'skip') {
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
        disabled: allSectionMaxWidthEnable === true ? false : true,
        min: 1200,
        max: 3200,
        step: 100,
      })
    );
  }
  if (allSectMargin !== 'skip') {
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
        disabled: allSectionMarginEnable === true ? false : true,
        min: 0,
        max: 100,
        step: 2,
      })
    );
  }
  if (toolBarHide === true) {
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
