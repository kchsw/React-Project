import { combineReducers } from 'redux-immutable'
import HeaderReducer from '../common/Header/store/reducer'

const reducer =  combineReducers({
    header: HeaderReducer
})

export default reducer
