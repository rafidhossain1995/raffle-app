import React from "react"
import Homepage from "./Components/Frontend/Homepage/Homepage"
import logo from './logo.svg';
import {Switch, Route} from "react-router-dom"
import './App.css';

function App() {
  return (
    <div className="App">
    <Switch>
      <Route>
        <Homepage/>
       </Route>
    </Switch>
   
    </div>
  );
}

export default App;
