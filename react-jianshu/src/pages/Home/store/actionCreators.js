import {  } from './actionTypes'
import axios from 'axios';
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
 
export const changePage = (page) => ({
    type: CHANGE_PAGE,
    page
})



