import React from 'react';
import './index.css'

const SearchHeader = (props) => {
    const { onBack, onSearch } = props 
    return (  
        <header className="searchHeader">
            <div className="searchHeader__back" onClick={onBack}></div>
            <div className="searchHeader__list">
                <span className="searchHeader__item searchHeader__item--selected">商户</span>
                <span className="searchHeader__item">闪惠团购</span>
            </div>
            <div className="search__icon" onClick={onSearch}></div>
        </header>
    );
}
 
export default SearchHeader;