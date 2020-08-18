import url from '../../utils/url'
import { FETCH_DATA } from '../middleware/api'
import { 
    schema as ordersSchema,
    getOrder,
    USED_TYPE,
    TO_PAY_TYPE,
    AVAILABE_TYPE,
    REFUND_TYPE,
    actions as ordersActions,
    types as ordersTypes
} from './entities/orders'
import {
    actions as commentsActions,
    getComment
}  from './entities/comments'
import { combineReducers } from 'redux'

const typeToKey = {
    TO_PAY_TYPE: 'toPayIds',
    AVAILABE_TYPE: 'availabeIds',
    REFUND_TYPE: 'toFundIds'
}


const initialState = {
    orders: {
        isFetching: false,
        fetched: false,
        ids: [],
        toPayIds: [], //待付款
        availabeIds: [], //可使用订单
        toFundIds: [], //退款
    },
    currentTab: 0,
    currentOrder: {
        id: null,
        isDeleting: false,
        isCommenting: false,
        comment: '',
        stars: 0
    }
}

export const types = {
    FETCH_ORDERS_REQUEST: 'FETCH_ORDERS_REQUEST',
    FETCH_ORDERS_SUCCESS: 'FETCH_ORDERS_SUCCESS',
    FETCH_ORDERS_FAILURE: 'FETCH_ORDERS_FAILURE',

    SET_CURRENT_TAB: 'SET_CURRENT_TAB',

    DELETE_ORDER_REQUEST: 'DELETE_ORDER_REQUEST',
    DELETE_ORDER_SUCCESS: 'DELETE_ORDER_SUCCESS',
    DELETE_ORDER_FAILURE: 'DELETE_ORDER_FAILURE',

    SHOW_DELETE_DIALOG: 'SHOW_DELETE_DIALOG',
    HIDE_DELETE_DIALOG: 'HIDE_DELETE_DIALOG',

    SHOW_COMMENT_AREA: 'SHOW_COMMENT_AREA',
    HIDE_COMMENT_AREA: 'HIDE_COMMENT_AREA',

    SET_COMMENT: 'USER/SET_COMMENT',
    SET_STARS: 'USER/SET_STAR',

    POST_COMMENT_REQUEST: 'POST_COMMENT_REQUEST',
    POST_COMMENT_SUCCESS: 'POST_COMMENT_SUCCESS',
    POST_COMMENT_FAILURE: 'POST_COMMENT_FAILURE',
}

export const actions = {
    loadOrders() {
        return (dispatch, getState) => {
            const { fetched } = getState().user.orders
            if(fetched) return null
            const endpoint = url.getOrders()
            return dispatch(fetchOrders(endpoint))
        }
    },
    setCurrentTab(index) {
        return {
            type: types.SET_CURRENT_TAB,
            index
        }
    },
    removeOrder() {
        return (dispatch, getState) => {
            const { id } = getState().user.currentOrder
            if(id) {
                dispatch(deleteOrderRequest())
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        dispatch(deleteOrderSuccess(id))
                        dispatch(ordersActions.deleteOrder(id))
                        resolve()
                    }, 500)
                })
            }
        }
    },

    showDeleteDialog(orderId) {
        return {
            type: types.SHOW_DELETE_DIALOG,
            orderId
        }
    },
    hideDeleteDialog() {
        return {
            type: types.HIDE_DELETE_DIALOG
        }
    },

    showCommentArea(orderId) {
        return {
            type: types.SHOW_COMMENT_AREA,
            orderId
        }
    },
    hideCommentArea() {
        return {
            type: types.HIDE_COMMENT_AREA
        }
    },
    setComment(comment) {
        return {
            type: types.SET_COMMENT,
            comment
        }
    },
    setStars(stars) {
        return {
            type: types.SET_STARS,
            stars
        }
    },

    submitComment() {
        return (dispatch, getState) => {
            const { id } = getState().user.currentOrder
            if(id) {
                dispatch(postCommentRequest())
                return new Promise((resolve, reject) => {
                    const { currentOrder: { id, comment, stars } } = getState().user
                    const commentObj = {
                        id: +new Date(),
                        stars,
                        comment
                    }
                    setTimeout(() => {
                        dispatch(postCommentSuccess(id))
                        dispatch(ordersActions.addComment(id, commentObj.id))
                        dispatch(commentsActions.addComment(commentObj))
                        resolve()
                    }, 500)
                })
            }
        }
    }
}

const postCommentRequest = () => ({
    type: types.POST_COMMENT_REQUEST
})

const postCommentSuccess = (orderId) => ({
    type: types.POST_COMMENT_SUCCESS,
    orderId
})
const postCommentFailure = () => ({
    type: types.POST_COMMENT_FAILURE
})

