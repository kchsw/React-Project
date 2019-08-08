import React from 'react';
import { GlobalStyled } from './style.js';
import { GlobalIconFont } from './statics/iconfont/iconfont'
import Header from './common/Header'
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from './pages/Home'
import Detail from './pages/Detail'
function App() {
  return (
    <Provider store={store}>
      <GlobalStyled />
      <GlobalIconFont />
      <Header/>
      <BrowserRouter>
        <Route path="/" exact component={Home}></Route>
        <Route path="/detail" exact component={Detail}></Route>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
