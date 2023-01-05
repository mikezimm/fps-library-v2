import { IFPSWindowProps } from "../../../banner/features/FPSDOM/Interfaces";
import { IFPSUser } from "../../../logic/Users/IUserInterfaces"
import { LegacyPageContextCopy_15_2 } from "../@msft/1.15.2/WebPartContext";
import { PageContextCopy_15_2 } from "../@msft/1.15.2/WebPartContext";
import { IFPSEnviro } from "./IFPSEnviro";

export interface IFPSWindow {

  FPSUser: IFPSUser;

  FPSOptions: IFPSWindowProps;

  FPSEnviro: IFPSEnviro;

  // Added these for SecureScript7 when adding context to window
  _spPageContextInfo?: LegacyPageContextCopy_15_2;
  _pageContextInfo?: PageContextCopy_15_2;

}

