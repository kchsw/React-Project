import React from 'react';
import { GlobalStyled } from './style.js';
import { GlobalIconFont } from './statics/iconfont/iconfont'
import Header from './common/Header'
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from './pages/Home'
import Detail from './pages/Detail/loadable'
import Login from './pages/Login'
import Write from './pages/Write'
function App() {
  return (
    <Provider store={store}>
      <GlobalStyled />
      <GlobalIconFont />
      <BrowserRouter>
        <div>
          <Header/>
        <Route path="/" exact component={Home}></Route>
        <Route path="/detail/:id" exact component={Detail}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/write" exact component={Write}></Route>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
