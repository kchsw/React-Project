import { getProductDetail } from './entities/products'
import { AVAILABE_TYPE, actions as ordersActions } from './entities/orders'
import { createSelector } from 'reselect'
export const types = {
    SET_ORDER_QUANTITY: 'PURCHASE/SET_ORDER_QUANTITY',
    CLOSE_TIP: 'PURCHASE/CLOSE_TIP',
    SUBMIT_ORDER_REQUEST: 'PURCHASE/SUBMIT_ORDER_REQUEST',
    SUBMIT_ORDER_SUCCESS: 'PURCHASE/SUBMIT_ORDER_SUCCESS',
    SUBMIT_ORDER_FAILURE: 'PURCHASE/SUBMIT_ORDER_FAILURE',
}

export const actions = {
    setOrderQuantity(quantity) {
        return {
            type: types.SET_ORDER_QUANTITY,
            quantity
        }
    },
    closeTip() {
        return {
            type: types.CLOSE_TIP
        }
    },
    submitOrder(productId) {
        return (dispatch, getState) => {
            console.log(1)
            dispatch(submitOrderRequest())
            return new Promise((resolve, reject) => {
                const product = getProductDetail(getState(), productId)
                const quantity = getState().purchase.quantity
                const totalPrcie = (product.currentPrice * quantity).toFixed(1)
                const text1 = `${quantity}张 | 总价: ${totalPrcie}`
                const text2 = product.validityPeriod
                const order = {
                    title: `${product.shop}: ${product.shop}`,
                    statusText: '待消费',
                    orderPicUrl: product.picture,
                    channel: '团购',
                    text: [text1, text2],   
                    type: AVAILABE_TYPE
                }
                setTimeout(() => {
                    console.log(order)
                    dispatch(submitOrderSuccess())
                    dispatch(ordersActions.addOrder(order))
                    resolve()
                }, 500)
            })
        }
    }
}

const submitOrderRequest = () => ({
    type: types.SUBMIT_ORDER_REQUEST
})
const submitOrderSuccess = () => ({
    type: types.SUBMIT_ORDER_SUCCESS
})

const initialState = {
    quantity: 1,
    showTip: false
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_ORDER_QUANTITY:
            return {
                ...state,
                quantity: action.quantity
            }
        case types.CLOSE_TIP: 
            return {
                ...state,
                showTip: false,
                quantity: 1,
            }
        case types.SUBMIT_ORDER_SUCCESS: 
            return {
                ...state,
                showTip: true
            }
        default: 
            return state
    }
   
}

export default reducer

//selectors

export const getQuantity = state => state.purchase.quantity
export const getTipStatus = state => state.purchase.showTip
export const getProduct = (state, id) => getProductDetail(state, id)
export const getTotalPrice = createSelector([getProduct, getQuantity], (product, quantity) => {
    if(!product) return 0
    return (product.currentPrice * quantity).toFixed(1)
})