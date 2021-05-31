import React from "react"
import Homepage from "./Components/Homepage/Homepage"
import Rafflepage from "./Components/Rafflepage/Rafflepage"
import logo from './logo.svg';
import {Switch, Route} from "react-router-dom"
import './App.css';
import Participants from "./Components/Participants/Participants";
import Winner from "./Components/Winner/Winner"

function App() {
  return (
    <div className="App">
    <Switch>
      <Route exact path="/">
        <Homepage/>
      </Route>

      <Route exact path="/raffles/:id">
        <Rafflepage/>
      </Route>

      <Route exact path="/raffles/:id/participants">
        <Participants/>
      </Route>

      <Route exact path="/raffles/:id/winner">
        <Winner/>
      </Route>

    </Switch>
   
    </div>
  );
}

export default App;
