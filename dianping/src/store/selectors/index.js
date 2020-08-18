// const selectors = {
//     getText(state) {
//         return state.get('text')
//     },
//     getFilter(state) {
//         return state.get('filter')
//     },
//     getVisibleTodos(state) {
//         // const { todos: { data }, filter } = state
//         const data = state.getIn(['todo', 'data'])
//         const filter = state.get('filter')
//         switch(filter) {
//             case 'all': {
//                 return data
//             }
//             case 'active': {
//                 return data.filter(todo => !todo.get('completed'))
//             }
//             case 'completed': {
//                 return data.filter(todo => todo.get('completed'))
//             }
//             default: 
//                 return new Error('Unknow Filter ' + filter)
//         }
//     }
// }

// export default selectors


    export const getText = (state) => {
        return state.get('text')
    }
    export const getFilter = (state) => {
        return state.get('filter')
    }
    
    export const getVisibleTodos = (state) => {
        // const { todos: { data }, filter } = state
        const data = state.getIn(['todos', 'data'])
        const filter = state.get('filter')
        switch(filter) {
            case 'all': {
                return data
            }
            case 'active': {
                return data.filter(todo => !todo.get('completed'))
            }
            case 'completed': {
                return data.filter(todo => todo.get('completed'))
            }
            default: 
                return new Error('Unknow Filter ' + filter)
        }
    }
