import { CoreComponentParamType } from "../../utils/interface";
import { InputParamType } from "../Input/interface";

export interface TextFieldParamType extends InputParamType, CoreComponentParamType {
    legend?: string
}