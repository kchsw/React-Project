import React from 'react';
import './App.css';
import Home from './containers/Home'
import Create from './containers/Create'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Home}></Route>
        <Route path="/create" exact component={Create}></Route>
        <Route path="/edit/:id" exact component={Create}></Route>
      </div>
    </Router>
  );
}

export default App;
