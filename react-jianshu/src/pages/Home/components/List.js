import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    ListWrapper,
    ListItem,
    ListInfo
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
                    this.props.aticleList.map(item => {
                        return (
                            <ListItem key={item.get('id')}>
                                <img className="list-img" src={item.get('imgUrl')}/>
                                <ListInfo>
                                    <h3>{item.get('title')}</h3>
                                    <p>{item.get('desc')}</p>
                                </ListInfo>
                            </ListItem>
                        )
                    })
                }
                <ListItem>
                    <img className="list-img" src={"https://upload-images.jianshu.io/upload_images/15098471-a85ce272bd601d2e.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240"}/>
                    <ListInfo>
                        <h3>笔记本电池越来越不耐用？用了这一招，续航能力提升3倍！</h3>
                        <p>笔记本电脑的电池使用时间是很多用户都特别关心与注重的问题。当笔记本使用一段时间后，电脑的续航能力明显会下降许多，那么我们就可以通过校准电池的方式...</p>
                    </ListInfo>
                </ListItem>
            </ListWrapper>
        );
    }
}

const mapState = (state) => ({
    aticleList: state.getIn(['home', 'aticleList']),
})
 
export default connect(mapState, null)(List);