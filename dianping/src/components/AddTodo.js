import React, { Component } from 'react';

class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {  
        }
    }
    handleInputChange = (e) => {
        const text = e.target.value
        this.props.setTodoText(text)
    }
    handleButtonClick = () => {
        const text = this.props.text.trim()
        if(text) {
            this.props.addTodo(text)
            this.props.setTodoText('')
        }
    }
    render() { 
        const { text } = this.props
        return (
            <div>
                <input value={text} onChange={this.handleInputChange}/>
                <button onClick={this.handleButtonClick}>Add</button>
            </div>
        )
    }
}
 
export default AddTodo;