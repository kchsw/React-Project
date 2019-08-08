import { SEARCH_FOCUS, CHANGE_LIST, MOUSE_ENTER, MOUSE_LEAVE, CHANGE_PAGE } from './actionTypes'
import axios from 'axios';
export const searchFocus = () => ({
    type: SEARCH_FOCUS
})

const changeList = (data) => ({
    type: CHANGE_LIST,
    data,
    totalPage: Math.ceil(data.length / 10)
})
export const getList = () => {
    return (dispatch) => {
        axios.get('/api/headerList.json').then(res => {
            const data = res.data.data
            const action = changeList(data)
            dispatch(action)
        }).catch(() => {
            console.log('error')
        })
    }
}

export const mouseEnter = () => ({
    type: MOUSE_ENTER
})

export const mouseLeave = () => ({
    type: MOUSE_LEAVE
})

export const changePage = (page) => ({
    type: CHANGE_PAGE,
    page
})



