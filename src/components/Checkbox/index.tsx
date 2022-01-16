import React from 'react';
import { Root } from "../../styleEngine/components/Root";
import { mutClass } from '../../utils/methods';
import './checkbox.scss';
import { Icon } from '../Icon';

export const Checkbox = () => {
    return (
        <Root className={`${mutClass("checkbox")} ${mutClass("center")} ${mutClass("cursor-pointer")}`}>
            <input tabIndex={-1} aria-hidden={true} className={`${mutClass("hidden")}`} type="checkbox" />
            <Root className={`${mutClass("border-radius")}`}>
                <Icon className={`${mutClass("checkbox-icon")}`}></Icon>
            </Root>
        </Root>
    );
}