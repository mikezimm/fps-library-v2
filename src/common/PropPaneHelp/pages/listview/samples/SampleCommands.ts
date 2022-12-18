
export const SampleCommands: any = {
  "buttons": [[{
    "strPrev": "PREVIOUS Choice Value",
    "str1": "In Process",
    "strNext": "NEXT Choice Value",
    "label": "Set to {str1}",
    "primary": false,
    "confirm": "Are you sure you want to Set to {str1}",
    "alert": "We made our updates!",
    "console": "Message to browser console",
    "panelMessage": "Updated item to {str1}",
    "icon": "User",
    "updateItem": {
      "DueDate": "[today+14]",
      "AssignedToId": "[Me]",
      "Status": "{str1}",
      "ReviewDays": 99,
      "Body": "Hi! It's [Today+3] and I'm $MyName$",
    },
    // https://github.com/mikezimm/drilldown7/issues/246
    "showWhenEvalTrue": "item.AssignedToTitle !== sourceUserInfo.Title && item.Status === {strPrev}"
  }
  ]],
  "fields": [],
};

export const AdvancedCommands: any = {
  "updateItem": {
    "Comments": "{{append rich stamp require}}",
    // https://github.com/mikezimm/drilldown7/issues/245
    "CaptchaField": "{{captcha=Author/Title?Verify Created By Name}}",
    //https://github.com/mikezimm/drilldown7/issues/244,   // https://github.com/mikezimm/drilldown7/issues/246
    "ConditionalDate": "eval( item.TESTCOLUMN===`{str1}` ? `[Today]` : item.TESTCOLUMN===`{strNext}` ? null : item.TESTCOLUMN )",
  }
};
