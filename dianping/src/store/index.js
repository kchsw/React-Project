import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer'
// import { addTodo, toggleTodo, setFilter, setTodoText } from './actionCreators'

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);
const store = createStore(
    reducer,
    enhancer
    // applyMiddleware(thunk)
    // applyMiddleware([thunk, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()])
)

// console.log(store.getState())

// const unsubscribe = store.subscribe(() => {
//     console.log(store.getState())
// })

// store.dispatch(addTodo('miss'))
// store.dispatch(setFilter('active'))
// store.dispatch(setTodoText('active'))
// store.dispatch(toggleTodo(0))
// unsubscribe()

export default store