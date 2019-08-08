import { SEARCH_FOCUS, CHANGE_LIST, MOUSE_ENTER, MOUSE_LEAVE, CHANGE_PAGE } from './actionTypes'
import { fromJS } from 'immutable'
const defaultState = fromJS({
    focused: false,
    list: [],
    page: 1,
    totalPage: 0,
    mouseIn: false
})

export default (state = defaultState, action) => {
    // if(action.type === SEARCH_FOCUS){
    //     // const newState = JSON.parse(JSON.stringify(state))
    //     // newState.focused = !newState.focused
    //     // return newState
    //     const focused = state.get('focused')
    //     return state.set('focused', !focused)
    // }
    // if(action.type === CHANGE_LIST){
    //     return state.set('list', fromJS(action.data))
    // }
    // return state
    switch(action.type){
        case SEARCH_FOCUS:
            const focused = state.get('focused')
            return state.set('focused', !focused) 
        case CHANGE_LIST:
            return state.merge({
                list: fromJS(action.data),
                totalPage: action.totalPage
            })
        case MOUSE_ENTER:
            return state.set('mouseIn', true)
        case MOUSE_LEAVE: 
            return state.set('mouseIn', false)
        case CHANGE_PAGE:
            return state.set('page', action.page)
        default:
            return state
    }
}