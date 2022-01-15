import React, { useState, useRef, useEffect } from 'react';
import { Root } from '../../styleEngine/components/Root';
import { CoreComponentParamType, VariantType } from '../../utils/interface';
import { getDOMElement, getId, mutClass, useOutsideClickHandler } from '../../utils/methods';
import { FieldSet } from '../Fieldset';
import { TextField } from '../Textfield';
import './select.scss';

interface MUTSelectType extends React.HTMLProps<HTMLSelectElement>, CoreComponentParamType {
    legend? : string,
    searchable?: boolean
}

export const Select = (props: MUTSelectType) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [id] = useState(getId());
    // some selected value
    const [content, setContent] = useState<any>("");
    // value to be shown when closed
    const [textFieldValue, setTextFieldValue] = useState<any>("");
    // search text
    const [searchText, setSearchText] = useState("");
    
    const { 
        legend, 
        onChange, 
        searchable=false, 
        variant=VariantType.outlined
    } = props;

    const wrapperRef = useRef(null);

    useOutsideClickHandler(wrapperRef, closeDropdown.bind(this));

    function onSelectItem() {

        const div = getDOMElement(id);
        if(div && document && window) {
            const value = div.getAttribute("data-value");
            setSelectValue(value);
        }
        setTimeout(() => {
            closeDropdown();
        });
    }

    function openDropdown() {
        if(!isOpen) {
            addEventListenerToNavigateListItems();
        }
        setIsOpen(true);
        setSearchText("");
        document.dispatchEvent(new Event(`searching-${id}`));
    }

    function closeDropdown() {
        setIsOpen(false);
        setSearchText("");
        document.dispatchEvent(new Event(`searching-${id}`));
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

        const children: any = [];

        for(let i = (div?.children?.length -1); i >= 0 ; i--) {
            if(isHidden(div, i) === "false") {
                children.push(div?.children[i]);
            }
        }

        console.log("div children", children);

        let foundElement = -1;

        if(downwards) {
            for(let i=0; i<children?.length; i++) {
                focusOnElement(i);
            }
        }
        else {
            for(let i = (children?.length -1); i >= 0 ; i--) {
                focusOnElement(i);
            }
        }

        function focusOnElement(i: number) {

            const currentElement = children[i].getAttribute('data-m-u-t-id');
            const activeElement = document.activeElement;
            const aId = activeElement?.getAttribute("data-m-u-t-id") || '';

            if(activeElement?.localName === 'input') {
                // focus on first child
                setTimeout(() => {
                    children[0].focus();
                });
                foundElement = 0;
            }

            if(aId) {
                if(i === foundElement) {
                    setTimeout(() => {
                        children[i].focus();
                    });
                }
                else if(currentElement === aId) {
                    // upwards
                    if(!downwards) {
                        if(i > 0) {
                            foundElement = i - 1;
                        }
                    }
                    // downwards
                    else {
                        if((i + 1) < children?.length) {
                            foundElement = i + 1;
                        }
                    }    
                }
            }
            // none of the elments have focus
            else if(activeElement?.localName !== "li" || foundElement === -1) {
                setTimeout(() => {
                    children[0].focus();
                });
                foundElement = 0;
            }
        }

        // If the element is hidden don't focus on it
        function isHidden(div: any, i: number) {
            // data-m-u-t-hidden
            console.log("DIV ",div?.children[i], div?.children[i]?.getAttribute('data-m-u-t-hidden'));
            return  div?.children[i]?.getAttribute('data-m-u-t-hidden');
        }
    }


    // On Search Text Change
    function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        if(searchable) {
            const value: any = e.target.value;
            setTextFieldValue(value);
            setSearchText(value);
            document.dispatchEvent(new Event(`searching-${id}`));
        }
    }

    // The viewable content of search text
    // Set the text field value when dropdown is open and closed
    useEffect(() => {

        if(isOpen && searchable) {
            setTextFieldValue("");
        }
        else if(content) {
            setTextFieldValue(content);
        }
        else {
            setTextFieldValue(props.value || "")
        }
    }, [isOpen]);

    useEffect(() => {
        document.getElementById(`select-${id}`)?.addEventListener("change", (e: any) => {
            if(onChange) {
                onChange(e);
            }
        });
    }, [props.value]);

    useEffect(() => {

        // Custom event to select the list item
        document.addEventListener(`list-item-clicked`, onSelectItem.bind(this));

        return () => {
            document.removeEventListener(`list-item-clicked`, onSelectItem.bind(this));
        }
    }, [id]);

    function renderContent() {

        return (
            <TextField
                readOnly={!searchable}
                variant={variant}
                legend={legend}
                label={props.label}
                value={textFieldValue}
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