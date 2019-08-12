import { CHANGE_LOGINED } from './actionTypes'
import axios from 'axios';

export const login = (account, password) => {
    return (dispatch) => {
        axios.get(`/api/Login.json?account=${account}&password=${password}`).then(res => {
            const result = res.data.success
            if(result){
                dispatch(changeLogined(true))
            }
        }).catch(() => {
            console.log('error')
        })
    }
}
 
export const changeLogined = (result) => ({
    type: CHANGE_LOGINED,
    value: result
})

export const logout = () => ({
    type: CHANGE_LOGINED,
    value: false
})





