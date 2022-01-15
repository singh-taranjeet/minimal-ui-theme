import React from "react";
import { Root } from "../../styleEngine/components/Root";
import { mutClass } from "../../utils/methods";
import './fieldset.scss';

const InitialClassname = mutClass("fieldset");
interface FieldSetType extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode
}

export const FieldSet = (props: FieldSetType) => {

    const {className=""} = props;

    return (
        <Root tag={"fieldset"} className={`${InitialClassname} ${className}`}>
            {props.children}
        </Root>
    );
}