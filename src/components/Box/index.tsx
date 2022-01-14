import React from 'react';
import { ROOT_CLASS_NAME } from '../../utils/constants';

export const Box = (props: React.HTMLProps<HTMLDivElement>) => {
    return (
        <div className={`${ROOT_CLASS_NAME}-box`}>
            {props.children}
        </div>
    );
}