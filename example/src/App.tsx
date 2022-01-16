import React from 'react';
import './index.scss';

import { Select, ListItem, VariantType, TextField, Button, Box } from '@minimal_ui/theme';

const App = () => {
  return (
    <div className="m-20">

      <div className="m-20">
        <h1>Select</h1>
        <div className="flex-sb">
          <Select>
            <ListItem value={4} label={"Four"}>Four</ListItem>
            <ListItem value={5} label={"Five"}>Five</ListItem>
            <ListItem value={6} label={"Six"}>Six</ListItem>
          </Select>

          <Select searchable={true}>
            <ListItem value={4} label={"Four"}>Four</ListItem>
            <ListItem value={5} label={"Five"}>Five</ListItem>
            <ListItem value={6} label={"Six"}>Six</ListItem>
            <ListItem value={7} label={"Seven"}>Seven</ListItem>
            <ListItem value={8} label={"Eight"}>Eight</ListItem>
            <ListItem value={9} label={"Nine"}>Nine</ListItem>
            <ListItem value={10} label={"Ten"}>Ten</ListItem>
            <ListItem value={18} label={"Eighteen"}>Eighteen</ListItem>
            <ListItem value={19} label={"Nineteen"}>Nineteen</ListItem>
            <ListItem value={17} label={"Seventeen"}>Seventeen</ListItem>
            <ListItem value={188} label={"one hundread eight"}>one hundread eight</ListItem>
            <ListItem value={199} label={"One hundread nine"}>One hundread nine</ListItem>
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

          <TextField color="#9c27b0"  variant={VariantType.standard} label="standard textfield" legend="standard textfield"></TextField>

          <TextField color="#039f7c" variant={VariantType.outlined} label="outlined textfield" legend="outlined textfield"></TextField>

          <TextField color={"#e91e63"} variant={VariantType.filled} label="filled textfield" legend="filled textfield"></TextField>

        </div>

      </div>

      <div className="m-20">
        <h1>Box</h1>

        <div className="flex-sb">

          <Box>
            <h2>Box</h2>
          </Box>

        </div>

      </div>
  </div>
  );
}

export default App
