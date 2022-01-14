import { CoreComponentParamType } from "../../utils/interface";
import React from 'react';

export interface ButtonParamType extends CoreComponentParamType, React.HTMLProps<HTMLButtonElement> {
    children: React.ReactNode,
    href?: string,
    target?: "_self" | "_blank" | "_parent" | "_top",
}