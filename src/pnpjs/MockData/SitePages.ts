
/**
 * Sample created from ReactPnPJSTester web part
 * 
 * sp.web.lists.getByTitle('Site Pages').items
 *  .select('Title','Description','BannerImageUrl','FileRef','Author/Title','Editor/Title','Created','Modified')
 *  .expand('Author','Editor')
 *  .top(15)
 *  .orderBy('Modified', false).get()
 */

export const SampleSitePages =  [
  {
    "odata.type": "SP.Data.SitePagesItem",
    "odata.id": "b06c1b38-c785-472b-9e72-1a971249d05f",
    "odata.etag": "\"10\"",
    "odata.editLink": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(176)",
    "Author@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(176)/Author",
    "Author": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "63776513-0cde-417d-9652-b6ea7961c970",
      "Title": "Mike Tenant"
    },
    "Editor@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(176)/Editor",
    "Editor": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "cff00c8d-a9e3-4ae3-8266-a6f107e8928a",
      "Title": "Mike Tenant"
    },
    "Title": "React Pnpjs Tester",
    "BannerImageUrl": {
      "Description": "/_layouts/15/images/sitepagethumbnail.png",
      "Url": "https://tenant.sharepoint.com/_layouts/15/images/sitepagethumbnail.png"
    },
    "Description": null as any,
    "Created": "2022-12-26T23:20:43Z",
    "Modified": "2022-12-26T23:26:15Z",
    "FileRef": "/sites/Templates/Testing/SitePages/React-Pnpjs-Tester.aspx"
  },
  {
    "odata.type": "SP.Data.SitePagesItem",
    "odata.id": "f897d010-57a8-4feb-8ec7-fe74fa0f94e5",
    "odata.etag": "\"77\"",
    "odata.editLink": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(116)",
    "Author@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(116)/Author",
    "Author": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "2dc9d14e-ca80-426a-a553-f8c065c10285",
      "Title": "Mike Tenant"
    },
    "Editor@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(116)/Editor",
    "Editor": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "b28af7fe-b9e5-4768-8f17-95d7d4068340",
      "Title": "Mike Tenant"
    },
    "Title": "Drilldown7 - Attachments",
    "BannerImageUrl": {
      "Description": "https://tenant.sharepoint.com/_layouts/15/getpreview.ashx?path=%2Fsites%2FTemplates%2FTesting%2FSiteAssets%2FSitePages%2FDrilldown7---Attachments%2F9786-5-Free-Ways-to-Find-People-with-Google.jpeg",
      "Url": "https://tenant.sharepoint.com/_layouts/15/getpreview.ashx?path=%2Fsites%2FTemplates%2FTesting%2FSiteAssets%2FSitePages%2FDrilldown7---Attachments%2F9786-5-Free-Ways-to-Find-People-with-Google.jpeg"
    },
    "Description": null,
    "Created": "2020-10-05T23:29:57Z",
    "Modified": "2022-12-26T02:50:08Z",
    "FileRef": "/sites/Templates/Testing/SitePages/Drilldown7 - Attachments.aspx"
  },
  {
    "odata.type": "SP.Data.SitePagesItem",
    "odata.id": "3a4c22c2-3eaa-4b27-b90c-973407ba8962",
    "odata.etag": "\"46\"",
    "odata.editLink": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(175)",
    "Author@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(175)/Author",
    "Author": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "d8a37de0-5a49-4432-b13d-c56baf1a8ce8",
      "Title": "Mike Tenant"
    },
    "Editor@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(175)/Editor",
    "Editor": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "3fc99a7c-1838-4505-82de-0233d4db8aca",
      "Title": "Mike Tenant"
    },
    "Title": "Test Drilldown FileIcons",
    "BannerImageUrl": {
      "Description": "/_layouts/15/images/sitepagethumbnail.png",
      "Url": "https://tenant.sharepoint.com/_layouts/15/images/sitepagethumbnail.png"
    },
    "Description": null,
    "Created": "2022-12-26T01:40:15Z",
    "Modified": "2022-12-26T02:35:58Z",
    "FileRef": "/sites/Templates/Testing/SitePages/Test-Drilldown-FileIcons.aspx"
  },
  {
    "odata.type": "SP.Data.SitePagesItem",
    "odata.id": "cabcb111-8a47-4bef-879a-84177d5ee91a",
    "odata.etag": "\"54\"",
    "odata.editLink": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(174)",
    "Author@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(174)/Author",
    "Author": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "b55144f2-a7ae-4838-b25a-b3d35735d853",
      "Title": "Mike Tenant"
    },
    "Editor@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(174)/Editor",
    "Editor": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "8d1378b0-e2d2-4dc9-becb-2e143d043e09",
      "Title": "Mike Tenant"
    },
    "Title": "Test fps-test",
    "BannerImageUrl": {
      "Description": "/_layouts/15/images/sitepagethumbnail.png",
      "Url": "https://tenant.sharepoint.com/_layouts/15/images/sitepagethumbnail.png"
    },
    "Description": null,
    "Created": "2022-12-18T21:14:27Z",
    "Modified": "2022-12-20T02:06:05Z",
    "FileRef": "/sites/Templates/Testing/SitePages/Test-fps-test.aspx"
  },
  {
    "odata.type": "SP.Data.SitePagesItem",
    "odata.id": "a894dd59-21fb-4103-a67f-4ed2678e71da",
    "odata.etag": "\"28\"",
    "odata.editLink": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(171)",
    "Author@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(171)/Author",
    "Author": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "7591692f-d468-4e13-aa3c-a310b62b3e25",
      "Title": "Mike Tenant"
    },
    "Editor@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(171)/Editor",
    "Editor": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "70902375-7529-4409-b0dd-77f0a24bca79",
      "Title": "Mike Tenant"
    },
    "Title": "Test Pnpv2 Upgrade copy props",
    "BannerImageUrl": {
      "Description": "/_layouts/15/images/sitepagethumbnail.png",
      "Url": "https://tenant.sharepoint.com/_layouts/15/images/sitepagethumbnail.png"
    },
    "Description": null,
    "Created": "2022-11-13T07:24:07Z",
    "Modified": "2022-12-17T05:08:48Z",
    "FileRef": "/sites/Templates/Testing/SitePages/Test-Pnpv2-Upgrade-copy-props.aspx"
  },
  {
    "odata.type": "SP.Data.SitePagesItem",
    "odata.id": "020161cd-89f9-4653-9586-8f284c040c28",
    "odata.etag": "\"12\"",
    "odata.editLink": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(173)",
    "Author@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(173)/Author",
    "Author": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "ac6456a3-aa83-4c89-8edf-8d5d52dfeb8e",
      "Title": "Mike Tenant"
    },
    "Editor@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(173)/Editor",
    "Editor": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "7f129c01-8896-449a-af00-f55f0670fe41",
      "Title": "Mike Tenant"
    },
    "Title": "Test CoreFPS115",
    "BannerImageUrl": {
      "Description": "/_layouts/15/images/sitepagethumbnail.png",
      "Url": "https://tenant.sharepoint.com/_layouts/15/images/sitepagethumbnail.png"
    },
    "Description": null,
    "Created": "2022-12-16T02:17:18Z",
    "Modified": "2022-12-16T02:24:48Z",
    "FileRef": "/sites/Templates/Testing/SitePages/Test-CoreFPS115.aspx"
  },
  {
    "odata.type": "SP.Data.SitePagesItem",
    "odata.id": "1989bb32-e0ab-4f0a-b5b1-65e157d114cc",
    "odata.etag": "\"75\"",
    "odata.editLink": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(172)",
    "Author@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(172)/Author",
    "Author": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "c2463b9c-9d3a-4169-b3e7-58764ce2e0f7",
      "Title": "Mike Tenant"
    },
    "Editor@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(172)/Editor",
    "Editor": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "567be6df-95f9-40a8-83fd-48708026cc51",
      "Title": "Mike Tenant"
    },
    "Title": "fps Library Tester",
    "BannerImageUrl": {
      "Description": "/_layouts/15/images/sitepagethumbnail.png",
      "Url": "https://tenant.sharepoint.com/_layouts/15/images/sitepagethumbnail.png"
    },
    "Description": null,
    "Created": "2022-12-10T18:22:13Z",
    "Modified": "2022-12-15T21:48:39Z",
    "FileRef": "/sites/Templates/Testing/SitePages/fps-Library-Tester.aspx"
  },
  {
    "odata.type": "SP.Data.SitePagesItem",
    "odata.id": "99688e79-4727-4afb-8f7d-9da2813717ec",
    "odata.etag": "\"59\"",
    "odata.editLink": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(169)",
    "Author@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(169)/Author",
    "Author": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "d881bcee-8c3b-4529-a3cb-94597cb28dc8",
      "Title": "Mike Tenant"
    },
    "Editor@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(169)/Editor",
    "Editor": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "e3df1d0f-fdb4-4b0f-a998-62b5957a66a3",
      "Title": "Mike Tenant"
    },
    "Title": "Pnpv2 Upgrade Installed",
    "BannerImageUrl": null,
    "Description": null,
    "Created": "2022-11-07T04:33:12Z",
    "Modified": "2022-11-13T07:23:01Z",
    "FileRef": "/sites/Templates/Testing/SitePages/Pnpv2-Upgrade-Installed.aspx"
  },
  {
    "odata.type": "SP.Data.SitePagesItem",
    "odata.id": "1d54c62a-29b9-4c77-a294-a510610967f3",
    "odata.etag": "\"51\"",
    "odata.editLink": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(156)",
    "Author@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(156)/Author",
    "Author": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "348e0e99-c457-4b02-a6ff-09e94047d798",
      "Title": "Mike Tenant"
    },
    "Editor@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(156)/Editor",
    "Editor": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "caaf43fb-f475-41a5-86b9-88a949f83caa",
      "Title": "Mike Tenant"
    },
    "Title": "Test Drilldown",
    "BannerImageUrl": {
      "Description": "/_layouts/15/images/sitepagethumbnail.png",
      "Url": "https://tenant.sharepoint.com/_layouts/15/images/sitepagethumbnail.png"
    },
    "Description": null,
    "Created": "2022-08-14T05:55:08Z",
    "Modified": "2022-11-12T08:02:11Z",
    "FileRef": "/sites/Templates/Testing/SitePages/Test-Drilldown.aspx"
  },
  {
    "odata.type": "SP.Data.SitePagesItem",
    "odata.id": "783882df-f022-466c-8f85-66e5adfece83",
    "odata.etag": "\"15\"",
    "odata.editLink": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(148)",
    "Author@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(148)/Author",
    "Author": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "cbe2c6af-b818-43d0-b5be-733023bac554",
      "Title": "Mike Tenant"
    },
    "Editor@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(148)/Editor",
    "Editor": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "1c11dff7-5f9f-428f-b0be-f82de36b6df5",
      "Title": "Mike Tenant"
    },
    "Title": "test Ford IC",
    "BannerImageUrl": {
      "Description": "/_layouts/15/images/sitepagethumbnail.png",
      "Url": "https://tenant.sharepoint.com/_layouts/15/images/sitepagethumbnail.png"
    },
    "Description": null,
    "Created": "2022-01-29T19:26:18Z",
    "Modified": "2022-11-09T20:29:45Z",
    "FileRef": "/sites/Templates/Testing/SitePages/test.aspx"
  },
  {
    "odata.type": "SP.Data.SitePagesItem",
    "odata.id": "14014951-8f63-4375-93b1-7107c56a2a0c",
    "odata.etag": "\"22\"",
    "odata.editLink": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(150)",
    "Author@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(150)/Author",
    "Author": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "f0a39e21-1ed0-4d7e-8d5b-17499c299e5c",
      "Title": "Mike Tenant"
    },
    "Editor@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(150)/Editor",
    "Editor": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "c605d3c4-730c-4368-ba70-740e120878f3",
      "Title": "Mike Tenant"
    },
    "Title": "FileLoader Tool DAB",
    "BannerImageUrl": {
      "Description": "/_layouts/15/images/sitepagethumbnail.png",
      "Url": "https://tenant.sharepoint.com/_layouts/15/images/sitepagethumbnail.png"
    },
    "Description": null,
    "Created": "2022-02-14T02:52:23Z",
    "Modified": "2022-11-09T20:29:14Z",
    "FileRef": "/sites/Templates/Testing/SitePages/FileLoader.aspx"
  },
  {
    "odata.type": "SP.Data.SitePagesItem",
    "odata.id": "0fced3e2-55b4-4542-a7e5-15559abcc35d",
    "odata.etag": "\"14\"",
    "odata.editLink": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(164)",
    "Author@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(164)/Author",
    "Author": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "8ad729c1-2bba-4c52-8c65-c20608559616",
      "Title": "Mike Tenant"
    },
    "Editor@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(164)/Editor",
    "Editor": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "d1f529c5-103c-4554-96ef-be87962a3d24",
      "Title": "Mike Tenant"
    },
    "Title": "DeleteMe - GM",
    "BannerImageUrl": {
      "Description": "/_layouts/15/images/sitepagethumbnail.png",
      "Url": "https://tenant.sharepoint.com/_layouts/15/images/sitepagethumbnail.png"
    },
    "Description": null,
    "Created": "2022-09-09T18:27:15Z",
    "Modified": "2022-11-09T20:09:01Z",
    "FileRef": "/sites/Templates/Testing/SitePages/DeleteMe.aspx"
  },
  {
    "odata.type": "SP.Data.SitePagesItem",
    "odata.id": "af0c0e00-a8cb-43d7-a154-557c870d889e",
    "odata.etag": "\"4\"",
    "odata.editLink": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(170)",
    "Author@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(170)/Author",
    "Author": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "e0e00ee7-e4cb-440e-a93b-e2a5e44b500b",
      "Title": "Mike Tenant"
    },
    "Editor@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(170)/Editor",
    "Editor": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "72485137-7a46-4091-bb66-e2b7a83b397f",
      "Title": "Mike Tenant"
    },
    "Title": "Easy Contents",
    "BannerImageUrl": null,
    "Description": null,
    "Created": "2022-11-09T20:00:51Z",
    "Modified": "2022-11-09T20:01:02Z",
    "FileRef": "/sites/Templates/Testing/SitePages/Easy-Contents.aspx"
  },
  {
    "odata.type": "SP.Data.SitePagesItem",
    "odata.id": "37cc97f6-d2ab-4b22-8f91-49f534e447f7",
    "odata.etag": "\"80\"",
    "odata.editLink": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(1)",
    "Author@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(1)/Author",
    "Author": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "1fbd2428-6e4b-4341-b93d-87e8d78a2279",
      "Title": "Mike Tenant"
    },
    "Editor@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(1)/Editor",
    "Editor": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "6c7d94ad-7371-4f2b-8d7f-cc44faa8c578",
      "Title": "Mike Tenant"
    },
    "Title": "Home",
    "BannerImageUrl": {
      "Description": "/_layouts/15/images/sitepagethumbnail.png",
      "Url": "https://tenant.sharepoint.com/_layouts/15/images/sitepagethumbnail.png"
    },
    "Description": null,
    "Created": "2020-06-16T14:53:15Z",
    "Modified": "2022-10-17T04:12:03Z",
    "FileRef": "/sites/Templates/Testing/SitePages/Home.aspx"
  },
  {
    "odata.type": "SP.Data.SitePagesItem",
    "odata.id": "7206531a-9044-4f7a-9b74-5327135254d1",
    "odata.etag": "\"20\"",
    "odata.editLink": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(168)",
    "Author@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(168)/Author",
    "Author": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "435955bf-0c26-4be0-add2-c055ba51c8fc",
      "Title": "Mike Tenant"
    },
    "Editor@odata.navigationLinkUrl": "Web/Lists(guid'cd77dd1e-4dbd-43fa-aa81-749b4815e584')/Items(168)/Editor",
    "Editor": {
      "odata.type": "SP.Data.UserInfoItem",
      "odata.id": "36c42bdf-23e9-4d1a-8bc5-9afa288d13b0",
      "Title": "Mike Tenant"
    },
    "Title": "v2NpmBanner",
    "BannerImageUrl": {
      "Description": "/_layouts/15/images/sitepagethumbnail.png",
      "Url": "https://tenant.sharepoint.com/_layouts/15/images/sitepagethumbnail.png"
    },
    "Description": null,
    "Created": "2022-10-13T01:08:45Z",
    "Modified": "2022-10-13T03:26:51Z",
    "FileRef": "/sites/Templates/Testing/SitePages/v2NpmBanner.aspx"
  }
]