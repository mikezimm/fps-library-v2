import { IFPSWindowProps } from "../../../banner/features/FPSDOM/Interfaces";
import { IFPSUser } from "../../../logic/Users/IUserInterfaces"
import { IFPSEnviro } from "./IFPSEnviro";

export interface IFPSWindow {

  FPSUser: IFPSUser;

  FPSOptions: IFPSWindowProps;

  FPSEnviro: IFPSEnviro;

}