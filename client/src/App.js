import React from "react";
import { BrowserRouter, Route, Switch } from  "react-router-dom"

import HomePage from "./components/homePage";
import Teams from "./components/TeamRandomizer/teams";
import Cabins from "./components/Cabins/cabins";
import ViewTeams from "./components/viewTeams";
import Girls from "./components/Cabins/girls";
import Boys from "./components/Cabins/boys";
import ViewBoyCabins from "./components/Cabins/ViewBoyCabins";
import ViewGirlCabins from "./components/Cabins/ViewGirlCabins";
import ViewCabins from "./components/Cabins/viewCabins";

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

        <Route exact path="/view/cabins/boys">
          <ViewBoyCabins />
        </Route>

        <Route exact path="/view/cabins/girls">
          <ViewGirlCabins />
        </Route>
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
