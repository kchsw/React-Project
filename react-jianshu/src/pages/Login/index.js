import React, { Component } from 'react';
import { connect } from 'react-redux'
import { login } from './store/actionCreators'
import { Redirect } from 'react-router-dom'
import {  
    LoginWrapper,
    LoginBox,
    Input,
    Button
} from './style'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { logined } = this.props
        if(!logined){
            return (  
                <LoginWrapper>
                    <LoginBox>
                        <Input placeholder="账号" ref={(input) => this.account = input}/>
                        <Input placeholder="密码" type="password" ref={(input) => this.password = input}/>
                        <Button onClick={() => this.props.handleLogin(this.account, this.password)}>登 陆</Button>
                    </LoginBox> 
                </LoginWrapper>
            );
        }else{
            return <Redirect to="/"/>
        }
        
    }
}

const mapState = (state) => ({
    logined: state.getIn(['login', 'logined'])
})

const mapAction = (dispatch) => ({
    handleLogin(accountElem, passwordElem){
        dispatch(login(accountElem.value, passwordElem.value))
    }
})
 
export default connect(mapState, mapAction)(Login);