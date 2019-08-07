import { SEARCH_FOCUS, CHANGE_LIST } from './actionTypes'
import { fromJS } from 'immutable'
const defaultState = fromJS({
    focused: false,
    list: []
})

export default (state = defaultState, action) => {
    if(action.type === SEARCH_FOCUS){
        // const newState = JSON.parse(JSON.stringify(state))
        // newState.focused = !newState.focused
        // return newState
        const focused = state.get('focused')
        return state.set('focused', !focused)
    }
    if(action.type === CHANGE_LIST){
        return state.set('list', fromJS(action.data))
    }
    return state
}