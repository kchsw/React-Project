import React, { Component } from 'react';
import Topic from './components/Topic'
import List from './components/List'
import Recommend from './components/Recommend'
import Writer from './components/Writer'
import { connect } from 'react-redux'
import { InitHomeList, toggleTopShow } from './store/actionCreators'
import {
    HomeWrapper,
    HomeLeft,
    HomeRight,
    BackTop
} from './style'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    handleScrollTop(){
        window.scroll(0, 0)
    }
    render() { 
        return (  
            <HomeWrapper>
                <HomeLeft>
                    <a href="/">
                    <img className="banner-img" src="https://upload.jianshu.io/admin_banners/web_images/4686/b205842c3dd6736c233b052411fe1211f164fcaf.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"/>
                    </a>
                    <Topic></Topic>
                    <List></List>
                </HomeLeft>
                <HomeRight>
                    <Recommend></Recommend>
                    <Writer></Writer>
                </HomeRight>
                {
                    this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>回到顶部</BackTop> : null
                }
                
            </HomeWrapper>
        );
    }
    componentDidMount(){
        this.props.initHomeData()
        this.bindEvents()
    }

    bindEvents(){
        window.addEventListener('scroll', this.props.toggleScrollShow)
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.props.toggleScrollShow)
    }
}

const mapState = (state) =>{
    return {
        showScroll: state.getIn(['home', 'showScroll'])
    }
}

const mapDispatch = (dispatch) => {
    return {
        initHomeData(){
            dispatch(InitHomeList())
        },
        toggleScrollShow(e){
            document.documentElement.scrollTop > 200 ? dispatch(toggleTopShow(true)) : dispatch(toggleTopShow(false))
        }
    }
}
export default connect(mapState, mapDispatch)(Home);