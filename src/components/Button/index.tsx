import React, { useEffect, useState } from 'react';
import  './button.scss';
import {Ripple} from '@minimal_ui/react-ripple';
import {ColorType, VariantType} from "../../utils/interface";
import {createRipple, getConstant, getId, lightenDarkenColor, mutClass} from '../../utils/methods';
import {Root} from '../../styleEngine/components/Root';
import { primary__color, secondary__color, white__color } from '../../utils/constants';
import { ButtonParamType } from './interface';

const BUTTON_CLASS_NAME_INIT = `${mutClass("button")} ${mutClass("border-radius")}`;

export function Button(props: ButtonParamType){

    const {children, color=ColorType.primary, variant=VariantType.standard} = props;
    const [id] = useState(getId());

    const [style, setStyles] = useState<any>({});

    function setVariantClass() {

        let styles: any = {};

        let __color = (() => {
            if(color === ColorType.primary) return getConstant(primary__color);
            else if(color === ColorType.secondary) return getConstant(secondary__color);
            else {
                return color;
            }
        })();

        function setCssStyles(moreStyles: object) {
            styles = {
                ...styles,
                ...moreStyles
            }
        }

        if(variant === VariantType.filled) {
            setCssStyles({
                "background-color": __color,
                color: getConstant(white__color),
                ":hover": {
                    "background-color": lightenDarkenColor(-0.09, __color, false, true)
                }
            });
        }
        else if(variant === VariantType.outlined) {
            setCssStyles({
                "background-color": getConstant(white__color),
                color: __color,
                "border": `1px solid ${lightenDarkenColor(0.5, __color, false, true)}`,
                padding: "4px 14px",
                ":hover": {
                    "border-color": __color,
                    "background-color": lightenDarkenColor(0.97, __color, false, true),
                }
            });
        }
        else if(variant === VariantType.standard) {
            setCssStyles({
                border: 0,
                "background-color": getConstant(white__color),
                color: __color,
                ":hover": {
                    "border-color": __color,
                    "background-color": lightenDarkenColor(0.96, __color, false, true)
                }
            });
        }

        setStyles(styles);
    }

    function onClick(e: any) {
        console.log("clicked on ripple touch");
        createRipple(id, e);
    }

    function onClickButton(e: any) {
        console.log("clicked on button");
        createRipple(id, e);
        // default on click
        if(props.onClick) {
            props.onClick(e);
        }
    }

    useEffect(() => {
        setVariantClass();
    }, [color]);

    if(props.href) {
        return (
            <Ripple>
                <Root 
                    {...props}
                    tag={"a"} 
                    className={BUTTON_CLASS_NAME_INIT}
                    variant={undefined} 
                    color={undefined} 
                    href={props.href} 
                    target={props.target}
                    styles={style}
                    onClick={onClick}
                    >
                    {children}
                </Root>
            </Ripple>
        );
    }
    else {
        return (
            <Ripple>
                <Root 
                    {...props}
                    className={BUTTON_CLASS_NAME_INIT}
                    variant={undefined} 
                    color={undefined} 
                    tag={"button"}
                    onClick={onClickButton}
                    styles={style}>
                        <div data-m-u-t-id={id} onClick={onClick} className={mutClass('ripple-touch')}></div>
                    {children}
                </Root>
            </Ripple>
            
        )
    }
}
