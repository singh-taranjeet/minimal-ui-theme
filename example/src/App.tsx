import React from 'react';
import './index.scss';

import { Button, Select, ListItem, VariantType } from '@minimal_ui/theme';

const App = () => {
  return (
    <div className="m-20">

      <div className="flex m-20 flex-sb">
        <Select>
          <ListItem value={4} label={"Four"}>FOur</ListItem>
          <ListItem value={5} label={"Five"}>Five</ListItem>
          <ListItem value={6} label={"Six"}>Six</ListItem>
        </Select>
      </div>
      <div className="flex m-20 flex-sb">
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
  );
}

export default App
