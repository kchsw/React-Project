import React from 'react';
import { Link } from 'react-router-dom'
import './index.css'

const HomeHeader = () => {
    return (  
        <div className="homeHeader">
            <header className="homeHeader__wrapper">
                <a href="_" className="homeHeader__city">北京</a>
                <Link to="/search" href="_" className="homeHeader__search">输入商户名、地点</Link>
                <Link to="/user" href="_" className="homeHeader__self">
                    <div className="homeHeader__portrait"/>
                </Link>
            </header>
        </div>
    );
}
 
export default HomeHeader;