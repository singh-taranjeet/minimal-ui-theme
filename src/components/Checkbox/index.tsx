import React, { useEffect, useState } from 'react';
import { Root } from "../../styleEngine/components/Root";
import { getConstant, lightenDarkenColor, mutClass } from '../../utils/methods';
import './checkbox.scss';
import { Icon } from '../Icon';
import { CheckboxParamType } from './interface';
import { ColorType } from '../../utils/interface';
import { primary__color,secondary__color, white__color } from '../../utils/constants';
import { Ripple } from '@minimal_ui/react-ripple';

export const Checkbox = (props: CheckboxParamType) => {

    const {color = ColorType.primary, value="f"} = props;
    const [__color, set__Color] = useState<string>("");

    const [styles, setStyles] = useState<any>({
        checkbox: {},
        icon: {}
    });

    useEffect(() => {
        const colour = (() => {
            if(color === ColorType.primary) return getConstant(primary__color);
            else if(color === ColorType.secondary) return getConstant(secondary__color);
            else {
                return color;
            }
        })();
        set__Color(colour);
        configureStyles(colour);
    }, [color]);

    function configureStyles(__color: string) {

        let styles: any = {};

        function setCssStyles(moreStyles: object) {
            styles = {
                ...styles,
                ...moreStyles
            }
        }

        setCssStyles({
            ":hover": {
                "background-color": lightenDarkenColor(0.93, __color, false, true)
            }
        });

        setStyles({
            ...styles,
            checkbox: styles,
            icon: {
                "border": ((value !== 0) && !value) ? `1px solid ${__color}` : 0,
                "background-color": ((value !== 0) && !value) ? getConstant(white__color) : __color
            }
        });
    }

    return (
        <Ripple borderRadius="50%">
            <Root styles={styles.checkbox} className={`${mutClass("checkbox")} ${mutClass("border-radius-50")} ${mutClass("center")}`}>
                <input {...props} value="" tabIndex={-1} aria-hidden={true} className={`${mutClass("hidden")}`} type="checkbox" />
                <Root className={`${mutClass("border-radius")} ${mutClass("cursor-pointer")}`} styles={styles.icon}>
                    <Icon className={`${mutClass("checkbox-icon")} ${((value !== 0) && !value) ? mutClass("icon-hidden") : "" }`}></Icon>
                </Root>
            </Root>
        </Ripple>
    );
}