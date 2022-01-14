import React from 'react';
import { IconType } from '../../utils/interface';
import { mutClass } from '../../utils/methods';
import './icon.scss';

export const Icon = (props: IconType) => {

    const {alt="icon", className="", src = "", position = "end"} = props;

    return (
        <div className={`${mutClass("icon")} ${className} ${mutClass("center")}`}>
            {
                src && position 
                ? <img src={src} alt={alt}></img>
                : <div className={mutClass("arrow")}></div>
            }
        </div>
    );
}