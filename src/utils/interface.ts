export enum ColorType {
    primary="primary", 
    secondary="secondary"
}

export enum VariantType {
    filled = "filled",
    outlined = "outlined",
    standard = "standard"
}
export interface CoreComponentParamType {
    color?: string,
    variant?: VariantType
}

export interface IconType {
    position: "start" | "end",
    src?: string,
    alt?: string,
    className?: string
}
