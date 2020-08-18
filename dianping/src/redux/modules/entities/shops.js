import createReducer from '../../../utils/createReducer'
export const schema = {
    name: 'shops',
    id: 'id'
}

const reducer = createReducer(schema.name)

export const getShop = (state, id) => {
    return state.entities.shops[id]
}

export default reducer