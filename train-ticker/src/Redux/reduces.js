function combineReducers(reduces){
    return function reducer(state, action){
        const ret = {}
        for(let key in reduces){
            ret[key] = reduces[key](state[key], action)
        }
        return {...state, ...ret}
    }
}

const reducers = {
    todos(state, action){
        const { type, payload } = action
        switch(type){
            case 'set':           
                return payload
            case 'add':
                return  [...state, payload]
            case 'remove':
                return  state.filter(todo => todo.id !== payload)
            case 'toggle':                   
                return  state.map(todo => {
                            return todo.id === payload ? { ...todo, complete: !todo.complete } : todo
                        })       
            default: 
                return state 
        }

    },
    incrementCount(state, action){
        const { type } = action
        switch(type){
            case 'set':                              
            case 'add':
                return  state + 1
            default: 
                return state
        }
    }
}

 
const reducer = combineReducers(reducers)

export default reducer