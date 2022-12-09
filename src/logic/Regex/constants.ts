
// Migrated from:  npmFunctions/src\Services\Regex\constants.ts

//Regular expression for anything like #4 (github issue reference)
export const RegexHashNumber = /\#(\d+)/g;   //https://stackoverflow.com/a/43622095

//RegexXMLOpenProp looks for a Quote, then space, then Capital Letter - like a prop in an xml element
//Originally used in ../Stings/Formatting > getArrayOfXMLElements
export const RegexXMLOpenProp = /[\"] [A-Z]/g;

//Used in /..Elements/markdown
// Moved this to src\logic\Strings\splitHash.ts where it is used
// export type INullOrStringArray = null | string[];

