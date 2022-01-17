import React from 'react';
import { Root } from '@minimal_ui/style-engine';
import { mutClass } from '../../utils/methods';
import { FieldSet } from '../Fieldset';
import { Input } from '../Input';
import { TextFieldParamType } from './interface';
import './text-field.scss';

export const TextField = (props: TextFieldParamType & React.HTMLProps<HTMLInputElement>) => {
  
  const { legend } = props;

  return (
    <div className={mutClass("text-field")}>
      <FieldSet>
        {legend && <Root tag={'legend'} className={`${mutClass("text-legend")} ${mutClass("hidden")}`}>{legend}</Root>}
        <Input {...props}></Input>
      </FieldSet>
    </div>
  );
}
