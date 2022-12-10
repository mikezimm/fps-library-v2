# Publish hints:

npm run clean
npm run build
npm version major/minor/patch
npm publish --access=public

npm install @mikezimm/fps-library-v2@1.0.4


# Changelog

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
- completely rebuilt userServices in src\pnpjs\Users
