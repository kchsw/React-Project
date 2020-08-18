import createReducer from '../../../utils/createReducer'
export const schema = {
    name: 'orders',
    id: 'id'
}

let orderIdcounter = 10

export const types = {
    DELETE_ORDER: 'ORDERS/DELETE_ORDER',

    ADD_COMMENT: 'ORDERS/ADD_COMMENT',

    ADD_ORDER: 'ORDERS/ADD_ORDER'
}

export const actions = {
    deleteOrder(orderId) {
        return {
            type: types.DELETE_ORDER,
            orderId
        }
    },
    addComment(orderId, commentId) {
        return {
            type: types.ADD_COMMENT,
            orderId,
            commentId
        }
    },
    addOrder(order) {
        const orderId = `o-${orderIdcounter++}`
        return {
            type: types.ADD_ORDER,
            orderId,
            order: { ...order, id: orderId }
        }
    }
}

export const USED_TYPE = 1
export const TO_PAY_TYPE = 2
export const AVAILABE_TYPE = 3
export const REFUND_TYPE = 4

const nomalReducer = createReducer(schema.name)
const reducer = (state = {}, action) => {
    if(action.type === types.DELETE_ORDER) {
        const { [action.orderId]: deletedOrder, ...restOrders } = state
        return restOrders
    } else if (action.type === types.ADD_COMMENT) {
        return {
            ...state,
            [action.orderId]: {
               ...state[action.orderId],
               commentId: action.commentId 
            }
        }
    } else if(action.type === types.ADD_ORDER) {
        return {
            ...state,
            [action.orderId]: action.order
        }
    }  else {
        return nomalReducer(state, action)
    }
}

export const getOrder = (state, id) => state.entities.orders[id]

export default reducer