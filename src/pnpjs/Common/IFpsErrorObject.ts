import { IHelpfullInput, IHelpfullOutput } from "../../logic/Errors/friendly";
import { IFPSResultStatus } from "@mikezimm/fps-pnp2/lib/services/sp/IFPSResultStatus";

export interface IBlankErrorObj {
  status: IFPSResultStatus;
  e: any;
}

/**
 * This represents the base interface for all return objects less the actual item/items being returned.
 * Extend this to create all return objects and just add what is new
 */

export interface IFpsErrorObject extends IBlankErrorObj {
  errorInfo?: IHelpfullOutput;
  errorInput?: IHelpfullInput; // Used for logging
}