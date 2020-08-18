import React, { Component } from 'react';
import Category from './components/Category'
import Headline from './components/Headline'
import Discount from './components/Discount'
import LikeList from './components/Likelist'
import HomeHeader from './components/HomeHeader'
import Banner from './components/Banner'
import Activity from './components/Activity'
import Footer from '../../components/Footer/index.js'

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions as homeActions, getLikes, getDiscounts, getPageCountOfLikes } from '../../redux/modules/home'
class Home extends Component {
    state = {  }
    render() { 
        const { discounts, likes, pageCount } = this.props
        return ( 
            <>  
                <HomeHeader />
                <Banner dark />
                <Category />
                <Headline />
                <Activity />
                <Discount data={discounts}/>
                <LikeList 
                    data={likes} 
                    pageCount={pageCount}
                    fetchData = {this.fetchMoreLikes}
                />
                <Footer />
           </>
        );
    }
    componentDidMount() {
        this.props.homeActions.loadDiscounts()
    }
    fetchMoreLikes = () => {
        this.props.homeActions.loadLikes()
    }
}

const mapStateToProps = (state, props) => {
    return {
        likes: getLikes(state),
        discounts: getDiscounts(state),
        pageCount: getPageCountOfLikes(state)
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
        homeActions: bindActionCreators(homeActions, dispatch)
    };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Home);