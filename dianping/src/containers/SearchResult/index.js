import React, { Component } from 'react';
import Banner from './components/Banner'
import ShopList from './components/ShopList'
import SearchHeader from './components/SearchHeader'
import KeywordBox from './components/KeywordBox'
import { connect } from "react-redux";
import { 
    getSearchedShops,
    getCurrentKeyword
} from '../../redux/modules/search'

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { currentKeyword, shops } = this.props
        return (  
            <div>
                <SearchHeader onBack={this.onBack} onSearch={this.onSearch}/>
                <KeywordBox text={currentKeyword}/> 
                <Banner />
                <ShopList shops={shops}/>
            </div>
        );
    }
    onBack = () => {
        this.props.history.push('/')
    }
    onSearch = () => {
        this.props.history.push('/search')
    }
}

const mapStateToProps = (state, props) => {
    return {
        currentKeyword: getCurrentKeyword(state),
        shops: getSearchedShops(state)
    };
  };

export default connect(mapStateToProps, null)(SearchResult);