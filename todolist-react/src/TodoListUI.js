import React, { Component } from 'react';
import { Input, Button, List} from 'antd';
import 'antd/dist/antd.css'
const TodoListUI = (props) => {
    return (  
        <div style={{margin: '10px'}}>
            <div>
                <Input 
                    value={props.inputValue} 
                    placeholder="Todo Info" 
                    style={{width: '300px', marginRight: '10px'}}
                    onChange={props.handleInputChange}
                />
                <Button 
                    type="primary"
                    onClick={props.handleBtnClick}
                >提交</Button>
            </div>
            <div>
            <List
                size="small"
                style={{width: '300px', marginTop: '10px'}}
                bordered
                dataSource={props.list}
                renderItem={(item, index)=> <List.Item onClick={(index) => {props.handleItemDelete(index)}}>{item}</List.Item>}
                />
            </div>
        </div>
    ); 
}
// class TodoListUI extends Component {
//     render() { 
//         return (  
//             <div style={{margin: '10px'}}>
//                 <div>
//                     <Input 
//                         value={this.props.inputValue} 
//                         placeholder="Todo Info" 
//                         style={{width: '300px', marginRight: '10px'}}
//                         onChange={this.props.handleInputChange}
//                     />
//                     <Button 
//                         type="primary"
//                         onClick={this.props.handleBtnClick}
//                     >提交</Button>
//                 </div>
//                 <div>
//                 <List
//                     size="small"
//                     style={{width: '300px', marginTop: '10px'}}
//                     bordered
//                     dataSource={this.props.list}
//                     renderItem={(item, index)=> <List.Item onClick={() => {this.props.handleItemDelete(index)}}>{item}</List.Item>}
//                     />
//                 </div>
//             </div>
//         );
//     }
// }
 
export default TodoListUI;