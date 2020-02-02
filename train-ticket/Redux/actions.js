export function createSet(payload) {
    return {
        type: 'set',
        payload
    }
}
export function createAdd(payload) {
    // const newItem = {
    //     id: ++idSeq,
    //     text: payload,
    //     complete: false
    // }
    // return {
    //     type: 'add',
    //     payload: newItem
    // }

    return (dispatch, getState) => {
        setTimeout(() => {
           const { todos } = getState()
            if(!todos.find(todo => todo.text === payload)){
                const newItem = {
                    id: ++idSeq,
                    text: payload,
                    complete: false
                }
                dispatch({
                    type: 'add',
                    payload: newItem
                })
            } 
        }, 3000)
        
    }
}
export function createToggle(payload) {
    return {
        type: 'toggle',
        payload
    }
}
export function createRemove(payload) {
    return {
        type: 'remove',
        payload
    }
}

let idSeq = Date.now()