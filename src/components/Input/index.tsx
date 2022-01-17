import React, { useEffect, useState, ChangeEvent } from 'react';
import { Root } from '@minimal_ui/style-engine';
import { light_gray__color, primary__color, secondary__color } from '../../utils/constants';
import { ColorType, VariantType } from '../../utils/interface';
import { getConstant, getDOMElement, getId, lightenDarkenColor, mutClass } from '../../utils/methods';
import { border_radius } from '../../utils/constants/style-constants';
import './input.scss';
import { InputParamType } from './interface';
import { Icon } from '../Icon';

interface ElementState {
  hover: boolean;
  focus: boolean;
}

export const Input = (props: InputParamType) => {
  
  const {
    color = getConstant(light_gray__color, true), 
    variant = VariantType.standard, 
    label = "",
    type="text"
  } = props;

  const InitialClassname = `${mutClass("input")} ${mutClass("inline-align-center")} ${mutClass("outline-none")} ${mutClass("border-none")} ${mutClass('m-0')}`;
  const InitialWrapperClassName = `${mutClass("input-wrapper")} ${mutClass("pos-relative")}`;

  const [style, setStyles] = useState<any>({});
  const [elementState, setElementState] = useState<ElementState>({hover: false, focus: false});
  const [hasValue, setHasValue] = useState<boolean>(false);
  const [wrapperClassName, setWrapperClassName] = useState(InitialWrapperClassName);
  const [id, setId] = useState("");
  const [__color, setColor] = useState(getConstant(primary__color, true));

  useEffect(() => {

    if(color) {
      if(color === ColorType.primary) {
        setColor(getConstant(primary__color, true));
      }
      else if(color === ColorType.secondary) {
        setColor(getConstant(secondary__color, true));
      }
      else {
        setColor(color);
      }
    }
    else {
      setColor(getConstant(light_gray__color, true));
    }
  }, [color]);

  function configure() {

    let styles = {};
    
    // filled
    if(variant === VariantType.filled) {
      const filledBackGroundColor = "#FAFAFA";

      // Wrapper styles
      styles = {
        ...styles,
        border: 0,
        "border-bottom": `1px solid ${lightenDarkenColor(0.5, __color)}`,
        "background-color": `${lightenDarkenColor(-0.05, filledBackGroundColor)}`
      };

      // Input styles
      if(elementState.hover) {
        styles = {
          ...styles,
          "border-bottom": `1px solid ${__color}`,
          "background-color": `${lightenDarkenColor(-0.03, filledBackGroundColor)}`,
        }
      }

      if(elementState.focus) {
        styles = {
          ...styles,
          "border-bottom": `1px solid ${__color}`
        }
      }

      
    }

    // outlined
    else if(variant === VariantType.outlined) {

      // Wrapper styles
      styles = {
        ...styles,
        border: `1px solid ${lightenDarkenColor(0.5, getConstant(light_gray__color, true), false, true)}`,
        "border-radius": `${getConstant(border_radius)}`
      };
      
      // Input styles
      if(elementState.hover) {
        styles = {
          ...styles,
          border: `1px solid ${getConstant(light_gray__color)}`,
        }
      }

      if(elementState.focus) {
        styles = {
          ...styles,
          "border": `1px solid ${__color}`
        }
      }

    }

    // standard
    else {
      // Wrapper styles
      styles = {
        ...styles,
        border: 0,
        "border-bottom": `1px solid ${lightenDarkenColor(0.5, getConstant(light_gray__color, true))}`
      };
      
      // Input styles
      if(elementState.hover) {
        styles = {
          ...styles,
          "border-bottom": `1px solid ${getConstant(light_gray__color)}`,
        }
      }

      if(elementState.focus) {
        styles = {
          ...styles,
          "border-bottom": `1px solid ${__color}`
        }
      }

    }

    setStyles(styles);
  }
  
  function onFocus(event: React.FocusEvent<HTMLInputElement>) {
    setWrapperClassName(`${InitialWrapperClassName} show-lable`);
    setElementState({
      ...elementState,
      focus: true
    });
    if(props.onFocus) {
      props.onFocus(event);
    }
  }

  function onBlur(event: any) {
    setWrapperClassName(InitialWrapperClassName);
    setElementState({
      ...elementState,
      focus: false
    });
    if(props.onBlur) {
      props.onBlur(event);
    }
  }

  function onClickIcon(e: React.MouseEvent<HTMLDivElement>) {
    const div: any = getDOMElement(id);
    if(div) {
      div?.focus();
      if(props?.icon?.onClick) {
        props?.icon?.onClick(e);
      }
    }
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setHasValue(!!value);
    if(props.onChange) {
      props.onChange(event);
    }
  }

  function onMouseEnter(event: any) {
    setElementState({
      ...elementState,
      hover: true
    });
    if(props.onMouseEnter) {
      props.onMouseEnter(event);
    }
  }

  function onMouseLeave(event: any) {
    setElementState({
      ...elementState,
      hover: false
    });
    if(props.onMouseLeave) {
      props.onMouseLeave(event);
    }
  }

  useEffect(() => {
    configure();
  }, [__color, elementState])

  useEffect(() => {
    if(!props.id) {
      setId(getId());
    }
  }, []);

  return (
    <Root 
      tag="div" 
      styles={style}
      className={`${wrapperClassName} ${variant} ${mutClass("justify-sb")} ${(hasValue || elementState.focus) ? mutClass("show-lable") : ""}`}>
        <Root 
          tag={'label'} 
          className={`${mutClass("label")} ${mutClass("pos-absolute")}`}
          htmlFor={id} 
          styles={{color: __color}}
          >
          {label}
        </Root>
        <Root 
          {...props}
          onChange={onChange}
          onFocus={onFocus}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onBlur={onBlur}
          data-m-u-t-id={id}
          placeholder={elementState.focus ? props.placeholder : props.label}
          className={`${InitialClassname} ${mutClass("padding")}`.trim()}
          // unassign other props
          variant={undefined} 
          color={undefined} 
          icon={undefined}
          tag={"input"}
          />
        {
          props.icon
          ? <div className={`${mutClass("center")} ${mutClass("input-icon")}`} onClick={onClickIcon}>
              <Icon
                {...props.icon}
                className={`${props?.icon?.className} ${mutClass("cursor-text")}`} 
              />
            </div>
          : null
        }
    </Root>
  );
}