const deleteOrderRequest = () => ({
    type: types.DELETE_ORDER_FAILURE
})

const deleteOrderSuccess = (orderId) => ({
    type: types.DELETE_ORDER_SUCCESS,
    orderId
})
const deleteOrderFailure = () => ({
    type: types.DELETE_ORDER_REQUEST
})

const fetchOrders = endpoint => ({
    [FETCH_DATA]: {
        types: [ types.FETCH_ORDERS_REQUEST, types.FETCH_ORDERS_SUCCESS, types.FETCH_ORDERS_FAILURE ],
        endpoint,
        schema: ordersSchema 
    }
})

const orders = (state=initialState.orders, action) => {
    switch(action.type) {
        case types.FETCH_ORDERS_REQUEST:
            return { ...state, isFetching: true }
        case types.FETCH_ORDERS_FAILURE:
            return { ...state, 
                isFetching: false 
            }
        case types.FETCH_ORDERS_SUCCESS:
            const toPayIds = action.response.ids.filter(id => 
                action.response.orders[id].type === TO_PAY_TYPE
            )
            const availabeIds = action.response.ids.filter(id => 
                action.response.orders[id].type === AVAILABE_TYPE
            )
            const toFundIds = action.response.ids.filter(id => 
                action.response.orders[id].type === REFUND_TYPE
            )
            return { ...state, 
                fetched: true,
                isFetching: false,
                toPayIds: state.toPayIds.concat(toPayIds),
                availabeIds: state.availabeIds.concat(availabeIds),
                toFundIds: state.toFundIds.concat(toFundIds),
                ids: state.ids.concat(action.response.ids)
            }
        case ordersTypes.DELETE_ORDER: 
        case types.DELETE_ORDER_SUCCESS: 
            return {
                ...state,
                toPayIds: removeOrderId(state, 'toPayIds', action.orderId),
                availabeIds: removeOrderId(state, 'availabeIds', action.orderId),
                toFundIds: removeOrderId(state, 'toFundIds', action.orderId),
                ids: removeOrderId(state, 'ids', action.orderId),

            }
        case ordersTypes.ADD_ORDER: 
            const { order } = action
            const key = typeToKey[order.type]
            return key ?
                {
                    ...state,
                    ids: [ order.id, ...state.ids ],
                    [key]: [ order.id, ...state[key] ]
                } : 
                {
                    ...state,
                    ids: [ order.id, ...state.ids ],
                }
        default:
            return state
    }
}

const removeOrderId = (state, key, orderId) => {
    return state[key].filter(id => id !== orderId)
}

const currentTab = (state = initialState.currentTab, action) => {
    switch(action.type) {
        case types.SET_CURRENT_TAB: 
            return action.index
        default: 
            return state
    }
}

const currentOrder = (state = initialState.currentOrder, action) => {
    switch(action.type) {
        case types.DELETE_ORDER_SUCCESS: 
        case types.DELETE_ORDER_FAILURE: 
        case types.HIDE_DELETE_DIALOG:
        case types.POST_COMMENT_FAILURE:
        case types.POST_COMMENT_SUCCESS:
        case types.HIDE_COMMENT_AREA:
            return initialState.currentOrder
        case types.SHOW_DELETE_DIALOG:
            return {...state, isDeleting: true, id: action.orderId}
        case types.SHOW_COMMENT_AREA: 
            return {...state, isCommenting: true, id: action.orderId}
        case types.SET_COMMENT: 
            return {...state, comment: action.comment}
        case types.SET_STARS: 
            return {...state, stars: action.stars}
        default: 
            return state
    }
}

const reducer = combineReducers({
    orders,
    currentTab,
    currentOrder
})  

//selector

export const getCurrentTab = state => state.user.currentTab
export const getOrders = state => {
    const currentTab = state.user.currentTab
    const key = ['ids', 'toPayIds', 'availabeIds', 'toFundIds'][currentTab]
    return state.user.orders[key].map(id => getOrder(state, id))
}
export const getDeletingOrderId = state => {
    return state.user.currentOrder && state.user.currentOrder.isDeleting ?
    state.user.currentOrder.id : null
}

export const getCommentingOrderId = state => {
    return state.user.currentOrder && state.user.currentOrder.isCommenting ?
    state.user.currentOrder.id : null
}

export const getCurrentOrderComment = state => {
    return state.user.currentOrder ?
    state.user.currentOrder.comment : ''
}

export const getCurrentOrderStars = state => {
    return state.user.currentOrder ?
    state.user.currentOrder.stars : 0
}




export default reducer 