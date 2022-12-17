# Publish hints:

npm run clean
npm run build
npm version major/minor/patch
npm publish --access=public

npm install @mikezimm/fps-library-v2@1.0.37


# Changelog

NOTE:  TURN BACK ON STRICT NULL CHECKS - turned off for PropPaneCols

## 1.0.37 - 2022-Dec-15:  FieldPanel Update
- Update mainWebPartRenderBannerSetupX to properly bind saveViews and saveCommands function
- Update class _saveFieldPanelCommandsFunction and _saveFieldPanelViewsFunction with better logic
- Update PropPaneColsClass _updatePerformance to properly show performance

## 1.0.36 - 2022-Dec-15:  FieldPanel Update
- Add FPSFieldsPanelPropGroup to getAllDefaultFPSFeatureGroups

## 1.0.35 - 2022-Dec-15:  FieldPanel Update
- Rename IFieldPanelProps to IMinWPFieldPanelProps
- Subsitute webURL for webUrl for consistancy across library
- Change components folder from PropPaneCols to FieldPanel which is really what it is
- Add FPSBaseClass:  _allowFieldPanel, _FieldPanelDesignMode, _FieldPanelWebProp, _FieldPanelListProp
- Add saveFields, saveViews functions to class
- Add logic to FieldPanel info to fieldPanelProps, runWebPartRender WP Props to fieldPanelProps
- Reorganize runWebPartRender logic to group similar functions ( Panel, Near, FieldPanel etc... )

## 1.0.34 - 2022-Dec-15
- Updated styles references in PropPaneCols component
- Bumped styles version to 1.0.3


## 1.0.33 - 2022-Dec-15
- Add PropPaneCols component - NEEDS CSS FIXED

## 1.0.32 - 2022-Dec-15
- udpate IFPSEnviro.web.id and .site.id to check for complex id object
- Add EasyPages updates in runOnPropChange from Pnpjs-v2 testing
- Migrate src\zComponents\Accordion_ to components/molecules
- Migrate src\zComponents\Arrows_ to components/molecules


## 1.0.31 - 2022-Dec-15
- migrate saveAnalytics.ts, interfaces and functions
- add SiteID, WebID, SiteTitle to IFPSEnviro

## 1.0.30 - 2022-Dec-15
- Add analyticsProps

## 1.0.29 - 2022-Dec-15
- Changed Const: FPSPinMePropsGroup to Function:  FPSPinMePropsGroupX - to auto-detect enviro
- fix _trickyEmailsALL to _trickyEmailsAll (All lower cased)

## 1.0.28 - 2022-Dec-15
- Create getAllDefaultFPSFeatureGroups to get all FPS Groups in one batch
    Auto-detects which to ignore using thisWPClass options


## 1.0.27 - 2022-Dec-15
- Add trickyEmailsAll to FPSEnviro
- update ReactJSON collapsed depth on PropPanel pages

## 1.0.26 - 2022-Dec-15
- change _allowExpando to _allowPandoramic
- change _disablePandoramic to _allowPandoramic
- change _disablePinMe to _allowPinMe for consistancy of this._properties

- NOTE That this change requires logic check on all PinMe applications since 
    now true means allow vs in past it meant disable

## 1.0.25 - 2022-Dec-15
- Create window.FPSEnviro:  IFPSEnviro using createFPSEnviroOnWindow during runSuperOnInit
- Add FPSEnviro to HelpPanel User tab
- Update PropertyPaneGroups to accept thisWPClass: IThisFPSWebPartClass - make life a LOT easier

## 1.0.24 - 2022-Dec-14
- change _exportIgnoreProps to _exportIgnorePropsWP, webpart only passes it's props.  runFPSInit adds FPS ignores
- change _importBlockProps to _importBlockPropsWP, webpart only passes it's props.  runFPSInit adds FPS ignores
- clean up old comments

## 1.0.23 - 2022-Dec-14
- move consolidate some PropPane files

## 1.0.22 - 2022-Dec-14
- Add baseline files for updated IThisFPSWebPartClass, FPSBaseClass
- Add runFPSSuperOnInit, runFPSWebPartRender, runOnPropChange buildExportPropsX

