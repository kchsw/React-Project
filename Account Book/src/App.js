import React from 'react';
import './App.css';
import Home from './containers/Home'


const mockData = [
  {
    "id": 1,
    "title": "去云南旅行",
    "date": "2018/10/10",
    "price": 400,
    "category": {
      "id": 1,
      "name": "旅行",
      "type": "outcome",
      "iconName": "ios-plane"
    } 
  },
  {
    "id": 2,
    "title": "去云南旅行",
    "date": "2018/10/10",
    "price": 400,
    "category": {
      "id": 1,
      "name": "旅行",
      "type": "outcome",
      "iconName": "ios-plane"
    } 
  }
]

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Home/>
    </div>
  );
}

export default App;
