import React from 'react';
import './index.css'

const LoginForm = (props) => {
    const { username, password, onChange, onSubmit } = props
    return (  
        <div className="loginForm">
            <div className="loginForm__inputContainer">
                <div className="loginForm__row">
                    <label className="loginForm__mobileLable">86</label>
                    <input 
                        className="loginForm__input" 
                        name="username" 
                        onChange={onChange}
                        value={username}
                    />
                </div>
                <div className="loginForm__row">
                    <label className="loginForm__passwordLable">密码</label>
                    <input 
                        className="loginForm__input" 
                        name="password" 
                        type="password"
                        onChange={onChange}
                        value={password}
                    />
                </div>
            </div>
            <div className="loginForm__btnContainer">
                <button className="loginForm__btn" onClick={onSubmit}>登录</button>
            </div>
        </div>
    );
}
 
export default LoginForm;