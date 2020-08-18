import React from 'react';
import './index.css'
const UserHeader = (props) => {
    const { onBack, onLogout } = props
    return (  
        <header className="userHeader">
            <div className="userHeader__back" onClick={onBack}>首页</div>
            <div className="userHeader__list">
                <span className="userHeader__item userHeader__item--selected">订单</span>
                <span className="userHeader__item">抵用券</span>
            </div>
            <div className="userHeader__right"  onClick={onLogout}>注销</div>
        </header>
    );
}
 
export default UserHeader;