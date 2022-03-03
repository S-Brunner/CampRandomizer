import React from "react";
import { BrowserRouter, Route, Switch } from  "react-router-dom"

import HomePage from "./components/homePage";
import Teams from "./components/TeamRandomizer/teams";
import Cabins from "./components/Cabins/cabins";
import ViewTeams from "./components/viewTeams";
import Girls from "./components/Cabins/girls";
import Boys from "./components/Cabins/boys";

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

        <Route exact path="/create/cabins/girls">
          <Girls />
        </Route>

        <Route exact path="/create/cabins/boys">
          <Boys />
        </Route>
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
