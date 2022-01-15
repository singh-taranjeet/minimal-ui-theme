import React, { useEffect, useState } from 'react';
import  './button.scss';
import {Ripple} from '@minimal_ui/react-ripple';
import {ColorType, VariantType} from "../../utils/interface";
import {getConstant, getId, lightenDarkenColor, mutClass} from '../../utils/methods';
import {Root} from '../../styleEngine/components/Root';
import { primary__color, secondary__color, white__color } from '../../utils/constants';
import { ButtonParamType } from './interface';

const BUTTON_CLASS_NAME_INIT = `${mutClass("button")} ${mutClass("text-dec-none")} ${mutClass("border-none")}
${mutClass("border-radius")} ${mutClass("inline-align-center")} ${mutClass("cursor-pointer")} ${mutClass("user-select-none")}`;

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
                ":hover": {
                    "border-color": __color,
                    "background-color": lightenDarkenColor(0.97, __color, false, true),
                }
            });
        }
        else if(variant === VariantType.standard) {
            setCssStyles({
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

    useEffect(() => {
        setVariantClass();
    }, [color]);

    return (
        <Ripple animationDuration={800} color={"#1976d291"}>
            <Root 
                {...props}
                tag={props.href ? "a" : "button"} 
                className={`${BUTTON_CLASS_NAME_INIT} ${mutClass(variant)}`.trim()}
                variant={undefined} 
                color={undefined}
                styles={style}
                data-m-u-t-id={id}
                >
                {children}
            </Root>
        </Ripple>
    );
}
