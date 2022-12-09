

 export const QuickCommandsTMT = {

  buttons: [{
      label: "ParkMe",
      primary: false,
      alert: "Hey, you Parked the project!",
      confirm: "Are you sure you want to Park this Project?",
      console: "Confirming we just parked a project",
      panelMessage: "ParkedPanel Text goes here!",
      icon: "Auto",
      updateItem: {
        StatusTMT: "8. Park",

      }
    },{
      label: "CompleteMe",
      primary: false,
      alert: "Hey, you Completed the project!",
      confirm: "Are you sure you want to Complete this Project?",
      console: "Confirming we just Completed a project",
      panelMessage: "Complete Panel Text goes here!",
      icon: "Checkbox",
      updateItem: {
        StatusTMT: "9. Completed",
        CompletedByTMT: "",
        CompletedDateTMT: "",

      }
    },
  ],
  onUpdateAlsoCallback: false,
  callBack: null,

};