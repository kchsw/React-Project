import React, { Component } from 'react';
import { Input, Button, List} from 'antd';
import 'antd/dist/antd.css'
import store from './store'
import TodoListUI from './TodoListUI'
// import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './store/actionTypes'
import { getInputChangeAction, addTodoItemAction, deleteTodItemAction, initListAction, getListData, getInitList} from './store/actionCreators'
class TodoListAntd extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState()
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleStoreChange = this.handleStoreChange.bind(this)
        this.handleBtnClick = this.handleBtnClick.bind(this)
        this.handleItemDelete = this.handleItemDelete.bind(this)
        store.subscribe(this.handleStoreChange)
    }
    componentDidMount(){
        // const action = getListData()
        // store.dispatch(action)
        // setTimeout(() => {
        //     const data = [
        //         "westdoor",
        //         "jubaoxia",
        //          "otto"
        //     ]
        //     const action = initListAction(data)
        //     store.dispatch(action)
        // }, 1000)
        const action = getInitList()
        store.dispatch(action)
    }
    render() { 
        return (  
            // <div style={{margin: '10px'}}>
            //     <div>
            //         <Input 
            //             value={this.state.inputValue} 
            //             placeholder="Todo Info" 
            //             style={{width: '300px', marginRight: '10px'}}
            //             onChange={this.handleInputChange}
            //         />
            //         <Button 
            //             type="primary"
            //             onClick={this.handleBtnClick}
            //         >提交</Button>
            //     </div>
            //     <div>
            //     <List
            //         size="small"
            //         style={{width: '300px', marginTop: '10px'}}
            //         bordered
            //         dataSource={this.state.list}
            //         renderItem={(item, index)=> <List.Item onClick={() => {this.handleItemDelete(index)}}>{item}</List.Item>}
            //         />
            //     </div>
            // </div>
            <TodoListUI
                inputValue={this.state.inputValue}
                list={this.state.list}
                handleInputChange={this.handleInputChange}
                handleBtnClick={this.handleBtnClick}
                handleItemDelete={this.handleItemDelete}
            />
        );
    }
    handleInputChange(e){
        const action = getInputChangeAction(e.target.value)
        store.dispatch(action)
    }
    handleBtnClick(){
        // const action = {
        //     type: ADD_TODO_ITEM
        //     // value: this.state.inputValue
        // }
        const action = addTodoItemAction()
        store.dispatch(action)
    }
    handleStoreChange(){
        this.setState(store.getState())
    }
    handleItemDelete(index){
        // const action = {
        //     type: DELETE_TODO_ITEM,
        //     index
        // }
        const action = deleteTodItemAction(index)
        store.dispatch(action)
    }
    
}
 
export default TodoListAntd;