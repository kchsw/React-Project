import { CHANGE_LOGINED } from './actionTypes'
import { fromJS } from 'immutable'
const defaultState = fromJS({
    logined: false
})

export default (state = defaultState, action) => {
    switch(action.type){
        case CHANGE_LOGINED:
            return state.set('logined', action.value)
        default:
            return state
    }
}