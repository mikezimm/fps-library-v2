# Can I put my indexes in an indexes folder instead of at src level to keep it clean?
If not, update webpack.config:  fpsJSFunctions: path.resolve(__dirname, 'src/indexes/index.ts')  // myServices is the name of the library - external reference name:  myServices.js
--- Yes I can

# Does it make sense to have a pnp library for JS and another for React?
React is always on the page, 
In EVERY web part, fps-react will refer to fps-js in some way.
I may want to keep some things in the js library in sync with the react library.
If so, can I have 2 separate indexes and roll into each other?
--- Probably not.  Will consolidate/cleanup/restructure

# Can/Should I make my own local minimized version of microsoft classes in order to keep some typing?
PageContext >> PageContextCopy152
WebPartContext >> WebPartContextCopy152
SPPermissions >>
IPropPaneDropdown... >> Need this for EveryoneAudience or I have to split code between 2 projects which need to be together to prevent typos.

--- Interfaces Yes, Classes probably not - pass in as any

# Whats the difference between these?
 export interface IPropertyPaneDropdownOption_15_2 {
 export declare interface IPropertyPaneDropdownOption_15_2 {
--- never heard of export declare interface like that.  maybe that is just classes.

import { IODataBasePermission_15_2 } from "./IODataBasePermission";       << In all my SPFx projects, I just use this >>
import type { IODataBasePermission_15_2 } from "./IODataBasePermission";  << the 'type' part is only needed in in the INDEX FILE SYNTAX >>

# Can I use this syntax to externalize an entire library?
"@microsoft/sp-property-pane": "*",
--- Wasn't sure about this syntax if it rolled everything up.

# Should I just externalize all the package dependancies in all libraries
and then just make them dependancies on the web part project?
--- One note was that it should roll up anything that the index file is looking for.
--- So for instance, if an index file called a function that required an interface, it would bring the interface.
--- But may not bring all the other things if it was not required by the function.
--- Case to verify... all the Constants.

# SCSS Loading
I tried following this guide to make scss work:
https://www.developerhandbook.com/webpack/how-to-configure-scss-modules-for-webpack/

But got some errors I could not resolve.
--- I think she said it might be missing something but would send an example

# CSS CSS CSS.... 
Had to remove src\logic\DOM\Headings\FPSHeadings.css from this package.
Maybe for now just have separate npm for css, not have any logic in it at all?
In my previous package, I ran this after cleaning but it throws an error if I add to ...
Copy-Item "C:/Users/dev/Documents/GitHub/npmFunctions/src"  -filter '*.css' "C:/Users/dev/Documents/GitHub/npmFunctions/dist" -recurse -verbose

like:
"build": "del-cli \"./?(dist|lib)\" && Copy-Item \"C:/Users/dev/Documents/GitHub/npmFunctions/src\"  -filter '*.css' \"C:/Users/dev/Documents/GitHub/npmFunctions/dist\" -recurse -verbose && tsc -p ./tsconfig.json && webpack",

# How do I get Readme and ChangeLog added to lib?
Want version history etc to be copied as well
--- Julie was going to send an example of a script or something that adds version numbers

# How do I get web pack analyizer working?
In a web part project, I add it to the gulpfile.js
Did I do it correctly in webpack.config?  I followed this guide:  https://digitalfortress.tech/debug/how-to-use-webpack-analyzer-bundle/
I get the file but it's very high level.  Is there a way to make it show more detail?  like folder/file level?
--- No comment really... looked ok at first glance.

# How to I get the same warnings for unused expressions as in a default 1.15.2 project?
I checked the eslintrc and tsconfig.json.  There are a lot of differences but it's not flagging any in this or fps-Pnp2 library.
Especially true for unused imports

# Whats diff between:
"@typescript-eslint/no-unused-expressions": "error",  << THIS IS FOR TYPESCRIPT ERRORS >>
'no-unused-expression': 2,  << THIS IS FOR JS ERRORS >>


