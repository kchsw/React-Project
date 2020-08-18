import { connect } from 'react-redux'
import AddTodo from '../components/AddTodo'
import { addTodo, setTodoText } from '../store/actionCreators'
import { getText } from '../store/selectors'

const mapStateToProps = (state) => {
    return {
        text: getText(state)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setTodoText(text) {
            dispatch(setTodoText(text))
        },
        addTodo(text) {
            dispatch(addTodo(text))
        }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(AddTodo) 