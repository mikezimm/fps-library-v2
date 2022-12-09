# Publish hints:

npm run clean
npm run build
npm version major/minor/patch
npm publish --access=public

npm install @mikezimm/fps-js@1.0.13



# Changelog
## 1.0.14 - 2022-Dec-09
- relocate ISeriesSortObject to src\logic\Arrays\sorting\Interfaces.ts

## 1.0.13 - 2202-Nov-28
- Added mocked MSFT classes and interfaces

## 1.0.12 - 2202-Nov-28
- Added src\logic\Time from: npmFunctions/src\Services\Time_
- Added Class Copy:  SPPermissionCopy_15_2, added more to PageContextCopy_15_2
- Added src\logic\Regex\constants.ts from:  npmFunctions/src\Services\Regex\constants.ts - Moved INullOrStringArray  from file
- Added src\logic\Types\typeServices.ts from:  npmFunctions/src\Services\typeServices.ts - Moved INullOrStringArray

- Add Users, Audiences and some MSFT Classes but they are now causing some build errors like this:
WARNING in ./src/indexes/IPropertyPaneDropdownOption@1.15.2.ts 2:0-48
export 'PropertyPaneDropdownOptionType_15_2' (reexported as 'PropertyPaneDropdownOptionType_15_2') was not found in '../common/interfaces/@msft/IPropertyPaneDropdownOption@1.15.2' (module has no exports)
 @ ./src/indexes/index.ts 13:0-53 13:0-53

I think it is Audiences that need to be here (at least the constants) but they are nested in with PropPaneDropdown Options which I copied in as well.



## 1.0.11 - 2202-Nov-28
- Added StringsIndex, added return types to string functions
- Add CSSCharts index
- Reviewed other logic and Types files, added comments and return functions

## 1.0.10 - 2202-Nov-27
- update WebPartContext@1.15.2 in src/common/interfaces/WebPartContext@1.15.2.ts
    added absoluteUrl

## 1.0.9 - 2202-Nov-27
- create WebPartContext@1.15.2 in src/common/interfaces/WebPartContext@1.15.2.ts for typing
    added indexes:  src/indexes/WebPartContext@152.ts
- import npmFunctions\src\Services\Strings to:  src\logic\Strings
    NEED TO CREATE INDEXES for STRINGS though

## 1.0.8 - 2202-Nov-27
- copied spfxPropControls/@3.11.0 interfaces to avoid import:  src/common/interfaces/openSource/spfxPropControls/@3.11.0
    added indexes:  src/indexes/PnpSPFxPropControls@3.11.0.ts

## 1.0.7 - 2202-Nov-27
- added HeadingsCSS and DOM Tags Indexes, removed FPSHeadingCSS file.
    export * from './DOMHeadings';
    export * from './DOMTags';

## 1.0.6 - 2202-Nov-27
- restructured HeadingsCSS and DOM Tags folders:
  all heading related code:  src/logic/DOM/Headings
  all generic tag related code:  src/logic/DOM/Tags

## 1.0.5 - 2202-Nov-27
- imported HeadingTag functions, interfaces, css into src/logic/DOM/Tags/ from:
    npmFuctions/src/HeadingCSS_
    npmFuctions/src/Services/DOM/Tags/FPSTagFunctions.ts


## 1.0.4 - 2202-Nov-24
- imported npmFunctions/src/Fields/constants and Interfaces into src/Pnpjs/Fields
    changed ootbFields constant to OotbFields ( with leading capital for style consistancy )
    added Fields constants and IFieldDef to indexes

- impported src/QuickCommands_ into src/components/QuickCommands
    removed the [key: string]: from interfaces
    added QuickCommands Interfaces to indexes

- imported src/Services/Math_ to src/logic/Math
    Split into src/logic/Math/labels.ts & src/logic/Math/rounding.ts
    Added indexes: src/indexes/MathLabels.ts and src/indexes/MathRounding.ts

- imported src/Services/Objects_ to logic/Objects
    Split into 3 files with 3 indexes
    export * from './ObjectDeep'; - checkDeepProperty, IReturnErrorType
    export * from './ObjectKeys'; - Moved getKeyChanges, getKeySummary, from Arrays/checks
    export * from './ObjectSimilar'; - findPropFromSimilarKey

- imported src/Services/randomServices.ts to src/logic/Randomize/functions.ts
    Added return function types and indexes

## 1.0.3 - 2202-Nov-24
  move interface:  ISimpleLink to src/logic/Links/Interfaces.ts
  Add Link related functions ie LogFunctions.ts from npmFunctions/Services/Logging into here:  logic/Links/UrlFunctions.ts
    On functions, also added return types and index.ts

## 1.0.2 - 2202-Nov-24
  change spelling of interface:  SimpleLink to ISimpleLink

## 1.0.1 - 2202-Nov-24
  change spelling of interface:  IHelpfulOutput to IHelpfullOutput

## 1.0.0 - 2202-Nov-24

### General

- Initial build and creating first component

Created src/pnpjs/Lists/getVX folder - intent is for support functions and constants that apply to both Pnpjs V2 and V3

### indexes - Created src/indexes for more easier finding/reuse buckets of imports
export * from './ArrayFindObjects';
export * from './ArrayManipulation';
export * from './ArrayObjectKeys';
export * from './ArraySortingNumbers';
export * from './ArraySortingObjects';
export * from './ArraySortingStrings';
export * from './HelpfullErrors';
export * from './LinkInterface';
export * from './PnpjsListGetBasic';
export * from './PnpjsListGetFull';
export * from './Refiners';

### pnpjs
imported npmFunctions/src/Lists/get2 folder inot pnpjs/Lists/GetVX folder
- getSelectColumns - 
    takes in array of string columns with / and just gets actual columns less drilldown functions

- getExpandColumns
    takes in array of string columns with / and only gets columns which should be expanded (ignoring Drilldown functions)

- getLinkColumns
    identifies columns which do not have special /GetLinkDesc string functions in Drilldown

- getFuncColumns - Exept returns array of IFunctionError objects instead of actual react in order to keep react out of this library
    This function gets columns known to be Function columns in the Drilldown web part logic

### logic > arrays
- imported npmFunctions/src/Services/Arrays folder into Logic/Arrays folder
- added return types to all functions
- ISeriesSort, ISeriesSortObject   : src/logic/Arrays/sorting/Interfaces.ts ( was originally in ICSSCharts but is commonly used outside of charts themselves for sorting )
- Renamed Arrays/services.ts to:  src/logic/Arrays/searching.ts ( It only has searching/finding related functions )
- Created Arrays/searching folder, split functions into ojbectfind and objectkeys
- Created Arrays/sorting folder, split into interfaces, number | string | object arrays files

### errors, logging
- imported npmFunctions/src/Services/Logging folder into Logic/Errors folder
- Only importing the friendly message logic.
- Sending the SaveLog function to fps-Pnp2 library

### components
Added folder for functions, interfaces etc specifically built for some components.  These may eventually move to the fps-React library when components are moved there.
- src/components/CarrotCharts
- src/components/CSSCharts
- src/components/Refiners

### common - interfaces or functions that seem to be used in a lot of places
- IISimpleLink with Url, Description, target? :  src/common/interfaces/links.ts
- DisplayMode so I do not need msft import : src/common/interfaces/displayMode.ts