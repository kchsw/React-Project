import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import AddTodo from './containers/AddTodoContainer'
// import TodoList from './containers/TodoListContainer'
// import Footer from './containers/FooterContainer'
// import store from './redux/store.js'
import { actions as appActions, getError } from './redux/modules/app'
import ErrorToast from "./components/ErrorToast";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import asyncComponent from './utils/asyncComponent'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// class App  extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {  
//       todos: [
//       ],
//       filter: 'all'
//     }
//     this.todoListId = 0
//   }

//   getVisibleTodos = () => {
//     const currentFilter = this.state.filter
//     return this.state.todos.filter(item => {
//       if(currentFilter === 'active') {
//         return !item.completed
//       }else if(currentFilter === 'completed') {
//         return item.completed
//       }else {
//         return true
//       }
//     })
//   }

//   setVisibleFillter = filter => {
//     this.setState({
//       filter
//     })
//   }

//   addTodoList = text => {
//     const todo = {
//       id: this.todoListId++,
//       text,
//       completed: false
//     }
//     const newTodos = [todo, ...this.state.todos]
//     this.setState({
//       todos: newTodos
//     })
//   }
//   toggleTodo = id => {
//     const newTodos = this.state.todos.map(item => {
//       return item.id === id ? { ...item, completed: !item.completed } : item
//     })
//     this.setState({
//       todos: newTodos
//     })
//   }
//   render() { 
//     const { filter } = this.state
//     const todos = this.getVisibleTodos()
//     return (  
//       <div>
//         <AddTodo addTodoList={this.addTodoList}/>
//         <TodoList todos={todos} toggleTodo={this.toggleTodo}/>
//         <Footer filter={filter} setVisibleFillter={this.setVisibleFillter}/>
//       </div>
//     );
//   }
// }
import PrivateRoute from './containers/PrivateRoute'

import Home from './containers/Home'
// import ProductDetail from './containers/ProductDetail'
// import Search from './containers/Search'
// import SearchResult from './containers/SearchResult'
// import Login from './containers/Login'
// import User from './containers/User'
// import Purchase from './containers/Purchase'

const ProductDetail = asyncComponent(() => import('./containers/ProductDetail'))
const Search = asyncComponent(() => import('./containers/Search'))
const SearchResult = asyncComponent(() => import('./containers/SearchResult'))
const Login = asyncComponent(() => import('./containers/Login'))
const User = asyncComponent(() => import('./containers/User'))
const Purchase = asyncComponent(() => import('./containers/Purchase'))

function App(props) {
  const { error, appActions: { clearError } } = props
  return (
        <div className="App">
          <Router>
            <Switch>
              <PrivateRoute path="/purchase/:id" component={Purchase} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/user" component={User} />
              <Route path="/search_result" component={SearchResult} />
              <Route path="/search" component={Search} />
              <Route path="/detail/:id" component={ProductDetail}/>
              <Route path="/" component={Home} />
            </Switch>
          </Router>      
          {
            error && <ErrorToast clearError={clearError} msg={error}/>
          }
        </div> 
  );
}

const mapStateToProps = (state, props) => {
  return {
    error: getError(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);


