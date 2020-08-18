import { connect } from 'react-redux'
import TodoList from '../components/TodoList'
import { toggleTodo, fetchTodos } from '../store/actionCreators'
import { getVisibleTodos } from '../store/selectors'
import { toJS } from '../HOC/toJS'


const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(state)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        toggleTodo(id) {
            dispatch(toggleTodo(id))
        },
        fetchTodosData() {
            dispatch(fetchTodos())
        }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(toJS(TodoList)) 