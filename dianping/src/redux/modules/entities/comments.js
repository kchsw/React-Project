import createReducer from '../../../utils/createReducer'
export const schema = {
    name: 'comments',
    id: 'id'
}

export const types = {
    ADD_COMMENT: 'COMMENT/ADD_COMMENT'
}

export const actions = {
    addComment(commentObj ) {
        return {
            type: types.ADD_COMMENT,
            comment: commentObj
        }
    }
}




const nomalReducer = createReducer(schema.name)

const reducer = (state = {}, action) => {
    if(action.type === types.ADD_COMMENT) {
        return {
            ...state,
            [action.comment.id]: action.comment
        }
    } else {
        return nomalReducer(state, action)
    }
}

export const getComment = (state, id) => state.entities.comments[id]


export default reducer