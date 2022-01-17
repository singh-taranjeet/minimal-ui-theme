import React from 'react';
import { Root } from '@minimal_ui/style-engine';
import { IconType } from '../../utils/interface';
import { mutClass } from '../../utils/methods';
import './icon.scss';

export const Icon = (props: IconType) => {

    const {className="", onClick, styles={}} = props;

    return (
        <Root 
            styles={styles}
            onClick={onClick} 
            className={`${className} ${mutClass("icon")} ${mutClass("center")}`.trim()}>
            <i className={`${mutClass("i")}`.trim()} />
        </Root>
    );
}