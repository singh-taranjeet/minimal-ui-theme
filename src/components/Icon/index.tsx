import React from 'react';
import { IconType } from '../../utils/interface';
import { mutClass } from '../../utils/methods';
import './icon.scss';

export const Icon = (props: IconType) => {

    const {className="", onClick} = props;

    return (
        <div onClick={onClick} className={`${className} ${mutClass("icon")} ${mutClass("center")} ${mutClass("border-radius-50")}`.trim()}>
            <i className={`${mutClass("i")}`.trim()}></i>
        </div>
    );
}