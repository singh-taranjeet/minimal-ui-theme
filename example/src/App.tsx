import React from 'react'

import { Button, Select, ListItem } from '@minimal_ui/theme';

const App = () => {
  return <div>
    <Button>
    Hello
  </Button>


  <br />

  <Select>
    <ListItem value={4} label={"Four"}>FOur</ListItem>
    <ListItem value={5} label={"Five"}>Five</ListItem>
    <ListItem value={6} label={"Six"}>Six</ListItem>
  </Select>
  </div>
}

export default App
