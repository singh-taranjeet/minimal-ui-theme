import { CoreComponentParamType, IconType } from "../../utils/interface";
import React from 'react';

export interface InputParamType extends CoreComponentParamType, React.HTMLProps<HTMLInputElement> {
    value?: string,
    icon?: IconType
}