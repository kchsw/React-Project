import React from 'react';
import { Link } from "react-router-dom"
import './index.css'

const LoginHeader = (props) => {
    return (  
        <div className="loginHeader">
            <Link to="/" className="loginHeader__back" /> 
            <div className="loginHeader__title">账号密码登录</div>
        </div>
    );
}
 
export default LoginHeader;