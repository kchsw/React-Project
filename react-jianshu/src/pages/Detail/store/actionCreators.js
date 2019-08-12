import { GET_DETAIL_DATA } from './actionTypes'
import axios from 'axios';

export const getDetailData = (id) => {
    return (dispatch) => {
        axios.get(`/api/Detail.json?id=${id}`).then(res => {
            const data = res.data.data
            const action = changeDetailData(data)
            dispatch(action)
        }).catch(() => {
            console.log('error')
        })
    }
}
 
export const changeDetailData = (data) => ({
    type: GET_DETAIL_DATA,
    data
})





