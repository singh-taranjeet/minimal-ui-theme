import React, { useEffect, useState } from "react";
import { createStyleSheet } from "../..";
import { getId, isObject } from "../../../utils/methods";
import { StyleListType } from "../../interface";
import './root.scss';

export const Root = (props: any) => {

    // store all the list of styles with number of styles and json string
    const [styleList, setStyleList] = useState<StyleListType[]>([]);

    // unique class name of the element
    const [elementClassName, setElementClassName] = useState<string>("");

    const {styles={}, tag="div", className=""} = props;

    // When ever the styles are changed
    useEffect(() => {
        if(Object.keys(styles).length) {
            const existingClass = checkStyleExistence(styles);
            let newClassName = "";
            existingClass.forEach((name: any) => {
                newClassName = seperateClassNames(newClassName) + `${seperateClassNames(name)}`;
            });
            setElementClassName(newClassName);
        }
    }, [styles]);

    function seperateClassNames(str: string) {
        return str.split(".").join(" ");
    }

    // Save info of this style
    function saveStyle(newStyles: any, name:string) {

        for(let newStyle in newStyles) {
            if(newStyles.hasOwnProperty(newStyle)) {
                setStyleList([
                    ...styleList,
                    {
                        className: name,
                        numberOfStyles: Object.keys(newStyles).length,
                        stringifiedStyles: JSON.stringify(newStyles),
                    }
                ]);
            }
        }

        // create style
        createStyleSheet({
            styles: {
                [name]: newStyles
            }
        });
    }

    // check all properties of object
    function compareObjects(sObj: any, cObj: any): boolean {

        let isEqual: boolean = true;
        // check all properties
        for(let sObjPropt in sObj) {
            if(sObj.hasOwnProperty(sObjPropt)) {
                if(typeof sObj[sObjPropt] === typeof cObj[sObjPropt]) {
                    // If is object
                    if(isObject(sObj[sObjPropt]) && cObj[sObjPropt]) {
                        isEqual = compareObjects(sObj[sObjPropt], cObj[sObjPropt]);
                        if(!isEqual) {
                            break;
                        }
                    }
                    // if not object
                    else {
                        if(cObj[sObjPropt] !== sObj[sObjPropt]) {
                            // not equal
                            isEqual = false;
                            break;
                        }
                    }
                }
                else {
                    isEqual = false;
                    break;
                }
            }
        }
        return isEqual;
    }

    // check if the styles are exist and are same
    function checkStyleExistence(styl: any) {

        // TODO store all the styles in API Context
        const createClasses: string[] = [];
        let found: boolean = false;
        styleList.forEach(item => {
            if(item.numberOfStyles === Object.keys(styl).length) {
                let isEqual = true;
                const parsedItem = JSON.parse(item.stringifiedStyles);
                isEqual = compareObjects(styl, parsedItem);
                if(isEqual) {
                    found = true;
                    createClasses.push(item.className);
                }
            }
        });
        // If not found save this element
        if(!found) {
            const newClassName = `.${getId()}`;
            saveStyle(styl, newClassName);
            createClasses.push(newClassName);
        }
        return createClasses;
    }

    return React.createElement(tag, {
        ...props,
        initialclassname: undefined,
        className: `${elementClassName} ${className}`.trim(),
        styles: undefined,
        tag: undefined
    });
}