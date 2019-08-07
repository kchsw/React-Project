import { GET_INIT_ACTION, CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION } from './actionTypes'
import axios from 'axios'
export const getInputChangeAction = (value) => ({
    type: CHANGE_INPUT_VALUE,
    value
})

export const addTodoItemAction = () => ({
    type: ADD_TODO_ITEM
})

export const deleteTodItemAction = (index) => ({
    type: DELETE_TODO_ITEM,
    index
})

export const initListAction = (data) => ({
    type: INIT_LIST_ACTION,
    data
})

export const getInitList = () => ({
    type: GET_INIT_ACTION
})

// export const getListData = () => {
//     return (dispatch) => {
//         axios.get('/list.json').then(res => {
//             const data = res.data
//             const action = initListAction(data)
//             dispatch(action)
//         }).catch(e => console.log(e))
//     }
// }

// export const getListData = () => {
//     return (dispatch) => {
//         setTimeout(() => {
//             const data = [
//                 "westdoor",
//                 "jubaoxia",
//                 "otto"
//             ]
//             const action = initListAction(data)
//             dispatch(action)
//         }, 1000)
//     }
// }