## 1.0.21 - 2022-Dec-13
- update easyPagesSources - add 'Article' css class and logic based on testing

## 1.0.20 - 2022-Dec-13
- Add EasyPages component to banner

## 1.0.19 - 2022-Dec-13
export { FPSBanner4BasicGroup,  } from './FPSBanner4BasicGroup';
export { FPSBanner3NavGroup, } from './FPSBanner3NavGroup';
export { FPSBanner3ThemeGroup } from './FPSBanner3ThemeGroup';

## 1.0.18 - 2022-Dec-13
- fix this. errors in functional components
- update css import statements

## 1.0.17 - 2022-Dec-13
- update PresetFPSBanner with EasyPages EasyIcons
- migrate updateBannerThemeStyles, refreshBannerStylesOnPropChange to src/banner/features/PageStyle/bannerThemes.ts
- migrate renderCustomStyles to src/banner/features/PageStyle/renderCustStyles.ts
- import PreConfig EasyPages/EasyIcons from Drilldown to src/common/PropPaneHelp/PreConfiguredConstants.ts

## 1.0.16 - 2022-Dec-12
- clean up build errors - moved temp files back to npmFunctions so could build

## 1.0.15 - 2022-Dec-12
- More cleanup imports

## 1.0.13 - 2022-Dec-12
- Target more specific imports instead of just import { ... } from '../../../pnpjs
- was causing web part to suck in entire folder and all dependancies

## 1.0.12 - 2022-Dec-11

### Installs

- npm install react-json-view@1.21.3
- npm install @pnp/spfx-property-controls@3.6.0
- npm install @mikezimm/fps-styles@1.0.1

### Linting - Set these to true and cleaned up warnings

  "strictNullChecks": true,
  "noUnusedLocals": false,
- Turned off noUnusedLocals when done... saved error count to zNotes/Errors - noUnusedLocals
- Keeping strictNullChecks ON for now since I was able to clean all current warnings

### Decamelize 

- Created local version of https://github.com/sindresorhus/decamelize,

- Moved PropPane help pages into separate files:  src/common/PropPaneHelp/pages/FPSCommonOnNpm.tsx
- Moved duplicate Audiences from banner sub-folter to src/common/Audiences

### CommandStyles

- import npmFunctions/src/HelpPanelOnNPM/onNpm/defaults_.ts to /src/common/commandStyles/defaults.ts
- import npmFunctions/src/HelpPanelOnNPM/onNpm/adjustCmdThemes_.ts to /src/common/commandStyles/adjustCmdThemes.ts

### VisitorPanel

- Move VisitorPanelHelp Interfaces to src/banner/components/VisitorPanel/Interfaces.ts
- import npmFunctions/src/CoreFPS/VisitorPanelComponent_.tsx to src/banner/components/VisitorPanel/VisitorPanelComponent.tsx
- import npmFuctions/src/CoreFPS/FPSOptionsGroupVisHelp_ to src/banner/components/VisitorPanel/FPSOptionsGroupVisHelp.ts

### CoreFPS

- import npmFuctions/src/CoreFPS/ReactComponentProps to src/banner/mainReact --- Props and State separated
- import npmFuctions/src/CoreFPS_/BannerPageMisc_.tsx to src/banner/components/Panel/createAboutRow.tsx <<< FILE RENAME >>>

### Gear

- import npmFuctions/src/HelpPanelOnNPM/onNpm/interfaces_.ts to src/banner/components/Gear/IKeySiteProps.ts
- import npmFuctions/src/HelpPanelOnNPM/banner/onLocal/bannerGearFunctions_.tsx to 
- import npmFuctions/src/HelpPanelOnNPM/banner/onLocal/bannerGearFunctions_.tsx to src/banner/components/Gear
- import npmFuctions/src/HelpPanelOnNPM/banner/onLocal/bannerSettings_.css to src/banner/components/Gear

### SpecialBanner

- import npmFuctions/src/HelpPanelOnNPM/specialX to src/banner/components/SpecialBanner

### WebPartLinks

