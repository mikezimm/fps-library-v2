// Originally copied from webparts\genericWebpart\components\Contents\Fields\fieldsFunctions.tsx

export const OOTBFieldsVersions: string[] = ['Author', 'Editor', 'Created_x0020_Date', 'Last_x0020_Modified', '_UIVersion', 'Created', 'Modified', ];

export const OOTBFieldsFiles: string[] = ['FileLeafRef', 'LinkFilenameNoMenu', 'LinkFilename', 'LinkFilename2', 'SMTotalSize', 'FileRef', ];

export const SystemFieldsPublishing: string[] = [ '_ModerationStatus', '_ModerationComments',  ];

export const SystemFields: string[] = [ 'AccessPolicy', ...SystemFieldsPublishing, 'SyncClientId', '_CommentCount', '_CommentFlags', 'ContentTypeId', 'ContentVersion',
'_CopySource', '_EditMenuTableEnd', '_EditMenuTableStart', '_EditMenuTableStart2', 'PermMask', 'EncodedAbsUrl', 'BaseName', 'File_x0020_Type',
'GUID', '_HasCopyDestinations', 'HTML_x0020_File_x0020_Type', 'InstanceID', '_IsCurrentVersion', 'FSObjType', 'SMLastModifiedDate', '_Level',
'NoExecute', 'owshiddenversion', 'FileDirRef', 'ProgId', 'MetaInfo', 'Restricted', 'ScopeId', 'SelectTitle',
'ServerUrl', 'SortBehavior', 'SMTotalFileCount', 'SMTotalFileStreamSize', '_VirusInfo', '_VirusStatus', '_VirusVendorID', 'WorkflowInstanceID',
'WorkflowVersion', '', '', '', '', '', '', '',
];

export const OotbFields: string[] = [ ...OOTBFieldsVersions, ...OOTBFieldsFiles, 'LinkTitle2', 'UniqueId', 'Title', ];