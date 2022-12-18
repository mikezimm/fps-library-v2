/**
 * This is copied from node_modules\@pnp\sp\fields\types.d.ts
 * 
 */

import { FieldTypes } from "./FieldTypes";

export interface IFieldInfo {
    DefaultFormula: string | null;
    DefaultValue: string | null;
    Description: string;
    Direction: string;
    EnforceUniqueValues: boolean;
    EntityPropertyName: string;
    FieldTypeKind: FieldTypes;
    Filterable: boolean;
    FromBaseType: boolean;
    Group: string;
    Hidden: boolean;
    Id: string;
    Indexed: boolean;
    IndexStatus: number;
    InternalName: string;
    JSLink: string;
    PinnedToFiltersPane: boolean;
    ReadOnlyField: boolean;
    Required: boolean;
    SchemaXml: string;
    Scope: string;
    Sealed: boolean;
    ShowInFiltersPane: number;
    Sortable: boolean;
    StaticName: string;
    Title: string;
    TypeAsString: string;
    TypeDisplayName: string;
    TypeShortDescription: string;
    ValidationFormula: string | null;
    ValidationMessage: string | null;
}