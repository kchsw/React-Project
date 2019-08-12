import { combineReducers } from 'redux-immutable'
import HeaderReducer from '../common/Header/store/reducer'
import HomeReducer from '../pages/Home/store/reducer'
import DetailReducer from '../pages/Detail/store/reducer'
import LoginReducer from '../pages/Login/store/reducer'


const reducer =  combineReducers({
    header: HeaderReducer,
    home: HomeReducer,
    detail: DetailReducer,
    login: LoginReducer
})

export default reducer
