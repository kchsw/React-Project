import React from 'react';
import { GlobalStyled } from './style.js';
import { GlobalIconFont } from './statics/iconfont/iconfont'
import Header from './common/Header'
import store from './store'
import { Provider } from 'react-redux'
function App() {
  return (
    <Provider store={store}>
      <GlobalStyled />
      <GlobalIconFont />
      <Header/>
    </Provider>
  );
}

export default App;
