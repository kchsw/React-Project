import React, { useEffect, memo, useState, useCallback, useRef }from 'react';
import './index.css'
import { createSet, createAdd, createRemove, createToggle } from './actions.js'
import reducer from './reduces'
// let idSeq = Date.now()
const LS_KEY = 'TODO_LIST'
let store = {
    todos: [],
    incrementCount: 0
}
function bindActionCreators(actionCreators, dispatch) {
    const ret = {}
    for(let key in actionCreators) {
        ret[key] = function(...args){
            const actioncreator = actionCreators[key]
            const action = actioncreator(...args)
            dispatch(action)
        }
    }
    return ret 
}

// function combineReducers(reduces){
//     return function reducer(state, action){
//         const ret = {}
//         for(let key in reduces){
//             ret[key] = reduces[key](state[key], action)
//         }
//         return {...state, ...ret}
//     }
// }

const Control = memo(function Control(props) {
    const { addTodo, a } = props
    const inputRef = useRef()
    const onSubmit = (e) => {
        e.preventDefault();
        const newText = inputRef.current.value.trim()
        if(newText.length === 0){
            return 
        }
        addTodo(newText)

        inputRef.current.value = '' 
    }

    return (
        <div className="control">
            <h1>
                todos
            </h1>
            <form onSubmit={onSubmit}>
                <input type="text" 
                    className="todo-input" 
                    placeholder="what needs to be done"
                    ref={inputRef}
                >
                </input>
            </form>
        </div>
    )
})

const Todos = memo(function Todos(props) {
    const { todos, toggleTodo, removeTodo } = props
    return (   
        <ul className='todos'>
            {
                todos.map(todo => (
                    <TodoItem key={todo.id}
                        todo={todo}
                        toggleTodo={toggleTodo}
                        removeTodo={removeTodo}
                    />
                ))
            }
        </ul>
    )
})

const TodoItem = memo(function TodoItem(props) {
    const { todo: { id, text, complete }, toggleTodo, removeTodo } = props

    const onChange = () => {
        toggleTodo(id)
    }

    const onRemove = () => {
        removeTodo(id)
    }
    return (
        <li className="todo-tiem">
            <input type="checkbox" onChange={onChange} checked={complete}/>
            <label className={complete ? 'completed' : ''}>{text}</label>
            <button onClick={onRemove}>&#xd7;</button>
        </li>
    )
})

function TodoList() {

    const [todos, setTodos] = useState([])
    const [incrementCount, setIncrementCount] = useState(0)

    useEffect(() => {
        Object.assign(store, {
            todos,
            incrementCount
        })
    }, [todos, incrementCount]) 
    // const addTodo = useCallback((todo) => {
    //     setTodos(todos => [ ...todos, todo ])
    // }, [])

    // const removeTodo = useCallback((id) => {
    //     setTodos(todos => todos.filter(todo => todo.id !== id))
    // }, [])

    // const toggleTodo = useCallback((id) => {
    //     setTodos(todos => todos.map(todo => {
    //         return todo.id === id ? { ...todo, complete: !todo.complete } : todo
    //     }))
    // }, [])

    // const reducers = {
    //     todos(state, action){
    //         const { type, payload } = action
    //         switch(type){
    //             case 'set':           
    //                 return payload
    //             case 'add':
    //                 return  [...state, payload]
    //             case 'remove':
    //                 return  state.filter(todo => todo.id !== payload)
    //             case 'toggle':                   
    //                 return  state.map(todo => {
    //                             return todo.id === payload ? { ...todo, complete: !todo.complete } : todo
    //                         })       
    //             default: 
    //                 return state 
    //         }
 
    //     },
    //     incrementCount(state, action){
    //         const { type } = action
    //         switch(type){
    //             case 'set':                              
    //             case 'add':
    //                 return  state + 1
    //             default: 
    //                 return state
    //         }
    //     }
    // }

    // const reducer = (state, action) => {
    //     const { type, payload } = action
    //     const { todos, incrementCount } = state
        
    //     switch(type){
    //         case 'set':           
    //             return {
    //                 ...state,
    //                 todos: payload,
    //                 incrementCount: incrementCount + 1
    //             }
    //         case 'add':
    //             return {
    //                 ...state,
    //                 todos: [...todos, payload],
    //                 incrementCount: incrementCount + 1
    //             }
    //         case 'remove':
    //             return {
    //                 ...state,
    //                 todos: todos.filter(todo => todo.id !== payload)
    //             }    
    //         case 'toggle':
    //             return {
    //                 ...state,
    //                 todos: todos.map(todo => {
    //                     return todo.id === payload ? { ...todo, complete: !todo.complete } : todo
    //                 })
    //             }        
    //         default: 
    //             return state
    //     }
    // }

    // const reducer = combineReducers(reducers)

    const dispatch = useCallback((action) => {

        // const state = {
        //     todos,
        //     incrementCount
        // }

        const setters = {
            todos: setTodos,
            incrementCount: setIncrementCount
        }

        if(typeof action === 'function'){
            action(dispatch, () => store)
            return 
        }
        // const newState = reducer(state, action)
        //3秒后的action执行仍在旧的上下文中的state，所以用在上下文之外store来获得最新的state
        const newState = reducer(store, action)
        for(let key in newState){
            setters[key](newState[key])
        }
        
        // const { type, payload } = action
        // switch(type){
        //     case 'set':           
        //         setTodos(payload)
        //         setIncrementCount(c => c + 1)
        //         break
        //     case 'add':
        //         setTodos(todos => [ ...todos, payload ])
        //         setIncrementCount(c => c + 1)  
        //         break
        //     case 'remove':
        //         setTodos(todos => todos.filter(todo => todo.id !== payload))
        //         break
        //     case 'toggle':
        //         setTodos(todos => todos.map(todo => {
        //             return todo.id === payload ? { ...todo, complete: !todo.complete } : todo
        //         }))
        //         break  
        //     default: 
        //         break
        // }
    }, [todos, incrementCount])

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem(LS_KEY)) || []
        dispatch(createSet(todos))
        // setTodos(todos)
    }, [])

    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(todos))
    }, [todos])

    return (
        <div className="todo-list">
            <Control 
            {
                ...bindActionCreators({
                    addTodo: createAdd
                }, dispatch)
            }/>
            <Todos 
                {
                    ...bindActionCreators({
                        toggleTodo: createToggle,
                        removeTodo: createRemove
                    }, dispatch) 
                }
                todos={todos}
            />
        </div>
    )
}

export default TodoList