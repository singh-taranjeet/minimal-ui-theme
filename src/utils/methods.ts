import React, { useEffect } from "react";
import { ROOT_CLASS_NAME } from "./constants";

export const lightenDarkenColor = (p: any, c0: any, c1: any = false, l: any =true) => {

  // check if the color is rbga
  if(c0 && (c0.indexOf("rgb") >= 0 || c0.indexOf("rgba") >= 0)) {
    try {c0 = `#${rgba2hex(c0)}`;}
    catch(e) { throw new Error(`${c0} is not a valid color`); }
  }
  // check if the color is hsl
  if(c0 && (c0.indexOf("hsl") >= 0)) {
    try { c0 = `${strToHsl(c0)}`; } 
    catch (error) { throw new Error(`${c0} is not a valid color`); }
  }
  let pSBCr: any = null;
  let r: any,
    g: any,
    b: any,
    P: any,
    f: any,
    t: any,
    h: any,
    i: any = parseInt,
    m: any = Math.round,
    a: any = typeof c1 == "string";
  if (
    typeof p != "number" ||
    p < -1 ||
    p > 1 ||
    typeof c0 != "string" ||
    // eslint-disable-next-line
    (c0[0] != "r" && c0[0] != "#") ||
    (c1 && !a)
  )
    return null;
  if (!pSBCr)
    pSBCr = (d: any) => {
      let n = d.length,
        x: any = {};
      if (n > 9) {
        [r, g, b, a] = d = d.split(",");
        n = d.length;
        if (n < 3 || n > 4) return null;
        // eslint-disable-next-line
        x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4));
        (x.g = i(g))((x.b = i(b)))((x.a = a ? parseFloat(a) : -1));
      } else {
        // eslint-disable-next-line
        if (n == 8 || n == 6 || n < 4) return null;
        if (n < 6)
          d =
            "#" +
            d[1] +
            d[1] +
            d[2] +
            d[2] +
            d[3] +
            d[3] +
            (n > 4 ? d[4] + d[4] : "");
        d = i(d.slice(1), 16);
        // eslint-disable-next-line
        if (n == 9 || n == 5) {
          x.r = (d >> 24) & 255;
          x.g = (d >> 16) & 255;
          x.b = (d >> 8) & 255;
          (x.a = m((d & 255) / 0.255) / 1000);
        }
        else {
          x.r = d >> 16
          x.g = (d >> 8) & 255
          x.b = d & 255
          x.a = -1;
        }
      }
      return x;
    };
    h = c0.length > 9;
    // eslint-disable-next-line
    h = a ? (c1.length > 9 ? true : c1 == "c" ? !h : false) : h;
    f = pSBCr(c0);
    P = p < 0;
    t =
    // eslint-disable-next-line
      c1 && c1 != "c"
        ? pSBCr(c1)
        : P
        ? { r: 0, g: 0, b: 0, a: -1 }
        : { r: 255, g: 255, b: 255, a: -1 };
    p = P ? p * -1 : p;
    P = 1 - p;
  if (!f || !t) return null;
  if (l)
      {
        r = m(P * f.r + p * t.r);
        g = m(P * f.g + p * t.g);
        b = m(P * f.b + p * t.b);
      }
  else {
    r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5);
    g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5);
    b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5);
  }
    a = f.a;
    t = t.a;
    f = a >= 0 || t >= 0;
    (a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0);
  if (h)
    return (
      "rgb" +
      (f ? "a(" : "(") +
      r +
      "," +
      g +
      "," +
      b +
      (f ? "," + m(a * 1000) / 1000 : "") +
      ")"
    );
  else
    return (
      "#" +
      (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0))
        .toString(16)
        .slice(1, f ? undefined : -2)
    );
};

export function getId(length = 7) {
  let result = 'm';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0987654321';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

function rgba2hex(orig: any) {
  var a,
    rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
    // eslint-disable-next-line
    alpha = (rgb && rgb[4] || "").trim(),
    hex = rgb ?
    // eslint-disable-next-line
    (rgb[1] | 1 << 8).toString(16).slice(1) +
    // eslint-disable-next-line
    (rgb[2] | 1 << 8).toString(16).slice(1) +
    // eslint-disable-next-line
    (rgb[3] | 1 << 8).toString(16).slice(1) : orig;

  if (alpha !== "") {
    a = alpha;
  } else {
    a = "01";
  }
  // multiply before convert to HEX
  // eslint-disable-next-line
  a = ((a * 255) | 1 << 8).toString(16).slice(1)
  hex = hex + a;

  return hex;
}

function strToHsl(str: string) {
  const hslValues = str.replace(/\D+/g, ' ').trim().split(' ').map(e => parseInt(e));
  return hslToHex(hslValues[0], hslValues[1], hslValues[2]);
}

function hslToHex(b: any,c: any ,d: any){d/=100;const e=c*Math.min(d,1-d)/100,a=(a: any)=>{const c=(a+b/30)%12,f=d-e*Math.max(Math.min(c-3,9-c,1),-1);return Math.round(255*f).toString(16).padStart(2,"0")};return`#${a(0)}${a(8)}${a(4)}`}

export function isObject(checkVariable: any) {
  return typeof checkVariable === 'object' &&
    !Array.isArray(checkVariable) &&
    checkVariable !== null
}

export function getConstant(constant: string, getValue=true) {

  if(getValue) {
      const style = getComputedStyle(document.body);
      return style.getPropertyValue(constant).split(" ").join("");
  }
  return `var(${constant})`;
}

export function useOutsideClickHandler(ref: React.RefObject<any>, handler: () => void) {
  useEffect(() => {
      function handleClickOutside(event: any) {
          if (ref.current && !ref.current.contains(event.target)) {
              if(handler) {
                handler();
              }
          }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
          console.log("removed");
      };
  }, [ref]);
}

export function getDOMElement(id: string, query?: string) {
  if(document && window) {
    const div = document.querySelectorAll(`${query ? `[${query}]` : `[data-m-u-t-id='${id}']`}`);
    if(div && div.length) {
      return div[0];
    }
  }
  return undefined;
}

export function mutClass(name: string) {
  return `${ROOT_CLASS_NAME}-${name}`;
}


export function createRipple(id: string , e: any) {

  const element: any = getDOMElement(id);
  const parentNode: any = element?.parentNode;
  
  if(element && parentNode) {
    if(element.getElementsByClassName(mutClass('ripple')).length > 0) {
      element.innerHTML = "";
    }
    
    const circle = document.createElement('div');
    element.appendChild(circle);
    
    const d = Math.max(parentNode.clientWidth, parentNode.clientHeight);
    circle.style.width = circle.style.height = d + 'px';
    
    circle.style.left = e.clientX - parentNode.offsetLeft - d / 2 + 'px';
    circle.style.top = e.clientY - parentNode.offsetTop - d / 2 + 'px';
    circle.classList.add(mutClass('ripple'));
  }

}