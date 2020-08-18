import { 
    ADD_TODO, 
    TOGGLE_TODO, 
    SET_FILTER, 
    SET_TODO_TEXT,
    FETCH_TODO_REQUEST, 
    FETCH_TODO_SUCCESS ,
    FETCH_TODO_FAILURE 
} from './actionTypes'

let nextTodoId = 0

const fetchTodosRequest = () => ({
    type: FETCH_TODO_REQUEST
})
const fetchTodosSuccess = (data) => ({
    type: FETCH_TODO_SUCCESS,
    data
})
const fetchTodosFailure = (error) => ({
    type: FETCH_TODO_FAILURE,
    error
})

export const fetchTodos = () => {
    return (dispatch) => {
        dispatch(fetchTodosRequest)
        return fetch('./mock/todos.json').then(
            response => {
                response.json().then(data => {
                    dispatch(fetchTodosSuccess(data))
                })
            },
            error => {
                dispatch(fetchTodosFailure(error))
            }
        )
    }
}



export const addTodo = text => ({
    type: ADD_TODO,
    id: nextTodoId++,
    text
})

export const toggleTodo = id => ({
    type: TOGGLE_TODO,
    id
})

export const setFilter = filter => ({
    type: SET_FILTER,
    filter
})

export const setTodoText = text => ({
    type: SET_TODO_TEXT,
    text
})

