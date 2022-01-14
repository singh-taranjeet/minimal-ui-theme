import { rootStyleConstants } from "../styles/style-constants";
import { isObject } from "../utils/methods";

interface CreateStyleSheetType {
    styles: object
}

export function createStyleSheet(data: CreateStyleSheetType) {

    console.log('style-engine-call');

    const styles: any = data.styles;
    let moreCss: string[] = [];

    function generateCss(obj: any, property: string) {
        let css = "";
        css += `${property} {`;
        for(let innerProperty in obj[property]) {
            if(obj[property].hasOwnProperty(innerProperty)) {
                if(isObject(obj[property][innerProperty])) {
                    moreCss.push(generateCss(obj[property], innerProperty));
                }
                else {
                    css += ` ${innerProperty}: ${obj[property][innerProperty]};`
                }
            }
        }
        css += `}`;
        return css;
    }

    function addMoreCss(property: string) {
        let cssString = "";
        moreCss.forEach((c: string) => {
            cssString += `\n${property}${c}`;
        });
        return cssString;
    }

    let css: any = "";

    for(let property in styles) {
        
        if(styles.hasOwnProperty(property) && styles[property]) {
            // it is a class
            css = generateCss(styles, property);
            css += addMoreCss(property);
        }
    }

    const head = document.head || document.getElementsByTagName('head')[0];
    const styleSheet = document.createElement('style');
    head.appendChild(styleSheet);
    styleSheet.appendChild(document.createTextNode(css));
    
}

// Create the default variables
createStyleSheet({styles: {
    ":root": rootStyleConstants
}});