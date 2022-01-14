import React from "react";

export interface ListItemType extends React.HTMLProps<HTMLLIElement> {
    children: React.ReactNode,
    value: any,
    label: string
}