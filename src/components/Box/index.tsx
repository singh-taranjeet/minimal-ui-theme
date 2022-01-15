import React from 'react';
import { mutClass } from '../../utils/methods';
import './box.scss';

export const Box = (props: React.HTMLProps<HTMLDivElement>) => {
    return (
        <div className={`${mutClass("box")}`}>
            {props.children}
        </div>
    );
}