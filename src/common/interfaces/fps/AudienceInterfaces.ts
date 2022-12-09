


export interface IPropertyPaneDropdownOptionFPS {
  index: number;
  key: string;
  text: string;
}

export type IAdminAudience = 'Site Admins';
export type IOwnerAudience = 'Site Owners';
export type IPageEditAudience = 'Page Editors';
export type IItemEditAudience = 'Item Editors';
export type IVisitorAudience = 'Everyone';

export type IFullControlAudience = IAdminAudience | IOwnerAudience;

export const FullControlAudienceChoices: IPropertyPaneDropdownOptionFPS[] = <IPropertyPaneDropdownOptionFPS[]>[  //beAUserAudienceChoicesAll
  {   index: 0,   key: 'Site Admins', text: "Site Admins"  },
  {   index: 1,   key: 'Site Owners', text: "Site Owners"  },
];


export type IPageEditorAudience = IAdminAudience | IOwnerAudience | IPageEditAudience;

export const PageEditorAudienceChoices: IPropertyPaneDropdownOptionFPS[] = <IPropertyPaneDropdownOptionFPS[]>[  //beAUserAudienceChoicesAll
  {   index: 0,   key: 'Site Admins', text: "Site Admins"  },
  {   index: 1,   key: 'Site Owners', text: "Site Owners"  },
  {   index: 2,   key: 'Page Editors', text: "Page Editors"  },
];


export type IItemEditorAudience = IAdminAudience | IOwnerAudience | IPageEditAudience | IItemEditAudience | IVisitorAudience;

export const ItemEditorAudienceChoices: IPropertyPaneDropdownOptionFPS[] = <IPropertyPaneDropdownOptionFPS[]>[  //expandAudienceChoicesAll
  {   index: 0,   key: 'Site Admins', text: "Site Admins"  },
  {   index: 1,   key: 'Site Owners', text: "Site Owners"  },
  {   index: 3,   key: 'Item Editors', text: "Item Editors"  },
];


export type IEditorAudience = IAdminAudience | IOwnerAudience | IPageEditAudience | IItemEditAudience;

export const EditorAudienceChoices: IPropertyPaneDropdownOptionFPS[] = <IPropertyPaneDropdownOptionFPS[]>[  //expandAudienceChoicesAll
  {   index: 0,   key: 'Site Admins', text: "Site Admins"  },
  {   index: 1,   key: 'Site Owners', text: "Site Owners"  },
  {   index: 2,   key: 'Page Editors', text: "Page Editors"  },
  {   index: 3,   key: 'Item Editors', text: "Item Editors"  },
];


export type IEveryoneAudience = IAdminAudience | IOwnerAudience | IPageEditAudience | IItemEditAudience | IVisitorAudience;

export const EveryoneAudienceChoices: IPropertyPaneDropdownOptionFPS[] = <IPropertyPaneDropdownOptionFPS[]>[  //expandAudienceChoicesAll
  {   index: 0,   key: 'Site Admins', text: "Site Admins"  },
  {   index: 1,   key: 'Site Owners', text: "Site Owners"  },
  {   index: 2,   key: 'Page Editors', text: "Page Editors"  },
  {   index: 3,   key: 'Item Editors', text: "Item Editors"  },
  {   index: 4,   key: 'Everyone', text: "Everyone"  },
];

export type IAudienceGroupType = 'Admin' | 'Owner' | 'Page' | 'Item' | 'Editor' | 'Everyone'

