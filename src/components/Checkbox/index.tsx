import React, { useEffect, useState } from 'react';
import { Root } from "@minimal_ui/style-engine";
import { getConstant, getDOMElement, getId, lightenDarkenColor, mutClass } from '../../utils/methods';
import './checkbox.scss';
import { Icon } from '../Icon';
import { CheckboxParamType } from './interface';
import { ColorType } from '../../utils/interface';
import { primary__color,secondary__color, white__color } from '../../utils/constants';
import { Ripple } from '@minimal_ui/react-ripple';

export const Checkbox = (props: CheckboxParamType) => {

    const {color = ColorType.primary} = props;
    const [__color, set__Color] = useState<string>("");
    const [id] = useState(getId());
    const [isChecked, setIsChecked] = useState<boolean>(false);

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
    }, [color, isChecked]);

    // set default check
    useEffect(() => {
        const input: any = getDOMElement(id);
        setIsChecked(!!input.checked);
        getDOMElement(id)?.addEventListener('click', onClick);
        return () => {
            getDOMElement(id).removeEventListener('click', onClick);
        }
    }, [props.checked]);

    function onClick(e: any) {  
        setIsChecked(e.target.checked);
    }

    function onClickWrapper() {
        const input: any = getDOMElement(id);
        input?.click();
    }

    function onChange(e: any) {
        if(props.onChange) {
            props.onChange(e);
        }
    }

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
                "border": (!isChecked) ? `1px solid ${__color}` : 0,
                "background-color": !isChecked ? getConstant(white__color) : __color
            }
        });
    }

    return (
        <Ripple borderRadius="50%" centeredRipple>
            <Root styles={styles.checkbox} className={`${mutClass("checkbox")} ${mutClass("round-padding")} ${mutClass("border-radius-50")} ${mutClass("center")} ${mutClass("user-select-none")}`}>
                <input data-m-u-t-id={id} {...props} onChange={onChange} checked={isChecked} tabIndex={-1} aria-hidden={true} className={`${mutClass("hidden")}`} type="checkbox" />
                <label htmlFor={props.name} className={`${mutClass("hidden")}`}>{props.name}</label>
                <Root onClick={onClickWrapper} className={`${mutClass("border-radius")} ${mutClass("cursor-pointer")}`} styles={styles.icon}>
                    <Icon className={`${mutClass("checkbox-icon")} ${!isChecked ? mutClass("icon-hidden") : "" }`}></Icon>
                </Root>
            </Root>
        </Ripple>
    );
}