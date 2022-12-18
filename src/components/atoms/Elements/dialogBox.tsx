



// import { Label } 			from 'office-ui-fabric-react/lib/Label';

// import { Icon  } from 'office-ui-fabric-react/lib/Icon';


export interface IMyDialogProps {
    title: string;
    dialogMessage: string;
    showDialog: boolean;
    confirmButton: string;
    _confirmDialog: any;
    _closeDialog: any;
}

export interface IMyBigDialogProps {
  title: string;
  dialogMessage?: string;
  dialogElement?: any;
  showDialog: boolean;
  confirmButton: string;
  _confirmDialog: any;
  _closeDialog: any;
  minWidth?: number;
  maxWidth?: number;
}

