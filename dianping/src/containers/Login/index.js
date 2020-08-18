import React, { Component } from 'react';
import LoginHeader from './components/LoginHeader'
import LoginForm from './components/LoginForm'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { 
    actions as loginActions, 
    getUsername,
    getPassword,
    isLogin
} from '../../redux/modules/login'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { username, password, isLogin, location: {state} } = this.props
        if(isLogin) {
            if(state && state.from) return <Redirect to={state.from} />
            return <Redirect to="/user" />
        }
        return (  
            <>
                <LoginHeader />
                <LoginForm 
                    username={username}
                    password={password}
                    isLogin={isLogin}
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                />
            </>
        );
    }

    handleChange = (e) => {
        if(e.target.name === 'username') this.props.loginActions.setUsername(e.target.value)
        if(e.target.name === 'password') this.props.loginActions.setPassword(e.target.value)
    }
    handleSubmit = () =>{
        this.props.loginActions.login()
    }
}

const mapStateToProps = (state, props) => {
    return {
        username: getUsername(state),
        password: getPassword(state),
        isLogin: isLogin(state)
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        loginActions: bindActionCreators(loginActions, dispatch)
    };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Login);