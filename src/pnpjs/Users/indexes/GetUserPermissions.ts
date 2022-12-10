
/**
 *  Getting this warning when trying to export IUserPermissionsInfo
 * 
  WARNING in ./src/pnpjs/Users/indexes/GetUserPermissions.ts 2:0-32
    export 'IUserPermissionsInfo' (reexported as 'IUserPermissionsInfo') was not found in '../interfaces/IUserPermissionsInfo' (module has no exports)
    @ ./src/pnpjs/Users/indexes/index.ts 7:0-37 7:0-37
    @ ./src/pnpjs/index.ts 6:0-38 6:0-38
    @ ./src/index.ts 5:0-30 5:0-30
 */

import type { IUserPermissionsInfo } from "../interfaces/IUserPermissionsInfo";
import { getUserPermissions } from "../calls/getUserPermissions";

export { getUserPermissions, IUserPermissionsInfo };
// export { getUserPermissions, };

