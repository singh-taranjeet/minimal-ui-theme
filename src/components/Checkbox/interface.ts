import { ColorType } from "../../utils/interface";
import React from 'react';

export interface CheckboxParamType extends React.HTMLProps<HTMLInputElement> {
    color?: ColorType
}