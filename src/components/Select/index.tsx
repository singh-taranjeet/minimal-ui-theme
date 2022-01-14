import React, { useState, useRef, useEffect } from 'react';
import { Root } from '../../styleEngine/components/Root';
import { CoreComponentParamType, VariantType } from '../../utils/interface';
import { getDOMElement, getId, mutClass, useOutsideClickHandler } from '../../utils/methods';
import { FieldSet } from '../Fieldset';
import { Icon } from '../Icon';
import { TextField } from '../Textfield';
import './select.scss';

interface MUTSelectType extends React.HTMLProps<HTMLSelectElement>, CoreComponentParamType {
    legend? : string,
    searchable?: boolean
}

export const Select = (props: MUTSelectType) => {

    const [isOpen, setIsOpen] = useState(false);
    const [id] = useState(getId());
    const [content, setContent] = useState<any>("");

    const [searchText, setSearchText] = useState("");
    
    const { 
        legend, 
        onChange, 
        searchable=false, 
        variant=VariantType.standard
    } = props;

    const wrapperRef = useRef(null);

    useOutsideClickHandler(wrapperRef, closeDropdown.bind(this));

    function onSelectItem() {

        const div = getDOMElement(id);
        if(div && document && window) {
            const value = div.getAttribute("data-value");
                setSelectValue(value);
        }
        setIsOpen(false);
    }

    function openDropdown() {
        if(!isOpen) {
            addEventListenerToNavigateListItems();
        }
        setIsOpen(true);
        setSearchText("");
    }

    function closeDropdown() {
        setIsOpen(false);
        setSearchText("search");
        removeEventListenerToNavigateListItems();
    }

    function setSelectValue(value: any, onInit=false) {
        if(document && window) {
            const selectEle: any = document.getElementById(`select-${id}`);

            for(let i=0;i<selectEle.options.length; i++) {
                if(selectEle.options[i].value === value) {
                    selectEle.options[i].selected = true;
                    setContent(selectEle?.options[i]?.getAttribute('data-label') || "");
                }
            }
            if(!onInit) {
                selectEle.value = value;
                const evt: any = document.createEvent("HTMLEvents");
                evt.initEvent("change", false, true);
                selectEle.dispatchEvent(evt);
            }
        }

    }

    // on press key on select content
    function onkeyDown(e: any) {
        const KeyID = e.keyCode;
        switch(KeyID) {
            case 32:
                openDropdown();
                break;
            case 13:
                openDropdown();
                break;
            case 9: 
                closeDropdown();
                break;
            default:
                break;
        }

    }

    // When dropdown menu is open add event listener to navigate through the list items
    function addEventListenerToNavigateListItems() {
        document.addEventListener('keydown', (event: any) => {

            if(event.keyCode === 40) {
                navigateListOptions(true);
            }
            if(event.keyCode === 38) {
                navigateListOptions(false);
            }
            if(event.keyCode === 9) {
                closeDropdown();
            }
        });
    }

    // When dropdown menu is closed remove the event listener to navigate through the list items
    function removeEventListenerToNavigateListItems() {
        document.removeEventListener('keydown', () => {});
    }

    function navigateListOptions(downwards = true) {

        const div: any = getDOMElement(id);

        let foundElement = -1;

        if(downwards) {
            for(let i=0; i<div?.children?.length; i++) {
                focusOnElement(i);
            }
        }
        else {
            for(let i = (div?.children?.length -1); i >= 0 ; i--) {
                focusOnElement(i);
            }
        }

        function focusOnElement(i: number) {

            const df = div?.children[i].getAttribute('data-m-u-t-id');
            const activeElement = document.activeElement;
            const aId = activeElement?.getAttribute("data-m-u-t-id") || '';

            if(aId) {
                if(i === foundElement) {
                    setTimeout(() => {
                        div?.children[i].focus();
                    });
                }
                else if(df === aId) {
                    // upwards
                    if(!downwards) {
                        if(i > 0) {
                            foundElement = i - 1;
                        }
                    }
                    // downwards
                    else {
                        if((i + 1) < div?.children?.length) {
                            foundElement = i + 1;
                        }
                    }    
                }
            }
            // none of the elments have focus
            else if(activeElement?.localName !== "li" || foundElement === -1) {
                setTimeout(() => {
                    div?.children[0].focus();
                });
                foundElement = 0;
            }
        }
    }

    // On Search Text Change
    function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {

        const value = e.target.value;
        setSearchText(value);
    }

    // The viewable content of search text
    function textFieldValue() {
        if(isOpen) {
            return searchText;
        }
        else {
            return content ? content : props.value;
        }

    }

    useEffect(() => {
        document.getElementById(`select-${id}`)?.addEventListener("change", (e: any) => {
            if(onChange) {
                onChange(e);
            }
        });
    }, [props.value]);

    function renderContent() {
        if(searchable) {
            return (
                <TextField
                    variant={variant}
                    legend={legend}
                    label={props.label}
                    value={textFieldValue()}
                    data-m-u-t-text-field-id={id}
                    icon={{
                        position: "end",
                        className:`${isOpen ? mutClass("rot-180") : ""} ${mutClass("cursor-pointer")} ${mutClass("select-icon")}`
                    }}
                    onChange={onSearchChange}
                    className={`${mutClass("cursor-pointer")}`}
                    onKeyDown={onkeyDown}
                    >
                </TextField>
            );

        }
        else return (
            <div 
                tabIndex={0}
                onKeyDown={onkeyDown}
                className={`${mutClass("no-search")} ${mutClass("padding")} ${mutClass("justify-sb")} ${mutClass("border-radius")}`}>
                <div className={`${mutClass("center")}`}>
                    {content ? content : (props.value ? props.value : props.label)}
                </div>
                <Icon
                    position="end"
                    className={`${isOpen ? mutClass("rot-180") : ""}`}
                ></Icon>
            </div>
        );
    }

    return (
        <div className={`${mutClass("select-field")} ${mutClass("cursor-pointer")}`} ref={wrapperRef} onClick={openDropdown}>
            <FieldSet>
                
                {renderContent()}

                <Root
                    tag={"ul"}
                    tabIndex={-1}
                    onClick={onSelectItem}
                    role="listbox"
                    data-m-u-t-id={id}
                    data-m-u-t-searchable={searchable}
                    data-m-u-t-search-text={searchText}
                    className={`${mutClass("border-radius")} ${mutClass("dropdown-content")} ${mutClass("user-select-none")} ${isOpen ? "open" : "close"}`}>
                    {props.children}
                </Root>
                <select 
                    {...props}
                    className={`${mutClass("hidden-select")} ${mutClass("hidden")}`} 
                    tabIndex={-1} id={`select-${id}`}>
                    {props.children}
                </select>
            </FieldSet>
            
        </div>
    );
}