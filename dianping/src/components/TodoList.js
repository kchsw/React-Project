import React, { Component } from 'react';
import Todo from './Todo'

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    componentDidMount() {
        this.props.fetchTodosData()
    }

    render() { 
        const { todos, toggleTodo } = this.props
        return (  
            <ul>
                {
                    todos.map(todo => {
                        return <Todo key={todo.id} {...todo} toggleTodo={toggleTodo}/>
                    })
                }
            </ul>
        );
    }
}
 
export default TodoList;