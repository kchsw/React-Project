import { ADD_TODO, TOGGLE_TODO, FETCH_TODO_REQUEST, FETCH_TODO_SUCCESS ,FETCH_TODO_FAILURE } from '../actionTypes'
import Immutable from 'immutable'

const initialState = {
    isFetching: false,
    error: null,
    data: []
}

const todosReducer = (state = Immutable.fromJS(initialState), action) => {
    switch(action.type) {
        case FETCH_TODO_REQUEST: {
            // return {
            //     ...state,
            //     isFetching: true
            // }
            return state.set('isFetching', true)
        }
        case FETCH_TODO_SUCCESS: {
            // return {
            //     ...state,
            //     isFetching: false,
            //     data: action.data
            // }
            return state.merge({
                isFetching: true,
                data: Immutable.fromJS(action.data)
            })
        }
        case FETCH_TODO_FAILURE: {
            // return {
            //     ...state,
            //     isFetching: false,
            //     error: action.error
            // }
            return state.merge({
                isFetching: true,
                data: Immutable.fromJS(action.error)
            })
        }
        default: 
            // return {
            //     ...state,
            //     data: todos(state.data, action)
            // }
            const data = state.get('data')
            return state.set('data', todos(data, action))
    }
}

const todos = (state = Immutable.fromJS([]), action) => {
    switch(action.type) {
        case ADD_TODO: 
            // return [
            //         ...state,
            //         {
            //             id: action.id,
            //             text: action.text,
            //             completed: false
            //         }
            //     ]
            const newTodo = Immutable.fromJS({
                id: action.id,
                text: action.text,
                completed: false
            })
            return  state.push(newTodo)
        case TOGGLE_TODO: 
            // return  state.map(todo => {
            //             return todo.id === action.id ? {
            //                 ...todo, completed: !todo.completed
            //             }: todo
            //         })
            return state.map(todo => todo.get('id') === action.id ? 
                                    todo.set('completed', !todo.get('completed')) : todo 
                            ) 
        default:
            return state
    }
}

export default todosReducer