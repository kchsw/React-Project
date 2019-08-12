import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getMoreList } from '../store/actionCreators'
import { Link } from 'react-router-dom'
import {
    ListWrapper,
    ListItem,
    ListInfo,
    LoadMore
} from '../style'
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <ListWrapper>
                {
                    this.props.aticleList.map((item, index) => {
                        return (
                            <Link key={item.get('id') + index} to={ '/detail/' + item.get('id') }> 
                                <ListItem>
                                    <img className="list-img" src={item.get('imgUrl')}/>
                                    <ListInfo>
                                        <h3>{item.get('title')}</h3>
                                        <p>{item.get('desc')}</p>
                                    </ListInfo>
                                </ListItem>
                            </Link>
                        )
                    })
                }
                <LoadMore onClick={() => this.props.getMoreList(this.props.page)}>更多文字</LoadMore>
            </ListWrapper>
        );
    }
}

const mapState = (state) => ({
    aticleList: state.getIn(['home', 'aticleList']),
    page: state.getIn(['home', 'articlePage'])
})

const mapDispatch = (dispatch) => {
    return {
        getMoreList(page){
            dispatch(getMoreList(page))
        }
    }
} 
 
export default connect(mapState, mapDispatch)(List);