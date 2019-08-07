import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './TodoItem.css'

//子组件通父组件通信，要调用父组件传递过来的方法
class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.handleItemClick = this.handleItemClick.bind(this)
    }
    shouldComponentUpdate(nextProps, nextStste){
        if(nextProps.content !== this.props.content){
            return true
        }else{
            return false
        }
    }
    handleItemClick(){
        const { handleDelete, index } = this.props
        handleDelete(index)
    }
    render() { 
        const { content } = this.props
        return (
        //    <li key={index}>{item}<button onClick={this.handleItemClick.bind(this, index)}>delete</button></li>
            <li className="todo-item" >{content}<button onClick={this.handleItemClick}>delete</button></li>
        );
    }
}

TodoItem.propTypes = {
    content: PropTypes.string.isRequired,
    handleDelete: PropTypes.func,
    index: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

TodoItem.defaultProps = {
    test: 'Hello '
}
 
export default TodoItem;