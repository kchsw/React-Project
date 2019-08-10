import { CHANGE_HOME_LIST, ADD_HOME_LIST, TOGGLE_TOP_SHOW } from './actionTypes'
import axios from 'axios';

export const InitHomeList = () => {
    return (dispatch) => {
        axios.get('/api/Home.json').then(res => {
            const data = res.data.data
            const action = changeList(data)
            dispatch(action)
        }).catch(() => {
            console.log('error')
        })
    }
}
 
export const changeList = (data) => ({
    type: CHANGE_HOME_LIST,
    data
})

export const addHomeList = (data, page) => ({
    type: ADD_HOME_LIST,
    data,
    page
})

export const getMoreList = (page) => {
    return (dispatch) => {
        axios.get('/api/MoreList.json?page=' + page).then(res => {
            const data = res.data.data
            const action = addHomeList(data, page + 1)
            dispatch(action)
        }).catch(() => {
            console.log('error')
        })
    }
}

export const toggleTopShow = (show) => ({
    type: TOGGLE_TOP_SHOW,
    show
})



