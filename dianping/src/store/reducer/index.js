// import { ADD_TODO, TOGGLE_TODO, SET_FILTER, SET_TODO_TEXT } from '../actionTypes'
// const initalState = {
//     filter: 'all',
//     text: '',
//     todos: [
//         {
//             id: '#1',
//             text: 'lucy',
//             completed: false
//         },{
//             id: '#2',
//             text: 'jane',
//             completed: true
//         }
//     ]
// }
// export default (state = initalState, action) => {
//     switch(action.type) {
//         case ADD_TODO: 
//             return {
//                 ...state,
//                 todos: [
//                     ...state.todos,
//                     {
//                         id: action.id,
//                         text: action.text,
//                         completed: false
//                     }
//                 ]
//             }
//         case TOGGLE_TODO: 
//             return {
//                 ...state,
//                 todos: state.todos.map(todo => {
//                     return todo.id === action.id ? {
//                         ...todo, completed: !todo.completed
//                     }: todo
//                 })
//             }
//         case SET_FILTER: 
//             return  {
//                 ...state,
//                 text: action.text
//             }
//         case SET_TODO_TEXT: 
//             return  {
//                 ...state,
//                 filter: action.filter
//             }
//         default: 
//         return state
//     }
    
// }

import { combineReducers } from 'redux-immutable'
import todos from './todos'
import text from './text'
import filter from './filter'



const reducer =  combineReducers({
    todos,
    text,
    filter
})

export default reducer
