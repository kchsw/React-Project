import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    TopicWrapper,
    TopicItem,
    TopicMore
} from '../style'
class Topic extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <TopicWrapper>
                <TopicItem>
                    <img className="topic-pic" src="https://upload.jianshu.io/users/upload_avatars/7290998/f64f5ef0-def0-4b26-beb3-b9d88f060ba0.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/180/h/180"/>
                    hello
                </TopicItem>              
                <TopicMore>
                    更多热门专题 >
                </TopicMore>
            </TopicWrapper>
        );
    }
}

const mapState (state) => {
    return {

    }
}
 
export default connect(mapState, null)(Topic) ;