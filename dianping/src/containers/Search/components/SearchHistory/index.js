import React, { Component } from 'react';
import './index.css'


class SearchHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {  
        }
    }
    render() { 
        const { historyKeywords } = this.props
        return (  
            <div className="SearchHistory">
                <div className="SearchHeader">
                    搜索记录
                </div>
                <ul className="searchHistory__list">
                    {
                        historyKeywords.map((item, index) => {
                            return (
                                <li onClick={() => this.handleClick(item)} key={item.id} className="searchHistory__item">{item.keyword}</li>
                            )
                        })
                    }
                </ul>
                <div className="searchHistory__clear" onClick={this.handleClear}>
                    清除搜索记录 
                </div>
            </div>
        );
    }

    handleClick = item => {
        this.props.onClickItem(item)
    }

    handleClear = () => {
        this.props.clearHistoryKeywords()
    }
}
 
 
export default SearchHistory;