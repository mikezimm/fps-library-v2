import { IFPSWindowProps } from "../../../banner/features/FPSDOM/Interfaces";
import { IFPSUser } from "../../../logic/indexes"
import { IFPSEnviro } from "./IFPSEnviro";

export interface IFPSWindow {

  FPSUser: IFPSUser;

  FPSOptions: IFPSWindowProps;

  FPSEnviro: IFPSEnviro;

}