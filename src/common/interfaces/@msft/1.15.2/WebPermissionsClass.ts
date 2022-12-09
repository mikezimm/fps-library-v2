import type { IODataBasePermission_15_2 } from "./IODataBasePermission";

/**
 * COPIED FROM SPFx 1.15.2 Project:  node_modules\@microsoft\sp-page-context\dist\index-internal.d.ts
 * 
 * Used to test whether the current user has a requested set of permissions.
 *
 * @remarks
 *
 * Specifies the built-in permissions available in SharePoint Foundation
 *
 * For more information, see:
 * {@link https://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spbasepermissions.aspx}
 *
 * @public
 */
 export declare class SPPermissionCopy_15_2 {
  /**
   * Has no permissions on the Web site. Not available through the user interface.
   */
  static readonly emptyMask: SPPermissionCopy_15_2;
  /**
   * View items in lists, documents in document libraries, and view Web discussion comments.
   */
  static readonly viewListItems: SPPermissionCopy_15_2;
  /**
   * Add items to lists, add documents to document libraries, and add Web discussion comments.
   */
  static readonly addListItems: SPPermissionCopy_15_2;
  /**
   * Edit items in lists, edit documents in document libraries, edit Web discussion comments in documents,
   * and customize web part Pages in document libraries.
   */
  static readonly editListItems: SPPermissionCopy_15_2;
  /**
   * Delete items from a list, documents from a document library, and Web discussion comments in documents.
   */
  static readonly deleteListItems: SPPermissionCopy_15_2;
  /**
   * Approve a minor version of a list item or document.
   */
  static readonly approveItems: SPPermissionCopy_15_2;
  /**
   * View the source of documents with server-side file handlers.
   */
  static readonly openItems: SPPermissionCopy_15_2;
  /**
   * View past versions of a list item or document.
   */
  static readonly viewVersions: SPPermissionCopy_15_2;
  /**
   * Delete past versions of a list item or document.
   */
  static readonly deleteVersions: SPPermissionCopy_15_2;
  /**
   * Discard or check in a document which is checked out to another user.
   */
  static readonly cancelCheckout: SPPermissionCopy_15_2;
  /**
   * Create, change, and delete personal views of lists.
   */
  static readonly managePersonalViews: SPPermissionCopy_15_2;
  /**
   * Create and delete lists, add or remove columns in a list, and add or remove public views of a list.
   */
  static readonly manageLists: SPPermissionCopy_15_2;
  /**
   * View forms, views, and application pages, and enumerate lists.
   */
  static readonly viewFormPages: SPPermissionCopy_15_2;
  /**
   * Allow users to open a Web site, list, or folder to access items inside that container.
   */
  static readonly open: SPPermissionCopy_15_2;
  /**
   * View pages in a Web site.
   */
  static readonly viewPages: SPPermissionCopy_15_2;
  /**
   * View the layouts page?
   */
  static readonly layoutsPage: SPPermissionCopy_15_2;
  /**
   * Add, change, or delete HTML pages or web part Pages, and edit the Web site using a SharePoint
   * Foundation–compatible editor.
   */
  static readonly addAndCustomizePages: SPPermissionCopy_15_2;
  /**
   * Apply a theme or borders to the entire Web site.
   */
  static readonly applyThemeAndBorder: SPPermissionCopy_15_2;
  /**
   * Apply a style sheet (.css file) to the Web site.
   */
  static readonly applyStyleSheets: SPPermissionCopy_15_2;
  /**
   * View reports on Web site usage.
   */
  static readonly viewUsageData: SPPermissionCopy_15_2;
  /**
   * Create a Web site using Self-Service Site Creation.
   */
  static readonly createSSCSite: SPPermissionCopy_15_2;
  /**
   * Create subsites such as team sites, Meeting Workspace sites, and Document Workspace sites.
   */
  static readonly manageSubwebs: SPPermissionCopy_15_2;
  /**
   * Create a group of users that can be used anywhere within the site collection.
   */
  static readonly createGroups: SPPermissionCopy_15_2;
  /**
   * Create and change permission levels on the Web site and assign permissions to users and groups.
   */
  static readonly managePermissions: SPPermissionCopy_15_2;
  /**
   * Enumerate files and folders in a Web site using Microsoft Office SharePoint Designer 2007 and WebDAV interfaces.
   */
  static readonly browseDirectories: SPPermissionCopy_15_2;
  /**
   * View information about users of the Web site.
   */
  static readonly browserUserInfo: SPPermissionCopy_15_2;
  /**
   * Add or remove personal web parts on a web part Page.
   */
  static readonly addDelPrivateWebParts: SPPermissionCopy_15_2;
  /**
   * Update web parts to display personalized information.
   */
  static readonly updatePersonalWebParts: SPPermissionCopy_15_2;
  /**
   * Grant the ability to perform all administration tasks for the Web site as well as manage content.
   *
   * @remarks
   * Activate, deactivate, or edit properties of Web site scoped Features through the object model or
   * through the user interface (UI). When granted on the root Web site of a site collection, activate,
   * deactivate, or edit properties of site collection scoped Features through the object model. To
   * browse to the Site Collection Features page and activate or deactivate site collection scoped
   * Features through the UI, you must be a site collection administrator.
   */
  static readonly manageWeb: SPPermissionCopy_15_2;
  /**
   * Use features that launch client applications; otherwise, users must work on documents locally and upload changes.
   */
  static readonly useClientIntegration: SPPermissionCopy_15_2;
  /**
   * Use SOAP, WebDAV, or Microsoft Office SharePoint Designer 2007 interfaces to access the Web site.
   */
  static readonly useRemoteAPIs: SPPermissionCopy_15_2;
  /**
   * Manage alerts for all users of the Web site.
   */
  static readonly manageAlerts: SPPermissionCopy_15_2;
  /**
   * Create e-mail alerts.
   */
  static readonly createAlerts: SPPermissionCopy_15_2;
  /**
   * Allows a user to change his or her user information, such as adding a picture.
   */
  static readonly editMyUserInfo: SPPermissionCopy_15_2;
  /**
   * Enumerate permissions on the Web site, list, folder, document, or list item.
   */
  static readonly enumeratePermissions: SPPermissionCopy_15_2;
  /**
   * Has all permissions on the Web site. Not available through the user interface.
   */
  static readonly fullMask: SPPermissionCopy_15_2;
  private _value;
  constructor(value: IODataBasePermission_15_2);
  /**
   * Returns the value of this SPPermission object
   */
  get value(): IODataBasePermission_15_2;
  /**
   * Function for testing whether a given permission mask has any of the requested permissions.
   * @param requestedPerms - Any number of SPPermission objects to be compared against the original
   */
  hasAnyPermissions(...requestedPerms: SPPermissionCopy_15_2[]): boolean;
  /**
   * Function for testing whether a given permission mask has all of the requested permissions.
   * @param requestedPerms - Any number of SPPermission objects to be compared against the original
   */
  hasAllPermissions(...requestedPerms: SPPermissionCopy_15_2[]): boolean;
  /**
   * Function for testing whether a given permission mask has the requested permission.
   * @param requestedPerm - The SPPermission object to be compared against the original
   */
  hasPermission(requestedPerm: SPPermissionCopy_15_2): boolean;
}

export { }