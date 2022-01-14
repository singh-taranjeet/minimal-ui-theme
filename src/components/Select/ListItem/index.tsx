import React, { useEffect, useState } from 'react';
import { Root } from '../../../styleEngine/components/Root';
import { getDOMElement, getId, mutClass } from '../../../utils/methods';
import { ListItemType } from './interface';
import './listitem.scss';

const liTagName = "li";
const optionTagName = "option";

export const ListItem = (props: ListItemType) => {

    const {children,value, label=""} = props;
    const [id] = useState(getId());
    const [tag, setTag] = useState(optionTagName);
    const [visible, setVisible] = useState(true);

    function onListItemClick() {
        if(tag === liTagName) {
            const dropdownContentClassName = `${mutClass("dropdown-content")}`;
            const div = getDOMElement(id);
            if(div) {
                div?.closest(`ul.${dropdownContentClassName}`)?.setAttribute("data-value", value);
                div?.closest(`ul.${dropdownContentClassName}`)?.setAttribute("data-label", label);
            }
        }
    }

    useEffect(() => {
        const currentElement = getDOMElement(id);
        if(currentElement) {
            const parentNode = currentElement.parentNode?.nodeName;
            if(parentNode === "SELECT") {
                setTag(optionTagName);
            }
            else {
                setTag(liTagName);
            }
        }
    }, [props.children]);

    function isVisible(searchText: any) {
        if(tag === liTagName) {
            if(searchText && searchText.trim() && searchText.trim()?.length) {
                // console.log("searchText", label, label?.includes(searchText), searchText)
                if(!label.trim().toLowerCase().includes(searchText.trim().toLowerCase())) {
                    setVisible(false);
                    return;
                }
            }

            setVisible(true);
        }
    }

    function setEventListenerForTextField() {

        let inputDiv: any = null;

        if(tag === liTagName) {
            const div = getDOMElement(id);
            const dropdownContentClassName = `${mutClass("dropdown-content")}`;

            if(div && div?.closest) {
                const dropDown = div?.closest(`ul.${dropdownContentClassName}`)?.getAttribute("data-m-u-t-id");
                const searchable = div?.closest(`ul.${dropdownContentClassName}`)?.getAttribute("data-m-u-t-searchable");
                if(dropDown && searchable === "true") {
                    inputDiv = getDOMElement(dropDown, "data-m-u-t-text-field-id");
                    if(inputDiv) {
                        inputDiv.addEventListener("input", (e: any) => {
                            isVisible(e?.target?.value || "");
                            console.log("change listening", e)
                        });
                    }
                }
            }
        }
        return () => {
            inputDiv?.removeEventListener("input", () => {}, true);
        }

    }

    useEffect(() => {
        return setEventListenerForTextField();
    },[tag]);

    return (
        <Root 
            tag={tag}
            data-value={value}
            data-label={label}
            className={`${mutClass("list-item")} ${visible ? "" : mutClass('hidden')}`}
            tabIndex={0} 
            data-m-u-t-id={id}
            onClick={onListItemClick}
            role={"option"}>
            {tag === liTagName ? children : value}
        </Root>
    );
}