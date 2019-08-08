import { combineReducers } from 'redux-immutable'
import HeaderReducer from '../common/Header/store/reducer'
import HomeReducer from '../pages/Home/store/reducer'

const reducer =  combineReducers({
    header: HeaderReducer,
    home: HomeReducer
})

export default reducer
