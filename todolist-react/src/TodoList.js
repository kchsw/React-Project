import React, { Fragment } from 'react';
import TodoItem from './TodoItem';
import store from './react-store'
import { connect } from 'react-redux'
import { getInputChangeAction, addTodoItemAction, deleteTodItemAction } from './react-store/actionCreators'


class TodoList extends React.Component {
  constructor(props){
    super(props)
    // this.state = store.getState()
    // this.state = {
    //   list: [
    //     'learn react',
    //     'learn english',
    //     'learn vue'
    //   ],
    //   inputValue: ''
    // }
  }
  componentWillReceiveProps(){
    //一个组件要从父组件接受参数
    //当父组件的render函数重新执行的时候，子组件的这个生命周期函数就会执行
    //组件第一次存在于父组件时不会执行
  }
  handleBtnClick(){  //给button绑定click事件this指向的是button
    // this.setState({
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ''
    // })
    this.setState((prevState) => ({
      list: [...prevState.list, prevState.inputValue],
      inputValue: ''
    }), () => {
      // 更新数据后的回调
    })
  }
  handleInputClick(e){
    // this.setState({
    //   inputValue: e.target.value
    // })
    const value = e.target.value
    this.setState(() => ({
      inputValue: value
    }))
  } 
  handleItemClick(index){
    // console.log(index)
    const list = [...this.state.list]
    list.splice(index, 1)
    this.setState({
      list
    })
  }
  handleDelete(index){
    // const list = [...this.state.list]
    // list.splice(index, 1)
    // this.setState({
    //   list
    // })
    this.setState((prevState) => {
      const list = [...prevState.list]
      list.splice(index, 1)
      return {
        list
      }
    })
  }
  getTodoItems(){
    return (
      this.props.list.map((item, index) => {
        return <TodoItem handleDelete={this.props.handleDeleteItemX} key={index} content={item} index={index}/>
      }) 
    )
  }
  render() { 
    const { inputValue } = this.props
    return (  
      <Fragment>
        {/* 注释 */}
        <div>
          <label htmlFor="insertArea">输入内容</label>
          <input id="insertArea" 
            value={inputValue} 
            onChange={this.props.handleInputChangeX}
            ref={(input) => {this.input = input}}
          >
            {/* input 对应实际的DOM元素 */}
          </input>
          <button onClick={this.props.handleBtnClickX}>
            add
          </button>
        </div>
        <ul>
          {this.getTodoItems()}
        </ul>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}
//store.dispatch props
const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChangeX(e){
      const action = getInputChangeAction(e.target.value)
      dispatch(action)
    },
    handleBtnClickX(){
      const action = addTodoItemAction()
      dispatch(action)
    },
    handleDeleteItemX(index){
      const action = deleteTodItemAction(index)
      dispatch(action)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

 

