import {  } from './actionTypes'
import { fromJS } from 'immutable'
const defaultState = fromJS({
    topicList: []
})

export default (state = defaultState, action) => {
    switch(action.type){
        default:
            return state
    }
}