// import { get } from '../../utils/request'
import url from '../../utils/url'
import { FETCH_DATA } from '../middleware/api'
import { schema } from './entities/products'
import { combineReducers } from 'redux'

export const types = {
    FETCH_LIKES_REQUEST: 'FETCH_LIKES_REQUEST',
    FETCH_LIKES_SUCCESS: 'FETCH_LIKES_SUCCESS',
    FETCH_LIKES_FAILURE: 'FETCH_LIKES_FAILURE',

    FETCH_DISCOUNTS_REQUEST: 'FETCH_DISCOUNTS_REQUEST',
    FETCH_DISCOUNTS_SUCCESS: 'FETCH_DISCOUNTS_SUCCESS',
    FETCH_DISCOUNTS_FAILURE: 'FETCH_DISCOUNTS_FAILURE'
}

export const params = {
    PATH_LIKES: 'likes',
    PATH_DISCOUNTS: 'discounts',
    PAGE_SIZE_LIKES: 5,
    PAGE_SIZE_DISCOUNT: 3
}
// {
//     FETCH_DATA: {
//         types: ['request', 'success', 'fail'],
//         endpoint: url
//     }   
// }

const initialState = {
    likes: {
        isFetching: false,
        pageCount: 0,
        ids: []
    },
    discounts: {
        isFetching: false,
        ids: [] 
    }
}

export const actions = {
    //加载猜你喜欢的数据
    loadLikes() {
        return (dispatch, getState) => {
            const { pageCount } = getState().home.likes
            const rowIndex = pageCount * params.PAGE_SIZE_LIKES
            const endpoint = url.getProductLsit
            (params.PATH_LIKES, rowIndex, params.PAGE_SIZE_LIKES)
            return dispatch(fetchLikes(endpoint))
        }
    },
    loadDiscounts() {
        return (dispatch, getState) => {
            const { ids } = getState().home.discounts
            if(ids.length > 0) {
                return null
            }
            const endpoint = url.getProductLsit
            (params.PATH_DISCOUNTS, 0, params.PAGE_SIZE_DISCOUNT)
            return dispatch(fetchDiscounts(endpoint))
        }
    }

    // loadLikesE() {
    //     return (dispatch, getState) => {
    //         dispatch(fetchLikesRequest())
    //         return get(url.getProductLsit(0, 10)).then(
    //             data => {
    //                 dispatch(fetchLikesSuccess(data))
    //             },
    //             error => {
    //                 dispatch(fetchLikesFailure(error))
    //             }
    //         )
    //     }
    // }
}

const fetchLikes = endpoint => ({
    [FETCH_DATA]: {
        types: [types.FETCH_LIKES_REQUEST, types.FETCH_LIKES_SUCCESS, types.FETCH_LIKES_FAILURE],
        endpoint,
        schema
    }
})

const fetchDiscounts = endpoint => ({
    [FETCH_DATA]: {
        types: [types.FETCH_DISCOUNTS_REQUEST, types.FETCH_DISCOUNTS_SUCCESS, types.FETCH_DISCOUNTS_FAILURE],
        endpoint,
        schema
    }
})

// const fetchLikesRequest = () => ({
//     type: types.FETCH_LIKES_REQUEST
// })

// const fetchLikesSuccess = (data) => ({
//     type: types.FETCH_LIKES_SUCCESS,
//     data
// })

// const fetchLikesFailure = (error) => ({
//     type: types.fetchLikesFailure,
//     error
// })

const likes = (state = initialState.likes, action) => {
    switch(action.type){
    case types.FETCH_LIKES_REQUEST:
        return { ...state, isFetching: true }
    case types.FETCH_LIKES_SUCCESS:
        return { 
            ...state, 
            isFetching: false, 
            pageCount: state.pageCount +1,
            ids: state.ids.concat(action.response.ids) 
        }
    case types.FETCH_LIKES_FAILURE:
        return { ...state, isFetching: false }
    default: 
        return state
    }
}   

const discounts = (state = initialState.discounts, action) => {
    switch(action.type){
    case types.FETCH_DISCOUNTS_REQUEST:
        return { ...state, isFetching: true }
    case types.FETCH_DISCOUNTS_SUCCESS:
        return { 
            ...state, 
            isFetching: false, 
            ids: state.ids.concat(action.response.ids) 
        }
    case types.FETCH_DISCOUNTS_FAILURE:
        return { ...state, isFetching: false }
    default: 
        return state
    }
}

const reducer = combineReducers({
    likes,
    discounts
})

export default reducer

//selectors

export const getLikes = state => {
    return state.home.likes.ids.map(id => {
        return state.entities.products[id]
    })
}

export const getDiscounts = state => {
    return state.home.discounts.ids.map(id => {
        return state.entities.products[id]
    })
}

export const getPageCountOfLikes = state => {
    return state.home.likes.pageCount
}
