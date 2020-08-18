import React from 'react';

function Todo (props) {
    const { text , completed, id, toggleTodo } = props
    return (
        <li 
            style={{ textDecoration: completed ? 'line-through' : 'none' }}
            onClick={() => toggleTodo(id)}
        >{text}</li>
    )
}

export default Todo