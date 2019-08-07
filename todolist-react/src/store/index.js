import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer'
import createSagaMiddleware from 'redux-saga'
import todoSagas from './sagas'
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;
const enhancer = composeEnhancers(
    // applyMiddleware(thunk)
    applyMiddleware(sagaMiddleware)
);
const store = createStore(
    reducer,
    enhancer
    // applyMiddleware(thunk)
    // applyMiddleware([thunk, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()])
)
sagaMiddleware.run(todoSagas)
export default store