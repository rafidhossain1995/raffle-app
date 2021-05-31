import React from "react"
import Homepage from "./Components/Frontend/Homepage/Homepage"
import Rafflepage from "./Components/Frontend/Homepage/Rafflepage"
import logo from './logo.svg';
import {Switch, Route} from "react-router-dom"
import './App.css';

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

    </Switch>
   
    </div>
  );
}

export default App;
