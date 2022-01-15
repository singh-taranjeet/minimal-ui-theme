import React from 'react';
import './index.scss';

import { Button, Select, ListItem, VariantType, TextField } from '@minimal_ui/theme';

const App = () => {
  return (
    <div className="m-20">

      <div className="m-20">
        <h1>Select</h1>
        <div className="flex-sb">
          <Select>
            <ListItem value={4} label={"Four"}>FOur</ListItem>
            <ListItem value={5} label={"Five"}>Five</ListItem>
            <ListItem value={6} label={"Six"}>Six</ListItem>
          </Select>
        </div>
      </div>

      <div className="m-20">

        <h1>Button</h1>

        <div className="flex-sb">
        <Button variant={VariantType.outlined}>
          Button outlined
        </Button>

        <button className="button is-primary">
          Bulma butn
        </button>

        <Button variant={VariantType.standard}>
          Button standard
        </Button>

        <Button variant={VariantType.filled}>
          Button filled
        </Button>

        <Button variant={VariantType.filled} target="_blank" href="https://google.com">
          Google link filled
        </Button>
        </div>
      </div>

      <div className="m-20">
        <h1>Text Field</h1>

        <div className="flex-sb">

          <TextField variant={VariantType.standard} label="standard textfield" legend="standard textfield"></TextField>

          <TextField variant={VariantType.outlined} label="outlined textfield" legend="outlined textfield"></TextField>

          <TextField variant={VariantType.filled} label="filled textfield" legend="filled textfield"></TextField>

        </div>

      </div>
  </div>
  );
}

export default App
