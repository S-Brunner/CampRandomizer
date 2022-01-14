import React from "react";
import { BrowserRouter, Route, Switch } from  "react-router-dom"

import HomePage from "./components/homePage";
import Teams from "./components/TeamRandomizer/teams";
import Cabins from "./components/cabins";
import ViewTeams from "./components/viewTeams";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route exact path="/teams">
          <Teams />
        </Route>

        <Route exact path="/cabins">
          <Cabins />
        </Route>

        <Route exact path="/view-teams">
          <ViewTeams />
        </Route>

        

      </Switch>
    </BrowserRouter>
  );
}

export default App;