- import npmFuctions/src/HelpPanelOnNPM/banner/onLocal/WebPartLinks_.tsx to src/banner/components/WebPartLinks/WebPartLinks.tsx

### Main Component

- import npmFuctions/src/HelpPanelOnNPM/banner/onLocal/component_.tsx to src/banner/banner/component.tsx
- import npmFuctions/src/HelpPanelOnNPM/banner/onLocal/banner_.css to src/banner/banner/banner.css

### Main Render

- import npmFuctions/src/HelpPanelOnNPM/onNpm/BannerInterface_.ts to src/banner/renderBBP/BannerInterface.ts
- import npmFuctions/src/HelpPanelOnNPM/onNpm/buildBannerPropsV1_.ts to src/banner/renderBBP/buildBannerPropsV1.ts
- import npmFuctions/src/HelpPanelOnNPM/onNpm/Moved_/WebPartRenderBannerV2_.ts to src/banner/renderBBP/WebPartRenderBannerV2.ts

### Others

- import npmFuctions/src/Services/PropPane/StringToReactCSS.ts to src/logic/Strings/reactCSS.ts
- import npmFuctions/src/Services/Navigation/site.ts to src/logic/Links/Navigation.ts
- import npmFuctions/src/Elements_ to src/components/atoms/Elements

- import npmFuctions/ to 

## 1.0.11 - 2022-Dec-11
- redirected all css requires to @mikezimm/fps-styles/dist/samefile.css

## 1.0.10 - 2022-Dec-10
- update getPagesContent based on testing

## 1.0.9 - 2022-Dec-10
- update prepSourceColumns, componentPage based on testing

## 1.0.8 - 2022-Dec-10
- filter duplicate columns in prepSourceColumns
  sourceProps.columns = columns.filter((element, index) => ...;
  sourceProps.selectThese = selectThese.filter((element, index) => ...;
  sourceProps.expandThese = expColumns.filter((element, index) => ...;

## 1.0.6 - 2022-Dec-10
- Add check4Gulp to /pnpv2/SourceItems, add saveErrorToLog to /pnpv2/users functions

## 1.0.5 - 2022-Dec-10
- fixes when turning on tsconfig rules:
    "strictNullChecks": true, ==>> reduced to false after some udpates/fixes
    "noUnusedLocals": true, ==>> reduced to false after some udpates/fixes
    "noImplicitAny": true,

## 1.0.4 - 2022-Dec-10
- npm install @mikezimm/fps-pnp2@1.0.10
- had LOTS of due to single UpperCase Users in src/index.ts
- Error was: multiple modules with names that only differ in casing

## 1.0.4 - 2022-Dec-10
- npm install @mikezimm/fps-pnp2@1.0.9
- Fixed errors in ensureUserHere and ensureUserInfo per below:
- Tried passing in user.user but it errored out all the time.  Now testing for .data first
    const userObject: any = user.data ? user.data : user.user;
    return { user: userObject, e: null, status: 'success' }
- Tested full and relative Urls and relative Urls errored out.  Added
    const fullWebUrl = webUrl.indexOf('https:') === 0 ? webUrl : window.location.origin + webUrl;
    let thisListWeb = Web(fullWebUrl);

## 1.0.4 - 2022-Dec-10
- Change createIUserFromUser to NOT put LoginName in an email property

## 1.0.3 - 2022-Dec-10
- update createIUserFromUser:  better fill in User:  LoginName, Emails, and even Picture Url
- fps-pnp2@1.0.8: update fetchSiteAdmins: add (per testing) - import { IList } from "@pnp/sp/lists";

## 1.0.2 - 2022-Dec-10
- Update createIUserFromUser to find variations of email and login names when not in user object.
- Add Mock sample data object of typical context.pageContext.User and legacyPageConext User info

## 1.0.1 - 2022-Dec-10
- npm install @mikezimm/fps-pnp2@1.0.7:  
  update pnp imports to include required things.  Originally found from testing fetchSiteAdmins

## 1.0.0 - 2022-Dec-09
- completely rebuilt userServices in src/pnpjs/Users
