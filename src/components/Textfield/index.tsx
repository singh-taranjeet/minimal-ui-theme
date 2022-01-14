import React from 'react';
import { Root } from '../../styleEngine/components/Root';
import { FieldSet } from '../Fieldset';
import { Input } from '../Input';
import { TextFieldParamType } from './interface';
import './text-field.scss';

export const TextField = (props: TextFieldParamType & React.HTMLProps<HTMLInputElement>) => {
  
  const { legend } = props;

  return (
    <div className={"m-u-t-text-field"}>
      <FieldSet>
        {legend && <Root tag={'legend'} className={"m-u-t-text-legend"}>{legend}</Root>}
        <Input {...props}></Input>
      </FieldSet>
    </div>
  );
}
