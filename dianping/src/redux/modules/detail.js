import url from '../../utils/url'
import { FETCH_DATA } from '../middleware/api'
import { schema as shopSchema, getShop } from './entities/shops'
import { schema as productSchema, getProductDetail, getProductById } from './entities/products'

import { combineReducers } from 'redux'

export const types = {
    FETCH_PRODUCT_DETAIL_REQUEST: 'DETAIL/FETCH_PRODUCT_DETAIL_REQUEST',
    FETCH_PRODUCT_DETAIL_SUCCESS: 'DETAIL/FETCH_PRODUCT_DETAIL_SUCCESS',
    FETCH_PRODUCT_DETAIL_FAILURE: 'DETAIL/FETCH_PRODUCT_DETAIL_FAILURE',

    FETCH_SHOP_REQUEST: 'DETAIL/FETCH_SHOP_REQUEST',
    FETCH_SHOP_SUCCESS: 'DETAIL/FETCH_SHOP_SUCCESS',
    FETCH_SHOP_FAILURE: 'DETAIL/FETCH_SHOP_FAILURE'
}

export const actions =  {
    loadProductDetail(id) {
        return (dispatch, getState) => {
            const product = getProductDetail(getState(), id)
            if(product) {
                return dispatch(fetchProductDetailSuccess(id))
            }
            const endpoint = url.getProductDetail(id)
            return dispatch(fetchProductDetail(endpoint, id))
        }
    },
    loadShopById(id) {
        return (dispatch, getState) => {
            const shop = getShop(getState(), id)
            if(shop) {
                return dispatch(fetchShopSuccess)
            }
            const endpoint = url.getShop(id)
            return dispatch(fetchShop(endpoint, id))
        }
    }
}

const fetchProductDetail = (endpoint,id) => ({
    [FETCH_DATA]: {
        types: [types.FETCH_PRODUCT_DETAIL_REQUEST, types.FETCH_PRODUCT_DETAIL_SUCCESS, types.FETCH_PRODUCT_DETAIL_FAILURE],
        endpoint,
        schema: productSchema,
    },
    id
})

const fetchShop = (endpoint,id) => ({
    [FETCH_DATA]: {
        types: [types.FETCH_SHOP_REQUEST, types.FETCH_SHOP_SUCCESS, types.FETCH_SHOP_FAILURE],
        endpoint,
        schema: shopSchema,
    },
    id
})

const fetchProductDetailSuccess = (id) => (
    {
        type: types.FETCH_PRODUCT_DETAIL_SUCCESS,
        id
    }
)

const fetchShopSuccess = (id) => (
    {
        type: types.FETCH_SHOP_SUCCESS,
        id
    }
)


const initialState = {
    product: {
        isFetching: false,
        id: null
    },
    relatedShop: {
        isFetching: false, 
        id: null
    }
}


const product = (state = initialState.product, action) => {
    switch(action.type){
        case types.FETCH_PRODUCT_DETAIL_REQUEST:
            return { ...state, isFetching: true }
        case types.FETCH_PRODUCT_DETAIL_SUCCESS:
            return { 
                ...state, 
                isFetching: false,
                id: action.id
            }
        case types.FETCH_PRODUCT_DETAIL_FAILURE:
            return { ...state, isFetching: false }
        default: 
            return state
    }
}

const relateShop = (state = initialState.relatedShop, action) => {
    switch(action.type){
        case types.FETCH_SHOP_REQUEST:
            return { ...state, isFetching: true }
        case types.FETCH_SHOP_SUCCESS:
            return { 
                ...state, 
                isFetching: false,
                id: action.id
            }
        case types.FETCH_SHOP_FAILURE:
            return { ...state, isFetching: false }
        default: 
            return state
    }
}

const reducer = combineReducers({
    product,
    relateShop
})

//selectors

export const getProduct = (state, id) => {
    return getProductDetail(state, id)
}

export const getRelatedShop = (state, productId) => {
    const product = getProductById(state, productId)
    let shopId = product ? product.nearestShop : null
    if(shopId) {
        return getShop(state, shopId)
    }

}

export default reducer