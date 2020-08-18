import React, { Component } from 'react';
import './index.css'
import SearchBox from './components/SearchBox'
import SearchHistory from './components/SearchHistory'
import PopularSearch from './components/PopularSearch'

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { 
    actions as SearchActions,
    getPopularKeywords,
    getRelatedKeywords,
    getInputText,
    getHistoryKeywords
} from '../../redux/modules/search'

class Search extends Component {
    state = {  }
    
    render() { 
        const { popularKeywords, 
            inputText, 
            relatedKeywords, 
            historyKeywords 
        } = this.props
        const {
            clearHistoryKeywords
        } = this.props.detailActions
        return (  
            <>
                <SearchBox 
                    inputText={inputText} 
                    relatedKeywords={relatedKeywords}
                    onChange={this.handleChangeInpput}
                    onClear={this.handleClearInpput}
                    onCancel={this.handleCancel}
                    onClickItem={this.handleClickRealatedItem}
                />
                <PopularSearch 
                    popularKeywords={popularKeywords}
                    onClickItem={this.handleClickItem}
                />
                <SearchHistory 
                    historyKeywords ={historyKeywords}
                    clearHistoryKeywords={clearHistoryKeywords}
                    onClickItem={this.handleClickItem}
                />
            </>
        );
    }
    componentDidMount() {
        this.props.detailActions.loadPopularKeywords()
    }
    componentWillUnmount() {
        this.handleClearInpput()
    }
    handleChangeInpput = text => {
        this.props.detailActions.setInputText(text)
        this.props.detailActions.loadRelatedKeywords(text)
    }
    handleClearInpput = () => {
        this.props.detailActions.clearInput()
    }  
    handleCancel = () => {
        this.handleClearInpput()
        this.props.history.goBack()
    }
    handleClickItem = item => {
        this.props.detailActions.setInputText(item.keyword)
        this.props.detailActions.loadRelatedKeywords(item.keyword)
        this.props.detailActions.addHistoryKeyword(item.id)
    }
    handleClickRealatedItem = item => {
        this.props.history.push({pathname: '/search_result'})
        this.props.detailActions.addHistoryKeyword(item.id)
        this.props.detailActions.loadRelatedShops(item.keyword)
    }
}

const mapStateToProps = (state, props) => {
    return {
        popularKeywords: getPopularKeywords(state),
        relatedKeywords: getRelatedKeywords(state),
        historyKeywords: getHistoryKeywords(state),
        inputText: getInputText(state)
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
        detailActions: bindActionCreators(SearchActions, dispatch)
    };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Search)