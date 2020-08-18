export const schema = {
    name: 'products',
    id: 'id'
}

const reducer = (state = {}, action) => {
    if(action.response && action.response.products) {
        return {...state, ...action.response.products}
    }
    return state
}

//selectors

export const getProductDetail = (state, id) => {
    const product = state.entities.products[id]
    return product && product.detail && 
    product.purchaseNotes ? product : null
}

export const getProductById = (state, id) => {
    return state.entities.products[id]
}

// export const getProductPriceById = (state, id) => {
//     return state.entities.products[id].currentPrice
// } 

export default reducer