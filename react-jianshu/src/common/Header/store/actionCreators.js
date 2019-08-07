import { SEARCH_FOCUS, CHANGE_LIST } from './actionTypes'
import axios from 'axios';
export const searchFocus = () => ({
    type: SEARCH_FOCUS
})

export const changeList = (data) => ({
    type: CHANGE_LIST,
    data
})
export const getList = () => {
    return (dispatch) => {
        axios.get('/api/headerList.json').then(res => {
            const data = res.data.data
            const change = changeList(data)
            dispatch(change)
        }).catch(() => {
            console.log('error')
        })
    }
}