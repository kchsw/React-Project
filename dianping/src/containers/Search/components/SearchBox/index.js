import React, { Component } from 'react';
import './index.css'


class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {  
        }
    }
    renderSuggestList = () => {
        const { relatedKeywords } = this.props
        return (
            <ul className="searchBox__list">
                {
                    relatedKeywords.map((item, index) => {
                        return (
                            <li className="searchBox__item" key={item.id}
                                onClick={() => this.handleClick(item)}
                            >
                                <span className="searchBox__itemKeyWord">
                                    {item.keyword}
                                </span>
                                <span className="searchBox__itemQuantity">
                                    约{item.quantity}个结果
                                </span>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
    handleInputChange = (e) => {
        const text = e.target.value
        this.props.onChange(text)
    }

    handleClear = () => {
        this.props.onClear()
    }

    handleCancel = () => {
        this.props.onCancel()
    }

    handleClick = (item) => {
        this.props.onClickItem(item)
    }

    render() { 
        const { inputText } = this.props
        return (  
            <div className="searchBox">
                <div className="searchBox__container">
                    <input 
                        className="searchBOX__text" 
                        value={inputText}
                        onChange={this.handleInputChange}
                    />
                    <span 
                        className="searchBOX__clear"
                        onClick={this.handleClear}
                    ></span>
                    <span 
                        className="searchBOX__cancel"
                        onClick={this.handleCancel}
                    >
                        取消
                    </span>
                    {
                        !!inputText && inputText.length > 0 && this.renderSuggestList()
                    }
                </div>
            </div>
            
        );
    }
}
 
 
export default SearchBox;