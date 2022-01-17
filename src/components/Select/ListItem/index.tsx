import React, { useEffect, useState } from 'react';
import { Root } from '@minimal_ui/style-engine';
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
    const [elementState, setElementState] = useState({focus: false});
    const [parentId, setParentId] = useState("");

    const TextFieldDataId = 'data-m-u-t-text-field-id';

    function onListItemSelect() {
        if(tag === liTagName) {
            const dropdownContentClassName = `${mutClass("dropdown-content")}`;
            const div = getDOMElement(id);
            
            if(div) {
                div?.closest(`ul.${dropdownContentClassName}`)?.setAttribute("data-value", value);
                div?.closest(`ul.${dropdownContentClassName}`)?.setAttribute("data-label", label);
            }
        }
        document.dispatchEvent(new Event("list-item-clicked"));
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
            setTimeout(() => {
                const div = getDOMElement(id);
                const dropdownContentClassName = `${mutClass("dropdown-content")}`;

                if(div && div?.closest) {
                    const dropDown = div?.closest(`ul.${dropdownContentClassName}`)?.getAttribute("data-m-u-t-id");
                    const searchable = div?.closest(`ul.${dropdownContentClassName}`)?.getAttribute("data-m-u-t-searchable");
                    const searchText = div?.closest(`ul.${dropdownContentClassName}`)?.getAttribute("data-m-u-t-search-text");

                    if(dropDown && searchable === "true") {
                        inputDiv = getDOMElement(dropDown,TextFieldDataId);
                        if(inputDiv) {
                            isVisible(searchText);
                        }
                    }
                }
            }, 50);
        }
    }

    function onListItemkeydown(event: any) {
        const keyCode = event.keyCode;
        if(keyCode === 13) {
            onListItemSelect();
        }
    }

    // Add custom event for searching
    useEffect(() => {
        // Custom event to search
        if(parentId) {
            document.addEventListener(`searching-${parentId}`, setEventListenerForTextField);
            // unmount
            return () => {
                document.removeEventListener(`searching-${parentId}`, setEventListenerForTextField)
            };
        }
    }, [parentId])

    // Set the id of the parent div on init
    useEffect(() => {
        const div = getDOMElement(id);
        const dropdownContentClassName = `${mutClass("dropdown-content")}`;
        if(div && div?.closest) {
            const dropDown: any = div?.closest(`ul.${dropdownContentClassName}`)?.getAttribute("data-m-u-t-id");
            if(dropDown) {
                setParentId(dropDown);
            }
        } 
    }, [id]);

    return (
        <Root 
            tag={tag}
            data-value={value}
            data-label={label}
            onBlur={() => setElementState({focus: false})}
            onFocus={() => setElementState({focus: true})}
            className={`
                ${mutClass("list-item")} 
                ${mutClass("outline-none")} ${visible ? "" : mutClass('hidden')}
                ${elementState.focus ? mutClass("focus") : ""}
                `.trim()}
            tabIndex={0} 
            aria-hidden={!visible}
            data-m-u-t-hidden={!visible}
            data-m-u-t-id={id}
            onClick={onListItemSelect}
            onKeyDown={onListItemkeydown}
            role={"option"}>
            {tag === liTagName ? children : value}
        </Root>
    );
}